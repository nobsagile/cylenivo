import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { LayoutDashboard, Ticket, BarChart2, Sparkles, Upload, Settings, Activity, Plus } from 'lucide-react'
import { useImports } from '@/hooks/useImports'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId?: string }>()
  const navigate = useNavigate()
  const { data: imports } = useImports()

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
