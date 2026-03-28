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

const fixturesDir = join(__dirname, '../tests/fixtures')
writeFileSync(join(fixturesDir, 'demo-improving.json'), JSON.stringify(improving, null, 2))
writeFileSync(join(fixturesDir, 'demo-declining.json'), JSON.stringify(declining, null, 2))

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
`
writeFileSync(join(__dirname, '../src/lib/demoData.ts'), tsContent)

console.log(`✓ demo-improving.json: ${improving.tickets.length} tickets (Jul–Dec 2025, improving)`)
console.log(`✓ demo-declining.json: ${declining.tickets.length} tickets (Jul–Dec 2025, declining)`)
console.log(`✓ src/lib/demoData.ts: TypeScript module for server binary`)
