/* eslint-disable @typescript-eslint/no-explicit-any -- assertions walk untyped JSON-RPC payloads */
/**
 * MCP server (`cylenivo-server --mcp`).
 *
 * Pins three things:
 * 1. Tools return the SAME numbers as the HTTP API — they share
 *    loadImportContext/computeAggregate/filterTickets, never their own math.
 * 2. Excluded tickets stay out of metrics here too (see excluded-consistency).
 * 3. The process speaks clean JSON-RPC on stdout: one stray console.log line
 *    and every MCP client drops the server.
 */
import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { readFileSync, mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../src/db/schema.js'
import { handleMessage, parseArgs, SUPPORTED_PROTOCOL_VERSIONS } from '../src/mcp/protocol.js'
import { TOOLS } from '../src/mcp/tools.js'
import { SERVER_INFO } from '../src/mcp/server.js'
import { defaultAppDbPath, isMcpMode, mcpLaunchSpec } from '../src/mcp/env.js'

const FIXTURE = JSON.parse(readFileSync(path.join(import.meta.dirname, 'fixtures/metrics-fixture.json'), 'utf-8'))
const SERVER_DIR = path.join(import.meta.dirname, '..')

beforeAll(async () => { await migrate() })
beforeEach(async () => {
  await db.delete(ticketTransitions)
  await db.delete(tickets)
  await db.delete(llmInsights)
  await db.delete(importSessions)
  await db.delete(projectConfigs)
})

async function importFixture(name = 'Team A'): Promise<string> {
  const cfg = await app.request('/api/v1/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, source_type: 'jira',
      status_order: ['Backlog', 'Ready', 'In Dev', 'Review', 'Done'],
      cycle_time_start_status: 'In Dev', cycle_time_end_status: 'Done',
    }),
  })
  const configId = ((await cfg.json()) as { data: { id: string } }).data.id
  const form = new FormData()
  form.append('file', new Blob([JSON.stringify(FIXTURE)], { type: 'application/json' }), 'test.json')
  form.append('config_id', configId)
  const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
  return ((await res.json()) as { data: { id: string } }).data.id
}

let nextId = 1
async function call(name: string, args: Record<string, unknown> = {}) {
  const res = await handleMessage(
    { jsonrpc: '2.0', id: nextId++, method: 'tools/call', params: { name, arguments: args } },
    TOOLS, SERVER_INFO,
  ) as { result: { content: { text: string }[]; isError?: boolean } }
  const text = res.result.content[0].text
  return { isError: res.result.isError === true, text, data: res.result.isError ? null : JSON.parse(text) }
}

async function summary(importId: string, query = '') {
  const res = await app.request(`/api/v1/metrics/${importId}/summary${query}`)
  return ((await res.json()) as { data: any }).data
}

