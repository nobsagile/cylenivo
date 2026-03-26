import statistics
from datetime import datetime

import httpx
from sqlalchemy.orm import Session

from app.config import settings
from app.models.llm_insight import LLMInsight
from app.repositories.import_repository import ImportRepository
from app.repositories.ticket_repository import TicketRepository
from app.analyzers.cycle_time_analyzer import calculate_cycle_time, _first_transition_to
from app.analyzers.lead_time_analyzer import calculate_lead_time
from app.analyzers.percentile_analyzer import calculate_percentiles

LLM_PROMPT_TEMPLATE = """You are a flow analysis expert for software development teams.
Analyze the following metrics and identify patterns, bottlenecks, and anomalies.
Be concise and actionable. Focus on what the team should pay attention to.

PROJECT: {project_key}
TICKETS ANALYZED: {ticket_count} total, {completed_count} completed
DATE RANGE: {date_from} to {date_to}

CYCLE TIME (from {cycle_start} to {cycle_end}):
  Mean: {cycle_mean} days | Median: {cycle_median} days
  P50: {p50} days | P70: {p70} days | P85: {p85} days | P95: {p95} days

LEAD TIME (from ticket creation to {cycle_end}):
  Mean: {lead_mean} days | Median: {lead_median} days

AVERAGE TIME IN STATUS:
{status_times_formatted}

TOP 5 SLOWEST TICKETS (by cycle time):
{slow_tickets_formatted}

Please provide:
1. Key observations (max 3 bullet points, be specific with numbers)
2. The main bottleneck you see and why
3. One concrete, actionable suggestion for the team
"""


