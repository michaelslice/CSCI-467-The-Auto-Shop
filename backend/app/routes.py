"""
routes.py specifies all the endpoints for the api
"""

from flask import Blueprint, redirect, request 
from app.health.health_service import Health 
from app.auth.auth_service import Auth
from flask import jsonify
from sqlalchemy import inspect
from app import db  
from app.models import User, Part, ShoppingCart, OrderItem, Order
from customer.customer_service import Customer

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

@main.route("/add_to_cart", methods=["POST"])
def add_to_cart_route():
    return Customer().add_to_cart()

@main.route('/parts', methods=['GET'])
def get_all_parts():
    return Customer().get_all_parts(), 200

@main.route("/checkout_order", methods=["POST"])
def checkout_order_route():
    return Customer().checkout_order()

@main.route("/cart", methods=["GET"])
def get_cart_route():
    return Customer().shopping_cart_status()

@main.route('/test_users', methods=['GET'])
def test_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

@main.route('/test_shopping_cart', methods=['GET'])
def test_shopping_cart():
    shopping_cart = OrderItem.query.all()
    for data in shopping_cart:
        print(data)
    
    return jsonify({"data": "test"}), 200