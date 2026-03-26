from __future__ import annotations
from datetime import datetime
from typing import Optional, List
from uuid import uuid4

from sqlalchemy import String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Ticket(Base):
    __tablename__ = "tickets"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    import_id: Mapped[str] = mapped_column(ForeignKey("import_sessions.id"), nullable=False)
    external_id: Mapped[str] = mapped_column(String, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    ticket_type: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    external_link: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    extra_metadata: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    import_session: Mapped["ImportSession"] = relationship("ImportSession", back_populates="tickets")
    transitions: Mapped[List["TicketTransition"]] = relationship(
        "TicketTransition",
        back_populates="ticket",
        order_by="TicketTransition.transitioned_at",
        cascade="all, delete-orphan",
    )
