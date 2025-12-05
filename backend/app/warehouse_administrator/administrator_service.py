from flask import request, jsonify
from app import db
from app.models import Order, OrderItem, Part
from datetime import datetime
from sqlalchemy import and_, or_

class Administrator:
    
    def handle_shipping_charges(self):
        """Handle shipping and charges for orders"""
        data = request.get_json()
        order_id = data.get("order_id")
        shipping_charge = data.get("shipping_charge", 0.0)
        
        if not order_id:
            return jsonify({"error": "Missing order_id"}), 400
        
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": f"Order with id {order_id} not found"}), 404
        
        # Update order total with shipping charge
        order.total_amount += shipping_charge
        db.session.commit()
        
        return jsonify({
            "message": f"Shipping charge applied to order {order_id}",
            "order_id": order_id,
            "shipping_charge": shipping_charge,
            "new_total_amount": order.total_amount
        }), 200
    
    def view_all_orders(self):
        """View all orders"""
        orders = Order.query.all()
        orders_list = []
        for order in orders:
            orders_list.append(order.to_dict())
        return jsonify(orders_list), 200
    
    def set_weight_brackets(self):
        """Set weight brackets for shipping calculation"""
        data = request.get_json()
        brackets = data.get("brackets")
        
        if not brackets:
            return jsonify({"error": "Missing brackets"}), 400
        
        # This would typically be stored in a configuration table
        # For now, we'll just return success
        # lol???
        return jsonify({
            "message": "Weight brackets updated",
            "brackets": brackets
        }), 200
    
    def search_orders(self):
        """Search orders based on date range, status, or price range"""
        start_date = request.args.get("start_date", type=str)
        end_date = request.args.get("end_date", type=str)
        status = request.args.get("status", type=str)
        min_price = request.args.get("min_price", type=float)
        max_price = request.args.get("max_price", type=float)
        
        query = Order.query
        
        # Filter by date range
        if start_date:
            try:
                start_dt = datetime.fromisoformat(start_date)
                query = query.filter(Order.order_date >= start_dt)
            except ValueError:
                return jsonify({"error": "Invalid start_date format. Use ISO format."}), 400
        
        if end_date:
            try:
                end_dt = datetime.fromisoformat(end_date)
                query = query.filter(Order.order_date <= end_dt)
            except ValueError:
                return jsonify({"error": "Invalid end_date format. Use ISO format."}), 400
        
        # Filter by status
        if status:
            query = query.filter(Order.status == status)
        
        # Filter by price range
        if min_price is not None:
            query = query.filter(Order.total_amount >= min_price)
        
        if max_price is not None:
            query = query.filter(Order.total_amount <= max_price)
        
        orders = query.all()
        orders_list = []
        for order in orders:
            orders_list.append(order.to_dict())
        
        return jsonify(orders_list), 200