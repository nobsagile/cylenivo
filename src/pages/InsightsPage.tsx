import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Sparkles, Wifi, WifiOff, RefreshCw, Bot, Settings, Info } from 'lucide-react'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import type { LLMInsight, LLMStatus } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ErrorBanner } from '@/components/ui/ErrorBanner'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { PageHeader } from '@/components/layout/PageHeader'

function MarkdownContent({ text }: { text: string }) {
  return (
    <div className="prose prose-sm prose-gray max-w-none
      [&_h1]:text-base [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-7 [&_h1]:mb-2 [&_h1]:pt-4 [&_h1]:border-t [&_h1]:border-gray-100 first:[&_h1]:mt-0 first:[&_h1]:pt-0 first:[&_h1]:border-0
      [&_h2]:text-sm [&_h2]:font-bold [&_h2]:text-violet-700 [&_h2]:mt-4 [&_h2]:mb-1.5
      [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-gray-400 [&_h3]:mt-3 [&_h3]:mb-1
      [&_p]:text-sm [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-2.5 [&_p:last-child]:mb-0
      [&_ul]:text-sm [&_ul]:text-gray-700 [&_ul]:space-y-1 [&_ul]:mb-2.5 [&_ul]:pl-4
      [&_ol]:text-sm [&_ol]:text-gray-700 [&_ol]:space-y-1 [&_ol]:mb-2.5 [&_ol]:pl-4
      [&_li]:leading-relaxed
      [&_strong]:font-semibold [&_strong]:text-gray-900
      [&_code]:text-xs [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-gray-700
      [&_blockquote]:border-l-4 [&_blockquote]:border-violet-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
      [&_hr]:border-gray-100 [&_hr]:my-5
    ">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  )
}

export default function InsightsPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const navigate = useNavigate()
  const { data: metrics } = useMetrics(importId)
  const [llmStatus, setLlmStatus] = useState<LLMStatus | null>(null)
  const [llmStatusLoaded, setLlmStatusLoaded] = useState(false)
  const [insight, setInsight] = useState<LLMInsight | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    api.llm.status()
      .then((s) => { setLlmStatus(s); setLlmStatusLoaded(true) })
      .catch(() => { setLlmStatus({ configured: false, provider: null, model: null, available: false }); setLlmStatusLoaded(true) })
  }, [])

  useEffect(() => {
    if (!importId) return
    api.llm.getInsight(importId).then(setInsight).catch(() => setInsight(null))
  }, [importId])

  async function runAnalysis() {
    if (!importId) return
    setAnalyzing(true)
    setStreamingText('')
    setErrorMsg(null)
    try {
      const result = await api.llm.analyze(importId, (token) => {
        setStreamingText(prev => prev + token)
      })
      setStreamingText('')
      setInsight(result)
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : String(e))
    } finally {
      setAnalyzing(false)
    }
  }

  const configured = llmStatus?.configured ?? false
  const available = llmStatus?.available ?? false

  if (llmStatusLoaded && !configured) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('insights.title')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{t('insights.subtitle')}</p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <div className="p-3 rounded-xl bg-gray-100 mb-3">
            <Bot className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">{t('insights.noLlm')}</p>
          <p className="text-gray-400 text-sm mt-1 max-w-xs">{t('insights.noLlmHint')}</p>
          <Button
            variant="outline"
            className="mt-4 gap-1.5"
            onClick={() => navigate('/settings', { state: { tab: 'ai' } })}
          >
            <Settings className="w-4 h-4" />
            {t('insights.goToSettings')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {metrics ? (
        <PageHeader
          view={t('nav.insights')}
          name={metrics.project_key}
          subtitle={t('insights.subtitle')}
          completed={metrics.completed_ticket_count}
          total={metrics.ticket_count}
          excluded={metrics.excluded_ticket_count}
        />
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('insights.title')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{t('insights.subtitle')}</p>
        </div>
      )}

      <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />

      {/* LLM status */}
      {llmStatusLoaded && (
        <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
          available
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          {available ? (
            <>
              <Wifi className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{llmStatus?.provider}</span>
              {llmStatus?.model && (
                <span className="opacity-60 font-mono text-xs">{llmStatus.model}</span>
              )}
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{t('insights.llmNotReachable')}</span>
              <span className="opacity-70 text-xs">{t('insights.checkConfig')}</span>
            </>
          )}
        </div>
      )}

      {/* Run Analysis */}
      <div className="flex items-center gap-2">
        <Button onClick={runAnalysis} disabled={!available || analyzing} className="gap-2">
          {analyzing ? (
            <><RefreshCw className="w-4 h-4 animate-spin" />{t('insights.analyzing')}</>
          ) : insight ? (
            <><RefreshCw className="w-4 h-4" />{t('insights.rerunAnalysis')}</>
          ) : (
            <><Sparkles className="w-4 h-4" />{t('insights.runAnalysis')}</>
          )}
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-300 hover:text-gray-500 transition-colors">
              <Info className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <p className="text-xs text-gray-600">{t('help.aiInsights')}</p>
          </PopoverContent>
        </Popover>
        {analyzing && <p className="text-sm text-gray-400">{t('insights.takesAMinute')}</p>}
      </div>

      {/* Streaming preview */}
      {analyzing && streamingText && (
        <Card className="shadow-sm opacity-80">
          <CardContent className="pt-5">
            <MarkdownContent text={streamingText} />
          </CardContent>
        </Card>
      )}

      {/* Analysis result */}
      {!analyzing && insight && (
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Bot className="w-4 h-4 text-violet-500" />
                {t('insights.analysis')}
              </CardTitle>
              <div className="text-right">
                <p className="text-xs text-gray-400">{new Date(insight.generated_at).toLocaleString()}</p>
                <p className="text-xs text-gray-400 font-mono">{insight.model_used}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <MarkdownContent text={insight.insight_text} />
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {!insight && !analyzing && !streamingText && available && (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <div className="p-3 rounded-xl bg-gray-100 mb-3">
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">{t('insights.noAnalysis')}</p>
          <p className="text-gray-400 text-sm mt-1">{t('insights.noAnalysisHint')}</p>
        </div>
      )}
    </div>
  )
}
