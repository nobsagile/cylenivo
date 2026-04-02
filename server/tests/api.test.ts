import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { readFileSync } from 'fs'
import path from 'path'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights, llmConfig, sourceConnections } from '../src/db/schema.js'

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
  await db.delete(llmConfig)
  await db.delete(sourceConnections)
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

  it('returns 404 for update on unknown config', async () => {
    const res = await app.request('/api/v1/configs/nonexistent', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'x' }),
    })
    expect(res.status).toBe(404)
  })

  it('returns 422 for invalid cycle_time_mode on create', async () => {
    const res = await app.request('/api/v1/configs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...BASE_CONFIG, cycle_time_mode: 'invalid_mode' }),
    })
    expect(res.status).toBe(422)
  })

  it('returns 422 for invalid cycle_time_mode on update', async () => {
    const cfg = await createConfig()
    const res = await app.request(`/api/v1/configs/${cfg.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cycle_time_mode: 'bad_mode' }),
    })
    expect(res.status).toBe(422)
  })

  it('returns 422 for empty name on update', async () => {
    const cfg = await createConfig()
    const res = await app.request(`/api/v1/configs/${cfg.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }),
    })
    expect(res.status).toBe(422)
  })

  it('returns 404 for delete on unknown config', async () => {
    const res = await app.request('/api/v1/configs/nonexistent', { method: 'DELETE' })
    expect(res.status).toBe(404)
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

  it('returns 400 when no file is provided', async () => {
    const cfg = await createConfig()
    const form = new FormData()
    form.append('config_id', cfg.id)
    const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
    expect(res.status).toBe(400)
  })

  it('returns 422 for empty tickets array', async () => {
    const cfg = await createConfig()
    const form = new FormData()
    form.append('file', new Blob([JSON.stringify({ source_type: 'jira', project_key: 'X', exported_at: '2026-01-01T00:00:00Z', tickets: [] })], { type: 'application/json' }), 'empty.json')
    form.append('config_id', cfg.id)
    const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
    expect(res.status).toBe(422)
  })

  it('returns 422 for unsupported source_type', async () => {
    const cfg = await createConfig()
    const form = new FormData()
    form.append('file', new Blob([JSON.stringify({ source_type: 'linear', project_key: 'X', exported_at: '2026-01-01T00:00:00Z', tickets: [{ external_id: 'X-1', title: 't', ticket_type: 'story', created_at: '2026-01-01T00:00:00Z', transitions: [] }] })], { type: 'application/json' }), 'bad.json')
    form.append('config_id', cfg.id)
    const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
    expect(res.status).toBe(422)
  })

  it('returns 422 for ticket missing external_id', async () => {
    const cfg = await createConfig()
    const form = new FormData()
    form.append('file', new Blob([JSON.stringify({ source_type: 'jira', project_key: 'X', exported_at: '2026-01-01T00:00:00Z', tickets: [{ title: 'no id', ticket_type: 'story', created_at: '2026-01-01T00:00:00Z', transitions: [] }] })], { type: 'application/json' }), 'bad.json')
    form.append('config_id', cfg.id)
    const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
    expect(res.status).toBe(422)
  })

  it('returns 404 for PATCH on unknown import', async () => {
    const res = await app.request('/api/v1/imports/nonexistent', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'x' }),
    })
    expect(res.status).toBe(404)
  })

  it('returns 404 for DELETE on unknown import', async () => {
    const res = await app.request('/api/v1/imports/nonexistent', { method: 'DELETE' })
    expect(res.status).toBe(404)
  })

  it('returns 404 for GET single unknown import', async () => {
    const res = await app.request('/api/v1/imports/nonexistent')
    expect(res.status).toBe(404)
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

  it('cycle-times returns 404 for unknown import', async () => {
    const res = await app.request('/api/v1/metrics/nonexistent/cycle-times')
    expect(res.status).toBe(404)
  })

  it('lead-times returns 404 for unknown import', async () => {
    const res = await app.request('/api/v1/metrics/nonexistent/lead-times')
    expect(res.status).toBe(404)
  })

  it('time-in-status returns 404 for unknown import', async () => {
    const res = await app.request('/api/v1/metrics/nonexistent/time-in-status')
    expect(res.status).toBe(404)
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
  it('status returns configured=false when no config saved', async () => {
    const res = await app.request('/api/v1/llm/status')
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: { configured: boolean; available: boolean } }
    expect(data.configured).toBe(false)
    expect(data.available).toBe(false)
  })

  it('insights returns 404 when no analysis exists', async () => {
    const res = await app.request('/api/v1/llm/insights/nonexistent-id')
    expect(res.status).toBe(404)
  })
})

// ─── llm-config ───────────────────────────────────────────────────────────────

describe('llm-config', () => {
  it('GET returns null when not configured', async () => {
    const res = await app.request('/api/v1/llm-config')
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: null }
    expect(data).toBeNull()
  })

  it('PUT saves config and GET returns it', async () => {
    const putRes = await app.request('/api/v1/llm-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'ollama',
        base_url: 'http://localhost:11434',
        model: 'qwen3:14b',
        system_prompt: 'You are a flow expert.',
      }),
    })
    expect(putRes.status).toBe(200)
    const { data: saved } = await putRes.json() as { data: any }
    expect(saved.provider).toBe('ollama')
    expect(saved.model).toBe('qwen3:14b')
    expect(saved.key_set).toBe(false)

    const getRes = await app.request('/api/v1/llm-config')
    const { data: loaded } = await getRes.json() as { data: any }
    expect(loaded.provider).toBe('ollama')
    expect(loaded.model).toBe('qwen3:14b')
  })

  it('PUT with api_key: key_set=true, key not returned', async () => {
    await app.request('/api/v1/llm-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'openai',
        model: 'gpt-4o',
        api_key: 'sk-secret',
        system_prompt: 'Expert.',
      }),
    })
    const res = await app.request('/api/v1/llm-config')
    const { data } = await res.json() as { data: any }
    expect(data.key_set).toBe(true)
    expect(data.api_key).toBeUndefined()
  })

  it('PUT without api_key preserves existing key', async () => {
    await app.request('/api/v1/llm-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: 'openai', model: 'gpt-4o', api_key: 'sk-secret', system_prompt: 'x' }),
    })
    // Update model without sending api_key
    await app.request('/api/v1/llm-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: 'openai', model: 'gpt-4o-mini', system_prompt: 'x' }),
    })
    const res = await app.request('/api/v1/llm-config')
    const { data } = await res.json() as { data: any }
    expect(data.model).toBe('gpt-4o-mini')
    expect(data.key_set).toBe(true)  // key preserved
  })

  it('DELETE removes config', async () => {
    await app.request('/api/v1/llm-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: 'ollama', model: 'qwen3:14b', system_prompt: 'x' }),
    })
    await app.request('/api/v1/llm-config', { method: 'DELETE' })
    const res = await app.request('/api/v1/llm-config')
    const { data } = await res.json() as { data: null }
    expect(data).toBeNull()
  })
})

