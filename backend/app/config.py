import os
from dotenv import load_dotenv

load_dotenv()

class Config:

    POSTGRES_USER = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    DATABASE_NAME = os.getenv("DATABASE_NAME")
    POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_PORT = int(os.getenv("POSTGRES_PORT", 5432))
    SSLMODE = os.getenv("SSLMODE", "prefer")
    
    # Build database URI
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}"
        f"@{POSTGRES_HOST}:{POSTGRES_PORT}/{DATABASE_NAME}"
        f"?sslmode={SSLMODE}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    @classmethod
    def validate(cls):
        """Validate required environment variables"""
        required = ['POSTGRES_USER', 'POSTGRES_PASSWORD', 'DATABASE_NAME']
        missing = [var for var in required if not getattr(cls, var)]
        if missing:
            raise ValueError(f"Missing required env variables: {', '.join(missing)}")