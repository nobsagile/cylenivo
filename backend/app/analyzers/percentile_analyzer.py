from datetime import datetime

MINIMUM_SAMPLE_SIZE = 10


def calculate_percentiles(cycle_times: list[float]) -> dict:
    if len(cycle_times) < MINIMUM_SAMPLE_SIZE:
        return {
            "p50": None,
            "p70": None,
            "p85": None,
            "p95": None,
            "sample_size": len(cycle_times),
            "warning": (
                f"Insufficient data (n={len(cycle_times)}). "
                f"At least {MINIMUM_SAMPLE_SIZE} completed tickets recommended."
            ),
        }

    sorted_times = sorted(cycle_times)

    def pct(p: int) -> float:
        return sorted_times[int(len(sorted_times) * p / 100)]

    return {
        "p50": pct(50),
        "p70": pct(70),
        "p85": pct(85),
        "p95": pct(95),
        "sample_size": len(cycle_times),
        "warning": None,
    }


def calculate_throughput_per_week(completed_at_dates: list[datetime]) -> float:
    if len(completed_at_dates) < 2:
        return float(len(completed_at_dates))
    min_date = min(completed_at_dates)
    max_date = max(completed_at_dates)
    weeks = max((max_date - min_date).days / 7.0, 1.0)
    return round(len(completed_at_dates) / weeks, 1)
