from __future__ import annotations
from datetime import datetime
from typing import Optional
from uuid import uuid4

from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class TicketTransition(Base):
    __tablename__ = "ticket_transitions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    ticket_id: Mapped[str] = mapped_column(ForeignKey("tickets.id"), nullable=False)
    from_status: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    to_status: Mapped[str] = mapped_column(String, nullable=False)
    transitioned_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)

    ticket: Mapped["Ticket"] = relationship("Ticket", back_populates="transitions")
