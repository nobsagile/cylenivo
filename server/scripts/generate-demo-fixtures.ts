/**
 * Generates two demo fixture files for Cylenivo:
 *   - demo-improving.json: team improving over 6 months (cycle time ↓, throughput ↑)
 *   - demo-declining.json: team declining over 6 months (cycle time ↑, throughput ↓)
 *
 * Usage: npx tsx server/scripts/generate-demo-fixtures.ts
 *
 * Output: server/tests/fixtures/demo-improving.json
 *         server/tests/fixtures/demo-declining.json
 *
 * The generator is deterministic (seeded PRNG). Re-running produces identical output.
 * Re-run whenever status_order or schema changes.
 */

import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// --- Seeded PRNG (mulberry32) ---
function createRng(seed: number) {
  let s = seed | 0
  return (): number => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const DAY_MS = 24 * 60 * 60 * 1000

function addMs(date: Date, ms: number): Date {
  return new Date(date.getTime() + ms)
}

// Approximate Gaussian via 3 uniforms, clamped to [min, ∞)
function randCycle(rng: () => number, mean: number, std: number, min = 1): number {
  const u = (rng() + rng() + rng()) / 3
  const z = (u - 0.5) * 2
  return Math.max(min, Math.round(mean + z * std * 2))
}

type TicketType = 'story' | 'bug' | 'task'

const TITLES: Record<TicketType, string[]> = {
  story: [
    'Implement user authentication flow',
    'Add pagination to results list',
    'Build CSV export feature',
    'Redesign settings page layout',
    'Add keyboard shortcut support',
    'Integrate webhook notifications',
    'Build team overview dashboard',
    'Add multi-select bulk actions',
    'Implement full-text search',
    'Add weekly email digest',
    'Build onboarding wizard',
    'Implement role-based permissions',
    'Add custom field support',
    'Build activity feed component',
    'Implement audit log view',
    'Add real-time collaboration',
    'Build notification preferences',
    'Implement data retention policy',
    'Add SSO provider support',
    'Build public API endpoints',
  ],
  bug: [
    'Fix date picker timezone offset',
    'Fix memory leak in polling loop',
    'Resolve save race condition',
    'Fix broken layout on small screens',
    'Fix incorrect percentage display',
    'Resolve deep link 404 error',
    'Fix export data truncation',
    'Fix flaky test in CI pipeline',
    'Fix session timeout handling',
    'Fix null reference on empty state',
    'Fix drag-and-drop reorder bug',
    'Resolve import validation error',
    'Fix incorrect sort order',
    'Resolve double-submit on form',
    'Fix tooltip positioning',
  ],
  task: [
    'Upgrade dependencies to latest',
    'Migrate to structured logging',
    'Refactor API client layer',
    'Add performance benchmarks',
    'Document REST API endpoints',
    'Configure staging environment',
    'Remove deprecated API calls',
    'Optimize slow dashboard query',
    'Add rate limiting to endpoints',
    'Set up error monitoring alerts',
    'Extract shared UI components',
    'Add database index for search',
  ],
}

function pickTitle(rng: () => number, type: TicketType, used: Map<TicketType, Set<string>>): string {
  if (!used.has(type)) used.set(type, new Set())
  const seen = used.get(type)!
  const available = TITLES[type].filter((t) => !seen.has(t))
  const pool = available.length > 0 ? available : TITLES[type]
  if (available.length === 0) seen.clear()
  const title = pool[Math.floor(rng() * pool.length)]
  seen.add(title)
  return title
}

function randomType(rng: () => number): TicketType {
  const r = rng()
  if (r < 0.55) return 'story'
  if (r < 0.85) return 'bug'
  return 'task'
}

interface MonthSpec {
  monthStart: Date
  ticketCount: number
  avgCycleDays: number
  stdDays: number
}

interface Transition {
  from_status: string | null
  to_status: string
  transitioned_at: string
}

function generateTickets(specs: MonthSpec[], projectKey: string, rng: () => number) {
  const tickets = []
  let counter = 1
  const usedTitles = new Map<TicketType, Set<string>>()

  for (const { monthStart, ticketCount, avgCycleDays, stdDays } of specs) {
    const monthDays = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate()

    for (let i = 0; i < ticketCount; i++) {
      const externalId = `${projectKey}-${counter++}`
      const type = randomType(rng)
      const title = pickTitle(rng, type, usedTitles)
      const cycleDays = randCycle(rng, avgCycleDays, stdDays)

      // Spread In Progress starts across first 25 days of the month
      const dayOffset = Math.floor(rng() * Math.min(25, monthDays - 2))
      const inProgressDate = new Date(Date.UTC(
        monthStart.getUTCFullYear(),
        monthStart.getUTCMonth(),
        1 + dayOffset,
        8 + Math.floor(rng() * 9),
        Math.floor(rng() * 60),
      ))

      // created_at: 2–7 days before In Progress
      const backlogWaitDays = 2 + Math.floor(rng() * 6)
      const createdAt = addMs(inProgressDate, -backlogWaitDays * DAY_MS)

      // Backlog entry: created_at + 30min–4h
      const backlogAt = addMs(createdAt, Math.floor((0.5 + rng() * 3.5) * 3_600_000))

      const hasRework = rng() < 0.15

      const transitions: Transition[] = [
        { from_status: null, to_status: 'Backlog', transitioned_at: backlogAt.toISOString() },
        { from_status: 'Backlog', to_status: 'In Progress', transitioned_at: inProgressDate.toISOString() },
      ]

      if (hasRework) {
        // Rework adds 20–50% extra time
        const reworkPenalty = 1.2 + rng() * 0.3
        const totalDays = cycleDays * reworkPenalty
        // First review at ~40% of original cycle
        const rev1 = addMs(inProgressDate, cycleDays * 0.4 * DAY_MS)
        transitions.push({ from_status: 'In Progress', to_status: 'In Review', transitioned_at: rev1.toISOString() })
        // Back to In Progress after half a day
        const back = addMs(rev1, 0.5 * DAY_MS)
        transitions.push({ from_status: 'In Review', to_status: 'In Progress', transitioned_at: back.toISOString() })
        // Second review after rework
        const rev2 = addMs(back, (totalDays - cycleDays * 0.4 - 0.5) * 0.7 * DAY_MS)
        transitions.push({ from_status: 'In Progress', to_status: 'In Review', transitioned_at: rev2.toISOString() })
        // Done at total (with penalty)
        const done = addMs(inProgressDate, totalDays * DAY_MS)
        transitions.push({ from_status: 'In Review', to_status: 'Done', transitioned_at: done.toISOString() })
      } else {
        // Simple: In Review at 75%, Done at 100%
        const inReview = addMs(inProgressDate, cycleDays * 0.75 * DAY_MS)
        transitions.push({ from_status: 'In Progress', to_status: 'In Review', transitioned_at: inReview.toISOString() })
        const done = addMs(inProgressDate, cycleDays * DAY_MS)
        transitions.push({ from_status: 'In Review', to_status: 'Done', transitioned_at: done.toISOString() })
      }

      const storyPoints = type === 'story'
        ? Math.pow(2, Math.floor(rng() * 4))  // 1, 2, 4, or 8
        : null

      tickets.push({
        external_id: externalId,
        title,
        ticket_type: type,
        created_at: createdAt.toISOString(),
        transitions,
        ...(storyPoints !== null ? { metadata: { story_points: storyPoints } } : {}),
      })
    }
  }

  return tickets
}

// --- GAMMA: Real World Team ---
// Simulates a team that expanded their process mid-year, then simplified again:
//
// Q1 (Jan–Mar): simple — Backlog → In Progress → In Review → Done
// Q2–Q3 (Apr–Sep): expanded — team adds refinement + QA stages:
//   Backlog → Ready for Dev → In Progress → In Review → QA → Done
//   ("Ready for Dev" = ticket is refined and estimated, ready to be picked up)
//   ("QA" = quality testing after code review, before release)
//   Some tickets skip "Ready for Dev" (hot-fixes) or "QA" (small/trivial changes)
// Q4 (Oct–Dec): simplified again — team drops the extra stages:
//   Backlog → In Progress → In Review → Done
//
// Config status_order covers all eras:
//   ['Backlog', 'Ready for Dev', 'In Progress', 'In Review', 'QA', 'Done']
// "Ready for Dev" falls before cycleStart (In Progress) → outside cycle window
// Q1/Q4 tickets never enter "Ready for Dev" or "QA" → 0 time in those for those eras
//
// Edge cases:
//   ~5%  zombie tickets: cycle time 90–180 days
//   ~10% quick tickets: cycle time < 12 hours
//   ~5%  no-transition tickets: stuck in Backlog (incomplete)
//   ~20% rework tickets: backward moves (always detectable via status_order)
//   ~3%  equal-timestamp: two consecutive transitions at same ms

const GAMMA_Q1_FLOW  = ['Backlog', 'In Progress', 'In Review', 'Done']
const GAMMA_Q2Q3_FLOW = ['Backlog', 'Ready for Dev', 'In Progress', 'In Review', 'QA', 'Done']
const GAMMA_Q4_FLOW  = ['Backlog', 'In Progress', 'In Review', 'Done']

function getGammaFlow(month: number): string[] {
  if (month <= 3) return GAMMA_Q1_FLOW
  if (month <= 9) return GAMMA_Q2Q3_FLOW
  return GAMMA_Q4_FLOW
}

function buildGammaPath(flow: string[], rng: () => number): string[] {
  const path = [...flow]
  // Some Q2-Q3 tickets skip "Ready for Dev" (hot-fix going straight to development)
  if (path.includes('Ready for Dev') && rng() < 0.30) path.splice(path.indexOf('Ready for Dev'), 1)
  // Some Q2-Q3 tickets skip "QA" (trivial change with low risk)
  if (path.includes('QA') && rng() < 0.25) path.splice(path.indexOf('QA'), 1)
  return path
}

function buildGammaMainTransitions(
  path: string[],
  backlogAt: Date,
  cycleDays: number,
): Transition[] {
  const totalMs = cycleDays * DAY_MS
  const result: Transition[] = []
  // path[0] = Backlog (covered by firstTransition with from_status: null)
  // transitions: path[i] → path[i+1] for i in 0..path.length-2
  for (let i = 0; i < path.length - 1; i++) {
    let ts: number
    if (i === 0) {
      // Backlog → first work status: ~1h after backlog entry
      ts = backlogAt.getTime() + 3_600_000
    } else if (i === path.length - 2) {
      // Last transition → Done: at full cycle
      ts = backlogAt.getTime() + totalMs
    } else {
      // Intermediate steps: evenly distributed between first-work (1h) and Done (totalMs)
      // progress = i/(path.length-2) gives 0…1 uniformly across all intermediate steps
      const progress = i / (path.length - 2)
      ts = backlogAt.getTime() + 3_600_000 + Math.floor(progress * (totalMs - 3_600_000))
    }
    result.push({ from_status: path[i], to_status: path[i + 1], transitioned_at: new Date(ts).toISOString() })
  }
  return result
}

function generateGammaTickets(rng: () => number): any[] {
  const allTickets: any[] = []
  let counter = 1
  const usedTitles = new Map<TicketType, Set<string>>()

  for (let month = 1; month <= 12; month++) {
    const ticketCount = 33 + Math.floor(rng() * 8)   // 33–40/month → ~440–480 total
    const flow = getGammaFlow(month)
    const isComplexEra = flow.includes('Ready for Dev')

    for (let i = 0; i < ticketCount; i++) {
      const externalId = `GAMMA-${counter++}`
      const type = randomType(rng)
      const title = pickTitle(rng, type, usedTitles)

      // Mutually exclusive edge case categories
      const edgeRoll = rng()
      const isZombie      = edgeRoll < 0.05
      const isQuick       = edgeRoll >= 0.05 && edgeRoll < 0.15
      const isNoTransition= edgeRoll >= 0.15 && edgeRoll < 0.20
      const hasRework     = !isZombie && !isQuick && !isNoTransition && rng() < 0.20
      const addEqualTs    = !isZombie && !isQuick && !isNoTransition && rng() < 0.03

      // Spread creation across month
      const dayOfMonth = 1 + Math.floor(rng() * 25)
      const hour = 8 + Math.floor(rng() * 9)
      const createdAt = new Date(Date.UTC(2025, month - 1, dayOfMonth, hour, Math.floor(rng() * 60)))
      const backlogAt = addMs(createdAt, Math.floor((1 + rng() * 3) * 3_600_000))

      const firstTransition: Transition = { from_status: null, to_status: flow[0], transitioned_at: backlogAt.toISOString() }

      if (isNoTransition) {
        allTickets.push({ external_id: externalId, title, ticket_type: type, created_at: createdAt.toISOString(), transitions: [firstTransition] })
        continue
      }

      let cycleDays: number
      if (isZombie) {
        cycleDays = 90 + Math.floor(rng() * 91)         // 90–180 days
      } else if (isQuick) {
        cycleDays = 0.08 + rng() * 0.38                 // ~2–11 hours
      } else {
        // Normal: mean ~8d, std ~4d, min 1d
        cycleDays = Math.max(1, Math.round(8 + (rng() + rng() + rng() - 1.5) * 4))
      }

      const path = buildGammaPath(flow, rng)
      let mainTransitions = buildGammaMainTransitions(path, backlogAt, cycleDays)

      // Equal-timestamp: force transition[1] same ms as transition[0]
      if (addEqualTs && mainTransitions.length >= 2) {
        mainTransitions[1] = { ...mainTransitions[1], transitioned_at: mainTransitions[0].transitioned_at }
      }

      let allTrans: Transition[] = [firstTransition, ...mainTransitions]

      // Rework: insert a backward move, Done gets a penalty on top of original
      if (hasRework && allTrans.length >= 3) {
        const doneT = allTrans[allTrans.length - 1]      // original → Done
        const prevT = allTrans[allTrans.length - 2]      // transition before Done
        const originalDoneMs = new Date(doneT.transitioned_at).getTime()
        // Backward move happens ~60-80% through the cycle
        const reworkAt = addMs(new Date(prevT.transitioned_at), Math.floor((0.3 + rng() * 0.4) * cycleDays * DAY_MS))
        const resumeAt = addMs(reworkAt, Math.floor((0.5 + rng() * 1.5) * DAY_MS))
        // New Done = original Done + 0.5–2.5 day penalty (always later, never shorter)
        const newDoneAt = new Date(Math.max(resumeAt.getTime() + DAY_MS, originalDoneMs + Math.floor((0.5 + rng() * 2) * DAY_MS)))
        allTrans.pop()  // remove old Done
        allTrans.push(
          { from_status: prevT.to_status, to_status: prevT.from_status!, transitioned_at: reworkAt.toISOString() },
          { from_status: prevT.from_status!, to_status: prevT.to_status, transitioned_at: resumeAt.toISOString() },
          { from_status: doneT.from_status, to_status: 'Done', transitioned_at: newDoneAt.toISOString() },
        )
      }

      // Q2–Q3: ~8% of tickets also pass through 'In Review (blocked)' — a detour before In Review
      if (isComplexEra && rng() < 0.08) {
        const reviewIdx = allTrans.findIndex(t => t.to_status === 'In Review')
        if (reviewIdx > 0) {
          const reviewMs = new Date(allTrans[reviewIdx].transitioned_at).getTime()
          const blockedAt = new Date(reviewMs - Math.floor(0.4 * DAY_MS))
          const unblockedAt = new Date(reviewMs - Math.floor(0.1 * DAY_MS))
          allTrans.splice(reviewIdx, 0,
            { from_status: allTrans[reviewIdx - 1].to_status, to_status: 'In Review (blocked)', transitioned_at: blockedAt.toISOString() },
            { from_status: 'In Review (blocked)', to_status: allTrans[reviewIdx - 1].to_status, transitioned_at: unblockedAt.toISOString() },
          )
        }
      }

      allTickets.push({ external_id: externalId, title, ticket_type: type, created_at: createdAt.toISOString(), transitions: allTrans })
    }
  }

  return allTickets
}

// --- Scenario definitions ---

// Improving team: cycle time 20d→4d, throughput 15→28/month over Jul–Dec 2025
const improvingSpecs: MonthSpec[] = [
  { monthStart: new Date('2025-07-01T00:00:00Z'), ticketCount: 15, avgCycleDays: 20, stdDays: 6 },
  { monthStart: new Date('2025-08-01T00:00:00Z'), ticketCount: 18, avgCycleDays: 16, stdDays: 5 },
  { monthStart: new Date('2025-09-01T00:00:00Z'), ticketCount: 22, avgCycleDays: 12, stdDays: 4 },
  { monthStart: new Date('2025-10-01T00:00:00Z'), ticketCount: 24, avgCycleDays: 8,  stdDays: 3 },
  { monthStart: new Date('2025-11-01T00:00:00Z'), ticketCount: 26, avgCycleDays: 6,  stdDays: 2 },
  { monthStart: new Date('2025-12-01T00:00:00Z'), ticketCount: 28, avgCycleDays: 4,  stdDays: 1 },
]

// Declining team: cycle time 4d→20d, throughput 28→15/month over Jul–Dec 2025
const decliningSpecs: MonthSpec[] = [
  { monthStart: new Date('2025-07-01T00:00:00Z'), ticketCount: 28, avgCycleDays: 4,  stdDays: 1 },
  { monthStart: new Date('2025-08-01T00:00:00Z'), ticketCount: 26, avgCycleDays: 6,  stdDays: 2 },
  { monthStart: new Date('2025-09-01T00:00:00Z'), ticketCount: 24, avgCycleDays: 8,  stdDays: 3 },
  { monthStart: new Date('2025-10-01T00:00:00Z'), ticketCount: 22, avgCycleDays: 12, stdDays: 4 },
  { monthStart: new Date('2025-11-01T00:00:00Z'), ticketCount: 18, avgCycleDays: 16, stdDays: 5 },
  { monthStart: new Date('2025-12-01T00:00:00Z'), ticketCount: 15, avgCycleDays: 20, stdDays: 6 },
]

const rng1 = createRng(42)
const rng2 = createRng(137)
const rng3 = createRng(999)
const now = new Date().toISOString()

const improving = {
  source_type: 'jira',
  project_key: 'ALPHA',
  exported_at: now,
  tickets: generateTickets(improvingSpecs, 'ALPHA', rng1),
}

const declining = {
  source_type: 'jira',
  project_key: 'BETA',
  exported_at: now,
  tickets: generateTickets(decliningSpecs, 'BETA', rng2),
}

const realworld = {
  source_type: 'jira',
  project_key: 'GAMMA',
  exported_at: now,
  tickets: generateGammaTickets(rng3),
}

const fixturesDir = join(__dirname, '../tests/fixtures')
writeFileSync(join(fixturesDir, 'demo-improving.json'), JSON.stringify(improving, null, 2))
writeFileSync(join(fixturesDir, 'demo-declining.json'), JSON.stringify(declining, null, 2))
writeFileSync(join(fixturesDir, 'demo-realworld.json'), JSON.stringify(realworld, null, 2))

// Also write a TypeScript module so esbuild can bundle the data into the server binary.
// This file is auto-generated — edit generate-demo-fixtures.ts instead.
const tsContent = `// AUTO-GENERATED — do not edit. Run: npx tsx server/scripts/generate-demo-fixtures.ts

export interface DemoTransition {
  from_status: string | null
  to_status: string
  transitioned_at: string
}

export interface DemoTicket {
  external_id: string
  title: string
  ticket_type: string
  created_at: string
  transitions: DemoTransition[]
  metadata?: { story_points: number }
}

export interface DemoFixture {
  source_type: string
  project_key: string
  exported_at: string
  tickets: DemoTicket[]
}

export const DEMO_IMPROVING: DemoFixture = ${JSON.stringify(improving, null, 2)}

export const DEMO_DECLINING: DemoFixture = ${JSON.stringify(declining, null, 2)}

export const DEMO_REALWORLD: DemoFixture = ${JSON.stringify(realworld, null, 2)}
`
writeFileSync(join(__dirname, '../src/lib/demoData.ts'), tsContent)

console.log(`✓ demo-improving.json: ${improving.tickets.length} tickets (Jul–Dec 2025, improving)`)
console.log(`✓ demo-declining.json: ${declining.tickets.length} tickets (Jul–Dec 2025, declining)`)
console.log(`✓ demo-realworld.json: ${realworld.tickets.length} tickets (Jan–Dec 2025, real-world)`)
console.log(`✓ src/lib/demoData.ts: TypeScript module for server binary`)
