/**
 * Two bugs guarded here.
 *
 * 1) Silent data loss. buildTicketRows drops tickets with an unparseable
 *    created_at and transitions with an unparseable transitioned_at, but only
 *    console.warn'd about it — while ticket_count was set from the INPUT length.
 *    A dataset reported "200 tickets" and held 195, and tickets quietly lost
 *    transitions, so their cycle times were computed from partial history.
 *
 * 2) Non-atomic transactions. bun:sqlite is a synchronous driver, so
 *    db.transaction(async tx => …) does NOT roll back — statements before the
 *    error stay committed. A failed import left a half-written dataset.
 */

import { describe, it, expect, beforeAll, beforeEach } from 'bun:test'
import { eq } from 'drizzle-orm'
import { app } from '../src/app.js'
import { migrate, db } from '../src/db/index.js'
import {
  projectConfigs, importSessions, tickets, ticketTransitions, llmInsights,
} from '../src/db/schema.js'
import { buildTicketRows } from '../src/lib/ticketInsert.js'

beforeAll(async () => { await migrate() })

beforeEach(async () => {
  await db.delete(ticketTransitions)
  await db.delete(tickets)
  await db.delete(llmInsights)
  await db.delete(importSessions)
  await db.delete(projectConfigs)
})

const GOOD_DATE = '2026-01-01T12:00:00.000Z'

function ticket(externalId: string, createdAt: string, transitionDates: string[]) {
  return {
    external_id: externalId,
    title: `Title ${externalId}`,
    ticket_type: 'story',
    created_at: createdAt,
    transitions: transitionDates.map((d, i) => ({
      from_status: i === 0 ? null : 'In Dev',
      to_status: i === 0 ? 'In Dev' : 'Done',
      transitioned_at: d,
    })),
  }
}

async function createConfig(): Promise<string> {
  const res = await app.request('/api/v1/configs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Integrity Test',
      source_type: 'jira',
      status_order: ['Backlog', 'In Dev', 'Done'],
      cycle_time_start_status: 'In Dev',
      cycle_time_end_status: 'Done',
    }),
  })
  const { data } = await res.json() as { data: { id: string } }
  return data.id
}

type ImportedSession = {
  id: string
  ticket_count: number
  health_report: {
    tickets_incomplete: number
    tickets_without_cycle_start: number
    unknown_statuses: string[]
    tickets_dropped: string[]
    transitions_dropped: number
    tickets_with_dropped_transitions: string[]
  }
}

async function importTickets(configId: string, tix: unknown[]) {
  const form = new FormData()
  const file = { source_type: 'jira', project_key: 'INT', exported_at: GOOD_DATE, tickets: tix }
  form.append('file', new Blob([JSON.stringify(file)], { type: 'application/json' }), 'int.json')
  form.append('config_id', configId)
  const res = await app.request('/api/v1/imports', { method: 'POST', body: form })
  const body = await res.json() as { data: ImportedSession; error?: string }
  return { status: res.status, session: body.data }
}

describe('buildTicketRows — reports what it drops', () => {
  it('reports nothing dropped for clean input', () => {
    const { ticketRows, transitionRows, dropped } = buildTicketRows('imp', [
      ticket('T-1', GOOD_DATE, [GOOD_DATE, '2026-01-06T12:00:00.000Z']),
    ])
    expect(ticketRows).toHaveLength(1)
    expect(transitionRows).toHaveLength(2)
    expect(dropped).toEqual({ tickets: [], transitions: 0, ticketsWithDroppedTransitions: [] })
  })

  it('names tickets dropped for an unparseable created_at', () => {
    const { ticketRows, dropped } = buildTicketRows('imp', [
      ticket('T-1', GOOD_DATE, [GOOD_DATE]),
      ticket('T-BAD', 'not a date', [GOOD_DATE]),
      ticket('T-2', GOOD_DATE, [GOOD_DATE]),
    ])
    expect(ticketRows).toHaveLength(2)
    expect(dropped.tickets).toEqual(['T-BAD'])
  })

  it('counts dropped transitions and names the affected tickets', () => {
    const { ticketRows, transitionRows, dropped } = buildTicketRows('imp', [
      ticket('T-1', GOOD_DATE, [GOOD_DATE, 'garbage']),
      ticket('T-2', GOOD_DATE, [GOOD_DATE, GOOD_DATE]),
    ])
    // The ticket survives — only its bad transition is gone
    expect(ticketRows).toHaveLength(2)
    expect(transitionRows).toHaveLength(3)
    expect(dropped.transitions).toBe(1)
    expect(dropped.ticketsWithDroppedTransitions).toEqual(['T-1'])
    expect(dropped.tickets).toEqual([])
  })

  it('treats an empty date string as invalid', () => {
    const { dropped } = buildTicketRows('imp', [ticket('T-EMPTY', '', [GOOD_DATE])])
    expect(dropped.tickets).toEqual(['T-EMPTY'])
  })
})

