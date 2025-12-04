from flask import request, jsonify
from app import db
from app.models import Part, Order

class Receiver:
    
    def receive_delivered_products(self):
        """Receive delivered products and update inventory"""
        data = request.get_json()
        part_number = data.get("part_number")
        quantity_received = data.get("quantity_received")
        
        if not part_number or quantity_received is None:
            return jsonify({"error": "Missing part_number or quantity_received"}), 400
        
        part = Part.query.get(part_number)
        if not part:
            return jsonify({"error": f"Part with number {part_number} not found"}), 404
        
        part.quantity += quantity_received
        db.session.commit()
        
        return jsonify({
            "message": f"Received {quantity_received} units of part {part_number}",
            "part_number": part_number,
            "quantity_received": quantity_received,
            "new_quantity_on_hand": part.quantity
        }), 200
    
    def browse_products(self):
        """Browse products"""
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
    
    def identify_product(self):
        """Identify product by part number or description"""
        part_number = request.args.get("part_number", type=int)
        description = request.args.get("description", type=str)
        
        if part_number:
            part = Part.query.get(part_number)
            if not part:
                return jsonify({"error": f"Part with number {part_number} not found"}), 404
            return jsonify({
                "number": part.number,
                "description": part.description,
                "price": part.price,
                "weight": part.weight,
                "picture_path_url": part.picture_path_url,
                "quantity": part.quantity
            }), 200
        
        elif description:
            parts = Part.query.filter(Part.description.ilike(f"%{description}%")).all()
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
        
        else:
            return jsonify({"error": "Must provide either part_number or description"}), 400
    
    def update_quantity_on_hand(self):
        """Update quantity on hand for a part"""
        data = request.get_json()
        part_number = data.get("part_number")
        new_quantity = data.get("quantity")
        
        if not part_number or new_quantity is None:
            return jsonify({"error": "Missing part_number or quantity"}), 400
        
        part = Part.query.get(part_number)
        if not part:
            return jsonify({"error": f"Part with number {part_number} not found"}), 404
        
        part.quantity = new_quantity
        db.session.commit()
        
        return jsonify({
            "message": f"Quantity updated for part {part_number}",
            "part_number": part_number,
            "new_quantity": part.quantity
        }), 200
    
    def view_inventory_stock_levels(self):
        """View inventory stock levels"""
        parts = Part.query.all()
        inventory = []
        for part in parts:
            inventory.append({
                "part_number": part.number,
                "description": part.description,
                "quantity_on_hand": part.quantity,
                "price": part.price
            })
        return jsonify({"inventory": inventory}), 200