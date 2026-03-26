from __future__ import annotations
from datetime import datetime
from typing import Optional, List
from uuid import uuid4

from sqlalchemy import String, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ProjectConfig(Base):
    __tablename__ = "project_configs"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    name: Mapped[str] = mapped_column(String, nullable=False)
    source_type: Mapped[str] = mapped_column(String, nullable=False)
    base_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    status_order: Mapped[list] = mapped_column(JSON, nullable=False)
    cycle_time_start_status: Mapped[str] = mapped_column(String, nullable=False)
    cycle_time_end_status: Mapped[str] = mapped_column(String, nullable=False)
    lead_time_start_status: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    imports: Mapped[List["ImportSession"]] = relationship("ImportSession", back_populates="config")
