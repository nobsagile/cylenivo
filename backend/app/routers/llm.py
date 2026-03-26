from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.llm_service import LLMService

router = APIRouter(prefix="/api/v1/llm", tags=["llm"])


def ok(data):
    return {"data": data, "error": None}


class AnalyzeRequest(BaseModel):
    model: Optional[str] = None


@router.get("/status")
def llm_status(db: Session = Depends(get_db)):
    service = LLMService(db)
    return ok(service.check_status())


@router.post("/analyze/{import_id}")
def analyze(import_id: str, body: AnalyzeRequest = AnalyzeRequest(), db: Session = Depends(get_db)):
    service = LLMService(db)
    try:
        insight = service.analyze(import_id, body.model)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except RuntimeError:
        raise HTTPException(status_code=503, detail="Ollama not available")

    return ok({
        "insight_text": insight.insight_text,
        "model_used": insight.model_used,
        "generated_at": insight.generated_at.isoformat(),
    })


@router.get("/insights/{import_id}")
def get_insight(import_id: str, db: Session = Depends(get_db)):
    service = LLMService(db)
    insight = service.get_insight(import_id)
    if not insight:
        raise HTTPException(status_code=404, detail="No analysis found for this import")
    return ok({
        "insight_text": insight.insight_text,
        "model_used": insight.model_used,
        "generated_at": insight.generated_at.isoformat(),
    })
