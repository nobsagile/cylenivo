import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Info } from 'lucide-react'
import type { CycleTimeByTypeResponse } from '@/types'
import { ChartTooltip } from './ChartTooltip'

interface Props {
  data: CycleTimeByTypeResponse
}

function TypeTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value?: number; name?: string; color?: string; fill?: string; dataKey?: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <ChartTooltip>
      <p className="font-semibold text-gray-800 mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex justify-between gap-4 text-xs">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="font-medium text-gray-700">{Number(p.value).toFixed(1)}d</span>
        </div>
      ))}
    </ChartTooltip>
  )
}

export function CycleTimeByTypeChart({ data }: Props) {
  const { t } = useTranslation()
  if (data.types.length === 0) return null

  const chartData = data.types.map((tp) => ({
    type: tp.type,
    Median: tp.median,
    P85: tp.p85,
    count: tp.count,
  }))

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
          {t('cycleTimeByType.title')}
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-300 hover:text-gray-500 transition-colors">
                <Info className="w-3.5 h-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="text-xs text-gray-600 space-y-1.5">
                <p className="font-semibold text-gray-800 mb-1">{t('cycleTimeByType.title')}</p>
                <p>{t('help.cycleTimeByType')}</p>
              </div>
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} unit="d" />
            <Tooltip content={<TypeTooltip />} wrapperStyle={{ zIndex: 100 }} cursor={false} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="Median" fill="#0d9488" radius={[3, 3, 0, 0]} />
            <Bar dataKey="P85" fill="#f97316" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2">
          {data.types.map((tp) => (
            <span key={tp.type} className="text-[10px] text-gray-400">
              {t('cycleTimeByType.ticketCount', { type: tp.type, count: tp.count })}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
