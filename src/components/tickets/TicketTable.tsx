import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Ticket, TicketDetail, ConfigContext } from '@/types'
import { ExternalLink, ArrowUpDown, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react'
import { api } from '@/services/api'
import { TicketTimeline } from './TicketTimeline'

interface Props {
  tickets: Ticket[]
  p50?: number | null
  p85?: number | null
  config?: ConfigContext | null
}

type SortKey = 'external_id' | 'title' | 'ticket_type' | 'cycle_time_days' | 'lead_time_days' | 'current_status'
type SortDir = 'asc' | 'desc'

function cycleTimeColor(days: number | null, p50?: number | null, p85?: number | null) {
  if (days == null) return 'text-gray-300'
  if (p85 != null && days >= p85) return 'text-rose-600 font-semibold'
  if (p50 != null && days < p50) return 'text-emerald-600 font-semibold'
  return 'text-amber-600 font-semibold'
}

const TYPE_COLORS: Record<string, string> = {
  story: 'bg-green-50 text-green-700 border-green-200',
  task: 'bg-gray-50 text-gray-700 border-gray-200',
  bug: 'bg-red-50 text-red-700 border-red-200',
  epic: 'bg-purple-50 text-purple-700 border-purple-200',
  'sub-task': 'bg-slate-50 text-slate-600 border-slate-200',
  'qa finding': 'bg-orange-50 text-orange-700 border-orange-200',
}

function sortTickets(tickets: Ticket[], key: SortKey, dir: SortDir): Ticket[] {
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

export function TicketTable({ tickets, p50, p85, config }: Props) {
  const { t } = useTranslation()
  const [sortKey, setSortKey] = useState<SortKey>('external_id')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [expandedDetail, setExpandedDetail] = useState<TicketDetail | null>(null)

  function handleRowClick(ticket: Ticket) {
    if (expandedId === ticket.id) {
      setExpandedId(null)
      setExpandedDetail(null)
      return
    }
    setExpandedId(ticket.id)
    setExpandedDetail(null)
    api.tickets.get(ticket.id).then(setExpandedDetail).catch(console.error)
  }

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
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
            {th('current_status', 'Status', 'w-36')}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((ticket) => (
            <React.Fragment key={ticket.id}>
            <TableRow
              className={`hover:bg-gray-50/50 cursor-pointer ${expandedId === ticket.id ? 'bg-gray-50' : ''}`}
              onClick={() => handleRowClick(ticket)}
            >
              <TableCell>
                {ticket.external_link ? (
                  <a
                    href={ticket.external_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-800 text-sm font-medium group"
                  >
                    {ticket.external_id}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <span className="text-sm text-gray-600">{ticket.external_id}</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-gray-800 max-w-xs">
                <span className="line-clamp-1">{ticket.title}</span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
                  TYPE_COLORS[ticket.ticket_type] ?? 'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                  {t(`tickets.types.${ticket.ticket_type}`, { defaultValue: ticket.ticket_type })}
                </span>
              </TableCell>
              <TableCell className={`text-right text-sm tabular-nums ${cycleTimeColor(ticket.cycle_time_days, p50, p85)}`}>
                {ticket.cycle_time_days != null ? `${ticket.cycle_time_days}d` : '—'}
              </TableCell>
              <TableCell className="text-right text-sm text-gray-500 tabular-nums">
                {ticket.lead_time_days != null ? `${ticket.lead_time_days}d` : '—'}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
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
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-300 transition-transform ${expandedId === ticket.id ? 'rotate-180' : ''}`} />
                </div>
              </TableCell>
            </TableRow>
            {expandedId === ticket.id && (
              <TableRow className="bg-gray-50/80">
                <TableCell colSpan={6} className="px-6 py-4">
                  {expandedDetail && config ? (
                    <TicketTimeline
                      transitions={expandedDetail.transitions}
                      config={config}
                      createdAt={expandedDetail.created_at}
                      externalLink={expandedDetail.external_link}
                    />
                  ) : (
                    <p className="text-xs text-gray-400">Loading transitions…</p>
                  )}
                </TableCell>
              </TableRow>
            )}
            </React.Fragment>
          ))}
          {tickets.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-400 py-12 text-sm">
                No tickets found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