describe('mcp protocol', () => {
  it('initialize echoes a supported protocol version, falls back to the newest otherwise', async () => {
    const ok = await handleMessage({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05' } }, TOOLS, SERVER_INFO) as any
    expect(ok.result.protocolVersion).toBe('2024-11-05')
    expect(ok.result.capabilities).toEqual({ tools: { listChanged: false } })
    const unknown = await handleMessage({ jsonrpc: '2.0', id: 2, method: 'initialize', params: { protocolVersion: '1999-01-01' } }, TOOLS, SERVER_INFO) as any
    expect(unknown.result.protocolVersion).toBe(SUPPORTED_PROTOCOL_VERSIONS[0])
  })

  it('notifications get no response', async () => {
    expect(await handleMessage({ jsonrpc: '2.0', method: 'notifications/initialized' }, TOOLS, SERVER_INFO)).toBeNull()
  })

  it('ping, unknown method, unknown tool, invalid request', async () => {
    expect(await handleMessage({ jsonrpc: '2.0', id: 1, method: 'ping' }, TOOLS, SERVER_INFO)).toEqual({ jsonrpc: '2.0', id: 1, result: {} })
    expect((await handleMessage({ jsonrpc: '2.0', id: 2, method: 'resources/list' }, TOOLS, SERVER_INFO) as any).error.code).toBe(-32601)
    expect((await handleMessage({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'drop_tables' } }, TOOLS, SERVER_INFO) as any).error.code).toBe(-32602)
    expect((await handleMessage([1, 2], TOOLS, SERVER_INFO) as any).error.code).toBe(-32600)
  })

  it('exposes exactly the five read-only tools', async () => {
    const res = await handleMessage({ jsonrpc: '2.0', id: 1, method: 'tools/list' }, TOOLS, SERVER_INFO) as any
    expect(res.result.tools.map((t: any) => t.name)).toEqual(['list_datasets', 'get_flow_metrics', 'get_rework', 'list_tickets', 'forecast'])
    for (const t of res.result.tools) expect(t.annotations.readOnlyHint).toBe(true)
  })

  it('parseArgs: coerces what small models send, rejects the rest', () => {
    const forecast = TOOLS.find(t => t.name === 'forecast')!
    expect(parseArgs(forecast, { mode: 'when', value: '20', dataset_id: null })).toEqual({ mode: 'when', value: 20 })
    expect(parseArgs(forecast, { mode: 'soon', value: 3 })).toBe('mode must be one of: when, how_many')
    expect(parseArgs(forecast, { mode: 'when' })).toBe('value is required')
    expect(parseArgs(forecast, { mode: 'when', value: 2.5 })).toBe('value must be an integer')
    const list = TOOLS.find(t => t.name === 'list_tickets')!
    expect(parseArgs(list, { include_excluded: 'true', limit: 0 })).toBe('limit must be ≥ 1')
    expect(parseArgs(list, { include_excluded: 'true' })).toEqual({ include_excluded: true })
  })
})

describe('mcp tools', () => {
  it('no datasets → friendly message, not a crash', async () => {
    expect((await call('list_datasets')).data.datasets).toEqual([])
    const r = await call('get_flow_metrics')
    expect(r.isError).toBe(true)
    expect(r.text).toContain('Import data in the Cylenivo app first')
  })

  it('list_datasets: newest first and marked default', async () => {
    const a = await importFixture('Team A')
    await new Promise(r => setTimeout(r, 5))
    const b = await importFixture('Team B')
    const { data } = await call('list_datasets')
    expect(data.datasets.map((d: any) => d.dataset_id)).toEqual([b, a])
    expect(data.datasets[0].default).toBe(true)
    expect(data.datasets[1].default).toBeUndefined()
    expect(data.datasets[0].config).toBe('Team B')
  })

  it('get_flow_metrics matches /summary (same pipeline)', async () => {
    const id = await importFixture()
    const s = await summary(id)
    const { data } = await call('get_flow_metrics', { dataset_id: id })
    expect(data.tickets_total).toBe(4)
    expect(data.tickets_completed).toBe(3)
    expect(data.tickets_completed).toBe(s.completed_ticket_count)
    expect(data.cycle_time.mean_days).toBe(s.cycle_time.mean_days)
    expect(data.cycle_time.median_days).toBe(s.cycle_time.median_days)
    expect(data.lead_time.mean_days).toBe(s.lead_time.mean_days)
    expect(data.throughput_tickets_per_week).toBe(s.throughput_per_week === null ? null : Math.round(s.throughput_per_week * 100) / 100)
    expect(data.cycle_time.warning).toContain('Insufficient data') // 3 < 10
    expect(data.definitions.cycle_time).toBe('from "In Dev" to "Done"')
    expect(data.definitions.lead_time).toBe('from ticket creation to "Done"')
  })

  it('omitting dataset_id uses the newest dataset', async () => {
    await importFixture('old')
    await new Promise(r => setTimeout(r, 5))
    const newest = await importFixture('new')
    expect((await call('get_flow_metrics')).data.dataset.dataset_id).toBe(newest)
  })

  it('filters behave like the API: last=N and from/to, never both', async () => {
    const id = await importFixture()
    const viaApi = await summary(id, '?last=2')
    const viaMcp = (await call('get_flow_metrics', { dataset_id: id, last: 2 })).data
    expect(viaMcp.tickets_completed).toBe(2)
    expect(viaMcp.cycle_time.mean_days).toBe(viaApi.cycle_time.mean_days)

    const both = await call('get_flow_metrics', { dataset_id: id, last: 2, from: '2024-01-01' })
    expect(both.isError).toBe(true)
    expect(both.text).toBe('last cannot be combined with from/to')
    expect((await call('get_flow_metrics', { dataset_id: id, from: '10.01.2024' })).text).toBe('from must be YYYY-MM-DD')
  })

  it('unknown dataset id → points the model to list_datasets', async () => {
    const r = await call('get_rework', { dataset_id: 'nope' })
    expect(r.isError).toBe(true)
    expect(r.text).toContain('list_datasets')
  })

  it('get_rework: TICK-3 is the one rework ticket', async () => {
    const id = await importFixture()
    const { data } = await call('get_rework', { dataset_id: id })
    expect(data.tickets_completed).toBe(3)
    expect(data.tickets_with_rework).toBe(1)
    expect(data.rework_pct).toBe(33)
    expect(data.top_backward_paths.length).toBeGreaterThan(0)
  })

  it('list_tickets: completed sorted by longest cycle time; in_progress has age', async () => {
    const id = await importFixture()
    const done = (await call('list_tickets', { dataset_id: id })).data
    expect(done.tickets.map((t: any) => t.key)).toEqual(['TICK-3', 'TICK-2', 'TICK-1'])
    expect(done.tickets[0].cycle_time_days).toBe(14)
    expect(done.tickets[0].rework_moves).toBeGreaterThan(0)

    const wip = (await call('list_tickets', { dataset_id: id, state: 'in_progress' })).data
    expect(wip.tickets.map((t: any) => t.key)).toEqual(['TICK-4'])
    expect(wip.tickets[0].age_days).toBeGreaterThan(0)
    expect(wip.tickets[0].cycle_time_days).toBeUndefined()

    expect((await call('list_tickets', { dataset_id: id, limit: 1 })).data.tickets_returned).toBe(1)
  })

  it('excluded tickets stay out of metrics and lists, unless asked for', async () => {
    const id = await importFixture()
    const list = await app.request(`/api/v1/tickets?import_id=${id}&limit=0`)
    const t3 = ((await list.json()) as any).data.tickets.find((t: any) => t.external_id === 'TICK-3')
    await app.request(`/api/v1/tickets/${t3.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ excluded: true, exclusion_reason: 'outlier' }),
    })

    const m = (await call('get_flow_metrics', { dataset_id: id })).data
    expect(m.tickets_completed).toBe(2)
    expect(m.tickets_excluded_by_user).toBe(1)
    expect(m.cycle_time.mean_days).toBe((await summary(id)).cycle_time.mean_days)
    expect((await call('get_rework', { dataset_id: id })).data.tickets_with_rework).toBe(0)

    const keys = (await call('list_tickets', { dataset_id: id })).data.tickets.map((t: any) => t.key)
    expect(keys).not.toContain('TICK-3')
    const withExcluded = (await call('list_tickets', { dataset_id: id, include_excluded: true })).data.tickets
    expect(withExcluded.find((t: any) => t.key === 'TICK-3')).toMatchObject({ excluded: true, exclusion_reason: 'outlier' })
  })

  it('forecast: when + how_many, plain interpretation', async () => {
    const id = await importFixture()
    const when = (await call('forecast', { dataset_id: id, mode: 'when', value: 3 })).data
    expect(when.weeks_85pct).toBeGreaterThanOrEqual(when.weeks_50pct)
    expect(when.interpretation).toContain('within')
    expect(when.basis.tickets_completed).toBe(3)
    const howMany = (await call('forecast', { dataset_id: id, mode: 'how_many', value: 4 })).data
    expect(howMany.tickets_85pct).toBeLessThanOrEqual(howMany.tickets_50pct)
  })

  it('no tool output contains connection or LLM secrets', async () => {
    const id = await importFixture()
    const outputs = await Promise.all([
      call('list_datasets'), call('get_flow_metrics', { dataset_id: id }), call('get_rework', { dataset_id: id }),
      call('list_tickets', { dataset_id: id, state: 'all' }), call('forecast', { dataset_id: id, mode: 'when', value: 2 }),
    ])
    for (const o of outputs) expect(o.text).not.toMatch(/api_token|api_key|credentials/)
  })
})

describe('mcp env', () => {
  it('detects --mcp', () => {
    expect(isMcpMode(['bun', 'index.ts', '--mcp'])).toBe(true)
    expect(isMcpMode(['bun', 'index.ts'])).toBe(false)
  })

  it('default DB path matches Tauri appDataDir per OS', () => {
    expect(defaultAppDbPath('darwin', {}, '/Users/x')).toBe('/Users/x/Library/Application Support/com.cylenivo.app/cylenivo.db')
    expect(defaultAppDbPath('linux', {}, '/home/x')).toBe('/home/x/.local/share/com.cylenivo.app/cylenivo.db')
    expect(defaultAppDbPath('linux', { XDG_DATA_HOME: '/data' }, '/home/x')).toBe('/data/com.cylenivo.app/cylenivo.db')
    expect(defaultAppDbPath('win32', { APPDATA: 'C:\\Users\\x\\AppData\\Roaming' }, 'C:\\Users\\x'))
      .toBe('C:\\Users\\x\\AppData\\Roaming\\com.cylenivo.app\\cylenivo.db')
    expect(defaultAppDbPath('win32', {}, 'C:\\Users\\x'))
      .toBe('C:\\Users\\x\\AppData\\Roaming\\com.cylenivo.app\\cylenivo.db')
  })
})

describe('mcp process (stdio)', () => {
  async function runMcp(dbPath: string, lines: object[]) {
    const proc = Bun.spawn(['bun', 'src/index.ts', '--mcp'], {
      cwd: SERVER_DIR,
      env: { ...process.env, DB_PATH: dbPath },
      stdin: 'pipe', stdout: 'pipe', stderr: 'pipe',
    })
    proc.stdin.write(lines.map(l => JSON.stringify(l)).join('\n') + '\n')
    proc.stdin.end()
    const out = await new Response(proc.stdout).text()
    await proc.exited
    return out.split('\n').filter(Boolean)
  }

  const HANDSHAKE = [
    { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '1' } } },
    { jsonrpc: '2.0', method: 'notifications/initialized' },
    { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'list_datasets', arguments: {} } },
  ]

  it('missing DB: answers on clean stdout with "no datasets"', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'cylenivo-mcp-'))
    try {
      const lines = await runMcp(path.join(dir, 'missing.db'), HANDSHAKE)
      expect(lines.length).toBe(2) // initialize + tools/call; the notification gets nothing
      const parsed = lines.map(l => JSON.parse(l)) // throws on any stray log line
      expect(parsed[0].result.serverInfo.name).toBe('cylenivo')
      expect(JSON.parse(parsed[1].result.content[0].text).datasets).toEqual([])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  }, 15000)

  it('existing DB: opened read-only, still answers', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'cylenivo-mcp-'))
    const dbPath = path.join(dir, 'cylenivo.db')
    try {
      const init = Bun.spawnSync(['bun', '-e', "const { migrate } = await import('./src/db/index.ts'); await migrate()"], {
        cwd: SERVER_DIR, env: { ...process.env, DB_PATH: dbPath },
      })
      expect(init.exitCode).toBe(0)
      const lines = await runMcp(dbPath, HANDSHAKE)
      const parsed = lines.map(l => JSON.parse(l))
      expect(JSON.parse(parsed[1].result.content[0].text).datasets).toEqual([])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  }, 15000)
})

describe('mcp launch spec (settings UI)', () => {
  it('installed app: just the binary + --mcp, no env when the DB is at the default path', () => {
    const exe = '/Applications/Cylenivo.app/Contents/MacOS/cylenivo-server'
    const spec = mcpLaunchSpec(exe, defaultAppDbPath(), '/x/index.ts')
    expect(spec).toMatchObject({ command: exe, args: ['--mcp'], env: null, warning: null })
  })

  it('dev (bun): runs the entry file and passes DB_PATH', () => {
    const spec = mcpLaunchSpec('/usr/local/bin/bun', '/repo/server/dev.db', '/repo/server/src/index.ts')
    expect(spec.args).toEqual(['/repo/server/src/index.ts', '--mcp'])
    // resolve() makes it absolute for the host (D:\\repo\\... on Windows)
    expect(spec.env).toEqual({ DB_PATH: path.resolve('/repo/server/dev.db') })
  })

  it('flags macOS App Translocation', () => {
    const spec = mcpLaunchSpec('/private/var/folders/x/T/AppTranslocation/ABC/d/Cylenivo.app/Contents/MacOS/cylenivo-server', defaultAppDbPath())
    expect(spec.warning).toBe('translocated')
  })

  it('GET /api/v1/mcp/setup', async () => {
    const res = await app.request('/api/v1/mcp/setup')
    expect(res.status).toBe(200)
    const { data } = await res.json() as { data: any }
    expect(data.args).toContain('--mcp')
  })
})
