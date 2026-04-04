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
  lead_time_end_status: string | null
  created_at: string
}

export interface ImportHealthReport {
  tickets_without_cycle_start: number
  tickets_incomplete: number
  unknown_statuses: string[]
  oldest_transition_date: string | null
}

export interface ImportSession {
  id: string
  config_id: string
  name?: string | null
  source_type: string
  project_key: string
  file_name: string
  ticket_count: number
  imported_at: string
  config_name?: string
  cycle_time_start_status?: string | null
  cycle_time_end_status?: string | null
  health_report?: ImportHealthReport | null
  connection_id?: string | null
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

export interface ConfigContext {
  status_order: string[]
  cycle_time_start_status: string
  cycle_time_end_status: string
  cycle_time_mode: string
  lead_time_start_status: string | null
  lead_time_end_status: string | null
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
  throughput_per_week: number | null
  config_context: ConfigContext
}

export interface CycleTimeTicket {
  id: string
  external_id: string
  title: string
  cycle_time_days: number
  completed_at: string
  external_link: string | null
}

export interface CycleTimesResponse {
  tickets: CycleTimeTicket[]
}

export interface LeadTimeTicket {
  id: string
  external_id: string
  title: string
  lead_time_days: number
  completed_at: string
  external_link: string | null
}

export interface LeadTimesResponse {
  values: number[]
  tickets: LeadTimeTicket[]
}

export interface TimeInStatusTicket {
  id: string
  external_id: string
  title: string
  status_durations: Record<string, number>
}

export interface TimeInStatusResponse {
  statuses: string[]
  tickets: TimeInStatusTicket[]
}

export interface LLMStatus {
  configured: boolean
  provider: string | null
  model: string | null
  available: boolean
}

export interface LlmConfig {
  id: string
  provider: 'ollama' | 'openai' | 'openai_compatible'
  base_url: string | null
  model: string
  system_prompt: string
  key_set: boolean
  created_at: string
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

export interface SourceConnection {
  id: string
  name: string
  source_type: string
  base_url: string
  email: string
  created_at: string
  project_key?: string
  issue_types?: string[]
  resolved_from?: string
  resolved_to?: string
  credentials_json?: string | null
}

export interface JiraFetchOptions {
  project: string
  limit: number
  issue_types: string[]
  resolved_from?: string
  resolved_to?: string
}

export type PluginFieldType = 'string' | 'password' | 'url' | 'number'

export interface PluginField {
  key: string
  label: string
  type: PluginFieldType
  required?: boolean
  default?: string | number
  placeholder?: string
  help?: string
  link?: { url: string; label: string }
}

export interface PluginManifest {
  source_type: string
  name: string
  version?: string
  description?: string
  author?: string
  credentials: PluginField[]
  fetch_options: PluginField[]
}

export interface PluginRegistryEntry {
  id: string
  name: string
  description: string
  path: string
  sha256: string
  installed: boolean
  update_available: boolean
}

export interface ForecastResponse {
  mode: 'how_many' | 'when'
  value: number
  p50: number
  p85: number
  p95: number
  histogram: { bucket: number; count: number }[]
  weeks_of_data: number
  weeks_with_completions: number
  total_completed: number
}

export interface WeeklyThroughputPoint {
  week: string
  count: number
}

export interface ThroughputResponse {
  weeks: WeeklyThroughputPoint[]
}

export interface CfdResponse {
  statuses: string[]
  data: Array<{ date: string } & Record<string, string | number>>
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
  lead_time_end_status?: string
}
