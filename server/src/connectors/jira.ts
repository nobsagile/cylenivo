export interface JiraCredentials {
  base_url: string
  email: string
  api_token: string
  auth_type: 'cloud' | 'server'
}

export interface JiraFetchOptions {
  project: string
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
  total: number      // used for server (v2) offset pagination
  nextPageToken?: string  // cloud (v3) only
  isLast?: boolean        // cloud (v3) only
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

// Jira Server v2: changelog embedded in issue via ?expand=changelog
interface JiraIssueWithChangelog {
  changelog: {
    histories: JiraChangelogHistory[]
    total: number
  }
}

// ── API helpers ──────────────────────────────────────────────────────────────

function authHeader(creds: JiraCredentials): string {
  if (creds.auth_type === 'server') {
    return 'Bearer ' + creds.api_token
  }
  return 'Basic ' + Buffer.from(`${creds.email}:${creds.api_token}`).toString('base64')
}

const MAX_RETRIES = 3

async function jiraGet<T>(creds: JiraCredentials, path: string, attempt = 0): Promise<T> {
  const apiVersion = creds.auth_type === 'server' ? '2' : '3'
  const url = `${creds.base_url}/rest/api/${apiVersion}${path}`
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

export async function fetchProjectIssueTypes(creds: JiraCredentials, project: string): Promise<string[]> {
  // /project/{key}/issuetypes exists only on Cloud; Server embeds issueTypes inside /project/{key}
  const data = await jiraGet<{ issueTypes?: { name: string; subtask: boolean }[]; name?: string; subtask?: boolean }>(creds, `/project/${project}`)
  const types = data.issueTypes ?? []
  return types.filter(t => !t.subtask).map(t => t.name)
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
  const { project, issue_types = ['Story', 'Task', 'Bug'], resolved_from, resolved_to } = options
  const typeList = issue_types.map(t => `"${t}"`).join(', ')
  const fromFilter = resolved_from ? ` AND resolved >= "${resolved_from}"` : ''
  const toFilter = resolved_to ? ` AND resolved <= "${resolved_to}"` : ''
  const jql = `project = ${project} AND issuetype in (${typeList}) AND statusCategory = Done${fromFilter}${toFilter} ORDER BY resolved DESC`

  const all: JiraIssue[] = []
  if (creds.auth_type === 'server') {
    // Jira Server / Data Center: v2 API, offset-based pagination
    let startAt = 0
    while (true) {
      const data = await jiraGet<JiraSearchResponse>(
        creds,
        `/search?jql=${encodeURIComponent(jql)}&maxResults=${JIRA_PAGE_SIZE}&startAt=${startAt}&fields=summary,issuetype,created`
      )
      const issues = data.issues ?? []
      if (issues.length === 0) break
      all.push(...issues)
      if (startAt + issues.length >= data.total) break
      startAt += issues.length
    }
  } else {
    // Atlassian Cloud: v3 API, token-based pagination
    let nextPageToken: string | undefined
    while (true) {
      const tokenParam = nextPageToken ? `&nextPageToken=${encodeURIComponent(nextPageToken)}` : ''
      const data = await jiraGet<JiraSearchResponse>(
        creds,
        `/search/jql?jql=${encodeURIComponent(jql)}&maxResults=${JIRA_PAGE_SIZE}&fields=summary,issuetype,created${tokenParam}`
      )
      const issues = data.issues ?? []
      if (issues.length === 0) break
      all.push(...issues)
      if (data.isLast || !data.nextPageToken) break
      nextPageToken = data.nextPageToken
    }
  }
  return all
}

export async function fetchChangelog(creds: JiraCredentials, issueKey: string): Promise<JiraChangelogHistory[]> {
  if (creds.auth_type === 'server') {
    // Jira Server / Data Center: no standalone changelog endpoint — must expand on issue
    const data = await jiraGet<JiraIssueWithChangelog>(creds, `/issue/${issueKey}?expand=changelog&fields=`)
    return data.changelog?.histories ?? []
  }
  // Atlassian Cloud: paginated dedicated endpoint
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
  const results: (ImportTicket | null)[] = new Array(issues.length).fill(null)
  const skipped: string[] = []
  let completed = 0

  const CONCURRENCY = 10
  const queue = issues.map((_, i) => i)
  const workers = Array.from({ length: Math.min(CONCURRENCY, issues.length) }, async () => {
    while (queue.length > 0) {
      const i = queue.shift()!
      const issue = issues[i]
      try {
        const histories = await fetchChangelog(creds, issue.key)
        results[i] = {
          external_id: issue.key,
          title: issue.fields.summary,
          ticket_type: mapIssueType(issue.fields.issuetype.name),
          created_at: issue.fields.created,
          external_link: `${creds.base_url}/browse/${issue.key}`,
          transitions: extractTransitions(histories),
        }
      } catch (e) {
        console.warn(`[jira] skipping ${issue.key}: ${e instanceof Error ? e.message : e}`)
        skipped.push(issue.key)
      }
      completed++
      onProgress?.(completed, issues.length, issue.key)
    }
  })
  await Promise.all(workers)
  const tickets = results.filter((t): t is ImportTicket => t !== null)
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
