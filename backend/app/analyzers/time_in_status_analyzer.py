from datetime import datetime


def calculate_time_in_status(
    transitions: list,
    reference_statuses: list[str],
) -> dict[str, float]:
    result = {s: 0.0 for s in reference_statuses}

    sorted_transitions = sorted(transitions, key=lambda t: t.transitioned_at)

    for i, transition in enumerate(sorted_transitions):
        status = transition.to_status
        if status not in result:
            continue
        entered_at = transition.transitioned_at
        if i + 1 < len(sorted_transitions):
            left_at = sorted_transitions[i + 1].transitioned_at
        else:
            left_at = datetime.utcnow()
        duration_days = (left_at - entered_at).total_seconds() / 86400.0
        result[status] += duration_days

    return result
