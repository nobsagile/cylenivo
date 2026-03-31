import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { notifyImportsChanged } from '@/hooks/useImports'
import {
  UploadCloud, CheckCircle2, FileJson, ArrowRight, ArrowLeft,
  Plus, GripVertical, X, Loader2, Link2, Clock, Info,
} from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
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
import type { ProjectConfig, SourceConnection, JiraFetchOptions } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import ConnectionDialog from '@/components/connections/ConnectionDialog'
import { DatePicker } from '@/components/ui/date-picker'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

type Step = 'source' | 'upload' | 'jira' | 'configure'
type SourceMode = 'upload' | 'jira' | null

interface FilePreview {
  project_key: string
  ticket_count: number
  statuses: string[]
  raw: File | null
  fetched?: unknown // ImportFile from Jira fetch
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

export default function ImportPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<Step>('source')
  const [sourceMode, setSourceMode] = useState<SourceMode>(null)
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<FilePreview | null>(null)

  // Jira connect state
  const [connections, setConnections] = useState<SourceConnection[]>([])
  const [selectedConnId, setSelectedConnId] = useState('')
  const [jiraProject, setJiraProject] = useState('')
  const [jiraLimit, setJiraLimit] = useState(50)
  const [jiraIssueTypes, setJiraIssueTypes] = useState(['Story', 'Task', 'Bug'])
  const [fetching, setFetching] = useState(false)
  const [fetchMsg, setFetchMsg] = useState('')
  const [addConnOpen, setAddConnOpen] = useState(false)
  const [resolvedFrom, setResolvedFrom] = useState('')
  const [resolvedTo, setResolvedTo] = useState('')

  // Configure step
  const [configs, setConfigs] = useState<ProjectConfig[]>([])
  const [configMode, setConfigMode] = useState<'existing' | 'new'>('existing')
  const [selectedConfigId, setSelectedConfigId] = useState('')
  const [datasetName, setDatasetName] = useState('')
  const [newName, setNewName] = useState('')
  const [statusOrder, setStatusOrder] = useState<string[]>([])
  const [newStatus, setNewStatus] = useState('')
  const [cycleStart, setCycleStart] = useState('')
  const [cycleEnd, setCycleEnd] = useState('')
  const [cycleMode, setCycleMode] = useState<'first_last' | 'first_first' | 'last_last'>('first_last')
  const [leadStart, setLeadStart] = useState('')
  const [leadEnd, setLeadEnd] = useState('')
  const [importing, setImporting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleFile(f: File) {
    if (!f.name.endsWith('.json')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        const statuses = extractStatuses(data)
        setPreview({
          project_key: data.project_key ?? 'Unknown',
          ticket_count: data.tickets?.length ?? 0,
          statuses,
          raw: f,
        })
      } catch {
        setErrorMsg(t('import.invalidJson'))
      }
    }
    reader.readAsText(f)
  }

  async function goToConfigure(p?: FilePreview) {
    const src = p ?? preview
    if (!src) return
    const cfgs = await api.configs.list().catch(() => [])
    setConfigs(cfgs)
    setConfigMode(cfgs.length > 0 ? 'existing' : 'new')
    setSelectedConfigId(cfgs[0]?.id ?? '')
    setStatusOrder(src.statuses)
    setNewName(`${src.project_key} Config`)
    setCycleStart('')
    setCycleEnd('')
    setLeadStart('')
    setStep('configure')
  }