// ─── connections ──────────────────────────────────────────────────────────────

const BASE_CONN = {
  name: 'Test Jira',
  source_type: 'jira',
  base_url: 'https://test.atlassian.net',
  email: 'user@test.com',
  api_token: 'secret-token-123',
}

async function createConnection(overrides: Record<string, unknown> = {}) {
  const res = await app.request('/api/v1/connections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...BASE_CONN, ...overrides }),
  })
  const json = await res.json() as { data: Record<string, unknown> }
  return { res, data: json.data }
}

describe('connections', () => {
  it('creates a connection and returns 201', async () => {
    const { res, data } = await createConnection()
    expect(res.status).toBe(201)
    expect(data.name).toBe('Test Jira')
    expect(data.source_type).toBe('jira')
    expect(data.base_url).toBe('https://test.atlassian.net')
    expect(data.email).toBe('user@test.com')
  })

  it('never exposes api_token', async () => {
    const { data } = await createConnection()
    expect(data).not.toHaveProperty('api_token')
  })

  it('strips trailing slash from base_url', async () => {
    const { data } = await createConnection({ base_url: 'https://test.atlassian.net/' })
    expect(data.base_url).toBe('https://test.atlassian.net')
  })

  it('stores and returns project_key and issue_types', async () => {
    const { data } = await createConnection({
      project_key: 'PROJ',
      issue_types: ['Story', 'Bug'],
      resolved_from: '2026-01-01',
      resolved_to: '2026-03-31',
    })
    expect(data.project_key).toBe('PROJ')
    expect(data.issue_types).toEqual(['Story', 'Bug'])
    expect(data.resolved_from).toBe('2026-01-01')
    expect(data.resolved_to).toBe('2026-03-31')
  })

  it('returns null for unset data source fields', async () => {
    const { data } = await createConnection()
    expect(data.project_key).toBeNull()
    expect(data.issue_types).toBeNull()
    expect(data.resolved_from).toBeNull()
    expect(data.resolved_to).toBeNull()
  })

  it('lists connections', async () => {
    await createConnection({ name: 'A' })
    await createConnection({ name: 'B' })
    const res = await app.request('/api/v1/connections')
    const { data } = await res.json() as { data: unknown[] }
    expect(data.length).toBe(2)
  })

  it('updates connection with new fields', async () => {
    const { data: created } = await createConnection()
    const res = await app.request(`/api/v1/connections/${created.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_key: 'NEW', issue_types: ['Epic'] }),
    })
    const { data } = await res.json() as { data: Record<string, unknown> }
    expect(data.project_key).toBe('NEW')
    expect(data.issue_types).toEqual(['Epic'])
  })

  it('returns 404 for update on nonexistent connection', async () => {
    const res = await app.request('/api/v1/connections/nonexistent', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'x' }),
    })
    expect(res.status).toBe(404)
  })

  it('deletes a connection', async () => {
    const { data } = await createConnection()
    const res = await app.request(`/api/v1/connections/${data.id}`, { method: 'DELETE' })
    expect(res.status).toBe(204)
    const list = await app.request('/api/v1/connections')
    const { data: remaining } = await list.json() as { data: unknown[] }
    expect(remaining.length).toBe(0)
  })

  it('returns 422 when required field is missing', async () => {
    const res = await app.request('/api/v1/connections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source_type: 'jira' }),
    })
    expect(res.status).toBe(422)
  })

  // ─── duplicate ─────────────────────────────────────────────────────────────

  it('duplicates a connection', async () => {
    const { data: original } = await createConnection({
      project_key: 'ORIG',
      issue_types: ['Story'],
    })
    const res = await app.request(`/api/v1/connections/${original.id}/duplicate`, { method: 'POST' })
    expect(res.status).toBe(201)
    const { data: dup } = await res.json() as { data: Record<string, unknown> }
    expect(dup.id).not.toBe(original.id)
    expect(dup.name).toBe('Test Jira (copy)')
    expect(dup.base_url).toBe(original.base_url)
    expect(dup.project_key).toBe('ORIG')
    expect(dup.issue_types).toEqual(['Story'])
  })

  it('returns 404 when duplicating nonexistent connection', async () => {
    const res = await app.request('/api/v1/connections/nonexistent/duplicate', { method: 'POST' })
    expect(res.status).toBe(404)
  })

  it('returns 404 for DELETE on nonexistent connection', async () => {
    const res = await app.request('/api/v1/connections/nonexistent', { method: 'DELETE' })
    expect(res.status).toBe(404)
  })

  it('returns 404 for test on nonexistent connection', async () => {
    const res = await app.request('/api/v1/connections/nonexistent/test', { method: 'POST' })
    expect(res.status).toBe(404)
  })

  it('returns 404 for fetch on nonexistent connection', async () => {
    const res = await app.request('/api/v1/connections/nonexistent/fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project: 'PROJ' }),
    })
    expect(res.status).toBe(404)
  })

  // ─── fetch param merge ─────────────────────────────────────────────────────

  it('returns 422 when fetch has no project in body or stored', async () => {
    const { data } = await createConnection()
    const res = await app.request(`/api/v1/connections/${data.id}/fetch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
  })

  // ─── connection_id on imports ──────────────────────────────────────────

  it('stores connection_id on import session', async () => {
    const config = await createConfig()
    const { data: conn } = await createConnection()
    const form = new FormData()
    const blob = new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' })
    form.append('file', blob, 'test.json')
    form.append('config_id', config.id)
    form.append('connection_id', conn.id as string)
    const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
    expect(res.status).toBe(201)
    const { data } = await res.json() as { data: Record<string, unknown> }
    expect(data.connection_id).toBe(conn.id)
  })

  it('GET /:id/datasets returns datasets for connection', async () => {
    const config = await createConfig()
    const { data: conn } = await createConnection()
    // Import with connection_id
    const form = new FormData()
    const blob = new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' })
    form.append('file', blob, 'test.json')
    form.append('config_id', config.id)
    form.append('connection_id', conn.id as string)
    await app.request('/api/v1/imports', { method: 'POST', body: form })
    // Import without connection_id
    const form2 = new FormData()
    form2.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test2.json')
    form2.append('config_id', config.id)
    await app.request('/api/v1/imports', { method: 'POST', body: form2 })

    const res = await app.request(`/api/v1/connections/${conn.id}/datasets`)
    const { data } = await res.json() as { data: unknown[] }
    expect(data.length).toBe(1) // Only the one with connection_id
  })
})
