from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class PercentileStats(BaseModel):
    mean_days: Optional[float]
    median_days: Optional[float]
    p50: Optional[float]
    p70: Optional[float]
    p85: Optional[float]
    p95: Optional[float]
    sample_size: int
    warning: Optional[str]


class StatusDuration(BaseModel):
    mean_days: float
    median_days: float


class DateRange(BaseModel):
    from_: Optional[datetime]
    to: Optional[datetime]

    class Config:
        populate_by_name = True

    def model_dump(self, **kwargs):
        d = super().model_dump(**kwargs)
        if "from_" in d:
            d["from"] = d.pop("from_")
        return d


class MetricsSummary(BaseModel):
    import_id: str
    project_key: str
    ticket_count: int
    completed_ticket_count: int
    date_range: dict
    cycle_time: PercentileStats
    lead_time: PercentileStats
    time_in_status: dict[str, StatusDuration]
    throughput_per_week: float


class CycleTimeTicket(BaseModel):
    external_id: str
    title: str
    cycle_time_days: float
    completed_at: datetime
    external_link: Optional[str]


class CycleTimesResponse(BaseModel):
    tickets: list[CycleTimeTicket]


class TimeInStatusTicket(BaseModel):
    external_id: str
    title: str
    status_durations: dict[str, float]


class TimeInStatusResponse(BaseModel):
    statuses: list[str]
    tickets: list[TimeInStatusTicket]


class LLMInsightResponse(BaseModel):
    insight_text: str
    model_used: str
    generated_at: datetime


class LLMStatusResponse(BaseModel):
    available: bool
    models: list[str]
    recommended_model: str
