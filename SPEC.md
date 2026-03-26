# Flow Analyzer – Prototype Specification v0.1

> **For Claude CLI:** Read this entire file before writing any code. Follow all architectural constraints exactly. When in doubt, refer back to this spec rather than inventing solutions.

---

## 1. Project Overview

Flow Analyzer is a web application that helps software development teams understand their delivery flow. Teams export their ticket data from tools like Jira, upload the data to Flow Analyzer, and receive metrics on Cycle Time, Lead Time, Time in Status, and probabilistic delivery forecasts. An optional local LLM (Ollama) provides additional pattern recognition and insights.

### Goals for v0.1 Prototype
- Upload a JSON export file (produced by a connector script) and associate it with a project configuration
- Display metrics: Lead Time, Cycle Time, Time in Status per status
- Percentile-based forecasting (P50, P70, P85, P95)
- Charts: scatter plot of cycle times over time, histogram, time-in-status stacked bar
- Ticket table with links back to original issue tracker
- Optional: Ollama LLM analysis (qwen3:14b) with graceful fallback when offline
- All UI strings go through i18next (en locale only, but translation-ready)

### Explicitly OUT OF SCOPE for v0.1
- User authentication or multi-user support
- MySQL / PostgreSQL (SQLite only in v0.1)
- OpenAI / Anthropic API
- CSV import (JSON only, produced by connector script)
- Real-time updates / WebSockets
- Docker or deployment configuration
- Dark mode
- Mobile responsiveness

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Backend language | Python 3.12 |
| Backend framework | FastAPI |
| ORM | SQLAlchemy 2.x (mapped_column style) |
| Database | SQLite (via SQLAlchemy – swappable via connection string) |
| Validation | Pydantic v2 |
| Backend tests | pytest + pytest-asyncio |
| HTTP client (LLM) | httpx |
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| UI components | shadcn/ui (free core components only) |
| Charts | Recharts |
| Routing | React Router v6 |
| i18n | react-i18next |
| Frontend tests | Vitest + @testing-library/react |

---

## 3. Project Folder Structure

```
flow-analyzer/
├── SPEC.md                        ← this file
├── CLAUDE.md                      ← short context for Claude CLI
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                ← FastAPI app, CORS, router registration
│   │   ├── config.py              ← Settings (DB path, Ollama URL, model name)
│   │   ├── database.py            ← SQLAlchemy engine + SessionLocal + Base
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── project_config.py
│   │   │   ├── import_session.py
│   │   │   ├── ticket.py
│   │   │   ├── ticket_transition.py
│   │   │   └── llm_insight.py
│   │   ├── schemas/               ← Pydantic v2 schemas (request/response)
│   │   │   ├── __init__.py
│   │   │   ├── project_config.py
│   │   │   ├── import_session.py
│   │   │   ├── ticket.py
│   │   │   └── metrics.py
│   │   ├── routers/               ← FastAPI routers (one per domain)
│   │   │   ├── __init__.py
│   │   │   ├── configs.py
│   │   │   ├── imports.py
│   │   │   ├── tickets.py
│   │   │   ├── metrics.py
│   │   │   └── llm.py
│   │   ├── services/              ← Business logic, orchestrates repositories + analyzers
│   │   │   ├── __init__.py
│   │   │   ├── import_service.py
│   │   │   ├── metrics_service.py
│   │   │   └── llm_service.py
│   │   ├── importers/             ← Data source parsers (SOLID: open for extension)
│   │   │   ├── __init__.py
│   │   │   ├── base_importer.py   ← ABC with abstract parse() method
│   │   │   └── jira_importer.py
│   │   ├── analyzers/             ← Pure functions / stateless analysis
│   │   │   ├── __init__.py
│   │   │   ├── cycle_time_analyzer.py
│   │   │   ├── lead_time_analyzer.py
│   │   │   ├── time_in_status_analyzer.py
│   │   │   └── percentile_analyzer.py
│   │   └── repositories/          ← DB access layer (SOLID: depend on abstraction)
│   │       ├── __init__.py
│   │       ├── base_repository.py  ← ABC
│   │       ├── ticket_repository.py
│   │       ├── import_repository.py
│   │       └── config_repository.py
│   ├── tests/
│   │   ├── conftest.py
│   │   ├── fixtures/
│   │   │   └── sample_jira_export.json   ← 15+ realistic tickets
│   │   ├── test_importers.py
│   │   ├── test_analyzers.py
│   │   └── test_api.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx               ← router setup
│   │   ├── i18n/
│   │   │   ├── index.ts
│   │   │   └── locales/
│   │   │       └── en.json
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ImportPage.tsx
│   │   │   ├── ProjectPage.tsx
│   │   │   ├── TicketsPage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   ├── InsightsPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AppShell.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── metrics/
│   │   │   │   ├── CycleTimeChart.tsx   ← Recharts scatter plot
│   │   │   │   ├── LeadTimeChart.tsx    ← Recharts histogram
│   │   │   │   ├── TimeInStatusChart.tsx ← Recharts stacked bar
│   │   │   │   └── PercentileCard.tsx   ← shadcn Card with P50/70/85/95 table
│   │   │   ├── tickets/
│   │   │   │   └── TicketTable.tsx      ← shadcn Table, sortable, paginated
│   │   │   └── ui/                     ← shadcn/ui generated components go here
│   │   ├── hooks/
│   │   │   ├── useMetrics.ts
│   │   │   ├── useImports.ts
│   │   │   └── useOllamaStatus.ts
│   │   ├── services/
│   │   │   └── api.ts              ← all fetch calls, typed with response types
│   │   └── types/
│   │       └── index.ts            ← shared TypeScript types mirroring backend schemas
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
└── connectors/
    ├── jira_export.py          ← Jira API → standard JSON
    └── README.md               ← How to get Jira API token and run the script
```

