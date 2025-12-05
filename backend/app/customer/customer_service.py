from flask import request, jsonify
from app import db
from app.models import ShoppingCart, Part, User, Order, OrderItem
from datetime import datetime

class Customer:
    
    def get_all_parts(self):

        parts = Part.query.all()
        parts_list = []
        for part in parts:
            parts_list.append({
                "number": part.number,
                "description": part.description,
                "price": part.price,
                "weight": part.weight,
                "picture_path_url": part.picture_path_url,
                "quantity": part.quantity
            })
        
        return jsonify(parts_list)
    
    def add_to_cart(self):

        data = request.get_json()

        user_id = data.get("user_id")
        part_number = data.get("part_number")
        quantity = data.get("quantity", 1)

        if not user_id or not part_number:
            return jsonify({"error": "Missing user_id or part_number"}), 400

        user = User.query.get(user_id)
        part = Part.query.get(part_number)

        if not user:
            return jsonify({"error": f"User with id {user_id} not found"}), 404
        if not part:
            return jsonify({"error": f"Part with number {part_number} not found"}), 404

        existing_item = ShoppingCart.query.filter_by(user_id=user_id, part_number=part_number).first()
        if existing_item:
            existing_item.quantity += quantity
        else:
            new_cart_item = ShoppingCart(user_id=user_id, part_number=part_number, quantity=quantity)
            db.session.add(new_cart_item)

        db.session.commit()

        return jsonify({"message": "Item added to cart successfully"}), 201
    
    def checkout_order(self):
        data = request.get_json()

        user_id = data.get("user_id")
        cart = data.get("cart", [])

        if not user_id:
            return jsonify({"error": "Missing user_id"}), 400

        if not cart or len(cart) == 0:
            return jsonify({"error": "Cart is empty"}), 400

        # Validate user exists
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": f"User with id {user_id} not found"}), 404

        # Create new order
        new_order = Order(
            user_id=user_id,
            order_date=datetime.utcnow(),
            status="Pending"
        )
        db.session.add(new_order)
        db.session.flush()  

        total_amount = 0
        order_items_list = []

        for item in cart:
            part_number = item.get("productId")
            quantity = item.get("quantity", 1)

            part = Part.query.get(part_number)
            if not part:
                continue 

            order_item = OrderItem(
                order_id=new_order.id,
                part_number=part.number,
                quantity=quantity,
                unit_price=part.price
            )
            db.session.add(order_item)

            subtotal = part.price * quantity
            total_amount += subtotal

            order_items_list.append({
                "part_number": part.number,
                "description": part.description,
                "quantity": quantity,
                "unit_price": part.price,
                "subtotal": subtotal
            })

        new_order.total_amount = total_amount

        db.session.commit()

        return jsonify({
            "message": "Order placed successfully",
            "order_id": new_order.id,
            "user_id": user_id,
            "total_amount": total_amount,
            "items": order_items_list
        }), 201

    def shopping_cart_status(self):

        user_id = request.args.get("user_id", type=int)
        
        if not user_id:
            return jsonify({"error": "Missing user_id"}), 400

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": f"User with id {user_id} not found"}), 404

        cart_items = ShoppingCart.query.filter_by(user_id=user_id).all()
        
        if not cart_items:
            return jsonify({"cart": [], "total_amount": 0})

        cart_list = []
        total_amount = 0

        for item in cart_items:
            part = Part.query.get(item.part_number)
            if not part:
                continue  

            subtotal = item.quantity * part.price
            total_amount += subtotal

            cart_list.append({
                "part_number": part.number,
                "description": part.description,
                "quantity": item.quantity,
                "unit_price": part.price,
                "subtotal": subtotal,
                "picture_path_url": part.picture_path_url
            })

        return jsonify({
            "user_id": user_id,
            "cart": cart_list,
            "total_amount": total_amount
        })

    def get_order_history(self):
        """
        Get all historical orders for a specific user
        """
        user_id = request.args.get("user_id", type=int)
        
        if not user_id:
            return jsonify({"error": "Missing user_id"}), 400
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": f"User with id {user_id} not found"}), 404
        
        # Fetch all orders for the user
        orders = Order.query.filter_by(user_id=user_id).order_by(Order.order_date.desc()).all()
        
        if not orders:
            return jsonify({"orders": []})
        
        orders_list = []
        
        for order in orders:
            # Fetch all items in this order
            order_items = OrderItem.query.filter_by(order_id=order.id).all()
            
            items_list = []
            for order_item in order_items:
                part = Part.query.get(order_item.part_number)
                items_list.append({
                    "part_number": order_item.part_number,
                    "description": part.description if part else "Unknown",
                    "quantity": order_item.quantity,
                    "unit_price": order_item.unit_price,
                    "subtotal": order_item.quantity * order_item.unit_price,
                    "picture_path_url": part.picture_path_url if part else None
                })
            
            orders_list.append({
                "order_id": order.id,
                "order_date": order.order_date.isoformat(),
                "status": order.status,
                "total_amount": order.total_amount,
                "items": items_list
            })
        
        return jsonify({
            "user_id": user_id,
            "orders": orders_list
        })