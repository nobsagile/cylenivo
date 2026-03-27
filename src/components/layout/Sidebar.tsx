import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { LayoutDashboard, Ticket, BarChart2, Sparkles, Upload, Settings, Activity, Plus, AlertTriangle } from 'lucide-react'
import { useImports } from '@/hooks/useImports'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import type { ImportHealthReport } from '@/types'

interface Issue {
  title: string
  consequence: string
  recommendation: string
  severity: 'warn' | 'info'
}

function buildIssues(report: ImportHealthReport, cycleStart: string, cycleEnd: string): Issue[] {
  const issues: Issue[] = []
  const oldestYear = report.oldest_transition_date ? new Date(report.oldest_transition_date).getFullYear() : null
  const yearsOld = oldestYear ? new Date().getFullYear() - oldestYear : 0

  if (report.tickets_without_cycle_start > 0) {
    issues.push({
      title: `${report.tickets_without_cycle_start} tickets never entered "${cycleStart}"`,
      consequence: 'These tickets are fully excluded from cycle time, lead time and throughput. They likely used an older workflow or a different process. No impact on accuracy.',
      recommendation: 'No action needed unless you want to include these tickets — in that case, check if the cycle start status in your configuration matches the actual workflow.',
      severity: 'info',
    })
  }

  if (report.tickets_incomplete > 0) {
    issues.push({
      title: `${report.tickets_incomplete} tickets started but never reached "${cycleEnd}"`,
      consequence: 'These are in-progress or abandoned tickets. They are excluded from cycle time and lead time, but visible in Time in Status up to their last known transition.',
      recommendation: 'Normal for any active team. If the number seems high, check whether the cycle end status in your configuration matches where tickets actually finish.',
      severity: 'info',
    })
  }

  if (report.unknown_statuses.length > 0) {
    issues.push({
      title: `${report.unknown_statuses.length} untracked statuses in the data`,
      consequence: `Time spent in these statuses is invisible in the Time in Status chart: ${report.unknown_statuses.join(', ')}. The chart totals will not add up to the full cycle time.`,
      recommendation: 'Add the relevant statuses to your configuration\'s status order if you want to see time spent there. Statuses you don\'t care about can be left out.',
      severity: 'warn',
    })
  }

  if (yearsOld > 2 && oldestYear) {
    issues.push({
      title: `Data includes transitions back to ${oldestYear}`,
      consequence: 'Throughput is averaged over the full date range — if old tickets are included, the weekly throughput number will be much lower than your current actual velocity. Cycle time averages may also reflect older team behaviour.',
      recommendation: 'Re-import with the "Completed between" date filter (e.g. last 12–18 months) to get metrics that reflect how your team works today.',
      severity: 'warn',
    })
  }

  return issues
}

