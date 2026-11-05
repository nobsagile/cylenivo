import { migrate, dbReadonly } from '../db/index.js'
import { runStdio } from './protocol.js'
import { TOOLS, SERVER_INSTRUCTIONS } from './tools.js'

export const SERVER_INFO = {
  name: 'cylenivo',
  title: 'Cylenivo',
  version: '1',
  instructions: SERVER_INSTRUCTIONS,
}

/**
 * Entry for `cylenivo-server --mcp`. stdout is the protocol channel, so every
 * console.log/info must go to stderr — one stray log line breaks the client.
 */
export async function startMcp(): Promise<void> {
  console.log = console.error
  console.info = console.error
  // Only the empty in-memory fallback needs tables; the real DB is read-only
  // and was migrated by the app.
  if (!dbReadonly) await migrate()
  await runStdio(TOOLS, SERVER_INFO)
}
