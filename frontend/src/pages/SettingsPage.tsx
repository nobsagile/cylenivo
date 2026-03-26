import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Pencil, Trash2, ArrowRight, Settings2,
  Database, FileJson, Calendar, Ticket,
} from 'lucide-react'
import { api } from '@/services/api'
import type { ProjectConfig, ImportSession } from '@/types'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [configs, setConfigs] = useState<ProjectConfig[]>([])
  const [imports, setImports] = useState<ImportSession[]>([])

  useEffect(() => {
    api.configs.list().then(setConfigs).catch(console.error)
    api.imports.list().then(setImports).catch(console.error)
  }, [])

  async function handleDeleteConfig(id: string) {
    if (!window.confirm(t('settings.confirmDelete'))) return
    try {
      await api.configs.delete(id)
      setConfigs((prev) => prev.filter((c) => c.id !== id))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error')
    }
  }

  async function handleDeleteImport(id: string) {
    if (!window.confirm('Delete this dataset? This cannot be undone.')) return
    try {
      await api.imports.delete(id)
      setImports((prev) => prev.filter((i) => i.id !== id))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error')
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('settings.title')}</h2>
        <p className="text-sm text-gray-400 mt-1">Manage configurations and imported datasets</p>
      </div>

      <Tabs defaultValue="configs">
        <TabsList className="bg-gray-100 p-1 h-auto mb-6">
          <TabsTrigger value="configs" className="text-sm px-4 py-1.5 gap-1.5">
            <Settings2 className="w-3.5 h-3.5" />
            Configurations
            {configs.length > 0 && (
              <span className="ml-1 text-[11px] bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5 font-semibold">
                {configs.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="datasets" className="text-sm px-4 py-1.5 gap-1.5">
            <Database className="w-3.5 h-3.5" />
            Datasets
            {imports.length > 0 && (
              <span className="ml-1 text-[11px] bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5 font-semibold">
                {imports.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Configurations */}
        <TabsContent value="configs">
          <div className="flex justify-end mb-4">
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
                    {config.status_order?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {config.status_order.map((s) => (
                          <span
                            key={s}
                            className={`text-[11px] px-1.5 py-0.5 rounded border font-medium ${
                              s === config.cycle_time_start_status
                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                : s === config.cycle_time_end_status
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-gray-50 border-gray-200 text-gray-500'
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/settings/configs/${config.id}`)}
                      className="gap-1.5 h-8"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteConfig(config.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Datasets */}
        <TabsContent value="datasets">
          <div className="flex justify-end mb-4">
            <Button onClick={() => navigate('/import')} variant="outline" className="gap-1.5">
              <Plus className="w-4 h-4" />
              New Import
            </Button>
          </div>

          {imports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
              <div className="p-3 rounded-xl bg-gray-100 mb-3">
                <Database className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">No datasets imported yet</p>
              <p className="text-gray-400 text-sm mt-1">Upload a Jira export to get started</p>
              <Button
                onClick={() => navigate('/import')}
                variant="outline"
                className="mt-4 gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Import data
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {imports.map((imp) => (
                <div
                  key={imp.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 shrink-0">
                    <FileJson className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{imp.project_key}</p>
                      {imp.config_name && (
                        <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                          {imp.config_name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Ticket className="w-3 h-3" />
                        {imp.ticket_count} tickets
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(imp.imported_at).toLocaleString('de-DE')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/projects/${imp.id}`)}
                      className="h-8 text-xs"
                    >
                      Open
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteImport(imp.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
