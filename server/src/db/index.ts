import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema.js'

const DB_PATH = process.env.DB_PATH ?? 'dev.db'

const sqlite = new Database(DB_PATH)
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

export const db = drizzle(sqlite, { schema })

const CREATE_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS project_configs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    source_type TEXT NOT NULL,
    base_url TEXT,
    status_order TEXT NOT NULL,
    cycle_time_start_status TEXT NOT NULL,
    cycle_time_end_status TEXT NOT NULL,
    cycle_time_mode TEXT NOT NULL DEFAULT 'first_last',
    lead_time_start_status TEXT,
    lead_time_end_status TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS import_sessions (
    id TEXT PRIMARY KEY,
    config_id TEXT NOT NULL REFERENCES project_configs(id),
    source_type TEXT NOT NULL,
    project_key TEXT NOT NULL,
    file_name TEXT NOT NULL,
    ticket_count INTEGER NOT NULL DEFAULT 0,
    imported_at TEXT NOT NULL,
    health_report TEXT
  );

  CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    import_id TEXT NOT NULL REFERENCES import_sessions(id),
    external_id TEXT NOT NULL,
    title TEXT NOT NULL,
    ticket_type TEXT NOT NULL,
    created_at TEXT NOT NULL,
    external_link TEXT,
    extra_metadata TEXT
  );

  CREATE TABLE IF NOT EXISTS ticket_transitions (
    id TEXT PRIMARY KEY,
    ticket_id TEXT NOT NULL REFERENCES tickets(id),
    from_status TEXT,
    to_status TEXT NOT NULL,
    transitioned_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS source_connections (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    source_type TEXT NOT NULL,
    base_url TEXT NOT NULL,
    email TEXT NOT NULL,
    api_token TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS llm_insights (
    id TEXT PRIMARY KEY,
    import_id TEXT NOT NULL REFERENCES import_sessions(id),
    model_used TEXT NOT NULL,
    insight_text TEXT NOT NULL,
    generated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS llm_config (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    base_url TEXT,
    api_key TEXT,
    model TEXT NOT NULL,
    system_prompt TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_tickets_import_id ON tickets(import_id);
  CREATE INDEX IF NOT EXISTS idx_transitions_ticket_id ON ticket_transitions(ticket_id);
  CREATE INDEX IF NOT EXISTS idx_imports_config_id ON import_sessions(config_id);
`

function addColumn(stmt: string) {
  try {
    sqlite.exec(stmt)
  } catch (e) {
    if (e instanceof Error && e.message.includes('duplicate column name')) return
    throw e
  }
}

export async function migrate() {
  for (const stmt of CREATE_TABLES_SQL.split(';').map(s => s.trim()).filter(Boolean)) {
    sqlite.exec(stmt)
  }
  // Add columns introduced after initial schema (safe to re-run)
  addColumn(`ALTER TABLE project_configs ADD COLUMN cycle_time_mode TEXT NOT NULL DEFAULT 'first_last'`)
  sqlite.exec(`CREATE TABLE IF NOT EXISTS source_connections (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    source_type TEXT NOT NULL,
    base_url TEXT NOT NULL,
    email TEXT NOT NULL,
    api_token TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`)
  addColumn(`ALTER TABLE import_sessions ADD COLUMN health_report TEXT`)
  sqlite.exec(`CREATE TABLE IF NOT EXISTS llm_config (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    base_url TEXT,
    api_key TEXT,
    model TEXT NOT NULL,
    system_prompt TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`)
  addColumn(`ALTER TABLE project_configs ADD COLUMN lead_time_end_status TEXT`)
  addColumn(`ALTER TABLE import_sessions ADD COLUMN name TEXT`)
  // Indexes (safe to re-run — IF NOT EXISTS)
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_tickets_import_id ON tickets(import_id)`)
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_transitions_ticket_id ON ticket_transitions(ticket_id)`)
  sqlite.exec(`CREATE INDEX IF NOT EXISTS idx_imports_config_id ON import_sessions(config_id)`)
}
