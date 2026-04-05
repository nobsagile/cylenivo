export interface JiraCredentials {
  base_url: string
  email: string
  api_token: string
}

export interface JiraFetchOptions {
  project: string
  limit?: number
  issue_types?: string[]
  resolved_from?: string
  resolved_to?: string
}

export interface ImportTicket {
  external_id: string
  title: string
  ticket_type: string
  created_at: string
  external_link?: string
  transitions: Array<{
    from_status: string | null
    to_status: string
    transitioned_at: string
  }>
}

export interface ImportFile {
  source_type: 'jira'
  project_key: string
  exported_at: string
  tickets: ImportTicket[]
}

// ── Jira API response types ──────────────────────────────────────────────────

interface JiraUser {
  displayName: string
  emailAddress: string
}

interface JiraIssueFields {
  summary: string
  issuetype: { name: string }
  created: string
}

interface JiraIssue {
  key: string
  fields: JiraIssueFields
}

interface JiraSearchResponse {
  issues: JiraIssue[]
  total: number
}

interface JiraChangelogItem {
  field: string
  fromString: string | null
  toString: string
}

interface JiraChangelogHistory {
  created: string
  items: JiraChangelogItem[]
}

interface JiraChangelogResponse {
  values: JiraChangelogHistory[]
  total: number
}

// ── API helpers ──────────────────────────────────────────────────────────────

function authHeader(creds: JiraCredentials): string {
  return 'Basic ' + Buffer.from(`${creds.email}:${creds.api_token}`).toString('base64')
}

const MAX_RETRIES = 3

async function jiraGet<T>(creds: JiraCredentials, path: string, attempt = 0): Promise<T> {
  const url = `${creds.base_url}/rest/api/3${path}`
  const res = await fetch(url, {
    headers: { Authorization: authHeader(creds), Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  })

  // Retry on rate limit (429) or transient server errors (5xx)
  if (res.status === 429 || (res.status >= 500 && res.status < 600)) {
    if (attempt >= MAX_RETRIES) {
      throw new Error(`Jira API error: ${res.status} ${res.statusText} (gave up after ${MAX_RETRIES} retries)`)
    }
    const retryAfter = res.headers.get('Retry-After')
    const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 1000 * Math.pow(2, attempt)
    console.warn(`[jira] ${res.status} on ${path}, retrying in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`)
    await new Promise(r => setTimeout(r, delay))
    return jiraGet(creds, path, attempt + 1)
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error(`Jira API error ${res.status} on ${path}: ${body}`)
    throw new Error(`Jira API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export function mapIssueType(jiraType: string): string {
  const t = jiraType.toLowerCase()
  if (t === 'bug') return 'bug'
  if (t === 'epic') return 'epic'
  if (t === 'task' || t === 'sub-task' || t === 'subtask') return 'task'
  return 'story'
}

export async function testConnection(creds: JiraCredentials): Promise<{ display_name: string; email: string }> {
  const data = await jiraGet<JiraUser>(creds, '/myself')
  return { display_name: data.displayName, email: data.emailAddress }
}

const JIRA_PAGE_SIZE = 100

export async function fetchIssues(creds: JiraCredentials, options: JiraFetchOptions): Promise<JiraIssue[]> {
  const { project, limit = 50, issue_types = ['Story', 'Task', 'Bug'], resolved_from, resolved_to } = options
  const typeList = issue_types.map(t => `"${t}"`).join(', ')
  const fromFilter = resolved_from ? ` AND resolved >= "${resolved_from}"` : ''
  const toFilter = resolved_to ? ` AND resolved <= "${resolved_to}"` : ''
  const jql = `project = ${project} AND issuetype in (${typeList}) AND statusCategory = Done${fromFilter}${toFilter} ORDER BY resolved DESC`

  const all: JiraIssue[] = []
  let startAt = 0
  while (all.length < limit) {
    const pageSize = Math.min(JIRA_PAGE_SIZE, limit - all.length)
    const data = await jiraGet<JiraSearchResponse>(
      creds,
      `/search/jql?jql=${encodeURIComponent(jql)}&startAt=${startAt}&maxResults=${pageSize}&fields=summary,issuetype,created`
    )
    const issues = data.issues ?? []
    all.push(...issues)
    if (issues.length < pageSize || all.length >= limit) break
    startAt += issues.length
  }
  return all.slice(0, limit)
}

export async function fetchChangelog(creds: JiraCredentials, issueKey: string): Promise<JiraChangelogHistory[]> {
  const histories: JiraChangelogHistory[] = []
  let startAt = 0
  while (true) {
    const data = await jiraGet<JiraChangelogResponse>(creds, `/issue/${issueKey}/changelog?startAt=${startAt}&maxResults=100`)
    histories.push(...data.values)
    if (startAt + data.values.length >= data.total) break
    startAt += data.values.length
  }
  return histories
}

export function extractTransitions(histories: JiraChangelogHistory[]) {
  const transitions: ImportTicket['transitions'] = []
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
  return transitions.sort(
    (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
  )
}

export async function buildImportFile(
  creds: JiraCredentials,
  options: JiraFetchOptions,
  onProgress?: (current: number, total: number, key: string) => void,
): Promise<ImportFile> {
  const issues = await fetchIssues(creds, options)
  const tickets: ImportTicket[] = []

  const skipped: string[] = []
  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i]
    onProgress?.(i + 1, issues.length, issue.key)
    let histories: JiraChangelogHistory[]
    try {
      histories = await fetchChangelog(creds, issue.key)
    } catch (e) {
      console.warn(`[jira] skipping ${issue.key}: ${e instanceof Error ? e.message : e}`)
      skipped.push(issue.key)
      continue
    }
    tickets.push({
      external_id: issue.key,
      title: issue.fields.summary,
      ticket_type: mapIssueType(issue.fields.issuetype.name),
      created_at: issue.fields.created,
      external_link: `${creds.base_url}/browse/${issue.key}`,
      transitions: extractTransitions(histories),
    })
  }
  if (skipped.length > 0) {
    console.warn(`[jira] import completed with ${skipped.length} skipped ticket(s): ${skipped.join(', ')}`)
  }

  return {
    source_type: 'jira',
    project_key: options.project,
    exported_at: new Date().toISOString(),
    tickets,
  }
}
