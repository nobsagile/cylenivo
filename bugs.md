# Bug Hunt — 2026-03-30

Comprehensive audit of codebase + open GitHub issues. Grouped by priority.

---

## P0 — Must Fix

### ~~1. Median calculation wrong~~ FIXED
- **File:** `server/src/lib/aggregate.ts:88`
- **Issue:** Uses `Math.floor(sorted.length * 50 / 100)` instead of proper median (average of two middle values for even-length arrays). `stats.ts` has a correct `median()` function that isn't used here.
- **Impact:** Wrong median displayed on dashboard for even-length datasets.

### ~~2. Import does not refresh app state (GitHub #14)~~ FIXED
- **File:** `src/pages/ImportPage.tsx` + Sidebar state
- **Issue:** After importing from Jira and creating a new config, the app doesn't refresh — data only shows after restart. Sidebar project list doesn't update.
- **Impact:** Core workflow broken for Jira imports.

### ~~3. PercentileCard division by zero~~ FIXED
- **File:** `src/components/metrics/PercentileCard.tsx:21`
- **Issue:** `maxVal = data.p95 ?? data.p85 ?? ... ?? 1` — if all percentiles are `0` (not null), maxVal is 0 and `(val / maxVal) * 100` produces Infinity.
- **Impact:** Broken UI when all cycle times are 0 days.

### ~~4. InsightsPage crash on empty data~~ FALSE POSITIVE
- Guard `if (cycleData?.tickets.length)` on line 124 already protects access. No bug.

### ~~5. Empty ticket import accepted~~ FIXED
- **File:** `server/src/routes/imports.ts:164-192`
- **Issue:** Import with `tickets: []` silently creates a session with `ticket_count: 0`. Breaks downstream (divide-by-zero in throughput).
- **Impact:** Corrupt data state, broken analytics.

---

## P1 — Should Fix

### 6. Sidecar binary crash in production (better-sqlite3)
- **File:** `src-tauri/binaries/cylenivo-server-*`
- **Issue:** pkg-compiled binary can't find `better_sqlite3.node` native addon. Server crashes on startup. Dev workaround (tsx) in place, but production builds are broken.
- **Impact:** Production app can't start the server.

### 7. cycleStatuses backwards slice
- **File:** `server/src/lib/context.ts:102-106`
- **Issue:** If `startIdx > endIdx` (user misconfigured status order), `slice(startIdx, endIdx + 1)` returns empty array. Falls back silently to full `status_order`.
- **Impact:** Silently wrong cycle time calculations on misconfigured projects.

### 8. Throughput inflated for same-timestamp completions
- **File:** `server/src/analyzers/percentiles.ts:44-50`
- **Issue:** 10 tickets completed same second → `weeks = 1` → throughput = 10/week. Should indicate insufficient data.
- **Impact:** Misleading throughput metric.

### 9. Forecast endpoint missing upper bound
- **File:** `server/src/routes/metrics.ts:150-154`
- **Issue:** No max value check on `value` param. `value=1000000` runs 1M Monte Carlo iterations → timeout/crash.
- **Impact:** Potential DoS via API.

### 10. Missing cycle_time_mode validation on POST /configs
- **File:** `server/src/routes/configs.ts:27-49`
- **Issue:** PUT validates `cycle_time_mode`, POST does not. Invalid mode accepted on creation.
- **Impact:** Corrupt config, broken calculations.

### 11. Database migration swallows all errors
- **File:** `server/src/db/index.ts:96-129`
- **Issue:** Multiple `try { ... } catch { /* column already exists */ }` blocks swallow ALL errors, not just "column exists".
- **Impact:** Real migration failures hidden silently.

### 12. Calendar date picker unstyled (GitHub #15)
- **File:** Jira fetch config UI
- **Issue:** Calendar select is tiny and unstyled.
- **Impact:** Unusable date picker in Jira import flow.

---

## P2 — Nice to Fix

### 13. Hard-coded English strings (i18n violations)
- `src/pages/AnalyticsPage.tsx:54` — "Time in Status" tab label
- `src/components/metrics/CycleTimeChart.tsx:40` — "No completed tickets"
- **Impact:** Breaks future localization.

### 14. No 404 catch-all route
- **File:** `src/App.tsx`
- **Issue:** Unknown routes show blank page.
- **Impact:** Confusing UX if URL is wrong.

### 15. CORS wide open
- **File:** `server/src/app.ts:14`
- **Issue:** `cors()` with no args allows all origins. Fine for local desktop app, but sloppy.
- **Impact:** Low risk since local-only, but bad practice.

### 16. Connection test auto-saves
- **File:** `src/components/connections/ConnectionDialog.tsx:59-73`
- **Issue:** "Test" button calls `persist()` which saves the connection to DB. User expects test-only.
- **Impact:** UX surprise.

### 17. Inconsistent rounding across endpoints
- **Files:** `server/src/routes/metrics.ts` (various), `server/src/lib/aggregate.ts`, `server/src/analyzers/percentiles.ts`
- **Issue:** Some values rounded to 2 decimals, some not. Percentiles unrounded, means rounded.
- **Impact:** Inconsistent precision in API responses.

### 18. Sidecar error message outdated
- **File:** `src-tauri/src/lib.rs:33`
- **Issue:** Says `"flow-analyzer-server sidecar not configured"` — old name.
- **Impact:** Confusing when debugging.

### 19. Demo reset doesn't clear source_connections
- **File:** `server/src/routes/demo.ts:81-88`
- **Issue:** Deletes all project data but leaves connections. Intentional? Not documented.
- **Impact:** Ambiguous behavior.

### 20. Port 8765 hard-coded in 4 places
- **Files:** `api.ts:21`, `lib.rs:35`, `server/src/index.ts:6`, `package.json:8`
- **Impact:** Port change requires 4 edits.

---

## Won't Fix / Acceptable

- **Race conditions on unmount** (DashboardPage, AnalyticsPage, TicketDetailDrawer) — React state-on-unmount warnings. Harmless in practice, noisy to fix with AbortControllers everywhere.
- **Demo detection fragile** (`startsWith('Demo:')`) — Unlikely a user names their config "Demo:...".
- **No .env.example** — Small project, documented in CLAUDE.md.
- **CSP disabled** — Intentional for desktop app.
- **JSON parse no try-catch in stream handler** — Server controls the stream format.

---

## Recommended Order

1. **P0 #1** (median) — one-line fix, wrong data shown
2. **P0 #3** (PercentileCard div/0) — one-line fix, UI crash
3. **P0 #4** (InsightsPage crash) — one-line guard, page crash
4. **P0 #5** (empty import) — one-line validation, corrupt state
5. **P0 #2** (import refresh #14) — needs investigation, core workflow
6. **P1 #6** (sidecar binary) — blocks production release
7. **P1 #7-#11** — validation/edge case hardening
8. **P1 #12** (calendar) — cosmetic but visible
9. **P2** — cleanup pass
