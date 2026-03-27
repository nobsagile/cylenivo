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
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS import_sessions (
    id TEXT PRIMARY KEY,
    config_id TEXT NOT NULL REFERENCES project_configs(id),
    source_type TEXT NOT NULL,
    project_key TEXT NOT NULL,
    file_name TEXT NOT NULL,
    ticket_count INTEGER NOT NULL DEFAULT 0,
    imported_at TEXT NOT NULL
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

  CREATE TABLE IF NOT EXISTS llm_insights (
    id TEXT PRIMARY KEY,
    import_id TEXT NOT NULL REFERENCES import_sessions(id),
    model_used TEXT NOT NULL,
    insight_text TEXT NOT NULL,
    generated_at TEXT NOT NULL
  );
`

export async function migrate() {
  for (const stmt of CREATE_TABLES_SQL.split(';').map(s => s.trim()).filter(Boolean)) {
    sqlite.exec(stmt)
  }
  // Add columns introduced after initial schema (safe to re-run)
  try {
    sqlite.exec(`ALTER TABLE project_configs ADD COLUMN cycle_time_mode TEXT NOT NULL DEFAULT 'first_last'`)
  } catch {
    // column already exists
  }
}
