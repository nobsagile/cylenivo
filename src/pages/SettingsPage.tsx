import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Plus, Pencil, Trash2, ArrowRight, Settings2,
  Database, FileJson, Calendar, Ticket, Link2, CheckCircle2, XCircle, Loader2,
  X, Bot, RefreshCw, ChevronDown, Info, Puzzle, Globe,
} from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { api } from '@/services/api'
import type { ProjectConfig, ImportSession, SourceConnection, LlmConfig } from '@/types'
import { Button } from '@/components/ui/button'
import ConnectionDialog from '@/components/connections/ConnectionDialog'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { notifyImportsChanged } from '@/hooks/useImports'

type Section = 'configs' | 'datasets' | 'connections' | 'plugins' | 'ai' | 'language' | 'data-management'

interface PendingDelete {
  type: 'config' | 'import' | 'connection'
  id: string
  label: string
}

const DEFAULT_SYSTEM_PROMPT = 'You are a flow analysis expert for software development teams. Analyze flow metrics data and provide clear, actionable insights. Be specific with numbers and focus on what matters most to the team.'
const OPENAI_MODELS = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']

function resolveInitialSection(state: unknown): Section {
  const s = state as { tab?: string; section?: string } | null
  const raw = s?.section ?? s?.tab ?? 'configs'
  const valid: Section[] = ['configs', 'datasets', 'connections', 'plugins', 'ai', 'language', 'data-management']
  return valid.includes(raw as Section) ? (raw as Section) : 'configs'
}

// ── Shared empty state ────────────────────────────────────────────────────────
function EmptyState({ icon: Icon, title, hint, ctaLabel, onCta }: {
  icon: React.ElementType
  title: string
  hint: string
  ctaLabel?: string
  onCta?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center border-2 border-dashed border-gray-200 rounded-xl">
      <Icon className="w-8 h-8 text-gray-300 mb-3" />
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">{hint}</p>
      {ctaLabel && onCta && (
        <Button onClick={onCta} variant="outline" size="sm" className="mt-4 gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          {ctaLabel}
        </Button>
      )}
    </div>
  )
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ title, desc, action }: {
  title: string
  desc: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed max-w-sm">{desc}</p>
      </div>
      {action}
    </div>
  )
}

// ── Uniform card wrapper ──────────────────────────────────────────────────────
function Card({ icon: Icon, children, actions }: {
  icon: React.ElementType
  children: React.ReactNode
  actions: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
      <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
      <div className="flex items-center gap-1.5 shrink-0">{actions}</div>
    </div>
  )
}

function IconBtn({ onClick, disabled, danger, title, children }: {
  onClick?: () => void
  disabled?: boolean
  danger?: boolean
  title?: string
  children: React.ReactNode
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`h-8 w-8 p-0 ${danger ? 'text-red-500 hover:text-red-700 hover:border-red-300' : ''}`}
    >
      {children}
    </Button>
  )
}

// ── Left nav ──────────────────────────────────────────────────────────────────
function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-1">{label}</p>
      {children}
    </div>
  )
}

