from typing import Optional
from sqlalchemy.orm import Session, joinedload

from app.models.import_session import ImportSession
from app.repositories.base_repository import BaseRepository


class ImportRepository(BaseRepository):
    def __init__(self, db: Session):
        self.db = db

    def create(self, session: ImportSession) -> ImportSession:
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        return session

    def list(self) -> list[ImportSession]:
        return (
            self.db.query(ImportSession)
            .options(joinedload(ImportSession.config))
            .order_by(ImportSession.imported_at.desc())
            .all()
        )

    def get(self, import_id: str) -> Optional[ImportSession]:
        return (
            self.db.query(ImportSession)
            .options(joinedload(ImportSession.config))
            .filter(ImportSession.id == import_id)
            .first()
        )

    def delete(self, session: ImportSession) -> None:
        self.db.delete(session)
        self.db.commit()
