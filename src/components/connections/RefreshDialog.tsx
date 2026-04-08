import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import { api } from '@/services/api'
import { notifyImportsChanged } from '@/hooks/useImports'
import type { SourceConnection, JiraFetchOptions, PluginManifest } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import ConfigureStep from '@/components/import/ConfigureStep'

type RefreshStep = 'preflight' | 'fetching' | 'configure'

const ISSUE_TYPE_OPTIONS = ['Story', 'Task', 'Bug', 'Epic']

interface Props {
  open: boolean
  connection: SourceConnection
  pluginManifest?: PluginManifest | null
  /** When refreshing an existing dataset, pass it so we can skip preflight */
  importSession?: { id: string; project_key: string; config_id: string } | null
  onClose: () => void
}

function extractStatuses(data: Record<string, unknown>): string[] {
  const statuses = new Set<string>()
  const tickets = (data.tickets as Array<Record<string, unknown>>) ?? []
  for (const ticket of tickets) {
    const transitions = (ticket.transitions as Array<Record<string, unknown>>) ?? []
    for (const tr of transitions) {
      if (tr.to_status) statuses.add(tr.to_status as string)
      if (tr.from_status) statuses.add(tr.from_status as string)
    }
  }
  return [...statuses].sort()
}

/** Pre-fill plugin options from a known project_key (e.g. from a previous import) */
function buildInitialPluginOptions(
  pluginManifest: PluginManifest | null | undefined,
  projectKey: string | undefined,
): Record<string, string> {
  const fetchOptions = pluginManifest?.fetch_options ?? []
  const opts = fetchOptions.reduce<Record<string, string>>((acc, f) => {
    acc[f.key] = String(f.default ?? '')
    return acc
  }, {})
  if (projectKey) {
    const idField = fetchOptions.find(f =>
      ['project', 'board', 'workspace', 'repo'].some(k => f.key.toLowerCase().includes(k))
    ) ?? fetchOptions.find(f => f.required)
    if (idField) opts[idField.key] = projectKey
  }
  return opts
}

