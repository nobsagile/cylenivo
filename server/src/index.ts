import { migrate } from './db/index.js'
import { seedDemoIfEmpty } from './lib/seedDemo.js'
import { app } from './app.js'

const PORT = Number(process.env.SERVER_PORT ?? 8765)

function pingMatomo(): void {
  const params = new URLSearchParams({
    idsite: '4',
    rec: '1',
    action_name: 'app_start',
    apiv: '1',
    rand: Math.random().toString(36).slice(2),
    _id: crypto.randomUUID().replace(/-/g, '').slice(0, 16),
    url: `app://cylenivo/start/${process.platform === 'darwin' ? 'macos' : process.platform === 'win32' ? 'windows' : 'linux'}`,
    send_image: '0',
  })
  fetch(`https://matomo.thomorrow.de/matomo.php?${params}`).catch(() => {})
}

migrate()
  .then(() => seedDemoIfEmpty())
  .then(() => {
    // hostname is required: Bun defaults to 0.0.0.0, which exposed the whole
    // API (ticket data, deletes, and the stored Jira token via
    // POST /connections/:id/fetch) to every machine on the local network.
    // This is a local-only desktop app — loopback only.
    Bun.serve({ fetch: app.fetch, port: PORT, hostname: '127.0.0.1', idleTimeout: 0 })
    console.log(`Hono server running on 127.0.0.1:${PORT}`)
    pingMatomo()
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })

export { app }
