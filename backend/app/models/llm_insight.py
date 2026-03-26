from __future__ import annotations
from datetime import datetime
from uuid import uuid4

from sqlalchemy import String, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class LLMInsight(Base):
    __tablename__ = "llm_insights"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    import_id: Mapped[str] = mapped_column(ForeignKey("import_sessions.id"), nullable=False)
    model_used: Mapped[str] = mapped_column(String, nullable=False)
    insight_text: Mapped[str] = mapped_column(Text, nullable=False)
    generated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
