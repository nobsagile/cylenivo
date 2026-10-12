import { useParams, Outlet } from 'react-router-dom'
import { useMetrics } from '@/hooks/useMetrics'

export interface ProjectLayoutContext {
  dateRange?: { from: string | null; to: string | null }
  /** completed tickets in the unfiltered dataset */
  completedCount?: number
}

export function ProjectLayout() {
  const { importId } = useParams<{ importId: string }>()
  const { data } = useMetrics(importId)

  return <Outlet context={{ dateRange: data?.date_range, completedCount: data?.completed_ticket_count } satisfies ProjectLayoutContext} />
}
