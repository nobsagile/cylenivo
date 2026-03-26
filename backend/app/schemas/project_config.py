from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ProjectConfigCreate(BaseModel):
    name: str
    source_type: str
    base_url: Optional[str] = None
    status_order: list[str]
    cycle_time_start_status: str
    cycle_time_end_status: str
    lead_time_start_status: Optional[str] = None


class ProjectConfigUpdate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: Optional[str] = None
    source_type: Optional[str] = None
    base_url: Optional[str] = None
    status_order: Optional[list[str]] = None
    cycle_time_start_status: Optional[str] = None
    cycle_time_end_status: Optional[str] = None
    lead_time_start_status: Optional[str] = None


class ProjectConfigResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    source_type: str
    base_url: Optional[str]
    status_order: list[str]
    cycle_time_start_status: str
    cycle_time_end_status: str
    lead_time_start_status: Optional[str]
    created_at: datetime
