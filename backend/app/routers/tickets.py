from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.repositories.config_repository import ConfigRepository
from app.repositories.import_repository import ImportRepository
from app.repositories.ticket_repository import TicketRepository
from app.analyzers.cycle_time_analyzer import calculate_cycle_time, _first_transition_to
from app.analyzers.lead_time_analyzer import calculate_lead_time
from app.schemas.ticket import TicketResponse, TicketDetailResponse, TicketTransitionResponse, PaginatedTickets

router = APIRouter(prefix="/api/v1/tickets", tags=["tickets"])


def ok(data):
    return {"data": data, "error": None}


def _enrich_ticket(ticket, config) -> dict:
    ct = calculate_cycle_time(
        ticket.transitions, config.cycle_time_start_status, config.cycle_time_end_status
    )
    lt = calculate_lead_time(
        ticket.created_at, ticket.transitions, config.cycle_time_end_status, config.lead_time_start_status
    )
    end_ts = _first_transition_to(ticket.transitions, config.cycle_time_end_status)
    current_status = (
        sorted(ticket.transitions, key=lambda t: t.transitioned_at)[-1].to_status
        if ticket.transitions else None
    )
    return {
        "id": ticket.id,
        "external_id": ticket.external_id,
        "title": ticket.title,
        "ticket_type": ticket.ticket_type,
        "created_at": ticket.created_at,
        "external_link": ticket.external_link,
        "cycle_time_days": round(ct, 2) if ct is not None else None,
        "lead_time_days": round(lt, 2) if lt is not None else None,
        "current_status": current_status,
        "completed": end_ts is not None,
    }


@router.get("")
def list_tickets(
    import_id: str = Query(...),
    type: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    import_repo = ImportRepository(db)
    import_session = import_repo.get(import_id)
    if not import_session:
        raise HTTPException(status_code=404, detail="Import not found")

    config = import_session.config
    ticket_repo = TicketRepository(db)
    tickets, total = ticket_repo.list_by_import(import_id, ticket_type=type, page=page, limit=limit)

    enriched = [_enrich_ticket(t, config) for t in tickets]
    return ok({"tickets": enriched, "total": total, "page": page, "limit": limit})


@router.get("/{ticket_id}")
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket_repo = TicketRepository(db)
    ticket = ticket_repo.get(ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    import_repo = ImportRepository(db)
    import_session = import_repo.get(ticket.import_id)
    config = import_session.config

    enriched = _enrich_ticket(ticket, config)
    enriched["transitions"] = [
        {
            "id": t.id,
            "from_status": t.from_status,
            "to_status": t.to_status,
            "transitioned_at": t.transitioned_at,
        }
        for t in sorted(ticket.transitions, key=lambda x: x.transitioned_at)
    ]
    return ok(enriched)
