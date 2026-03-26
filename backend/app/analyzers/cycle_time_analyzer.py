from typing import Optional

from app.analyzers.utils import first_transition_to


def calculate_cycle_time(
    transitions: list,
    start_status: str,
    end_status: str,
) -> Optional[float]:
    start_ts = first_transition_to(transitions, start_status)
    end_ts = first_transition_to(transitions, end_status)
    if start_ts is None or end_ts is None:
        return None
    if end_ts <= start_ts:
        return None
    return (end_ts - start_ts).total_seconds() / 86400.0