---

## 4. SOLID Architecture Principles

### Single Responsibility (S)
Each class/module has exactly one job:
- `JiraImporter` only parses Jira JSON into internal `Ticket` objects
- `CycleTimeAnalyzer` only calculates cycle times from transitions
- `TicketRepository` only handles DB read/write for tickets
- No business logic in routers; routers only call services

### Open/Closed (O)
Adding a new data source (e.g., Trello) means:
- Create `TrelloImporter(BaseImporter)` in `importers/trello_importer.py`
- Register it in `importers/__init__.py`
- Zero changes to existing code

The `source_type` field on imports drives which importer is selected via a registry dict:
```python
IMPORTER_REGISTRY: dict[str, type[BaseImporter]] = {
    "jira": JiraImporter,
}
```

### Liskov Substitution (L)
All importers implement `BaseImporter` and can be used interchangeably by `ImportService`. The service depends only on `BaseImporter`, never on `JiraImporter` directly.

### Interface Segregation (I)
Repositories expose minimal interfaces. `ITicketRepository` only has methods relevant to tickets; config operations are in `IConfigRepository`. Services import only what they need.

### Dependency Inversion (D)
Services receive repositories via constructor injection (or FastAPI `Depends()`). They depend on abstract base classes, not concrete SQLite implementations:
```python
class MetricsService:
    def __init__(self, ticket_repo: BaseTicketRepository):
        self.ticket_repo = ticket_repo
```

---

## 5. Database Models (SQLAlchemy 2.x)

Use `mapped_column` style throughout. All primary keys are UUIDs stored as strings.

### ProjectConfig
```python
class ProjectConfig(Base):
    __tablename__ = "project_configs"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    name: Mapped[str] = mapped_column(String, nullable=False)
    source_type: Mapped[str] = mapped_column(String, nullable=False)  # "jira"
    base_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    # JSON array of status names in workflow order
    # e.g. ["Backlog", "Up Next", "Preparation", "Ready for Development", "Development", "Customer Feedback"]
    status_order: Mapped[list] = mapped_column(JSON, nullable=False)
    # First status where cycle time starts being measured
    cycle_time_start_status: Mapped[str] = mapped_column(String, nullable=False)
    # Status that marks a ticket as "done" for our measurement
    cycle_time_end_status: Mapped[str] = mapped_column(String, nullable=False)
    # If null, lead time is measured from ticket.created_at
    lead_time_start_status: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    imports: Mapped[List["ImportSession"]] = relationship("ImportSession", back_populates="config")
```

### ImportSession
```python
class ImportSession(Base):
    __tablename__ = "import_sessions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    config_id: Mapped[str] = mapped_column(ForeignKey("project_configs.id"), nullable=False)
    source_type: Mapped[str] = mapped_column(String, nullable=False)
    project_key: Mapped[str] = mapped_column(String, nullable=False)
    file_name: Mapped[str] = mapped_column(String, nullable=False)
    ticket_count: Mapped[int] = mapped_column(Integer, default=0)
    imported_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    config: Mapped["ProjectConfig"] = relationship("ProjectConfig", back_populates="imports")
    tickets: Mapped[List["Ticket"]] = relationship("Ticket", back_populates="import_session", cascade="all, delete-orphan")
```

### Ticket
```python
class Ticket(Base):
    __tablename__ = "tickets"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    import_id: Mapped[str] = mapped_column(ForeignKey("import_sessions.id"), nullable=False)
    external_id: Mapped[str] = mapped_column(String, nullable=False)  # e.g. "ROAD-123"
    title: Mapped[str] = mapped_column(String, nullable=False)
    ticket_type: Mapped[str] = mapped_column(String, nullable=False)  # "story", "task", "bug", "epic"
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    external_link: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    extra_metadata: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    import_session: Mapped["ImportSession"] = relationship("ImportSession", back_populates="tickets")
    transitions: Mapped[List["TicketTransition"]] = relationship(
        "TicketTransition", back_populates="ticket",
        order_by="TicketTransition.transitioned_at", cascade="all, delete-orphan"
    )
```

### TicketTransition
```python
class TicketTransition(Base):
    __tablename__ = "ticket_transitions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    ticket_id: Mapped[str] = mapped_column(ForeignKey("tickets.id"), nullable=False)
    from_status: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    to_status: Mapped[str] = mapped_column(String, nullable=False)
    transitioned_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)

    ticket: Mapped["Ticket"] = relationship("Ticket", back_populates="transitions")
```

