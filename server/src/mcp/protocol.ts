/**
 * Minimal MCP server over stdio: newline-delimited JSON-RPC 2.0.
 *
 * Hand-written on purpose instead of @modelcontextprotocol/sdk: the SDK pulls
 * in an HTTP stack and a dozen transitive packages, and everything in the
 * server tree is compiled into the sidecar binary with full process access
 * (see "Threat model" in CLAUDE.md). We only need stdio + tools.
 *
 * Only standard MCP (tools) is used, nothing client-specific, so any MCP
 * client works: Claude Desktop, Cursor, LM Studio, VS Code, ...
 */

export const SUPPORTED_PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05']

export interface JsonSchemaProp {
  type: 'string' | 'integer' | 'boolean'
  description: string
  enum?: string[]
  minimum?: number
  maximum?: number
}

export interface ToolDef {
  name: string
  title: string
  description: string
  inputSchema: {
    type: 'object'
    properties: Record<string, JsonSchemaProp>
    required?: string[]
  }
  handler: (args: Record<string, unknown>) => Promise<unknown>
}

/** Thrown by a tool for an expected problem: shown to the model, not a crash. */
export class ToolError extends Error {}

interface JsonRpcRequest {
  jsonrpc: '2.0'
  id?: string | number | null
  method: string
  params?: Record<string, unknown>
}

type JsonRpcResponse =
  | { jsonrpc: '2.0'; id: string | number | null; result: unknown }
  | { jsonrpc: '2.0'; id: string | number | null; error: { code: number; message: string } }

const PARSE_ERROR = -32700
const INVALID_REQUEST = -32600
const METHOD_NOT_FOUND = -32601
const INVALID_PARAMS = -32602

function error(id: string | number | null, code: number, message: string): JsonRpcResponse {
  return { jsonrpc: '2.0', id, error: { code, message } }
}

/**
 * Lenient argument parsing: small local models often send numbers as strings
 * or null for "not set". Coerce what is unambiguous, reject the rest with a
 * message the model can act on.
 */
export function parseArgs(tool: ToolDef, raw: unknown): Record<string, unknown> | string {
  const input = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw as Record<string, unknown> : {}
  const out: Record<string, unknown> = {}
  for (const [key, prop] of Object.entries(tool.inputSchema.properties)) {
    let v = input[key]
    if (v === null || v === undefined || v === '') continue
    if (prop.type === 'integer') {
      if (typeof v === 'string' && /^-?\d+$/.test(v.trim())) v = Number(v.trim())
      if (typeof v !== 'number' || !Number.isInteger(v)) return `${key} must be an integer`
      if (prop.minimum !== undefined && v < prop.minimum) return `${key} must be ≥ ${prop.minimum}`
      if (prop.maximum !== undefined && v > prop.maximum) return `${key} must be ≤ ${prop.maximum}`
    } else if (prop.type === 'boolean') {
      if (v === 'true') v = true
      if (v === 'false') v = false
      if (typeof v !== 'boolean') return `${key} must be true or false`
    } else {
      if (typeof v === 'number') v = String(v)
      if (typeof v !== 'string') return `${key} must be a string`
      if (prop.enum && !prop.enum.includes(v)) return `${key} must be one of: ${prop.enum.join(', ')}`
    }
    out[key] = v
  }
  for (const key of tool.inputSchema.required ?? []) {
    if (out[key] === undefined) return `${key} is required`
  }
  return out
}

function textResult(text: string, isError = false) {
  return { content: [{ type: 'text', text }], ...(isError ? { isError: true } : {}) }
}

export interface ServerInfo {
  name: string
  title: string
  version: string
  instructions: string
}

/**
 * Handles one decoded JSON-RPC message. Returns null for notifications
 * (no response). Pure apart from the tool handlers — tests call it directly.
 */
export async function handleMessage(msg: unknown, tools: ToolDef[], info: ServerInfo): Promise<JsonRpcResponse | null> {
  if (!msg || typeof msg !== 'object' || Array.isArray(msg)) return error(null, INVALID_REQUEST, 'Invalid request')
  const req = msg as JsonRpcRequest
  const isNotification = req.id === undefined
  const id = req.id ?? null
  if (req.jsonrpc !== '2.0' || typeof req.method !== 'string') {
    return isNotification ? null : error(id, INVALID_REQUEST, 'Invalid request')
  }
  if (isNotification) return null // notifications/initialized, cancelled, ...

  switch (req.method) {
    case 'initialize': {
      const requested = req.params?.protocolVersion
      const protocolVersion = typeof requested === 'string' && SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
        ? requested
        : SUPPORTED_PROTOCOL_VERSIONS[0]
      return {
        jsonrpc: '2.0', id,
        result: {
          protocolVersion,
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: info.name, title: info.title, version: info.version },
          instructions: info.instructions,
        },
      }
    }
    case 'ping':
      return { jsonrpc: '2.0', id, result: {} }
    case 'tools/list':
      return {
        jsonrpc: '2.0', id,
        result: {
          tools: tools.map(t => ({
            name: t.name,
            title: t.title,
            description: t.description,
            inputSchema: t.inputSchema,
            annotations: { title: t.title, readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
          })),
        },
      }
    case 'tools/call': {
      const name = req.params?.name
      const tool = tools.find(t => t.name === name)
      if (!tool) return error(id, INVALID_PARAMS, `Unknown tool: ${String(name)}`)
      const args = parseArgs(tool, req.params?.arguments)
      if (typeof args === 'string') return { jsonrpc: '2.0', id, result: textResult(args, true) }
      try {
        const data = await tool.handler(args)
        // Compact JSON: local models have small context windows.
        return { jsonrpc: '2.0', id, result: textResult(JSON.stringify(data)) }
      } catch (e) {
        const message = e instanceof ToolError ? e.message : `Internal error: ${e instanceof Error ? e.message : String(e)}`
        if (!(e instanceof ToolError)) console.error('[mcp]', e)
        return { jsonrpc: '2.0', id, result: textResult(message, true) }
      }
    }
    default:
      return error(id, METHOD_NOT_FOUND, `Method not found: ${req.method}`)
  }
}

/** Reads newline-delimited JSON-RPC from stdin until EOF. stdout carries only protocol messages. */
export async function runStdio(tools: ToolDef[], info: ServerInfo): Promise<void> {
  const decoder = new TextDecoder()
  let buffer = ''
  const write = (res: JsonRpcResponse | null) => {
    if (res) process.stdout.write(JSON.stringify(res) + '\n')
  }
  for await (const chunk of Bun.stdin.stream()) {
    buffer += decoder.decode(chunk, { stream: true })
    let nl: number
    while ((nl = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, nl).trim()
      buffer = buffer.slice(nl + 1)
      if (!line) continue
      let msg: unknown
      try {
        msg = JSON.parse(line)
      } catch {
        write(error(null, PARSE_ERROR, 'Parse error'))
        continue
      }
      write(await handleMessage(msg, tools, info))
    }
  }
}
