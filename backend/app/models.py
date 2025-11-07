"""
models.py: Contains classes for Python objects representing DB tables.
"""
from datetime import datetime
from app import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    city = db.Column(db.String(200))
    street = db.Column(db.String(200))
    contact = db.Column(db.String(100))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "city": self.city,
            "street": self.street,
            "contact": self.contact
        }

    def __repr__(self):
        return f"<User {self.id} - {self.name}>"
    
class Part(db.Model):
    __tablename__ = 'parts'

    number = db.Column(db.Integer, primary_key=True) 
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    picture_path_url = db.Column(db.String(500), nullable=True)
    quantity = db.Column(db.Integer, default=0, nullable=False)

    def __repr__(self):
        return f"<Part {self.number} - {self.description}>"
    
class ShoppingCart(db.Model):
    __tablename__ = 'shopping_cart'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    part_number = db.Column(db.Integer, db.ForeignKey('parts.number'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref=db.backref('cart_items', lazy=True, cascade="all, delete-orphan"))
    part = db.relationship('Part', backref=db.backref('cart_entries', lazy=True, cascade="all, delete-orphan"))

    def __repr__(self):
        return f"<ShoppingCart User={self.user_id} Part={self.part_number} Qty={self.quantity}>"

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    total_amount = db.Column(db.Float, nullable=False, default=0.0)
    status = db.Column(db.String(50), default="Pending")  # Can be, Pending, Shipped, Completed, Cancelled

    # Relationship
    user = db.relationship('User', backref=db.backref('orders', lazy=True))
    items = db.relationship('OrderItem', backref='order', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Order {self.id} - User {self.user_id} - Total ${self.total_amount:.2f}>"

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "order_date": self.order_date.isoformat(),
            "total_amount": self.total_amount,
            "status": self.status,
            "items": [item.to_dict() for item in self.items]
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    part_number = db.Column(db.Integer, db.ForeignKey('parts.number'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Float, nullable=False)

    # Relationship
    part = db.relationship('Part', backref=db.backref('order_items', lazy=True))

    def __repr__(self):
        return f"<OrderItem Order={self.order_id} Part={self.part_number} Qty={self.quantity}>"

    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "part_number": self.part_number,
            "description": self.part.description if self.part else None,
            "quantity": self.quantity,
            "unit_price": self.unit_price,
            "subtotal": self.unit_price * self.quantity
        }