### LLMInsight
```python
class LLMInsight(Base):
    __tablename__ = "llm_insights"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    import_id: Mapped[str] = mapped_column(ForeignKey("import_sessions.id"), nullable=False)
    model_used: Mapped[str] = mapped_column(String, nullable=False)
    insight_text: Mapped[str] = mapped_column(Text, nullable=False)
    generated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

**Database initialization:** Use `Base.metadata.create_all(engine)` on app startup (no Alembic needed for v0.1).

---

## 6. Standard Import Format (JSON)

All connectors MUST produce exactly this format. The backend validates against this schema on upload.

```json
{
  "source_type": "jira",
  "project_key": "ROAD",
  "base_url": "https://yourcompany.atlassian.net",
  "exported_at": "2026-03-26T10:00:00Z",
  "tickets": [
    {
      "external_id": "ROAD-123",
      "title": "Implement login feature",
      "ticket_type": "story",
      "created_at": "2026-01-15T09:00:00Z",
      "external_link": "https://yourcompany.atlassian.net/browse/ROAD-123",
      "transitions": [
        {
          "from_status": null,
          "to_status": "Backlog",
          "transitioned_at": "2026-01-15T09:00:00Z"
        },
        {
          "from_status": "Backlog",
          "to_status": "Up Next",
          "transitioned_at": "2026-01-18T11:00:00Z"
        },
        {
          "from_status": "Up Next",
          "to_status": "Ready for Development",
          "transitioned_at": "2026-01-20T14:30:00Z"
        },
        {
          "from_status": "Ready for Development",
          "to_status": "Development",
          "transitioned_at": "2026-01-22T09:00:00Z"
        },
        {
          "from_status": "Development",
          "to_status": "Customer Feedback",
          "transitioned_at": "2026-01-28T16:00:00Z"
        }
      ],
      "metadata": {
        "story_points": 5,
        "assignee": "Jane Doe",
        "labels": ["frontend", "auth"]
      }
    }
  ]
}
```

**Pydantic schema for validation (schemas/import_session.py):**
```python
class TransitionSchema(BaseModel):
    from_status: Optional[str] = None
    to_status: str
    transitioned_at: datetime

class TicketImportSchema(BaseModel):
    external_id: str
    title: str
    ticket_type: str
    created_at: datetime
    external_link: Optional[str] = None
    transitions: list[TransitionSchema]
    metadata: Optional[dict] = None

class ImportFileSchema(BaseModel):
    source_type: str
    project_key: str
    base_url: Optional[str] = None
    exported_at: datetime
    tickets: list[TicketImportSchema]
```

---

## 7. API Specification

**Base path:** `/api/v1`
**Content-Type:** `application/json`
**Response envelope:**
```json
{ "data": <payload>, "error": null }
{ "data": null, "error": "human readable message" }
```

**CORS:** Allow all origins in development (`allow_origins=["*"]`).

---

### 7.1 Project Configurations

#### `POST /api/v1/configs`
Create a new project configuration.

Request body:
```json
{
  "name": "Team Road Runner",
  "source_type": "jira",
  "base_url": "https://leuchtfeuer.atlassian.net",
  "status_order": ["Backlog", "Up Next", "Preparation", "Ready for Development", "Development", "Customer Feedback"],
  "cycle_time_start_status": "Ready for Development",
  "cycle_time_end_status": "Customer Feedback",
  "lead_time_start_status": null
}
```
Response 201: full config object
Response 422: validation error

#### `GET /api/v1/configs`
List all configurations ordered by `created_at` DESC.
Response 200: `{ "data": [ ...config objects... ] }`

#### `GET /api/v1/configs/{config_id}`
Response 200: config object
Response 404: not found

#### `PUT /api/v1/configs/{config_id}`
Update any field. Partial updates allowed (use `model_config = ConfigDict(extra='ignore')`).
Response 200: updated config object
Response 404: not found

#### `DELETE /api/v1/configs/{config_id}`
Response 204: deleted
Response 409: config has associated imports (must delete imports first)

---

### 7.2 Imports

#### `POST /api/v1/imports`
Upload a connector JSON file.

Request: `multipart/form-data`
- `file`: the JSON file
- `config_id`: string (UUID of the ProjectConfig to associate with)

Steps performed server-side:
1. Validate `config_id` exists
2. Parse and validate JSON against `ImportFileSchema`
3. Select importer via `IMPORTER_REGISTRY[data.source_type]`
4. Persist ImportSession + all Tickets + all TicketTransitions in one transaction
5. Return the created ImportSession

Response 201:
```json
{
  "data": {
    "id": "550e8400-...",
    "config_id": "...",
    "source_type": "jira",
    "project_key": "ROAD",
    "file_name": "road_export.json",
    "ticket_count": 42,
    "imported_at": "2026-03-26T10:00:00Z"
  }
}
```
Response 400: invalid file format
Response 404: config_id not found
Response 422: schema validation error

#### `GET /api/v1/imports`
List all import sessions ordered by `imported_at` DESC. Include `config_name` from joined config.
Response 200: `{ "data": [ ...import objects... ] }`

#### `GET /api/v1/imports/{import_id}`
Response 200: single import session
Response 404: not found

#### `DELETE /api/v1/imports/{import_id}`
Cascade deletes all associated tickets and transitions.
Response 204: deleted

---

### 7.3 Metrics

All metrics endpoints require `import_id`. The `MetricsService` loads all tickets with transitions for that import and runs analyzers.

#### `GET /api/v1/metrics/{import_id}/summary`
Returns all key metrics in a single call (used by ProjectPage and Dashboard).

Response 200:
```json
{
  "data": {
    "import_id": "...",
    "project_key": "ROAD",
    "ticket_count": 42,
    "completed_ticket_count": 38,
    "date_range": { "from": "2026-01-01T00:00:00Z", "to": "2026-03-20T00:00:00Z" },
    "cycle_time": {
      "mean_days": 8.3,
      "median_days": 6.5,
      "p50": 6.5,
      "p70": 9.0,
      "p85": 12.0,
      "p95": 18.0,
      "sample_size": 38,
      "warning": null
    },
    "lead_time": {
      "mean_days": 15.2,
      "median_days": 12.0,
      "p50": 12.0,
      "p70": 16.0,
      "p85": 21.0,
      "p95": 30.0,
      "sample_size": 38,
      "warning": null
    },
    "time_in_status": {
      "Backlog": { "mean_days": 4.2, "median_days": 3.0 },
      "Up Next": { "mean_days": 2.1, "median_days": 1.5 },
      "Preparation": { "mean_days": 1.0, "median_days": 0.8 },
      "Ready for Development": { "mean_days": 1.5, "median_days": 1.0 },
      "Development": { "mean_days": 5.8, "median_days": 4.5 },
      "Customer Feedback": { "mean_days": 1.2, "median_days": 0.8 }
    },
    "throughput_per_week": 3.2
  }
}
```

If fewer than 10 completed tickets: `"warning": "Insufficient data (n=X). At least 10 completed tickets recommended for reliable percentiles."`

#### `GET /api/v1/metrics/{import_id}/cycle-times`
Per-ticket cycle times for scatter plot and histogram.

Response 200:
```json
{
  "data": {
    "tickets": [
      {
        "external_id": "ROAD-123",
        "title": "Implement login feature",
        "cycle_time_days": 6.5,
        "completed_at": "2026-01-28T16:00:00Z",
        "external_link": "https://..."
      }
    ]
  }
}
```
Tickets without a cycle time (not yet completed) are excluded.

#### `GET /api/v1/metrics/{import_id}/time-in-status`
Per-ticket time in each status, for the stacked bar chart.

Response 200:
```json
{
  "data": {
    "statuses": ["Backlog", "Up Next", "Ready for Development", "Development", "Customer Feedback"],
    "tickets": [
      {
        "external_id": "ROAD-123",
        "title": "...",
        "status_durations": {
          "Backlog": 3.0,
          "Up Next": 2.0,
          "Ready for Development": 1.5,
          "Development": 6.0,
          "Customer Feedback": 0.0
        }
      }
    ]
  }
}
```

---

### 7.4 Tickets

#### `GET /api/v1/tickets`
Query params:
- `import_id` (required)
- `type` (optional): filter by ticket_type
- `page` (default: 1)
- `limit` (default: 50, max: 200)

Response 200: paginated list with computed cycle_time_days and lead_time_days per ticket:
```json
{
  "data": {
    "tickets": [
      {
        "id": "...",
        "external_id": "ROAD-123",
        "title": "...",
        "ticket_type": "story",
        "created_at": "...",
        "external_link": "https://...",
        "cycle_time_days": 6.5,
        "lead_time_days": 13.0,
        "current_status": "Customer Feedback",
        "completed": true
      }
    ],
    "total": 42,
    "page": 1,
    "limit": 50
  }
}
```

#### `GET /api/v1/tickets/{ticket_id}`
Returns ticket with full `transitions` array included.

---

### 7.5 LLM

#### `GET /api/v1/llm/status`
Checks if Ollama is running and lists available models.
This endpoint must NEVER throw an error – always return 200.

Response 200:
```json
{
  "data": {
    "available": true,
    "models": ["qwen3:14b", "llama3.1:8b"],
    "recommended_model": "qwen3:14b"
  }
}
```
If Ollama is offline: `{ "data": { "available": false, "models": [], "recommended_model": "qwen3:14b" } }`

#### `POST /api/v1/llm/analyze/{import_id}`
Triggers LLM analysis synchronously (v0.1 – no async queue needed).
Saves result to `llm_insights` table (overwrite if already exists for this import_id).

Request body: `{ "model": "qwen3:14b" }` (optional, defaults to `config.OLLAMA_MODEL`)

Response 200: `{ "data": { "insight_text": "...", "model_used": "qwen3:14b", "generated_at": "..." } }`
Response 503: Ollama not available

#### `GET /api/v1/llm/insights/{import_id}`
Returns the stored LLM insight for this import.
Response 200: insight object
Response 404: no analysis run yet for this import

---

## 8. Business Logic

### 8.1 Cycle Time

```python
# analyzers/cycle_time_analyzer.py