export default function RefreshDialog({ open, connection, pluginManifest, importSession, onClose }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const initialPluginOpts = buildInitialPluginOptions(pluginManifest, importSession?.project_key)

  // Skip preflight when we already have all required data
  const canAutoStart = connection.source_type === 'jira'
    ? Boolean(importSession?.project_key ?? connection.project_key)
    : (pluginManifest?.fetch_options ?? []).filter(f => f.required).every(f => Boolean(initialPluginOpts[f.key]))

  const [step, setStep] = useState<RefreshStep>(canAutoStart ? 'fetching' : 'preflight')

  // Pre-flight state — prefer importSession.project_key over connection default
  const [projectKey, setProjectKey] = useState(importSession?.project_key ?? connection.project_key ?? '')
  const [issueTypes, setIssueTypes] = useState<string[]>(connection.issue_types ?? ['Story', 'Task', 'Bug'])
  const [resolvedFrom, setResolvedFrom] = useState(connection.resolved_from ?? '')
  const [resolvedTo, setResolvedTo] = useState(connection.resolved_to ?? '')
  const [pluginOptions, setPluginOptions] = useState<Record<string, string>>(initialPluginOpts)

  // Fetch state
  const [fetchMsg, setFetchMsg] = useState(canAutoStart ? t('refresh.fetching') : '')
  const [fetchError, setFetchError] = useState('')
  const [fetchResult, setFetchResult] = useState<Record<string, unknown> | null>(null)
  const [fetchedStatuses, setFetchedStatuses] = useState<string[]>([])
  const [ticketCount, setTicketCount] = useState(0)

  function toggleIssueType(type: string) {
    setIssueTypes((prev) =>
      prev.includes(type) ? prev.filter((x) => x !== type) : [...prev, type]
    )
  }

  async function resolveConfigId(): Promise<string | undefined> {
    // If refreshing an existing dataset, use its config directly
    if (importSession?.config_id) return importSession.config_id
    // Otherwise fall back to most recent config for this connection
    const [datasets, configs] = await Promise.all([
      api.connections.datasets(connection.id).catch(() => []),
      api.configs.list().catch(() => []),
    ])
    const lastConfigId = datasets[0]?.config_id
    return (lastConfigId && configs.find(c => c.id === lastConfigId))
      ? lastConfigId
      : configs[0]?.id
  }

  async function handleRefresh() {
    if (!projectKey) return
    setStep('fetching')
    setFetchMsg(t('refresh.fetching'))
    setFetchError('')
    try {
      const options: JiraFetchOptions = {
        project: projectKey.trim().toUpperCase(),
        issue_types: issueTypes,
        resolved_from: resolvedFrom || undefined,
        resolved_to: resolvedTo || undefined,
      }
      const result = await api.connections.fetchStream(connection.id, options, (current, total, key) => {
        setFetchMsg(t('refresh.fetchingTicket', { current, total, key }))
      }) as Record<string, unknown>

      const statuses = extractStatuses(result)
      setFetchResult(result)
      setFetchedStatuses(statuses)
      setTicketCount((result.tickets as unknown[])?.length ?? 0)

      const blob = new Blob([JSON.stringify(result)], { type: 'application/json' })
      const file = new File([blob], `${projectKey}-refresh.json`, { type: 'application/json' })

      if (importSession) {
        // Replace existing dataset in-place (same ID → same project in sidebar)
        await api.imports.replace(importSession.id, file)
        notifyImportsChanged()
        onClose()
        navigate(`/projects/${importSession.id}`)
      } else {
        const configId = await resolveConfigId()
        if (configId) {
          const session = await api.imports.upload(file, configId, projectKey || undefined, connection.id)
          notifyImportsChanged()
          onClose()
          navigate(`/projects/${session.id}`)
        } else {
          setStep('configure')
        }
      }
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : 'Fetch failed')
    }
  }

  async function handlePluginRefresh() {
    setStep('fetching')
    setFetchMsg(t('refresh.fetching'))
    setFetchError('')
    try {
      const result = await api.connections.fetchStream(connection.id, pluginOptions as unknown as JiraFetchOptions, (current, total, key) => {
        setFetchMsg(t('refresh.fetchingTicket', { current, total, key }))
      }) as Record<string, unknown>

      const statuses = extractStatuses(result)
      setFetchResult(result)
      setFetchedStatuses(statuses)
      setTicketCount((result.tickets as unknown[])?.length ?? 0)

      const blob = new Blob([JSON.stringify(result)], { type: 'application/json' })
      const file = new File([blob], `${connection.name}-refresh.json`, { type: 'application/json' })

      if (importSession) {
        await api.imports.replace(importSession.id, file)
        notifyImportsChanged()
        onClose()
        navigate(`/projects/${importSession.id}`)
      } else {
        const configId = await resolveConfigId()
        if (configId) {
          const session = await api.imports.upload(file, configId, connection.name || undefined, connection.id)
          notifyImportsChanged()
          onClose()
          navigate(`/projects/${session.id}`)
        } else {
          setStep('configure')
        }
      }
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : 'Fetch failed')
    }
  }

  // Auto-start fetch when we have all required data
  const autoStarted = useRef(false)
  useEffect(() => {
    if (!canAutoStart || autoStarted.current) return
    autoStarted.current = true
    if (connection.source_type === 'jira') {
      handleRefresh()
    } else {
      handlePluginRefresh()
    }
  }, [])

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) onClose()
  }

  // ── Plugin pre-flight (only shown when auto-start not possible) ──────────

  if (step === 'preflight' && connection.source_type !== 'jira' && pluginManifest) {
    const fetchOptions = pluginManifest.fetch_options ?? []
    const canFetch = fetchOptions.filter((f) => f.required).every((f) => Boolean(pluginOptions[f.key]))

    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('refresh.title')}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-400">{t('refresh.preflight')}</p>
          <div className="space-y-3 py-2">
            {fetchOptions.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                <Input
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={pluginOptions[field.key] ?? ''}
                  onChange={(e) => setPluginOptions((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder ?? ''}
                  className="h-8 text-sm"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>{t('common.cancel')}</Button>
            <Button onClick={handlePluginRefresh} disabled={!canFetch}>
              {t('refresh.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // ── Jira pre-flight (only shown when no project_key stored) ─────────────

  if (step === 'preflight') {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('refresh.title')}</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-400">{t('refresh.preflight')}</p>

          <div className="space-y-3 py-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('connection.projectKey')}</label>
              <Input
                value={projectKey}
                onChange={(e) => setProjectKey(e.target.value.toUpperCase())}
                placeholder={t('connection.projectKeyPlaceholder')}
                className="h-8 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('connection.issueTypes')}</label>
              <div className="flex flex-wrap gap-1.5">
                {ISSUE_TYPE_OPTIONS.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleIssueType(type)}
                    className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors ${
                      issueTypes.includes(type)
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('connection.resolvedBetween')}</label>
              <div className="flex items-center gap-2">
                <DatePicker value={resolvedFrom} onChange={setResolvedFrom} placeholder={t('common.from')} />
                <span className="text-gray-400 text-xs">{t('common.to')}</span>
                <DatePicker value={resolvedTo} onChange={setResolvedTo} placeholder={t('common.to')} />
              </div>
              {resolvedTo ? (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-2.5 py-1.5 mt-1.5">
                  {t('import.fixedEndDateNoRefresh')}
                </p>
              ) : (
                <p className="text-xs text-gray-400 mt-1">{t('import.untilToday')}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>{t('common.cancel')}</Button>
            <Button onClick={handleRefresh} disabled={!projectKey || issueTypes.length === 0}>
              {t('refresh.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // ── Fetching ────────────────────────────────────────────────────────────

  if (step === 'fetching') {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('refresh.title')}</DialogTitle>
          </DialogHeader>

          <div className="py-8 flex flex-col items-center gap-4">
            {fetchError ? (
              <>
                <AlertCircle className="w-10 h-10 text-red-400" />
                <p className="text-sm text-red-600 text-center">{fetchError}</p>
                <Button variant="outline" onClick={() => { setFetchError(''); setStep('preflight') }}>
                  {t('common.back')}
                </Button>
              </>
            ) : (
              <>
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-500 text-center">{fetchMsg}</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // ── Configure (first-time only) ─────────────────────────────────────────

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('refresh.configNeeded')}</DialogTitle>
        </DialogHeader>

        <ConfigureStep
          compact
          projectKey={connection.source_type === 'jira' ? projectKey : connection.name}
          ticketCount={ticketCount}
          statuses={fetchedStatuses}
          onComplete={async (configId, datasetName) => {
            const filePrefix = connection.source_type === 'jira' ? projectKey : connection.name
            const blob = new Blob([JSON.stringify(fetchResult)], { type: 'application/json' })
            const file = new File([blob], `${filePrefix}-refresh.json`, { type: 'application/json' })
            const session = await api.imports.upload(file, configId, datasetName || undefined, connection.id)
            notifyImportsChanged()
            onClose()
            navigate(`/projects/${session.id}`)
          }}
          onCancel={() => setStep('preflight')}
        />
      </DialogContent>
    </Dialog>
  )
}
