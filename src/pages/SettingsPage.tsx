import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Plus, Pencil, Trash2, ArrowRight, Settings2, Copy, Zap,
  Database, FileJson, Calendar, Ticket, Link2, CheckCircle2, XCircle, Loader2,
  X, Bot, RefreshCw, Puzzle, Globe, LayoutDashboard,
} from 'lucide-react'
import { api } from '@/services/api'
import type { ProjectConfig, ImportSession, SourceConnection, PluginManifest, PluginRegistryEntry } from '@/types'
import { Button } from '@/components/ui/button'
import ConnectionDialog from '@/components/connections/ConnectionDialog'
import RefreshDialog from '@/components/connections/RefreshDialog'
import { JIRA_MANIFEST } from '@/lib/jiraManifest'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { notifyImportsChanged } from '@/hooks/useImports'
import { notifyPluginUpdatesChanged } from '@/hooks/usePluginUpdates'
import { EmptyState, SectionHeader, Card, IconBtn, NavGroup, NavItem, type Section, type PendingDelete } from './settings/shared'
import { AISection } from './settings/AISection'

function resolveInitialSection(state: unknown): Section {
  const s = state as { tab?: string; section?: string } | null
  const raw = s?.section ?? s?.tab ?? 'overview'
  const valid: Section[] = ['overview', 'data-sources', 'configs', 'datasets', 'plugins', 'ai', 'language', 'data-management']
  return valid.includes(raw as Section) ? (raw as Section) : 'overview'
}


