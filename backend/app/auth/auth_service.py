from flask import jsonify

class Auth:
    def signin(self):
        print("ETEST")
        return jsonify({"message": "I am healthy!"})