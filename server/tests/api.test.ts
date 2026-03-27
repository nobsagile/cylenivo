import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../src/db/schema.js'

const FIXTURE = JSON.parse(
  readFileSync(path.join(import.meta.dirname, 'fixtures/sample_jira_export.json'), 'utf-8')
)

const BASE_CONFIG = {
  name: 'Test Team',
  source_type: 'jira',
  base_url: 'https://test.atlassian.net',
  status_order: ['Backlog', 'Up Next', 'Ready for Development', 'Development', 'Customer Feedback'],
  cycle_time_start_status: 'Ready for Development',
  cycle_time_end_status: 'Customer Feedback',
  lead_time_start_status: null,
}

beforeAll(async () => {
  await migrate()
})

beforeEach(async () => {
  await db.delete(ticketTransitions)
  await db.delete(tickets)
  await db.delete(llmInsights)
  await db.delete(importSessions)
  await db.delete(projectConfigs)
})

// ─── helpers ──────────────────────────────────────────────────────────────────

async function createConfig(overrides: Record<string, unknown> = {}) {
  const res = await app.request('/api/v1/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...BASE_CONFIG, ...overrides }),
  })
  const json = await res.json() as { data: { id: string; name: string } }
  return json.data
}

async function doImport(configId: string, data = FIXTURE) {
  const form = new FormData()
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  form.append('file', blob, 'test.json')
  form.append('config_id', configId)
  const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
  const json = await res.json() as { data: { id: string } }
  return json.data.id
}

// ─── configs ──────────────────────────────────────────────────────────────────

