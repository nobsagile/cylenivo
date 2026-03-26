import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import type { Ticket } from '@/types'
import { TicketTable } from '@/components/tickets/TicketTable'
import { Button } from '@/components/ui/button'

const TYPE_FILTERS = ['', 'story', 'task', 'bug', 'sub-task']

export default function TicketsPage() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId: string }>()
  const { data: metrics } = useMetrics(importId)

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [typeFilter, setTypeFilter] = useState('')
  const limit = 50

  useEffect(() => {
    if (!importId) return
    api.tickets
      .list(importId, { type: typeFilter || undefined, page, limit })
      .then((res) => {
        setTickets(res.tickets)
        setTotal(res.total)
      })
      .catch(console.error)
  }, [importId, page, typeFilter])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('nav.tickets')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{total} tickets total</p>
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
              {type || 'All'}
            </button>
          ))}
        </div>
      </div>

      <TicketTable
        tickets={tickets}
        p50={metrics?.cycle_time.p50}
        p85={metrics?.cycle_time.p85}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-400">
            Page {page} of {totalPages}
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
