import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { api } from '@/services/api'
import { useOllamaStatus } from '@/hooks/useOllamaStatus'
import type { LLMInsight } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function InsightsPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { data: status } = useOllamaStatus()
  const [insight, setInsight] = useState<LLMInsight | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    if (!importId) return
    api.llm.getInsight(importId).then(setInsight).catch(() => setInsight(null))
  }, [importId])

  async function runAnalysis() {
    if (!importId) return
    setAnalyzing(true)
    try {
      const result = await api.llm.analyze(importId)
      setInsight(result)
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('insights.title')}</h2>

      <div className={`rounded px-4 py-2 text-sm mb-6 ${status?.available ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
        {status?.available ? (
          <span>✓ {t('insights.ollamaOnline')} – {status.recommended_model}</span>
        ) : (
          <span>⚠ {t('insights.ollamaOffline')} – <code>{t('insights.ollamaHint')}</code></span>
        )}
      </div>

      <Button
        onClick={runAnalysis}
        disabled={!status?.available || analyzing}
        className="mb-6"
      >
        {analyzing ? t('insights.analyzing') : (insight ? 'Re-run Analysis' : t('insights.runAnalysis'))}
      </Button>

      {insight && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Analysis by {insight.model_used}
              <span className="text-xs text-gray-400 ml-2 font-normal">
                {new Date(insight.generated_at).toLocaleString()}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {insight.insight_text}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
