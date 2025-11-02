"""
models.py Contains classess for Python objects representing DB tables
"""
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Text, DECIMAL, DateTime, Enum, ForeignKey, CheckConstraint,
    CHAR
)
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Product(Base):
    __tablename__ = "Product"

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    part_number = Column(String(50), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    picture_url = Column(String(255))
    price = Column(DECIMAL(10, 2), nullable=False)
    weight = Column(DECIMAL(8, 2))

    inventory = relationship("Inventory", back_populates="product", uselist=False)
    cart_items = relationship("ShoppingCartItem", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")

class Inventory(Base):
    __tablename__ = "Inventory"

    inventory_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("Product.product_id"), nullable=False)
    quantity_on_hand = Column(Integer, default=0)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    product = relationship("Product", back_populates="inventory")
    
class Customer(Base):
    __tablename__ = "Customer"

    customer_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    address = Column(Text, nullable=False)
    phone = Column(String(20))

    carts = relationship("ShoppingCart", back_populates="customer")
    orders = relationship("Orders", back_populates="customer")

class ShoppingCart(Base):
    __tablename__ = "ShoppingCart"

    cart_id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey("Customer.customer_id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    customer = relationship("Customer", back_populates="carts")
    items = relationship("ShoppingCartItem", back_populates="cart", cascade="all, delete")


class ShoppingCartItem(Base):
    __tablename__ = "ShoppingCartItem"

    cart_item_id = Column(Integer, primary_key=True, autoincrement=True)
    cart_id = Column(Integer, ForeignKey("ShoppingCart.cart_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("Product.product_id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(DECIMAL(10, 2), nullable=False)

    __table_args__ = (
        CheckConstraint("quantity > 0", name="chk_cartitem_quantity_positive"),
    )

    cart = relationship("ShoppingCart", back_populates="items")
    product = relationship("Product", back_populates="cart_items")

class Orders(Base):
    __tablename__ = "Orders"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey("Customer.customer_id"), nullable=False)
    order_date = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum("Pending", "Authorized", "Packed", "Shipped", "Cancelled", name="order_status_enum"), default="Pending")
    total_price = Column(DECIMAL(10, 2), nullable=False)
    shipping_charge = Column(DECIMAL(10, 2), default=0.00)
    shipping_weight = Column(DECIMAL(8, 2))

    customer = relationship("Customer", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete")
    payments = relationship("Payment", back_populates="order")
    operations = relationship("WarehouseOperation", back_populates="order")
    emails = relationship("EmailNotification", back_populates="order")


class OrderItem(Base):
    __tablename__ = "OrderItem"

    order_item_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("Orders.order_id"), nullable=False)
    product_id = Column(Integer, ForeignKey("Product.product_id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(DECIMAL(10, 2), nullable=False)

    __table_args__ = (
        CheckConstraint("quantity > 0", name="chk_orderitem_quantity_positive"),
    )

    order = relationship("Orders", back_populates="items")
    product = relationship("Product", back_populates="order_items")

class Payment(Base):
    __tablename__ = "Payment"

    payment_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("Orders.order_id"), nullable=False)
    credit_card_number = Column(CHAR(16), nullable=False)
    expiry_date = Column(CHAR(5), nullable=False)
    authorization_number = Column(String(50))
    amount = Column(DECIMAL(10, 2), nullable=False)
    status = Column(Enum("Pending", "Authorized", "Declined", name="payment_status_enum"), default="Pending")
    transaction_date = Column(DateTime, default=datetime.utcnow)

    order = relationship("Orders", back_populates="payments")

class ShippingWeightBracket(Base):
    __tablename__ = "ShippingWeightBracket"

    bracket_id = Column(Integer, primary_key=True, autoincrement=True)
    min_weight = Column(DECIMAL(8, 2), nullable=False)
    max_weight = Column(DECIMAL(8, 2), nullable=False)
    charge = Column(DECIMAL(10, 2), nullable=False)

class WarehouseOperation(Base):
    __tablename__ = "WarehouseOperation"

    operation_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("Orders.order_id"))
    action = Column(Enum("Pack", "Label", "Ship", "Receive", "UpdateInventory", name="operation_action_enum"), nullable=False)
    performed_by = Column(String(100))
    timestamp = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text)

    order = relationship("Orders", back_populates="operations")

class EmailNotification(Base):
    __tablename__ = "EmailNotification"

    email_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("Orders.order_id"), nullable=False)
    email_type = Column(Enum("Order Confirmation", "Shipping Confirmation", name="email_type_enum"), nullable=False)
    sent_to = Column(String(100), nullable=False)
    sent_date = Column(DateTime, default=datetime.utcnow)

    order = relationship("Orders", back_populates="emails")