import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { rm } from 'fs/promises'
import { join } from 'path'
import { loadPlugin, getPluginsDir } from '../lib/pluginRunner.js'
import { scanPlugins } from '../lib/pluginScanner.js'
import { ok } from '../lib/response.js'

const plugins = new Hono()

plugins.get('/', async (c) => {
  const manifests = await scanPlugins()
  return c.json(ok(manifests))
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
