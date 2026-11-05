import type { McpSetup } from '@/types'

export const MCP_CLIENTS = ['claude', 'cursor', 'lmstudio', 'vscode'] as const
export type McpClient = typeof MCP_CLIENTS[number]

/**
 * Config snippet for an MCP client. Claude Desktop, Cursor and LM Studio share
 * the `mcpServers` format; VS Code uses `servers` with an explicit `type`.
 */
export function buildMcpConfig(client: McpClient, setup: McpSetup): string {
  const server: Record<string, unknown> = {
    ...(client === 'vscode' ? { type: 'stdio' } : {}),
    command: setup.command,
    args: setup.args,
    ...(setup.env ? { env: setup.env } : {}),
  }
  const root = client === 'vscode' ? 'servers' : 'mcpServers'
  return JSON.stringify({ [root]: { cylenivo: server } }, null, 2)
}
