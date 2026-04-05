import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Link2, Clock, ArrowRight, ArrowLeft, Loader2, ExternalLink, GripVertical, X, Plus, Info, Puzzle,
} from 'lucide-react'
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates,
  useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { api } from '@/services/api'
import type { SourceConnection, PluginManifest } from '@/types'
import ConnectionDialog from '@/components/connections/ConnectionDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { ErrorBanner } from '@/components/ui/ErrorBanner'
import { notifyImportsChanged } from '@/hooks/useImports'

type Step = 'source' | 'pick-connection' | 'connect' | 'fetch' | 'statuses' | 'measure'

function ConnFieldLabel({ label, helpKey }: { label: string; helpKey: string }) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-1 mb-1.5">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-gray-300 hover:text-gray-500 transition-colors">
            <Info className="w-3.5 h-3.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <p className="text-xs text-gray-600">{t(helpKey)}</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function SortableStatus({ id, onRemove }: { id: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-white ${isDragging ? 'shadow-md border-blue-300' : 'border-gray-200'}`}
    >
      <span {...attributes} {...listeners} className="cursor-grab text-gray-300 hover:text-gray-500">
        <GripVertical className="w-4 h-4" />
      </span>
      <span className="flex-1 text-gray-700">{id}</span>
      <button onClick={onRemove} className="text-gray-300 hover:text-red-400">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

const ISSUE_TYPE_OPTIONS = ['Story', 'Task', 'Bug', 'Epic']

function extractStatuses(data: Record<string, unknown>): string[] {
  const statuses = new Set<string>()
  const tickets = (data.tickets as Array<Record<string, unknown>>) ?? []
  for (const ticket of tickets) {
    const transitions = (ticket.transitions as Array<Record<string, unknown>>) ?? []
    for (const t of transitions) {
      if (t.to_status) statuses.add(t.to_status as string)
      if (t.from_status) statuses.add(t.from_status as string)
    }
  }
  return [...statuses].sort()
}

