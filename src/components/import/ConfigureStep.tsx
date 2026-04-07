import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Plus, GripVertical, X, Loader2, CheckCircle2, Info,
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
import type { ProjectConfig } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

interface ConfigureStepProps {
  projectKey: string
  ticketCount: number
  statuses: string[]
  /** Called with the configId and dataset name after user confirms. Caller handles the actual import. */
  onComplete: (configId: string, datasetName: string) => Promise<void>
  onCancel?: () => void
  /** If true, renders inside a dialog (no back button, compact layout) */
  compact?: boolean
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

export default function ConfigureStep({ projectKey, ticketCount, statuses, onComplete, onCancel, compact }: ConfigureStepProps) {
  const { t } = useTranslation()

  const [configs, setConfigs] = useState<ProjectConfig[]>([])
  const [configsLoaded, setConfigsLoaded] = useState(false)
  const [configMode, setConfigMode] = useState<'existing' | 'new'>('new')
  const [selectedConfigId, setSelectedConfigId] = useState('')
  const [datasetName, setDatasetName] = useState('')
  const [newName, setNewName] = useState(`${projectKey} Config`)
  const [statusOrder, setStatusOrder] = useState<string[]>(statuses)
  const [newStatus, setNewStatus] = useState('')
  const [cycleStart, setCycleStart] = useState('')
  const [cycleEnd, setCycleEnd] = useState('')
  const [cycleMode, setCycleMode] = useState<'first_last' | 'first_first' | 'last_last'>('first_last')
  const [leadStart, setLeadStart] = useState('')
  const [leadEnd, setLeadEnd] = useState('')
  const [activeStatuses, setActiveStatuses] = useState<string[]>([])
  const [importing, setImporting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // Load configs on mount
  if (!configsLoaded) {
    setConfigsLoaded(true)
    api.configs.list().then((cfgs) => {
      setConfigs(cfgs)
      if (cfgs.length > 0) {
        setConfigMode('existing')
        setSelectedConfigId(cfgs[0].id)
      }
    }).catch(() => {})
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

  async function handleSubmit() {
    setImporting(true)
    setErrorMsg(null)
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
          active_statuses: activeStatuses.length > 0 ? activeStatuses : undefined,
        })
        configId = newConfig.id
      }

      await onComplete(configId, datasetName || projectKey)
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Error')
      setImporting(false)
    }
  }

  return (
    <div className={compact ? '' : 'max-w-lg'}>
      {!compact && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('import.configureMetrics')}</h2>
          <p className="text-sm text-gray-400 mt-1">{t('import.configureMetricsHint')}</p>
        </div>
      )}
      <ErrorBanner message={errorMsg} onDismiss={() => setErrorMsg(null)} />

      {/* Dataset name */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('import.datasetName')}
          <span className="text-gray-400 font-normal ml-1">{t('import.datasetNameHint')}</span>
        </label>
        <Input
          value={datasetName}
          onChange={(e) => setDatasetName(e.target.value)}
          placeholder={projectKey}
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
                  <div className="text-xs text-gray-600"><p>{t('help.cycleTimeConfig')}</p></div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('import.startStatus')}</label>
                <Select value={cycleStart} onValueChange={setCycleStart}>
                  <SelectTrigger className="w-full"><SelectValue placeholder={t('import.select')} /></SelectTrigger>
                  <SelectContent>
                    {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('import.endStatus')}</label>
                <Select value={cycleEnd} onValueChange={setCycleEnd}>
                  <SelectTrigger className="w-full"><SelectValue placeholder={t('import.select')} /></SelectTrigger>
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
                    <button className="text-gray-300 hover:text-gray-500 transition-colors"><Info className="w-3 h-3" /></button>
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
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="first_last">{t('config.modeFirstLast')}</SelectItem>
                  <SelectItem value="first_first">{t('config.modeFirstFirst')}</SelectItem>
                  <SelectItem value="last_last">{t('config.modeLastLast')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active work statuses */}
          {(() => {
            const startIdx = cycleStart ? statusOrder.indexOf(cycleStart) : -1
            const endIdx = cycleEnd ? statusOrder.indexOf(cycleEnd) : -1
            const cycleWindowStatuses = startIdx !== -1 && endIdx !== -1 && startIdx <= endIdx
              ? statusOrder.slice(startIdx, endIdx + 1)
              : []
            if (!cycleWindowStatuses.length) return null
            return (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <p className="text-sm font-semibold text-gray-700">{t('config.activeStatuses')}</p>
                  <span className="text-xs text-gray-400">{t('config.activeStatusesHint')}</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-300 hover:text-gray-500 transition-colors"><Info className="w-3.5 h-3.5" /></button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="text-xs text-gray-600"><p>{t('help.activeStatuses')}</p></div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cycleWindowStatuses.map((s) => {
                    const checked = activeStatuses.includes(s)
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setActiveStatuses((prev) =>
                          checked ? prev.filter((x) => x !== s) : [...prev, s]
                        )}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-colors ${
                          checked
                            ? 'border-teal-400 bg-teal-50 text-teal-700'
                            : 'border-gray-200 bg-white text-gray-500 hover:border-teal-300 hover:text-teal-600'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 ${checked ? 'bg-teal-500 border-teal-500' : 'border-gray-300'}`}>
                          {checked && <span className="text-white text-[8px] font-bold">✓</span>}
                        </span>
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })()}

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <p className="text-sm font-semibold text-gray-700">{t('metrics.leadTime')}</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-300 hover:text-gray-500 transition-colors"><Info className="w-3.5 h-3.5" /></button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="text-xs text-gray-600"><p>{t('help.leadTimeConfig')}</p></div>
                </PopoverContent>
              </Popover>
            </div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              {t('import.startStatus')} <span className="font-normal text-gray-400">{t('import.leadTimeStartHint')}</span>
            </label>
            <Select value={leadStart || '__created__'} onValueChange={(v) => setLeadStart(v === '__created__' ? '' : v)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="__created__">{t('import.useCreationDate')}</SelectItem>
                {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 mt-3">
              {t('import.endStatus')} <span className="font-normal text-gray-400">{t('import.leadTimeEndHint')}</span>
            </label>
            <Select value={leadEnd || '__cycle_end__'} onValueChange={(v) => setLeadEnd(v === '__cycle_end__' ? '' : v)}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="__cycle_end__">{t('import.sameAsCycleEnd')}</SelectItem>
                {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="gap-1.5">
            {t('common.back')}
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={importing || (configMode === 'existing' && !selectedConfigId)}
          className="flex-1 gap-2 h-11"
        >
          {importing ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> {t('import.importing')}</>
          ) : (
            <><CheckCircle2 className="w-4 h-4" /> {t('import.importTickets', { count: ticketCount })}</>
          )}
        </Button>
      </div>
    </div>
  )
}