  async function handleFetchFromJira() {
    if (!selectedConnId || !jiraProject) return
    setFetching(true)
    setFetchMsg(t('import.connectingToJira'))
    try {
      const options: JiraFetchOptions = {
        project: jiraProject.trim().toUpperCase(),
        limit: jiraLimit,
        issue_types: jiraIssueTypes,
        resolved_from: resolvedFrom || undefined,
        resolved_to: resolvedTo || undefined,
      }
      setFetchMsg(t('import.fetchingTickets', { project: options.project }))
      const result = await api.connections.fetchStream(selectedConnId, options, (current, total, key) => {
        setFetchMsg(t('import.fetchingTicket', { current, total, key }))
      }) as Record<string, unknown>
      const statuses = extractStatuses(result)
      const p: FilePreview = {
        project_key: (result.project_key as string) ?? options.project,
        ticket_count: (result.tickets as unknown[])?.length ?? 0,
        statuses,
        raw: null,
        fetched: result,
      }
      setPreview(p)
      setFetchMsg('')
      await goToConfigure(p)
    } catch (e) {
      setFetchMsg('')
      setErrorMsg(e instanceof Error ? e.message : 'Fetch failed')
    } finally {
      setFetching(false)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setStatusOrder((items) => {
        const o = items.indexOf(active.id as string)
        const n = items.indexOf(over.id as string)
        return arrayMove(items, o, n)
      })
    }
  }

  function addStatus() {
    const s = newStatus.trim()
    if (s && !statusOrder.includes(s)) {
      setStatusOrder((p) => [...p, s])
      setNewStatus('')
    }
  }

  async function handleImport() {
    if (!preview) return
    setImporting(true)
    try {
      let configId = selectedConfigId

      if (configMode === 'new') {
        if (!newName || !cycleStart || !cycleEnd) {
          setErrorMsg('Please fill in config name, cycle start and end status.')
          setImporting(false)
          return
        }
        const newConfig = await api.configs.create({
          name: newName,
          source_type: 'jira',
          status_order: statusOrder,
          cycle_time_start_status: cycleStart,
          cycle_time_end_status: cycleEnd,
          cycle_time_mode: cycleMode,
          lead_time_start_status: leadStart || undefined,
          lead_time_end_status: leadEnd || undefined,
        })
        configId = newConfig.id
      }

      if (preview.raw) {
        const session = await api.imports.upload(preview.raw, configId, datasetName || undefined)
        notifyImportsChanged()
        navigate(`/projects/${session.id}`)
      } else if (preview.fetched) {
        // Upload fetched JSON as a blob
        const blob = new Blob([JSON.stringify(preview.fetched)], { type: 'application/json' })
        const file = new File([blob], `${preview.project_key}-jira-export.json`, { type: 'application/json' })
        const session = await api.imports.upload(file, configId, datasetName || undefined)
        notifyImportsChanged()
        navigate(`/projects/${session.id}`)
      }
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Error')
      setImporting(false)
    }
  }

  // ── Step: Source selection ───────────────────────────────────────────────
  if (step === 'source') {
    return (
      <div className="max-w-lg">
        <StepHeader current={1} total={3} />
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('import.chooseSource')}</h2>
          <p className="text-sm text-gray-400 mt-1">{t('import.chooseSourceHint')}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Jira live */}
          <button
            onClick={async () => {
              const conns = await api.connections.list().catch(() => [])
              setConnections(conns)
              setSelectedConnId(conns[0]?.id ?? '')
              setSourceMode('jira')
              setStep('jira')
            }}
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

