import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions } from '../db/schema.js'
import { buildHealthReport } from '../analyzers/healthReport.js'
import { DEMO_IMPROVING, DEMO_DECLINING, type DemoFixture } from './demoData.js'

const ALPHA_STATUS_ORDER = ['Backlog', 'In Progress', 'In Review', 'Done']
const ALPHA_CYCLE_START = 'In Progress'
const ALPHA_CYCLE_END = 'Done'

const BETA_STATUS_ORDER = ['Backlog', 'Up Next', 'Preparation', 'Ready For Development', 'Development', 'Customer Feedback', 'Ready for Release', 'Done']
const BETA_CYCLE_START = 'Preparation'
const BETA_CYCLE_END = 'Customer Feedback'
const BETA_CYCLE_MODE = 'last_last'
const BETA_LEAD_START = 'Up Next'
const BETA_LEAD_END = 'Done'

interface DemoProjectConfig {
  statusOrder: string[]
  cycleStart: string
  cycleEnd: string
  cycleMode: string
  leadStart: string | null
  leadEnd: string | null
}

export const ALPHA_CONFIG: DemoProjectConfig = {
  statusOrder: ALPHA_STATUS_ORDER,
  cycleStart: ALPHA_CYCLE_START,
  cycleEnd: ALPHA_CYCLE_END,
  cycleMode: 'first_last',
  leadStart: null,
  leadEnd: null,
}

export const BETA_CONFIG: DemoProjectConfig = {
  statusOrder: BETA_STATUS_ORDER,
  cycleStart: BETA_CYCLE_START,
  cycleEnd: BETA_CYCLE_END,
  cycleMode: BETA_CYCLE_MODE,
  leadStart: BETA_LEAD_START,
  leadEnd: BETA_LEAD_END,
}

export const DEMO_CONFIG_NAMES = {
  improving: 'Demo: Improving Team',
  declining: 'Demo: Complex Team',
} as const

export async function seedDemoProject(
  configName: string,
  fixture: DemoFixture,
  config: DemoProjectConfig,
): Promise<{ config_id: string; import_id: string }> {
  const now = new Date().toISOString()

  const configId = crypto.randomUUID()
  await db.insert(projectConfigs).values({
    id: configId,
    name: configName,
    source_type: 'jira',
    base_url: null,
    status_order: JSON.stringify(config.statusOrder),
    cycle_time_start_status: config.cycleStart,
    cycle_time_end_status: config.cycleEnd,
    cycle_time_mode: config.cycleMode,
    lead_time_start_status: config.leadStart,
    lead_time_end_status: config.leadEnd,
    created_at: now,
  })

  const healthReport = buildHealthReport(
    fixture.tickets as Parameters<typeof buildHealthReport>[0],
    config.statusOrder,
    config.cycleStart,
    config.cycleEnd,
  )

  const importId = crypto.randomUUID()
  await db.insert(importSessions).values({
    id: importId,
    config_id: configId,
    source_type: fixture.source_type,
    project_key: fixture.project_key,
    file_name: `${fixture.project_key.toLowerCase()}-demo.json`,
    ticket_count: fixture.tickets.length,
    imported_at: now,
    health_report: JSON.stringify(healthReport),
  })

  const ticketRows: (typeof tickets.$inferInsert)[] = []
  const transitionRows: (typeof ticketTransitions.$inferInsert)[] = []

  for (const t of fixture.tickets) {
    const ticketId = crypto.randomUUID()
    ticketRows.push({
      id: ticketId,
      import_id: importId,
      external_id: t.external_id,
      title: t.title,
      ticket_type: t.ticket_type,
      created_at: new Date(t.created_at).toISOString(),
      external_link: null,
      extra_metadata: t.metadata ? JSON.stringify(t.metadata) : null,
    })

    const sorted = [...t.transitions].sort(
      (a, b) => new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime(),
    )
    for (const tr of sorted) {
      transitionRows.push({
        id: crypto.randomUUID(),
        ticket_id: ticketId,
        from_status: tr.from_status ?? null,
        to_status: tr.to_status,
        transitioned_at: new Date(tr.transitioned_at).toISOString(),
      })
    }
  }

  if (ticketRows.length) await db.insert(tickets).values(ticketRows)
  if (transitionRows.length) await db.insert(ticketTransitions).values(transitionRows)

  return { config_id: configId, import_id: importId }
}

/**
 * Seeds demo data if the DB has no project configs.
 * Called on server startup — idempotent as long as the DB is not empty.
 */
export async function seedDemoIfEmpty(): Promise<void> {
  const existing = await db.select({ id: projectConfigs.id }).from(projectConfigs).limit(1)
  if (existing.length > 0) {
    console.log('DB not empty, skipping demo seed')
    return
  }

  console.log('Seeding demo data...')
  await seedDemoProject(DEMO_CONFIG_NAMES.improving, DEMO_IMPROVING, ALPHA_CONFIG)
  await seedDemoProject(DEMO_CONFIG_NAMES.declining, DEMO_DECLINING, BETA_CONFIG)
  console.log('Demo data seeded (ALPHA + BETA)')
}
