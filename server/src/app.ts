import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import configs from './routes/configs.js'
import imports from './routes/imports.js'
import metrics from './routes/metrics.js'
import tickets from './routes/tickets.js'
import llm from './routes/llm.js'
import llmConfigRoute from './routes/llm-config.js'
import connections from './routes/connections.js'
import demo from './routes/demo.js'
import plugins from './routes/plugins.js'

export const app = new Hono()

const ALLOWED_ORIGINS = [
  'tauri://localhost',
  'http://tauri.localhost',
  'https://tauri.localhost',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

app.use('*', cors({ origin: ALLOWED_ORIGINS }))
app.use('*', logger())

app.get('/health', (c) => c.json({ status: 'ok' }))

app.route('/api/v1/configs', configs)
app.route('/api/v1/imports', imports)
app.route('/api/v1/metrics', metrics)
app.route('/api/v1/tickets', tickets)
app.route('/api/v1/llm', llm)
app.route('/api/v1/llm-config', llmConfigRoute)
app.route('/api/v1/connections', connections)
app.route('/api/v1/demo', demo)
app.route('/api/v1/plugins', plugins)
