#!/usr/bin/env python3
"""Generates two realistic test datasets for Flow Analyzer."""

import json
import random
from datetime import datetime, timedelta, timezone

random.seed(42)

EXPORTED_AT = "2026-03-26T12:00:00Z"

ASSIGNEES_ALPHA = ["Anna Müller", "Ben Koch", "Clara Hoffmann", "David Schulz"]
ASSIGNEES_BETA  = ["Eva Braun", "Frank Klein", "Gina Bauer", "Hans Wolf", "Iris Lenz"]

TITLES_STORY = [
    "User can filter results by date range",
    "Implement dark mode toggle",
    "Add export to CSV functionality",
    "Onboarding flow redesign",
    "Search improvements with autocomplete",
    "Dashboard overview page",
    "Notification preferences screen",
    "Two-factor authentication",
    "Mobile responsive navigation",
    "Performance improvements for large datasets",
    "Role-based access control",
    "Activity feed component",
    "User profile settings page",
    "API rate limiting",
    "Bulk action support in table view",
    "Keyboard shortcuts overlay",
    "Audit log viewer",
    "Integration with Slack",
    "Custom report builder",
    "Data retention policy settings",
]
TITLES_TASK = [
    "Upgrade dependencies to latest versions",
    "Refactor authentication middleware",
    "Write unit tests for payment module",
    "Set up staging environment",
    "Migrate database to PostgreSQL 15",
    "Add structured logging",
    "Configure auto-scaling rules",
    "Code review checklist update",
    "Remove deprecated API endpoints",
    "Update README documentation",
    "Add ESLint rules",
    "Fix flaky test in CI pipeline",
    "Set up error monitoring",
    "Cleanup unused feature flags",
    "Performance profiling session",
    "Update OpenAPI spec",
    "Backfill missing test coverage",
    "Configure CORS properly",
    "Extract shared UI components",
    "Implement caching layer",
]
TITLES_BUG = [
    "Login fails on Safari 16",
    "Date picker shows wrong timezone",
    "CSV export missing last row",
    "404 on direct URL navigation",
    "Dropdown not closing on outside click",
    "Pagination breaks with special characters",
    "Image upload stuck at 99%",
    "Session expires too early",
    "Email notification sent twice",
    "Delete button unresponsive on mobile",
    "Filter resets on page reload",
    "Chart tooltip overlaps legend",
    "Incorrect total in summary row",
    "Password reset link expired too quickly",
    "Search returns no results for umlauts",
    "Modal not accessible via keyboard",
    "API returns 500 on empty payload",
    "Sorting order reversed after refresh",
    "Avatar not loading for new users",
    "Form submits on Enter in textarea",
]

def pick_title(ticket_type: str, used: set) -> str:
    pool = {"story": TITLES_STORY, "task": TITLES_TASK, "bug": TITLES_BUG}[ticket_type]
    candidates = [t for t in pool if t not in used]
    if not candidates:
        candidates = pool
    t = random.choice(candidates)
    used.add(t)
    return t

def iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def make_transitions(created: datetime, status_flow: list[str],
                     cycle_days: float, jitter_pct: float = 0.3) -> list[dict]:
    """Build realistic transitions through status_flow.
    cycle_days = total time from first active status to Done.
    """
    transitions = [{"from_status": None, "to_status": status_flow[0], "transitioned_at": iso(created)}]

    # time to first active status (backlog wait): 10-30% of cycle
    backlog_wait = timedelta(days=cycle_days * random.uniform(0.1, 0.3))
    t = created + backlog_wait

    # distribute remaining cycle time across statuses
    active_statuses = status_flow[1:]  # skip Backlog
    n = len(active_statuses)
    weights = [random.uniform(0.5, 1.5) for _ in range(n)]
    total_w = sum(weights)
    shares = [w / total_w * cycle_days * (1 - 0.2) for w in weights]  # 80% of cycle

    prev = status_flow[0]
    for i, status in enumerate(active_statuses):
        duration = timedelta(days=max(0.1, shares[i] * random.uniform(1 - jitter_pct, 1 + jitter_pct)))
        t += duration
        transitions.append({"from_status": prev, "to_status": status, "transitioned_at": iso(t)})
        prev = status

    return transitions


