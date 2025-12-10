from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    database_url: str
    
    db_password: str | None = None
    db_name: str | None = None

    model_config = SettingsConfigDict(
        env_file = BASE_DIR / ".env" ,
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
