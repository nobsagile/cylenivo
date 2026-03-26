from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class TicketTransitionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    from_status: Optional[str]
    to_status: str
    transitioned_at: datetime


class TicketResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    external_id: str
    title: str
    ticket_type: str
    created_at: datetime
    external_link: Optional[str]
    cycle_time_days: Optional[float] = None
    lead_time_days: Optional[float] = None
    current_status: Optional[str] = None
    completed: bool = False


class TicketDetailResponse(TicketResponse):
    transitions: list[TicketTransitionResponse] = []


class PaginatedTickets(BaseModel):
    tickets: list[TicketResponse]
    total: int
    page: int
    limit: int


class ImportSessionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    config_id: str
    source_type: str
    project_key: str
    file_name: str
    ticket_count: int
    imported_at: datetime
    config_name: Optional[str] = None
