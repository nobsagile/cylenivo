import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ReworkResponse } from '@/types'
import { ArrowLeftRight } from 'lucide-react'

interface Props {
  data: ReworkResponse
}

export function ReworkCard({ data }: Props) {
  const { tickets_with_rework, total_completed, rework_paths, avg_cycle_with_rework, avg_cycle_without_rework } = data
  const pct = total_completed > 0 ? Math.round((tickets_with_rework / total_completed) * 100) : 0

  if (total_completed === 0) return null

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-rose-500" />
          Rework Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">{pct}%</p>
            <p className="text-xs text-gray-500">of tickets have rework</p>
            <p className="text-[10px] text-gray-400">{tickets_with_rework} of {total_completed}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-rose-600 tabular-nums">
              {avg_cycle_with_rework != null ? `${avg_cycle_with_rework}d` : '—'}
            </p>
            <p className="text-xs text-gray-500">avg cycle with rework</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600 tabular-nums">
              {avg_cycle_without_rework != null ? `${avg_cycle_without_rework}d` : '—'}
            </p>
            <p className="text-xs text-gray-500">avg cycle without</p>
          </div>
        </div>

        {rework_paths.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">Most common backward movements</p>
            <div className="space-y-1.5">
              {rework_paths.slice(0, 5).map((path) => (
                <div key={`${path.from}-${path.to}`} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-700 font-medium">{path.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-rose-700 font-medium">{path.to}</span>
                  </div>
                  <span className="text-gray-500 tabular-nums">{path.count}×</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tickets_with_rework === 0 && (
          <p className="text-sm text-emerald-600">No backward movements detected — clean flow!</p>
        )}
      </CardContent>
    </Card>
  )
}