def make_ticket(external_id: str, project_key: str, base_url: str,
                created: datetime, ticket_type: str, title: str,
                cycle_days: float, status_flow: list[str],
                assignee: str, jitter: float = 0.3) -> dict:
    transitions = make_transitions(created, status_flow, cycle_days, jitter)
    return {
        "external_id": external_id,
        "title": title,
        "ticket_type": ticket_type,
        "created_at": iso(created),
        "external_link": f"{base_url}/browse/{external_id}",
        "transitions": transitions,
        "metadata": {
            "assignee": assignee,
            "labels": [],
            "story_points": random.choice([1, 2, 3, 5, 8, None]),
        },
    }


# ─── SCENARIO 1: Alpha Team – steady improvement ───────────────────────────
# Cycle time drops from ~22 days (Jan) to ~5 days (late Mar)
# Status flow: Backlog → Ready for Dev → In Development → Code Review → Testing → Done

def generate_alpha(n=300) -> dict:
    project_key = "ALPHA"
    base_url = "https://alpha-corp.atlassian.net"
    STATUS_FLOW = ["Backlog", "Ready for Dev", "In Development", "Code Review", "Testing", "Done"]
    CYCLE_START = "In Development"
    CYCLE_END = "Done"

    start_date = datetime(2026, 1, 2, 9, 0, tzinfo=timezone.utc)
    end_date   = datetime(2026, 3, 25, 18, 0, tzinfo=timezone.utc)
    total_secs = (end_date - start_date).total_seconds()

    tickets = []
    used_titles: set = set()

    # Type distribution: 40% story, 40% task, 20% bug
    types = (["story"] * 120 + ["task"] * 120 + ["bug"] * 60)
    random.shuffle(types)

    for i in range(n):
        # Progress 0→1 over the date range
        progress = i / n
        created = start_date + timedelta(seconds=total_secs * progress * random.uniform(0.98, 1.02))

        # Cycle time shrinks from 22→4 days + small noise
        base_ct = 22 - progress * 18  # 22 at start, 4 at end
        noise = random.gauss(0, base_ct * 0.15)
        cycle_days = max(1.0, base_ct + noise)

        ticket_type = types[i]
        title = pick_title(ticket_type, used_titles)
        assignee = random.choice(ASSIGNEES_ALPHA)
        external_id = f"{project_key}-{100 + i}"

        tickets.append(make_ticket(
            external_id, project_key, base_url,
            created, ticket_type, title,
            cycle_days, STATUS_FLOW, assignee, jitter=0.25
        ))

    return {
        "source_type": "jira",
        "project_key": project_key,
        "base_url": base_url,
        "exported_at": EXPORTED_AT,
        "_test_scenario": "Improving team: cycle time drops from ~22 to ~4 days over 3 months",
        "_suggested_config": {
            "cycle_time_start_status": CYCLE_START,
            "cycle_time_end_status": CYCLE_END,
            "status_order": STATUS_FLOW,
        },
        "tickets": tickets,
    }


# ─── SCENARIO 2: Beta Team – high variance / fluctuation ───────────────────
# Cycle time: median ~10 days but swings from 1 to 40+ days
# Frequent rework: Testing → back to In Progress
# Status flow: Backlog → Up Next → In Progress → Testing → Done
# Sometimes: Testing → In Progress (rework loop)

def make_beta_transitions(created: datetime, cycle_days: float, rework: bool) -> list[dict]:
    STATUS_FLOW = ["Backlog", "Up Next", "In Progress", "Testing", "Done"]
    transitions = [{"from_status": None, "to_status": "Backlog", "transitioned_at": iso(created)}]

    backlog_wait = timedelta(days=cycle_days * random.uniform(0.05, 0.4))
    t = created + backlog_wait

    # Up Next
    t += timedelta(days=random.uniform(0.3, 3.0))
    transitions.append({"from_status": "Backlog", "to_status": "Up Next", "transitioned_at": iso(t)})

    # In Progress
    t += timedelta(days=cycle_days * random.uniform(0.3, 0.6))
    transitions.append({"from_status": "Up Next", "to_status": "In Progress", "transitioned_at": iso(t)})

    if rework:
        # Testing → back to In Progress → Testing again
        t += timedelta(days=cycle_days * random.uniform(0.2, 0.4))
        transitions.append({"from_status": "In Progress", "to_status": "Testing", "transitioned_at": iso(t)})
        t += timedelta(days=random.uniform(1, 4))
        transitions.append({"from_status": "Testing", "to_status": "In Progress", "transitioned_at": iso(t)})
        t += timedelta(days=cycle_days * random.uniform(0.15, 0.3))
        transitions.append({"from_status": "In Progress", "to_status": "Testing", "transitioned_at": iso(t)})
    else:
        t += timedelta(days=cycle_days * random.uniform(0.25, 0.45))
        transitions.append({"from_status": "In Progress", "to_status": "Testing", "transitioned_at": iso(t)})

    # Done
    t += timedelta(days=cycle_days * random.uniform(0.05, 0.2))
    transitions.append({"from_status": "Testing", "to_status": "Done", "transitioned_at": iso(t)})

    return transitions


