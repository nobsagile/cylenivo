import { api } from '@/services/api'
import type { SourceConnection, JiraFetchOptions, PluginManifest } from '@/types'

export interface RefreshableDataset {
  id: string
  project_key: string
  name?: string | null
  resolved_from?: string | null
  resolved_to?: string | null
  issue_types?: string[] | null
}

/** Pre-fill plugin options from a known project_key (e.g. from a previous import) */
export function buildInitialPluginOptions(
  pluginManifest: PluginManifest | null | undefined,
  projectKey: string | undefined,
): Record<string, string> {
  const fetchOptions = pluginManifest?.fetch_options ?? []
  const opts = fetchOptions.reduce<Record<string, string>>((acc, f) => {
    acc[f.key] = String(f.default ?? '')
    return acc
  }, {})
  if (projectKey) {
    const idField = fetchOptions.find(f =>
      ['project', 'board', 'workspace', 'repo'].some(k => f.key.toLowerCase().includes(k))
    ) ?? fetchOptions.find(f => f.required)
    if (idField) opts[idField.key] = projectKey
  }
  return opts
}

/** True when a refresh can run without asking the user anything (same rule as RefreshDialog's auto-start). */
export function canRefreshUnattended(
  imp: RefreshableDataset,
  connection: SourceConnection,
  pluginManifest: PluginManifest | null | undefined,
): boolean {
  if (imp.resolved_to) return false
  if (connection.source_type === 'jira') return Boolean(imp.project_key ?? connection.project_key)
  if (!pluginManifest) return false
  const opts = buildInitialPluginOptions(pluginManifest, imp.project_key)
  return (pluginManifest.fetch_options ?? []).filter(f => f.required).every(f => Boolean(opts[f.key]))
}

/** Fetches fresh data for an existing dataset and replaces it in place (same ID). */
export async function refreshDataset(
  imp: RefreshableDataset,
  connection: SourceConnection,
  pluginManifest: PluginManifest | null | undefined,
  onProgress: (current: number, total: number, key: string) => void,
): Promise<void> {
  const resolvedFrom = imp.resolved_from || undefined
  if (connection.source_type === 'jira') {
    const issueTypes = imp.issue_types ?? connection.issue_types ?? []
    const projectKey = (imp.project_key ?? connection.project_key ?? '').trim().toUpperCase()
    const options: JiraFetchOptions = { project: projectKey, issue_types: issueTypes, resolved_from: resolvedFrom }
    const result = await api.connections.fetchStream(connection.id, options, onProgress)
    const file = new File([JSON.stringify(result)], `${projectKey}-refresh.json`, { type: 'application/json' })
    await api.imports.replace(imp.id, file, resolvedFrom, undefined, issueTypes)
  } else {
    const options = buildInitialPluginOptions(pluginManifest, imp.project_key)
    const result = await api.connections.fetchStream(connection.id, options, onProgress)
    const file = new File([JSON.stringify(result)], `${connection.name}-refresh.json`, { type: 'application/json' })
    await api.imports.replace(imp.id, file, resolvedFrom)
  }
}