def calculate_cycle_time(
    transitions: list[TicketTransition],
    start_status: str,
    end_status: str
) -> Optional[float]:
    """
    Returns cycle time in days (float), or None if ticket hasn't reached end_status.
    Uses FIRST entry into start_status and FIRST entry into end_status.
    Handles tickets that were moved back (start_status appears multiple times).
    """
    start_ts = _first_transition_to(transitions, start_status)
    end_ts = _first_transition_to(transitions, end_status)
    if start_ts is None or end_ts is None:
        return None
    if end_ts <= start_ts:
        return None  # invalid data or ticket moved backwards
    return (end_ts - start_ts).total_seconds() / 86400.0

def _first_transition_to(transitions: list[TicketTransition], status: str) -> Optional[datetime]:
    for t in sorted(transitions, key=lambda x: x.transitioned_at):
        if t.to_status == status:
            return t.transitioned_at
    return None
```

### 8.2 Lead Time

```python
# analyzers/lead_time_analyzer.py

def calculate_lead_time(
    ticket_created_at: datetime,
    transitions: list[TicketTransition],
    end_status: str,
    lead_time_start_status: Optional[str] = None
) -> Optional[float]:
    """
    If lead_time_start_status is None: measure from ticket.created_at.
    If set: measure from first entry into that status.
    End point: first entry into end_status.
    """
    end_ts = _first_transition_to(transitions, end_status)
    if end_ts is None:
        return None

    if lead_time_start_status is None:
        start_ts = ticket_created_at
    else:
        start_ts = _first_transition_to(transitions, lead_time_start_status)
        if start_ts is None:
            return None

    if end_ts <= start_ts:
        return None
    return (end_ts - start_ts).total_seconds() / 86400.0
```

### 8.3 Time in Status

```python
# analyzers/time_in_status_analyzer.py

