import { migrate } from './db/index.js'
import { seedDemoIfEmpty } from './lib/seedDemo.js'
import { app } from './app.js'

const PORT = Number(process.env.SERVER_PORT ?? 8765)

migrate()
  .then(() => seedDemoIfEmpty())
  .then(() => {
    Bun.serve({ fetch: app.fetch, port: PORT })
    console.log(`Hono server running on port ${PORT}`)
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })

export { app }
