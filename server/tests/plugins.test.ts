import { describe, it, expect, beforeAll } from 'bun:test'
import { join } from 'path'
import { app } from '../src/index.js'

const FIXTURE_PLUGINS_DIR = join(import.meta.dir, 'fixtures/plugins')

beforeAll(() => {
  process.env.PLUGINS_DIR = FIXTURE_PLUGINS_DIR
})

describe('pluginRunner', () => {
  it('loads a valid plugin and calls test()', async () => {
    const { loadPlugin } = await import('../src/lib/pluginRunner.js')
    const plugin = await loadPlugin('test-plugin')
    const result = await plugin.test({ api_key: 'secret' })
    expect(result.ok).toBe(true)
    expect(result.display_name).toBe('Test User')
  })

  it('throws when plugin not found', async () => {
    const { loadPlugin } = await import('../src/lib/pluginRunner.js')
    expect(loadPlugin('nonexistent-plugin')).rejects.toThrow("Plugin 'nonexistent-plugin'")
  })

  it('throws when test() called with missing credentials', async () => {
    const { loadPlugin } = await import('../src/lib/pluginRunner.js')
    const plugin = await loadPlugin('test-plugin')
    expect(plugin.test({})).rejects.toThrow('Missing api_key')
  })

  it('calls fetch() and receives ImportFile with progress', async () => {
    const { loadPlugin } = await import('../src/lib/pluginRunner.js')
    const plugin = await loadPlugin('test-plugin')
    const progress: { current: number; total: number; key: string }[] = []
    const result = await plugin.fetch(
      { api_key: 'secret' },
      { project: 'MYPROJECT' },
      (current, total, key) => { progress.push({ current, total, key }) },
    ) as Record<string, unknown>

    expect(result.source_type).toBe('test-plugin')
    expect(result.project_key).toBe('MYPROJECT')
    expect((result.tickets as unknown[]).length).toBe(1)
    expect(progress).toEqual([
      { current: 1, total: 2, key: 'TEST-1' },
      { current: 2, total: 2, key: 'TEST-2' },
    ])
  })
})

describe('scanPlugins', () => {
  it('returns installed plugins with manifest data', async () => {
    const { scanPlugins } = await import('../src/lib/pluginScanner.js')
    const result = await scanPlugins()
    expect(result.length).toBe(1)
    expect(result[0].source_type).toBe('test-plugin')
    expect(result[0].name).toBe('Test Plugin')
    expect(result[0].credentials).toHaveLength(1)
    expect(result[0].fetch_options).toHaveLength(1)
  })

  it('returns empty array when plugins dir does not exist', async () => {
    const original = process.env.PLUGINS_DIR
    process.env.PLUGINS_DIR = '/nonexistent/path'
    const { scanPlugins } = await import('../src/lib/pluginScanner.js')
    const result = await scanPlugins()
    expect(result).toEqual([])
    process.env.PLUGINS_DIR = original
  })
})

describe('GET /api/v1/plugins', () => {
  it('returns installed plugins', async () => {
    const res = await app.request('/api/v1/plugins')
    expect(res.status).toBe(200)
    const body = await res.json() as Record<string, unknown>
    const data = body.data as Record<string, unknown>[]
    expect(data.length).toBe(1)
    expect(data[0].source_type).toBe('test-plugin')
  })
})

describe('POST /api/v1/plugins/:source_type/test', () => {
  it('returns ok for valid credentials', async () => {
    const res = await app.request('/api/v1/plugins/test-plugin/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credentials: { api_key: 'secret' } }),
    })
    expect(res.status).toBe(200)
    const body = await res.json() as Record<string, unknown>
    expect((body.data as Record<string, unknown>).ok).toBe(true)
  })

  it('returns 400 for invalid credentials', async () => {
    const res = await app.request('/api/v1/plugins/test-plugin/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credentials: {} }),
    })
    expect(res.status).toBe(400)
    const body = await res.json() as Record<string, unknown>
    expect(body.error).toBeTruthy()
  })

  it('returns 400 for unknown plugin', async () => {
    const res = await app.request('/api/v1/plugins/nonexistent/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credentials: {} }),
    })
    expect(res.status).toBe(400)
  })
})
