import { Hono } from 'hono'
import { cors } from 'hono/cors'
import configs from './routes/configs.js'
import imports from './routes/imports.js'
import metrics from './routes/metrics.js'
import tickets from './routes/tickets.js'
import llm from './routes/llm.js'

export const app = new Hono()

app.use('*', cors())

app.get('/health', (c) => c.json({ status: 'ok' }))

app.route('/api/v1/configs', configs)
app.route('/api/v1/imports', imports)
app.route('/api/v1/metrics', metrics)
app.route('/api/v1/tickets', tickets)
app.route('/api/v1/llm', llm)
