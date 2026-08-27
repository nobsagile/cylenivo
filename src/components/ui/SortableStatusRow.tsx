import { useTranslation } from 'react-i18next'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, X } from 'lucide-react'

/**
 * One draggable status in a status-order list.
 *
 * Extracted from ConfigureStep and ImportPage, which held byte-identical
 * copies. ConfigFormPage has a richer variant (cycle/lead badges, active-status
 * colours) and still keeps its own.
 *
 * Both controls carry an aria-label: they contain nothing but an aria-hidden
 * icon, so without one a screen reader announces "button, sortable" and
 * "button" with no indication of which status they belong to.
 */
export function SortableStatusRow({ id, onRemove }: { id: string; onRemove: () => void }) {
  const { t } = useTranslation()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-white ${isDragging ? 'shadow-md border-blue-300' : 'border-gray-200'}`}
    >
      <span
        {...attributes}
        {...listeners}
        aria-label={t('common.reorderItem', { name: id })}
        className="cursor-grab text-gray-300 hover:text-gray-500"
      >
        <GripVertical className="w-4 h-4" />
      </span>
      <span className="flex-1 text-gray-700">{id}</span>
      <button
        onClick={onRemove}
        aria-label={t('common.removeItem', { name: id })}
        className="text-gray-300 hover:text-red-400"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
