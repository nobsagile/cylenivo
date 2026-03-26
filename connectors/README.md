# Jira Connector

Exports a Jira project to Flow Analyzer JSON format.

## Setup

```bash
pip install requests
```

## Usage

```bash
python jira_export.py \
  --url https://yourcompany.atlassian.net \
  --project ROAD \
  --email your@email.com \
  --token YOUR_JIRA_API_TOKEN \
  --output road_export.json
```

## Get a Jira API Token

1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click "Create API token"
3. Copy the token value