def calculate_time_in_status(
    transitions: list[TicketTransition],
    reference_statuses: list[str]
) -> dict[str, float]:
    """
    For each status in reference_statuses, returns total days spent in that status.
    Handles tickets that move back and forth between statuses.
    Returns 0.0 for statuses the ticket never entered.
    Uses current time as the end for still-open statuses (last transition).
    """
```

### 8.4 Percentile Forecasting

```python
# analyzers/percentile_analyzer.py
import statistics

MINIMUM_SAMPLE_SIZE = 10

def calculate_percentiles(cycle_times: list[float]) -> dict:
    """
    Returns percentile dict. If sample < MINIMUM_SAMPLE_SIZE, includes a warning.
    Uses linear interpolation (Python's statistics.quantiles).
    """
    if len(cycle_times) < MINIMUM_SAMPLE_SIZE:
        return {
            "p50": None, "p70": None, "p85": None, "p95": None,
            "sample_size": len(cycle_times),
            "warning": f"Insufficient data (n={len(cycle_times)}). At least {MINIMUM_SAMPLE_SIZE} completed tickets recommended."
        }

    sorted_times = sorted(cycle_times)
    def pct(p): return sorted_times[int(len(sorted_times) * p / 100)]

    return {
        "p50": pct(50), "p70": pct(70), "p85": pct(85), "p95": pct(95),
        "sample_size": len(cycle_times),
        "warning": None
    }
```

### 8.5 Throughput

```python
def calculate_throughput_per_week(completed_at_dates: list[datetime]) -> float:
    """
    Average number of tickets completed per week over the observed date range.
    """
    if len(completed_at_dates) < 2:
        return float(len(completed_at_dates))
    min_date = min(completed_at_dates)
    max_date = max(completed_at_dates)
    weeks = max((max_date - min_date).days / 7.0, 1.0)
    return round(len(completed_at_dates) / weeks, 1)
```

### 8.6 LLM Prompt Template

```python
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
```

The `llm_service.py` calls Ollama via:
```python
response = httpx.post(
    f"{settings.OLLAMA_BASE_URL}/api/generate",
    json={"model": model, "prompt": prompt, "stream": False},
    timeout=120.0
)
```

---

## 9. Frontend Specification

### 9.1 Routing (React Router v6)

```
/                           → redirect to /projects/<latest-import-id>, or ImportPage if no imports
/import                     → ImportPage
/projects/:importId         → ProjectPage
/projects/:importId/tickets → TicketsPage
/projects/:importId/analytics → AnalyticsPage
/projects/:importId/insights  → InsightsPage
/settings                   → SettingsPage
/settings/configs/new       → ConfigFormPage (create)
/settings/configs/:configId → ConfigFormPage (edit)
```

### 9.2 AppShell

Left sidebar (fixed, 240px wide) containing:
- App logo/name "Flow Analyzer" at top
- Import selector: dropdown showing all import sessions (label: `{project_key} – {imported_at formatted}`)
- Navigation links (context-aware, some only visible when an import is selected):
  - Overview
  - Tickets
  - Analytics
  - AI Insights
  - Settings (always visible, at bottom)

### 9.3 Page Specifications

#### DashboardPage / ProjectPage (`/projects/:importId`)
Four metric cards in a 2×2 or 4×1 grid:
- Avg Cycle Time (median, in days)
- Avg Lead Time (median, in days)
- Throughput (tickets/week)
- Tickets analyzed (count)

Below: `PercentileCard` (P50/P70/P85/P95 table) + `CycleTimeChart` (scatter plot, x=completion date, y=cycle time days)

Empty state when no imports: illustration + "Upload your first export" CTA button → `/import`

#### ImportPage (`/import`)
1. Config selector dropdown. "Create new config" option opens a slide-over / modal form.
2. File upload area (drag-and-drop + click). Accepts `.json` only.
3. Client-side preview: after file is selected, parse JSON and show ticket count and project key.
4. "Import" button (disabled until file + config both selected).
5. On success: redirect to `/projects/:newImportId`.

#### TicketsPage (`/projects/:importId/tickets`)
shadcn `Table` with columns:
- ID (external_id, rendered as clickable link via `external_link`)
- Title
- Type (badge: Story/Task/Bug/Epic)
- Cycle Time (days, colored: green <P50, yellow <P85, red ≥P85)
- Lead Time (days)
- Completed At

Sortable by any column. Type filter (all/story/task/bug). Pagination (50 per page).

#### AnalyticsPage (`/projects/:importId/analytics`)
Tab navigation: **Cycle Times** | **Lead Times** | **Time in Status**

**Cycle Times tab:**
- Scatter plot (x: completion date, y: cycle time days) with P85 reference line
- Histogram (distribution of cycle times, 5-day buckets)

**Lead Times tab:**
- Histogram (distribution of lead times)

**Time in Status tab:**
- Average time per status (horizontal bar chart, one bar per status)
- Stacked bar chart option: one bar per ticket, segments per status (limit to last 30 tickets for readability)

#### InsightsPage (`/projects/:importId/insights`)
- Ollama status banner: "Connected – qwen3:14b available" (green) or "Ollama not running – start with `ollama serve`" (yellow, non-blocking)
- "Run AI Analysis" button (disabled if Ollama offline)
- Loading state during analysis (spinner + "Analyzing your flow data…")
- Result displayed in a styled shadcn `Card` with insight_text (rendered as markdown-like text with line breaks)
- Timestamp of when analysis was run
- "Re-run Analysis" button

#### SettingsPage (`/settings`)
- List of project configurations as cards
- Each card: name, source_type badge, cycle_time_start → cycle_time_end, Edit / Delete buttons
- "New Configuration" button

#### ConfigFormPage (`/settings/configs/new` and `/settings/configs/:configId`)
Form fields:
- Name (text input)
- Source type (select: Jira – more options coming)
- Base URL (text input, placeholder "https://yourcompany.atlassian.net")
- Status order: drag-and-drop list (use dnd-kit or @hello-pangea/dnd). User adds status names as tags. Order defines the workflow.
- Cycle time start status (select from status_order)
- Cycle time end status (select from status_order)
- Lead time start status (select from status_order or "Use ticket creation date")

### 9.4 i18n Setup

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
```

