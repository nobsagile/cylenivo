from typing import Optional
from sqlalchemy.orm import Session, joinedload

from app.models.ticket import Ticket
from app.repositories.base_repository import BaseRepository


class TicketRepository(BaseRepository):
    def __init__(self, db: Session):
        self.db = db

    def list_by_import(
        self,
        import_id: str,
        ticket_type: Optional[str] = None,
        page: int = 1,
        limit: int = 50,
    ) -> tuple[list[Ticket], int]:
        q = (
            self.db.query(Ticket)
            .options(joinedload(Ticket.transitions))
            .filter(Ticket.import_id == import_id)
        )
        if ticket_type:
            q = q.filter(Ticket.ticket_type == ticket_type)
        total = q.count()
        tickets = q.offset((page - 1) * limit).limit(limit).all()
        return tickets, total

    def list_all_by_import(self, import_id: str) -> list[Ticket]:
        return (
            self.db.query(Ticket)
            .options(joinedload(Ticket.transitions))
            .filter(Ticket.import_id == import_id)
            .all()
        )

    def get(self, ticket_id: str) -> Optional[Ticket]:
        return (
            self.db.query(Ticket)
            .options(joinedload(Ticket.transitions))
            .filter(Ticket.id == ticket_id)
            .first()
        )
