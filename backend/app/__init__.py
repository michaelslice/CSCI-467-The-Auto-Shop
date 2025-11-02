from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from app.config import Config

db = SQLAlchemy() 

def create_app():
    app = Flask(__name__)
    CORS(app)
    load_dotenv()

    app.config['SQLALCHEMY_DATABASE_URI'] = Config.get_database_url()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from app.routes import main
    app.register_blueprint(main)

    return app