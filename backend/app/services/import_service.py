from uuid import uuid4

from sqlalchemy.orm import Session

from app.importers import IMPORTER_REGISTRY
from app.models.import_session import ImportSession
from app.repositories.config_repository import ConfigRepository
from app.repositories.import_repository import ImportRepository
from app.schemas.import_session import ImportFileSchema


class ImportService:
    def __init__(self, db: Session):
        self.db = db
        self.config_repo = ConfigRepository(db)
        self.import_repo = ImportRepository(db)

    def create_import(self, data: ImportFileSchema, config_id: str, file_name: str) -> ImportSession:
        config = self.config_repo.get(config_id)
        if not config:
            raise ValueError(f"Config {config_id} not found")

        importer_cls = IMPORTER_REGISTRY.get(data.source_type)
        if not importer_cls:
            raise ValueError(f"Unsupported source_type: {data.source_type}")

        import_id = str(uuid4())
        session = ImportSession(
            id=import_id,
            config_id=config_id,
            source_type=data.source_type,
            project_key=data.project_key,
            file_name=file_name,
            ticket_count=len(data.tickets),
        )

        importer = importer_cls()
        tickets, transitions = importer.parse(data, import_id)

        self.db.add(session)
        for ticket in tickets:
            self.db.add(ticket)
        for transition in transitions:
            self.db.add(transition)
        self.db.commit()
        self.db.refresh(session)

        return session
