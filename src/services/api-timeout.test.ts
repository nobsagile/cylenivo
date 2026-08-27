/**
 * Every request ran on a single 30s AbortSignal.timeout — including uploads and
 * Jira calls. A large Jira export took longer than that, so the frontend
 * aborted while the server kept importing: the user saw a failure, retried, and
 * ended up with a duplicate dataset.
 *
 * These tests pin which calls get the long timeout, by inspecting the signal
 * the api layer hands to fetch.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { api } from './api'

const DEFAULT_MS = 30_000
const LONG_MS = 10 * 60_000

/** Records the AbortSignal timing of each fetch call. */
function stubFetch(status = 200) {
  const calls: { url: string; timeoutMs: number | null; init: RequestInit }[] = []

  const fetchMock = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const signal = init?.signal ?? null
    calls.push({ url: String(url), timeoutMs: signal ? measure(signal) : null, init: init ?? {} })
    if (status === 204) return new Response(null, { status: 204 })
    return new Response(JSON.stringify({ data: {} }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  })
  vi.stubGlobal('fetch', fetchMock)
  return calls
}

/**
 * AbortSignal.timeout does not expose its duration, so tests read it from the
 * spy we install on AbortSignal.timeout itself.
 */
const signalDurations = new WeakMap<AbortSignal, number>()
function measure(signal: AbortSignal): number | null {
  return signalDurations.get(signal) ?? null
}

let realTimeout: typeof AbortSignal.timeout

beforeEach(() => {
  realTimeout = AbortSignal.timeout
  AbortSignal.timeout = ((ms: number) => {
    const signal = realTimeout.call(AbortSignal, 3_600_000) // never actually fires in tests
    signalDurations.set(signal, ms)
    return signal
  }) as typeof AbortSignal.timeout
})

afterEach(() => {
  AbortSignal.timeout = realTimeout
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('long-running calls get a generous timeout', () => {
  it('imports.upload — parse + insert of a large export', async () => {
    const calls = stubFetch()
    const file = new File(['{}'], 'export.json', { type: 'application/json' })

    await api.imports.upload(file, 'cfg-1')

    expect(calls).toHaveLength(1)
    expect(calls[0].url).toContain('/api/v1/imports')
    expect(calls[0].timeoutMs).toBe(LONG_MS)
  })

  it('imports.replace — same work as upload', async () => {
    const calls = stubFetch()
    const file = new File(['{}'], 'export.json', { type: 'application/json' })

    await api.imports.replace('imp-1', file)

    expect(calls[0].url).toContain('/api/v1/imports/imp-1/data')
    expect(calls[0].timeoutMs).toBe(LONG_MS)
  })

  it('connections.test — talks to Jira, server retries 429 with backoff', async () => {
    const calls = stubFetch()

    await api.connections.test('conn-1')

    expect(calls[0].timeoutMs).toBe(LONG_MS)
  })

  it('connections.issueTypes — also a Jira round trip', async () => {
    const calls = stubFetch()

    await api.connections.issueTypes('conn-1', 'TN')

    expect(calls[0].timeoutMs).toBe(LONG_MS)
  })

  it('demo.seed — writes three full datasets', async () => {
    const calls = stubFetch()

    await api.demo.seed()

    expect(calls[0].timeoutMs).toBe(LONG_MS)
  })

  it('imports.statuses — reads every transition of a dataset', async () => {
    const calls = stubFetch()

    await api.imports.statuses('imp-1')

    expect(calls[0].timeoutMs).toBe(LONG_MS)
  })
})

describe('ordinary reads keep the short timeout', () => {
  it('metrics.summary', async () => {
    const calls = stubFetch()
    await api.metrics.summary('imp-1')
    expect(calls[0].timeoutMs).toBe(DEFAULT_MS)
  })

  it('imports.list', async () => {
    const calls = stubFetch()
    await api.imports.list()
    expect(calls[0].timeoutMs).toBe(DEFAULT_MS)
  })

  it('tickets.list', async () => {
    const calls = stubFetch()
    await api.tickets.list('imp-1')
    expect(calls[0].timeoutMs).toBe(DEFAULT_MS)
  })

  it('configs.create — a small write', async () => {
    const calls = stubFetch()
    await api.configs.create({
      name: 'x',
      source_type: 'jira',
      status_order: ['A', 'B'],
      cycle_time_start_status: 'A',
      cycle_time_end_status: 'B',
    } as Parameters<typeof api.configs.create>[0])
    expect(calls[0].timeoutMs).toBe(DEFAULT_MS)
  })

  it('imports.delete', async () => {
    const calls = stubFetch()
    await api.imports.delete('imp-1')
    expect(calls[0].timeoutMs).toBe(DEFAULT_MS)
  })
})

describe('request plumbing', () => {
  it('sets a timeout on every call — none go out unbounded', async () => {
    const calls = stubFetch()

    await api.metrics.summary('imp-1')
    await api.imports.list()
    await api.imports.statuses('imp-1')

    expect(calls).toHaveLength(3)
    for (const call of calls) {
      expect(call.timeoutMs).not.toBeNull()
      expect(call.timeoutMs!).toBeGreaterThan(0)
    }
  })

  it('still sends the method — the options spread was reordered around signal', async () => {
    const calls = stubFetch(204)

    await api.imports.delete('imp-1')

    expect(calls[0].init.method).toBe('DELETE')
  })

  it('preserves headers and body on a JSON write', async () => {
    const calls = stubFetch()

    await api.imports.update('imp-1', { name: 'Renamed' })

    const { init } = calls[0]
    expect(init.method).toBe('PATCH')
    expect(init.body).toBe(JSON.stringify({ name: 'Renamed' }))
    expect((init.headers as Record<string, string>)['Content-Type']).toBe('application/json')
  })
})
