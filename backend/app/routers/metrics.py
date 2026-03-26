from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.metrics_service import MetricsService

router = APIRouter(prefix="/api/v1/metrics", tags=["metrics"])


def ok(data):
    return {"data": data, "error": None}


@router.get("/{import_id}/summary")
def get_summary(import_id: str, db: Session = Depends(get_db)):
    service = MetricsService(db)
    try:
        return ok(service.get_summary(import_id))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/{import_id}/cycle-times")
def get_cycle_times(import_id: str, db: Session = Depends(get_db)):
    service = MetricsService(db)
    try:
        return ok(service.get_cycle_times(import_id))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/{import_id}/time-in-status")
def get_time_in_status(import_id: str, db: Session = Depends(get_db)):
    service = MetricsService(db)
    try:
        return ok(service.get_time_in_status(import_id))
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
