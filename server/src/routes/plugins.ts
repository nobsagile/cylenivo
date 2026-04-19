import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { rm, readFile, mkdir, writeFile, access } from 'fs/promises'
import { join } from 'path'
import { createHash } from 'crypto'
import { loadPlugin, getPluginsDir, validateSourceType } from '../lib/pluginRunner.js'
import { scanPlugins } from '../lib/pluginScanner.js'
import { ok } from '../lib/response.js'

const REGISTRY_URL = 'https://raw.githubusercontent.com/nobsagile/cylenivo-plugins/main/registry.json'
const RAW_BASE = 'https://raw.githubusercontent.com/nobsagile/cylenivo-plugins/main'

const GITHUB_HEADERS = { 'User-Agent': 'cylenivo-app' }

async function downloadText(url: string): Promise<string> {
  const res = await fetch(url, { headers: GITHUB_HEADERS })
  if (!res.ok) throw new Error(`Download failed: ${url} (${res.status})`)
  return res.text()
}

async function installPlugin(pluginPath: string, expectedSha256: string | null): Promise<{ source_type: string; name: string }> {
  const manifestText = await downloadText(`${RAW_BASE}/${pluginPath}/manifest.json`)
  const indexText = await downloadText(`${RAW_BASE}/${pluginPath}/index.js`)

  if (expectedSha256 !== null) {
    const hash = createHash('sha256').update(indexText).digest('hex')
    if (hash !== expectedSha256) {
      throw new Error(`SHA256 mismatch — expected ${expectedSha256}, got ${hash}`)
    }
  }

  const manifest = JSON.parse(manifestText) as { source_type: string; name: string }
  if (!manifest.source_type) throw new Error('manifest.json missing source_type')
  validateSourceType(manifest.source_type)

  const destDir = join(getPluginsDir(), manifest.source_type)
  await mkdir(destDir, { recursive: true })
  await writeFile(join(destDir, 'manifest.json'), manifestText)
  await writeFile(join(destDir, 'index.js'), indexText)

  return manifest
}

const plugins = new Hono()

plugins.get('/', async (c) => {
  const manifests = await scanPlugins()
  return c.json(ok(manifests))
})

plugins.get('/registry', async (c) => {
  let entries: Array<{ id: string; name: string; description: string; path: string; sha256: string }>
  try {
    const raw = await fetch(REGISTRY_URL, { headers: GITHUB_HEADERS })
    if (!raw.ok) throw new Error(`GitHub returned ${raw.status}`)
    entries = await raw.json()
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Failed to fetch registry' }, 502)
  }
  const pluginsDir = getPluginsDir()

  const result = await Promise.all(entries.map(async (entry) => {
    const indexPath = join(pluginsDir, entry.id, 'index.js')
    let installed = false
    let update_available = false
    try {
      const content = await readFile(indexPath)
      installed = true
      const hash = createHash('sha256').update(content).digest('hex')
      update_available = hash !== entry.sha256
    } catch {
      // not installed
    }
    return { ...entry, installed, update_available }
  }))

  return c.json(ok(result))
})

plugins.post('/registry/:id/install', async (c) => {
  const id = c.req.param('id')
  try {
    // fetch registry to get path + sha256
    const regRes = await fetch(REGISTRY_URL, { headers: GITHUB_HEADERS })
    if (!regRes.ok) throw new Error(`Registry unavailable (${regRes.status})`)
    const entries = await regRes.json() as Array<{ id: string; path: string; sha256: string }>
    const entry = entries.find((e) => e.id === id)
    if (!entry) throw new Error(`Plugin '${id}' not found in registry`)

    const manifest = await installPlugin(entry.path, entry.sha256)
    return c.json(ok(manifest))
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Install failed' }, 400)
  }
})

