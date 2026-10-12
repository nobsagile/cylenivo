import { resolveCycleWindow, windowDays, type RestartOptions } from './cycleWindow.js'
import type { Transition } from './utils.js'

export type CycleTimeMode = 'first_last' | 'first_first' | 'last_last'

export function calculateCycleTime(
  transitions: Transition[],
  startStatus: string,
  endStatus: string,
  mode: CycleTimeMode = 'first_last',
  restart?: RestartOptions,
): number | null {
  return windowDays(resolveCycleWindow(transitions, startStatus, endStatus, mode, restart))
}
