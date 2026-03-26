from datetime import datetime
from typing import Optional


def first_transition_to(transitions: list, status: str) -> Optional[datetime]:
    """Return the datetime of the first transition into `status`, or None."""
    for t in sorted(transitions, key=lambda x: x.transitioned_at):
        if t.to_status == status:
            return t.transitioned_at
    return None
