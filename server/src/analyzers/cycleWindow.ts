import { sortTransitions, trimTransitionsToCycleWindow, type Transition } from './utils.js'
import type { CycleTimeMode } from './cycleTime.js'

export interface RestartOptions {
  /** status_order sliced to the cycle window — entering any of these after a restart re-starts the clock */
  cycleStatuses: string[]
  /** statuses that abort a started ticket (e.g. "Backlog"); empty = feature off */
  restartStatuses: string[]
}

export interface RestartInfo {
  /** entries into a restart status after the ticket had started */
  count: number
  /** re-entry into the cycle after the last restart; null if the ticket never came back */
  restarted_at: Date | null
  /** time between the original start and the new start (or the abort, if abandoned) — unrounded */
  discarded_days: number
  /** started, then moved to a restart status and never came back */
  abandoned: boolean
}

export interface CycleWindow {
  start: Date | null
  end: Date | null
  restart: RestartInfo | null
}

const DAY_MS = 1000 * 86400

function ts(t: Transition): Date | null {
  const d = new Date(t.transitioned_at)
  return isNaN(d.getTime()) ? null : d
}

/**
 * Resolves start and end of a ticket's cycle window for the given mode.
 *
 * Restart policy: if a ticket enters a restart status (e.g. Backlog) after it
 * first entered the start status, the attempt counts as aborted. The clock then
 * starts at the next entry into ANY cycle status — a ticket often comes back
 * mid-cycle (Up Next → Development) and never re-enters the start status.
 * A ticket that never comes back is abandoned: no start, no end, not completed.
 *
 * Without restart statuses (or without a restart) the result equals the
 * plain mode logic, so existing configs compute exactly as before.
 */
export function resolveCycleWindow(
  transitions: Transition[],
  startStatus: string,
  endStatus: string,
  mode: CycleTimeMode = 'first_last',
  opts?: RestartOptions,
): CycleWindow {
  const sorted = sortTransitions(transitions).filter(t => ts(t) !== null)
  const startEntries = sorted.filter(t => t.to_status === startStatus)
  const endEntries = sorted.filter(t => t.to_status === endStatus)

  const pick = (entries: Transition[], first: boolean) =>
    entries.length ? ts(first ? entries[0] : entries[entries.length - 1]) : null

  const baseStart = pick(startEntries, mode !== 'last_last')
  const baseEnd = pick(endEntries, mode === 'first_first')
  const base: CycleWindow = { start: baseStart, end: baseEnd, restart: null }

  const restartStatuses = opts?.restartStatuses ?? []
  const firstStart = pick(startEntries, true)
  if (!restartStatuses.length || !firstStart) return base

  const restartIdx: number[] = []
  sorted.forEach((t, i) => {
    if (restartStatuses.includes(t.to_status) && ts(t)! > firstStart) restartIdx.push(i)
  })
  if (!restartIdx.length) return base

  const lastRestartIdx = restartIdx[restartIdx.length - 1]
  const cycleStatuses = opts!.cycleStatuses.length ? opts!.cycleStatuses : [startStatus]
  const reentry = sorted.slice(lastRestartIdx + 1).find(t => cycleStatuses.includes(t.to_status))
  const origin = baseStart ?? firstStart

  if (!reentry) {
    const abortedAt = ts(sorted[lastRestartIdx])!
    return {
      start: null,
      end: null,
      restart: {
        count: restartIdx.length,
        restarted_at: null,
        discarded_days: Math.max(0, (abortedAt.getTime() - origin.getTime()) / DAY_MS),
        abandoned: true,
      },
    }
  }

  const reentryAt = ts(reentry)!
  // last_last may already start after the re-entry — keep the later start
  const start = baseStart && baseStart >= reentryAt ? baseStart : reentryAt
  const endAfterStart = endEntries.filter(t => ts(t)! >= start)
  const end = pick(endAfterStart, mode === 'first_first')

  return {
    start,
    end,
    restart: {
      count: restartIdx.length,
      restarted_at: reentryAt,
      discarded_days: Math.max(0, (start.getTime() - origin.getTime()) / DAY_MS),
      abandoned: false,
    },
  }
}

/** Cycle time in days for a resolved window; null if incomplete or inverted. */
export function windowDays(w: CycleWindow): number | null {
  if (w.start === null || w.end === null) return null
  if (w.end < w.start) return null
  return (w.end.getTime() - w.start.getTime()) / DAY_MS
}

/**
 * trimTransitionsToCycleWindow with the restart policy applied. Every
 * per-status view of the cycle (time in status, flow efficiency) must use
 * this, so its window matches cycle_time_days.
 */
export function trimToCycleWindow(
  transitions: Transition[],
  cycleStart: string,
  cycleEnd: string,
  mode: CycleTimeMode = 'first_last',
  opts?: RestartOptions,
): Transition[] {
  const w = resolveCycleWindow(transitions, cycleStart, cycleEnd, mode, opts)
  if (!w.restart) return trimTransitionsToCycleWindow(transitions, cycleStart, cycleEnd, mode)
  if (w.start === null) return []
  const sorted = sortTransitions(transitions)
  const from = w.start.getTime()
  const to = (w.end ?? new Date(sorted[sorted.length - 1].transitioned_at)).getTime()
  return sorted.filter(t => {
    const ms = new Date(t.transitioned_at).getTime()
    return ms >= from && ms <= to
  })
}