describe('POST /imports — ticket_count reflects reality', () => {
  it('counts inserted rows, not offered rows', async () => {
    const configId = await createConfig()
    const { status, session } = await importTickets(configId, [
      ticket('T-1', GOOD_DATE, [GOOD_DATE]),
      ticket('T-BAD', 'nope', [GOOD_DATE]),
      ticket('T-2', GOOD_DATE, [GOOD_DATE]),
    ])

    expect(status).toBe(201)
    // 3 offered, 1 rejected → 2. Reporting 3 here was the bug.
    expect(session.ticket_count).toBe(2)

    const rows = await db.select().from(tickets).where(eq(tickets.import_id, session.id))
    expect(rows).toHaveLength(2)
    expect(session.ticket_count).toBe(rows.length)
  })

  it('surfaces dropped tickets in the health report', async () => {
    const configId = await createConfig()
    const { session } = await importTickets(configId, [
      ticket('T-1', GOOD_DATE, [GOOD_DATE]),
      ticket('T-BAD', 'nope', [GOOD_DATE]),
    ])

    expect(session.health_report.tickets_dropped).toEqual(['T-BAD'])
    expect(session.health_report.transitions_dropped).toBe(0)
  })

  it('surfaces dropped transitions in the health report', async () => {
    const configId = await createConfig()
    const { session } = await importTickets(configId, [
      ticket('T-1', GOOD_DATE, [GOOD_DATE, 'garbage']),
    ])

    expect(session.health_report.transitions_dropped).toBe(1)
    expect(session.health_report.tickets_with_dropped_transitions).toEqual(['T-1'])
    expect(session.health_report.tickets_dropped).toEqual([])
  })

  it('reports empty drop lists for clean input', async () => {
    const configId = await createConfig()
    const { session } = await importTickets(configId, [ticket('T-1', GOOD_DATE, [GOOD_DATE])])

    expect(session.health_report.tickets_dropped).toEqual([])
    expect(session.health_report.transitions_dropped).toBe(0)
    expect(session.ticket_count).toBe(1)
  })

  it('the health report describes stored rows, not rejected input', async () => {
    const configId = await createConfig()
    const { session } = await importTickets(configId, [
      // dropped entirely — must NOT count as "started but never reached Done"
      ticket('T-BAD', 'nope', ['2026-01-02T12:00:00.000Z']),
      // stored, but lost its Done transition — must count as incomplete
      ticket('T-LOSTEND', GOOD_DATE, ['2026-01-02T12:00:00.000Z', 'garbage']),
    ])

    const h = session.health_report
    expect(session.ticket_count).toBe(1)
    // Exactly one stored ticket entered In Dev and never reached Done
    expect(h.tickets_incomplete).toBe(1)
    // The rejected ticket is reported as rejected, not as incomplete
    expect(h.tickets_dropped).toEqual(['T-BAD'])
    expect(h.tickets_with_dropped_transitions).toEqual(['T-LOSTEND'])
  })

  it('unknown_statuses only reflects statuses that were actually stored', async () => {
    const configId = await createConfig()
    const { session } = await importTickets(configId, [
      ticket('T-1', GOOD_DATE, [GOOD_DATE]),
      {
        external_id: 'T-GHOST',
        title: 'Rejected ticket with an off-config status',
        ticket_type: 'story',
        created_at: 'not a date',
        transitions: [{ from_status: null, to_status: 'Nowhere', transitioned_at: GOOD_DATE }],
      },
    ])

    // "Nowhere" only ever appeared on a ticket that was rejected
    expect(session.health_report.unknown_statuses).toEqual([])
    expect(session.health_report.tickets_dropped).toEqual(['T-GHOST'])
  })

  it('the list endpoint agrees with the stored rows', async () => {
    const configId = await createConfig()
    await importTickets(configId, [
      ticket('T-1', GOOD_DATE, [GOOD_DATE]),
      ticket('T-BAD', 'nope', [GOOD_DATE]),
    ])

    const res = await app.request('/api/v1/imports')
    const { data } = await res.json() as { data: { id: string; ticket_count: number }[] }
    for (const s of data) {
      const actual = await db.select().from(tickets).where(eq(tickets.import_id, s.id))
      expect(s.ticket_count).toBe(actual.length)
    }
  })
})

