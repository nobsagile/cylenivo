export interface JiraCredentials {
  base_url: string
  email: string
  api_token: string
}

export interface JiraFetchOptions {
  project: string
  limit?: number
  issue_types?: string[]
  done_only?: boolean
  date_from?: string
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

function authHeader(creds: JiraCredentials): string {
  return 'Basic ' + Buffer.from(`${creds.email}:${creds.api_token}`).toString('base64')
}

async function jiraGet(creds: JiraCredentials, path: string): Promise<any> {
  const url = `${creds.base_url}/rest/api/3${path}`
  const res = await fetch(url, {
    headers: { Authorization: authHeader(creds), Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Jira API ${res.status}: ${body}`)
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
  const data = await jiraGet(creds, '/myself')
  return { display_name: data.displayName, email: data.emailAddress }
}

export async function fetchIssues(creds: JiraCredentials, options: JiraFetchOptions): Promise<any[]> {
  const { project, limit = 50, issue_types = ['Story', 'Task', 'Bug'], done_only = true, date_from } = options
  const typeList = issue_types.map(t => `"${t}"`).join(', ')
  const statusFilter = done_only ? ' AND status = Done' : ''
  const dateFilter = date_from ? ` AND updated >= "${date_from}"` : ''
  const jql = `project = ${project} AND issuetype in (${typeList})${statusFilter}${dateFilter} ORDER BY updated DESC`

  const data = await jiraGet(
    creds,
    `/search/jql?jql=${encodeURIComponent(jql)}&maxResults=${limit}&fields=summary,issuetype,created`
  )
  return data.issues ?? []
}

export async function fetchChangelog(creds: JiraCredentials, issueKey: string): Promise<any[]> {
  const histories: any[] = []
  let startAt = 0
  while (true) {
    const data = await jiraGet(creds, `/issue/${issueKey}/changelog?startAt=${startAt}&maxResults=100`)
    histories.push(...data.values)
    if (startAt + data.values.length >= data.total) break
    startAt += data.values.length
  }
  return histories
}

export function extractTransitions(histories: any[]) {
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

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i]
    onProgress?.(i + 1, issues.length, issue.key)
    const histories = await fetchChangelog(creds, issue.key)
    tickets.push({
      external_id: issue.key,
      title: issue.fields.summary,
      ticket_type: mapIssueType(issue.fields.issuetype.name),
      created_at: issue.fields.created,
      external_link: `${creds.base_url}/browse/${issue.key}`,
      transitions: extractTransitions(histories),
    })
  }

  return {
    source_type: 'jira',
    project_key: options.project,
    exported_at: new Date().toISOString(),
    tickets,
  }
}
