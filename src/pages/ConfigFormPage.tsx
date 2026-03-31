import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Wand2 } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, X, Plus, ArrowLeft, Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { api } from '@/services/api'
import type { ProjectConfig, ImportSession } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

function SortableStatus({
  id,
  isCycleStart,
  isCycleEnd,
  isLeadStart,
  isLeadEnd,
  onRemove,
}: {
  id: string
  isCycleStart?: boolean
  isCycleEnd?: boolean
  isLeadStart?: boolean
  isLeadEnd?: boolean
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  const hasCycle = isCycleStart || isCycleEnd
  const hasLead = isLeadStart || isLeadEnd

  const rowColor = hasCycle && hasLead
    ? 'border-indigo-300 bg-indigo-50 text-indigo-900'
    : hasCycle
    ? 'border-blue-300 bg-blue-50 text-blue-800'
    : hasLead
    ? 'border-violet-300 bg-violet-50 text-violet-800'
    : 'border-gray-200 bg-white text-gray-700'

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-shadow ${
        isDragging ? 'shadow-md z-10 relative' : ''
      } ${rowColor}`}
    >
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-300 hover:text-gray-500 shrink-0"
      >
        <GripVertical className="w-4 h-4" />
      </span>
      <span className="flex-1 font-medium">{id}</span>
      {isCycleStart && (
        <span className="text-[10px] font-semibold uppercase tracking-wide text-blue-600 opacity-70">cycle start</span>
      )}
      {isCycleEnd && (
        <span className="text-[10px] font-semibold uppercase tracking-wide text-blue-600 opacity-70">cycle end</span>
      )}
      {isLeadStart && (
        <span className="text-[10px] font-semibold uppercase tracking-wide text-violet-600 opacity-70">lead start</span>
      )}
      {isLeadEnd && (
        <span className="text-[10px] font-semibold uppercase tracking-wide text-violet-600 opacity-70">lead end</span>
      )}
      <button
        onClick={onRemove}
        className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

export default function ConfigFormPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { configId } = useParams<{ configId?: string }>()
  const isEdit = Boolean(configId)

  const [name, setName] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [statusOrder, setStatusOrder] = useState<string[]>([])
  const [newStatus, setNewStatus] = useState('')
  const [cycleStart, setCycleStart] = useState('')
  const [cycleEnd, setCycleEnd] = useState('')
  const [cycleMode, setCycleMode] = useState<'first_last' | 'first_first' | 'last_last'>('first_last')
  const [leadStart, setLeadStart] = useState('')
  const [leadEnd, setLeadEnd] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEdit)
  const [formError, setFormError] = useState('')
  const [imports, setImports] = useState<ImportSession[]>([])
  const [loadingStatuses, setLoadingStatuses] = useState(false)

  useEffect(() => {
    api.imports.list().then(setImports).catch(console.error)
  }, [])

  useEffect(() => {
    if (configId) {
      setLoading(true)
      api.configs.get(configId).then((c: ProjectConfig) => {
        setName(c.name)
        setBaseUrl(c.base_url ?? '')
        setStatusOrder(c.status_order)
        setCycleStart(c.cycle_time_start_status)
        setCycleEnd(c.cycle_time_end_status)
        setCycleMode(c.cycle_time_mode ?? 'first_last')
        setLeadStart(c.lead_time_start_status ?? '')
        setLeadEnd(c.lead_time_end_status ?? '')
      }).catch(console.error).finally(() => setLoading(false))
    }
  }, [configId])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setStatusOrder((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  async function loadFromImport(importId: string) {
    if (!importId) return
    setLoadingStatuses(true)
    try {
      const statuses = await api.imports.statuses(importId)
      setStatusOrder(statuses)
      setCycleStart('')
      setCycleEnd('')
      setLeadStart('')
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Error loading statuses')
    } finally {
      setLoadingStatuses(false)
    }
  }

  function addStatus() {
    const s = newStatus.trim()
    if (s && !statusOrder.includes(s)) {
      setStatusOrder((prev) => [...prev, s])
      setNewStatus('')
    }
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    if (!cycleStart) { setFormError('Please select a Cycle Time start status.'); return }
    if (!cycleEnd) { setFormError('Please select a Cycle Time end status.'); return }
    if (statusOrder.length === 0) { setFormError('Add at least one status.'); return }
    setSaving(true)
    const body = {
      name,
      source_type: 'jira',
      base_url: baseUrl || undefined,
      status_order: statusOrder,
      cycle_time_start_status: cycleStart,
      cycle_time_end_status: cycleEnd,
      cycle_time_mode: cycleMode,
      lead_time_start_status: leadStart || undefined,
      lead_time_end_status: leadEnd || undefined,
    }
    try {
      if (isEdit && configId) {
        await api.configs.update(configId, body)
      } else {
        await api.configs.create(body)
      }
      navigate('/settings')
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Error saving configuration')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-lg">
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('config.backToSettings')}
        </button>
        <div className="text-sm text-gray-400">Loading…</div>
      </div>
    )
  }

  return (
    <div className="max-w-lg">
      <button
        onClick={() => navigate('/settings')}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t('config.backToSettings')}
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {isEdit ? t('settings.editConfig') : t('settings.newConfig')}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {t('config.defineMetrics')}
        </p>
      </div>

      {/* Load from import */}
      {!isEdit && imports.length > 0 && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Wand2 className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-semibold text-blue-800">{t('config.loadFromImport')}</p>
          </div>
          <p className="text-xs text-blue-600 mb-3">
            {t('config.loadFromImportHint')}
          </p>
          <div className="flex gap-2">
            <Select onValueChange={loadFromImport} disabled={loadingStatuses}>
              <SelectTrigger className="flex-1 border-blue-200 focus:ring-blue-500">
                <SelectValue placeholder={t('config.selectImport')} />
              </SelectTrigger>
              <SelectContent>
                {imports.map((imp) => (
                  <SelectItem key={imp.id} value={imp.id}>
                    {imp.project_key} — {new Date(imp.imported_at).toLocaleDateString('de-DE')}
                    {imp.config_name ? ` (${imp.config_name})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loadingStatuses && (
              <div className="flex items-center px-3 text-sm text-blue-600">Loading…</div>
            )}
          </div>
          {statusOrder.length > 0 && (
            <p className="text-xs text-blue-600 mt-2">
              {t('config.statusesLoaded', { count: statusOrder.length })}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('config.name')}</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('config.namePlaceholder')}
            required
          />
        </div>

        {/* Base URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('config.jiraBaseUrl')}
            <span className="text-gray-400 font-normal ml-1">{t('config.optional')}</span>
          </label>
          <Input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://yourcompany.atlassian.net"
          />
        </div>

        {/* Status order */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <label className="text-sm font-medium text-gray-700">
              {t('config.statusOrder')}
              <span className="text-gray-400 font-normal ml-1">{t('config.dragToReorder')}</span>
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="text-xs text-gray-600">
                  <p>{t('help.statusOrder')}</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {statusOrder.length > 0 && (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={statusOrder} strategy={verticalListSortingStrategy}>
                <div className="space-y-1.5 mb-2">
                  {statusOrder.map((s) => (
                    <SortableStatus
                      key={s}
                      id={s}
                      isCycleStart={s === cycleStart}
                      isCycleEnd={s === cycleEnd}
                      isLeadStart={!!leadStart && s === leadStart}
                      isLeadEnd={s === (leadEnd || cycleEnd)}
                      onRemove={() => setStatusOrder((prev) => prev.filter((x) => x !== s))}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          <div className="flex gap-2 mt-2">
            <Input
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Add status…"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStatus())}
            />
            <Button type="button" variant="outline" onClick={addStatus} className="gap-1.5 shrink-0">
              <Plus className="w-3.5 h-3.5" />
              Add
            </Button>
          </div>
        </div>

        {/* Cycle time */}
        <div className="rounded-xl border border-gray-200 p-4 space-y-3 bg-gray-50">
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
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('config.startStatus')}</label>
              <Select value={cycleStart} onValueChange={setCycleStart} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="— select —" />
                </SelectTrigger>
                <SelectContent>
                  {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('config.endStatus')}</label>
              <Select value={cycleEnd} onValueChange={setCycleEnd} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="— select —" />
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

        {/* Lead time */}
        <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 space-y-3">
          <div className="flex items-center gap-1.5">
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                {t('config.startStatus')} <span className="text-gray-400 font-normal">{t('config.leadTimeStartHint')}</span>
              </label>
              <Select value={leadStart || '__created__'} onValueChange={(v) => setLeadStart(v === '__created__' ? '' : v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__created__">{t('config.useCreationDate')}</SelectItem>
                  {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                {t('config.endStatus')} <span className="text-gray-400 font-normal">{t('config.leadTimeEndHint')}</span>
              </label>
              <Select value={leadEnd || '__cycle_end__'} onValueChange={(v) => setLeadEnd(v === '__cycle_end__' ? '' : v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__cycle_end__">{t('config.sameAsCycleEnd')}</SelectItem>
                  {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {formError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {formError}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <Button type="submit" disabled={saving} className="gap-1.5">
            {saving ? t('common.saving') : t('config.saveConfig')}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/settings')}>
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </div>
  )
}
