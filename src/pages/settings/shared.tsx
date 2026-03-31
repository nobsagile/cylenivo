import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ── Section types ────────────────────────────────────────────────────────────
export type Section = 'configs' | 'datasets' | 'connections' | 'plugins' | 'ai' | 'language' | 'data-management'

export interface PendingDelete {
  type: 'config' | 'import' | 'connection'
  id: string
  label: string
}

// ── Shared empty state ────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, hint, ctaLabel, onCta }: {
  icon: React.ElementType
  title: string
  hint: string
  ctaLabel?: string
  onCta?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center border-2 border-dashed border-gray-200 rounded-xl">
      <Icon className="w-8 h-8 text-gray-300 mb-3" />
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">{hint}</p>
      {ctaLabel && onCta && (
        <Button onClick={onCta} variant="outline" size="sm" className="mt-4 gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          {ctaLabel}
        </Button>
      )}
    </div>
  )
}

// ── Section header ────────────────────────────────────────────────────────────
export function SectionHeader({ title, desc, action }: {
  title: string
  desc: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed max-w-sm">{desc}</p>
      </div>
      {action}
    </div>
  )
}

// ── Uniform card wrapper ──────────────────────────────────────────────────────
export function Card({ icon: Icon, children, actions }: {
  icon: React.ElementType
  children: React.ReactNode
  actions: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
      <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
      <div className="flex items-center gap-1.5 shrink-0">{actions}</div>
    </div>
  )
}

export function IconBtn({ onClick, disabled, danger, title, children }: {
  onClick?: () => void
  disabled?: boolean
  danger?: boolean
  title?: string
  children: React.ReactNode
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`h-8 w-8 p-0 ${danger ? 'text-red-500 hover:text-red-700 hover:border-red-300' : ''}`}
    >
      {children}
    </Button>
  )
}

// ── Left nav ──────────────────────────────────────────────────────────────────
export function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-1">{label}</p>
      {children}
    </div>
  )
}

export function NavItem({ id, active, icon: Icon, label, count, dot, soon, onClick }: {
  id: Section
  active: boolean
  icon: React.ElementType
  label: string
  count?: number
  dot?: boolean
  soon?: boolean
  onClick: (id: Section) => void
}) {
  return (
    <button
      onClick={() => !soon && onClick(id)}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left ${
        soon
          ? 'opacity-40 cursor-not-allowed text-gray-500'
          : active
          ? 'bg-gray-100 text-gray-900 font-medium'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="flex-1 truncate">{label}</span>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
      {!dot && count != null && count > 0 && (
        <span className="text-[10px] bg-gray-200 text-gray-600 rounded-full px-1.5 font-semibold shrink-0">{count}</span>
      )}
      {soon && <span className="text-[9px] font-semibold uppercase tracking-wide bg-gray-100 text-gray-400 px-1 rounded shrink-0">soon</span>}
    </button>
  )
}