def generate_beta(n=300) -> dict:
    project_key = "BETA"
    base_url = "https://beta-corp.atlassian.net"
    CYCLE_START = "In Progress"
    CYCLE_END = "Done"
    STATUS_ORDER = ["Backlog", "Up Next", "In Progress", "Testing", "Done"]

    start_date = datetime(2026, 1, 2, 9, 0, tzinfo=timezone.utc)
    end_date   = datetime(2026, 3, 25, 18, 0, tzinfo=timezone.utc)
    total_secs = (end_date - start_date).total_seconds()

    tickets = []
    used_titles: set = set()

    # More bugs: 25% story, 35% task, 40% bug
    types = (["story"] * 75 + ["task"] * 105 + ["bug"] * 120)
    random.shuffle(types)

    for i in range(n):
        progress = i / n
        created = start_date + timedelta(seconds=total_secs * progress * random.uniform(0.97, 1.03))

        # High variance: mix of very fast and very slow, no improvement trend
        # Use a bimodal distribution: some tickets fast (1-5d), many slow (8-35d)
        if random.random() < 0.25:
            cycle_days = random.uniform(1, 5)       # quick wins
        elif random.random() < 0.15:
            cycle_days = random.uniform(25, 45)     # disasters
        else:
            cycle_days = random.gauss(12, 7)        # typical, wide spread
        cycle_days = max(0.5, cycle_days)

        rework = random.random() < 0.35  # 35% of tickets have rework

        ticket_type = types[i]
        title = pick_title(ticket_type, used_titles)
        assignee = random.choice(ASSIGNEES_BETA)
        external_id = f"{project_key}-{200 + i}"

        transitions = make_beta_transitions(created, cycle_days, rework)
        tickets.append({
            "external_id": external_id,
            "title": title,
            "ticket_type": ticket_type,
            "created_at": iso(created),
            "external_link": f"{base_url}/browse/{external_id}",
            "transitions": transitions,
            "metadata": {
                "assignee": assignee,
                "labels": ["rework"] if rework else [],
                "story_points": random.choice([1, 2, 3, 5, 8, None]),
            },
        })

    return {
        "source_type": "jira",
        "project_key": project_key,
        "base_url": base_url,
        "exported_at": EXPORTED_AT,
        "_test_scenario": "Fluctuating team: high variance cycle time (1–45 days), 35% rework rate, no improvement trend",
        "_suggested_config": {
            "cycle_time_start_status": CYCLE_START,
            "cycle_time_end_status": CYCLE_END,
            "status_order": STATUS_ORDER,
        },
        "tickets": tickets,
    }


if __name__ == "__main__":
    alpha = generate_alpha(300)
    beta  = generate_beta(300)

    with open("test_alpha_improving.json", "w", encoding="utf-8") as f:
        json.dump(alpha, f, indent=2, ensure_ascii=False)
    print(f"✓ test_alpha_improving.json — {len(alpha['tickets'])} tickets")
    print(f"  Scenario: {alpha['_test_scenario']}")

    with open("test_beta_fluctuating.json", "w", encoding="utf-8") as f:
        json.dump(beta, f, indent=2, ensure_ascii=False)
    print(f"✓ test_beta_fluctuating.json — {len(beta['tickets'])} tickets")
    print(f"  Scenario: {beta['_test_scenario']}")
