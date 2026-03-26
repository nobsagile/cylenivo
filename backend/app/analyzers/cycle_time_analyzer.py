from datetime import datetime
from typing import Optional


def _first_transition_to(transitions: list, status: str) -> Optional[datetime]:
    for t in sorted(transitions, key=lambda x: x.transitioned_at):
        if t.to_status == status:
            return t.transitioned_at
    return None


def calculate_cycle_time(
    transitions: list,
    start_status: str,
    end_status: str,
) -> Optional[float]:
    start_ts = _first_transition_to(transitions, start_status)
    end_ts = _first_transition_to(transitions, end_status)
    if start_ts is None or end_ts is None:
        return None
    if end_ts <= start_ts:
        return None
    return (end_ts - start_ts).total_seconds() / 86400.0
