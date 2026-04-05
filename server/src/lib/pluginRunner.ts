import { homedir } from 'os'
import { join } from 'path'
import { pathToFileURL } from 'url'

export function getPluginsDir(): string {
  return process.env.PLUGINS_DIR ?? join(homedir(), '.cylenivo', 'plugins')
}

export interface PluginModule {
  test(credentials: Record<string, string>): Promise<{ ok: boolean; display_name?: string }>
  fetch(
    credentials: Record<string, string>,
    options: Record<string, unknown>,
    onProgress: (current: number, total: number, key: string) => void,
  ): Promise<unknown>
}

export async function loadPlugin(sourceType: string): Promise<PluginModule> {
  const pluginPath = join(getPluginsDir(), sourceType, 'index.js')
  console.log(`[pluginRunner] loading ${pluginPath}`)
  let mod: unknown
  try {
    mod = await import(pathToFileURL(pluginPath).href)
  } catch (e) {
    const msg = `Plugin '${sourceType}' not found or failed to load: ${e instanceof Error ? e.message : e}`
    console.error(`[pluginRunner] ${msg}`)
    throw new Error(msg)
  }
  const m = mod as Record<string, unknown>
  if (typeof m.test !== 'function' || typeof m.fetch !== 'function') {
    const msg = `Plugin '${sourceType}' must export test() and fetch()`
    console.error(`[pluginRunner] ${msg}`)
    throw new Error(msg)
  }
  console.log(`[pluginRunner] loaded ok — exports: ${Object.keys(m).join(', ')}`)
  return m as unknown as PluginModule
}
