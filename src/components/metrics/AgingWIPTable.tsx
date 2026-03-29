import { useTranslation } from 'react-i18next'
import type { AgingWIPResponse } from '@/types'
import { ExternalLink } from 'lucide-react'

interface Props {
  data: AgingWIPResponse
  onTicketClick: (id: string) => void
}

function riskLevel(wip_age_days: number, p85: number | null, p95: number | null): 'critical' | 'warning' | 'normal' {
  const hi = p95 ?? (p85 ? p85 * 1.2 : 30)
  const mid = p85 ?? 14
  if (wip_age_days >= hi) return 'critical'
  if (wip_age_days >= mid / 2) return 'warning'
  return 'normal'
}

const RISK_BADGE: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  warning:  'bg-amber-100 text-amber-700 border-amber-200',
  normal:   'bg-gray-100 text-gray-500 border-gray-200',
}

export function AgingWIPTable({ data, onTicketClick }: Props) {
  const { t } = useTranslation()
  const { tickets, p85_cycle_time, p95_cycle_time } = data

  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{t('wip.title')}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{t('wip.subtitle', { count: tickets.length })}</p>
        </div>
        {p85_cycle_time != null && (
          <span className="text-[11px] text-gray-400">
            {t('wip.p85ref', { days: p85_cycle_time })}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400 font-medium">
              <th className="text-left px-5 py-2.5">{t('wip.colTicket')}</th>
              <th className="text-left px-3 py-2.5 hidden md:table-cell">{t('wip.colStatus')}</th>
              <th className="text-right px-3 py-2.5">{t('wip.colInStatus')}</th>
              <th className="text-right px-3 py-2.5">{t('wip.colAge')}</th>
              <th className="text-right px-5 py-2.5">{t('wip.colRisk')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tickets.map((ticket) => {
              const risk = riskLevel(ticket.wip_age_days, p85_cycle_time, p95_cycle_time)
              return (
                <tr
                  key={ticket.id}
                  className={`transition-colors ${risk === 'critical' ? 'bg-red-50/40' : risk === 'warning' ? 'bg-amber-50/30' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTicketClick(ticket.id)}
                        className="font-mono text-xs font-semibold text-violet-600 hover:text-violet-800 hover:underline shrink-0"
                      >
                        {ticket.external_id}
                      </button>
                      {ticket.external_link && (
                        <a
                          href={ticket.external_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-300 hover:text-gray-500 transition-colors shrink-0"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <span className="text-gray-600 truncate max-w-xs">{ticket.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                      {ticket.current_status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-xs text-gray-500">
                    {ticket.days_in_current_status}d
                  </td>
                  <td className="px-3 py-3 text-right text-xs font-semibold text-gray-700">
                    {ticket.wip_age_days}d
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${RISK_BADGE[risk]}`}>
                      {t(`wip.risk${risk.charAt(0).toUpperCase() + risk.slice(1)}`)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