// ── Main component ────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const [section, setSection] = useState<Section>(() => resolveInitialSection(location.state))
  const [configs, setConfigs] = useState<ProjectConfig[]>([])
  const [imports, setImports] = useState<ImportSession[]>([])
  const [connections, setConnections] = useState<SourceConnection[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogManifest, setDialogManifest] = useState<PluginManifest>(JIRA_MANIFEST)
  const [editConn, setEditConn] = useState<SourceConnection | null>(null)
  const [showSourcePicker, setShowSourcePicker] = useState(false)
  const [testingId, setTestingId] = useState<string | null>(null)
  const [refreshConn, setRefreshConn] = useState<SourceConnection | null>(null)
  const [refreshImport, setRefreshImport] = useState<{ id: string; project_key: string; config_id: string } | null>(null)
  const [testResults, setTestResults] = useState<Record<string, 'ok' | 'error'>>({})
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [pendingReset, setPendingReset] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [pendingFullReset, setPendingFullReset] = useState(false)
  const [fullResetting, setFullResetting] = useState(false)
  const [fullResetDone, setFullResetDone] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [errorMsg, setErrorMsg] = useState<{ title: string; description: string; action?: string } | null>(null)
  const [showConnBanner, setShowConnBanner] = useState(false)
  const [connDatasets, setConnDatasets] = useState<Record<string, ImportSession[]>>({})
  const [llmConfigExists, setLlmConfigExists] = useState(false)
  const [plugins, setPlugins] = useState<PluginManifest[]>([])
  const [pendingUninstall, setPendingUninstall] = useState<PluginManifest | null>(null)
  const [registry, setRegistry] = useState<PluginRegistryEntry[] | null>(null)
  const [registryLoading, setRegistryLoading] = useState(false)
  const [registryError, setRegistryError] = useState<string | null>(null)
  const [installingId, setInstallingId] = useState<string | null>(null)
  const [installError, setInstallError] = useState<string | null>(null)
  const [githubUrl, setGithubUrl] = useState('')
  const [urlInstalling, setUrlInstalling] = useState(false)
  const [urlInstallError, setUrlInstallError] = useState<string | null>(null)
  const [showUrlInstall, setShowUrlInstall] = useState(false)

  useEffect(() => {
    api.configs.list().then(setConfigs).catch(console.error)
    api.imports.list().then(setImports).catch(console.error)
    api.connections.list().then((conns) => {
      setConnections(conns)
      for (const c of conns) {
        api.connections.datasets(c.id).then((ds) => {
          setConnDatasets((prev) => ({ ...prev, [c.id]: ds }))
        }).catch(() => {})
      }
    }).catch(console.error)
    api.llmConfig.get().then((cfg) => setLlmConfigExists(!!cfg)).catch(console.error)
    api.plugins.list().then(setPlugins).catch(console.error)
  }, [])

  async function executeDelete() {
    if (!pendingDelete) return
    const { type, id } = pendingDelete
    setPendingDelete(null)
    try {
      if (type === 'config') {
        await api.configs.delete(id)
        setConfigs((prev) => prev.filter((c) => c.id !== id))
      } else if (type === 'import') {
        await api.imports.delete(id)
        setImports((prev) => prev.filter((i) => i.id !== id))
      } else {
        await api.connections.delete(id)
        setConnections((prev) => prev.filter((c) => c.id !== id))
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error'
      if (type === 'config' && msg.toLowerCase().includes('associated imports')) {
        setErrorMsg({
          title: t('settings.deleteConfigInUse'),
          description: t('settings.deleteConfigInUseDesc'),
          action: 'datasets',
        })
      } else {
        setErrorMsg({ title: t('settings.couldNotDelete'), description: msg })
      }
    }
  }

  async function handleFullReset() {
    setFullResetting(true)
    setPendingFullReset(false)
    try {
      await api.demo.fullReset()
      localStorage.clear()
      notifyImportsChanged()
      setFullResetDone(true)
    } catch (e) {
      setErrorMsg({ title: t('settings.couldNotReset'), description: e instanceof Error ? e.message : 'Error' })
    }
    setFullResetting(false)
  }

  async function handleReset() {
    setResetting(true)
    setPendingReset(false)
    try {
      await api.demo.reset()
      setConfigs([])
      setImports([])
      notifyImportsChanged()
    } catch (e) {
      setErrorMsg({ title: t('settings.couldNotReset'), description: e instanceof Error ? e.message : 'Error' })
    }
    setResetting(false)
  }

  async function handleSeedDemo() {
    setSeeding(true)
    try {
      const result = await api.demo.seed()
      notifyImportsChanged()
      const first = result.imports[0]
      if (first?.import_id) navigate(`/projects/${first.import_id}`)
    } catch (e) {
      setErrorMsg({ title: t('settings.couldNotGenerateDemo'), description: e instanceof Error ? e.message : 'Error' })
    }
    setSeeding(false)
  }

  function manifestForConn(conn: SourceConnection): PluginManifest {
    if (conn.source_type === 'jira') return JIRA_MANIFEST
    return plugins.find((p) => p.source_type === conn.source_type) ?? JIRA_MANIFEST
  }

  function openAddDialog(manifest: PluginManifest) {
    setEditConn(null)
    setDialogManifest(manifest)
    setShowSourcePicker(false)
    setDialogOpen(true)
  }

  function openEditDialog(conn: SourceConnection) {
    setEditConn(conn)
    setDialogManifest(manifestForConn(conn))
    setDialogOpen(true)
  }

  async function handleDuplicate(id: string) {
    try {
      const dup = await api.connections.duplicate(id) as SourceConnection
      setConnections((prev) => [...prev, dup])
    } catch { /* ignore */ }
  }

  async function handleTestConnection(id: string) {
    setTestingId(id)
    try {
      await api.connections.test(id)
      setTestResults((prev) => ({ ...prev, [id]: 'ok' }))
    } catch {
      setTestResults((prev) => ({ ...prev, [id]: 'error' }))
    } finally {
      setTestingId(null)
    }
  }

  function handleSaved(conn: SourceConnection) {
    const isNew = !connections.find((c) => c.id === conn.id)
    setConnections((prev) => {
      const idx = prev.findIndex((c) => c.id === conn.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = conn
        return next
      }
      return [...prev, conn]
    })
    if (isNew && connections.length === 0) setShowConnBanner(true)
  }

  function connectionDeleteDesc(connId: string) {
    const count = connDatasets[connId]?.length ?? 0
    return count > 0
      ? t('settings.deleteConnectionDescWithDatasets', { count })
      : t('settings.deleteConnectionDesc')
  }

  const confirmMeta: Record<PendingDelete['type'], { title: string; description: string }> = {
    config: { title: t('settings.deleteConfigConfirm'), description: t('settings.deleteConfigDesc') },
    import: { title: t('settings.deleteDatasetConfirm'), description: t('settings.deleteDatasetDesc') },
    connection: {
      title: t('settings.deleteConnectionConfirm'),
      description: pendingDelete?.type === 'connection' ? connectionDeleteDesc(pendingDelete.id) : t('settings.deleteConnectionDesc'),
    },
  }

  // ── Section renderers ──────────────────────────────────────────────────────

  function renderConfigs() {
    return (
      <>
        <SectionHeader
          title={t('settings.tabConfigs')}
          desc={t('settings.configsDesc')}
          action={
            <Button onClick={() => navigate('/settings/configs/new')} variant="outline" size="sm" className="gap-1.5 shrink-0">
              <Plus className="w-3.5 h-3.5" />
              {t('settings.newConfig')}
            </Button>
          }
        />
        {configs.length === 0 ? (
          <EmptyState
            icon={Settings2}
            title={t('settings.noConfigs')}
            hint={t('settings.noConfigsHint')}
            ctaLabel={t('settings.importData')}
            onCta={() => navigate('/import')}
          />
        ) : (
          <div className="space-y-2">
            {configs.map((config) => (
              <Card
                key={config.id}
                icon={Settings2}
                actions={
                  <>
                    <IconBtn onClick={() => navigate(`/settings/configs/${config.id}`)} title={t('common.edit')}>
                      <Pencil className="w-3.5 h-3.5" />
                    </IconBtn>
                    <IconBtn danger onClick={() => setPendingDelete({ type: 'config', id: config.id, label: config.name })} title={t('common.delete')}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </IconBtn>
                  </>
                }
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900">{config.name}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {config.source_type}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <span className="font-medium">{config.cycle_time_start_status}</span>
                  <ArrowRight className="w-3 h-3 text-gray-300" />
                  <span className="font-medium">{config.cycle_time_end_status}</span>
                  <span className="text-gray-400 ml-0.5 text-[11px]">{t('settings.cycleTime')}</span>
                  <span className="text-gray-300 mx-1">·</span>
                  <span className="text-gray-400 text-[11px]">{config.cycle_time_mode}</span>
                </div>
                {config.status_order?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {config.status_order.map((s) => (
                      <span
                        key={s}
                        className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${
                          s === config.cycle_time_start_status || s === config.cycle_time_end_status
                            ? 'bg-teal-50 border-teal-200 text-teal-700'
                            : 'bg-gray-50 border-gray-200 text-gray-500'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </>
    )
  }

  function renderDatasets() {
    return (
      <>
        <SectionHeader
          title={t('settings.tabDatasets')}
          desc={t('settings.datasetsDesc')}
          action={
            <Button onClick={() => navigate('/import')} variant="outline" size="sm" className="gap-1.5 shrink-0">
              <Plus className="w-3.5 h-3.5" />
              {t('settings.newImport')}
            </Button>
          }
        />
        {imports.length === 0 ? (
          <EmptyState
            icon={Database}
            title={t('settings.noDatasets')}
            hint={t('settings.noDatasetsHint')}
            ctaLabel={t('settings.importData')}
            onCta={() => navigate('/import')}
          />
        ) : (
          <div className="space-y-2">
            {imports.map((imp) => (
              <Card
                key={imp.id}
                icon={FileJson}
                actions={
                  <>
                    {imp.connection_id && connections.find((c) => c.id === imp.connection_id) && (
                      <IconBtn
                        onClick={() => {
                          setRefreshConn(connections.find((c) => c.id === imp.connection_id)!)
                          setRefreshImport({ id: imp.id, project_key: imp.project_key, config_id: imp.config_id })
                        }}
                        title={t('refresh.confirm')}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </IconBtn>
                    )}
                    <IconBtn onClick={() => navigate(`/settings/datasets/${imp.id}`)} title={t('common.edit')}>
                      <Pencil className="w-3.5 h-3.5" />
                    </IconBtn>
                    <IconBtn onClick={() => navigate(`/projects/${imp.id}`)} title={t('common.open')}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </IconBtn>
                    <IconBtn danger onClick={() => setPendingDelete({ type: 'import', id: imp.id, label: imp.name ?? imp.project_key })} title={t('common.delete')}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </IconBtn>
                  </>
                }
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900">{imp.name ?? imp.project_key}</p>
                  {imp.config_name && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-violet-50 text-violet-600 border border-violet-100">
                      {imp.config_name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Ticket className="w-3 h-3" />
                    {imp.ticket_count} tickets
                  </span>
                  <span>{imp.project_key}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(imp.imported_at).toLocaleDateString('de-DE')}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </>
    )
  }

  function renderDataSources() {
    return (
      <>
        <SectionHeader
          title={t('settings.navDataSources')}
          desc={t('settings.dataSourcesDesc')}
          action={
            <Button onClick={() => setShowSourcePicker(true)} variant="outline" size="sm" className="gap-1.5 shrink-0">
              <Plus className="w-3.5 h-3.5" />
              {t('settings.addDataSource')}
            </Button>
          }
        />

        {showConnBanner && (
          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 mb-5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="flex-1 text-sm text-emerald-800">
              <span className="font-semibold">{t('settings.connectionAdded')}</span>
              {' '}{t('settings.connectionAddedHint')}
            </div>
            <Button size="sm" onClick={() => navigate('/import')} className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white h-8 shrink-0">
              {t('settings.importData')} <ArrowRight className="w-3.5 h-3.5" />
            </Button>
            <button onClick={() => setShowConnBanner(false)} className="text-emerald-500 hover:text-emerald-700 shrink-0 ml-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {connections.length === 0 ? (
          <EmptyState
            icon={Link2}
            title={t('settings.noDataSources')}
            hint={t('settings.noDataSourcesHint')}
            ctaLabel={t('settings.addDataSource')}
            onCta={() => setShowSourcePicker(true)}
          />
        ) : (
          <div className="space-y-2">
            {connections.map((conn) => (
              <Card
                key={conn.id}
                icon={Link2}
                actions={
                  <>
                    <IconBtn
                      onClick={() => handleTestConnection(conn.id)}
                      disabled={testingId === conn.id}
                      title={t('common.test')}
                    >
                      {testingId === conn.id
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <Zap className="w-3.5 h-3.5" />}
                    </IconBtn>
                    <IconBtn onClick={() => handleDuplicate(conn.id)} title={t('common.duplicate')}>
                      <Copy className="w-3.5 h-3.5" />
                    </IconBtn>
                    <IconBtn onClick={() => openEditDialog(conn)} title={t('common.edit')}>
                      <Pencil className="w-3.5 h-3.5" />
                    </IconBtn>
                    <IconBtn danger onClick={() => setPendingDelete({ type: 'connection', id: conn.id, label: conn.name })} title={t('common.delete')}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </IconBtn>
                  </>
                }
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900">{conn.name}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {conn.source_type}
                  </span>
                  {testResults[conn.id] === 'ok' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  {testResults[conn.id] === 'error' && <XCircle className="w-3.5 h-3.5 text-red-400" />}
                </div>
                <p className="text-xs text-gray-400 mt-1">{conn.base_url} · {conn.email}</p>
                {connDatasets[conn.id]?.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-100 space-y-0.5">
                    {connDatasets[conn.id].slice(0, 3).map((ds) => (
                      <p key={ds.id} className="text-xs text-gray-400">
                        {ds.name ?? ds.project_key} · {ds.ticket_count} tickets · {new Date(ds.imported_at).toLocaleDateString()}
                      </p>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </>
    )
  }

  function renderOverview() {
    const quickLinks = [
      { id: 'data-sources' as Section, icon: Link2, label: t('settings.navDataSources'), desc: t('settings.dataSourcesDesc'), count: connections.length },
      { id: 'configs' as Section, icon: Settings2, label: t('settings.tabConfigs'), desc: t('settings.configsDesc'), count: configs.length },
      { id: 'datasets' as Section, icon: Database, label: t('settings.tabDatasets'), desc: t('settings.datasetsDesc'), count: imports.length },
    ]

    return (
      <>
        <SectionHeader title={t('settings.overview')} desc={t('settings.overviewDesc')} />

        {/* Hero card */}
        <div className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-8 text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-xl bg-white border border-blue-200 shadow-sm">
              <Plus className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1.5">{t('settings.addNewData')}</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto mb-5 leading-relaxed">{t('settings.addNewDataDesc')}</p>
          <Button onClick={() => navigate('/import')} className="gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            {t('settings.addNewData')}
          </Button>
        </div>

        {/* Quick links */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">{t('settings.manageData')}</p>
        <div className="space-y-2">
          {quickLinks.map(({ id, icon: Icon, label, desc, count }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 shrink-0">
                <Icon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{desc}</p>
              </div>
              {count > 0 && (
                <span className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-1.5 py-0.5 font-semibold shrink-0">{count}</span>
              )}
              <ArrowRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            </button>
          ))}
        </div>
      </>
    )
  }


  async function loadRegistry() {
    setRegistryLoading(true)
    setRegistryError(null)
    try {
      const entries = await api.plugins.registry()
      setRegistry(entries)
    } catch (e) {
      setRegistryError(e instanceof Error ? e.message : 'Failed to load registry')
    } finally {
      setRegistryLoading(false)
    }
  }

  async function handleInstall(entry: PluginRegistryEntry) {
    setInstallingId(entry.id)
    setInstallError(null)
    try {
      const manifest = await api.plugins.installFromRegistry(entry.id)
      setPlugins((prev) => [...prev.filter((p) => p.source_type !== manifest.source_type), manifest])
      setRegistry((prev) => prev?.map((e) => e.id === entry.id ? { ...e, installed: true, update_available: false } : e) ?? prev)
      notifyPluginUpdatesChanged()
    } catch (e) {
      setInstallError(e instanceof Error ? e.message : 'Install failed')
    } finally {
      setInstallingId(null)
    }
  }

  async function handleInstallUrl() {
    setUrlInstalling(true)
    setUrlInstallError(null)
    try {
      const manifest = await api.plugins.installFromUrl(githubUrl)
      setPlugins((prev) => [...prev.filter((p) => p.source_type !== manifest.source_type), manifest])
      setGithubUrl('')
      setShowUrlInstall(false)
    } catch (e) {
      setUrlInstallError(e instanceof Error ? e.message : 'Install failed')
    } finally {
      setUrlInstalling(false)
    }
  }

  async function handleUninstall(plugin: PluginManifest) {
    setPendingUninstall(null)
    await api.plugins.uninstall(plugin.source_type)
    setPlugins((prev) => prev.filter((p) => p.source_type !== plugin.source_type))
    notifyPluginUpdatesChanged()
  }

  function renderPlugins() {
    return (
      <>
        <SectionHeader
          title={t('settings.tabPlugins')}
          desc={t('settings.pluginsDesc')}
        />
        {plugins.length === 0 ? (
          <EmptyState
            icon={Puzzle}
            title={t('settings.pluginsEmpty')}
            hint={t('settings.pluginsEmptyDesc')}
          />
        ) : (
          <div className="space-y-2">
            {plugins.map((plugin) => (
              <Card
                key={plugin.source_type}
                icon={Puzzle}
                actions={
                  <IconBtn danger title={t('settings.pluginUninstall')} onClick={() => setPendingUninstall(plugin)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </IconBtn>
                }
              >
                <p className="font-medium text-sm text-gray-900">{plugin.name}</p>
                <p className="text-xs text-gray-400">{plugin.source_type}{plugin.version ? ` · v${plugin.version}` : ''}</p>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{t('settings.browsePlugins')}</p>
          {registry === null && !registryLoading && (
            <button
              onClick={loadRegistry}
              className="w-full flex items-center gap-3 p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-white border border-gray-200">
                <Plus className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{t('settings.registryLoad')}</p>
                <p className="text-xs text-gray-400">{t('settings.registryLoadDesc')}</p>
              </div>
            </button>
          )}
          {registryLoading && (
            <div className="flex items-center gap-2 py-6 justify-center text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">{t('settings.registryLoading')}</span>
            </div>
          )}
          {registryError && (
            <div className="flex items-center gap-2 p-4 rounded-xl border border-red-100 bg-red-50 text-sm text-red-600">
              <XCircle className="w-4 h-4 shrink-0" />
              {registryError}
              <button onClick={loadRegistry} className="ml-auto text-xs underline">{t('settings.registryRetry')}</button>
            </div>
          )}
          {registry !== null && !registryLoading && (
            <div className="space-y-2">
              {registry.map((entry) => (
                <Card
                  key={entry.id}
                  icon={Puzzle}
                  actions={
                    installingId === entry.id
                      ? <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                      : entry.installed && !entry.update_available
                        ? <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{t('settings.registryInstalled')}</span>
                        : <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 h-7 text-xs"
                            onClick={() => handleInstall(entry)}
                            disabled={installingId !== null}
                          >
                            {entry.update_available
                              ? <RefreshCw className="w-3 h-3" />
                              : <Plus className="w-3 h-3" />}
                            {entry.update_available ? t('settings.registryUpdate') : t('settings.registryInstall')}
                          </Button>
                  }
                >
                  <p className="font-medium text-sm text-gray-900">{entry.name}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{entry.description}</p>
                </Card>
              ))}
              {installError && (
                <p className="text-xs text-red-500 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />{installError}
                </p>
              )}
            </div>
          )}
          <div className="mt-4">
            {!showUrlInstall ? (
              <button
                onClick={() => setShowUrlInstall(true)}
                className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
              >
                {t('settings.installFromUrl')}
              </button>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-3">
                <p className="text-xs font-semibold text-amber-800">{t('settings.installFromUrlWarning')}</p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/user/my-plugin"
                    className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  <Button
                    size="sm"
                    onClick={handleInstallUrl}
                    disabled={!githubUrl.trim() || urlInstalling}
                    className="gap-1 h-8"
                  >
                    {urlInstalling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                    {t('settings.registryInstall')}
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => { setShowUrlInstall(false); setUrlInstallError(null) }}>
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
                {urlInstallError && <p className="text-xs text-red-600">{urlInstallError}</p>}
              </div>
            )}
          </div>
        </div>
        {pendingUninstall && (
          <ConfirmDialog
            open
            title={t('settings.pluginUninstallConfirm', { name: pendingUninstall.name })}
            description={t('settings.pluginUninstallDesc')}
            confirmLabel={t('settings.pluginUninstall')}
            destructive
            onConfirm={() => handleUninstall(pendingUninstall)}
            onCancel={() => setPendingUninstall(null)}
          />
        )}
      </>
    )
  }

  function renderLanguage() {
    return (
      <>
        <SectionHeader title={t('settings.tabLanguage')} desc={t('settings.languageDesc')} />
        <div className="space-y-4 opacity-50 pointer-events-none">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('settings.language')}</label>
            <div className="relative">
              <select disabled className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 pr-8 appearance-none bg-white">
                <option>English</option>
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-400">{t('settings.languageComingSoon')}</p>
      </>
    )
  }

  function renderDataManagement() {
    return (
      <>
        <SectionHeader title={t('settings.dataManagement')} desc={t('settings.dataManagementDesc')} />
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">{t('settings.deleteEverything')}</p>
            <p className="text-xs text-gray-400 mb-3">{t('settings.deleteEverythingDesc')}</p>
            <Button variant="outline" size="sm" disabled={resetting || configs.length === 0}
              onClick={() => setPendingReset(true)}
              className="gap-1.5 text-red-500 hover:text-red-700 hover:border-red-300">
              {resetting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              {t('settings.deleteEverything')}
            </Button>
          </div>
          {imports.length === 0 && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-1">{t('settings.generateDemo')}</p>
              <p className="text-xs text-gray-400 mb-3">{t('settings.dataManagementDesc')}</p>
              <Button variant="outline" size="sm" disabled={seeding} onClick={handleSeedDemo} className="gap-1.5">
                {seeding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                {t('settings.generateDemo')}
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 mt-4">
          <p className="text-sm font-semibold text-red-700 mb-1">{t('settings.completeReset')}</p>
          <p className="text-xs text-red-500 mb-3">{t('settings.completeResetDesc')}</p>
          {fullResetDone ? (
            <div className="flex items-center gap-3">
              <p className="text-xs text-red-600 font-medium">{t('settings.completeResetDone')}</p>
              <Button size="sm" variant="outline" onClick={() => { window.location.href = '/' }} className="gap-1.5 border-red-300 text-red-700 hover:bg-red-100">
                <RefreshCw className="w-3.5 h-3.5" />
                {t('settings.reload')}
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" disabled={fullResetting}
              onClick={() => setPendingFullReset(true)}
              className="gap-1.5 text-red-600 hover:text-red-800 border-red-300 hover:border-red-400 hover:bg-red-100">
              {fullResetting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              {t('settings.completeReset')}
            </Button>
          )}
        </div>
      </>
    )
  }

  const contentMap: Record<Section, () => React.ReactNode> = {
    overview: renderOverview,
    'data-sources': renderDataSources,
    configs: renderConfigs,
    datasets: renderDatasets,
    plugins: renderPlugins,
    ai: () => <AISection onConfigChange={(cfg) => setLlmConfigExists(!!cfg)} />,
    language: renderLanguage,
    'data-management': renderDataManagement,
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('settings.title')}</h2>
        <p className="text-sm text-gray-400 mt-1">{t('settings.subtitle')}</p>
      </div>

      <div className="flex gap-8">
        {/* Left nav */}
        <nav className="w-44 shrink-0">
          <NavGroup label={t('settings.navOverview')}>
            <NavItem id="overview" active={section === 'overview'} icon={LayoutDashboard} label={t('settings.overview')} onClick={setSection} />
          </NavGroup>
          <NavGroup label={t('settings.manageData')}>
            <NavItem id="data-sources" active={section === 'data-sources'} icon={Link2} label={t('settings.navDataSources')} count={connections.length} onClick={setSection} />
            <NavItem id="configs" active={section === 'configs'} icon={Settings2} label={t('settings.tabConfigs')} count={configs.length} onClick={setSection} />
            <NavItem id="datasets" active={section === 'datasets'} icon={Database} label={t('settings.tabDatasets')} count={imports.length} onClick={setSection} />
          </NavGroup>
          <NavGroup label="AI">
            <NavItem id="ai" active={section === 'ai'} icon={Bot} label={t('settings.tabAi')} dot={llmConfigExists} onClick={setSection} />
          </NavGroup>
          <NavGroup label={t('settings.tabPlugins')}>
            <NavItem id="plugins" active={section === 'plugins'} icon={Puzzle} label={t('settings.tabPlugins')} count={plugins.length} onClick={setSection} />
          </NavGroup>
          <NavGroup label={t('settings.navGeneral')}>
            <NavItem id="language" active={section === 'language'} icon={Globe} label={t('settings.tabLanguage')} soon onClick={setSection} />
            <NavItem id="data-management" active={section === 'data-management'} icon={Trash2} label={t('settings.dataManagement')} onClick={setSection} />
          </NavGroup>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {contentMap[section]()}
        </div>
      </div>

      <ConnectionDialog
        key={editConn?.id ?? 'new'}
        open={dialogOpen}
        manifest={dialogManifest}
        connection={editConn}
        onClose={() => setDialogOpen(false)}
        onSaved={(conn) => { handleSaved(conn) }}
      />

      {refreshConn && (
        <RefreshDialog
          open
          connection={refreshConn}
          pluginManifest={refreshConn.source_type !== 'jira' ? manifestForConn(refreshConn) : null}
          importSession={refreshImport}
          onClose={() => { setRefreshConn(null); setRefreshImport(null) }}
        />
      )}

      {/* Source type picker */}
      {showSourcePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowSourcePicker(false)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 space-y-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-gray-900">{t('connection.pickSourceType')}</h3>
            <button
              onClick={() => openAddDialog(JIRA_MANIFEST)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                <Link2 className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{JIRA_MANIFEST.name}</p>
                <p className="text-xs text-gray-400">{t('connection.jiraDesc')}</p>
              </div>
            </button>
            {plugins.map((plugin) => (
              <button
                key={plugin.source_type}
                onClick={() => openAddDialog(plugin)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <Puzzle className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{plugin.name}</p>
                  <p className="text-xs text-gray-400">{plugin.description ?? plugin.source_type}</p>
                </div>
              </button>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={() => setShowSourcePicker(false)}>{t('common.cancel')}</Button>
          </div>
        </div>
      )}

      {pendingDelete && (
        <ConfirmDialog
          open
          title={confirmMeta[pendingDelete.type].title}
          description={confirmMeta[pendingDelete.type].description}
          confirmLabel={t('common.delete')}
          onConfirm={executeDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      {pendingReset && (
        <ConfirmDialog
          open
          title={t('settings.deleteEverythingConfirm')}
          description={t('settings.deleteEverythingDesc')}
          confirmLabel={t('settings.deleteEverything')}
          onConfirm={handleReset}
          onCancel={() => setPendingReset(false)}
        />
      )}

      {pendingFullReset && (
        <ConfirmDialog
          open
          title={t('settings.completeResetConfirm')}
          description={t('settings.completeResetConfirmDesc')}
          confirmLabel={t('settings.completeReset')}
          onConfirm={handleFullReset}
          onCancel={() => setPendingFullReset(false)}
        />
      )}

      {errorMsg && (
        <ConfirmDialog
          open
          title={errorMsg.title}
          description={errorMsg.description}
          cancelLabel="Close"
          confirmLabel={errorMsg.action === 'datasets' ? 'Go to Datasets' : undefined}
          destructive={false}
          onConfirm={errorMsg.action === 'datasets' ? () => { setErrorMsg(null); setSection('datasets') } : undefined}
          onCancel={() => setErrorMsg(null)}
        />
      )}
    </div>
  )
}
