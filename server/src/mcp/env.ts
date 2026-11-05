import { homedir } from 'os'
import { basename, join, resolve } from 'path'

/** Tauri bundle identifier — appDataDir is named after it. */
const APP_IDENTIFIER = 'com.cylenivo.app'

export function isMcpMode(argv: string[] = process.argv): boolean {
  return argv.includes('--mcp')
}

/**
 * The path Tauri's `app_data_dir()` resolves to, plus `cylenivo.db`
 * (src-tauri/src/lib.rs). Lets an MCP client config work without DB_PATH.
 */
export function defaultAppDbPath(
  platform: NodeJS.Platform = process.platform,
  env: NodeJS.ProcessEnv = process.env,
  home: string = homedir(),
): string {
  let base: string
  if (platform === 'darwin') base = join(home, 'Library', 'Application Support')
  else if (platform === 'win32') base = env.APPDATA ?? join(home, 'AppData', 'Roaming')
  else base = env.XDG_DATA_HOME || join(home, '.local', 'share')
  return join(base, APP_IDENTIFIER, 'cylenivo.db')
}

export interface McpLaunchSpec {
  command: string
  args: string[]
  /** only set when the client must pass DB_PATH (dev, or a non-default path) */
  env: Record<string, string> | null
  db_path: string
  /** 'translocated': macOS runs the app from a random temp path (not moved to /Applications) */
  warning: 'translocated' | null
}

/**
 * How an MCP client should start this very binary. Read by the settings UI to
 * build a copy-paste config — the server knows its own path, the frontend does not.
 */
export function mcpLaunchSpec(
  execPath: string = process.execPath,
  dbPathEnv: string | undefined = process.env.DB_PATH,
  entry: string = resolve(import.meta.dir, '..', 'index.ts'),
): McpLaunchSpec {
  const isDev = basename(execPath).toLowerCase().startsWith('bun')
  const dbPath = resolve(dbPathEnv ?? (isDev ? 'dev.db' : defaultAppDbPath()))
  const needsEnv = isDev || dbPath !== defaultAppDbPath()
  return {
    command: execPath,
    args: isDev ? [entry, '--mcp'] : ['--mcp'],
    env: needsEnv ? { DB_PATH: dbPath } : null,
    db_path: dbPath,
    warning: execPath.includes('/AppTranslocation/') ? 'translocated' : null,
  }
}
