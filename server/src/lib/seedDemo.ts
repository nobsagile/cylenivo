import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions } from '../db/schema.js'
import { buildHealthReport } from '../analyzers/healthReport.js'
import { DEMO_IMPROVING, DEMO_DECLINING, type DemoFixture } from './demoData.js'

const STATUS_ORDER = ['Backlog', 'In Progress', 'In Review', 'Done']
const CYCLE_START = 'In Progress'
const CYCLE_END = 'Done'

export const DEMO_CONFIG_NAMES = {
  improving: 'Demo: Improving Team',
  declining: 'Demo: Declining Team',
} as const

export async function seedDemoProject(
  configName: string,
  fixture: DemoFixture,
): Promise<{ config_id: string; import_id: string }> {
  const now = new Date().toISOString()

  const configId = crypto.randomUUID()
  await db.insert(projectConfigs).values({
    id: configId,
    name: configName,
    source_type: 'jira',
    base_url: null,
    status_order: JSON.stringify(STATUS_ORDER),
    cycle_time_start_status: CYCLE_START,
    cycle_time_end_status: CYCLE_END,
    cycle_time_mode: 'first_last',
    lead_time_start_status: null,
    created_at: now,
  })

  const healthReport = buildHealthReport(
    fixture.tickets as Parameters<typeof buildHealthReport>[0],
    STATUS_ORDER,
    CYCLE_START,
    CYCLE_END,
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
  await seedDemoProject(DEMO_CONFIG_NAMES.improving, DEMO_IMPROVING)
  await seedDemoProject(DEMO_CONFIG_NAMES.declining, DEMO_DECLINING)
  console.log('Demo data seeded (ALPHA + BETA)')
}
