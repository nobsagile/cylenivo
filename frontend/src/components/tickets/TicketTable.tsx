import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { Ticket } from '@/types'

interface Props {
  tickets: Ticket[]
  p50?: number | null
  p85?: number | null
}

function cycleTimeColor(days: number | null, p50?: number | null, p85?: number | null) {
  if (days == null) return 'text-gray-400'
  if (p85 != null && days >= p85) return 'text-red-600 font-medium'
  if (p50 != null && days < p50) return 'text-green-600 font-medium'
  return 'text-yellow-600 font-medium'
}

const TYPE_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  story: 'default',
  task: 'secondary',
  bug: 'destructive',
  epic: 'outline',
}

export function TicketTable({ tickets, p50, p85 }: Props) {
  const { t } = useTranslation()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('tickets.table.id')}</TableHead>
          <TableHead>{t('tickets.table.title')}</TableHead>
          <TableHead>{t('tickets.table.type')}</TableHead>
          <TableHead className="text-right">{t('tickets.table.cycleTime')}</TableHead>
          <TableHead className="text-right">{t('tickets.table.leadTime')}</TableHead>
          <TableHead>{t('tickets.table.completedAt')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>
              {ticket.external_link ? (
                <a href={ticket.external_link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
                  {ticket.external_id}
                </a>
              ) : (
                <span className="text-sm">{ticket.external_id}</span>
              )}
            </TableCell>
            <TableCell className="text-sm max-w-xs truncate">{ticket.title}</TableCell>
            <TableCell>
              <Badge variant={TYPE_VARIANT[ticket.ticket_type] ?? 'secondary'} className="text-xs">
                {t(`tickets.types.${ticket.ticket_type}`, { defaultValue: ticket.ticket_type })}
              </Badge>
            </TableCell>
            <TableCell className={`text-right text-sm ${cycleTimeColor(ticket.cycle_time_days, p50, p85)}`}>
              {ticket.cycle_time_days != null ? `${ticket.cycle_time_days}d` : '—'}
            </TableCell>
            <TableCell className="text-right text-sm text-gray-600">
              {ticket.lead_time_days != null ? `${ticket.lead_time_days}d` : '—'}
            </TableCell>
            <TableCell className="text-sm text-gray-600">
              {ticket.completed
                ? ticket.current_status
                : <span className="text-gray-400">{ticket.current_status ?? '—'}</span>}
            </TableCell>
          </TableRow>
        ))}
        {tickets.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-400 py-8">
              No tickets
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
