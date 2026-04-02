import { useState, useEffect } from 'react'
import { open as tauriOpen } from '@tauri-apps/plugin-shell'

function openUrl(url: string) {
  if (window.__TAURI_INTERNALS__) tauriOpen(url)
  else window.open(url, '_blank', 'noopener,noreferrer')
}
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { LayoutDashboard, Ticket, Workflow, Sparkles, Settings, Plus, AlertTriangle, MoreHorizontal, SlidersHorizontal, Trash2, Pencil, TrendingUp, Bug, MessageCircle } from 'lucide-react'
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

function ProjectMenu({ imp, onRenamed, onDeleted }: {
  imp: { id: string; config_id: string; name?: string | null; project_key: string; config_name?: string }
  onRenamed: () => void
  onDeleted: () => void
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [renameOpen, setRenameOpen] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [renaming, setRenaming] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  function handleRename() {
    setRenaming(true)
    api.imports.update(imp.id, { name: renameValue })
      .then(() => { setRenameOpen(false); onRenamed() })
      .catch(console.error)
      .finally(() => setRenaming(false))
  }

  function handleDelete() {
    setDeleting(true)
    api.imports.delete(imp.id)
      .then(() => { setConfirmOpen(false); onDeleted() })
      .catch(console.error)
      .finally(() => setDeleting(false))
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
            <DropdownMenuPrimitive.Item
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 outline-none"
              onSelect={() => navigate(`/settings/configs/${imp.config_id}`)}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
              {t('sidebar.changeConfig')}
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Separator className="my-1 h-px bg-gray-100" />
            <DropdownMenuPrimitive.Item
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-rose-600 cursor-pointer hover:bg-rose-50 outline-none"
              onSelect={() => setConfirmOpen(true)}
            >
              <Trash2 className="w-3.5 h-3.5" />
              {t('sidebar.deleteProject')}
            </DropdownMenuPrimitive.Item>
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

      <Dialog open={confirmOpen} onOpenChange={(o) => { if (!o) setConfirmOpen(false) }}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>{t('sidebar.deleteConfirmTitle')}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 mt-1">
            {t('sidebar.deleteConfirmDesc', { name: imp.config_name ?? imp.id })}
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-3 py-1.5 text-sm rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
            >
              {deleting ? t('common.loading') : t('common.delete')}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function Sidebar() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId?: string }>()
  const navigate = useNavigate()
  const { data: imports, reload } = useImports()
  const [healthOpen, setHealthOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [appVersion, setAppVersion] = useState<string>(__APP_VERSION__)

  useEffect(() => {
    import('@tauri-apps/api/app').then(({ getVersion }) => getVersion().then(setAppVersion)).catch(() => {})
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
                  onRenamed={reload}
                  onDeleted={() => {
                    reload()
                    if (imp.id === importId) navigate('/')
                  }}
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
          <Settings className="w-4 h-4 shrink-0" />
          {t('nav.settings')}
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
        <button
          onClick={() => setAboutOpen(true)}
          className="text-[10px] text-gray-300 hover:text-gray-500 px-3 pt-1 text-left transition-colors"
        >
          v{appVersion}
        </button>
      </div>

      <Dialog open={aboutOpen} onOpenChange={(o) => { if (!o) setAboutOpen(false) }}>
        <DialogContent className="max-w-sm bg-white">
          <div className="flex flex-col items-center text-center pt-2 pb-1 gap-3">
            <LogoIcon className="w-12 h-12" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">Cylenivo</h2>
              <p className="text-xs text-gray-400 mt-0.5">v{appVersion}</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t('about.tagline')}
            </p>
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => openUrl('https://github.com/nobsagile/cylenivo')}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </button>
              <button
                onClick={() => openUrl('https://mastodon.social/@cylenivo')}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Mastodon
              </button>
            </div>
            <div className="w-full border-t border-gray-100 pt-3 mt-1 space-y-1">
              <p className="text-[11px] text-gray-400">
                {t('about.license')}
              </p>
              <p className="text-[11px] text-gray-300">© 2026 Thomas Esders</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  )
}
