import { sortTransitions } from './utils.js'
import type { Transition } from './utils.js'

export interface ReworkMove {
  from_status: string
  to_status: string
}

export interface ReworkResult {
  has_rework: boolean
  backward_moves: ReworkMove[]
}

/**
 * Detects backward movements in a ticket's transitions based on status_order index.
 * A backward move = to_status has a lower index in status_order than from_status.
 */
export function detectRework(transitions: Transition[], statusOrder: string[]): ReworkResult {
  const sorted = sortTransitions(transitions)

  const backward_moves: ReworkMove[] = []

  for (const t of sorted) {
    if (!t.from_status) continue
    const fromIdx = statusOrder.indexOf(t.from_status)
    const toIdx = statusOrder.indexOf(t.to_status)
    if (fromIdx === -1 || toIdx === -1) continue
    if (toIdx < fromIdx) {
      backward_moves.push({ from_status: t.from_status, to_status: t.to_status })
    }
  }

  return { has_rework: backward_moves.length > 0, backward_moves }
}

export interface ReworkPath {
  from: string
  to: string
  count: number
}

export interface AggregateReworkResult {
  tickets_with_rework: number
  total_completed: number
  rework_paths: ReworkPath[]
  avg_cycle_with_rework: number | null
  avg_cycle_without_rework: number | null
}

/**
 * Aggregates rework across all completed tickets.
 */
export function aggregateRework(
  tickets: { transitions: Transition[]; cycle_time_days: number | null }[],
  statusOrder: string[],
): AggregateReworkResult {
  const completed = tickets.filter(t => t.cycle_time_days !== null)
  const pathCounts = new Map<string, number>()

  let withRework = 0
  let cycleSum_rework = 0
  let cycleSum_norework = 0
  let count_rework = 0
  let count_norework = 0

  for (const ticket of completed) {
    const result = detectRework(ticket.transitions, statusOrder)
    if (result.has_rework) {
      withRework++
      cycleSum_rework += ticket.cycle_time_days!
      count_rework++
      for (const move of result.backward_moves) {
        const key = `${move.from_status}\x00${move.to_status}`
        pathCounts.set(key, (pathCounts.get(key) ?? 0) + 1)
      }
    } else {
      cycleSum_norework += ticket.cycle_time_days!
      count_norework++
    }
  }

  const rework_paths: ReworkPath[] = [...pathCounts.entries()]
    .map(([key, count]) => {
      const sep = key.indexOf('\x00')
      return { from: key.slice(0, sep), to: key.slice(sep + 1), count }
    })
    .sort((a, b) => b.count - a.count)

  return {
    tickets_with_rework: withRework,
    total_completed: completed.length,
    rework_paths,
    avg_cycle_with_rework: count_rework > 0 ? Math.round((cycleSum_rework / count_rework) * 100) / 100 : null,
    avg_cycle_without_rework: count_norework > 0 ? Math.round((cycleSum_norework / count_norework) * 100) / 100 : null,
  }
}
