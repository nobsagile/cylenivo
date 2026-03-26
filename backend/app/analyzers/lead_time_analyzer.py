from datetime import datetime
from typing import Optional

from app.analyzers.utils import first_transition_to


def calculate_lead_time(
    ticket_created_at: datetime,
    transitions: list,
    end_status: str,
    lead_time_start_status: Optional[str] = None,
) -> Optional[float]:
    end_ts = first_transition_to(transitions, end_status)
    if end_ts is None:
        return None

    if lead_time_start_status is None:
        start_ts = ticket_created_at
    else:
        start_ts = first_transition_to(transitions, lead_time_start_status)
        if start_ts is None:
            return None

    if end_ts <= start_ts:
        return None
    return (end_ts - start_ts).total_seconds() / 86400.0
