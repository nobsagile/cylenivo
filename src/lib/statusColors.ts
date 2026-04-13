import type { ConfigContext } from '@/types'

// ── Index calculation ────────────────────────────────────────────────────────

export interface ConfigIndices {
  cycleStartIdx: number
  cycleEndIdx: number
  leadStartIdx: number
  leadEndIdx: number
}

export function getConfigIndices(config: ConfigContext): ConfigIndices {
  const { status_order, cycle_time_start_status, cycle_time_end_status, lead_time_start_status, lead_time_end_status } = config
  return {
    cycleStartIdx: status_order.indexOf(cycle_time_start_status),
    cycleEndIdx: status_order.indexOf(cycle_time_end_status),
    leadStartIdx: lead_time_start_status ? status_order.indexOf(lead_time_start_status) : -1,
    leadEndIdx: status_order.indexOf(lead_time_end_status ?? cycle_time_end_status),
  }
}

// ── Classification ───────────────────────────────────────────────────────────

export function isInCycle(statusIdx: number, indices: ConfigIndices): boolean {
  return statusIdx >= indices.cycleStartIdx && statusIdx <= indices.cycleEndIdx
}

export function isInLead(statusIdx: number, indices: ConfigIndices): boolean {
  return (indices.leadStartIdx === -1 || statusIdx >= indices.leadStartIdx) && statusIdx <= indices.leadEndIdx
}

// ── Shade picker (generic) ───────────────────────────────────────────────────

export function pickShade<T>(arr: T[], group: string[], status: string): T {
  const pos = group.indexOf(status)
  if (pos === -1) return arr[0]
  const idx = group.length <= 1 ? 0 : Math.round((pos / (group.length - 1)) * (arr.length - 1))
  return arr[Math.max(0, Math.min(idx, arr.length - 1))]
}

// ── Color constants (hex — for Recharts) ─────────────────────────────────────

export const LEAD_HEX = ['#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa'] as const   // violet-100→400
export const CYCLE_HEX = ['#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6'] as const  // teal-200→500
export const FALLBACK_HEX = ['#94a3b8', '#64748b', '#475569', '#334155'] as const // slate

// ── Color constants (Tailwind class strings — for ConfigContextBar) ──────────

export const LEAD_CLASS_SHADES = [
  'bg-violet-100 border-violet-200 text-violet-800',
  'bg-violet-200 border-violet-300 text-violet-800',
  'bg-violet-300 border-violet-400 text-violet-900',
  'bg-violet-400 border-violet-500 text-violet-950',
]

export const CYCLE_CLASS_SHADES = [
  'bg-teal-200 border-teal-300 text-teal-800',
  'bg-teal-300 border-teal-400 text-teal-800',
  'bg-teal-400 border-teal-500 text-teal-900',
  'bg-teal-500 border-teal-600 text-teal-950',
]

// ── Color constants (Tailwind objects — for BoardVisualization) ───────────────

export interface StatusStyle {
  bg: string
  border: string
  text: string
  bar: string
}

export const LEAD_STYLE_SHADES: StatusStyle[] = [
  { bg: 'bg-violet-100', border: 'border-violet-200', text: 'text-violet-800', bar: 'text-violet-300' },
  { bg: 'bg-violet-200', border: 'border-violet-300', text: 'text-violet-800', bar: 'text-violet-400' },
  { bg: 'bg-violet-300', border: 'border-violet-400', text: 'text-violet-900', bar: 'text-violet-500' },
  { bg: 'bg-violet-400', border: 'border-violet-500', text: 'text-violet-950', bar: 'text-violet-600' },
]

export const CYCLE_STYLE_SHADES: StatusStyle[] = [
  { bg: 'bg-teal-200', border: 'border-teal-300', text: 'text-teal-800', bar: 'text-teal-400' },
  { bg: 'bg-teal-300', border: 'border-teal-400', text: 'text-teal-800', bar: 'text-teal-500' },
  { bg: 'bg-teal-400', border: 'border-teal-500', text: 'text-teal-900', bar: 'text-teal-600' },
  { bg: 'bg-teal-500', border: 'border-teal-600', text: 'text-teal-950', bar: 'text-teal-700' },
]

// ── Ticket type colors ───────────────────────────────────────────────────────

export const TYPE_COLORS: Record<string, string> = {
  story: 'bg-green-50 text-green-700 border-green-200',
  task: 'bg-gray-50 text-gray-700 border-gray-200',
  bug: 'bg-red-50 text-red-700 border-red-200',
  epic: 'bg-purple-50 text-purple-700 border-purple-200',
  'sub-task': 'bg-slate-50 text-slate-600 border-slate-200',
  'qa finding': 'bg-orange-50 text-orange-700 border-orange-200',
}

const HASH_PALETTE = [
  'bg-teal-50 text-teal-700 border-teal-200',
  'bg-cyan-50 text-cyan-700 border-cyan-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-lime-50 text-lime-700 border-lime-200',
  'bg-rose-50 text-rose-700 border-rose-200',
  'bg-sky-50 text-sky-700 border-sky-200',
  'bg-indigo-50 text-indigo-700 border-indigo-200',
  'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-violet-50 text-violet-700 border-violet-200',
]

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type] ?? HASH_PALETTE[hashString(type) % HASH_PALETTE.length]
}
