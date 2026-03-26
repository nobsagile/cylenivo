import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
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
import { api } from '@/services/api'
import type { ProjectConfig } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function SortableStatus({ id, onRemove }: { id: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-2 text-sm"
    >
      <span {...attributes} {...listeners} className="cursor-grab text-gray-400">⠿</span>
      <span className="flex-1">{id}</span>
      <button onClick={onRemove} className="text-gray-400 hover:text-red-500">✕</button>
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
  const [leadStart, setLeadStart] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (configId) {
      api.configs.get(configId).then((c: ProjectConfig) => {
        setName(c.name)
        setBaseUrl(c.base_url ?? '')
        setStatusOrder(c.status_order)
        setCycleStart(c.cycle_time_start_status)
        setCycleEnd(c.cycle_time_end_status)
        setLeadStart(c.lead_time_start_status ?? '')
      })
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

  function addStatus() {
    const s = newStatus.trim()
    if (s && !statusOrder.includes(s)) {
      setStatusOrder((prev) => [...prev, s])
      setNewStatus('')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const body = {
      name,
      source_type: 'jira',
      base_url: baseUrl || undefined,
      status_order: statusOrder,
      cycle_time_start_status: cycleStart,
      cycle_time_end_status: cycleEnd,
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
      alert(e instanceof Error ? e.message : 'Error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEdit ? t('settings.editConfig') : t('settings.newConfig')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Base URL</label>
          <Input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://yourcompany.atlassian.net"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status Order</label>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={statusOrder} strategy={verticalListSortingStrategy}>
              <div className="space-y-1 mb-2">
                {statusOrder.map((s) => (
                  <SortableStatus
                    key={s}
                    id={s}
                    onRemove={() => setStatusOrder((prev) => prev.filter((x) => x !== s))}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <div className="flex gap-2">
            <Input
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Add status…"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStatus())}
            />
            <Button type="button" variant="outline" onClick={addStatus}>Add</Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cycle Time Start Status
          </label>
          <select
            value={cycleStart}
            onChange={(e) => setCycleStart(e.target.value)}
            required
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
          >
            <option value="">— select —</option>
            {statusOrder.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cycle Time End Status
          </label>
          <select
            value={cycleEnd}
            onChange={(e) => setCycleEnd(e.target.value)}
            required
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
          >
            <option value="">— select —</option>
            {statusOrder.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lead Time Start Status (optional)
          </label>
          <select
            value={leadStart}
            onChange={(e) => setLeadStart(e.target.value)}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
          >
            <option value="">Use ticket creation date</option>
            {statusOrder.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/settings')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
