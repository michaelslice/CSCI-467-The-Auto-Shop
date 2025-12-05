"""
routes.py specifies all the endpoints for the API
"""

from flask import Blueprint, request
from flask import jsonify
from app import db
from app.health.health_service import Health
from app.auth.auth_service import Auth
from app.customer.customer_service import Customer
from app.warehouse_worker.worker_service import Worker
from app.warehouse_receiver.receiver_service import Receiver
from app.warehouse_administrator.administrator_service import Administrator
from app.models import User, Part, ShoppingCart, OrderItem, Order

main = Blueprint("main", __name__)

@main.route("/health", methods=["GET"])
def health():
    print("TEST!")
    return Health().getHealth(), 200

@main.route("/signin", methods=["POST"])
def signin_user():
    return Auth().signin()

@main.route("/signout", methods=["POST"])
def signout_user():
    return Auth().signout()

@main.route("/add_to_cart", methods=["POST"])
def add_to_cart_route():
    return Customer().add_to_cart()

@main.route("/parts", methods=["GET"])
def get_all_parts():
    return Customer().get_all_parts(), 200

@main.route("/checkout_order", methods=["POST"])
def checkout_order_route():
    return Customer().checkout_order()

@main.route("/cart", methods=["GET"])
def get_cart_route():
    return Customer().shopping_cart_status()

@main.route("/order_history", methods=["GET"])
def get_order_history_route():
    """
    Frontend calls:
      GET /order_history?user_id=<id>

    Customer().get_order_history() must read request.args["user_id"]
    """
    return Customer().get_order_history()

@main.route("/test_users", methods=["GET"])
def test_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

@main.route("/test_shopping_cart", methods=["GET"])
def test_shopping_cart():
    shopping_cart = OrderItem.query.all()
    for data in shopping_cart:
        print(data)
    return jsonify({"data": "test"}), 200

@main.route("/worker/completed_orders", methods=["GET"])
def view_completed_orders_route():
    return Worker().view_completed_orders()

@main.route("/worker/packing_labels", methods=["GET"])
def print_packing_labels_route():
    return Worker().print_packing_labels()

@main.route("/worker/products", methods=["GET"])
def worker_browse_products_route():
    return Worker().browse_products()

@main.route("/worker/items_to_pack", methods=["GET"])
def retrieve_items_to_pack_route():
    return Worker().retrieve_items_to_pack()

@main.route("/worker/invoice_shipping_label", methods=["GET"])
def print_invoice_shipping_label_route():
    return Worker().print_invoice_shipping_label()

@main.route("/worker/mark_shipped", methods=["POST"])
def mark_order_as_shipped_route():
    return Worker().mark_order_as_shipped()

@main.route("/worker/send_shipping_confirmation", methods=["POST"])
def send_shipping_confirmation_email_route():
    return Worker().send_shipping_confirmation_email()

@main.route("/receiver/receive_products", methods=["POST"])
def receive_delivered_products_route():
    return Receiver().receive_delivered_products()

@main.route("/receiver/products", methods=["GET"])
def receiver_browse_products_route():
    return Receiver().browse_products()

@main.route("/receiver/identify_product", methods=["GET"])
def identify_product_route():
    return Receiver().identify_product()

@main.route("/receiver/update_quantity", methods=["POST"])
def update_quantity_on_hand_route():
    return Receiver().update_quantity_on_hand()

@main.route("/receiver/inventory", methods=["GET"])
def view_inventory_stock_levels_route():
    return Receiver().view_inventory_stock_levels()

@main.route("/administrator/shipping_charges", methods=["POST"])
def handle_shipping_charges_route():
    return Administrator().handle_shipping_charges()

@main.route("/administrator/orders", methods=["GET"])
def view_all_orders_route():
    return Administrator().view_all_orders()

@main.route("/administrator/weight_brackets", methods=["POST"])
def set_weight_brackets_route():
    return Administrator().set_weight_brackets()

@main.route("/administrator/search_orders", methods=["GET"])
def search_orders_route():
    return Administrator().search_orders()

@main.route("/administrator/orders/<int:order_id>/status", methods=["PUT"])
def update_order_status(order_id):
    data = request.get_json()
    new_status = data.get("status")
    if not new_status:
        return jsonify({"error": "Missing status"}), 400

    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    order.status = new_status
    db.session.commit()

    return jsonify({"order_id": order.id, "status": order.status})