All UI text MUST go through `const { t } = useTranslation()` and `t('key.path')`. Never hardcode English strings in component JSX. This is mandatory even for the prototype.

Structure of `en.json`:
```json
{
  "app": { "name": "Flow Analyzer" },
  "nav": { "overview": "Overview", "tickets": "Tickets", "analytics": "Analytics", "insights": "AI Insights", "settings": "Settings", "import": "Import Data" },
  "metrics": {
    "cycleTime": "Cycle Time", "leadTime": "Lead Time",
    "throughput": "Throughput", "ticketsAnalyzed": "Tickets Analyzed",
    "days": "days", "perWeek": "per week",
    "percentile": { "title": "Delivery Forecast", "p50": "50% of tickets done within", "p70": "70%", "p85": "85%", "p95": "95%" }
  },
  "tickets": {
    "table": { "id": "ID", "title": "Title", "type": "Type", "cycleTime": "Cycle Time", "leadTime": "Lead Time", "completedAt": "Completed At" },
    "types": { "story": "Story", "task": "Task", "bug": "Bug", "epic": "Epic" }
  },
  "import": { "title": "Import Data", "selectConfig": "Select Configuration", "uploadFile": "Upload Export File", "dragDrop": "Drag and drop your JSON export here", "import": "Import", "importing": "Importing…", "success": "Import successful" },
  "insights": { "title": "AI Insights", "runAnalysis": "Run AI Analysis", "analyzing": "Analyzing your flow data…", "ollamaOnline": "Connected", "ollamaOffline": "Ollama not running", "ollamaHint": "Start Ollama with: ollama serve" },
  "settings": { "title": "Settings", "newConfig": "New Configuration", "editConfig": "Edit Configuration", "deleteConfig": "Delete", "confirmDelete": "Delete this configuration? This cannot be undone." },
  "errors": { "notFound": "Not found", "serverError": "Server error", "invalidFile": "Invalid file format" }
}
```

### 9.5 API Service (services/api.ts)

All fetch calls go through one typed service file. Use the native `fetch` API (no axios). Base URL from Vite env variable `VITE_API_BASE_URL` (default: `http://localhost:8000`).

```typescript
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? 'Request failed');
  return json.data as T;
}

export const api = {
  configs: {
    list: () => request<ProjectConfig[]>('/api/v1/configs'),
    get: (id: string) => request<ProjectConfig>(`/api/v1/configs/${id}`),
    create: (body: CreateConfigRequest) => request<ProjectConfig>('/api/v1/configs', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }),
    update: (id: string, body: Partial<CreateConfigRequest>) => request<ProjectConfig>(`/api/v1/configs/${id}`, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }),
    delete: (id: string) => request<null>(`/api/v1/configs/${id}`, { method: 'DELETE' }),
  },
  imports: {
    list: () => request<ImportSession[]>('/api/v1/imports'),
    get: (id: string) => request<ImportSession>(`/api/v1/imports/${id}`),
    upload: (file: File, configId: string) => {
      const form = new FormData();
      form.append('file', file);
      form.append('config_id', configId);
      return request<ImportSession>('/api/v1/imports', { method: 'POST', body: form });
    },
    delete: (id: string) => request<null>(`/api/v1/imports/${id}`, { method: 'DELETE' }),
  },
  metrics: {
    summary: (importId: string) => request<MetricsSummary>(`/api/v1/metrics/${importId}/summary`),
    cycleTimes: (importId: string) => request<CycleTimesResponse>(`/api/v1/metrics/${importId}/cycle-times`),
    timeInStatus: (importId: string) => request<TimeInStatusResponse>(`/api/v1/metrics/${importId}/time-in-status`),
  },
  tickets: {
    list: (importId: string, params?: { type?: string; page?: number; limit?: number }) =>
      request<PaginatedTickets>(`/api/v1/tickets?import_id=${importId}&${new URLSearchParams(params as any)}`),
    get: (id: string) => request<TicketDetail>(`/api/v1/tickets/${id}`),
  },
  llm: {
    status: () => request<LLMStatus>('/api/v1/llm/status'),
    analyze: (importId: string, model?: string) =>
      request<LLMInsight>(`/api/v1/llm/analyze/${importId}`, { method: 'POST', body: JSON.stringify({ model }), headers: { 'Content-Type': 'application/json' } }),
    getInsight: (importId: string) => request<LLMInsight>(`/api/v1/llm/insights/${importId}`),
  },
};
```

---

## 10. Test Specification

### 10.1 Backend (pytest)

#### conftest.py
```python
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db
import json, pathlib

@pytest.fixture(scope="function")
def db_session():
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    yield session
    session.close()
    Base.metadata.drop_all(engine)

@pytest.fixture(scope="function")
def client(db_session):
    app.dependency_overrides[get_db] = lambda: db_session
    return TestClient(app)

@pytest.fixture
def sample_import_data():
    path = pathlib.Path(__file__).parent / "fixtures" / "sample_jira_export.json"
    return json.loads(path.read_text())

@pytest.fixture
def sample_config(db_session):
    from app.models.project_config import ProjectConfig
    config = ProjectConfig(
        name="Test Team",
        source_type="jira",
        base_url="https://test.atlassian.net",
        status_order=["Backlog", "Up Next", "Ready for Development", "Development", "Customer Feedback"],
        cycle_time_start_status="Ready for Development",
        cycle_time_end_status="Customer Feedback",
        lead_time_start_status=None
    )
    db_session.add(config)
    db_session.commit()
    return config
```

