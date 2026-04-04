import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { getPluginsDir } from './pluginRunner.js'

export interface PluginManifest {
  source_type: string
  name: string
  version?: string
  description?: string
  author?: string
  credentials: Array<{
    key: string
    label: string
    type: 'string' | 'password' | 'url' | 'number'
    placeholder?: string
    help?: string
  }>
  fetch_options: Array<{
    key: string
    label: string
    type: 'string' | 'password' | 'url' | 'number'
    required?: boolean
    default?: string | number
    placeholder?: string
    help?: string
  }>
}

export async function scanPlugins(): Promise<PluginManifest[]> {
  const pluginsDir = getPluginsDir()
  let entries: string[]
  try {
    entries = await readdir(pluginsDir)
  } catch {
    return [] // plugins dir doesn't exist yet
  }

  const manifests: PluginManifest[] = []
  for (const entry of entries) {
    const manifestPath = join(pluginsDir, entry, 'manifest.json')
    try {
      const raw = await readFile(manifestPath, 'utf-8')
      const manifest = JSON.parse(raw) as PluginManifest
      if (!manifest.source_type || !manifest.name) {
        console.warn(`[pluginScanner] skipping ${entry}: missing source_type or name`)
        continue
      }
      manifests.push(manifest)
    } catch {
      console.warn(`[pluginScanner] skipping ${entry}: could not read or parse manifest.json`)
    }
  }
  return manifests
}
