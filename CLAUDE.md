# Cylenivo — Claude Context

## What this is
A desktop app for analyzing software team flow metrics (Cycle Time, Lead Time, Time in Status, Percentile Forecasting). Teams export ticket data from Jira and import it for analysis. All data is local — no cloud, no accounts.

## Architecture (non-obvious)
Three-tier desktop app:
- **Tauri shell** — native window, spawns the server as a sidecar on startup
- **Hono server** (`server/`) — TypeScript, compiled to a single binary via esbuild + pkg. Runs as a local process, not a web service. DB path and port are passed via env vars from Tauri.
- **React frontend** (`src/`) — talks to the Hono server via `/api/v1/`

The server binary is NOT a cloud service. Never suggest cloud hosting, external DBs, or network auth. SQLite DB lives in the OS app data dir in production (`appDataDir/cylenivo.db`), in `server/dev.db` during development.

## Domain: how metrics work
Cycle time and lead time are calculated **from status transitions**, not from ticket fields. A ticket has a list of timestamped transitions (from_status → to_status). The config defines which statuses mark the start and end of measurement.

**"Completed"** = ticket has reached `cycle_time_end_status` at least once.

**Measurement modes** (per config, affects cycle time AND lead time end):
- `first_last` — first entry into start status → last entry into end status. **Default.** Captures full system time including rework.
- `first_first` — first → first. "Time to first done."
- `last_last` — last → last. Most recent active period only.

Lead time start: either `created_at` (if `lead_time_start_status` is null) or first entry into a specified status.

Status names are **user-configured per project** — never hardcode them.

## Calculation architecture (critical — do not bypass)

All metric calculations flow through exactly two shared functions. Routes must never calculate directly.

```
analyzers/          pure functions (no DB): calculateCycleTime, calculateLeadTime, etc.
    ↓
lib/context.ts      loadImportContext(importId) — loads DB data, builds transition map once,
                    enriches ALL tickets (cycle_time_days, lead_time_days, completed_at,
                    current_status). Parses config once: status_order as string[],
                    cycle_time_mode as CycleTimeMode. Derives cycleStatuses once.
    ↓
lib/aggregate.ts    computeAggregate(ctx) — pure function, no DB. Computes all aggregations
                    (percentiles, time-in-status, throughput, dateRange) from enriched tickets.
    ↓
routes/             thin layer: load context → compute aggregate → format HTTP response
```

**Hard rules for calculations:**
- `calculateCycleTime` and `calculateLeadTime` must never be called in routes — only in `context.ts`
- `cycle_time_mode` is cast to `CycleTimeMode` exactly once, in `loadImportContext` — never inline in routes
- `cycleStatuses` (status_order sliced to cycle window) is derived exactly once, in `loadImportContext`
- `EnrichedTicket.cycle_time_days` / `lead_time_days` are **unrounded** — round only at the HTTP response boundary (`Math.round(x * 100) / 100`)
- grep check: `grep -r "calculateCycleTime\|calculateLeadTime" server/src/routes/` must return nothing

## Where new things go
- New metric/calculation → `server/src/analyzers/` (pure function, no DB access)
- New enriched field on a ticket → `buildEnrichedTicket` in `server/src/lib/context.ts`
- New aggregate metric → `computeAggregate` in `server/src/lib/aggregate.ts`
- New data source connector → `server/scripts/` (export script) + new `source_type` in importer
- New API route → `server/src/routes/` + register in `server/src/app.ts`
- New shared type → `shared/types.ts` (single source of truth for frontend + server)

## Hard rules
- **All UI strings via `t('key')`** — no hardcoded English in JSX, ever
- **No cloud, no remote DB** — this is a local desktop tool
- **No calculations in routes** — see calculation architecture above

## Tests
- Analyzer tests: pure functions with inline data (`server/tests/analyzers.test.ts`)
- Context tests: `loadImportContext` enrichment correctness, mode variants (`server/tests/context.test.ts`)
- Aggregate tests: `computeAggregate` values cross-validated against API responses (`server/tests/aggregate.test.ts`)
- Metrics pipeline tests: import known fixture → assert exact metric values (`server/tests/metrics.test.ts`)
- API tests: Hono in-process (`app.request()`), in-memory SQLite (`DB_PATH=:memory:` in `server/tests/setup.ts`)
- Frontend: component + data-transformation tests (no E2E)

**Fixture integrity:** `server/tests/fixtures/metrics-fixture.json` has 4 tickets with hand-verified timestamps (all at 12:00Z for exact 24h diffs). TICK-1=5d/9d, TICK-2=10d/12d, TICK-3=rework (14d/7d/5d by mode), TICK-4=incomplete. Do not modify without recalculating all expected values.

Run all: `npm test` (frontend) and `cd server && npm test` (server)
