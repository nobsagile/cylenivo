import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { rm, readFile } from 'fs/promises'
import { join } from 'path'
import { createHash } from 'crypto'
import { loadPlugin, getPluginsDir } from '../lib/pluginRunner.js'
import { scanPlugins } from '../lib/pluginScanner.js'
import { ok } from '../lib/response.js'

const REGISTRY_URL = 'https://raw.githubusercontent.com/nobsagile/cylenivo-plugins/main/registry.json'

const plugins = new Hono()

plugins.get('/', async (c) => {
  const manifests = await scanPlugins()
  return c.json(ok(manifests))
})

plugins.get('/registry', async (c) => {
  let raw: Response
  try {
    raw = await fetch(REGISTRY_URL)
    if (!raw.ok) throw new Error(`GitHub returned ${raw.status}`)
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Failed to fetch registry' }, 502)
  }

  const entries = await raw.json() as Array<{ id: string; name: string; description: string; path: string; sha256: string }>
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

plugins.post('/:source_type/test', async (c) => {
  const sourceType = c.req.param('source_type')
  const body = await c.req.json()
  try {
    const plugin = await loadPlugin(sourceType)
    const result = await plugin.test(body.credentials ?? {})
    return c.json(ok(result))
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Plugin error' }, 400)
  }
})

plugins.post('/:source_type/fetch', async (c) => {
  const sourceType = c.req.param('source_type')
  const body = await c.req.json()
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
      await stream.writeSSE({ data: JSON.stringify({ type: 'done', result }) })
    } catch (e) {
      await stream.writeSSE({ data: JSON.stringify({ type: 'error', message: e instanceof Error ? e.message : 'Plugin error' }) })
    }
  })
})

plugins.delete('/:source_type', async (c) => {
  const sourceType = c.req.param('source_type')
  const pluginDir = join(getPluginsDir(), sourceType)
  try {
    await rm(pluginDir, { recursive: true, force: false })
    return c.json(ok(null))
  } catch (e) {
    return c.json({ data: null, error: e instanceof Error ? e.message : 'Failed to remove plugin' }, 400)
  }
})

export default plugins
