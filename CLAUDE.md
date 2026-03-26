# Flow Analyzer – Claude CLI Context

GIT

We use a local git. If its not there, create it. You commit often. You are NOT allowed to name yourself as co autor when committing! Never ever!

## What this project is

A web application for analyzing software development team flow metrics (Cycle Time, Lead Time, Time in Status, Percentile Forecasting). Teams export ticket data from Jira (and later other tools) and upload it here for analysis.

## Full specification
**Read SPEC.md in full before writing any code.** It contains the complete architecture, data models, API spec, business logic, frontend spec, and test requirements.

## Tech stack (summary)
- Backend: Python 3.12 + FastAPI + SQLAlchemy 2.x + SQLite + Pydantic v2
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Recharts
- Tests: pytest (backend) + Vitest (frontend)
- LLM: Ollama (local, model: qwen3:14b) – optional, graceful degradation when offline

## Architecture rules
- SOLID principles – see SPEC.md section 4
- New data sources: add a new importer in `backend/app/importers/`, never modify existing ones
- Services depend on repository abstractions, not SQLite directly
- All UI strings via react-i18next (`t('key')`) – no hardcoded English in JSX

## Development workflow
```bash
# Backend
cd backend && source venv/bin/activate && uvicorn app.main:app --reload --port 8000
cd backend && pytest -v

# Frontend
cd frontend && npm run dev
cd frontend && npm run test
```

## Build order
Follow the numbered build order in SPEC.md section 15. Run tests after each step.

## Key design decisions
- Import format: standardized JSON (see SPEC.md section 6). Not CSV. The connector script (connectors/jira_export.py) produces this format from the Jira API.
- Database: SQLite via SQLAlchemy. Swappable by changing DATABASE_URL in config.py.
- Cycle time: from first entry into `cycle_time_start_status` to first entry into `cycle_time_end_status`.
- Percentile warning: shown when fewer than 10 completed tickets.
- LLM status endpoint always returns HTTP 200, never throws.
