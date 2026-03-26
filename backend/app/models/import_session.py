from __future__ import annotations
from datetime import datetime
from typing import List
from uuid import uuid4

from sqlalchemy import String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ImportSession(Base):
    __tablename__ = "import_sessions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    config_id: Mapped[str] = mapped_column(ForeignKey("project_configs.id"), nullable=False)
    source_type: Mapped[str] = mapped_column(String, nullable=False)
    project_key: Mapped[str] = mapped_column(String, nullable=False)
    file_name: Mapped[str] = mapped_column(String, nullable=False)
    ticket_count: Mapped[int] = mapped_column(Integer, default=0)
    imported_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    config: Mapped["ProjectConfig"] = relationship("ProjectConfig", back_populates="imports")
    tickets: Mapped[List["Ticket"]] = relationship(
        "Ticket", back_populates="import_session", cascade="all, delete-orphan"
    )
