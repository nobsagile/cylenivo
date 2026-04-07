import { trimTransitionsToCycleWindow, type Transition } from './utils.js'
import { calculateTimeInStatus } from './timeInStatus.js'
import type { CycleTimeMode } from './cycleTime.js'

/**
 * Calculates flow efficiency for a single ticket as a percentage (0–100).
 * Flow efficiency = sum of time in active statuses / total cycle time × 100.
 * Returns null if: no active statuses, cycle time is zero/null, or ticket is incomplete.
 */
export function calculateFlowEfficiency(
  transitions: Transition[],
  activeStatuses: string[],
  cycleStartStatus: string,
  cycleEndStatus: string,
  mode: CycleTimeMode,
  cycleDays: number,
): number | null {
  if (!activeStatuses.length || cycleDays <= 0) return null

  const windowed = trimTransitionsToCycleWindow(transitions, cycleStartStatus, cycleEndStatus, mode)
  if (!windowed.length) return null

  const timeByStatus = calculateTimeInStatus(windowed, activeStatuses)
  const activeTime = Object.values(timeByStatus).reduce((sum, t) => sum + t, 0)

  return Math.min(100, (activeTime / cycleDays) * 100)
}