function HealthReportDialog({
  open,
  onClose,
  report,
  cycleStart,
  cycleEnd,
}: {
  open: boolean
  onClose: () => void
  report: ImportHealthReport
  cycleStart: string
  cycleEnd: string
}) {
  const issues = buildIssues(report, cycleStart, cycleEnd)
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="max-w-lg bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Data quality report
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {issues.length === 0 ? (
            <p className="text-sm text-gray-500">No issues detected. Data looks clean.</p>
          ) : issues.map((issue, i) => (
            <div key={i} className={`rounded-lg border p-3.5 ${issue.severity === 'warn' ? 'border-amber-200 bg-amber-50' : 'border-blue-100 bg-blue-50'}`}>
              <p className={`text-sm font-semibold mb-1.5 ${issue.severity === 'warn' ? 'text-amber-800' : 'text-blue-800'}`}>
                {issue.title}
              </p>
              <p className={`text-xs mb-2 leading-relaxed ${issue.severity === 'warn' ? 'text-amber-700' : 'text-blue-700'}`}>
                <span className="font-medium">Impact: </span>{issue.consequence}
              </p>
              <p className={`text-xs leading-relaxed ${issue.severity === 'warn' ? 'text-amber-600' : 'text-blue-600'}`}>
                <span className="font-medium">What to do: </span>{issue.recommendation}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Sidebar() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId?: string }>()
  const navigate = useNavigate()
  const { data: imports } = useImports()
  const [healthOpen, setHealthOpen] = useState(false)

  const currentImport = imports.find(imp => imp.id === importId)

  const navItems = [
    { to: '', end: true, icon: LayoutDashboard, label: t('nav.overview') },
    { to: '/tickets', icon: Ticket, label: t('nav.tickets') },
    { to: '/analytics', icon: BarChart2, label: t('nav.analytics') },
    { to: '/insights', icon: Sparkles, label: t('nav.insights') },
  ]

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-700 font-medium'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-100">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Activity className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-gray-900 text-sm tracking-tight">Cylenivo</span>
      </div>

      {/* Project selector */}
      <div className="px-3 py-3 border-b border-gray-100">
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-2 px-1">
          Project
        </p>
        {imports.length === 0 ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/import')}
            className="w-full gap-1.5 text-xs h-9 text-gray-500"
          >
            <Plus className="w-3.5 h-3.5" />
            Import first dataset
          </Button>
        ) : (
          <Select
            value={importId ?? ''}
            onValueChange={(id) => id && navigate(`/projects/${id}`)}
          >
            <SelectTrigger className="w-full text-sm h-9">
              <SelectValue placeholder="— select project —" />
            </SelectTrigger>
            <SelectContent>
              {imports.map((imp) => (
                <SelectItem key={imp.id} value={imp.id}>
                  <span className="font-medium">{imp.project_key}</span>
                  {imp.config_name && (
                    <span className="text-gray-400 ml-1">· {imp.config_name}</span>
                  )}
                  <span className="text-gray-400 ml-1">
                    · {new Date(imp.imported_at).toLocaleDateString('de-DE')}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Health report indicator */}
      {currentImport?.health_report && (() => {
        const issues = buildIssues(
          currentImport.health_report!,
          currentImport.cycle_time_start_status ?? '',
          currentImport.cycle_time_end_status ?? '',
        )
        if (issues.length === 0) return null
        const hasWarn = issues.some(i => i.severity === 'warn')
        return (
          <>
            <div className="px-3 pb-2">
              <button
                onClick={() => setHealthOpen(true)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-colors ${
                  hasWarn
                    ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${hasWarn ? 'text-amber-500' : 'text-blue-400'}`} />
                <span>{issues.length} data quality {issues.length === 1 ? 'notice' : 'notices'}</span>
              </button>
            </div>
            <HealthReportDialog
              open={healthOpen}
              onClose={() => setHealthOpen(false)}
              report={currentImport.health_report!}
              cycleStart={currentImport.cycle_time_start_status ?? ''}
              cycleEnd={currentImport.cycle_time_end_status ?? ''}
            />
          </>
        )
      })()}

      {/* Primary nav */}
      <nav className="flex-1 px-3 py-3">
        {importId ? (
          <div className="space-y-0.5">
            {navItems.map(({ to, end, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={`/projects/${importId}${to}`}
                end={end}
                className={navClass}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="px-2 py-3">
            <p className="text-xs font-medium text-gray-500 mb-1">No data yet</p>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Import your first dataset to start analyzing.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/import')}
              className="gap-1.5 text-xs h-8 w-full"
            >
              <Upload className="w-3.5 h-3.5" />
              Import data
            </Button>
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-gray-100 space-y-0.5">
        <NavLink to="/import" className={navClass}>
          <Upload className="w-4 h-4 shrink-0" />
          {t('nav.import')}
        </NavLink>
        <NavLink to="/settings" className={navClass}>
          <Settings className="w-4 h-4 shrink-0" />
          {t('nav.settings')}
        </NavLink>
      </div>
    </aside>
  )
}
