from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "velocity"
    debug: bool = True
    
    # Placeholders for future integrations
    gemini_api_key: str | None = None
    
    class Config:
        env_file = ".env"

settings = Settings()
