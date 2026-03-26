from typing import Optional
from sqlalchemy.orm import Session

from app.models.project_config import ProjectConfig
from app.repositories.base_repository import BaseRepository


class ConfigRepository(BaseRepository):
    def __init__(self, db: Session):
        self.db = db

    def create(self, config: ProjectConfig) -> ProjectConfig:
        self.db.add(config)
        self.db.commit()
        self.db.refresh(config)
        return config

    def list(self) -> list[ProjectConfig]:
        return (
            self.db.query(ProjectConfig)
            .order_by(ProjectConfig.created_at.desc())
            .all()
        )

    def get(self, config_id: str) -> Optional[ProjectConfig]:
        return self.db.query(ProjectConfig).filter(ProjectConfig.id == config_id).first()

    def update(self, config: ProjectConfig) -> ProjectConfig:
        self.db.commit()
        self.db.refresh(config)
        return config

    def delete(self, config: ProjectConfig) -> None:
        self.db.delete(config)
        self.db.commit()

    def has_imports(self, config_id: str) -> bool:
        from app.models.import_session import ImportSession
        return (
            self.db.query(ImportSession)
            .filter(ImportSession.config_id == config_id)
            .count()
            > 0
        )
