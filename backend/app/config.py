"""
config.py Setup for database initialization 
"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

class Config:
    POSTGRES_USER     = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_HOST     = os.getenv("POSTGRES_HOST")
    POSTGRES_PORT     = int(os.getenv("POSTGRES_PORT", 25060))
    DATABASE_NAME     = os.getenv("DATABASE_NAME")
    SSLMODE           = os.getenv("SSLMODE")

    @classmethod
    def get_database_url(cls):
        """Construct a PostgreSQL connection string."""
        return (
            f"postgresql+psycopg2://{cls.POSTGRES_USER}:{cls.POSTGRES_PASSWORD}"
            f"@{cls.POSTGRES_HOST}:{cls.POSTGRES_PORT}/{cls.DATABASE_NAME}"
            f"?sslmode={cls.SSLMODE}"
        )
        
    def create_db_and_tables(self):
        """Creates all database tables if they don't exist."""
        try:
            DATABASE_URL = Config.get_database_url()
            engine = create_engine(DATABASE_URL, echo=True, future=True)  
            print("✅ Database tables created successfully (if not already present).")
        except Exception as e:
            print("❌ Failed to create database tables:", e)
            raise