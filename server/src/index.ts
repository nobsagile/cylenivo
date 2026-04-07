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
    Bun.serve({ fetch: app.fetch, port: PORT, idleTimeout: 0 })
    console.log(`Hono server running on port ${PORT}`)
    pingMatomo()
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })

export { app }