describe('configs', () => {
  it('creates a config and returns 201', async () => {
    const res = await app.request('/api/v1/configs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(BASE_CONFIG),
    })
    expect(res.status).toBe(201)
    const { data } = await res.json() as { data: { id: string; name: string } }
    expect(data.id).toBeTruthy()
    expect(data.name).toBe('Test Team')
    expect(data.status_order).toEqual(BASE_CONFIG.status_order)
  })

  it('returns 422 for missing required field', async () => {
    const res = await app.request('/api/v1/configs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'X', source_type: 'jira', status_order: [] }),
    })
    expect(res.status).toBe(422)
  })

  it('lists configs', async () => {
    await createConfig()
    const res = await app.request('/api/v1/configs')
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: unknown[] }
    expect(data.length).toBe(1)
  })

  it('gets single config', async () => {
    const cfg = await createConfig()
    const res = await app.request(`/api/v1/configs/${cfg.id}`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { name: string } }
    expect(data.name).toBe('Test Team')
  })

  it('returns 404 for unknown config', async () => {
    const res = await app.request('/api/v1/configs/nonexistent-id')
    expect(res.status).toBe(404)
  })

  it('updates a config', async () => {
    const cfg = await createConfig()
    const res = await app.request(`/api/v1/configs/${cfg.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Updated Team' }),
    })
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { name: string } }
    expect(data.name).toBe('Updated Team')
  })

  it('blocks deleting a config that has imports', async () => {
    const cfg = await createConfig()
    await doImport(cfg.id)
    const res = await app.request(`/api/v1/configs/${cfg.id}`, { method: 'DELETE' })
    expect(res.status).toBe(409)
  })

  it('deletes a config with no imports', async () => {
    const cfg = await createConfig()
    const res = await app.request(`/api/v1/configs/${cfg.id}`, { method: 'DELETE' })
    expect(res.status).toBe(204)
  })
})

// ─── imports ──────────────────────────────────────────────────────────────────

describe('imports', () => {
  it('uploads an import file and returns 201 with ticket_count', async () => {
    const cfg = await createConfig()
    const form = new FormData()
    form.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test.json')
    form.append('config_id', cfg.id)
    const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
    expect(res.status).toBe(201)
    const { data } = await res.json() as { data: { ticket_count: number; config_name: string } }
    expect(data.ticket_count).toBe(15)
    expect(data.config_name).toBe('Test Team')
  })

  it('returns 404 for unknown config_id', async () => {
    const form = new FormData()
    form.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test.json')
    form.append('config_id', 'nonexistent-id')
    const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
    expect(res.status).toBe(404)
  })

  it('returns 400 for invalid JSON', async () => {
    const cfg = await createConfig()
    const form = new FormData()
    form.append('file', new Blob([Buffer.from('not json at all')], { type: 'application/json' }), 'bad.json')
    form.append('config_id', cfg.id)
    const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
    expect(res.status).toBe(400)
  })

  it('deletes an import', async () => {
    const cfg = await createConfig()
    const importId = await doImport(cfg.id)
    const res = await app.request(`/api/v1/imports/${importId}`, { method: 'DELETE' })
    expect(res.status).toBe(204)
  })

  it('returns statuses from transitions', async () => {
    const cfg = await createConfig()
    const importId = await doImport(cfg.id)
    const res = await app.request(`/api/v1/imports/${importId}/statuses`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: string[] }
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })

  it('returns empty statuses for ticket with no transitions', async () => {
    const cfg = await createConfig()
    const data = {
      source_type: 'jira',
      project_key: 'TEST',
      exported_at: '2026-01-01T00:00:00Z',
      tickets: [{
        external_id: 'TEST-1',
        title: 'No transitions',
        ticket_type: 'story',
        created_at: '2026-01-01T00:00:00Z',
        transitions: [],
      }],
    }
    const importId = await doImport(cfg.id, data)
    const res = await app.request(`/api/v1/imports/${importId}/statuses`)
    expect(res.status).toBe(200)
    const { data: statuses } = await res.json() as { data: string[] }
    expect(statuses).toEqual([])
  })
})

// ─── metrics ──────────────────────────────────────────────────────────────────

describe('metrics', () => {
  it('summary returns all required fields', async () => {
    const cfg = await createConfig()
    const importId = await doImport(cfg.id)
    const res = await app.request(`/api/v1/metrics/${importId}/summary`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: Record<string, unknown> }
    expect(data).toHaveProperty('cycle_time')
    expect(data).toHaveProperty('lead_time')
    expect(data).toHaveProperty('time_in_status')
    expect(data).toHaveProperty('throughput_per_week')
    expect(data).toHaveProperty('ticket_count', 15)
  })

  it('summary returns warning for small sample', async () => {
    const cfg = await createConfig()
    const small = { ...FIXTURE, tickets: FIXTURE.tickets.slice(0, 5) }
    const importId = await doImport(cfg.id, small)
    const res = await app.request(`/api/v1/metrics/${importId}/summary`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { cycle_time: { warning: string | null } } }
    expect(data.cycle_time.warning).not.toBeNull()
  })

  it('summary returns 404 for unknown import', async () => {
    const res = await app.request('/api/v1/metrics/nonexistent/summary')
    expect(res.status).toBe(404)
  })

  it('cycle-times returns tickets array', async () => {
    const cfg = await createConfig()
    const importId = await doImport(cfg.id)
    const res = await app.request(`/api/v1/metrics/${importId}/cycle-times`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { tickets: unknown[] } }
    expect(Array.isArray(data.tickets)).toBe(true)
  })

  it('lead-times returns values array of numbers', async () => {
    const cfg = await createConfig()
    const importId = await doImport(cfg.id)
    const res = await app.request(`/api/v1/metrics/${importId}/lead-times`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { values: unknown[] } }
    expect(Array.isArray(data.values)).toBe(true)
    for (const v of data.values) expect(typeof v).toBe('number')
  })

  it('time-in-status returns statuses and tickets', async () => {
    const cfg = await createConfig()
    const importId = await doImport(cfg.id)
    const res = await app.request(`/api/v1/metrics/${importId}/time-in-status`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { statuses: string[]; tickets: unknown[] } }
    expect(Array.isArray(data.statuses)).toBe(true)
    expect(Array.isArray(data.tickets)).toBe(true)
  })
})

// ─── tickets ──────────────────────────────────────────────────────────────────

describe('tickets', () => {
  it('lists tickets paginated', async () => {
    const cfg = await createConfig()
    const importId = await doImport(cfg.id)
    const res = await app.request(`/api/v1/tickets?import_id=${importId}&page=1&limit=10`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { tickets: unknown[]; total: number } }
    expect(data.tickets.length).toBe(10)
    expect(data.total).toBe(15)
  })

  it('filters tickets by type', async () => {
    const cfg = await createConfig()
    const importId = await doImport(cfg.id)
    const res = await app.request(`/api/v1/tickets?import_id=${importId}&type=story`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { tickets: { ticket_type: string }[] } }
    for (const t of data.tickets) expect(t.ticket_type).toBe('story')
  })

  it('gets a single ticket with transitions', async () => {
    const cfg = await createConfig()
    const importId = await doImport(cfg.id)
    const listRes = await app.request(`/api/v1/tickets?import_id=${importId}&limit=1`)
    const { data: list } = await listRes.json() as { data: { tickets: { id: string }[] } }
    const ticketId = list.tickets[0].id

    const res = await app.request(`/api/v1/tickets/${ticketId}`)
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { transitions: unknown[] } }
    expect(Array.isArray(data.transitions)).toBe(true)
  })

  it('returns 404 for unknown ticket', async () => {
    const res = await app.request('/api/v1/tickets/nonexistent-id')
    expect(res.status).toBe(404)
  })
})

// ─── llm ──────────────────────────────────────────────────────────────────────

describe('llm', () => {
  it('status always returns 200 with available field', async () => {
    const res = await app.request('/api/v1/llm/status')
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { available: boolean } }
    expect(typeof data.available).toBe('boolean')
  })

  it('insights returns 404 when no analysis exists', async () => {
    const res = await app.request('/api/v1/llm/insights/nonexistent-id')
    expect(res.status).toBe(404)
  })
})
