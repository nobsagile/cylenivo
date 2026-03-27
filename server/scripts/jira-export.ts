/**
 * Jira export script — produces ImportFile JSON for Cylenivo
 *
 * Usage:
 *   JIRA_BASE_URL=https://your-org.atlassian.net \
 *   JIRA_EMAIL=you@example.com \
 *   JIRA_TOKEN=your-api-token \
 *   npx tsx server/scripts/jira-export.ts --project TN --limit 20 --output export.json
 */

import { writeFileSync } from 'fs'

// --- CLI args ---
const args = process.argv.slice(2)
function getArg(name: string, fallback?: string): string {
  const i = args.indexOf(`--${name}`)
  if (i !== -1 && args[i + 1]) return args[i + 1]
  if (fallback !== undefined) return fallback
  console.error(`Missing required argument: --${name}`)
  process.exit(1)
}

const PROJECT = getArg('project')
const LIMIT = parseInt(getArg('limit', '20'), 10)
const OUTPUT = getArg('output', 'jira-export.json')
const ISSUE_TYPES = getArg('types', 'Story,Task,Bug')

// --- Env ---
const BASE_URL = process.env.JIRA_BASE_URL
const EMAIL = process.env.JIRA_EMAIL
const TOKEN = process.env.JIRA_TOKEN

if (!BASE_URL || !EMAIL || !TOKEN) {
  console.error('Required env vars: JIRA_BASE_URL, JIRA_EMAIL, JIRA_TOKEN')
  process.exit(1)
}

const AUTH = Buffer.from(`${EMAIL}:${TOKEN}`).toString('base64')

async function jiraGet(path: string): Promise<any> {
  const url = `${BASE_URL}/rest/api/3${path}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${AUTH}`,
      Accept: 'application/json',
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Jira API error ${res.status} for ${path}: ${body}`)
  }
  return res.json()
}

function mapIssueType(jiraType: string): string {
  const t = jiraType.toLowerCase()
  if (t === 'bug') return 'bug'
  if (t === 'epic') return 'epic'
  if (t === 'task' || t === 'sub-task' || t === 'subtask') return 'task'
  return 'story'
}

async function fetchIssues(): Promise<any[]> {
  const typeList = ISSUE_TYPES.split(',').map(t => `"${t.trim()}"`).join(', ')
  const jql = `project = ${PROJECT} AND issuetype in (${typeList}) AND status = Done ORDER BY updated DESC`
  console.log(`JQL: ${jql}`)

  const data = await jiraGet(
    `/search/jql?jql=${encodeURIComponent(jql)}&maxResults=${LIMIT}&fields=summary,issuetype,created,status`
  )
  console.log(`Found ${data.total} total, fetching ${data.issues.length}`)
  return data.issues
}

async function fetchChangelog(issueKey: string): Promise<any[]> {
  // Jira paginates changelog — fetch all pages
  const allHistories: any[] = []
  let startAt = 0
  while (true) {
    const data = await jiraGet(
      `/issue/${issueKey}/changelog?startAt=${startAt}&maxResults=100`
    )
    allHistories.push(...data.values)
    if (startAt + data.values.length >= data.total) break
    startAt += data.values.length
  }
  return allHistories
}

function extractTransitions(histories: any[]): Array<{
  from_status: string | null
  to_status: string
  transitioned_at: string
}> {
  const transitions: Array<{
    from_status: string | null
    to_status: string
    transitioned_at: string
  }> = []

  for (const history of histories) {
    for (const item of history.items) {
      if (item.field === 'status') {
        transitions.push({
          from_status: item.fromString ?? null,
          to_status: item.toString,
          transitioned_at: history.created,
        })
      }
    }
  }

  // Sort chronologically
  transitions.sort(
    (a, b) =>
      new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
  )

  return transitions
}

async function main() {
  console.log(`Exporting up to ${LIMIT} ${ISSUE_TYPES} from project ${PROJECT}...`)

  const issues = await fetchIssues()
  const tickets: any[] = []

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i]
    const key = issue.key
    process.stdout.write(`  [${i + 1}/${issues.length}] ${key}...`)

    try {
      const histories = await fetchChangelog(key)
      const transitions = extractTransitions(histories)

      tickets.push({
        external_id: key,
        title: issue.fields.summary,
        ticket_type: mapIssueType(issue.fields.issuetype.name),
        created_at: issue.fields.created,
        transitions,
      })
      process.stdout.write(` ${transitions.length} transitions\n`)
    } catch (err) {
      process.stdout.write(` ERROR: ${err}\n`)
    }
  }

  const output = {
    source_type: 'jira',
    project_key: PROJECT,
    exported_at: new Date().toISOString(),
    tickets,
  }

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2))
  console.log(`\nWrote ${tickets.length} tickets to ${OUTPUT}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
