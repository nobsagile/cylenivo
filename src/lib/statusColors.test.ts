import { describe, it, expect } from 'vitest'
import { getTypeColor, getConfigIndices, isInCycle, isInLead, pickShade, TYPE_COLORS, type ConfigIndices } from './statusColors'
import type { ConfigContext } from '@/types'

// ── getTypeColor ──────────────────────────────────────────────────────────────

describe('getTypeColor', () => {
  it('returns known color for standard types', () => {
    expect(getTypeColor('bug')).toBe(TYPE_COLORS.bug)
    expect(getTypeColor('story')).toBe(TYPE_COLORS.story)
    expect(getTypeColor('task')).toBe(TYPE_COLORS.task)
    expect(getTypeColor('epic')).toBe(TYPE_COLORS.epic)
  })

  it('returns hash-based color for unknown types', () => {
    const color = getTypeColor('improvement')
    expect(color).toBeTruthy()
    expect(color).not.toBe(TYPE_COLORS.story) // not mapped to story anymore
  })

  it('returns deterministic color for same type', () => {
    expect(getTypeColor('spike')).toBe(getTypeColor('spike'))
    expect(getTypeColor('change request')).toBe(getTypeColor('change request'))
  })

  it('returns different colors for different types', () => {
    // Not guaranteed for all pairs but should work for most
    const colors = new Set(['a', 'b', 'c', 'd', 'e'].map(getTypeColor))
    expect(colors.size).toBeGreaterThan(1)
  })

  it('returns gray fallback for null/undefined', () => {
    const gray = 'bg-gray-50 text-gray-600 border-gray-200'
    expect(getTypeColor(null)).toBe(gray)
    expect(getTypeColor(undefined)).toBe(gray)
  })

  it('returns hash color for empty string', () => {
    const color = getTypeColor('')
    expect(color).toBe('bg-gray-50 text-gray-600 border-gray-200')
  })
})

// ── isInCycle / isInLead ──────────────────────────────────────────────────────

describe('isInCycle', () => {
  const indices: ConfigIndices = { cycleStartIdx: 2, cycleEndIdx: 4, leadStartIdx: 1, leadEndIdx: 4 }

  it('returns true for status within cycle window', () => {
    expect(isInCycle(2, indices)).toBe(true)
    expect(isInCycle(3, indices)).toBe(true)
    expect(isInCycle(4, indices)).toBe(true)
  })

  it('returns false for status outside cycle window', () => {
    expect(isInCycle(0, indices)).toBe(false)
    expect(isInCycle(1, indices)).toBe(false)
    expect(isInCycle(5, indices)).toBe(false)
  })
})

describe('isInLead', () => {
  it('with explicit lead start', () => {
    const indices: ConfigIndices = { cycleStartIdx: 2, cycleEndIdx: 4, leadStartIdx: 1, leadEndIdx: 4 }
    expect(isInLead(0, indices)).toBe(false)
    expect(isInLead(1, indices)).toBe(true)
    expect(isInLead(4, indices)).toBe(true)
    expect(isInLead(5, indices)).toBe(false)
  })

  it('with no lead start (leadStartIdx=-1) includes all up to end', () => {
    const indices: ConfigIndices = { cycleStartIdx: 2, cycleEndIdx: 4, leadStartIdx: -1, leadEndIdx: 4 }
    expect(isInLead(0, indices)).toBe(true)
    expect(isInLead(4, indices)).toBe(true)
    expect(isInLead(5, indices)).toBe(false)
  })
})

// ── pickShade ─────────────────────────────────────────────────────────────────

describe('pickShade', () => {
  const shades = ['light', 'medium', 'dark'] as const

  it('picks first shade for first status', () => {
    expect(pickShade([...shades], ['A', 'B', 'C'], 'A')).toBe('light')
  })

  it('picks last shade for last status', () => {
    expect(pickShade([...shades], ['A', 'B', 'C'], 'C')).toBe('dark')
  })

  it('picks middle shade for middle status', () => {
    expect(pickShade([...shades], ['A', 'B', 'C'], 'B')).toBe('medium')
  })

  it('returns first shade for unknown status', () => {
    expect(pickShade([...shades], ['A', 'B'], 'Z')).toBe('light')
  })

  it('handles single-status group', () => {
    expect(pickShade([...shades], ['A'], 'A')).toBe('light')
  })
})

// ── getConfigIndices ──────────────────────────────────────────────────────────

describe('getConfigIndices', () => {
  it('returns correct indices for standard config', () => {
    const config = {
      status_order: ['Backlog', 'Ready', 'Dev', 'Review', 'Done'],
      cycle_time_start_status: 'Dev',
      cycle_time_end_status: 'Done',
      lead_time_start_status: null,
      lead_time_end_status: null,
    } as ConfigContext
    const idx = getConfigIndices(config)
    expect(idx.cycleStartIdx).toBe(2)
    expect(idx.cycleEndIdx).toBe(4)
    expect(idx.leadStartIdx).toBe(-1)
    expect(idx.leadEndIdx).toBe(4) // falls back to cycle end
  })

  it('returns -1 for statuses not in order', () => {
    const config = {
      status_order: ['A', 'B'],
      cycle_time_start_status: 'X',
      cycle_time_end_status: 'Y',
      lead_time_start_status: null,
      lead_time_end_status: null,
    } as ConfigContext
    const idx = getConfigIndices(config)
    expect(idx.cycleStartIdx).toBe(-1)
    expect(idx.cycleEndIdx).toBe(-1)
  })
})
