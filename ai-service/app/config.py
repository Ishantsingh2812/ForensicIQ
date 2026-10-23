import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "ForensicAI LangGraph Microservice"
    ai_internal_token: str = os.getenv("AI_INTERNAL_TOKEN", "forensic-ai-internal-shared-secret-key-2026")
    qdrant_url: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    qdrant_grpc_port: int = int(os.getenv("QDRANT_GRPC_PORT", "6334"))
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    anthropic_api_key: str = os.getenv("ANTHROPIC_API_KEY", "")
    cohere_api_key: str = os.getenv("COHERE_API_KEY", "")
    llm_provider: str = os.getenv("LLM_PROVIDER", "mock")

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
