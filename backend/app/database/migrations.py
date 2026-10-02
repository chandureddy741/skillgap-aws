"""Simple migration entrypoint: creates all tables."""
from app.database.database import init_db

if __name__ == "__main__":
    init_db()
    print("Database tables created.")
