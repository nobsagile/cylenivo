import json

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.import_session import ImportFileSchema
from app.schemas.ticket import ImportSessionResponse
from app.services.import_service import ImportService
from app.repositories.import_repository import ImportRepository

router = APIRouter(prefix="/api/v1/imports", tags=["imports"])


def ok(data):
    return {"data": data, "error": None}


@router.post("", status_code=201)
async def upload_import(
    file: UploadFile = File(...),
    config_id: str = Form(...),
    db: Session = Depends(get_db),
):
    try:
        contents = await file.read()
        raw = json.loads(contents)
    except (json.JSONDecodeError, UnicodeDecodeError):
        raise HTTPException(status_code=400, detail="Invalid JSON file")

    try:
        data = ImportFileSchema.model_validate(raw)
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=str(e))

    service = ImportService(db)
    try:
        session = service.create_import(data, config_id, file.filename or "upload.json")
    except ValueError as e:
        msg = str(e)
        if "not found" in msg:
            raise HTTPException(status_code=404, detail=msg)
        raise HTTPException(status_code=400, detail=msg)

    resp = ImportSessionResponse.model_validate(session)
    resp.config_name = session.config.name if session.config else None
    return ok(resp)


@router.get("")
def list_imports(db: Session = Depends(get_db)):
    repo = ImportRepository(db)
    sessions = repo.list()
    result = []
    for s in sessions:
        r = ImportSessionResponse.model_validate(s)
        r.config_name = s.config.name if s.config else None
        result.append(r)
    return ok(result)


@router.get("/{import_id}")
def get_import(import_id: str, db: Session = Depends(get_db)):
    repo = ImportRepository(db)
    session = repo.get(import_id)
    if not session:
        raise HTTPException(status_code=404, detail="Import not found")
    r = ImportSessionResponse.model_validate(session)
    r.config_name = session.config.name if session.config else None
    return ok(r)


@router.delete("/{import_id}", status_code=204)
def delete_import(import_id: str, db: Session = Depends(get_db)):
    repo = ImportRepository(db)
    session = repo.get(import_id)
    if not session:
        raise HTTPException(status_code=404, detail="Import not found")
    repo.delete(session)
