#!/bin/bash
# Usage: ./server/scripts/jira-export.sh
# Or with overrides: PROJECT=TN LIMIT=20 ./server/scripts/jira-export.sh

JIRA_BASE_URL="${JIRA_BASE_URL:-https://yourcompany.atlassian.net}"
JIRA_EMAIL="${JIRA_EMAIL:-}"
JIRA_TOKEN="${JIRA_TOKEN:-}"
PROJECT="${PROJECT:-TN}"
LIMIT="${LIMIT:-20}"
OUTPUT="${OUTPUT:-test-export.json}"

if [ -z "$JIRA_EMAIL" ]; then
  read -rp "Jira Email: " JIRA_EMAIL
fi

if [ -z "$JIRA_TOKEN" ]; then
  read -rsp "Jira API Token: " JIRA_TOKEN
  echo
fi

JIRA_BASE_URL="$JIRA_BASE_URL" \
JIRA_EMAIL="$JIRA_EMAIL" \
JIRA_TOKEN="$JIRA_TOKEN" \
npx tsx "$(dirname "$0")/jira-export.ts" \
  --project "$PROJECT" \
  --limit "$LIMIT" \
  --output "$OUTPUT"
