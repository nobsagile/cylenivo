import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const projectConfigs = sqliteTable('project_configs', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  source_type: text('source_type').notNull(),
  base_url: text('base_url'),
  status_order: text('status_order').notNull(), // JSON array
  cycle_time_start_status: text('cycle_time_start_status').notNull(),
  cycle_time_end_status: text('cycle_time_end_status').notNull(),
  cycle_time_mode: text('cycle_time_mode').notNull().default('first_last'),
  lead_time_start_status: text('lead_time_start_status'),
  lead_time_end_status: text('lead_time_end_status'),
  created_at: text('created_at').notNull(),
})

export const importSessions = sqliteTable('import_sessions', {
  id: text('id').primaryKey(),
  config_id: text('config_id').notNull().references(() => projectConfigs.id),
  name: text('name'),
  source_type: text('source_type').notNull(),
  project_key: text('project_key').notNull(),
  file_name: text('file_name').notNull(),
  ticket_count: integer('ticket_count').notNull().default(0),
  imported_at: text('imported_at').notNull(),
  health_report: text('health_report'), // JSON
  connection_id: text('connection_id'),
})

export const tickets = sqliteTable('tickets', {
  id: text('id').primaryKey(),
  import_id: text('import_id').notNull().references(() => importSessions.id),
  external_id: text('external_id').notNull(),
  title: text('title').notNull(),
  ticket_type: text('ticket_type').notNull(),
  created_at: text('created_at').notNull(),
  external_link: text('external_link'),
  extra_metadata: text('extra_metadata'), // JSON
})

export const ticketTransitions = sqliteTable('ticket_transitions', {
  id: text('id').primaryKey(),
  ticket_id: text('ticket_id').notNull().references(() => tickets.id),
  from_status: text('from_status'),
  to_status: text('to_status').notNull(),
  transitioned_at: text('transitioned_at').notNull(),
})

export const sourceConnections = sqliteTable('source_connections', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  source_type: text('source_type').notNull(), // "jira"
  base_url: text('base_url').notNull(),
  email: text('email').notNull(),
  api_token: text('api_token').notNull(),
  created_at: text('created_at').notNull(),
  project_key: text('project_key'),
  issue_types: text('issue_types'),       // JSON array string
  resolved_from: text('resolved_from'),
  resolved_to: text('resolved_to'),
})

export const llmInsights = sqliteTable('llm_insights', {
  id: text('id').primaryKey(),
  import_id: text('import_id').notNull().references(() => importSessions.id),
  model_used: text('model_used').notNull(),
  insight_text: text('insight_text').notNull(),
  generated_at: text('generated_at').notNull(),
})

export const llmConfig = sqliteTable('llm_config', {
  id: text('id').primaryKey(), // always 'default'
  provider: text('provider').notNull(), // 'ollama' | 'openai' | 'openai_compatible'
  base_url: text('base_url'),
  api_key: text('api_key'),
  model: text('model').notNull(),
  system_prompt: text('system_prompt').notNull(),
  created_at: text('created_at').notNull(),
})

// ── Row type aliases ─────────────────────────────────────────────────────────
export type ProjectConfigRow = typeof projectConfigs.$inferSelect
export type ProjectConfigInsert = typeof projectConfigs.$inferInsert
export type ImportSessionRow = typeof importSessions.$inferSelect
export type TicketRow = typeof tickets.$inferSelect
export type TicketInsert = typeof tickets.$inferInsert
export type TransitionRow = typeof ticketTransitions.$inferSelect
export type TransitionInsert = typeof ticketTransitions.$inferInsert
export type ConnectionRow = typeof sourceConnections.$inferSelect
export type ConnectionInsert = typeof sourceConnections.$inferInsert
export type LlmConfigRow = typeof llmConfig.$inferSelect
