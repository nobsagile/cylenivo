import statistics
from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Session

from app.analyzers.cycle_time_analyzer import calculate_cycle_time
from app.analyzers.lead_time_analyzer import calculate_lead_time
from app.analyzers.percentile_analyzer import calculate_percentiles, calculate_throughput_per_week
from app.analyzers.time_in_status_analyzer import calculate_time_in_status
from app.analyzers.utils import first_transition_to
from app.repositories.import_repository import ImportRepository
from app.repositories.ticket_repository import TicketRepository


class MetricsService:
    def __init__(self, db: Session):
        self.db = db
        self.import_repo = ImportRepository(db)
        self.ticket_repo = TicketRepository(db)

    def _get_import_and_config(self, import_id: str):
        import_session = self.import_repo.get(import_id)
        if not import_session:
            raise ValueError(f"Import {import_id} not found")
        return import_session, import_session.config

    def get_summary(self, import_id: str) -> dict:
        import_session, config = self._get_import_and_config(import_id)
        tickets = self.ticket_repo.list_all_by_import(import_id)

        cycle_times = []
        lead_times = []
        completed_at_dates = []

        for ticket in tickets:
            ct = calculate_cycle_time(
                ticket.transitions,
                config.cycle_time_start_status,
                config.cycle_time_end_status,
            )
            if ct is not None:
                cycle_times.append(ct)

            lt = calculate_lead_time(
                ticket.created_at,
                ticket.transitions,
                config.cycle_time_end_status,
                config.lead_time_start_status,
            )
            if lt is not None:
                lead_times.append(lt)

            end_ts = first_transition_to(ticket.transitions, config.cycle_time_end_status)
            if end_ts is not None:
                completed_at_dates.append(end_ts)

        ct_percentiles = calculate_percentiles(cycle_times)
        lt_percentiles = calculate_percentiles(lead_times)

        def build_stats(times: list[float], percentiles: dict) -> dict:
            return {
                "mean_days": round(statistics.mean(times), 2) if times else None,
                "median_days": round(statistics.median(times), 2) if times else None,
                **percentiles,
            }

        status_order = config.status_order
        time_in_status_by_status: dict[str, list[float]] = {s: [] for s in status_order}

        for ticket in tickets:
            durations = calculate_time_in_status(ticket.transitions, status_order)
            for status, days in durations.items():
                time_in_status_by_status[status].append(days)

        time_in_status_summary = {
            status: {
                "mean_days": round(statistics.mean(vals), 2) if vals else 0.0,
                "median_days": round(statistics.median(vals), 2) if vals else 0.0,
            }
            for status, vals in time_in_status_by_status.items()
        }

        date_range = {
            "from": min(completed_at_dates).isoformat() if completed_at_dates else None,
            "to": max(completed_at_dates).isoformat() if completed_at_dates else None,
        }

        return {
            "import_id": import_id,
            "project_key": import_session.project_key,
            "ticket_count": len(tickets),
            "completed_ticket_count": len(cycle_times),
            "date_range": date_range,
            "cycle_time": build_stats(cycle_times, ct_percentiles),
            "lead_time": build_stats(lead_times, lt_percentiles),
            "time_in_status": time_in_status_summary,
            "throughput_per_week": calculate_throughput_per_week(completed_at_dates),
        }

    def get_cycle_times(self, import_id: str) -> dict:
        import_session, config = self._get_import_and_config(import_id)
        tickets = self.ticket_repo.list_all_by_import(import_id)

        result = []
        for ticket in tickets:
            ct = calculate_cycle_time(
                ticket.transitions,
                config.cycle_time_start_status,
                config.cycle_time_end_status,
            )
            if ct is None:
                continue
            end_ts = first_transition_to(ticket.transitions, config.cycle_time_end_status)
            result.append({
                "external_id": ticket.external_id,
                "title": ticket.title,
                "cycle_time_days": round(ct, 2),
                "completed_at": end_ts.isoformat(),
                "external_link": ticket.external_link,
            })

        return {"tickets": result}

    def get_lead_times(self, import_id: str) -> dict:
        import_session, config = self._get_import_and_config(import_id)
        tickets = self.ticket_repo.list_all_by_import(import_id)

        values = []
        for ticket in tickets:
            lt = calculate_lead_time(
                ticket.created_at,
                ticket.transitions,
                config.cycle_time_end_status,
                config.lead_time_start_status,
            )
            if lt is not None:
                values.append(round(lt, 2))

        return {"values": values}

    def get_time_in_status(self, import_id: str) -> dict:
        import_session, config = self._get_import_and_config(import_id)
        tickets = self.ticket_repo.list_all_by_import(import_id)
        statuses = config.status_order

        result = []
        for ticket in tickets:
            durations = calculate_time_in_status(ticket.transitions, statuses)
            result.append({
                "external_id": ticket.external_id,
                "title": ticket.title,
                "status_durations": {s: round(d, 2) for s, d in durations.items()},
            })

        return {"statuses": statuses, "tickets": result}
