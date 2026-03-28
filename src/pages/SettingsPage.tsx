import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Plus, Pencil, Trash2, ArrowRight, Settings2,
  Database, FileJson, Calendar, Ticket, Link2, CheckCircle2, XCircle, Loader2, ArrowRight as ArrowRightIcon,
  X, Bot, RefreshCw, ChevronDown, Info,
} from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { api } from '@/services/api'
import type { ProjectConfig, ImportSession, SourceConnection, LlmConfig } from '@/types'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ConnectionDialog from '@/components/connections/ConnectionDialog'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

interface PendingDelete {
  type: 'config' | 'import' | 'connection'
  id: string
  label: string
}

const DEFAULT_SYSTEM_PROMPT = 'You are a flow analysis expert for software development teams. Analyze flow metrics data and provide clear, actionable insights. Be specific with numbers and focus on what matters most to the team.'

const OPENAI_MODELS = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']

export default function SettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [configs, setConfigs] = useState<ProjectConfig[]>([])
  const [imports, setImports] = useState<ImportSession[]>([])
  const [connections, setConnections] = useState<SourceConnection[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editConn, setEditConn] = useState<SourceConnection | null>(null)
  const [testingId, setTestingId] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<Record<string, 'ok' | 'error'>>({})
  const [activeTab, setActiveTab] = useState((location.state as { tab?: string } | null)?.tab ?? 'configs')
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [pendingReset, setPendingReset] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [errorMsg, setErrorMsg] = useState<{ title: string; description: string; action?: string } | null>(null)
  const [showConnBanner, setShowConnBanner] = useState(false)

  // LLM config state
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

  async function handleDiscoverModels() {
    await loadModels(llmProvider, llmBaseUrl)
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
    } catch (e) {
      setErrorMsg({ title: 'Could not reset', description: e instanceof Error ? e.message : 'Error' })
    }
    setResetting(false)
  }

  async function handleSeedDemo() {
    setSeeding(true)
    try {
      const result = await api.demo.seed()
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
    if (isNew && connections.length === 0) {
      setShowConnBanner(true)
    }
  }

  const confirmMeta: Record<PendingDelete['type'], { title: string; description: string; label: string }> = {
    config: {
      title: 'Delete configuration?',
      description: 'This cannot be undone. Existing datasets using this configuration will not be affected.',
      label: 'Delete',
    },
    import: {
      title: 'Delete dataset?',
      description: 'All imported tickets and metrics for this dataset will be permanently deleted.',
      label: 'Delete',
    },
    connection: {
      title: 'Delete connection?',
      description: 'Stored credentials will be removed. Existing datasets will not be affected.',
      label: 'Delete',
    },
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('settings.title')}</h2>
        <p className="text-sm text-gray-400 mt-1">{t('settings.subtitle')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100 p-1 h-auto mb-6">
          <TabsTrigger value="configs" className="text-sm px-4 py-1.5 gap-1.5">
            <Settings2 className="w-3.5 h-3.5" />
            {t('settings.tabConfigs')}
            {configs.length > 0 && (
              <span className="ml-1 text-[11px] bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5 font-semibold">
                {configs.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="datasets" className="text-sm px-4 py-1.5 gap-1.5">
            <Database className="w-3.5 h-3.5" />
            {t('settings.tabDatasets')}
            {imports.length > 0 && (
              <span className="ml-1 text-[11px] bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5 font-semibold">
                {imports.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="connections" className="text-sm px-4 py-1.5 gap-1.5">
            <Link2 className="w-3.5 h-3.5" />
            {t('settings.tabConnections')}
            {connections.length > 0 && (
              <span className="ml-1 text-[11px] bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5 font-semibold">
                {connections.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-sm px-4 py-1.5 gap-1.5">
            <Bot className="w-3.5 h-3.5" />
            {t('settings.tabAi')}
            {llmConfig && (
              <span className="ml-1 w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            )}
          </TabsTrigger>
        </TabsList>

        {/* Configurations */}
        <TabsContent value="configs">
          <p className="text-xs text-gray-400 mb-5">
            {t('settings.configsDesc')}
          </p>
          {configs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
              <div className="p-3 rounded-xl bg-gray-100 mb-3">
                <Settings2 className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">{t('settings.noConfigs')}</p>
              <p className="text-gray-400 text-sm mt-1 max-w-xs">
                {t('settings.noConfigsHint')}
              </p>
              <Button onClick={() => navigate('/import')} variant="outline" className="mt-4 gap-1.5">
                <Plus className="w-4 h-4" />
                {t('settings.importData')}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {configs.map((config) => (
                <div
                  key={config.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{config.name}</p>
                      <span className="text-[11px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                        {config.source_type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                      <span className="font-medium text-gray-700">{config.cycle_time_start_status}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="font-medium text-gray-700">{config.cycle_time_end_status}</span>
                      <span className="text-gray-400 ml-0.5">{t('settings.cycleTime')}</span>
                    </div>
                    {config.status_order?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {config.status_order.map((s) => (
                          <span
                            key={s}
                            className={`text-[11px] px-1.5 py-0.5 rounded border font-medium ${
                              s === config.cycle_time_start_status
                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                : s === config.cycle_time_end_status
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-gray-50 border-gray-200 text-gray-500'
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/settings/configs/${config.id}`)}
                      className="gap-1.5 h-8"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      {t('common.edit')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteConfig(config.id, config.name)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Datasets */}
        <TabsContent value="datasets">
          <p className="text-xs text-gray-400 mb-5">
            {t('settings.datasetsDesc')}
          </p>
          <div className="flex justify-end mb-4">
            <Button onClick={() => navigate('/import')} variant="outline" className="gap-1.5">
              <Plus className="w-4 h-4" />
              {t('settings.newImport')}
            </Button>
          </div>

          {imports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
              <div className="p-3 rounded-xl bg-gray-100 mb-3">
                <Database className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">{t('settings.noDatasets')}</p>
              <p className="text-gray-400 text-sm mt-1">{t('settings.noDatasetsHint')}</p>
              <Button onClick={() => navigate('/import')} variant="outline" className="mt-4 gap-1.5">
                <Plus className="w-4 h-4" />
                {t('settings.importData')}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {imports.map((imp) => (
                <div
                  key={imp.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 shrink-0">
                    <FileJson className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{imp.project_key}</p>
                      {imp.config_name && (
                        <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                          {imp.config_name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Ticket className="w-3 h-3" />
                        {imp.ticket_count} tickets
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(imp.imported_at).toLocaleString('de-DE')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/projects/${imp.id}`)}
                      className="h-8 text-xs"
                    >
                      {t('common.open')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteImport(imp.id, `${imp.project_key} · ${new Date(imp.imported_at).toLocaleDateString('de-DE')}`)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Connections */}
        <TabsContent value="connections">
          <p className="text-xs text-gray-400 mb-4">
            {t('settings.connectionsDesc')}
          </p>

          {/* Post-save banner */}
          {showConnBanner && (
            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 mb-5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex-1 text-sm text-emerald-800">
                <span className="font-semibold">{t('settings.connectionAdded')}</span>
                {' '}{t('settings.connectionAddedHint')}
              </div>
              <Button
                size="sm"
                onClick={() => navigate('/import')}
                className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white h-8 shrink-0"
              >
                {t('settings.importData')}
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Button>
              <button
                onClick={() => setShowConnBanner(false)}
                className="text-emerald-500 hover:text-emerald-700 shrink-0 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex justify-end mb-4">
            <Button
              onClick={() => { setEditConn(null); setDialogOpen(true) }}
              variant="outline"
              className="gap-1.5"
            >
              <Plus className="w-4 h-4" />
              {t('settings.addConnection')}
            </Button>
          </div>

          {connections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
              <div className="p-3 rounded-xl bg-gray-100 mb-3">
                <Link2 className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">{t('settings.noConnections')}</p>
              <p className="text-gray-400 text-sm mt-1 max-w-xs">
                {t('settings.noConnectionsHint')}
              </p>
              <Button
                onClick={() => { setEditConn(null); setDialogOpen(true) }}
                variant="outline"
                className="mt-4 gap-1.5"
              >
                <Plus className="w-4 h-4" />
                {t('settings.addConnection')}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {connections.map((conn) => (
                <div
                  key={conn.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 shrink-0">
                    <Link2 className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{conn.name}</p>
                      <span className="text-[11px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-blue-100 text-blue-600">
                        {conn.source_type}
                      </span>
                      {testResults[conn.id] === 'ok' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                      {testResults[conn.id] === 'error' && (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{conn.base_url} · {conn.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestConnection(conn.id)}
                      disabled={testingId === conn.id}
                      className="h-8 text-xs gap-1"
                    >
                      {testingId === conn.id && <Loader2 className="w-3 h-3 animate-spin" />}
                      {t('common.test')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { setEditConn(conn); setDialogOpen(true) }}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteConnection(conn.id, conn.name)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* AI */}
        <TabsContent value="ai">
          <p className="text-xs text-gray-400 mb-5">
            {t('settings.aiDesc')}
          </p>

          {llmLoaded && (
            <div className="space-y-5">
              {/* Active config banner */}
              {llmConfig && (
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex-1 text-sm text-emerald-800">
                    <span className="font-semibold">{llmConfig.provider}</span>
                    <span className="mx-1.5 opacity-50">·</span>
                    <span className="font-mono text-xs">{llmConfig.model}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLlmDisconnect}
                    className="h-8 text-xs text-red-500 hover:text-red-700 hover:border-red-300 shrink-0"
                  >
                    {t('common.disconnect')}
                  </Button>
                </div>
              )}

              {/* Provider selector */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <label className="text-xs font-semibold text-gray-600">{t('settings.provider')}</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-300 hover:text-gray-500 transition-colors">
                        <Info className="w-3 h-3" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="text-xs text-gray-600">
                        <p>{t('help.llmProvider')}</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex gap-2">
                  {(['ollama', 'openai', 'openai_compatible'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => handleLlmProviderChange(p)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                        llmProvider === p
                          ? 'bg-blue-50 text-blue-700 border-blue-300'
                          : 'bg-white text-gray-500 border-gray-200 hover:text-gray-700'
                      }`}
                    >
                      {p === 'openai_compatible' ? 'OpenAI compatible' : p === 'openai' ? 'OpenAI' : 'Ollama'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Base URL */}
              {(llmProvider === 'ollama' || llmProvider === 'openai_compatible') && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <label className="text-xs font-semibold text-gray-600">
                      {llmProvider === 'ollama' ? t('settings.ollamaUrl') : t('settings.baseUrl')}
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="text-gray-300 hover:text-gray-500 transition-colors">
                          <Info className="w-3 h-3" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64">
                        <div className="text-xs text-gray-600">
                          <p>{t('help.llmBaseUrl')}</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <input
                    type="text"
                    value={llmBaseUrl}
                    onChange={(e) => setLlmBaseUrl(e.target.value)}
                    placeholder={llmProvider === 'ollama' ? 'http://localhost:11434' : 'https://your-api.example.com'}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* API key */}
              {(llmProvider === 'openai' || llmProvider === 'openai_compatible') && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {t('settings.apiKey')} {llmConfig?.key_set && <span className="font-normal text-emerald-600">· {t('settings.apiKeySaved')}</span>}
                  </label>
                  <input
                    type="password"
                    value={llmApiKey}
                    onChange={(e) => setLlmApiKey(e.target.value)}
                    placeholder={llmConfig?.key_set ? `••••••••  (${t('settings.apiKeyKeepHint')})` : 'sk-...'}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Model */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-600">{t('settings.model')}</label>
                  {llmProvider === 'ollama' && (
                    <button
                      onClick={handleDiscoverModels}
                      disabled={llmModelsLoading}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 disabled:opacity-50"
                    >
                      {llmModelsLoading
                        ? <><RefreshCw className="w-3 h-3 animate-spin" />{t('settings.discovering')}</>
                        : <><RefreshCw className="w-3 h-3" />{t('settings.discoverModels')}</>
                      }
                    </button>
                  )}
                </div>
                {llmModels.length > 0 ? (
                  <div className="relative">
                    <select
                      value={llmModel}
                      onChange={(e) => setLlmModel(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      {llmModels.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                ) : (
                  <input
                    type="text"
                    value={llmModel}
                    onChange={(e) => setLlmModel(e.target.value)}
                    placeholder={llmProvider === 'ollama' ? 'e.g. qwen3:14b (click Discover)' : 'e.g. gpt-4o'}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>

              {/* System prompt */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <label className="text-xs font-semibold text-gray-600">{t('settings.systemPrompt')}</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-300 hover:text-gray-500 transition-colors">
                        <Info className="w-3 h-3" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="text-xs text-gray-600">
                        <p>{t('help.llmSystemPrompt')}</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <textarea
                  value={llmSystemPrompt}
                  onChange={(e) => setLlmSystemPrompt(e.target.value)}
                  rows={4}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                />
                <button
                  onClick={() => setLlmSystemPrompt(DEFAULT_SYSTEM_PROMPT)}
                  className="mt-1 text-xs text-gray-400 hover:text-gray-600"
                >
                  {t('settings.resetToDefault')}
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleLlmSave}
                  disabled={llmSaving || !llmModel}
                  className="gap-1.5"
                >
                  {llmSaving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />{t('common.saving')}</> : t('common.save')}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLlmTest}
                  disabled={llmTesting || !llmConfig}
                  className="gap-1.5"
                >
                  {llmTesting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />{t('settings.testing')}</> : t('settings.testConnection')}
                </Button>
                {llmTestResult === 'ok' && (
                  <span className="flex items-center gap-1 text-sm text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />{t('common.connected')}
                  </span>
                )}
                {llmTestResult === 'error' && (
                  <span className="flex items-center gap-1 text-sm text-red-500">
                    <XCircle className="w-4 h-4" />{t('common.notReachable')}
                  </span>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Data Management */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">{t('settings.dataManagement')}</h3>
        <p className="text-xs text-gray-400 mb-4">
          {t('settings.dataManagementDesc')}
        </p>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={resetting || configs.length === 0}
            onClick={() => setPendingReset(true)}
            className="gap-1.5 text-red-500 hover:text-red-700 hover:border-red-300"
          >
            {resetting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            {t('settings.deleteEverything')}
          </Button>
          {imports.length === 0 && (
            <Button
              variant="outline"
              size="sm"
              disabled={seeding}
              onClick={handleSeedDemo}
              className="gap-1.5"
            >
              {seeding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              {t('settings.generateDemo')}
            </Button>
          )}
        </div>
      </div>

      <ConnectionDialog
        open={dialogOpen}
        connection={editConn}
        onClose={() => setDialogOpen(false)}
        onSaved={(conn) => {
          handleSaved(conn)
          setDialogOpen(false)
        }}
      />

      {pendingDelete && (
        <ConfirmDialog
          open
          title={confirmMeta[pendingDelete.type].title}
          description={confirmMeta[pendingDelete.type].description}
          confirmLabel={confirmMeta[pendingDelete.type].label}
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
          onConfirm={errorMsg.action === 'datasets' ? () => { setErrorMsg(null); setActiveTab('datasets') } : undefined}
          onCancel={() => setErrorMsg(null)}
        />
      )}
    </div>
  )
}
