import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Plus, Pencil, Trash2, ArrowRight, Settings2, Copy, Zap,
  Database, FileJson, Calendar, Ticket, Link2, CheckCircle2, XCircle, Loader2,
  X, Bot, RefreshCw, Puzzle, Globe,
} from 'lucide-react'
import { api } from '@/services/api'
import type { ProjectConfig, ImportSession, SourceConnection } from '@/types'
import { Button } from '@/components/ui/button'
import ConnectionDialog from '@/components/connections/ConnectionDialog'
import RefreshDialog from '@/components/connections/RefreshDialog'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { notifyImportsChanged } from '@/hooks/useImports'
import { EmptyState, SectionHeader, Card, IconBtn, NavGroup, NavItem, type Section, type PendingDelete } from './settings/shared'
import { AISection } from './settings/AISection'

function resolveInitialSection(state: unknown): Section {
  const s = state as { tab?: string; section?: string } | null
  const raw = s?.section ?? s?.tab ?? 'configs'
  const valid: Section[] = ['configs', 'datasets', 'data-sources', 'plugins', 'ai', 'language', 'data-management']
  return valid.includes(raw as Section) ? (raw as Section) : 'configs'
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
  const [editConn, setEditConn] = useState<SourceConnection | null>(null)
  const [testingId, setTestingId] = useState<string | null>(null)
  const [refreshConn, setRefreshConn] = useState<SourceConnection | null>(null)
  const [testResults, setTestResults] = useState<Record<string, 'ok' | 'error'>>({})
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [pendingReset, setPendingReset] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [errorMsg, setErrorMsg] = useState<{ title: string; description: string; action?: string } | null>(null)
  const [showConnBanner, setShowConnBanner] = useState(false)
  const [connDatasets, setConnDatasets] = useState<Record<string, ImportSession[]>>({})
  const [llmConfigExists, setLlmConfigExists] = useState(false)

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
          title: 'Configuration is in use',
          description: 'This configuration is used by one or more datasets. Delete those datasets first, then try again.',
          action: 'datasets',
        })
      } else {
        setErrorMsg({ title: 'Could not delete', description: msg })
      }
    }
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
      setErrorMsg({ title: 'Could not reset', description: e instanceof Error ? e.message : 'Error' })
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
      setErrorMsg({ title: 'Could not generate demo data', description: e instanceof Error ? e.message : 'Error' })
    }
    setSeeding(false)
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

  const confirmMeta: Record<PendingDelete['type'], { title: string; description: string }> = {
    config: { title: 'Delete configuration?', description: 'This cannot be undone. Existing datasets using this configuration will not be affected.' },
    import: { title: 'Delete dataset?', description: 'All imported tickets and metrics for this dataset will be permanently deleted.' },
    connection: { title: 'Delete connection?', description: 'Stored credentials will be removed. Existing datasets will not be affected.' },
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
                          s === config.cycle_time_start_status
                            ? 'bg-teal-50 border-teal-200 text-teal-700'
                            : s === config.cycle_time_end_status
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
            <Button onClick={() => { setEditConn(null); setDialogOpen(true) }} variant="outline" size="sm" className="gap-1.5 shrink-0">
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
            onCta={() => { setEditConn(null); setDialogOpen(true) }}
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
                      onClick={() => setRefreshConn(conn)}
                      disabled={!conn.project_key}
                      title={t('refresh.confirm')}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </IconBtn>
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
                    <IconBtn onClick={() => { setEditConn(conn); setDialogOpen(true) }} title={t('common.edit')}>
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
                <p className="text-xs text-gray-400 mt-1">
                  {conn.project_key && <span className="font-medium text-gray-500">{conn.project_key} · </span>}
                  {conn.base_url} · {conn.email}
                </p>
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

  function renderPlugins() {
    return (
      <>
        <SectionHeader
          title={t('settings.tabPlugins')}
          desc={t('settings.pluginsDesc')}
        />
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
              <Puzzle className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <p className="font-semibold text-gray-700 mb-1">{t('settings.pluginsComingSoon')}</p>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
            {t('settings.pluginsComingSoonDesc')}
          </p>
          <Button variant="outline" size="sm" disabled className="mt-4 gap-1.5 opacity-40">
            <Plus className="w-3.5 h-3.5" />
            {t('settings.browsePlugins')}
          </Button>
        </div>
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
      </>
    )
  }

  const contentMap: Record<Section, () => React.ReactNode> = {
    configs: renderConfigs,
    datasets: renderDatasets,
    'data-sources': renderDataSources,
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
          <NavGroup label={t('settings.navData')}>
            <NavItem id="configs" active={section === 'configs'} icon={Settings2} label={t('settings.tabConfigs')} count={configs.length} onClick={setSection} />
            <NavItem id="datasets" active={section === 'datasets'} icon={Database} label={t('settings.tabDatasets')} count={imports.length} onClick={setSection} />
          </NavGroup>
          <NavGroup label={t('settings.navIntegrations')}>
            <NavItem id="data-sources" active={section === 'data-sources'} icon={Link2} label={t('settings.navDataSources')} count={connections.length} onClick={setSection} />
            <NavItem id="plugins" active={section === 'plugins'} icon={Puzzle} label={t('settings.tabPlugins')} soon onClick={setSection} />
          </NavGroup>
          <NavGroup label="AI">
            <NavItem id="ai" active={section === 'ai'} icon={Bot} label={t('settings.tabAi')} dot={llmConfigExists} onClick={setSection} />
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
        open={dialogOpen}
        connection={editConn}
        onClose={() => setDialogOpen(false)}
        onSaved={(conn) => { handleSaved(conn); setDialogOpen(false) }}
      />

      {refreshConn && (
        <RefreshDialog
          open
          connection={refreshConn}
          onClose={() => setRefreshConn(null)}
        />
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