class LLMService:
    def __init__(self, db: Session):
        self.db = db
        self.import_repo = ImportRepository(db)
        self.ticket_repo = TicketRepository(db)

    def check_status(self) -> dict:
        try:
            resp = httpx.get(
                f"{settings.OLLAMA_BASE_URL}/api/tags",
                timeout=5.0,
            )
            if resp.status_code == 200:
                data = resp.json()
                models = [m["name"] for m in data.get("models", [])]
                return {
                    "available": True,
                    "models": models,
                    "recommended_model": settings.OLLAMA_MODEL,
                }
        except Exception:
            pass
        return {
            "available": False,
            "models": [],
            "recommended_model": settings.OLLAMA_MODEL,
        }

    def analyze(self, import_id: str, model: str | None = None) -> LLMInsight:
        model = model or settings.OLLAMA_MODEL
        import_session = self.import_repo.get(import_id)
        if not import_session:
            raise ValueError(f"Import {import_id} not found")

        config = import_session.config
        tickets = self.ticket_repo.list_all_by_import(import_id)

        cycle_times = []
        lead_times = []
        completed_at_dates = []
        ct_with_ticket = []

        for ticket in tickets:
            ct = calculate_cycle_time(
                ticket.transitions, config.cycle_time_start_status, config.cycle_time_end_status
            )
            if ct is not None:
                cycle_times.append(ct)
                end_ts = _first_transition_to(ticket.transitions, config.cycle_time_end_status)
                completed_at_dates.append(end_ts)
                ct_with_ticket.append((ct, ticket.external_id))

            lt = calculate_lead_time(
                ticket.created_at, ticket.transitions, config.cycle_time_end_status, config.lead_time_start_status
            )
            if lt is not None:
                lead_times.append(lt)

        percentiles = calculate_percentiles(cycle_times)
        slowest = sorted(ct_with_ticket, reverse=True)[:5]

        status_times_formatted = "\n".join(
            f"  {s}: n/a" for s in config.status_order
        )

        prompt = LLM_PROMPT_TEMPLATE.format(
            project_key=import_session.project_key,
            ticket_count=len(tickets),
            completed_count=len(cycle_times),
            date_from=min(completed_at_dates).strftime("%Y-%m-%d") if completed_at_dates else "N/A",
            date_to=max(completed_at_dates).strftime("%Y-%m-%d") if completed_at_dates else "N/A",
            cycle_start=config.cycle_time_start_status,
            cycle_end=config.cycle_time_end_status,
            cycle_mean=round(statistics.mean(cycle_times), 1) if cycle_times else "N/A",
            cycle_median=round(statistics.median(cycle_times), 1) if cycle_times else "N/A",
            p50=percentiles.get("p50"),
            p70=percentiles.get("p70"),
            p85=percentiles.get("p85"),
            p95=percentiles.get("p95"),
            lead_mean=round(statistics.mean(lead_times), 1) if lead_times else "N/A",
            lead_median=round(statistics.median(lead_times), 1) if lead_times else "N/A",
            status_times_formatted=status_times_formatted,
            slow_tickets_formatted="\n".join(f"  {tid}: {round(ct, 1)} days" for ct, tid in slowest),
        )

        resp = httpx.post(
            f"{settings.OLLAMA_BASE_URL}/api/generate",
            json={"model": model, "prompt": prompt, "stream": False},
            timeout=120.0,
        )
        if resp.status_code != 200:
            raise RuntimeError("Ollama returned non-200 status")

        insight_text = resp.json().get("response", "")

        existing = (
            self.db.query(LLMInsight)
            .filter(LLMInsight.import_id == import_id)
            .first()
        )
        if existing:
            existing.insight_text = insight_text
            existing.model_used = model
            existing.generated_at = datetime.utcnow()
            self.db.commit()
            self.db.refresh(existing)
            return existing

        insight = LLMInsight(
            import_id=import_id,
            model_used=model,
            insight_text=insight_text,
        )
        self.db.add(insight)
        self.db.commit()
        self.db.refresh(insight)
        return insight

    def _build_context(self, import_id: str) -> tuple[str, str]:
        """Returns (system_prompt, project_key) with metrics context for chat."""
        import_session = self.import_repo.get(import_id)
        if not import_session:
            raise ValueError(f"Import {import_id} not found")

        config = import_session.config
        tickets = self.ticket_repo.list_all_by_import(import_id)

        cycle_times = []
        lead_times = []
        ct_with_ticket = []

        for ticket in tickets:
            ct = calculate_cycle_time(
                ticket.transitions, config.cycle_time_start_status, config.cycle_time_end_status
            )
            if ct is not None:
                cycle_times.append(ct)
                ct_with_ticket.append((ct, ticket.external_id))
            lt = calculate_lead_time(
                ticket.created_at, ticket.transitions, config.cycle_time_end_status, config.lead_time_start_status
            )
            if lt is not None:
                lead_times.append(lt)

        percentiles = calculate_percentiles(cycle_times)
        slowest = sorted(ct_with_ticket, reverse=True)[:5]

        system_prompt = f"""You are a flow analysis expert for software development teams.
You have access to the following data for project {import_session.project_key}:

TICKETS: {len(tickets)} total, {len(cycle_times)} completed
CYCLE TIME ({config.cycle_time_start_status} → {config.cycle_time_end_status}):
  Median: {round(statistics.median(cycle_times), 1) if cycle_times else 'N/A'} days
  P50: {percentiles.get('p50')} | P70: {percentiles.get('p70')} | P85: {percentiles.get('p85')} | P95: {percentiles.get('p95')} days
LEAD TIME: Median {round(statistics.median(lead_times), 1) if lead_times else 'N/A'} days
TOP 5 SLOWEST: {', '.join(f'{tid} ({round(ct,1)}d)' for ct, tid in slowest)}

Answer questions about this data concisely and specifically. Use numbers from the data above."""

        return system_prompt, import_session.project_key

    def chat(self, import_id: str, messages: list[dict], model: str | None = None) -> str:
        model = model or settings.OLLAMA_MODEL
        system_prompt, _ = self._build_context(import_id)

        ollama_messages = [{"role": "system", "content": system_prompt}] + messages

        resp = httpx.post(
            f"{settings.OLLAMA_BASE_URL}/api/chat",
            json={"model": model, "messages": ollama_messages, "stream": False},
            timeout=120.0,
        )
        if resp.status_code != 200:
            raise RuntimeError("Ollama returned non-200 status")

        return resp.json().get("message", {}).get("content", "")

    def get_insight(self, import_id: str) -> LLMInsight | None:
        return (
            self.db.query(LLMInsight)
            .filter(LLMInsight.import_id == import_id)
            .first()
        )
