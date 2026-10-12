import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import type { TicketTransition } from '@/types'

type RowKind = 'beforeStart' | 'discarded' | 'start' | 'counted' | 'end' | 'afterEnd'

interface Props {
  /** sorted by time */
  transitions: TicketTransition[]
  mode: string
  /** server-side window (#145) — the table only splits rows along it, it never recomputes it */
  cycleStartedAt: string
  completedAt: string | null
  isReworkMove: (from: string, to: string) => boolean
  isDiscardedAt: (time: number) => boolean
}

const DAY_MS = 1000 * 86400

const MODE_KEYS: Record<string, string> = {
  first_last: 'configBar.modeFirstLast',
  first_first: 'configBar.modeFirstFirst',
  last_last: 'configBar.modeLastLast',
}

const KIND_STYLE: Record<RowKind, string> = {
  beforeStart: 'text-gray-400',
  discarded: 'text-gray-400',
  start: 'text-teal-700 font-medium',
  counted: 'text-gray-700',
  end: 'text-teal-700 font-medium',
  afterEnd: 'text-gray-400',
}

/** Shows how cycle_time_days comes about, transition by transition (#145). */
export function CycleTimeCalculation({ transitions, mode, cycleStartedAt, completedAt, isReworkMove, isDiscardedAt }: Props) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const start = new Date(cycleStartedAt).getTime()
  const end = completedAt ? new Date(completedAt).getTime() : null

  const classified = transitions.map((tr, i) => {
    const time = new Date(tr.transitioned_at).getTime()
    const next = transitions[i + 1]
    const duration = next ? (new Date(next.transitioned_at).getTime() - time) / DAY_MS : null

    let kind: RowKind
    if (time < start) kind = isDiscardedAt(time) ? 'discarded' : 'beforeStart'
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
          {t('cycleCalc.title')}
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-300 hover:text-gray-500 transition-colors" aria-label={t('help.titles.cycleCalculation')}>
              <Info className="w-3.5 h-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <p className="text-xs text-gray-600">{t('help.cycleCalculation')}</p>
          </PopoverContent>
        </Popover>
      </div>

      {open && (
        <div className="border-t border-gray-100 px-3 py-2.5 space-y-2">
          <div className="text-[11px] text-gray-600 space-y-0.5">
            <p>{t('cycleCalc.mode', { mode: MODE_KEYS[mode] ? t(MODE_KEYS[mode]) : mode })}</p>
            <p>{t('cycleCalc.start', { status: startRow?.tr.to_status ?? '—', date: fmtDate(start) })}</p>
            <p>
              {endRow
                ? t('cycleCalc.end', { status: endRow.tr.to_status, date: fmtDate(endRow.time) })
                : t('cycleCalc.notEnded')}
            </p>
          </div>

          <table className="w-full text-[11px] tabular-nums">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="font-normal pb-1">{t('cycleCalc.colDate')}</th>
                <th className="font-normal pb-1">{t('cycleCalc.colStatus')}</th>
                <th className="font-normal pb-1 text-right">{t('cycleCalc.colDuration')}</th>
                <th className="font-normal pb-1 pl-3">{t('cycleCalc.colCounted')}</th>
                <th className="font-normal pb-1 text-right">{t('cycleCalc.colTotal')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.tr.id} className={`border-t border-gray-50 ${KIND_STYLE[r.kind]}`}>
                  <td className="py-0.5 pr-2 whitespace-nowrap">{fmtDate(r.time)}</td>
                  <td className="py-0.5 pr-2">
                    {r.rework && <span className="text-rose-500 mr-1" aria-label={t('cycleCalc.rework')} title={t('cycleCalc.rework')}>↺</span>}
                    {r.tr.to_status}
                  </td>
                  <td className="py-0.5 text-right whitespace-nowrap">{r.duration !== null ? `${r.duration.toFixed(2)}d` : '—'}</td>
                  <td className="py-0.5 pl-3 whitespace-nowrap">{t(`cycleCalc.kind.${r.kind}`)}</td>
                  <td className="py-0.5 text-right whitespace-nowrap">{r.total !== null ? `${r.total.toFixed(2)}d` : ''}</td>
                </tr>
              ))}
            </tbody>
            {endRow && (
              <tfoot>
                <tr className="border-t border-gray-200 font-semibold text-teal-700">
                  <td colSpan={4} className="pt-1">{t('cycleCalc.result')}</td>
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