#### tests/fixtures/sample_jira_export.json
Must contain **at least 15 tickets** with these characteristics:
- 10+ tickets that have completed through "Customer Feedback" (needed for percentile tests)
- 2 tickets that are in-progress (no "Customer Feedback" transition)
- 1 ticket that moved back from "Development" to "Ready for Development" (regression/back-flow)
- 1 outlier ticket with a very long cycle time (>30 days)
- Varied ticket types: story, task, bug
- Transitions must be in chronological order
- Date range: Jan–Mar 2026

#### tests/test_importers.py
- `test_jira_importer_creates_correct_ticket_count`: import 15-ticket fixture, expect 15 tickets
- `test_jira_importer_parses_transitions_in_order`: check first ticket's transitions are sorted by transitioned_at
- `test_jira_importer_handles_ticket_with_no_transitions`: no exception, ticket persisted with 0 transitions
- `test_jira_importer_rejects_missing_required_fields`: raises ValueError when external_id is missing
- `test_jira_importer_sets_external_link`: verify external_link is preserved correctly

#### tests/test_analyzers.py
- `test_cycle_time_basic`: 6-day ticket (Ready for Dev → Customer Feedback) → expects 6.0 days
- `test_cycle_time_returns_none_for_in_progress`: ticket with no "Customer Feedback" transition → None
- `test_cycle_time_uses_first_entry_into_start_status`: ticket visited "Ready for Development" twice → uses first occurrence
- `test_cycle_time_returns_none_when_end_before_start`: invalid data → None (no exception)
- `test_lead_time_uses_created_at_when_no_start_status`: lead_time_start_status=None → uses ticket.created_at
- `test_lead_time_uses_configured_start_status`: lead_time_start_status set → uses that transition date
- `test_time_in_status_sums_correctly`: 3-day Backlog + 5-day Development → {Backlog: 3.0, Development: 5.0}
- `test_time_in_status_handles_revisit`: ticket returns to Development → both periods summed
- `test_percentiles_happy_path`: 20 cycle times → p50/p70/p85/p95 returned correctly, no warning
- `test_percentiles_insufficient_data`: 5 cycle times → p50=None, warning present
- `test_throughput_calculation`: 10 tickets over 5 weeks → 2.0 per week

#### tests/test_api.py
- `test_create_config_success`: POST /configs → 201 with id
- `test_create_config_missing_required_field`: POST without cycle_time_end_status → 422
- `test_import_file_success`: POST /imports with fixture file and valid config_id → 201, ticket_count=15
- `test_import_file_invalid_config_id`: POST with non-existent config_id → 404
- `test_import_file_invalid_json`: POST with malformed JSON → 400
- `test_get_metrics_summary_returns_all_fields`: GET /metrics/{id}/summary → has cycle_time, lead_time, time_in_status
- `test_get_metrics_summary_returns_warning_for_small_sample`: import with <10 completed tickets → warning present
- `test_get_tickets_paginated`: GET /tickets?import_id=X&page=1&limit=10 → 10 tickets, total=15
- `test_get_tickets_filter_by_type`: GET /tickets?import_id=X&type=story → only stories returned
- `test_llm_status_always_returns_200`: GET /llm/status even when Ollama offline → 200, available=false

### 10.2 Frontend (Vitest)

Setup: `vite.config.ts` must include `test: { environment: 'jsdom' }`.

- `PercentileCard.test.tsx`: renders P50/P70/P85/P95 values, shows warning message when warning prop is set
- `CycleTimeChart.test.tsx`: renders without crashing with valid data, shows empty state when tickets=[]
- `TicketTable.test.tsx`: renders correct number of rows, external_id is rendered as an anchor tag
- `useMetrics.test.ts`: mock api.metrics.summary, verify hook returns data and loading state transitions

Run all tests: `cd backend && pytest -v` and `cd frontend && npm run test`

---

## 11. Jira Connector Script (connectors/jira_export.py)

