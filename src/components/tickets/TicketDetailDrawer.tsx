import { useEffect, useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { api } from '@/services/api'
import type { TicketDetail, ConfigContext } from '@/types'
import { TicketTimeline } from './TicketTimeline'

const TYPE_COLORS: Record<string, string> = {
  story: 'bg-green-50 text-green-700 border-green-200',
  task: 'bg-gray-50 text-gray-700 border-gray-200',
  bug: 'bg-red-50 text-red-700 border-red-200',
  epic: 'bg-purple-50 text-purple-700 border-purple-200',
  'sub-task': 'bg-slate-50 text-slate-600 border-slate-200',
  'qa finding': 'bg-orange-50 text-orange-700 border-orange-200',
}

interface Props {
  ticketId: string | null
  config: ConfigContext | null
  onClose: () => void
}

export function TicketDetailDrawer({ ticketId, config, onClose }: Props) {
  const { t } = useTranslation()
  const [detail, setDetail] = useState<TicketDetail | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!ticketId) { setDetail(null); return }
    setLoading(true)
    setDetail(null)
    api.tickets.get(ticketId)
      .then(setDetail)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [ticketId])

  return (
    <DialogPrimitive.Root open={ticketId !== null} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed right-0 top-0 z-50 h-full w-[520px] max-w-[95vw] bg-white shadow-xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-200"
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
            <DialogPrimitive.Close
              className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {loading && (
              <div className="space-y-3">
                <div className="h-8 bg-gray-100 rounded animate-pulse" />
                <div className="h-24 bg-gray-50 rounded animate-pulse" />
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
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
