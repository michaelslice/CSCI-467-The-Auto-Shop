"""
app.py is the main runner of the api
"""
from flask import Flask
from flask_cors import CORS
from .routes import main

def create_app():
    '''
    create_app: Is the application factory function 
    '''
    app = Flask(__name__)
    CORS(app)
    
    # Register Blueprints
    app.register_blueprint(main)

    return app