"""
routes.py specifies all the endpoints for the api
"""

from flask import Blueprint, redirect, request 
from app.health.health_service import Health 
from app.auth.auth_service import Auth
from flask import jsonify

# Blueprint is a way to organize a group of related views and other code 
main = Blueprint("main", __name__)


@main.route("/health", methods=["GET"])
def health():
    if request.method == "GET":
        print("TEST!")    
    
    return Health().getHealth(), 200

@main.route("/signin", methods=["POST"])
def signin():
    data = request.json
    print("Received:", data)

    return jsonify({"success": True, "message": "Signed in"}), 200