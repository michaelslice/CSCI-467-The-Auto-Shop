"""
app.py is the main runner of the api
"""
from flask import Flask
from app.routes import main

def create_app():
    '''
    create_app: Is the application factory function 
    '''
    app = Flask(__name__)
    
    # Register Blueprints
    app.register_blueprint(main)

    return app