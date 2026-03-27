export interface ProjectConfig {
  id: string
  name: string
  source_type: string
  base_url: string | null
  status_order: string[]
  cycle_time_start_status: string
  cycle_time_end_status: string
  cycle_time_mode: 'first_last' | 'first_first' | 'last_last'
  lead_time_start_status: string | null
  created_at: string
}

export interface ImportSession {
  id: string
  config_id: string
  source_type: string
  project_key: string
  file_name: string
  ticket_count: number
  imported_at: string
  config_name?: string
}

export interface TicketTransition {
  id: string
  from_status: string | null
  to_status: string
  transitioned_at: string
}

export interface Ticket {
  id: string
  external_id: string
  title: string
  ticket_type: string
  created_at: string
  external_link: string | null
  cycle_time_days: number | null
  lead_time_days: number | null
  current_status: string | null
  completed: boolean
}

export interface TicketDetail extends Ticket {
  transitions: TicketTransition[]
}

export interface PercentileStats {
  mean_days: number | null
  median_days: number | null
  p50: number | null
  p70: number | null
  p85: number | null
  p95: number | null
  sample_size: number
  warning: string | null
}

export interface StatusDuration {
  mean_days: number
  median_days: number
}

export interface MetricsSummary {
  import_id: string
  project_key: string
  ticket_count: number
  completed_ticket_count: number
  date_range: { from: string | null; to: string | null }
  cycle_time: PercentileStats
  lead_time: PercentileStats
  time_in_status: Record<string, StatusDuration>
  throughput_per_week: number
}

export interface CycleTimeTicket {
  external_id: string
  title: string
  cycle_time_days: number
  completed_at: string
  external_link: string | null
}

export interface CycleTimesResponse {
  tickets: CycleTimeTicket[]
}

export interface TimeInStatusTicket {
  external_id: string
  title: string
  status_durations: Record<string, number>
}

export interface TimeInStatusResponse {
  statuses: string[]
  tickets: TimeInStatusTicket[]
}

export interface LLMStatus {
  available: boolean
  models: string[]
  recommended_model: string
}

export interface LLMInsight {
  insight_text: string
  model_used: string
  generated_at: string
}

export interface PaginatedTickets {
  tickets: Ticket[]
  total: number
  page: number
  limit: number
}

export interface CreateConfigRequest {
  name: string
  source_type: string
  base_url?: string
  status_order: string[]
  cycle_time_start_status: string
  cycle_time_end_status: string
  cycle_time_mode?: 'first_last' | 'first_first' | 'last_last'
  lead_time_start_status?: string
}