```python
#!/usr/bin/env python3
"""
Jira Export Connector for Flow Analyzer
Exports a Jira project (issues + full changelog) to Flow Analyzer standard JSON format.

Requirements:
  pip install requests

Usage:
  python jira_export.py \
    --url https://yourcompany.atlassian.net \
    --project ROAD \
    --email your@email.com \
    --token YOUR_JIRA_API_TOKEN \
    --output road_export.json

How to get your Jira API token:
  1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
  2. Click "Create API token"
  3. Copy the token value
"""

import argparse
import json
import sys
from datetime import datetime, timezone
from typing import Optional
import requests
from requests.auth import HTTPBasicAuth


def fetch_all_issues(base_url: str, project_key: str, auth: HTTPBasicAuth) -> list[dict]:
    """Fetches all issues for a project with their changelogs using pagination."""
    issues = []
    start_at = 0
    max_results = 50  # Keep lower to avoid timeout on large projects

    print(f"Fetching issues for project {project_key}...")

    while True:
        url = f"{base_url}/rest/api/3/search"
        params = {
            "jql": f"project = \"{project_key}\" ORDER BY created ASC",
            "expand": "changelog",
            "fields": "summary,issuetype,created,status,assignee,labels,story_points,customfield_10016",
            "startAt": start_at,
            "maxResults": max_results,
        }
        response = requests.get(url, params=params, auth=auth)
        response.raise_for_status()
        data = response.json()

        batch = data.get("issues", [])
        issues.extend(batch)
        total = data.get("total", 0)
        print(f"  Fetched {len(issues)} / {total} issues", end="\r")

        if start_at + max_results >= total:
            break
        start_at += max_results

    print(f"\nDone. Fetched {len(issues)} issues.")
    return issues


def parse_iso(dt_str: Optional[str]) -> Optional[str]:
    """Normalize datetime string to ISO 8601 with Z suffix."""
    if not dt_str:
        return None
    try:
        # Jira returns format like "2026-01-15T09:00:00.000+0100"
        dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    except (ValueError, AttributeError):
        return dt_str


def transform_issue(issue: dict, base_url: str) -> dict:
    """Transforms a single Jira issue (with changelog) to Flow Analyzer ticket format."""
    fields = issue.get("fields", {})

    # Build transitions from changelog
    transitions = []

    # The initial status at creation time
    initial_status = fields.get("status", {}).get("name", "Unknown")
    created_at = parse_iso(fields.get("created"))

    transitions.append({
        "from_status": None,
        "to_status": initial_status,
        "transitioned_at": created_at,
    })

    # Add all status changes from changelog
    histories = issue.get("changelog", {}).get("histories", [])
    for history in sorted(histories, key=lambda h: h.get("created", "")):
        for item in history.get("items", []):
            if item.get("field") == "status":
                transitions.append({
                    "from_status": item.get("fromString"),
                    "to_status": item.get("toString"),
                    "transitioned_at": parse_iso(history.get("created")),
                })

    # Sort by date to be safe
    transitions.sort(key=lambda t: t["transitioned_at"] or "")

    # Story points: try standard field and common custom field
    story_points = (
        fields.get("story_points")
        or fields.get("customfield_10016")
    )

    assignee = fields.get("assignee")
    assignee_name = assignee.get("displayName") if assignee else None

    return {
        "external_id": issue["key"],
        "title": fields.get("summary", ""),
        "ticket_type": fields.get("issuetype", {}).get("name", "task").lower(),
        "created_at": created_at,
        "external_link": f"{base_url}/browse/{issue['key']}",
        "transitions": transitions,
        "metadata": {
            "assignee": assignee_name,
            "labels": fields.get("labels", []),
            "story_points": story_points,
        },
    }


def main():
    parser = argparse.ArgumentParser(
        description="Export a Jira project to Flow Analyzer JSON format"
    )
    parser.add_argument("--url", required=True, help="Jira base URL (e.g. https://company.atlassian.net)")
    parser.add_argument("--project", required=True, help="Jira project key (e.g. ROAD)")
    parser.add_argument("--email", required=True, help="Your Atlassian account email")
    parser.add_argument("--token", required=True, help="Jira API token")
    parser.add_argument("--output", required=True, help="Output JSON file path")
    args = parser.parse_args()

    base_url = args.url.rstrip("/")
    auth = HTTPBasicAuth(args.email, args.token)

    try:
        issues = fetch_all_issues(base_url, args.project, auth)
    except requests.HTTPError as e:
        print(f"Error fetching from Jira: {e}", file=sys.stderr)
        print(f"Response: {e.response.text}", file=sys.stderr)
        sys.exit(1)

    tickets = [transform_issue(issue, base_url) for issue in issues]

    output = {
        "source_type": "jira",
        "project_key": args.project,
        "base_url": base_url,
        "exported_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "tickets": tickets,
    }

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False, default=str)

    print(f"Exported {len(tickets)} tickets to {args.output}")


if __name__ == "__main__":
    main()
```

---

## 12. Backend requirements.txt

```
fastapi>=0.111.0
uvicorn[standard]>=0.29.0
sqlalchemy>=2.0.0
pydantic[email]>=2.0.0
python-multipart>=0.0.9
httpx>=0.27.0
pytest>=8.0.0
pytest-asyncio>=0.23.0
httpx>=0.27.0
```

---

## 13. Development Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install recharts react-router-dom react-i18next i18next @dnd-kit/core @dnd-kit/sortable
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npx shadcn@latest init
npx shadcn@latest add button card table badge input select dialog tabs
npm run dev
```

Vite proxy config for dev (add to `vite.config.ts`):
```typescript
server: {
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```

### Running tests
```bash
# Backend
cd backend && pytest -v

# Frontend
cd frontend && npm run test
```

---

## 14. Configuration (backend/app/config.py)

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./flow_analyzer.db"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "qwen3:14b"

    class Config:
        env_file = ".env"

settings = Settings()
```

The SQLite DB file is created in the `backend/` directory at startup.

---

## 15. Build Order for Claude CLI

Implement in this order to always have a runnable state:

1. Backend models + database.py + config.py
2. Repositories (base + implementations)
3. Analyzers (pure functions, no DB dependency)
4. Backend tests for analyzers (run: `pytest tests/test_analyzers.py -v`)
5. Importers + importer tests
6. Services + routers (configs, imports, metrics, tickets, llm)
7. API tests (`pytest tests/test_api.py -v`)
8. Frontend: project scaffolding, i18n setup, API service types
9. Frontend: AppShell + Sidebar + routing
10. Frontend: SettingsPage + ConfigFormPage
11. Frontend: ImportPage
12. Frontend: ProjectPage (metrics summary)
13. Frontend: TicketsPage
14. Frontend: AnalyticsPage
15. Frontend: InsightsPage
16. Frontend tests
17. connectors/jira_export.py

After each backend step, run `pytest -v` and fix any failures before continuing.
After each frontend step, run `npm run test` and fix any failures before continuing.
