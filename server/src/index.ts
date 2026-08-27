import { migrate } from './db/index.js'
import { seedDemoIfEmpty } from './lib/seedDemo.js'
import { app } from './app.js'

const PORT = Number(process.env.SERVER_PORT ?? 8765)

migrate()
  .then(() => seedDemoIfEmpty())
  .then(() => {
    // hostname is required: Bun defaults to 0.0.0.0, which exposed the whole
    // API (ticket data, deletes, and the stored Jira token via
    // POST /connections/:id/fetch) to every machine on the local network.
    // This is a local-only desktop app — loopback only.
    Bun.serve({ fetch: app.fetch, port: PORT, hostname: '127.0.0.1', idleTimeout: 0 })
    console.log(`Hono server running on 127.0.0.1:${PORT}`)
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })

export { app }
