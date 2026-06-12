from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables or .env file.
    All settings here correspond to variables in your .env file.
    """
    gemini_api_key: str
    gemini_model: str = "gemini-2.5-flash"
    max_pdf_size_mb: int = 10
    app_env: str = "development"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """Returns a cached Settings instance (reads .env only once)."""
    return Settings()


# Module-level singleton — import `settings` in other files
settings = get_settings()
