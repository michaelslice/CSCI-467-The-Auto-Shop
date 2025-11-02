from flask import Flask, request, jsonify

class Auth:
    def signin(self):
        data = request.get_json()
        
        name = data["username"]
        password = data["password"]

        print(name, password)

        if name == "customer":
            return jsonify({"user": "customer"}), 200
        
        elif name == "worker":
            return jsonify({"user": "worker"}), 200
        
        elif name == "admin":
            return jsonify({"user": "admin"}), 200

        return jsonify({"error": "Invalid Login!"}), 400
    
    def signout(self):
        return jsonify({"user": "default"}), 200