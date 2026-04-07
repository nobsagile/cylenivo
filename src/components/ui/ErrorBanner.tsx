import { XCircle, X } from 'lucide-react'

interface Props {
  message: string | null
  onDismiss?: () => void
}

export function ErrorBanner({ message, onDismiss }: Props) {
  if (!message) return null
  return (
    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 mb-4">
      <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 text-red-300 hover:text-red-500">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
