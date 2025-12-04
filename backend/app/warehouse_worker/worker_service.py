from flask import request, jsonify
from app import db
from app.models import Order, OrderItem, Part, User

class Worker:
    
    def view_completed_orders(self):
        """View list of completed orders"""
        orders = Order.query.filter_by(status="Completed").all()
        orders_list = []
        for order in orders:
            orders_list.append(order.to_dict())
        return jsonify(orders_list), 200
    
    def print_packing_labels(self):
        """Print packing labels for orders"""
        order_id = request.args.get("order_id", type=int)
        if not order_id:
            return jsonify({"error": "Missing order_id"}), 400
        
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": f"Order with id {order_id} not found"}), 404
        
        items = OrderItem.query.filter_by(order_id=order_id).all()
        packing_labels = []
        for item in items:
            part = Part.query.get(item.part_number)
            packing_labels.append({
                "order_id": order_id,
                "part_number": item.part_number,
                "description": part.description if part else None,
                "quantity": item.quantity,
                "user_address": {
                    "street": order.user.street,
                    "city": order.user.city
                } if order.user else None
            })
        
        return jsonify({"packing_labels": packing_labels}), 200
    
    def browse_products(self):
        """Browse products (same as customer get_all_parts)"""
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
        return jsonify(parts_list), 200
    
    def retrieve_items_to_pack(self):
        """Retrieve list of items to pack for pending orders"""
        orders = Order.query.filter_by(status="Pending").all()
        items_to_pack = []
        for order in orders:
            order_items = OrderItem.query.filter_by(order_id=order.id).all()
            for item in order_items:
                part = Part.query.get(item.part_number)
                items_to_pack.append({
                    "order_id": order.id,
                    "part_number": item.part_number,
                    "description": part.description if part else None,
                    "quantity": item.quantity,
                    "order_date": order.order_date.isoformat()
                })
        return jsonify({"items_to_pack": items_to_pack}), 200
    
    def print_invoice_shipping_label(self):
        """Print invoice and shipping label for an order"""
        order_id = request.args.get("order_id", type=int)
        if not order_id:
            return jsonify({"error": "Missing order_id"}), 400
        
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": f"Order with id {order_id} not found"}), 404
        
        items = OrderItem.query.filter_by(order_id=order_id).all()
        invoice_items = []
        for item in items:
            part = Part.query.get(item.part_number)
            invoice_items.append({
                "part_number": item.part_number,
                "description": part.description if part else None,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "subtotal": item.quantity * item.unit_price
            })
        
        return jsonify({
            "invoice": {
                "order_id": order.id,
                "order_date": order.order_date.isoformat(),
                "total_amount": order.total_amount,
                "items": invoice_items
            },
            "shipping_label": {
                "order_id": order.id,
                "shipping_address": {
                    "name": order.user.name if order.user else None,
                    "street": order.user.street if order.user else None,
                    "city": order.user.city if order.user else None
                }
            }
        }), 200
    
    def mark_order_as_shipped(self):
        """Mark an order as shipped"""
        data = request.get_json()
        order_id = data.get("order_id")
        
        if not order_id:
            return jsonify({"error": "Missing order_id"}), 400
        
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": f"Order with id {order_id} not found"}), 404
        
        order.status = "Shipped"
        db.session.commit()
        
        return jsonify({"message": f"Order {order_id} marked as shipped"}), 200
    
    def send_shipping_confirmation_email(self):
        """Send shipping confirmation email (simulated)"""
        data = request.get_json()
        order_id = data.get("order_id")
        
        if not order_id:
            return jsonify({"error": "Missing order_id"}), 400
        
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": f"Order with id {order_id} not found"}), 404
        
        # Simulate sending email
        return jsonify({
            "message": f"Shipping confirmation email sent for order {order_id}",
            "recipient": order.user.contact if order.user else None
        }), 200