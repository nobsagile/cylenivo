import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Sparkles, Wifi, WifiOff, RefreshCw, Bot, User, Send, Settings } from 'lucide-react'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import type { LLMInsight, LLMStatus, CycleTimesResponse, ReworkResponse } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

function MarkdownContent({ text }: { text: string }) {
  return (
    <div className="prose prose-sm prose-gray max-w-none
      [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-5 [&_h1]:mb-2
      [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:mt-4 [&_h2]:mb-2
      [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-gray-700 [&_h3]:mt-3 [&_h3]:mb-1.5
      [&_p]:text-sm [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0
      [&_ul]:text-sm [&_ul]:text-gray-700 [&_ul]:space-y-1 [&_ul]:mb-3 [&_ul]:pl-4
      [&_ol]:text-sm [&_ol]:text-gray-700 [&_ol]:space-y-1 [&_ol]:mb-3 [&_ol]:pl-4
      [&_li]:leading-relaxed
      [&_strong]:font-semibold [&_strong]:text-gray-900
      [&_code]:text-xs [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-gray-700
      [&_blockquote]:border-l-4 [&_blockquote]:border-blue-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
      [&_hr]:border-gray-200 [&_hr]:my-4
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
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [cycleData, setCycleData] = useState<CycleTimesResponse | null>(null)
  const [reworkData, setReworkData] = useState<ReworkResponse | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!importId) return
    api.metrics.cycleTimes(importId).then(setCycleData).catch(() => {})
    api.metrics.rework(importId).then(setReworkData).catch(() => {})
  }, [importId])

  useEffect(() => {
    api.llm.status()
      .then((s) => { setLlmStatus(s); setLlmStatusLoaded(true) })
      .catch(() => { setLlmStatus({ configured: false, provider: null, model: null, available: false }); setLlmStatusLoaded(true) })
  }, [])

  useEffect(() => {
    if (!importId) return
    api.llm.getInsight(importId).then(setInsight).catch(() => setInsight(null))
  }, [importId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, chatLoading])

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

  async function sendMessage() {
    const content = chatInput.trim()
    if (!content || !importId || chatLoading) return

    const userMsg: ChatMessage = { role: 'user', content }
    const newMessages = [...chatMessages, userMsg]
    setChatMessages(newMessages)
    setChatInput('')
    setChatLoading(true)

    try {
      const { reply } = await api.llm.chat(importId, newMessages)
      setChatMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch {
      setChatMessages([...newMessages, {
        role: 'assistant',
        content: '_Error: Could not get a response._',
      }])
    } finally {
      setChatLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const configured = llmStatus?.configured ?? false
  const available = llmStatus?.available ?? false

  // Build contextual suggestions from actual data
  const suggestions: string[] = []
  if (cycleData?.tickets.length) {
    const slowest = [...cycleData.tickets].sort((a, b) => b.cycle_time_days - a.cycle_time_days)[0]
    suggestions.push(`Why did ${slowest.external_id} take ${slowest.cycle_time_days} days?`)
  }
  if (metrics?.time_in_status) {
    const topStatus = Object.entries(metrics.time_in_status).sort((a, b) => b[1].mean_days - a[1].mean_days)[0]
    if (topStatus) suggestions.push(`Is "${topStatus[0]}" a bottleneck?`)
  }
  if (reworkData && reworkData.tickets_with_rework > 0) {
    suggestions.push(`What causes rework in our process?`)
  }
  if (suggestions.length < 3) suggestions.push('How can we improve our flow?')

  if (llmStatusLoaded && !configured) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('insights.title')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">AI-powered analysis of your flow metrics</p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <div className="p-3 rounded-xl bg-gray-100 mb-3">
            <Bot className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No AI model configured</p>
          <p className="text-gray-400 text-sm mt-1 max-w-xs">
            Configure an LLM in Settings → AI to enable analysis and chat.
          </p>
          <Button
            variant="outline"
            className="mt-4 gap-1.5"
            onClick={() => navigate('/settings', { state: { tab: 'ai' } })}
          >
            <Settings className="w-4 h-4" />
            Go to Settings → AI
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('insights.title')}</h2>
        <p className="text-sm text-gray-400 mt-0.5">AI-powered analysis of your flow metrics</p>
      </div>

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
              <span>
                <span className="font-semibold">{llmStatus?.provider}</span>
                {llmStatus?.model && (
                  <span className="ml-1.5 opacity-70 font-mono text-xs">— {llmStatus.model}</span>
                )}
              </span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 shrink-0" />
              <span>
                <span className="font-semibold">LLM not reachable</span>
                <span className="ml-1.5 opacity-70 text-xs">Check your configuration in Settings → AI</span>
              </span>
            </>
          )}
        </div>
      )}

      {/* Analysis section */}
      <div className="flex items-center gap-3">
        <Button onClick={runAnalysis} disabled={!available || analyzing} className="gap-2">
          {analyzing ? (
            <><RefreshCw className="w-4 h-4 animate-spin" />{t('insights.analyzing')}</>
          ) : insight ? (
            <><RefreshCw className="w-4 h-4" />Re-run Analysis</>
          ) : (
            <><Sparkles className="w-4 h-4" />{t('insights.runAnalysis')}</>
          )}
        </Button>
        {analyzing && <p className="text-sm text-gray-400">This may take a minute…</p>}
      </div>

      {insight && (
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
                <Bot className="w-4 h-4 text-blue-500" />
                Analysis
              </CardTitle>
              <div className="text-right">
                <p className="text-xs text-gray-400">{new Date(insight.generated_at).toLocaleString('de-DE')}</p>
                <p className="text-xs text-gray-400 font-mono">{insight.model_used}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <MarkdownContent text={insight.insight_text} />
          </CardContent>
        </Card>
      )}

      {!insight && !analyzing && available && (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <div className="p-3 rounded-xl bg-gray-100 mb-3">
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No analysis yet</p>
          <p className="text-gray-400 text-sm mt-1">Click "Run Analysis" to generate AI insights</p>
        </div>
      )}

      {/* Chat section */}
      {available && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-800">Chat with AI</h3>
            <span className="text-xs text-gray-400">Ask questions about your data</span>
          </div>

          <Card className="shadow-sm">
            {/* Messages */}
            <div className="flex flex-col gap-4 p-4 min-h-[200px] max-h-[500px] overflow-y-auto">
              {chatMessages.length === 0 && !chatLoading && (
                <div className="flex flex-col items-center justify-center flex-1 py-8 text-center">
                  <p className="text-sm text-gray-400">Ask anything about your flow metrics</p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center">
                    {suggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => { setChatInput(suggestion); inputRef.current?.focus() }}
                        className="text-xs h-7 rounded-full"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-100'
                  }`}>
                    {msg.role === 'user'
                      ? <User className="w-3.5 h-3.5 text-white" />
                      : <Bot className="w-3.5 h-3.5 text-gray-500" />
                    }
                  </div>
                  <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white text-sm'
                      : 'bg-gray-50 border border-gray-100'
                  }`}>
                    {msg.role === 'user'
                      ? <p className="text-sm leading-relaxed">{msg.content}</p>
                      : <MarkdownContent text={msg.content} />
                    }
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 p-3 border-t border-gray-100">
              <input
                ref={inputRef}
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question… (Enter to send)"
                disabled={chatLoading}
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              <Button
                size="sm"
                onClick={sendMessage}
                disabled={!chatInput.trim() || chatLoading}
                className="h-9 w-9 p-0 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
