import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Search, Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import type { Ticket } from '@/types'
import { TicketTable, sortTickets, type SortKey, type SortDir } from '@/components/tickets/TicketTable'
import { TicketDetailDrawer } from '@/components/tickets/TicketDetailDrawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/layout/PageHeader'

const TYPE_FILTERS = ['', 'story', 'task', 'bug']

export default function TicketsPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { data: metrics } = useMetrics(importId)

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [typeFilter, setTypeFilter] = useState('')
  const [analyzedOnly, setAnalyzedOnly] = useState(true)
  const [excludedOnly, setExcludedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [searchDebounced, setSearchDebounced] = useState('')
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('completed_at')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const limit = 50

  useEffect(() => {
    const timer = setTimeout(() => { setSearchDebounced(search); setPage(1) }, 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    if (!importId) return
    api.tickets
      .list(importId, {
        type: typeFilter || undefined,
        page,
        limit,
        completed_only: analyzedOnly || undefined,
        excluded_only: excludedOnly || undefined,
        search: searchDebounced || undefined,
      })
      .then((res) => {
        setTickets(res.tickets)
        setTotal(res.total)
      })
      .catch(console.error)
  }, [importId, page, typeFilter, analyzedOnly, excludedOnly, searchDebounced])

  const totalPages = Math.ceil(total / limit)

  const handleExclusionToggle = useCallback((ticketId: string, excluded: boolean) => {
    setTickets(prev => {
      if (excludedOnly && !excluded) return prev.filter(t => t.id !== ticketId)
      return prev.map(t => t.id === ticketId ? { ...t, excluded, exclusion_reason: excluded ? t.exclusion_reason : null } : t)
    })
  }, [excludedOnly])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <PageHeader
          view={t('nav.tickets')}
          name={metrics?.project_key ?? '…'}
          subtitle={t('tickets.subtitle')}
          completed={metrics?.completed_ticket_count}
          total={metrics?.ticket_count}
          excluded={metrics?.excluded_ticket_count}
        />

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('tickets.searchPlaceholder')}
              className="pl-8 h-9 w-48 text-sm"
            />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => { setAnalyzedOnly(!analyzedOnly); setExcludedOnly(false); setPage(1) }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                analyzedOnly && !excludedOnly
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-gray-500 border-gray-200 hover:text-gray-700'
              }`}
            >
              {t('tickets.analyzedOnly')}
            </button>
            <button
              onClick={() => { setExcludedOnly(!excludedOnly); setAnalyzedOnly(false); setPage(1) }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                excludedOnly
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-white text-gray-500 border-gray-200 hover:text-gray-700'
              }`}
            >
              {t('tickets.excludedOnly')}
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="text-xs text-gray-600 space-y-1.5">
                  <p className="font-semibold text-gray-800 mb-1">{t('tickets.analyzedOnly')}</p>
                  <p>{t('help.analyzedOnly')}</p>
                  <p className="mt-2 font-medium text-gray-700">{t('tickets.colorCoding')}</p>
                  <p>{t('help.ticketColors')}</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg p-1">
            {TYPE_FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => { setTypeFilter(type); setPage(1) }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  typeFilter === type
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {type || t('common.all')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {(() => {
        const sorted = sortTickets(tickets, sortKey, sortDir)
        const idx = sorted.findIndex(t => t.id === selectedTicketId)
        return (
          <>
            <TicketTable
              tickets={tickets}
              p50={metrics?.cycle_time.p50}
              p85={metrics?.cycle_time.p85}
              config={metrics?.config_context}
              onTicketClick={setSelectedTicketId}
              onExclusionToggle={handleExclusionToggle}
              sortKey={sortKey}
              sortDir={sortDir}
              onSortChange={(k, d) => { setSortKey(k); setSortDir(d) }}
            />
            <TicketDetailDrawer
              ticketId={selectedTicketId}
              config={metrics?.config_context ?? null}
              onClose={() => setSelectedTicketId(null)}
              onPrev={() => idx > 0 && setSelectedTicketId(sorted[idx - 1].id)}
              onNext={() => idx < sorted.length - 1 && setSelectedTicketId(sorted[idx + 1].id)}
              hasPrev={idx > 0}
              hasNext={idx < sorted.length - 1}
              onExclusionToggle={handleExclusionToggle}
            />
          </>
        )
      })()}

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-400">
            {t('tickets.page', { page, total: totalPages })}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
