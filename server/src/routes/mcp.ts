import { Hono } from 'hono'
import { ok } from '../lib/response.js'
import { mcpLaunchSpec } from '../mcp/env.js'

const mcp = new Hono()

/** Launch command for `--mcp`, for the "Connect an AI assistant" settings card. */
mcp.get('/setup', (c) => c.json(ok(mcpLaunchSpec())))

export default mcp