          {/* Upload file */}
          <button
            onClick={() => { setSourceMode('upload'); setStep('upload') }}
            className="flex flex-col items-start gap-2 p-4 rounded-xl border-2 border-gray-200 bg-white text-left hover:border-gray-300 hover:bg-gray-50 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
              <UploadCloud className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{t('import.uploadFileOption')}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t('import.jsonExport')}</p>
            </div>
          </button>

          {/* Trello — coming soon */}
          <div className="flex flex-col items-start gap-2 p-4 rounded-xl border-2 border-dashed border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed">
            <div className="p-2 rounded-lg bg-gray-100">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-500 text-sm">{t('import.trello')}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t('common.comingSoon')}</p>
            </div>
          </div>

          {/* Linear — coming soon */}
          <div className="flex flex-col items-start gap-2 p-4 rounded-xl border-2 border-dashed border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed">
            <div className="p-2 rounded-lg bg-gray-100">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-500 text-sm">{t('import.linear')}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t('common.comingSoon')}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Step: Jira connect ───────────────────────────────────────────────────
  if (step === 'jira') {
    const issueTypeOptions = ['Story', 'Task', 'Bug', 'Epic']
    function toggleIssueType(t: string) {
      setJiraIssueTypes((prev) =>
        prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
      )
    }

    return (
      <div className="max-w-lg">
        <StepHeader current={2} total={3} />
        <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('import.fetchFromJira')}</h2>
          <p className="text-sm text-gray-400 mt-1">{t('import.fetchFromJiraHint')}</p>
        </div>

        <div className="space-y-4">
          {/* Connection selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('import.connection')}</label>
            {connections.length === 0 ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-800">{t('import.noConnections')}</p>
                  <p className="text-xs text-amber-600 mt-0.5">{t('import.noConnectionsHint')}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => setAddConnOpen(true)} className="gap-1.5 shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Select value={selectedConnId} onValueChange={setSelectedConnId}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={t('import.selectConnection')} />
                  </SelectTrigger>
                  <SelectContent>
                    {connections.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name} ({c.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => setAddConnOpen(true)} className="shrink-0 gap-1">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>

          {/* Project key */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <label className="text-sm font-medium text-gray-700">{t('import.projectKey')}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="text-xs text-gray-600">
                    <p>{t('help.projectKey')}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Input
              value={jiraProject}
              onChange={(e) => setJiraProject(e.target.value.toUpperCase())}
              placeholder={t('import.projectKeyPlaceholder')}
            />
          </div>

          {/* Issue types */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <label className="text-sm font-medium text-gray-700">{t('import.issueTypes')}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="text-xs text-gray-600">
                    <p>{t('help.issueTypes')}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-wrap gap-2">
              {issueTypeOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleIssueType(t)}
                  className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-colors ${
                    jiraIssueTypes.includes(t)
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>{t('import.maxTickets')}</span>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="text-xs text-gray-600">
                  <p>{t('help.maxTickets')}</p>
                </div>
              </PopoverContent>
            </Popover>
            <Input
              type="number"
              value={jiraLimit}
              onChange={(e) => setJiraLimit(Number(e.target.value))}
              className="w-20 h-8 text-sm"
              min={1}
              max={500}
            />
          </div>

          {/* Date range */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1.5">
              {t('import.completedBetween')}
              <span className="text-gray-400 font-normal ml-1">{t('import.completedBetweenHint')}</span>
            </p>
            <div className="flex items-center gap-2">
              <DatePicker
                value={resolvedFrom}
                onChange={setResolvedFrom}
                placeholder={t('common.from')}
              />
              <span className="text-gray-400 text-sm">{t('common.to')}</span>
              <DatePicker
                value={resolvedTo}
                onChange={setResolvedTo}
                placeholder={t('common.to')}
              />
            </div>
          </div>

          {fetchMsg && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              {fetchMsg}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={() => setStep('source')} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Button>
          <Button
            onClick={handleFetchFromJira}
            disabled={fetching || !selectedConnId || !jiraProject || jiraIssueTypes.length === 0}
            className="flex-1 gap-2 h-11"
          >
            {fetching ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {t('import.importing')}</>
            ) : (
              <>{t('import.fetchFromJira')} <ArrowRight className="w-4 h-4" /></>
            )}
          </Button>
        </div>

        <ConnectionDialog
          open={addConnOpen}
          onClose={() => setAddConnOpen(false)}
          onSaved={(conn) => {
            setConnections((prev) => {
              const idx = prev.findIndex((c) => c.id === conn.id)
              if (idx >= 0) { const n = [...prev]; n[idx] = conn; return n }
              return [...prev, conn]
            })
            setSelectedConnId(conn.id)
            setAddConnOpen(false)
          }}
        />
      </div>
    )
  }

  // ── Step: Upload ─────────────────────────────────────────────────────────
  if (step === 'upload') {
    return (
      <div className="max-w-lg">
        <StepHeader current={2} total={3} />
        <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('import.uploadYourExport')}</h2>
          <p className="text-sm text-gray-400 mt-1">
            {t('import.uploadYourExportHint')}
          </p>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          className={`cursor-pointer rounded-xl border-2 border-dashed transition-colors ${
            dragging ? 'border-blue-400 bg-blue-50'
            : preview ? 'border-emerald-300 bg-emerald-50'
            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
          }`}
        >
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            {preview ? (
              <>
                <CheckCircle2 className="w-9 h-9 text-emerald-500 mb-3" />
                <p className="text-sm font-semibold text-emerald-700">{preview.raw?.name}</p>
                <p className="text-xs text-emerald-600 mt-0.5">{t('import.clickToChange')}</p>
              </>
            ) : (
              <>
                <UploadCloud className={`w-9 h-9 mb-3 ${dragging ? 'text-blue-500' : 'text-gray-400'}`} />
                <p className="text-sm font-semibold text-gray-700">{t('import.dropJsonFile')}</p>
                <p className="text-xs text-gray-400 mt-1">{t('import.orClickToBrowse')}</p>
              </>
            )}
          </div>
        </div>
        <input ref={fileInputRef} type="file" accept=".json" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

        {preview && (
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <FileJson className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-blue-800">{preview.project_key}</p>
                <p className="text-xs text-blue-600 mt-0.5">{preview.ticket_count} tickets</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {preview.statuses.map((s) => (
                    <span key={s} className="text-[11px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={() => setStep('source')} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> {t('common.back')}
          </Button>
          <Button
            onClick={() => goToConfigure()}
            disabled={!preview}
            className="flex-1 gap-2 h-11"
          >
            {t('import.nextConfigure')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  // ── Step: Configure ──────────────────────────────────────────────────────
  return (
    <div className="max-w-lg">
      <StepHeader current={3} total={3} />
      <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('import.configureMetrics')}</h2>
        <p className="text-sm text-gray-400 mt-1">
          {t('import.configureMetricsHint')}
        </p>
      </div>

      {/* Dataset name */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('import.datasetName')}
          <span className="text-gray-400 font-normal ml-1">{t('import.datasetNameHint')}</span>
        </label>
        <Input
          value={datasetName}
          onChange={(e) => setDatasetName(e.target.value)}
          placeholder={preview?.project_key ?? t('import.datasetNamePlaceholder')}
        />
      </div>

      {/* Config mode toggle */}
      {configs.length > 0 && (
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 mb-5">
          {(['existing', 'new'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setConfigMode(mode)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                configMode === mode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {mode === 'existing' ? t('import.useExistingConfig') : t('import.createNewConfig')}
            </button>
          ))}
        </div>
      )}

      {/* Existing config */}
      {configMode === 'existing' && configs.length > 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('import.configuration')}</label>
            <Select value={selectedConfigId} onValueChange={setSelectedConfigId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('import.select')} />
              </SelectTrigger>
              <SelectContent>
                {configs.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} — {c.cycle_time_start_status} → {c.cycle_time_end_status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedConfigId && (() => {
            const cfg = configs.find((c) => c.id === selectedConfigId)
            if (!cfg) return null
            return (
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs text-gray-500 space-y-1">
                <p><span className="font-medium text-gray-700">{t('metrics.cycleTime')}:</span> {cfg.cycle_time_start_status} → {cfg.cycle_time_end_status}</p>
                {cfg.lead_time_start_status && <p><span className="font-medium text-gray-700">{t('metrics.leadTime')}:</span> {cfg.lead_time_start_status}</p>}
                <div className="flex flex-wrap gap-1 pt-1">
                  {cfg.status_order.map((s) => (
                    <span key={s} className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-600">{s}</span>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* New config */}
      {configMode === 'new' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('import.configName')}</label>
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t('import.configNamePlaceholder')} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('import.statuses')}
              <span className="text-gray-400 font-normal ml-1">{t('import.statusesHint')}</span>
            </label>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={statusOrder} strategy={verticalListSortingStrategy}>
                <div className="space-y-1.5 mb-2">
                  {statusOrder.map((s) => (
                    <SortableStatus key={s} id={s}
                      onRemove={() => setStatusOrder((p) => p.filter((x) => x !== s))} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <div className="flex gap-2">
              <Input value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
                placeholder={t('import.addStatusPlaceholder')}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStatus())} />
              <Button type="button" variant="outline" onClick={addStatus} className="shrink-0 gap-1.5">
                <Plus className="w-3.5 h-3.5" /> {t('common.add')}
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-gray-700">{t('metrics.cycleTime')}</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="text-xs text-gray-600">
                    <p>{t('help.cycleTimeConfig')}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('import.startStatus')}</label>
                <Select value={cycleStart} onValueChange={setCycleStart}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('import.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('import.endStatus')}</label>
                <Select value={cycleEnd} onValueChange={setCycleEnd}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('import.select')} />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <label className="text-xs font-medium text-gray-500">{t('config.measurementMode')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-gray-300 hover:text-gray-500 transition-colors">
                      <Info className="w-3 h-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="text-xs text-gray-600 space-y-1.5">
                      <p className="font-semibold text-gray-800 mb-1">{t('config.measurementMode')}</p>
                      <p>{t('help.configMode')}</p>
                      <p className="mt-2"><span className="font-medium">First / Last:</span> {t('help.modeFirstLast')}</p>
                      <p><span className="font-medium">First / First:</span> {t('help.modeFirstFirst')}</p>
                      <p><span className="font-medium">Last / Last:</span> {t('help.modeLastLast')}</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={cycleMode} onValueChange={(v) => setCycleMode(v as typeof cycleMode)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first_last">{t('config.modeFirstLast')}</SelectItem>
                  <SelectItem value="first_first">{t('config.modeFirstFirst')}</SelectItem>
                  <SelectItem value="last_last">{t('config.modeLastLast')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <p className="text-sm font-semibold text-gray-700">{t('metrics.leadTime')}</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors">
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="text-xs text-gray-600">
                    <p>{t('help.leadTimeConfig')}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              {t('import.startStatus')} <span className="font-normal text-gray-400">{t('import.leadTimeStartHint')}</span>
            </label>
            <Select value={leadStart || '__created__'} onValueChange={(v) => setLeadStart(v === '__created__' ? '' : v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__created__">{t('import.useCreationDate')}</SelectItem>
                {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 mt-3">
              {t('import.endStatus')} <span className="font-normal text-gray-400">{t('import.leadTimeEndHint')}</span>
            </label>
            <Select value={leadEnd || '__cycle_end__'} onValueChange={(v) => setLeadEnd(v === '__cycle_end__' ? '' : v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__cycle_end__">{t('import.sameAsCycleEnd')}</SelectItem>
                {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <Button variant="outline" onClick={() => setStep(sourceMode === 'jira' ? 'jira' : 'upload')} className="gap-1.5">
          <ArrowLeft className="w-4 h-4" /> {t('common.back')}
        </Button>
        <Button
          onClick={handleImport}
          disabled={importing || (configMode === 'existing' && !selectedConfigId)}
          className="flex-1 gap-2 h-11"
        >
          {importing ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> {t('import.importing')}</>
          ) : (
            <><CheckCircle2 className="w-4 h-4" /> {t('import.importTickets', { count: preview?.ticket_count })}</>
          )}
        </Button>
      </div>
    </div>
  )
}

function StepHeader({ current, total }: { current: number; total: number }) {
  const { t } = useTranslation()
  const labels = total === 3 ? [t('import.stepSource'), t('import.stepUpload'), t('import.stepConfigure')] : [t('import.stepUploadFile'), t('import.stepConfigure'), t('import.stepDone')]
  return (
    <div className="flex items-center gap-2 mb-8">
      {labels.map((label, i) => {
        const n = i + 1
        const done = n < current
        const active = n === current
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 ${active ? 'text-blue-600' : done ? 'text-gray-400' : 'text-gray-300'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                active ? 'border-blue-600 bg-blue-600 text-white'
                : done ? 'border-gray-300 bg-gray-100 text-gray-400'
                : 'border-gray-200 text-gray-300'
              }`}>
                {done ? '✓' : n}
              </div>
              <span className={`text-sm font-medium ${active ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
            </div>
            {i < labels.length - 1 && <div className="w-8 h-px bg-gray-200" />}
          </div>
        )
      })}
    </div>
  )
}
