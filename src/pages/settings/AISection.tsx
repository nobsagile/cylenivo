import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, XCircle, Loader2, ChevronDown, Info, RefreshCw } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { api } from '@/services/api'
import type { LlmConfig } from '@/types'
import { Button } from '@/components/ui/button'
import { SectionHeader } from './shared'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

const OPENAI_MODELS = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']

interface Props {
  onConfigChange?: (config: LlmConfig | null) => void
}

export function AISection({ onConfigChange }: Props) {
  const { t } = useTranslation()

  const [llmConfig, setLlmConfig] = useState<LlmConfig | null>(null)
  const [llmLoaded, setLlmLoaded] = useState(false)
  const [llmProvider, setLlmProvider] = useState<'ollama' | 'openai' | 'openai_compatible'>('ollama')
  const [llmBaseUrl, setLlmBaseUrl] = useState('http://localhost:11434')
  const [llmApiKey, setLlmApiKey] = useState('')
  const [llmModel, setLlmModel] = useState('')
  const [llmModels, setLlmModels] = useState<string[]>([])
  const [llmModelsLoading, setLlmModelsLoading] = useState(false)
  const [llmSaving, setLlmSaving] = useState(false)
  const [llmTestResult, setLlmTestResult] = useState<'ok' | 'error' | null>(null)
  const [llmTesting, setLlmTesting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    api.llmConfig.get().then((cfg) => {
      setLlmLoaded(true)
      if (cfg) {
        setLlmConfig(cfg)
        setLlmProvider(cfg.provider)
        setLlmBaseUrl(cfg.base_url ?? (cfg.provider === 'ollama' ? 'http://localhost:11434' : ''))
        setLlmModel(cfg.model)
      }
    }).catch(console.error)
  }, [])

  const loadModels = useCallback(async (provider: typeof llmProvider, baseUrl: string, currentModel?: string) => {
    setLlmModelsLoading(true)
    setLlmModels([])
    try {
      if (provider === 'ollama') {
        const { models } = await api.llmConfig.ollamaModels(baseUrl)
        setLlmModels(models)
        if (models.length && !currentModel) setLlmModel(models[0])
      } else {
        setLlmModels(OPENAI_MODELS)
        if (!currentModel) setLlmModel(OPENAI_MODELS[0])
      }
    } catch { /* ignore */ }
    setLlmModelsLoading(false)
  }, [])

  async function handleProviderChange(p: typeof llmProvider) {
    setLlmProvider(p)
    setLlmModel('')
    setLlmTestResult(null)
    const defaultUrl = p === 'ollama' ? 'http://localhost:11434' : ''
    setLlmBaseUrl(defaultUrl)
    await loadModels(p, defaultUrl, '')
  }

  async function handleSave() {
    setLlmSaving(true)
    try {
      const saved = await api.llmConfig.save({
        provider: llmProvider,
        base_url: llmBaseUrl || undefined,
        api_key: llmApiKey || undefined,
        model: llmModel,
      })
      setLlmConfig(saved)
      setLlmApiKey('')
      onConfigChange?.(saved)
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Error saving')
    }
    setLlmSaving(false)
  }

  async function handleDisconnect() {
    await api.llmConfig.delete()
    setLlmConfig(null)
    setLlmProvider('ollama')
    setLlmBaseUrl('http://localhost:11434')
    setLlmApiKey('')
    setLlmModel('')
    setLlmModels([])
    setLlmTestResult(null)
    onConfigChange?.(null)
  }

  async function handleTest() {
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

  return (
    <>
      <SectionHeader title={t('settings.tabAi')} desc={t('settings.aiDesc')} />
      <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />
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
              <Button variant="outline" size="sm" onClick={handleDisconnect}
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
                <button key={p} onClick={() => handleProviderChange(p)}
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
                <button onClick={() => loadModels(llmProvider, llmBaseUrl, llmModel)} disabled={llmModelsLoading}
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

          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={llmSaving || !llmModel} className="gap-1.5">
              {llmSaving ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />{t('common.saving')}</> : t('common.save')}
            </Button>
            <Button variant="outline" onClick={handleTest} disabled={llmTesting || !llmConfig} className="gap-1.5">
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