// ── Wizard step header ────────────────────────────────────────────────────────
function WizardHeader({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 ${active ? 'text-blue-600' : done ? 'text-gray-400' : 'text-gray-300'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                active ? 'border-blue-600 bg-blue-600 text-white'
                : done ? 'border-gray-300 bg-gray-100 text-gray-400'
                : 'border-gray-200 text-gray-300'
              }`}>
                {done ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium ${active ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className="w-8 h-px bg-gray-200" />}
          </div>
        )
      })}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ImportPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('source')
  const [hadConnections, setHadConnections] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // pick-connection step
  const [availableConns, setAvailableConns] = useState<SourceConnection[]>([])
  const [selectedConnId, setSelectedConnId] = useState('')

  // connect step
  const [connName, setConnName] = useState('')
  const [connBaseUrl, setConnBaseUrl] = useState('')
  const [connEmail, setConnEmail] = useState('')
  const [connApiToken, setConnApiToken] = useState('')
  const [connecting, setConnecting] = useState(false)

  // active connection
  const [connection, setConnection] = useState<SourceConnection | null>(null)

  // plugin support
  const [installedPlugins, setInstalledPlugins] = useState<PluginManifest[]>([])
  const [selectedManifest, setSelectedManifest] = useState<PluginManifest | null>(null)
  const [pluginOptions, setPluginOptions] = useState<Record<string, string>>({})
  const [pluginConnDialog, setPluginConnDialog] = useState(false)

  useEffect(() => {
    api.plugins.list().then(setInstalledPlugins).catch(() => {})
  }, [])

  // fetch step
  const [jiraProject, setJiraProject] = useState('')
  const [jiraLimit, setJiraLimit] = useState(200)
  const [jiraIssueTypes, setJiraIssueTypes] = useState(['Story', 'Task', 'Bug'])
  const [resolvedFrom, setResolvedFrom] = useState('')
  const [resolvedTo, setResolvedTo] = useState('')
  const [fetching, setFetching] = useState(false)
  const [fetchMsg, setFetchMsg] = useState('')

  // measure step
  const [statuses, setStatuses] = useState<string[]>([])
  const [fetchedData, setFetchedData] = useState<unknown>(null)
  const [fetchedProjectKey, setFetchedProjectKey] = useState('')
  const [cycleStart, setCycleStart] = useState('')
  const [cycleEnd, setCycleEnd] = useState('')
  const [cycleMode, setCycleMode] = useState<'first_last' | 'first_first' | 'last_last'>('first_last')
  const [importing, setImporting] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // ── Step: Source ──────────────────────────────────────────────────────────
  if (step === 'source') {
    async function handleJira() {
      setErrorMsg(null)
      setSelectedManifest(null)
      const all = await api.connections.list().catch(() => [] as SourceConnection[])
      const conns = all.filter((c) => c.source_type === 'jira')
      if (conns.length > 0) {
        setAvailableConns(conns)
        setSelectedConnId(conns[0].id)
        setHadConnections(true)
        setStep('pick-connection')
      } else {
        setHadConnections(false)
        setStep('connect')
      }
    }

    async function handlePlugin(manifest: PluginManifest) {
      setErrorMsg(null)
      setSelectedManifest(manifest)
      setPluginOptions((manifest.fetch_options ?? []).reduce<Record<string, string>>((acc, f) => {
        acc[f.key] = String(f.default ?? '')
        return acc
      }, {}))
      const all = await api.connections.list().catch(() => [] as SourceConnection[])
      const conns = all.filter((c) => c.source_type === manifest.source_type)
      if (conns.length > 0) {
        setAvailableConns(conns)
        setSelectedConnId(conns[0].id)
        setHadConnections(true)
        setStep('pick-connection')
      } else {
        setHadConnections(false)
        setPluginConnDialog(true)
      }
    }

    return (
      <div className="max-w-lg">
        <WizardHeader steps={[t('wizard.stepImport'), t('wizard.stepSetup')]} current={0} />
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('import.chooseSource')}</h2>
          <p className="text-sm text-gray-400 mt-1">{t('import.chooseSourceHint')}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleJira}
            className="flex flex-col items-start gap-2 p-4 rounded-xl border-2 border-gray-200 bg-white text-left hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
              <Link2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{t('import.jira')}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t('import.connectLive')}</p>
            </div>
          </button>

          {installedPlugins.map((plugin) => (
            <button
              key={plugin.source_type}
              onClick={() => handlePlugin(plugin)}
              className="flex flex-col items-start gap-2 p-4 rounded-xl border-2 border-gray-200 bg-white text-left hover:border-purple-300 hover:bg-purple-50 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-purple-100 transition-colors">
                <Puzzle className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{plugin.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t('import.connectLive')}</p>
              </div>
            </button>
          ))}

          {([
            { key: 'import.uploadFileOption', icon: <Clock className="w-5 h-5 text-gray-400" /> },
            { key: 'import.trello', icon: <Clock className="w-5 h-5 text-gray-400" /> },
            { key: 'import.linear', icon: <Clock className="w-5 h-5 text-gray-400" /> },
          ] as const).map(({ key, icon }) => (
            <div key={key} className="flex flex-col items-start gap-2 p-4 rounded-xl border-2 border-dashed border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed">
              <div className="p-2 rounded-lg bg-gray-100">{icon}</div>
              <div>
                <p className="font-semibold text-gray-500 text-sm">{t(key as Parameters<typeof t>[0])}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t('common.comingSoon')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Plugin: inline ConnectionDialog when no existing connection ──────────
  if (pluginConnDialog && selectedManifest) {
    return (
      <ConnectionDialog
        open
        manifest={selectedManifest}
        onClose={() => { setPluginConnDialog(false); setSelectedManifest(null) }}
        onSaved={(conn) => {
          setConnection(conn)
          setAvailableConns([conn])
          setSelectedConnId(conn.id)
          setPluginConnDialog(false)
          setStep('fetch')
        }}
      />
    )
  }

  // ── Step: Pick connection ─────────────────────────────────────────────────
  if (step === 'pick-connection') {
    const steps = [t('wizard.stepImport'), t('wizard.stepStatuses'), t('wizard.stepSetup')]

    function handleContinue() {
      const conn = availableConns.find((c) => c.id === selectedConnId)
      if (!conn) return
      setConnection(conn)
      setStep('fetch')
    }

    function handleAddNew() {
      if (selectedManifest) {
        setPluginConnDialog(true)
      } else {
        setStep('connect')
      }
    }

    return (
      <div className="max-w-lg">
        <WizardHeader steps={steps} current={0} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('wizard.pickConnTitle')}</h2>
          <p className="text-sm text-gray-400 mt-1">{t('wizard.pickConnHint')}</p>
        </div>

        <div className="space-y-2 mb-4">
          {availableConns.map((conn) => (
            <button
              key={conn.id}
              onClick={() => setSelectedConnId(conn.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-colors ${
                selectedConnId === conn.id
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`p-2 rounded-lg ${selectedConnId === conn.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Link2 className={`w-4 h-4 ${selectedConnId === conn.id ? 'text-blue-600' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${selectedConnId === conn.id ? 'text-blue-800' : 'text-gray-900'}`}>
                  {conn.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {conn.base_url ? `${conn.base_url} · ${conn.email}` : conn.source_type}
                </p>
              </div>
              {selectedConnId === conn.id && (
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <Plus className="w-4 h-4" />
          {t('wizard.addNewConn')}
        </button>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setStep('source')} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Button>
          <Button onClick={handleContinue} disabled={!selectedConnId} className="flex-1 gap-2 h-11">
            {t('common.continue')} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  // ── Step: Connect ─────────────────────────────────────────────────────────
  if (step === 'connect') {
    const canConnect = Boolean(connName && connBaseUrl && connEmail && connApiToken)

    function parseConnectError(msg: string): string {
      if (msg.includes('401')) return t('connection.errUnauthorized')
      if (msg.includes('403')) return t('connection.errForbidden')
      if (msg.includes('404')) return t('connection.errNotFound')
      if (/ECONNREFUSED|ENOTFOUND|fetch failed|NetworkError/i.test(msg)) return t('connection.errUnreachable')
      if (/timeout|timed out/i.test(msg)) return t('connection.errTimeout')
      return t('connection.errGeneric', { message: msg })
    }

    async function handleConnect() {
      setConnecting(true)
      setErrorMsg(null)
      let conn: SourceConnection | null = null
      try {
        conn = await api.connections.create({
          name: connName,
          source_type: 'jira' as const,
          base_url: connBaseUrl,
          email: connEmail,
          api_token: connApiToken,
        }) as SourceConnection
        await api.connections.test(conn.id)
        setConnection(conn)
        setAvailableConns((prev) => [...prev, conn!])
        setSelectedConnId(conn.id)
        setStep('fetch')
      } catch (e) {
        if (conn) {
          api.connections.delete(conn.id).catch(() => {})
        }
        const msg = e instanceof Error ? e.message : 'Connection failed'
        setErrorMsg(parseConnectError(msg))
      } finally {
        setConnecting(false)
      }
    }

    return (
      <div className="max-w-lg">
        <WizardHeader steps={[t('wizard.stepConnect'), t('wizard.stepImport'), t('wizard.stepSetup')]} current={0} />
        <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('wizard.connectTitle', { source: 'Jira' })}</h2>
          <p className="text-sm text-gray-400 mt-1">
            {t('wizard.connectHint')}{' '}
            <a
              href="https://id.atlassian.com/manage-profile/security/api-tokens"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline inline-flex items-center gap-0.5"
            >
              {t('connection.atlassianTokens')} <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <ConnFieldLabel label={t('connection.name')} helpKey="help.connName" />
            <Input value={connName} onChange={(e) => setConnName(e.target.value)} placeholder={t('connection.namePlaceholder')} />
          </div>
          <div>
            <ConnFieldLabel label={t('connection.jiraBaseUrl')} helpKey="help.connBaseUrl" />
            <Input value={connBaseUrl} onChange={(e) => setConnBaseUrl(e.target.value)} placeholder="https://yourcompany.atlassian.net" />
          </div>
          <div>
            <ConnFieldLabel label={t('connection.email')} helpKey="help.connEmail" />
            <Input type="email" value={connEmail} onChange={(e) => setConnEmail(e.target.value)} placeholder={t('connection.emailPlaceholder')} />
          </div>
          <div>
            <ConnFieldLabel label={t('connection.apiToken')} helpKey="help.connApiToken" />
            <Input type="password" value={connApiToken} onChange={(e) => setConnApiToken(e.target.value)} placeholder={t('connection.apiTokenPlaceholder')} />
            <p className="mt-1.5 text-xs text-gray-400 flex items-center gap-1">
              {t('connection.getTokenAt')}{' '}
              <a
                href="https://id.atlassian.com/manage-profile/security/api-tokens"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline inline-flex items-center gap-0.5"
              >
                {t('connection.atlassianTokens')} <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={() => setStep(hadConnections ? 'pick-connection' : 'source')} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Button>
          <Button onClick={handleConnect} disabled={!canConnect || connecting} className="flex-1 gap-2 h-11">
            {connecting
              ? <><Loader2 className="w-4 h-4 animate-spin" /> {t('wizard.connecting')}</>
              : <>{t('wizard.connectBtn')} <ArrowRight className="w-4 h-4" /></>
            }
          </Button>
        </div>
      </div>
    )
  }

  // ── Step: Fetch (plugin) ──────────────────────────────────────────────────
  if (step === 'fetch' && connection && connection.source_type !== 'jira' && selectedManifest) {
    const fetchOptions = selectedManifest.fetch_options
    const canFetch = !fetching && fetchOptions.filter((f) => f.required).every((f) => Boolean(pluginOptions[f.key]))

    async function handlePluginFetch() {
      if (!connection) return
      setFetching(true)
      setFetchMsg(t('refresh.fetching'))
      setErrorMsg(null)
      try {
        const result = await api.connections.fetchStream(connection.id, pluginOptions, (current, total, key) => {
          setFetchMsg(t('import.fetchingTicket', { current, total, key }))
        }) as Record<string, unknown>
        const s = extractStatuses(result)
        setStatuses(s)
        setFetchedData(result)
        setFetchedProjectKey((result.project_key as string) ?? '')
        setCycleStart('')
        setCycleEnd('')
        setStep('statuses')
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : 'Fetch failed')
      } finally {
        setFetching(false)
        setFetchMsg('')
      }
    }

    return (
      <div className="max-w-lg">
        <WizardHeader steps={[t('wizard.stepImport'), t('wizard.stepSetup')]} current={0} />
        <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('wizard.fetchTitle')}</h2>
          {connection && (
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
              {t('wizard.fetchVia')}
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-700 rounded-full font-medium">
                <Puzzle className="w-3 h-3" /> {connection.name}
              </span>
            </p>
          )}
        </div>
        <div className="space-y-4">
          {fetchOptions.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
              <Input
                type={field.type === 'number' ? 'number' : 'text'}
                value={pluginOptions[field.key] ?? ''}
                onChange={(e) => setPluginOptions((prev) => ({ ...prev, [field.key]: e.target.value }))}
                placeholder={field.placeholder ?? ''}
              />
            </div>
          ))}
        </div>
        {fetching && <p className="text-sm text-gray-500 mt-4 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />{fetchMsg}</p>}
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={() => setStep(hadConnections ? 'pick-connection' : 'source')} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Button>
          <Button onClick={handlePluginFetch} disabled={!canFetch} className="flex-1 gap-2 h-11">
            {fetching
              ? <><Loader2 className="w-4 h-4 animate-spin" />{fetchMsg}</>
              : <>{t('wizard.fetchTitle')} <ArrowRight className="w-4 h-4" /></>}
          </Button>
        </div>
      </div>
    )
  }

  // ── Step: Fetch (Jira) ────────────────────────────────────────────────────
  if (step === 'fetch') {
    const steps = hadConnections
      ? [t('wizard.stepImport'), t('wizard.stepSetup')]
      : [t('wizard.stepConnect'), t('wizard.stepImport'), t('wizard.stepSetup')]
    const currentStep = hadConnections ? 0 : 1

    function toggleIssueType(type: string) {
      setJiraIssueTypes((prev) =>
        prev.includes(type) ? prev.filter((x) => x !== type) : [...prev, type]
      )
    }

    async function handleFetch() {
      if (!connection || !jiraProject) return
      setFetching(true)
      setFetchMsg(t('import.connectingToJira'))
      setErrorMsg(null)
      try {
        const result = await api.connections.fetchStream(
          connection.id,
          {
            project: jiraProject.trim().toUpperCase(),
            limit: jiraLimit,
            issue_types: jiraIssueTypes,
            resolved_from: resolvedFrom || undefined,
            resolved_to: resolvedTo || undefined,
          },
          (current, total, key) => {
            setFetchMsg(t('import.fetchingTicket', { current, total, key }))
          },
        ) as Record<string, unknown>

        const s = extractStatuses(result)
        setStatuses(s)
        setFetchedData(result)
        setFetchedProjectKey((result.project_key as string) ?? jiraProject.trim().toUpperCase())
        setCycleStart('')
        setCycleEnd('')
        setStep('statuses')
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : 'Fetch failed')
      } finally {
        setFetching(false)
        setFetchMsg('')
      }
    }

    return (
      <div className="max-w-lg">
        <WizardHeader steps={steps} current={currentStep} />
        <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('wizard.fetchTitle')}</h2>
          {connection && (
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
              {t('wizard.fetchVia')}
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full font-medium">
                <Link2 className="w-3 h-3" /> {connection.name}
              </span>
            </p>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <ConnFieldLabel label={t('import.projectKey')} helpKey="help.projectKey" />
            <Input
              value={jiraProject}
              onChange={(e) => setJiraProject(e.target.value.toUpperCase())}
              placeholder={t('import.projectKeyPlaceholder')}
            />
          </div>
          <div>
            <ConnFieldLabel label={t('import.issueTypes')} helpKey="help.issueTypes" />
            <div className="flex flex-wrap gap-2">
              {ISSUE_TYPE_OPTIONS.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleIssueType(type)}
                  className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-colors ${
                    jiraIssueTypes.includes(type)
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
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-sm font-medium text-gray-700">{t('import.maxTickets')}</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <p className="text-xs text-gray-600">{t('help.maxTickets')}</p>
                </PopoverContent>
              </Popover>
              <Input
                type="number"
                value={jiraLimit}
                onChange={(e) => setJiraLimit(Number(e.target.value))}
                className="w-20 h-8 text-sm ml-1"
                min={1}
                max={500}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-sm font-medium text-gray-700">{t('import.completedBetween')}</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <p className="text-xs text-gray-600">{t('help.completedBetween')}</p>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-2">
              <DatePicker value={resolvedFrom} onChange={setResolvedFrom} placeholder={t('common.from')} />
              <span className="text-gray-400 text-sm">{t('common.to')}</span>
              <DatePicker value={resolvedTo} onChange={setResolvedTo} placeholder={t('common.to')} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{t('import.completedBetweenHint')}</p>
          </div>
          {fetchMsg && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              {fetchMsg}
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={() => setStep(hadConnections ? 'source' : 'connect')} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Button>
          <Button
            onClick={handleFetch}
            disabled={fetching || !jiraProject || jiraIssueTypes.length === 0}
            className="flex-1 gap-2 h-11"
          >
            {fetching
              ? <><Loader2 className="w-4 h-4 animate-spin" /> {t('import.importing')}</>
              : <>{t('wizard.fetchData')} <ArrowRight className="w-4 h-4" /></>
            }
          </Button>
        </div>
      </div>
    )
  }

  // ── Step: Statuses ───────────────────────────────────────────────────────
  if (step === 'statuses') {
    const statusSteps = hadConnections
      ? [t('wizard.stepImport'), t('wizard.stepStatuses'), t('wizard.stepSetup')]
      : [t('wizard.stepConnect'), t('wizard.stepImport'), t('wizard.stepStatuses'), t('wizard.stepSetup')]
    const statusCurrent = hadConnections ? 1 : 2

    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event
      if (over && active.id !== over.id) {
        setStatuses((items) => {
          const o = items.indexOf(active.id as string)
          const n = items.indexOf(over.id as string)
          return arrayMove(items, o, n)
        })
      }
    }

    return (
      <div className="max-w-lg">
        <WizardHeader steps={statusSteps} current={statusCurrent} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('wizard.statusesTitle')}</h2>
          <p className="text-sm text-gray-400 mt-1">{t('wizard.statusesHint')}</p>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={statuses} strategy={verticalListSortingStrategy}>
            <div className="space-y-1.5">
              {statuses.map((s) => (
                <SortableStatus
                  key={s}
                  id={s}
                  onRemove={() => setStatuses((prev) => prev.filter((x) => x !== s))}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {statuses.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">{t('wizard.statusesEmpty')}</p>
        )}

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={() => setStep('fetch')} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Button>
          <Button
            onClick={() => setStep('measure')}
            disabled={statuses.length < 2}
            className="flex-1 gap-2 h-11"
          >
            {t('common.continue')} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  // ── Step: Measure ─────────────────────────────────────────────────────────
  const measureSteps = hadConnections
    ? [t('wizard.stepImport'), t('wizard.stepStatuses'), t('wizard.stepSetup')]
    : [t('wizard.stepConnect'), t('wizard.stepImport'), t('wizard.stepStatuses'), t('wizard.stepSetup')]
  const measureCurrent = hadConnections ? 2 : 3
  const canImport = Boolean(cycleStart && cycleEnd && cycleStart !== cycleEnd)

  async function handleStartAnalyzing() {
    if (!connection || !fetchedData || !canImport) return
    setImporting(true)
    setErrorMsg(null)
    try {
      const config = await api.configs.create({
        name: `${fetchedProjectKey} Team`,
        source_type: connection!.source_type,
        status_order: statuses,
        cycle_time_start_status: cycleStart,
        cycle_time_end_status: cycleEnd,
        cycle_time_mode: cycleMode,
      })
      const blob = new Blob([JSON.stringify(fetchedData)], { type: 'application/json' })
      const file = new File([blob], `${fetchedProjectKey}-export.json`, { type: 'application/json' })
      const autoName = `${fetchedProjectKey} – ${new Date().toLocaleDateString()}`
      const session = await api.imports.upload(file, config.id, autoName, connection.id)
      // Save project defaults to connection so next Refresh auto-starts (no preflight)
      if (connection.source_type === 'jira' && !connection.project_key) {
        api.connections.update(connection.id, {
          project_key: fetchedProjectKey,
          issue_types: jiraIssueTypes,
          resolved_from: resolvedFrom || undefined,
          resolved_to: resolvedTo || undefined,
        }).catch(() => {})
      }
      notifyImportsChanged()
      navigate(`/projects/${session.id}`)
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Import failed')
      setImporting(false)
    }
  }

  const modeOptions = [
    { value: 'first_last' as const, label: t('wizard.measureModeFullLabel'), hint: t('wizard.measureModeFullHint') },
    { value: 'first_first' as const, label: t('wizard.measureModeFirstLabel'), hint: t('wizard.measureModeFirstHint') },
    { value: 'last_last' as const, label: t('wizard.measureModeLastLabel'), hint: t('wizard.measureModeLastHint') },
  ]

  return (
    <div className="max-w-lg">
      <WizardHeader steps={measureSteps} current={measureCurrent} />
      <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('wizard.measureTitle')}</h2>
        <p className="text-sm text-gray-400 mt-1">{t('wizard.measureHint')}</p>
      </div>

      <div className="space-y-5">
        {/* Start + End in one card */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('wizard.measureStartQ')}</label>
            <Select value={cycleStart} onValueChange={setCycleStart}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="— select —" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('wizard.measureEndQ')}</label>
            <Select value={cycleEnd} onValueChange={setCycleEnd}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="— select —" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lead time note */}
        <p className="text-xs text-gray-400 -mt-1">{t('wizard.measureLeadTimeNote')}</p>

        {/* Measurement mode */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-3">{t('wizard.measureModeQ')}</p>
          <div className="space-y-2">
            {modeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCycleMode(opt.value)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-colors ${
                  cycleMode === opt.value ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  cycleMode === opt.value ? 'border-blue-500' : 'border-gray-300'
                }`}>
                  {cycleMode === opt.value && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${cycleMode === opt.value ? 'text-blue-800' : 'text-gray-700'}`}>
                    {opt.label}
                    {opt.value === 'first_last' && (
                      <span className="ml-2 text-xs font-normal text-blue-500">{t('common.recommended')}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{opt.hint}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button variant="outline" onClick={() => setStep('statuses')} className="gap-1.5">
          <ArrowLeft className="w-4 h-4" /> {t('common.back')}
        </Button>
        <Button onClick={handleStartAnalyzing} disabled={!canImport || importing} className="flex-1 gap-2 h-11">
          {importing
            ? <><Loader2 className="w-4 h-4 animate-spin" /> {t('import.importing')}</>
            : <>{t('wizard.startAnalyzing')} <ArrowRight className="w-4 h-4" /></>
          }
        </Button>
      </div>
    </div>
  )
}
