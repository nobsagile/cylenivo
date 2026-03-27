import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { migrate } from './db/index.js'

const PORT = Number(process.env.SERVER_PORT ?? 8765)

const app = new Hono()

app.get('/health', (c) => c.json({ status: 'ok' }))

migrate().then(() => {
  serve({ fetch: app.fetch, port: PORT }, () => {
    console.log(`Hono server running on port ${PORT}`)
  })
}).catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

export { app }
