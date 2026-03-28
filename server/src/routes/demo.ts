import { Hono } from 'hono'
import { inArray, sql } from 'drizzle-orm'
import { db } from '../db/index.js'
import { projectConfigs, importSessions, tickets, ticketTransitions, llmInsights } from '../db/schema.js'
import { ok } from '../lib/response.js'
import { seedDemoProject, DEMO_CONFIG_NAMES, ALPHA_CONFIG, BETA_CONFIG } from '../lib/seedDemo.js'
import { DEMO_IMPROVING, DEMO_DECLINING } from '../lib/demoData.js'

const demo = new Hono()

const DEMO_PROJECTS = [
  { key: 'ALPHA', name: DEMO_CONFIG_NAMES.improving, fixture: DEMO_IMPROVING, config: ALPHA_CONFIG },
  { key: 'BETA',  name: DEMO_CONFIG_NAMES.declining, fixture: DEMO_DECLINING, config: BETA_CONFIG },
]

/**
 * POST /api/v1/demo/seed
 * Seeds both demo projects if not already present. Idempotent.
 * Returns the two import IDs in order: [improving, declining].
 */
demo.post('/seed', async (c) => {
  const demoNames = DEMO_PROJECTS.map((d) => d.name)
  const existing = await db
    .select()
    .from(projectConfigs)
    .where(inArray(projectConfigs.name, demoNames as unknown as string[]))

  if (existing.length === DEMO_PROJECTS.length) {
    const configIds = existing.map((e) => e.id)
    const existingImports = await db
      .select()
      .from(importSessions)
      .where(inArray(importSessions.config_id, configIds))

    const result = DEMO_PROJECTS.map((d) => {
      const cfg = existing.find((e) => e.name === d.name)!
      const imp = existingImports.find((i) => i.config_id === cfg.id)
      return { import_id: imp?.id ?? null, name: d.name, project_key: d.key }
    })

    return c.json(ok({ seeded: false, imports: result }))
  }

  // Clean up any partial demo state before seeding fresh
  if (existing.length > 0) {
    const existingIds = existing.map((e) => e.id)
    const partialImports = await db
      .select()
      .from(importSessions)
      .where(inArray(importSessions.config_id, existingIds))
    if (partialImports.length > 0) {
      const partialImportIds = partialImports.map((i) => i.id)
      const partialTickets = await db
        .select({ id: tickets.id })
        .from(tickets)
        .where(inArray(tickets.import_id, partialImportIds))
      if (partialTickets.length > 0) {
        const partialTicketIds = partialTickets.map((t) => t.id)
        await db.delete(ticketTransitions).where(inArray(ticketTransitions.ticket_id, partialTicketIds))
        await db.delete(tickets).where(inArray(tickets.id, partialTicketIds))
      }
      await db.delete(importSessions).where(inArray(importSessions.id, partialImportIds))
    }
    await db.delete(projectConfigs).where(inArray(projectConfigs.id, existingIds))
  }

  const results = []
  for (const d of DEMO_PROJECTS) {
    const { import_id } = await seedDemoProject(d.name, d.fixture, d.config)
    results.push({ import_id, name: d.name, project_key: d.key })
  }

  return c.json(ok({ seeded: true, imports: results }), 201)
})

/**
 * DELETE /api/v1/demo/reset
 * Deletes all project data: ticket_transitions, tickets, import_sessions, project_configs.
 * Does NOT touch source_connections or llm_config.
 */
demo.delete('/reset', async (c) => {
  await db.delete(ticketTransitions).where(sql`1=1`)
  await db.delete(tickets).where(sql`1=1`)
  await db.delete(llmInsights).where(sql`1=1`)
  await db.delete(importSessions).where(sql`1=1`)
  await db.delete(projectConfigs).where(sql`1=1`)
  return new Response(null, { status: 204 })
})

export default demo
