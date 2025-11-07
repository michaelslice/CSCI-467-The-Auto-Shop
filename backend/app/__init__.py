# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from .data_setup import customers, parts_data

db = SQLAlchemy() 

def insert_users():
    from app.models import User, Part
    from app import db  

    for data in customers:
        # print(data)
        new_user = User(
            id=data["id"],
            name=data["name"],
            city=data["city"],
            street=data["street"],
            contact=data["contact"]
        )
        db.session.add(new_user)

    # Commit all customers at once
    db.session.commit()    

def insert_parts():
    from app.models import User, Part
    from app import db  

    for part_info in parts_data:
        existing_part = Part.query.get(part_info["number"])
        if not existing_part:
            new_part = Part(**part_info)
            db.session.add(new_part)
    db.session.commit()

def create_app():
    load_dotenv()
    
    app = Flask(__name__)
    CORS(app)
    
    # Load and validate config!
    from app.config import Config
    app.config.from_object(Config)
    Config.validate()
    
    # Initialize app!
    db.init_app(app)
    
    # Initialize all DB models for our application!
    from app.models import User    
    with app.app_context():
        # db.drop_all()
        # insert_users()
        # insert_parts()
        db.create_all()
        print("Tables created successfully!")
    
    # Register all blueprint routes!
    from app.routes import main
    app.register_blueprint(main)
    
    return app