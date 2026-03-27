import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { migrate } from './db/index.js'
import configs from './routes/configs.js'
import imports from './routes/imports.js'
import metrics from './routes/metrics.js'
import tickets from './routes/tickets.js'
import llm from './routes/llm.js'

const PORT = Number(process.env.SERVER_PORT ?? 8765)

const app = new Hono()

app.use('*', cors())

app.get('/health', (c) => c.json({ status: 'ok' }))

app.route('/api/v1/configs', configs)
app.route('/api/v1/imports', imports)
app.route('/api/v1/metrics', metrics)
app.route('/api/v1/tickets', tickets)
app.route('/api/v1/llm', llm)

migrate().then(() => {
  serve({ fetch: app.fetch, port: PORT }, () => {
    console.log(`Hono server running on port ${PORT}`)
  })
}).catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

export { app }
