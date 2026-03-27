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
import { GripVertical, X, Plus, ArrowLeft } from 'lucide-react'
import { api } from '@/services/api'
import type { ProjectConfig, ImportSession } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

function SortableStatus({
  id,
  highlight,
  onRemove,
}: {
  id: string
  highlight?: 'start' | 'end' | 'lead'
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  const colors = {
    start: 'border-blue-300 bg-blue-50 text-blue-800',
    end: 'border-emerald-300 bg-emerald-50 text-emerald-800',
    lead: 'border-violet-300 bg-violet-50 text-violet-800',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-shadow ${
        isDragging ? 'shadow-md z-10 relative' : ''
      } ${highlight ? colors[highlight] : 'border-gray-200 bg-white text-gray-700'}`}
    >
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-300 hover:text-gray-500 shrink-0"
      >
        <GripVertical className="w-4 h-4" />
      </span>
      <span className="flex-1 font-medium">{id}</span>
      {highlight && (
        <span className="text-[10px] font-semibold uppercase tracking-wide opacity-60">
          {highlight === 'start' ? 'cycle start' : highlight === 'end' ? 'cycle end' : 'lead start'}
        </span>
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
      alert(e instanceof Error ? e.message : 'Error loading statuses')
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

  function getHighlight(s: string): 'start' | 'end' | 'lead' | undefined {
    if (s === cycleStart) return 'start'
    if (s === cycleEnd) return 'end'
    if (s === leadStart) return 'lead'
    return undefined
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

  return (
    <div className="max-w-lg">
      <button
        onClick={() => navigate('/settings')}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Settings
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {isEdit ? t('settings.editConfig') : t('settings.newConfig')}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Define how cycle time and lead time are measured
        </p>
      </div>

      {/* Load from import */}
      {!isEdit && imports.length > 0 && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Wand2 className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-semibold text-blue-800">Load statuses from import</p>
          </div>
          <p className="text-xs text-blue-600 mb-3">
            Select an existing dataset to automatically detect all status values.
          </p>
          <div className="flex gap-2">
            <Select onValueChange={loadFromImport} disabled={loadingStatuses}>
              <SelectTrigger className="flex-1 border-blue-200 focus:ring-blue-500">
                <SelectValue placeholder="— select import —" />
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
              ✓ {statusOrder.length} statuses loaded — now select cycle time start and end below.
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Product Team"
            required
          />
        </div>

        {/* Base URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Jira Base URL
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <Input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://yourcompany.atlassian.net"
          />
        </div>

        {/* Status order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Status Order
            <span className="text-gray-400 font-normal ml-1">— drag to reorder</span>
          </label>

          {statusOrder.length > 0 && (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={statusOrder} strategy={verticalListSortingStrategy}>
                <div className="space-y-1.5 mb-2">
                  {statusOrder.map((s) => (
                    <SortableStatus
                      key={s}
                      id={s}
                      highlight={getHighlight(s)}
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
          <p className="text-sm font-semibold text-gray-700">Cycle Time</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Start Status</label>
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
              <label className="block text-xs font-medium text-gray-500 mb-1.5">End Status</label>
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
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Measurement Mode</label>
            <Select value={cycleMode} onValueChange={(v) => setCycleMode(v as typeof cycleMode)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first_last">First in / Last out — recommended</SelectItem>
                <SelectItem value="first_first">First in / First out — time to first done</SelectItem>
                <SelectItem value="last_last">Last in / Last out — last active period only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lead time */}
        <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
          <p className="text-sm font-semibold text-gray-700 mb-3">Lead Time</p>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Start Status
              <span className="text-gray-400 font-normal ml-1">— leave empty to use ticket creation date</span>
            </label>
            <Select value={leadStart || '__created__'} onValueChange={(v) => setLeadStart(v === '__created__' ? '' : v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__created__">Use ticket creation date</SelectItem>
                {statusOrder.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {formError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {formError}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <Button type="submit" disabled={saving || loading} className="gap-1.5">
            {saving ? 'Saving…' : loading ? 'Loading…' : 'Save Configuration'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/settings')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
