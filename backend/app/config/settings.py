import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "AI Skill Gap Analysis Agent"
    API_V1_PREFIX: str = "/api"

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "sqlite:///./skillgap.db"
    )

    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    GROQ_MODEL: str = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")

    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "change-me-in-production")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    CHROMA_PERSIST_DIR: str = os.getenv("CHROMA_PERSIST_DIR", "./chroma_data")

    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "app/static/uploads/resumes")
    MAX_UPLOAD_SIZE_MB: int = 5

    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
