import { useEffect, useState, useRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, ExternalLink, ChevronUp, ChevronDown, Ban, Undo2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { api } from '@/services/api'
import type { TicketDetail, ConfigContext } from '@/types'
import { TYPE_COLORS } from '@/lib/statusColors'
import { TicketTimeline } from './TicketTimeline'

interface Props {
  ticketId: string | null
  config: ConfigContext | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
  onExclusionToggle?: (ticketId: string, excluded: boolean) => void
}

export function TicketDetailDrawer({ ticketId, config, onClose, onPrev, onNext, hasPrev, hasNext, onExclusionToggle }: Props) {
  const { t } = useTranslation()
  const [detail, setDetail] = useState<TicketDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [excludeLoading, setExcludeLoading] = useState(false)
  const [slideDir, setSlideDir] = useState<'up' | 'down' | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const prevTicketId = useRef<string | null>(null)

  useEffect(() => {
    if (!ticketId) { setDetail(null); return }
    setLoading(true)
    setDetail(null)
    api.tickets.get(ticketId)
      .then(setDetail)
      .catch(console.error)
      .finally(() => setLoading(false))
    prevTicketId.current = ticketId
  }, [ticketId])

  async function handleExclusionToggle() {
    if (!detail || excludeLoading) return
    const newExcluded = !detail.excluded
    setDetail(prev => prev ? { ...prev, excluded: newExcluded, exclusion_reason: newExcluded ? prev.exclusion_reason : null } : prev)
    onExclusionToggle?.(detail.id, newExcluded)
    setExcludeLoading(true)
    try {
      const updated = await api.tickets.update(detail.id, { excluded: newExcluded })
      setDetail(updated)
    } catch (e) {
      console.error(e)
      setDetail(prev => prev ? { ...prev, excluded: detail.excluded, exclusion_reason: detail.exclusion_reason } : prev)
      onExclusionToggle?.(detail.id, detail.excluded)
    } finally {
      setExcludeLoading(false)
    }
  }

  function navigate(dir: 'up' | 'down', fn?: () => void) {
    if (!fn) return
    setSlideDir(dir)
    setAnimKey(k => k + 1)
    fn()
  }

  useEffect(() => {
    if (!ticketId || (!onPrev && !onNext)) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowUp' && hasPrev) { e.preventDefault(); navigate('up', onPrev) }
      if (e.key === 'ArrowDown' && hasNext) { e.preventDefault(); navigate('down', onNext) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [ticketId, onPrev, onNext, hasPrev, hasNext])

  return (
    <DialogPrimitive.Root open={ticketId !== null} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[110] bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed right-0 top-0 z-[120] h-full w-[520px] max-w-[95vw] bg-white shadow-xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-200"
          aria-describedby={undefined}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
            <div className="min-w-0 flex-1">
              {detail ? (
                <>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {detail.external_link ? (
                      <a
                        href={detail.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-800"
                      >
                        {detail.external_id}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-violet-600">{detail.external_id}</span>
                    )}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${TYPE_COLORS[detail.ticket_type] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                      {t(`tickets.types.${detail.ticket_type}`, { defaultValue: detail.ticket_type })}
                    </span>
                  </div>
                  <DialogPrimitive.Title className="text-sm font-medium text-gray-800 leading-snug">
                    {detail.title}
                  </DialogPrimitive.Title>
                  <div className="flex items-center gap-3 mt-2">
                    {detail.cycle_time_days != null && (
                      <span className="text-xs text-teal-700 font-medium tabular-nums">
                        {t('metrics.cycleTime')}: {detail.cycle_time_days}d
                      </span>
                    )}
                    {detail.lead_time_days != null && (
                      <span className="text-xs text-violet-700 font-medium tabular-nums">
                        {t('metrics.leadTime')}: {detail.lead_time_days}d
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <DialogPrimitive.Title className="text-sm font-medium text-gray-400">
                  {loading ? t('common.loading') : '—'}
                </DialogPrimitive.Title>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {detail && (
                <button
                  onClick={handleExclusionToggle}
                  disabled={excludeLoading}
                  title={detail.excluded ? t('tickets.reinclude') : t('tickets.exclude')}
                  className={`p-1.5 rounded transition-colors disabled:opacity-40 ${
                    detail.excluded
                      ? 'text-amber-600 hover:text-amber-800 hover:bg-amber-50'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {detail.excluded ? <Undo2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                </button>
              )}
              {onPrev && onNext && (
                <div className="flex flex-col">
                  <button
                    onClick={() => navigate('up', onPrev)}
                    disabled={!hasPrev}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    title="Previous (↑)"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('down', onNext)}
                    disabled={!hasNext}
                    className="text-gray-400 hover:text-gray-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    title="Next (↓)"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
              <DialogPrimitive.Close
                className="text-gray-400 hover:text-gray-600 transition-colors ml-1"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </DialogPrimitive.Close>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden relative">
            <div
              key={animKey}
              className="absolute inset-0 overflow-y-auto px-5 py-4"
              style={{
                animation: slideDir
                  ? `slideIn${slideDir === 'up' ? 'Up' : 'Down'} 200ms ease-out both`
                  : undefined,
              }}
              onAnimationEnd={() => setSlideDir(null)}
            >
              {loading && (
                <div className="space-y-3">
                  <div className="h-8 bg-gray-100 rounded animate-pulse" />
                  <div className="h-24 bg-gray-50 rounded animate-pulse" />
                </div>
              )}
              {detail?.excluded && (
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
                  <Ban className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">{t('tickets.excludedBanner')}</p>
                    {detail.exclusion_reason && (
                      <p className="mt-0.5 text-amber-700">{detail.exclusion_reason}</p>
                    )}
                  </div>
                </div>
              )}
              {detail && config && (
                <TicketTimeline
                  transitions={detail.transitions}
                  config={config}
                  createdAt={detail.created_at}
                  externalLink={detail.external_link}
                />
              )}
              {detail && !config && (
                <p className="text-xs text-gray-400">{t('timeline.noTransitions')}</p>
              )}
            </div>
          </div>
          <style>{`
            @keyframes slideInUp {
              from { opacity: 0; transform: translateY(16px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideInDown {
              from { opacity: 0; transform: translateY(-16px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
