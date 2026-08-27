import { describe, it, expect, afterEach } from 'bun:test'
import { fetchIssues } from '../src/connectors/jira.js'
import type { JiraCredentials } from '../src/connectors/jira.js'

// Regression cover for the silent-truncation bug: an export that stops after the
// first page looks plausible but produces wrong metrics. These tests assert the
// loop actually follows pagination on both Cloud and Server, and that --limit
// stops it early instead of the page size doing so by accident.

const CLOUD: JiraCredentials = {
  base_url: 'https://example.atlassian.net',
  email: 'a@b.c',
  api_token: 'token',
  auth_type: 'cloud',
}

const SERVER: JiraCredentials = { ...CLOUD, auth_type: 'server' }

const realFetch = globalThis.fetch

/** Serves canned responses in order and records the URLs requested. */
function stubFetch(pages: unknown[]) {
  const urls: string[] = []
  let call = 0
  globalThis.fetch = (async (url: string | URL | Request) => {
    urls.push(String(url))
    const body = pages[Math.min(call++, pages.length - 1)]
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }) as typeof fetch
  return { urls, callCount: () => call }
}

function issues(...keys: string[]) {
  return keys.map(key => ({
    key,
    fields: { summary: `Summary ${key}`, issuetype: { name: 'Story' }, created: '2026-01-01T12:00:00.000Z' },
  }))
}

afterEach(() => {
  globalThis.fetch = realFetch
})

describe('fetchIssues — Cloud pagination (nextPageToken)', () => {
  it('follows nextPageToken across pages instead of stopping after the first', async () => {
    const stub = stubFetch([
      { issues: issues('A-1', 'A-2'), nextPageToken: 'tok-2' },
      { issues: issues('A-3', 'A-4'), nextPageToken: 'tok-3' },
      { issues: issues('A-5'), isLast: true },
    ])

    const result = await fetchIssues(CLOUD, { project: 'A' })

    expect(result.map(i => i.key)).toEqual(['A-1', 'A-2', 'A-3', 'A-4', 'A-5'])
    expect(stub.callCount()).toBe(3)
    // Page 1 must not send a token; later pages must send the previous one.
    expect(stub.urls[0]).not.toContain('nextPageToken')
    expect(stub.urls[1]).toContain('nextPageToken=tok-2')
    expect(stub.urls[2]).toContain('nextPageToken=tok-3')
  })

  it('stops when isLast is true even if a token is still present', async () => {
    const stub = stubFetch([
      { issues: issues('A-1'), nextPageToken: 'tok-2', isLast: true },
      { issues: issues('A-2'), isLast: true },
    ])

    const result = await fetchIssues(CLOUD, { project: 'A' })

    expect(result.map(i => i.key)).toEqual(['A-1'])
    expect(stub.callCount()).toBe(1)
  })

  it('stops when the token is absent — the last page carries no nextPageToken', async () => {
    const stub = stubFetch([
      { issues: issues('A-1', 'A-2'), nextPageToken: 'tok-2' },
      { issues: issues('A-3') },
    ])

    const result = await fetchIssues(CLOUD, { project: 'A' })

    expect(result.map(i => i.key)).toEqual(['A-1', 'A-2', 'A-3'])
    expect(stub.callCount()).toBe(2)
  })

  it('does not rely on a total field — the endpoint no longer returns one', async () => {
    const stub = stubFetch([
      { issues: issues('A-1'), nextPageToken: 'tok-2' },
      { issues: issues('A-2'), isLast: true },
    ])

    const result = await fetchIssues(CLOUD, { project: 'A' })

    expect(result).toHaveLength(2)
    expect(stub.callCount()).toBe(2)
  })

  it('stops on an empty page rather than looping forever', async () => {
    const stub = stubFetch([
      { issues: issues('A-1'), nextPageToken: 'tok-2' },
      { issues: [], nextPageToken: 'tok-3' },
    ])

    const result = await fetchIssues(CLOUD, { project: 'A' })

    expect(result.map(i => i.key)).toEqual(['A-1'])
    expect(stub.callCount()).toBe(2)
  })
})

describe('fetchIssues — Server pagination (startAt/total)', () => {
  it('follows startAt until total is reached', async () => {
    const stub = stubFetch([
      { issues: issues('S-1', 'S-2'), total: 5 },
      { issues: issues('S-3', 'S-4'), total: 5 },
      { issues: issues('S-5'), total: 5 },
    ])

    const result = await fetchIssues(SERVER, { project: 'S' })

    expect(result.map(i => i.key)).toEqual(['S-1', 'S-2', 'S-3', 'S-4', 'S-5'])
    expect(stub.callCount()).toBe(3)
    expect(stub.urls[0]).toContain('startAt=0')
    expect(stub.urls[1]).toContain('startAt=2')
    expect(stub.urls[2]).toContain('startAt=4')
  })

  it('uses the v2 /search endpoint, not /search/jql', async () => {
    const stub = stubFetch([{ issues: issues('S-1'), total: 1 }])

    await fetchIssues(SERVER, { project: 'S' })

    expect(stub.urls[0]).toContain('/rest/api/2/search?')
    expect(stub.urls[0]).not.toContain('/search/jql')
  })
})

describe('fetchIssues — limit', () => {
  it('truncates to the requested limit across page boundaries', async () => {
    const stub = stubFetch([
      { issues: issues('A-1', 'A-2', 'A-3'), nextPageToken: 'tok-2' },
      { issues: issues('A-4', 'A-5', 'A-6'), nextPageToken: 'tok-3' },
    ])

    const result = await fetchIssues(CLOUD, { project: 'A', limit: 4 })

    expect(result.map(i => i.key)).toEqual(['A-1', 'A-2', 'A-3', 'A-4'])
    // Must not keep paging once the limit is covered.
    expect(stub.callCount()).toBe(2)
  })

  it('returns everything when no limit is given', async () => {
    stubFetch([{ issues: issues('A-1', 'A-2', 'A-3'), isLast: true }])

    const result = await fetchIssues(CLOUD, { project: 'A' })

    expect(result).toHaveLength(3)
  })

  it('applies the limit on the server path too', async () => {
    const stub = stubFetch([
      { issues: issues('S-1', 'S-2'), total: 10 },
    ])

    const result = await fetchIssues(SERVER, { project: 'S', limit: 2 })

    expect(result.map(i => i.key)).toEqual(['S-1', 'S-2'])
    expect(stub.callCount()).toBe(1)
  })
})

describe('fetchIssues — JQL construction', () => {
  it('uses statusCategory = Done, not a hardcoded status name', async () => {
    const stub = stubFetch([{ issues: issues('A-1'), isLast: true }])

    await fetchIssues(CLOUD, { project: 'A' })

    const jql = decodeURIComponent(stub.urls[0])
    expect(jql).toContain('statusCategory = Done')
    expect(jql).not.toContain('status = Done')
  })

  it('includes issue type and date filters when given', async () => {
    const stub = stubFetch([{ issues: issues('A-1'), isLast: true }])

    await fetchIssues(CLOUD, {
      project: 'A',
      issue_types: ['Story', 'Bug'],
      resolved_from: '2026-01-01',
      resolved_to: '2026-06-30',
    })

    const jql = decodeURIComponent(stub.urls[0])
    expect(jql).toContain('issuetype in ("Story", "Bug")')
    expect(jql).toContain('resolved >= "2026-01-01"')
    expect(jql).toContain('resolved <= "2026-06-30"')
  })
})
