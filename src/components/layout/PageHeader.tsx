import { useTranslation } from 'react-i18next'

interface Props {
  view: string
  name: string
  subtitle: string
  completed?: number
  total?: number
  excluded?: number
}

export function PageHeader({ view, name, subtitle, completed, total, excluded }: Props) {
  const { t } = useTranslation()
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{view} — {name}</h2>
      <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
      {completed != null && total != null && (
        <p className="text-sm text-gray-400 mt-0.5">
          {t('common.ticketsAnalyzed', { completed, total })}
          {excluded != null && excluded > 0 && (
            <span className="text-amber-600 ml-1">
              {t('common.excludedNote', { count: excluded })}
            </span>
          )}
        </p>
      )}
    </div>
  )
}
