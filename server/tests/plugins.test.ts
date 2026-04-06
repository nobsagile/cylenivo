import { describe, it, expect, beforeAll, afterEach, mock, spyOn } from 'bun:test'
import { join } from 'path'
import { mkdir, writeFile, rm } from 'fs/promises'
import { app } from '../src/app.js'

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

describe('DELETE /api/v1/plugins/:source_type', () => {
  const tmpPlugin = join(FIXTURE_PLUGINS_DIR, 'tmp-plugin')

  afterEach(async () => {
    await rm(tmpPlugin, { recursive: true, force: true })
  })

  it('removes plugin dir and returns 200', async () => {
    await mkdir(tmpPlugin, { recursive: true })
    await writeFile(join(tmpPlugin, 'manifest.json'), JSON.stringify({
      source_type: 'tmp-plugin', name: 'Tmp Plugin', credentials: [], fetch_options: [],
    }))

    const res = await app.request('/api/v1/plugins/tmp-plugin', { method: 'DELETE' })
    expect(res.status).toBe(200)
    const body = await res.json() as Record<string, unknown>
    expect(body.data).toBeNull()
  })

  it('returns 400 when plugin dir does not exist', async () => {
    const res = await app.request('/api/v1/plugins/nonexistent-plugin', { method: 'DELETE' })
    expect(res.status).toBe(400)
  })
})

// sha256 of server/tests/fixtures/plugins/test-plugin/index.js
const TEST_PLUGIN_SHA256 = 'bd997638cfe9ea576ac27d3d2b8b9bda98793f0ea4969bfddc696a2708a3d07d'

const fixtureManifest = await Bun.file(join(FIXTURE_PLUGINS_DIR, 'test-plugin/manifest.json')).text()
const fixtureIndex = await Bun.file(join(FIXTURE_PLUGINS_DIR, 'test-plugin/index.js')).text()

function makeFetch(registry: unknown[]) {
  return async (url: string | URL | Request): Promise<Response> => {
    const u = String(url)
    if (u.includes('registry.json')) return new Response(JSON.stringify(registry), { status: 200 })
    if (u.includes('manifest.json')) return new Response(fixtureManifest, { status: 200 })
    if (u.includes('index.js')) return new Response(fixtureIndex, { status: 200 })
    return new Response('not found', { status: 404 })
  }
}

describe('GET /api/v1/plugins/registry', () => {
  const fakeRegistry = [
    { id: 'test-plugin', name: 'Test Plugin', description: 'A test plugin', path: 'plugins/test-plugin', sha256: TEST_PLUGIN_SHA256 },
    { id: 'other-plugin', name: 'Other Plugin', description: 'Another plugin', path: 'plugins/other-plugin', sha256: 'def456' },
  ]

  beforeAll(() => {
    globalThis.fetch = makeFetch(fakeRegistry)
  })

  it('returns registry with installed flag for known plugin', async () => {
    const res = await app.request('/api/v1/plugins/registry')
    expect(res.status).toBe(200)
    const body = await res.json() as Record<string, unknown>
    const data = body.data as Array<Record<string, unknown>>
    expect(data).toHaveLength(2)
    const testPlugin = data.find((e) => e.id === 'test-plugin')
    expect(testPlugin?.installed).toBe(true)
    const otherPlugin = data.find((e) => e.id === 'other-plugin')
    expect(otherPlugin?.installed).toBe(false)
    expect(otherPlugin?.update_available).toBe(false)
  })

  it('returns 502 when GitHub is unreachable', async () => {
    const original = globalThis.fetch
    globalThis.fetch = async () => { throw new Error('Network error') }
    const res = await app.request('/api/v1/plugins/registry')
    expect(res.status).toBe(502)
    globalThis.fetch = original
  })
})

describe('POST /api/v1/plugins/registry/:id/install', () => {
  const installDir = join(FIXTURE_PLUGINS_DIR, 'installed-test-plugin')
  const fakeRegistry = [
    { id: 'installed-test-plugin', name: 'Test Plugin', description: 'A test plugin', path: 'plugins/test-plugin', sha256: TEST_PLUGIN_SHA256 },
  ]

  afterEach(async () => {
    await rm(installDir, { recursive: true, force: true })
  })

  it('downloads and saves plugin files', async () => {
    globalThis.fetch = makeFetch(fakeRegistry)
    const res = await app.request('/api/v1/plugins/registry/installed-test-plugin/install', { method: 'POST' })
    expect(res.status).toBe(200)
    const body = await res.json() as Record<string, unknown>
    expect((body.data as Record<string, unknown>).source_type).toBe('test-plugin')
    // files written to PLUGINS_DIR/test-plugin (source_type from manifest)
    const savedIndex = await Bun.file(join(FIXTURE_PLUGINS_DIR, 'test-plugin/index.js')).text()
    expect(savedIndex).toBeTruthy()
  })

  it('returns 400 when sha256 does not match', async () => {
    const badRegistry = [{ ...fakeRegistry[0], sha256: 'badhash' }]
    globalThis.fetch = makeFetch(badRegistry)
    const res = await app.request('/api/v1/plugins/registry/installed-test-plugin/install', { method: 'POST' })
    expect(res.status).toBe(400)
    const body = await res.json() as Record<string, unknown>
    expect(String(body.error)).toContain('SHA256')
  })

  it('returns 400 for unknown plugin id', async () => {
    globalThis.fetch = makeFetch(fakeRegistry)
    const res = await app.request('/api/v1/plugins/registry/nonexistent/install', { method: 'POST' })
    expect(res.status).toBe(400)
  })
})

describe('POST /api/v1/plugins/install-url', () => {
  const urlInstallDir = join(FIXTURE_PLUGINS_DIR, 'test-plugin')

  it('installs plugin from GitHub URL', async () => {
    globalThis.fetch = makeFetch([])
    const res = await app.request('/api/v1/plugins/install-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ github_url: 'https://github.com/nobsagile/cylenivo-plugins' }),
    })
    expect(res.status).toBe(200)
    const body = await res.json() as Record<string, unknown>
    expect((body.data as Record<string, unknown>).source_type).toBe('test-plugin')
  })

  it('returns 400 for invalid GitHub URL', async () => {
    const res = await app.request('/api/v1/plugins/install-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ github_url: 'not-a-url' }),
    })
    expect(res.status).toBe(400)
  })
})
