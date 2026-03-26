import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api'
import type { ProjectConfig } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">{t('settings.title')}</h2>
        <Button onClick={() => navigate('/settings/configs/new')}>
          {t('settings.newConfig')}
        </Button>
      </div>

      <div className="space-y-4">
        {configs.map((config) => (
          <Card key={config.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                {config.name}
                <Badge variant="secondary">{config.source_type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Cycle time: <strong>{config.cycle_time_start_status}</strong> →{' '}
                <strong>{config.cycle_time_end_status}</strong>
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/settings/configs/${config.id}`)}
                >
                  {t('settings.editConfig')}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(config.id)}
                >
                  {t('settings.deleteConfig')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {configs.length === 0 && (
          <p className="text-gray-500 text-sm">No configurations yet.</p>
        )}
      </div>
    </div>
  )
}
