from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TransitionSchema(BaseModel):
    from_status: Optional[str] = None
    to_status: str
    transitioned_at: datetime


class TicketImportSchema(BaseModel):
    external_id: str
    title: str
    ticket_type: str
    created_at: datetime
    external_link: Optional[str] = None
    transitions: list[TransitionSchema]
    metadata: Optional[dict] = None


class ImportFileSchema(BaseModel):
    source_type: str
    project_key: str
    base_url: Optional[str] = None
    exported_at: datetime
    tickets: list[TicketImportSchema]
