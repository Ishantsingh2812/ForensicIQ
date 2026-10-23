from fastapi import FastAPI, Header, HTTPException, status
from app.config import settings
from app.schemas.analysis import AnalyzeRequest, AnalysisResult
from app.graph.pipeline import pipeline

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Internal LangGraph microservice for Indian criminal law scenario analysis (IPC & BNS 2023)"
)

@app.get("/health", tags=["Monitoring"])
async def health():
    return {
        "status": "ok",
        "service": settings.app_name,
        "version": "1.0.0"
    }

@app.post(
    "/api/v1/analyze",
    response_model=AnalysisResult,
    tags=["Legal Analysis"],
    summary="Multi-Agent Crime Scenario Evaluation"
)
async def analyze_scenario(
    request: AnalyzeRequest,
    x_internal_token: str = Header(..., alias="X-Internal-Token")
):
    # Verify shared secret token from Spring Boot Core
    if x_internal_token != settings.ai_internal_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing X-Internal-Token header"
        )

    try:
        result = await pipeline.execute(
            scenario=request.scenario,
            framework=request.framework
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"LangGraph pipeline processing error: {str(e)}"
        )
