import { useState, useEffect } from 'react'
import { open as tauriOpen } from '@tauri-apps/plugin-shell'

function openUrl(url: string) {
  if (window.__TAURI_INTERNALS__) tauriOpen(url)
  else window.open(url, '_blank', 'noopener,noreferrer')
}
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { LayoutDashboard, Ticket, Workflow, Sparkles, Settings, Plus, AlertTriangle, MoreHorizontal, Pencil, TrendingUp, Bug, Info, RefreshCw } from 'lucide-react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { api } from '@/services/api'
import { Input } from '@/components/ui/input'

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} aria-hidden="true">
      <rect x="48" y="56" width="144" height="40" rx="20" fill="#7c3aed" />
      <rect x="48" y="108" width="64" height="40" rx="20" fill="#4f46e5" />
      <rect x="48" y="160" width="128" height="40" rx="20" fill="#0d9488" />
    </svg>
  )
}
import { useImports } from '@/hooks/useImports'
import { usePluginUpdates } from '@/hooks/usePluginUpdates'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import type { ImportHealthReport, SourceConnection, PluginManifest } from '@/types'
import type { Update } from '@tauri-apps/plugin-updater'
import { UpdateDialog } from '@/components/UpdateDialog'
import RefreshDialog from '@/components/connections/RefreshDialog'

interface Issue {
  title: string
  consequence: string
  recommendation: string
  severity: 'warn' | 'info'
}

