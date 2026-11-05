import { describe, it, expect } from 'vitest'
import { buildMcpConfig, MCP_CLIENTS } from './mcpConfig'
import type { McpSetup } from '@/types'

const INSTALLED: McpSetup = {
  command: '/Applications/Cylenivo.app/Contents/MacOS/cylenivo-server',
  args: ['--mcp'],
  env: null,
  db_path: '/Users/x/Library/Application Support/com.cylenivo.app/cylenivo.db',
  warning: null,
}

describe('buildMcpConfig', () => {
  it('Claude Desktop, Cursor, LM Studio: mcpServers format, no env for the default DB', () => {
    for (const client of ['claude', 'cursor', 'lmstudio'] as const) {
      expect(JSON.parse(buildMcpConfig(client, INSTALLED))).toEqual({
        mcpServers: { cylenivo: { command: INSTALLED.command, args: ['--mcp'] } },
      })
    }
  })

  it('VS Code: servers + type stdio', () => {
    expect(JSON.parse(buildMcpConfig('vscode', INSTALLED))).toEqual({
      servers: { cylenivo: { type: 'stdio', command: INSTALLED.command, args: ['--mcp'] } },
    })
  })

  it('passes env when the server needs DB_PATH', () => {
    const dev = { ...INSTALLED, env: { DB_PATH: '/repo/server/dev.db' } }
    for (const client of MCP_CLIENTS) {
      expect(buildMcpConfig(client, dev)).toContain('"DB_PATH": "/repo/server/dev.db"')
    }
  })

  it('escapes Windows paths', () => {
    const win = { ...INSTALLED, command: 'C:\\Program Files\\Cylenivo\\cylenivo-server.exe' }
    expect(JSON.parse(buildMcpConfig('claude', win)).mcpServers.cylenivo.command).toBe(win.command)
  })
})
