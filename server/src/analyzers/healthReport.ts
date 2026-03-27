export interface ImportHealthReport {
  tickets_without_cycle_start: number  // never entered cycle_time_start_status
  tickets_incomplete: number           // entered cycle_start but never reached cycle_end
  unknown_statuses: string[]           // statuses in data not in status_order
  oldest_transition_date: string | null
}

interface TicketInput {
  transitions: Array<{ to_status: string; transitioned_at: string }>
}

export function buildHealthReport(
  tickets: TicketInput[],
  statusOrder: string[],
  cycleStart: string,
  cycleEnd: string,
): ImportHealthReport {
  const statusOrderSet = new Set(statusOrder)
  const unknownStatuses = new Set<string>()
  let ticketsWithoutCycleStart = 0
  let ticketsIncomplete = 0
  let oldestMs = Infinity

  for (const ticket of tickets) {
    let hasCycleStart = false
    let hasCycleEnd = false

    for (const tr of ticket.transitions) {
      if (!statusOrderSet.has(tr.to_status)) unknownStatuses.add(tr.to_status)
      if (tr.to_status === cycleStart) hasCycleStart = true
      if (tr.to_status === cycleEnd) hasCycleEnd = true
      const ts = new Date(tr.transitioned_at).getTime()
      if (ts < oldestMs) oldestMs = ts
    }

    if (!hasCycleStart) ticketsWithoutCycleStart++
    else if (!hasCycleEnd) ticketsIncomplete++
  }

  return {
    tickets_without_cycle_start: ticketsWithoutCycleStart,
    tickets_incomplete: ticketsIncomplete,
    unknown_statuses: [...unknownStatuses].sort(),
    oldest_transition_date: isFinite(oldestMs) ? new Date(oldestMs).toISOString() : null,
  }
}
