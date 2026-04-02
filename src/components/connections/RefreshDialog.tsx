import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import { api } from '@/services/api'
import { notifyImportsChanged } from '@/hooks/useImports'
import type { SourceConnection, JiraFetchOptions } from '@/types'
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

export default function RefreshDialog({ open, connection, onClose }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState<RefreshStep>('preflight')

  // Pre-flight state
  const [projectKey, setProjectKey] = useState(connection.project_key ?? '')
  const [issueTypes, setIssueTypes] = useState<string[]>(connection.issue_types ?? ['Story', 'Task', 'Bug'])
  const [limit, setLimit] = useState(50)
  const [resolvedFrom, setResolvedFrom] = useState(connection.resolved_from ?? '')
  const [resolvedTo, setResolvedTo] = useState(connection.resolved_to ?? '')

  // Fetch state
  const [fetchMsg, setFetchMsg] = useState('')
  const [fetchError, setFetchError] = useState('')
  const [fetchResult, setFetchResult] = useState<Record<string, unknown> | null>(null)
  const [fetchedStatuses, setFetchedStatuses] = useState<string[]>([])
  const [ticketCount, setTicketCount] = useState(0)

  function toggleIssueType(type: string) {
    setIssueTypes((prev) =>
      prev.includes(type) ? prev.filter((x) => x !== type) : [...prev, type]
    )
  }

  async function handleRefresh() {
    if (!projectKey) return
    setStep('fetching')
    setFetchMsg(t('refresh.fetching'))
    setFetchError('')

    try {
      const options: JiraFetchOptions = {
        project: projectKey.trim().toUpperCase(),
        limit,
        issue_types: issueTypes,
        resolved_from: resolvedFrom || undefined,
        resolved_to: resolvedTo || undefined,
      }
      const result = await api.connections.fetchStream(connection.id, options, (current, total, key) => {
        setFetchMsg(t('refresh.fetchingTicket', { current, total, key }))
      }) as Record<string, unknown>

      const statuses = extractStatuses(result)
      const count = (result.tickets as unknown[])?.length ?? 0
      setFetchResult(result)
      setFetchedStatuses(statuses)
      setTicketCount(count)

      // Check if configs exist — if yes, auto-import with the first one
      const configs = await api.configs.list().catch(() => [])
      if (configs.length > 0) {
        // Auto-import with first config
        const configId = configs[0].id
        const blob = new Blob([JSON.stringify(result)], { type: 'application/json' })
        const file = new File([blob], `${projectKey}-refresh.json`, { type: 'application/json' })
        const session = await api.imports.upload(file, configId, projectKey || undefined)
        notifyImportsChanged()
        onClose()
        navigate(`/projects/${session.id}`)
      } else {
        // No config — show configure step
        setStep('configure')
      }
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : 'Fetch failed')
    }
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) onClose()
  }

  // ── Pre-flight ──────────────────────────────────────────────────────────

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

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>{t('import.maxTickets')}</span>
              <Input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-20 h-8 text-sm"
                min={1}
                max={500}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('connection.resolvedBetween')}</label>
              <div className="flex items-center gap-2">
                <DatePicker value={resolvedFrom} onChange={setResolvedFrom} placeholder={t('common.from')} />
                <span className="text-gray-400 text-xs">{t('common.to')}</span>
                <DatePicker value={resolvedTo} onChange={setResolvedTo} placeholder={t('common.to')} />
              </div>
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
          projectKey={projectKey}
          ticketCount={ticketCount}
          statuses={fetchedStatuses}
          onComplete={async (configId, datasetName) => {
            const blob = new Blob([JSON.stringify(fetchResult)], { type: 'application/json' })
            const file = new File([blob], `${projectKey}-refresh.json`, { type: 'application/json' })
            const session = await api.imports.upload(file, configId, datasetName || undefined)
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
