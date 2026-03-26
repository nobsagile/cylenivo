import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { api } from '@/services/api'
import { useMetrics } from '@/hooks/useMetrics'
import type { Ticket } from '@/types'
import { TicketTable } from '@/components/tickets/TicketTable'
import { Button } from '@/components/ui/button'

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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{t('nav.tickets')}</h2>
        <div className="flex gap-2">
          {['', 'story', 'task', 'bug'].map((type) => (
            <Button
              key={type}
              variant={typeFilter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => { setTypeFilter(type); setPage(1) }}
            >
              {type || 'All'}
            </Button>
          ))}
        </div>
      </div>

      <TicketTable
        tickets={tickets}
        p50={metrics?.cycle_time.p50}
        p85={metrics?.cycle_time.p85}
      />

      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <span>{total} tickets total</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="px-2 py-1">Page {page}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={page * limit >= total}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