describe('PUT /imports/:id/data — refresh keeps the count honest', () => {
  async function replace(importId: string, tix: unknown[]) {
    const form = new FormData()
    const file = { source_type: 'jira', project_key: 'INT', exported_at: GOOD_DATE, tickets: tix }
    form.append('file', new Blob([JSON.stringify(file)], { type: 'application/json' }), 'int.json')
    const res = await app.request(`/api/v1/imports/${importId}/data`, { method: 'PUT', body: form })
    const body = await res.json() as { data: ImportedSession }
    return { status: res.status, session: body.data }
  }

  it('counts inserted rows after a refresh with bad data', async () => {
    const configId = await createConfig()
    const { session } = await importTickets(configId, [ticket('T-1', GOOD_DATE, [GOOD_DATE])])

    const { status, session: updated } = await replace(session.id, [
      ticket('T-1', GOOD_DATE, [GOOD_DATE]),
      ticket('T-2', GOOD_DATE, [GOOD_DATE]),
      ticket('T-BAD', 'nope', [GOOD_DATE]),
    ])

    expect(status).toBe(200)
    expect(updated.ticket_count).toBe(2)
    const rows = await db.select().from(tickets).where(eq(tickets.import_id, session.id))
    expect(rows).toHaveLength(2)
    expect(updated.health_report.tickets_dropped).toEqual(['T-BAD'])
  })

  it('replaces cleanly without leaving old rows behind', async () => {
    const configId = await createConfig()
    const { session } = await importTickets(configId, [
      ticket('OLD-1', GOOD_DATE, [GOOD_DATE]),
      ticket('OLD-2', GOOD_DATE, [GOOD_DATE]),
    ])

    await replace(session.id, [ticket('NEW-1', GOOD_DATE, [GOOD_DATE])])

    const rows = await db.select().from(tickets).where(eq(tickets.import_id, session.id))
    expect(rows.map(r => r.external_id)).toEqual(['NEW-1'])

    // No orphaned transitions from the replaced tickets
    const trans = await db.select().from(ticketTransitions)
    for (const tr of trans) {
      const owner = await db.select().from(tickets).where(eq(tickets.id, tr.ticket_id))
      expect(owner).toHaveLength(1)
    }
  })
})

describe('transactions actually roll back', () => {
  it('the synchronous form rolls back a failed multi-statement write', async () => {
    const configId = await createConfig()
    const { session } = await importTickets(configId, [
      ticket('T-1', GOOD_DATE, [GOOD_DATE]),
      ticket('T-2', GOOD_DATE, [GOOD_DATE]),
    ])

    const before = {
      tickets: (await db.select().from(tickets).where(eq(tickets.import_id, session.id))).length,
      transitions: (await db.select().from(ticketTransitions)).length,
    }
    expect(before.tickets).toBe(2)

    let threw = false
    try {
      db.transaction((tx) => {
        tx.delete(ticketTransitions).run()
        tx.delete(tickets).where(eq(tickets.import_id, session.id)).run()
        throw new Error('simulated mid-transaction failure')
      })
    } catch {
      threw = true
    }

    expect(threw).toBe(true)
    const after = {
      tickets: (await db.select().from(tickets).where(eq(tickets.import_id, session.id))).length,
      transitions: (await db.select().from(ticketTransitions)).length,
    }
    expect(after).toEqual(before)
  })

  it('documents that the async form does NOT roll back — why sync is required', async () => {
    // Regression guard on the reason for the sync form. If a future drizzle or
    // bun release makes async transactions atomic, this test fails and the
    // comments in imports.ts / llm.ts can be revisited.
    await db.delete(projectConfigs)
    const mk = (id: string) => ({
      id, name: id, source_type: 'jira', status_order: '["A","B"]',
      cycle_time_start_status: 'A', cycle_time_end_status: 'B',
      created_at: GOOD_DATE,
    })

    let threw = false
    try {
      await db.transaction(async (tx) => {
        await tx.insert(projectConfigs).values(mk('cfg-A'))
        await tx.insert(projectConfigs).values(mk('cfg-A'))  // PK violation
      })
    } catch {
      threw = true
    }

    expect(threw).toBe(true)
    const rows = await db.select().from(projectConfigs)
    expect(rows.map(r => r.id)).toEqual(['cfg-A'])  // NOT rolled back
  })
})
