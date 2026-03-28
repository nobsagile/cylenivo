// Re-export all shared types (single source of truth)
export type {
  ProjectConfig,
  ImportHealthReport,
  ImportSession,
  TicketTransition,
  Ticket,
  TicketDetail,
  PercentileStats,
  StatusDuration,
  ConfigContext,
  MetricsSummary,
  CycleTimeTicket,
  CycleTimesResponse,
  LeadTimeTicket,
  LeadTimesResponse,
  TimeInStatusTicket,
  TimeInStatusResponse,
  LLMStatus,
  LlmConfig,
  LLMInsight,
  PaginatedTickets,
  SourceConnection,
  JiraFetchOptions,
  CreateConfigRequest,
} from '../../shared/types'

// Frontend-only types

export interface ReworkPath {
  from: string
  to: string
  count: number
}

export interface ReworkResponse {
  tickets_with_rework: number
  total_completed: number
  rework_paths: ReworkPath[]
  avg_cycle_with_rework: number | null
  avg_cycle_without_rework: number | null
}

export interface CycleTimeByTypeEntry {
  type: string
  count: number
  mean: number
  median: number
  p85: number
}

export interface CycleTimeByTypeResponse {
  types: CycleTimeByTypeEntry[]
}