plugins.post('/install-url', async (c) => {
  const body = await c.req.json() as { github_url: string; expected_sha256?: string }
  try {
    const raw = body.github_url?.trim()
    if (!raw) throw new Error('github_url is required')

    let parsed: URL
    try { parsed = new URL(raw) } catch { throw new Error('Invalid URL') }
    if (parsed.protocol !== 'https:') throw new Error('URL must use HTTPS')
    if (parsed.hostname !== 'github.com') throw new Error('URL must be on github.com')

    const m = parsed.pathname.match(/^\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/|$)/)
    if (!m) throw new Error('Invalid GitHub URL — expected https://github.com/user/repo')
    const repoPath = `${m[1]}/${m[2]}`

    const rawBase = `https://raw.githubusercontent.com/${repoPath}/main`
    const manifestText = await downloadText(`${rawBase}/manifest.json`)
    const indexText = await downloadText(`${rawBase}/index.js`)

    const sha256 = createHash('sha256').update(indexText).digest('hex')
    if (body.expected_sha256 && sha256 !== body.expected_sha256) {
      throw new Error(`SHA256 mismatch — expected ${body.expected_sha256}, got ${sha256}`)
    }

    const manifest = JSON.parse(manifestText) as { source_type: string; name: string }
    if (!manifest.source_type) throw new Error('manifest.json missing source_type')
    validateSourceType(manifest.source_type)

    const destDir = join(getPluginsDir(), manifest.source_type)
    await mkdir(destDir, { recursive: true })
    await writeFile(join(destDir, 'manifest.json'), manifestText)
    await writeFile(join(destDir, 'index.js'), indexText)

    return c.json(ok({ ...manifest, sha256 }))
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Install failed' }, 400)
  }
})

plugins.post('/:source_type/test', async (c) => {
  const sourceType = c.req.param('source_type')
  const body = await c.req.json()
  console.log(`[plugin:test] source_type=${sourceType}`)
  try {
    const plugin = await loadPlugin(sourceType)
    const result = await plugin.test(body.credentials ?? {})
    console.log(`[plugin:test] ok — display_name=${(result as Record<string, unknown>).display_name}`)
    return c.json(ok(result))
  } catch (e) {
    console.error(`[plugin:test] error — ${e instanceof Error ? e.message : e}`)
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Plugin error' }, 400)
  }
})

plugins.post('/:source_type/fetch', async (c) => {
  const sourceType = c.req.param('source_type')
  const body = await c.req.json()
  console.log(`[plugin:fetch] source_type=${sourceType} options=${JSON.stringify(body.options ?? body)}`)
  return streamSSE(c, async (stream) => {
    try {
      const plugin = await loadPlugin(sourceType)
      const result = await plugin.fetch(
        body.credentials ?? {},
        body.options ?? {},
        async (current, total, key) => {
          await stream.writeSSE({ data: JSON.stringify({ type: 'progress', current, total, key }) })
        },
      )
      const tickets = (result as Record<string, unknown>).tickets
      console.log(`[plugin:fetch] done — ${Array.isArray(tickets) ? tickets.length : '?'} tickets`)
      await stream.writeSSE({ data: JSON.stringify({ type: 'done', result }) })
    } catch (e) {
      console.error(`[plugin:fetch] error — ${e instanceof Error ? e.message : e}`)
      await stream.writeSSE({ data: JSON.stringify({ type: 'error', message: e instanceof Error ? e.message : 'Plugin error' }) })
    }
  })
})

plugins.delete('/:source_type', async (c) => {
  const sourceType = c.req.param('source_type')
  try { validateSourceType(sourceType) } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Invalid source_type' }, 400)
  }
  const pluginDir = join(getPluginsDir(), sourceType)
  try {
    await access(pluginDir)
  } catch {
    return c.json({ data: null, error: `Plugin '${sourceType}' is not installed` }, 400)
  }
  try {
    await rm(pluginDir, { recursive: true })
    return c.json(ok(null))
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Failed to remove plugin' }, 400)
  }
})

export default plugins
