import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, ArrowRight, Settings2 } from 'lucide-react'
import { api } from '@/services/api'
import type { ProjectConfig } from '@/types'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [configs, setConfigs] = useState<ProjectConfig[]>([])

  useEffect(() => {
    api.configs.list().then(setConfigs).catch(console.error)
  }, [])

  async function handleDelete(id: string) {
    if (!window.confirm(t('settings.confirmDelete'))) return
    try {
      await api.configs.delete(id)
      setConfigs((prev) => prev.filter((c) => c.id !== id))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error')
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('settings.title')}</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your project configurations</p>
        </div>
        <Button onClick={() => navigate('/settings/configs/new')} className="gap-1.5">
          <Plus className="w-4 h-4" />
          {t('settings.newConfig')}
        </Button>
      </div>

      {configs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <div className="p-3 rounded-xl bg-gray-100 mb-3">
            <Settings2 className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No configurations yet</p>
          <p className="text-gray-400 text-sm mt-1">Create one to start importing data</p>
          <Button
            onClick={() => navigate('/settings/configs/new')}
            variant="outline"
            className="mt-4 gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Create first config
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {configs.map((config) => (
            <div
              key={config.id}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{config.name}</p>
                  <span className="text-[11px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {config.source_type}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                  <span className="font-medium text-gray-700">{config.cycle_time_start_status}</span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="font-medium text-gray-700">{config.cycle_time_end_status}</span>
                  <span className="text-gray-400 ml-0.5">cycle time</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/settings/configs/${config.id}`)}
                  className="gap-1.5 h-8"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  {t('settings.editConfig')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(config.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:border-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