function NavItem({ id, active, icon: Icon, label, count, dot, soon, onClick }: {
  id: Section
  active: boolean
  icon: React.ElementType
  label: string
  count?: number
  dot?: boolean
  soon?: boolean
  onClick: (id: Section) => void
}) {
  return (
    <button
      onClick={() => !soon && onClick(id)}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left ${
        soon
          ? 'opacity-40 cursor-not-allowed text-gray-500'
          : active
          ? 'bg-gray-100 text-gray-900 font-medium'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="flex-1 truncate">{label}</span>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
      {!dot && count != null && count > 0 && (
        <span className="text-[10px] bg-gray-200 text-gray-600 rounded-full px-1.5 font-semibold shrink-0">{count}</span>
      )}
      {soon && <span className="text-[9px] font-semibold uppercase tracking-wide bg-gray-100 text-gray-400 px-1 rounded shrink-0">soon</span>}
    </button>
  )
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
  const [testResults, setTestResults] = useState<Record<string, 'ok' | 'error'>>({})
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [pendingReset, setPendingReset] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [errorMsg, setErrorMsg] = useState<{ title: string; description: string; action?: string } | null>(null)
  const [showConnBanner, setShowConnBanner] = useState(false)

  const [llmConfig, setLlmConfig] = useState<LlmConfig | null>(null)
  const [llmLoaded, setLlmLoaded] = useState(false)
  const [llmProvider, setLlmProvider] = useState<'ollama' | 'openai' | 'openai_compatible'>('ollama')
  const [llmBaseUrl, setLlmBaseUrl] = useState('http://localhost:11434')
  const [llmApiKey, setLlmApiKey] = useState('')
  const [llmModel, setLlmModel] = useState('')
  const [llmSystemPrompt, setLlmSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT)
  const [llmModels, setLlmModels] = useState<string[]>([])
  const [llmModelsLoading, setLlmModelsLoading] = useState(false)
  const [llmSaving, setLlmSaving] = useState(false)
  const [llmTestResult, setLlmTestResult] = useState<'ok' | 'error' | null>(null)
  const [llmTesting, setLlmTesting] = useState(false)

  useEffect(() => {
    api.configs.list().then(setConfigs).catch(console.error)
    api.imports.list().then(setImports).catch(console.error)
    api.connections.list().then(setConnections).catch(console.error)
    api.llmConfig.get().then((cfg) => {
      setLlmLoaded(true)
      if (cfg) {
        setLlmConfig(cfg)
        setLlmProvider(cfg.provider)
        setLlmBaseUrl(cfg.base_url ?? (cfg.provider === 'ollama' ? 'http://localhost:11434' : ''))
        setLlmModel(cfg.model)
        setLlmSystemPrompt(cfg.system_prompt)
      }
    }).catch(console.error)
  }, [])

  const loadModels = useCallback(async (provider: typeof llmProvider, baseUrl: string) => {
    setLlmModelsLoading(true)
    setLlmModels([])
    try {
      if (provider === 'ollama') {
        const { models } = await api.llmConfig.ollamaModels(baseUrl)
        setLlmModels(models)
        if (models.length && !llmModel) setLlmModel(models[0])
      } else {
        setLlmModels(OPENAI_MODELS)
        if (!llmModel) setLlmModel(OPENAI_MODELS[0])
      }
    } catch { /* ignore */ }
    setLlmModelsLoading(false)
  }, [llmModel])

  async function handleLlmProviderChange(p: typeof llmProvider) {
    setLlmProvider(p)
    setLlmModel('')
    setLlmTestResult(null)
    const defaultUrl = p === 'ollama' ? 'http://localhost:11434' : ''
    setLlmBaseUrl(defaultUrl)
    await loadModels(p, defaultUrl)
  }

  async function handleLlmSave() {
    setLlmSaving(true)
    try {
      const saved = await api.llmConfig.save({
        provider: llmProvider,
        base_url: llmBaseUrl || undefined,
        api_key: llmApiKey || undefined,
        model: llmModel,
        system_prompt: llmSystemPrompt,
      })
      setLlmConfig(saved)
      setLlmApiKey('')
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error saving')
    }
    setLlmSaving(false)
  }

  async function handleLlmDisconnect() {
    await api.llmConfig.delete()
    setLlmConfig(null)
    setLlmProvider('ollama')
    setLlmBaseUrl('http://localhost:11434')
    setLlmApiKey('')
    setLlmModel('')
    setLlmSystemPrompt(DEFAULT_SYSTEM_PROMPT)
    setLlmModels([])
    setLlmTestResult(null)
  }

  async function handleLlmTest() {
    setLlmTesting(true)
    setLlmTestResult(null)
    try {
      const status = await api.llm.status()
      setLlmTestResult(status.available ? 'ok' : 'error')
    } catch {
      setLlmTestResult('error')
    }
    setLlmTesting(false)
  }

  async function handleDeleteConfig(id: string, name: string) {
    setPendingDelete({ type: 'config', id, label: name })
  }

  async function handleDeleteImport(id: string, label: string) {
    setPendingDelete({ type: 'import', id, label })
  }

  async function handleDeleteConnection(id: string, name: string) {
    setPendingDelete({ type: 'connection', id, label: name })
  }

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

  // ── Content ────────────────────────────────────────────────────────────────

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
                    <IconBtn danger onClick={() => handleDeleteConfig(config.id, config.name)} title={t('common.delete')}>
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
                    <IconBtn danger onClick={() => handleDeleteImport(imp.id, imp.name ?? imp.project_key)} title={t('common.delete')}>
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

  function renderConnections() {
    return (
      <>
        <SectionHeader
          title={t('settings.tabConnections')}
          desc={t('settings.connectionsDesc')}
          action={
            <Button onClick={() => { setEditConn(null); setDialogOpen(true) }} variant="outline" size="sm" className="gap-1.5 shrink-0">
              <Plus className="w-3.5 h-3.5" />
              {t('settings.addConnection')}
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
            title={t('settings.noConnections')}
            hint={t('settings.noConnectionsHint')}
            ctaLabel={t('settings.addConnection')}
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
                      onClick={() => handleTestConnection(conn.id)}
                      disabled={testingId === conn.id}
                      title={t('common.test')}
                    >
                      {testingId === conn.id
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <RefreshCw className="w-3.5 h-3.5" />}
                    </IconBtn>
                    <IconBtn onClick={() => { setEditConn(conn); setDialogOpen(true) }} title={t('common.edit')}>
                      <Pencil className="w-3.5 h-3.5" />
                    </IconBtn>
                    <IconBtn danger onClick={() => handleDeleteConnection(conn.id, conn.name)} title={t('common.delete')}>
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

  function renderAi() {
    return (
      <>
        <SectionHeader title={t('settings.tabAi')} desc={t('settings.aiDesc')} />
        {llmLoaded && (
          <div className="space-y-5">
            {llmConfig && (
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="flex-1 text-sm text-emerald-800">
                  <span className="font-semibold">{llmConfig.provider}</span>
                  <span className="mx-1.5 opacity-50">·</span>
                  <span className="font-mono text-xs">{llmConfig.model}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLlmDisconnect}
                  className="h-8 text-xs text-red-500 hover:text-red-700 hover:border-red-300 shrink-0">
                  {t('common.disconnect')}
                </Button>
              </div>
            )}

            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <label className="text-xs font-semibold text-gray-600">{t('settings.provider')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-gray-300 hover:text-gray-500 transition-colors"><Info className="w-3 h-3" /></button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64"><p className="text-xs text-gray-600">{t('help.llmProvider')}</p></PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2">
                {(['ollama', 'openai', 'openai_compatible'] as const).map((p) => (
                  <button key={p} onClick={() => handleLlmProviderChange(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      llmProvider === p ? 'bg-violet-50 text-violet-700 border-violet-300' : 'bg-white text-gray-500 border-gray-200 hover:text-gray-700'
                    }`}>
                    {p === 'openai_compatible' ? 'OpenAI compatible' : p === 'openai' ? 'OpenAI' : 'Ollama'}
                  </button>
                ))}
              </div>
            </div>

            {(llmProvider === 'ollama' || llmProvider === 'openai_compatible') && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <label className="text-xs font-semibold text-gray-600">
                    {llmProvider === 'ollama' ? t('settings.ollamaUrl') : t('settings.baseUrl')}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-300 hover:text-gray-500 transition-colors"><Info className="w-3 h-3" /></button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64"><p className="text-xs text-gray-600">{t('help.llmBaseUrl')}</p></PopoverContent>
                  </Popover>
                </div>
                <input type="text" value={llmBaseUrl} onChange={(e) => setLlmBaseUrl(e.target.value)}
                  placeholder={llmProvider === 'ollama' ? 'http://localhost:11434' : 'https://your-api.example.com'}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
              </div>
            )}

            {(llmProvider === 'openai' || llmProvider === 'openai_compatible') && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  {t('settings.apiKey')} {llmConfig?.key_set && <span className="font-normal text-emerald-600">· {t('settings.apiKeySaved')}</span>}
                </label>
                <input type="password" value={llmApiKey} onChange={(e) => setLlmApiKey(e.target.value)}
                  placeholder={llmConfig?.key_set ? `•••••••• (${t('settings.apiKeyKeepHint')})` : 'sk-...'}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-600">{t('settings.model')}</label>
                {llmProvider === 'ollama' && (
                  <button onClick={() => loadModels(llmProvider, llmBaseUrl)} disabled={llmModelsLoading}
                    className="text-xs text-violet-600 hover:text-violet-800 flex items-center gap-1 disabled:opacity-50">
                    <RefreshCw className={`w-3 h-3 ${llmModelsLoading ? 'animate-spin' : ''}`} />
                    {llmModelsLoading ? t('settings.discovering') : t('settings.discoverModels')}
                  </button>
                )}
              </div>
              {llmModels.length > 0 ? (
                <div className="relative">
                  <select value={llmModel} onChange={(e) => setLlmModel(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none bg-white">
                    {llmModels.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              ) : (
                <input type="text" value={llmModel} onChange={(e) => setLlmModel(e.target.value)}
                  placeholder={llmProvider === 'ollama' ? 'e.g. qwen3:14b (click Discover)' : 'e.g. gpt-4o'}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <label className="text-xs font-semibold text-gray-600">{t('settings.systemPrompt')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-gray-300 hover:text-gray-500 transition-colors"><Info className="w-3 h-3" /></button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64"><p className="text-xs text-gray-600">{t('help.llmSystemPrompt')}</p></PopoverContent>
                </Popover>
              </div>
              <textarea value={llmSystemPrompt} onChange={(e) => setLlmSystemPrompt(e.target.value)} rows={4}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-y" />
              <button onClick={() => setLlmSystemPrompt(DEFAULT_SYSTEM_PROMPT)}
                className="mt-1 text-xs text-gray-400 hover:text-gray-600">
                {t('settings.resetToDefault')}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleLlmSave} disabled={llmSaving || !llmModel} className="gap-1.5">
                {llmSaving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />{t('common.saving')}</> : t('common.save')}
              </Button>
              <Button variant="outline" onClick={handleLlmTest} disabled={llmTesting || !llmConfig} className="gap-1.5">
                {llmTesting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />{t('settings.testing')}</> : t('settings.testConnection')}
              </Button>
              {llmTestResult === 'ok' && <span className="flex items-center gap-1 text-sm text-emerald-600"><CheckCircle2 className="w-4 h-4" />{t('common.connected')}</span>}
              {llmTestResult === 'error' && <span className="flex items-center gap-1 text-sm text-red-500"><XCircle className="w-4 h-4" />{t('common.notReachable')}</span>}
            </div>
          </div>
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
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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
    connections: renderConnections,
    plugins: renderPlugins,
    ai: renderAi,
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
            <NavItem id="connections" active={section === 'connections'} icon={Link2} label={t('settings.tabConnections')} count={connections.length} onClick={setSection} />
            <NavItem id="plugins" active={section === 'plugins'} icon={Puzzle} label={t('settings.tabPlugins')} soon onClick={setSection} />
          </NavGroup>
          <NavGroup label="AI">
            <NavItem id="ai" active={section === 'ai'} icon={Bot} label={t('settings.tabAi')} dot={!!llmConfig} onClick={setSection} />
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
