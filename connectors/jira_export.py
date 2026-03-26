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


def fetch_all_issues(base_url: str, project_key: str, auth: HTTPBasicAuth, months: int = 3, types: str = "") -> list[dict]:
    """Fetches all issues for a project with their changelogs using pagination."""
    issues = []
    max_results = 50
    type_filter = ""
    if types:
        quoted = ",".join(f'"{t.strip()}"' for t in types.split(","))
        type_filter = f" AND issuetype in ({quoted})"
    jql = f'project = "{project_key}" AND created >= "-{months * 30}d"{type_filter} ORDER BY created ASC'

    print(f"Fetching issues for project {project_key}...")
    print(f"  JQL: {jql}")

    next_page_token = None

    while True:
        url = f"{base_url}/rest/api/3/search/jql"
        params = {
            "jql": jql,
            "expand": "changelog",
            "fields": "summary,issuetype,created,status,assignee,labels,story_points,customfield_10016",
            "maxResults": max_results,
        }
        if next_page_token:
            params["nextPageToken"] = next_page_token
        else:
            params["startAt"] = len(issues)

        response = requests.get(url, params=params, auth=auth)
        response.raise_for_status()
        data = response.json()

        batch = data.get("issues", [])
        issues.extend(batch)
        print(f"  Fetched {len(issues)} issues", end="\r")

        next_page_token = data.get("nextPageToken")
        if next_page_token:
            continue
        elif len(batch) < max_results:
            break
        elif "total" in data and len(issues) >= data["total"]:
            break

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
    created_at = parse_iso(fields.get("created"))

    # Add all status changes from changelog
    histories = issue.get("changelog", {}).get("histories", [])
    sorted_histories = sorted(histories, key=lambda h: h.get("created", ""))

    for history in sorted_histories:
        for item in history.get("items", []):
            if item.get("field") == "status":
                transitions.append({
                    "from_status": item.get("fromString"),
                    "to_status": item.get("toString"),
                    "transitioned_at": parse_iso(history.get("created")),
                })

    # Sort by date to be safe
    transitions.sort(key=lambda t: t["transitioned_at"] or "")

    # Prepend the real initial status (= fromString of first status change)
    # Fallback: current status if ticket was never moved
    if transitions:
        initial_status = transitions[0]["from_status"] or fields.get("status", {}).get("name", "Unknown")
    else:
        initial_status = fields.get("status", {}).get("name", "Unknown")

    transitions.insert(0, {
        "from_status": None,
        "to_status": initial_status,
        "transitioned_at": created_at,
    })

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
    parser.add_argument("--months", type=int, default=3, help="How many months back to fetch (default: 3)")
    parser.add_argument("--types", default="", help="Comma-separated issue types to include, e.g. 'Story,Task,Bug'")
    args = parser.parse_args()

    base_url = args.url.rstrip("/")
    auth = HTTPBasicAuth(args.email, args.token)

    try:
        issues = fetch_all_issues(base_url, args.project, auth, months=args.months, types=args.types)
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
