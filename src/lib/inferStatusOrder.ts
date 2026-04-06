interface TransitionLike {
  from_status?: string | null
  to_status: string
  transitioned_at: string
}

interface TicketLike {
  transitions?: TransitionLike[]
}

function sortByTime(transitions: TransitionLike[]): TransitionLike[] {
  return [...transitions].sort((a, b) => {
    const diff = new Date(a.transitioned_at).getTime() - new Date(b.transitioned_at).getTime()
    return diff !== 0 ? diff : a.to_status.localeCompare(b.to_status)
  })
}

export function inferStatusOrder(tickets: TicketLike[]): string[] {
  const acc = new Map<string, { sum: number; count: number }>()

  for (const ticket of tickets) {
    const transitions = ticket.transitions ?? []
    if (!transitions.length) continue

    const sorted = sortByTime(transitions)
    const sequence: string[] = []
    const seen = new Set<string>()

    const firstFrom = sorted[0].from_status
    if (firstFrom != null && firstFrom !== '') {
      seen.add(firstFrom)
      sequence.push(firstFrom)
    }

    for (const t of sorted) {
      if (!seen.has(t.to_status)) {
        seen.add(t.to_status)
        sequence.push(t.to_status)
      }
    }

    if (sequence.length === 0) continue

    if (sequence.length === 1) {
      const s = sequence[0]
      const entry = acc.get(s) ?? { sum: 0, count: 0 }
      entry.sum += 0.5
      entry.count += 1
      acc.set(s, entry)
      continue
    }

    const n = sequence.length
    for (let i = 0; i < n; i++) {
      const s = sequence[i]
      const entry = acc.get(s) ?? { sum: 0, count: 0 }
      entry.sum += i / (n - 1)
      entry.count += 1
      acc.set(s, entry)
    }
  }

  return [...acc.entries()]
    .sort((a, b) => {
      const diff = a[1].sum / a[1].count - b[1].sum / b[1].count
      return diff !== 0 ? diff : a[0].localeCompare(b[0])
    })
    .map(([status]) => status)
}
