import { useParams, Outlet } from 'react-router-dom'
import { useMetrics } from '@/hooks/useMetrics'

export interface ProjectLayoutContext {
  dateRange?: { from: string | null; to: string | null }
}

export function ProjectLayout() {
  const { importId } = useParams<{ importId: string }>()
  const { data } = useMetrics(importId, undefined, undefined)

  return <Outlet context={{ dateRange: data?.date_range } satisfies ProjectLayoutContext} />
}
