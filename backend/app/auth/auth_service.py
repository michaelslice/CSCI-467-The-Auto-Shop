from flask import Flask, request, jsonify
from app.models import User

class Auth:
    def signin(self):
        data = request.get_json()

        name = data.get("username")
        password = data.get("password")

        if not name or not password:
            return jsonify({"error": "Missing username or password"}), 400

        # Fetch user by username
        user = User.query.filter_by(name=name).first()

        if user is None:
            return jsonify({"error": "User not found"}), 404

        account_type = None

        if name == "customer":
            account_type = "customer" 

        elif name == "worker":
            account_type = "worker"
            
        elif name == "admin":
            account_type = "admin"

        user_data = {
            "id": user.id,
            "name": user.name,
            "city": user.city,
            "street": user.street,
            "contact": user.contact,
            "user": account_type
        }

        return jsonify({"user": user_data}), 200
    
    def signout(self):
        return jsonify({"user": "default"}), 200