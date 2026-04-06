import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '@/services/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Ticket, ConfigContext } from '@/types'
import { TYPE_COLORS } from '@/lib/statusColors'
import { ExternalLink, ArrowUpDown, ArrowUp, ArrowDown, Ban, Undo2 } from 'lucide-react'

interface Props {
  tickets: Ticket[]
  p50?: number | null
  p85?: number | null
  config?: ConfigContext | null
  onTicketClick?: (id: string) => void
  onExclusionToggle?: (ticketId: string, excluded: boolean) => void
  sortKey?: SortKey
  sortDir?: SortDir
  onSortChange?: (key: SortKey, dir: SortDir) => void
}

export type SortKey = 'external_id' | 'title' | 'ticket_type' | 'cycle_time_days' | 'lead_time_days' | 'current_status'
export type SortDir = 'asc' | 'desc'

function cycleTimeColor(days: number | null, p50?: number | null, p85?: number | null) {
  if (days == null) return 'text-gray-300'
  if (p85 != null && days >= p85) return 'text-rose-600 font-semibold'
  if (p50 != null && days < p50) return 'text-emerald-600 font-semibold'
  return 'text-amber-600 font-semibold'
}

export function sortTickets(tickets: Ticket[], key: SortKey, dir: SortDir): Ticket[] {
  return [...tickets].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    // nulls always last
    if (av == null && bv == null) return 0
    if (av == null) return 1
    if (bv == null) return -1
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return dir === 'asc' ? cmp : -cmp
  })
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown className="w-3.5 h-3.5 opacity-30 ml-1 inline" />
  return sortDir === 'asc'
    ? <ArrowUp className="w-3.5 h-3.5 ml-1 inline text-violet-600" />
    : <ArrowDown className="w-3.5 h-3.5 ml-1 inline text-violet-600" />
}

export function TicketTable({ tickets, p50, p85, config: _config, onTicketClick, onExclusionToggle, sortKey: sortKeyProp, sortDir: sortDirProp, onSortChange }: Props) {
  const { t } = useTranslation()
  const [sortKeyLocal, setSortKeyLocal] = useState<SortKey>('external_id')
  const [sortDirLocal, setSortDirLocal] = useState<SortDir>('asc')

  const handleExclusionClick = useCallback(async (ticketId: string, excluded: boolean) => {
    onExclusionToggle?.(ticketId, excluded)
    try {
      await api.tickets.update(ticketId, { excluded })
    } catch (e) {
      console.error(e)
      onExclusionToggle?.(ticketId, !excluded)
    }
  }, [onExclusionToggle])
  const sortKey = sortKeyProp ?? sortKeyLocal
  const sortDir = sortDirProp ?? sortDirLocal

  function handleSort(key: SortKey) {
    const newDir: SortDir = key === sortKey ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc'
    if (onSortChange) {
      onSortChange(key, newDir)
    } else {
      setSortKeyLocal(key)
      setSortDirLocal(newDir)
    }
  }

  const sorted = sortTickets(tickets, sortKey, sortDir)

  const th = (key: SortKey, label: string, className = '') => (
    <TableHead
      className={`font-semibold text-gray-600 cursor-pointer select-none hover:text-gray-900 whitespace-nowrap ${className}`}
      onClick={() => handleSort(key)}
    >
      {label}
      <SortIcon col={key} sortKey={sortKey} sortDir={sortDir} />
    </TableHead>
  )

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            {th('external_id', t('tickets.table.id'), 'w-28')}
            {th('title', t('tickets.table.title'))}
            {th('ticket_type', t('tickets.table.type'), 'w-28')}
            {th('cycle_time_days', t('tickets.table.cycleTime'), 'text-right w-28')}
            {th('lead_time_days', t('tickets.table.leadTime'), 'text-right w-28')}
            {th('current_status', t('common.status'), 'w-36')}
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((ticket) => (
            <TableRow
              key={ticket.id}
              className={`cursor-pointer ${ticket.excluded ? 'opacity-50 hover:opacity-70' : 'hover:bg-gray-50/50'}`}
              onClick={() => onTicketClick?.(ticket.id)}
            >
              <TableCell>
                {ticket.external_link ? (
                  <a
                    href={ticket.external_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-800 text-sm font-medium group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {ticket.external_id}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <span className="text-sm text-gray-600">{ticket.external_id}</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-gray-800 max-w-xs">
                <span className={`line-clamp-1 ${ticket.excluded ? 'line-through text-gray-400' : ''}`}>{ticket.title}</span>
                {ticket.excluded && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    {t('tickets.excluded')}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
                  TYPE_COLORS[ticket.ticket_type] ?? 'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                  {t(`tickets.types.${ticket.ticket_type}`, { defaultValue: ticket.ticket_type })}
                </span>
              </TableCell>
              <TableCell className={`text-right text-sm tabular-nums ${ticket.excluded ? 'text-gray-300' : cycleTimeColor(ticket.cycle_time_days, p50, p85)}`}>
                {ticket.cycle_time_days != null ? `${ticket.cycle_time_days}d` : '—'}
              </TableCell>
              <TableCell className="text-right text-sm text-gray-500 tabular-nums">
                {ticket.lead_time_days != null ? `${ticket.lead_time_days}d` : '—'}
              </TableCell>
              <TableCell>
                {ticket.current_status ? (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
                    ticket.completed
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}>
                    {ticket.current_status}
                  </span>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </TableCell>
              <TableCell>
                {onExclusionToggle && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleExclusionClick(ticket.id, !ticket.excluded) }}
                    title={ticket.excluded ? t('tickets.reinclude') : t('tickets.exclude')}
                    className="text-gray-300 hover:text-gray-600 transition-colors"
                  >
                    {ticket.excluded ? <Undo2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {tickets.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-400 py-12 text-sm">
                {t('tickets.noTickets')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
