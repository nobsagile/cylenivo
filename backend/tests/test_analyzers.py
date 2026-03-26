from datetime import datetime, timedelta
from types import SimpleNamespace

import pytest

from app.analyzers.cycle_time_analyzer import calculate_cycle_time
from app.analyzers.lead_time_analyzer import calculate_lead_time
from app.analyzers.time_in_status_analyzer import calculate_time_in_status
from app.analyzers.percentile_analyzer import calculate_percentiles, calculate_throughput_per_week


def make_transition(to_status, transitioned_at, from_status=None):
    return SimpleNamespace(
        to_status=to_status,
        from_status=from_status,
        transitioned_at=transitioned_at,
    )


def dt(day: int, month: int = 1, year: int = 2026, hour: int = 9) -> datetime:
    return datetime(year, month, day, hour, 0, 0)


# --- Cycle Time ---

def test_cycle_time_basic():
    transitions = [
        make_transition("Backlog", dt(1)),
        make_transition("Ready for Development", dt(3)),
        make_transition("Development", dt(5)),
        make_transition("Customer Feedback", dt(9)),
    ]
    result = calculate_cycle_time(transitions, "Ready for Development", "Customer Feedback")
    assert result == pytest.approx(6.0)


def test_cycle_time_returns_none_for_in_progress():
    transitions = [
        make_transition("Backlog", dt(1)),
        make_transition("Ready for Development", dt(3)),
        make_transition("Development", dt(5)),
    ]
    result = calculate_cycle_time(transitions, "Ready for Development", "Customer Feedback")
    assert result is None


def test_cycle_time_uses_first_entry_into_start_status():
    transitions = [
        make_transition("Ready for Development", dt(3)),
        make_transition("Development", dt(5)),
        make_transition("Ready for Development", dt(7)),
        make_transition("Development", dt(9)),
        make_transition("Customer Feedback", dt(12)),
    ]
    result = calculate_cycle_time(transitions, "Ready for Development", "Customer Feedback")
    assert result == pytest.approx(9.0)


def test_cycle_time_returns_none_when_end_before_start():
    transitions = [
        make_transition("Customer Feedback", dt(2)),
        make_transition("Ready for Development", dt(5)),
    ]
    result = calculate_cycle_time(transitions, "Ready for Development", "Customer Feedback")
    assert result is None


# --- Lead Time ---

def test_lead_time_uses_created_at_when_no_start_status():
    created_at = dt(1)
    transitions = [
        make_transition("Backlog", dt(1)),
        make_transition("Ready for Development", dt(3)),
        make_transition("Customer Feedback", dt(11)),
    ]
    result = calculate_lead_time(created_at, transitions, "Customer Feedback", None)
    assert result == pytest.approx(10.0)


def test_lead_time_uses_configured_start_status():
    created_at = dt(1)
    transitions = [
        make_transition("Backlog", dt(1)),
        make_transition("Up Next", dt(5)),
        make_transition("Customer Feedback", dt(15)),
    ]
    result = calculate_lead_time(created_at, transitions, "Customer Feedback", "Up Next")
    assert result == pytest.approx(10.0)


# --- Time in Status ---

def test_time_in_status_sums_correctly():
    transitions = [
        make_transition("Backlog", dt(1)),
        make_transition("Development", dt(4)),
        make_transition("Customer Feedback", dt(9)),
    ]
    result = calculate_time_in_status(transitions, ["Backlog", "Development"])
    assert result["Backlog"] == pytest.approx(3.0)
    assert result["Development"] == pytest.approx(5.0)


def test_time_in_status_handles_revisit():
    transitions = [
        make_transition("Development", dt(1)),
        make_transition("Ready for Development", dt(4)),
        make_transition("Development", dt(6)),
        make_transition("Customer Feedback", dt(9)),
    ]
    result = calculate_time_in_status(transitions, ["Development", "Ready for Development"])
    assert result["Development"] == pytest.approx(3.0 + 3.0)
    assert result["Ready for Development"] == pytest.approx(2.0)


# --- Percentiles ---

def test_percentiles_happy_path():
    cycle_times = list(range(1, 21))  # 1..20
    result = calculate_percentiles(cycle_times)
    assert result["warning"] is None
    assert result["sample_size"] == 20
    assert result["p50"] is not None
    assert result["p70"] is not None
    assert result["p85"] is not None
    assert result["p95"] is not None


def test_percentiles_insufficient_data():
    cycle_times = [1.0, 2.0, 3.0, 4.0, 5.0]
    result = calculate_percentiles(cycle_times)
    assert result["p50"] is None
    assert result["warning"] is not None
    assert "n=5" in result["warning"]


# --- Throughput ---

def test_throughput_calculation():
    dates = [dt(1) + timedelta(weeks=i // 2) for i in range(10)]
    result = calculate_throughput_per_week(dates)
    assert result == pytest.approx(2.0, rel=0.5)
