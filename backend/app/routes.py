"""
routes.py specifies all the endpoints for the api
"""

from flask import Blueprint, redirect, request 
from app.health.health_service import Health 
from app.auth.auth_service import Auth
from flask import jsonify
from app import db  

main = Blueprint("main", __name__)

@main.route("/health", methods=["GET"])
def health():
    if request.method == "GET":
        print("TEST!")    
    
    return Health().getHealth(), 200

@main.route("/signin", methods=["POST"])
def signin_user():

    auth = Auth()
    return auth.signin()

@main.route("/signout", methods=["POST"])
def signout_user():

    auth = Auth()
    return auth.signout()

@main.route("/test-db-connection", methods=["GET"])
def test_db_connection():
    from app import db 

    try:
        result = db.session.execute(db.text("SELECT 1"))
        value = result.scalar()
        return jsonify({
            "message": "Database connection successful",
            "result": value
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Database connection failed",
            "details": str(e)
        }), 500