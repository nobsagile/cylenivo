import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Ticket, Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { api } from '@/services/api'
import type { ImportSession, ProjectConfig } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

export default function DatasetEditPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { datasetId } = useParams<{ datasetId: string }>()

  const [imp, setImp] = useState<ImportSession | null>(null)
  const [configs, setConfigs] = useState<ProjectConfig[]>([])
  const [name, setName] = useState('')
  const [configId, setConfigId] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.imports.get(datasetId!),
      api.configs.list(),
    ]).then(([session, cfgs]) => {
      setImp(session)
      setName(session.name ?? session.project_key)
      setConfigId(session.config_id)
      setConfigs(cfgs)
    }).finally(() => setLoading(false))
  }, [datasetId])

  async function handleSave() {
    if (!datasetId) return
    setSaving(true)
    setError(null)
    try {
      await api.imports.update(datasetId, { name, config_id: configId })
      navigate('/settings', { state: { section: 'datasets' } })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error saving dataset')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-lg">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => navigate('/settings', { state: { section: 'datasets' } })}
          className="gap-1.5 text-gray-500 mb-6 -ml-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t('dataset.backToSettings')}
        </Button>
        <div className="text-sm text-gray-400">{t('common.loading')}</div>
      </div>
    )
  }

  if (!imp) return null

  return (
    <div className="max-w-lg">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => navigate('/settings', { state: { section: 'datasets' } })}
        className="gap-1.5 text-gray-500 mb-6 -ml-2"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t('dataset.backToSettings')}
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('dataset.editTitle')}</h2>
        <p className="text-sm text-gray-400 mt-1">{t('dataset.editDesc')}</p>
      </div>

      <div className="space-y-5">
        {/* Project key — read-only, defines what this dataset is */}
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-xs font-semibold text-gray-600">{t('dataset.project')}</span>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <p className="text-xs text-gray-600">{t('dataset.projectHint')}</p>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50">
            <span className="font-mono font-semibold text-gray-700 text-sm">{imp.project_key}</span>
            <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
              <Ticket className="w-3 h-3" />
              {imp.ticket_count} tickets
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {new Date(imp.imported_at).toLocaleDateString('de-DE')}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-xs font-semibold text-gray-600">{t('dataset.name')}</span>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <p className="text-xs text-gray-600">{t('help.datasetName')}</p>
              </PopoverContent>
            </Popover>
          </div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={imp.project_key}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <p className="text-[11px] text-gray-400 mt-1">{t('dataset.nameHint')}</p>
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-xs font-semibold text-gray-600">{t('dataset.config')}</span>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <p className="text-xs text-gray-600">{t('help.datasetConfig')}</p>
              </PopoverContent>
            </Popover>
          </div>
          <Select value={configId} onValueChange={setConfigId}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {configs.map((cfg) => (
                <SelectItem key={cfg.id} value={cfg.id}>
                  {cfg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-gray-400 mt-1">{t('dataset.configHint')}</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? t('common.saving') : t('common.save')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/settings', { state: { section: 'datasets' } })}
          >
            {t('common.cancel')}
          </Button>
        </div>
      </div>
    </div>
  )
}
