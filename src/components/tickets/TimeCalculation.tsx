import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import type { TicketTransition } from '@/types'

type RowKind = 'beforeStart' | 'discarded' | 'start' | 'counted' | 'end' | 'afterEnd'
type Variant = 'cycle' | 'lead'

interface Props {
  variant: Variant
  /** sorted by time */
  transitions: TicketTransition[]
  createdAt: string
  mode: string
  /** server-side window (#145, #146) — the table only splits rows along it, it never recomputes it */
  start: string
  end: string | null
  defaultOpen?: boolean
  isReworkMove: (from: string, to: string) => boolean
  /** cycle only: time inside an aborted attempt (restart) */
  isDiscardedAt?: (time: number) => boolean
}

const DAY_MS = 1000 * 86400

const MODE_KEYS: Record<string, string> = {
  first_last: 'configBar.modeFirstLast',
  first_first: 'configBar.modeFirstFirst',
  last_last: 'configBar.modeLastLast',
}

const VARIANT = {
  cycle: { title: 'calc.cycleTitle', result: 'calc.cycleResult', help: 'help.cycleCalculation', helpTitle: 'help.titles.cycleCalculation', accent: 'text-teal-700' },
  lead: { title: 'calc.leadTitle', result: 'calc.leadResult', help: 'help.leadCalculation', helpTitle: 'help.titles.leadCalculation', accent: 'text-violet-700' },
} as const

const CREATED_ID = '__created__'

/** Shows how cycle or lead time comes about, transition by transition. */
export function TimeCalculation({ variant, transitions, createdAt, mode, start: startIso, end: endIso, defaultOpen = false, isReworkMove, isDiscardedAt }: Props) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(defaultOpen)
  const v = VARIANT[variant]

  const start = new Date(startIso).getTime()
  const end = endIso ? new Date(endIso).getTime() : null

  // Lead time may start at creation, which is not a transition — show it as its own row
  const createdMs = new Date(createdAt).getTime()
  const firstMs = transitions.length ? new Date(transitions[0].transitioned_at).getTime() : Infinity
  const entries: TicketTransition[] = createdMs < firstMs
    ? [{ id: CREATED_ID, from_status: null, to_status: t('calc.created'), transitioned_at: createdAt }, ...transitions]
    : transitions

  const classified = entries.map((tr, i) => {
    const time = new Date(tr.transitioned_at).getTime()
    const next = entries[i + 1]
    const duration = next ? (new Date(next.transitioned_at).getTime() - time) / DAY_MS : null

    let kind: RowKind
    if (time < start) kind = isDiscardedAt?.(time) ? 'discarded' : 'beforeStart'
    else if (end !== null && time === end) kind = 'end'
    else if (end !== null && time > end) kind = 'afterEnd'
    else kind = time === start ? 'start' : 'counted'

    const counts = (kind === 'start' || kind === 'counted') && duration !== null
    const rework = !!tr.from_status && isReworkMove(tr.from_status, tr.to_status)

    return { tr, time, duration, kind, counts, rework }
  })

  const totals = classified.reduce<number[]>(
    (acc, r) => [...acc, (acc.at(-1) ?? 0) + (r.counts ? r.duration! : 0)],
    [],
  )
  const total = totals.at(-1) ?? 0
  const rows = classified.map((r, i) => ({ ...r, total: r.counts ? totals[i] : null }))

  const startRow = rows.find(r => r.kind === 'start')
  const endRow = rows.find(r => r.kind === 'end')
  const fmtDate = (ms: number) => new Date(ms).toLocaleDateString()

  const kindStyle = (kind: RowKind) =>
    kind === 'start' || kind === 'end' ? `${v.accent} font-medium`
      : kind === 'counted' ? 'text-gray-700'
        : 'text-gray-400'

  return (
    <div className="rounded-lg border border-gray-200">
      <div className="flex items-center gap-1 px-3 py-2">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-gray-900"
        >
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-90' : ''}`} />
          {t(v.title)}
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-300 hover:text-gray-500 transition-colors" aria-label={t(v.helpTitle)}>
              <Info className="w-3.5 h-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <p className="text-xs text-gray-600">{t(v.help)}</p>
          </PopoverContent>
        </Popover>
      </div>

      {open && (
        <div className="border-t border-gray-100 px-3 py-2.5 space-y-2">
          <div className="text-[11px] text-gray-600 space-y-0.5">
            <p>{t('calc.mode', { mode: MODE_KEYS[mode] ? t(MODE_KEYS[mode]) : mode })}</p>
            <p>{t('calc.start', { status: startRow?.tr.to_status ?? '—', date: fmtDate(start) })}</p>
            <p>
              {endRow
                ? t('calc.end', { status: endRow.tr.to_status, date: fmtDate(endRow.time) })
                : t('calc.notEnded')}
            </p>
          </div>

          <table className="w-full text-[11px] tabular-nums">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="font-normal pb-1">{t('calc.colDate')}</th>
                <th className="font-normal pb-1">{t('calc.colStatus')}</th>
                <th className="font-normal pb-1 text-right">{t('calc.colDuration')}</th>
                <th className="font-normal pb-1 pl-3">{t('calc.colCounted')}</th>
                <th className="font-normal pb-1 text-right">{t('calc.colTotal')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.tr.id} className={`border-t border-gray-50 ${kindStyle(r.kind)}`}>
                  <td className="py-0.5 pr-2 whitespace-nowrap">{fmtDate(r.time)}</td>
                  <td className="py-0.5 pr-2">
                    {r.rework && <span className="text-rose-500 mr-1" aria-label={t('calc.rework')} title={t('calc.rework')}>↺</span>}
                    {r.tr.to_status}
                  </td>
                  <td className="py-0.5 text-right whitespace-nowrap">{r.duration !== null ? `${r.duration.toFixed(2)}d` : '—'}</td>
                  <td className="py-0.5 pl-3 whitespace-nowrap">{t(`calc.kind.${r.kind}`)}</td>
                  <td className="py-0.5 text-right whitespace-nowrap">{r.total !== null ? `${r.total.toFixed(2)}d` : ''}</td>
                </tr>
              ))}
            </tbody>
            {endRow && (
              <tfoot>
                <tr className={`border-t border-gray-200 font-semibold ${v.accent}`}>
                  <td colSpan={4} className="pt-1">{t(v.result)}</td>
                  <td className="pt-1 text-right">{`${total.toFixed(2)}d`}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
    </div>
  )
}