function buildIssues(report: ImportHealthReport, cycleStart: string, cycleEnd: string, t: (key: string, opts?: Record<string, unknown>) => string): Issue[] {
  const issues: Issue[] = []
  const oldestYear = report.oldest_transition_date ? new Date(report.oldest_transition_date).getFullYear() : null
  const yearsOld = oldestYear ? new Date().getFullYear() - oldestYear : 0

  if (report.tickets_without_cycle_start > 0) {
    issues.push({
      title: t('sidebar.neverEnteredStatus', { count: report.tickets_without_cycle_start, status: cycleStart }),
      consequence: t('sidebar.neverEnteredImpact'),
      recommendation: t('sidebar.neverEnteredAction'),
      severity: 'info',
    })
  }

  if (report.tickets_incomplete > 0) {
    issues.push({
      title: t('sidebar.incompleteTickets', { count: report.tickets_incomplete, status: cycleEnd }),
      consequence: t('sidebar.incompleteImpact'),
      recommendation: t('sidebar.incompleteAction'),
      severity: 'info',
    })
  }

  if (report.unknown_statuses.length > 0) {
    issues.push({
      title: t('sidebar.unknownStatuses', { count: report.unknown_statuses.length }),
      consequence: t('sidebar.unknownImpact', { statuses: report.unknown_statuses.join(', ') }),
      recommendation: t('sidebar.unknownAction'),
      severity: 'warn',
    })
  }

  if (yearsOld > 2 && oldestYear) {
    issues.push({
      title: t('sidebar.oldData', { year: oldestYear }),
      consequence: t('sidebar.oldDataImpact'),
      recommendation: t('sidebar.oldDataAction'),
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
  const { t } = useTranslation()
  const issues = buildIssues(report, cycleStart, cycleEnd, t)
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="max-w-lg bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            {t('sidebar.dataQuality')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {issues.length === 0 ? (
            <p className="text-sm text-gray-500">{t('sidebar.noIssues')}</p>
          ) : issues.map((issue, i) => (
            <div key={i} className={`rounded-lg border p-3.5 ${issue.severity === 'warn' ? 'border-amber-200 bg-amber-50' : 'border-violet-100 bg-violet-50'}`}>
              <p className={`text-sm font-semibold mb-1.5 ${issue.severity === 'warn' ? 'text-amber-800' : 'text-violet-800'}`}>
                {issue.title}
              </p>
              <p className={`text-xs mb-2 leading-relaxed ${issue.severity === 'warn' ? 'text-amber-700' : 'text-violet-700'}`}>
                <span className="font-medium">{t('sidebar.impact')} </span>{issue.consequence}
              </p>
              <p className={`text-xs leading-relaxed ${issue.severity === 'warn' ? 'text-amber-600' : 'text-violet-600'}`}>
                <span className="font-medium">{t('sidebar.whatToDo')} </span>{issue.recommendation}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ProjectMenu({ imp, connection, pluginManifest, onRenamed }: {
  imp: { id: string; config_id: string; name?: string | null; project_key: string; config_name?: string }
  connection?: SourceConnection | null
  pluginManifest?: PluginManifest | null
  onRenamed: () => void
}) {
  const { t } = useTranslation()
  const [renameOpen, setRenameOpen] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [renaming, setRenaming] = useState(false)
  const [refreshOpen, setRefreshOpen] = useState(false)

  function handleRename() {
    setRenaming(true)
    api.imports.update(imp.id, { name: renameValue })
      .then(() => { setRenameOpen(false); onRenamed() })
      .catch(console.error)
      .finally(() => setRenaming(false))
  }

  return (
    <>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button
            className="shrink-0 p-0.5 rounded text-gray-300 hover:text-gray-600 hover:bg-gray-200 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            side="right"
            align="start"
            sideOffset={6}
            className="z-[140] min-w-[160px] rounded-lg border border-gray-200 bg-white shadow-lg p-1 text-sm"
          >
            <DropdownMenuPrimitive.Item
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 outline-none"
              onSelect={() => { setRenameValue(imp.name ?? imp.project_key); setRenameOpen(true) }}
            >
              <Pencil className="w-3.5 h-3.5 text-gray-400" />
              {t('sidebar.rename')}
            </DropdownMenuPrimitive.Item>
            {connection && (
              <DropdownMenuPrimitive.Item
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 outline-none"
                onSelect={() => setRefreshOpen(true)}
              >
                <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
                {t('sidebar.refresh')}
              </DropdownMenuPrimitive.Item>
            )}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>

      <Dialog open={renameOpen} onOpenChange={(o) => { if (!o) setRenameOpen(false) }}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>{t('sidebar.renameTitle')}</DialogTitle>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            autoFocus
            className="mt-2"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => setRenameOpen(false)} className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
              {t('common.cancel')}
            </button>
            <button onClick={handleRename} disabled={renaming || !renameValue.trim()} className="px-3 py-1.5 text-sm rounded-md bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50">
              {t('common.save')}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {connection && refreshOpen && (
        <RefreshDialog
          open={refreshOpen}
          connection={connection}
          pluginManifest={pluginManifest}
          importSession={{ id: imp.id, project_key: imp.project_key, config_id: imp.config_id }}
          onClose={() => setRefreshOpen(false)}
        />
      )}
    </>
  )
}

export function Sidebar() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId?: string }>()
  const navigate = useNavigate()
  const { data: imports, reload } = useImports()
  const { hasUpdates: hasPluginUpdates } = usePluginUpdates()
  const [connections, setConnections] = useState<SourceConnection[]>([])
  const [installedPlugins, setInstalledPlugins] = useState<PluginManifest[]>([])
  const [healthOpen, setHealthOpen] = useState(false)
  const [appVersion, setAppVersion] = useState<string>(__APP_VERSION__)
  const [pendingUpdate, setPendingUpdate] = useState<Update | null>(null)

  useEffect(() => {
    import('@tauri-apps/api/app').then(({ getVersion }) => getVersion().then(setAppVersion)).catch(() => {})
    api.connections.list().then(setConnections).catch(() => {})
    api.plugins.list().then(setInstalledPlugins).catch(() => {})
  }, [])

  useEffect(() => {
    import('@tauri-apps/plugin-updater')
      .then(({ check }) => check())
      .then((u) => { if (u) setPendingUpdate(u) })
      .catch(() => {})
  }, [])

  const currentImport = imports.find(imp => imp.id === importId)
  const sortedImports = [...imports].sort((a, b) =>
    a.project_key.localeCompare(b.project_key) || a.imported_at.localeCompare(b.imported_at)
  )

  const navItems = [
    { to: '', end: true, icon: LayoutDashboard, label: t('nav.overview') },
    { to: '/flow', icon: Workflow, label: t('nav.flow') },
    { to: '/forecast', icon: TrendingUp, label: t('nav.forecast') },
    { to: '/tickets', icon: Ticket, label: t('nav.tickets') },
    { to: '/insights', icon: Sparkles, label: t('nav.insights') },
  ]

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
      isActive
        ? 'bg-violet-50 text-violet-700 font-medium'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-100">
        <LogoIcon className="w-7 h-7 shrink-0" />
        <span className="font-semibold text-gray-900 text-sm tracking-tight">Cylenivo</span>
      </div>

      {/* Project selector */}
      <div className="px-3 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
            {t('sidebar.project')}
          </p>
          <button
            onClick={() => navigate('/import')}
            className="text-gray-300 hover:text-gray-500 transition-colors"
            title={t('nav.import')}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-0.5 max-h-48 overflow-y-auto">
          {sortedImports.map((imp) => (
            <div
              key={imp.id}
              className={`group flex items-center gap-1 rounded-md transition-colors ${
                imp.id === importId
                  ? 'bg-violet-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <button
                onClick={() => navigate(`/projects/${imp.id}`)}
                className={`flex-1 text-left px-2 py-1.5 text-sm truncate min-w-0 ${
                  imp.id === importId
                    ? 'text-violet-700 font-medium'
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}
              >
                {imp.name ?? imp.project_key}
              </button>
              <div className="shrink-0 pr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <ProjectMenu
                  imp={imp}
                  connection={imp.connection_id ? connections.find(c => c.id === imp.connection_id) ?? null : null}
                  pluginManifest={(() => {
                    const conn = imp.connection_id ? connections.find(c => c.id === imp.connection_id) : null
                    if (!conn || conn.source_type === 'jira') return null
                    return installedPlugins.find(p => p.source_type === conn.source_type) ?? null
                  })()}
                  onRenamed={reload}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health report indicator */}
      {currentImport?.health_report && (() => {
        const issues = buildIssues(
          currentImport.health_report!,
          currentImport.cycle_time_start_status ?? '',
          currentImport.cycle_time_end_status ?? '',
          t,
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
                    : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                }`}
              >
                <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${hasWarn ? 'text-amber-500' : 'text-violet-400'}`} />
                <span>{issues.length === 1 ? t('sidebar.qualityNotice', { count: issues.length }) : t('sidebar.qualityNotices', { count: issues.length })}</span>
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
        {importId && (
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
        )}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-gray-100 space-y-0.5">
        <NavLink to="/settings" className={navClass}>
          <span className="relative shrink-0">
            <Settings className="w-4 h-4" />
            {hasPluginUpdates && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-violet-500 rounded-full" />}
          </span>
          {t('nav.settings')}
        </NavLink>
        <NavLink to="/about" className={navClass}>
          <Info className="w-4 h-4 shrink-0" />
          {t('sidebar.about')}
        </NavLink>
        <button
          onClick={() => {
            const body = `**Version:** v${appVersion}\n**Platform:** ${navigator.platform}\n\n### Describe the bug\n\n### Steps to reproduce\n1. \n2. \n\n### Expected behavior\n\n### Actual behavior\n`
            openUrl(`https://github.com/nobsagile/cylenivo/issues/new?template=bug_report.md&labels=bug,app&body=${encodeURIComponent(body)}`)
          }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full text-left"
        >
          <Bug className="w-4 h-4 shrink-0" />
          {t('sidebar.reportBug')}
        </button>

      </div>
      {pendingUpdate && (
        <UpdateDialog update={pendingUpdate} onClose={() => setPendingUpdate(null)} />
      )}
    </aside>
  )
}
