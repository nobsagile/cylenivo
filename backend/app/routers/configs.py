from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project_config import ProjectConfig
from app.repositories.config_repository import ConfigRepository
from app.schemas.project_config import ProjectConfigCreate, ProjectConfigUpdate, ProjectConfigResponse

router = APIRouter(prefix="/api/v1/configs", tags=["configs"])


def ok(data):
    return {"data": data, "error": None}


@router.post("", status_code=201)
def create_config(body: ProjectConfigCreate, db: Session = Depends(get_db)):
    repo = ConfigRepository(db)
    config = ProjectConfig(**body.model_dump())
    return ok(ProjectConfigResponse.model_validate(repo.create(config)))


@router.get("")
def list_configs(db: Session = Depends(get_db)):
    repo = ConfigRepository(db)
    return ok([ProjectConfigResponse.model_validate(c) for c in repo.list()])


@router.get("/{config_id}")
def get_config(config_id: str, db: Session = Depends(get_db)):
    repo = ConfigRepository(db)
    config = repo.get(config_id)
    if not config:
        raise HTTPException(status_code=404, detail="Config not found")
    return ok(ProjectConfigResponse.model_validate(config))


@router.put("/{config_id}")
def update_config(config_id: str, body: ProjectConfigUpdate, db: Session = Depends(get_db)):
    repo = ConfigRepository(db)
    config = repo.get(config_id)
    if not config:
        raise HTTPException(status_code=404, detail="Config not found")
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(config, field, value)
    return ok(ProjectConfigResponse.model_validate(repo.update(config)))


@router.delete("/{config_id}", status_code=204)
def delete_config(config_id: str, db: Session = Depends(get_db)):
    repo = ConfigRepository(db)
    config = repo.get(config_id)
    if not config:
        raise HTTPException(status_code=404, detail="Config not found")
    if repo.has_imports(config_id):
        raise HTTPException(status_code=409, detail="Config has associated imports. Delete imports first.")
    repo.delete(config)
