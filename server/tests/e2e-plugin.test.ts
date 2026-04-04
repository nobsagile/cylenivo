/**
 * End-to-end integration test for the plugin system (Issue #52).
 *
 * Flow:
 *   1. Install plugin from registry
 *   2. Create a plugin connection
 *   3. Test the connection
 *   4. Fetch work packages via SSE stream
 *   5. Import the result with a config
 *   6. Assert metrics are available (cycle time, throughput)
 */

import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { join } from 'path'
import { rm } from 'fs/promises'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, sourceConnections } from '../src/db/schema.js'

const FIXTURE_PLUGINS_DIR = join(import.meta.dir, 'fixtures/plugins')

// sha256 of the fixture test-plugin/index.js
const TEST_PLUGIN_SHA256 = 'bd997638cfe9ea576ac27d3d2b8b9bda98793f0ea4969bfddc696a2708a3d07d'

const fixtureManifest = await Bun.file(join(FIXTURE_PLUGINS_DIR, 'test-plugin/manifest.json')).text()
const fixtureIndex    = await Bun.file(join(FIXTURE_PLUGINS_DIR, 'test-plugin/index.js')).text()

const fakeRegistry = [
  {
    id: 'test-plugin',
    name: 'Test Plugin',
    description: 'Fixture plugin for e2e tests',
    path: 'plugins/test-plugin',
    sha256: TEST_PLUGIN_SHA256,
  },
]

beforeAll(async () => {
  process.env.PLUGINS_DIR = FIXTURE_PLUGINS_DIR
  process.env.DB_PATH = ':memory:'
  await migrate()

  globalThis.fetch = async (url: string | URL | Request): Promise<Response> => {
    const u = String(url)
    if (u.includes('registry.json'))  return new Response(JSON.stringify(fakeRegistry), { status: 200 })
    if (u.includes('manifest.json')) return new Response(fixtureManifest, { status: 200 })
    if (u.includes('index.js'))       return new Response(fixtureIndex, { status: 200 })
    return new Response('not found', { status: 404 })
  }
})

beforeEach(async () => {
  await db.delete(ticketTransitions)
  await db.delete(tickets)
  await db.delete(importSessions)
  await db.delete(projectConfigs)
  await db.delete(sourceConnections)
})

// ─── helpers ─────────────────────────────────────────────────────────────────

async function json<T>(res: Response): Promise<T> {
  const body = await res.json() as { data: T; error?: string }
  if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`)
  return body.data
}

async function readSSE(res: Response): Promise<Array<Record<string, unknown>>> {
  const text = await res.text()
  return text
    .split('\n')
    .filter((l) => l.startsWith('data:'))
    .map((l) => JSON.parse(l.slice(5).trim()))
}

// ─── test ────────────────────────────────────────────────────────────────────

describe('Plugin E2E: install → connect → fetch → import → metrics', () => {
  it('completes the full flow', async () => {
    // ── 1. Install plugin from registry ──────────────────────────────────────
    const installRes = await app.request('/api/v1/plugins/registry/test-plugin/install', { method: 'POST' })
    expect(installRes.status).toBe(200)
    const installed = await json<{ source_type: string }>(installRes)
    expect(installed.source_type).toBe('test-plugin')

    // ── 2. Plugin appears in installed list ───────────────────────────────────
    const listRes = await app.request('/api/v1/plugins')
    const pluginList = await json<Array<{ source_type: string }>>(listRes)
    expect(pluginList.some((p) => p.source_type === 'test-plugin')).toBe(true)

    // ── 3. Create a plugin connection ─────────────────────────────────────────
    const connRes = await app.request('/api/v1/connections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'My Test Plugin',
        source_type: 'test-plugin',
        credentials: { api_key: 'secret' },
      }),
    })
    expect(connRes.status).toBe(201)
    const conn = await json<{ id: string; source_type: string }>(connRes)
    expect(conn.source_type).toBe('test-plugin')

    // ── 4. Test the connection ────────────────────────────────────────────────
    const testRes = await app.request(`/api/v1/connections/${conn.id}/test`, { method: 'POST' })
    expect(testRes.status).toBe(200)
    const testResult = await json<{ ok: boolean; display_name: string }>(testRes)
    expect(testResult.ok).toBe(true)
    expect(testResult.display_name).toBe('Test User')

    // ── 5. Fetch work packages via SSE ────────────────────────────────────────
    const fetchRes = await app.request(`/api/v1/connections/${conn.id}/fetch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ options: { project: 'MYPROJ' } }),
    })
    expect(fetchRes.status).toBe(200)

    const events = await readSSE(fetchRes)
    const progressEvents = events.filter((e) => e.type === 'progress')
    const doneEvent = events.find((e) => e.type === 'done')

    expect(progressEvents.length).toBe(2)
    expect(doneEvent).toBeTruthy()

    const importFile = doneEvent!.result as Record<string, unknown>
    expect(importFile.source_type).toBe('test-plugin')
    expect(importFile.project_key).toBe('MYPROJ')
    expect((importFile.tickets as unknown[]).length).toBe(1)

    // ── 6. Create a config for the import ────────────────────────────────────
    const configRes = await app.request('/api/v1/configs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Team',
        source_type: 'test-plugin',
        status_order: ['Todo', 'Done'],
        cycle_time_start_status: 'Todo',
        cycle_time_end_status: 'Done',
        cycle_time_mode: 'first_last',
      }),
    })
    expect(configRes.status).toBe(201)
    const config = await json<{ id: string }>(configRes)

    // ── 7. Import the fetched data ────────────────────────────────────────────
    const blob = new Blob([JSON.stringify(importFile)], { type: 'application/json' })
    const form = new FormData()
    form.append('file', new File([blob], 'test-export.json', { type: 'application/json' }))
    form.append('config_id', config.id)
    form.append('connection_id', conn.id)

    const importRes = await app.request('/api/v1/imports', { method: 'POST', body: form })
    expect(importRes.status).toBe(201)
    const session = await json<{ id: string; ticket_count: number }>(importRes)
    expect(session.ticket_count).toBe(1)

    // ── 8. Metrics are available ──────────────────────────────────────────────
    const summaryRes = await app.request(`/api/v1/metrics/${session.id}/summary`)
    expect(summaryRes.status).toBe(200)
    const summary = await json<{
      completed_ticket_count: number
      cycle_time: { sample_size: number; median_days: number | null }
    }>(summaryRes)

    expect(summary.completed_ticket_count).toBe(1)
    expect(summary.cycle_time.sample_size).toBe(1)
    expect(summary.cycle_time.median_days).toBe(2) // Todo→Done = 2 days
  })
})
