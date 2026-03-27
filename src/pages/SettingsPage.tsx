import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Pencil, Trash2, ArrowRight, Settings2,
  Database, FileJson, Calendar, Ticket, Link2, CheckCircle2, XCircle, Loader2, ArrowRight as ArrowRightIcon,
  X,
} from 'lucide-react'
import { api } from '@/services/api'
import type { ProjectConfig, ImportSession, SourceConnection } from '@/types'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ConnectionDialog from '@/components/connections/ConnectionDialog'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

interface PendingDelete {
  type: 'config' | 'import' | 'connection'
  id: string
  label: string
}

export default function SettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [configs, setConfigs] = useState<ProjectConfig[]>([])
  const [imports, setImports] = useState<ImportSession[]>([])
  const [connections, setConnections] = useState<SourceConnection[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editConn, setEditConn] = useState<SourceConnection | null>(null)
  const [testingId, setTestingId] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<Record<string, 'ok' | 'error'>>({})
  const [activeTab, setActiveTab] = useState('configs')
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [errorMsg, setErrorMsg] = useState<{ title: string; description: string; action?: string } | null>(null)
  const [showConnBanner, setShowConnBanner] = useState(false)

  useEffect(() => {
    api.configs.list().then(setConfigs).catch(console.error)
    api.imports.list().then(setImports).catch(console.error)
    api.connections.list().then(setConnections).catch(console.error)
  }, [])

  async function handleDeleteConfig(id: string, name: string) {
    setPendingDelete({ type: 'config', id, label: name })
  }

  async function handleDeleteImport(id: string, label: string) {
    setPendingDelete({ type: 'import', id, label })
  }

  async function handleDeleteConnection(id: string, name: string) {
    setPendingDelete({ type: 'connection', id, label: name })
  }

  async function executeDelete() {
    if (!pendingDelete) return
    const { type, id } = pendingDelete
    setPendingDelete(null)
    try {
      if (type === 'config') {
        await api.configs.delete(id)
        setConfigs((prev) => prev.filter((c) => c.id !== id))
      } else if (type === 'import') {
        await api.imports.delete(id)
        setImports((prev) => prev.filter((i) => i.id !== id))
      } else {
        await api.connections.delete(id)
        setConnections((prev) => prev.filter((c) => c.id !== id))
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error'
      if (type === 'config' && msg.toLowerCase().includes('associated imports')) {
        setErrorMsg({
          title: 'Configuration is in use',
          description: 'This configuration is used by one or more datasets. Delete those datasets first, then try again.',
          action: 'datasets',
        })
      } else {
        setErrorMsg({ title: 'Could not delete', description: msg })
      }
    }
  }

  async function handleTestConnection(id: string) {
    setTestingId(id)
    try {
      await api.connections.test(id)
      setTestResults((prev) => ({ ...prev, [id]: 'ok' }))
    } catch {
      setTestResults((prev) => ({ ...prev, [id]: 'error' }))
    } finally {
      setTestingId(null)
    }
  }

  function handleSaved(conn: SourceConnection) {
    const isNew = !connections.find((c) => c.id === conn.id)
    setConnections((prev) => {
      const idx = prev.findIndex((c) => c.id === conn.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = conn
        return next
      }
      return [...prev, conn]
    })
    if (isNew && connections.length === 0) {
      setShowConnBanner(true)
    }
  }

  const confirmMeta: Record<PendingDelete['type'], { title: string; description: string; label: string }> = {
    config: {
      title: 'Delete configuration?',
      description: 'This cannot be undone. Existing datasets using this configuration will not be affected.',
      label: 'Delete',
    },
    import: {
      title: 'Delete dataset?',
      description: 'All imported tickets and metrics for this dataset will be permanently deleted.',
      label: 'Delete',
    },
    connection: {
      title: 'Delete connection?',
      description: 'Stored credentials will be removed. Existing datasets will not be affected.',
      label: 'Delete',
    },
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('settings.title')}</h2>
        <p className="text-sm text-gray-400 mt-1">Manage your connections, configurations and datasets</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
          <TabsTrigger value="connections" className="text-sm px-4 py-1.5 gap-1.5">
            <Link2 className="w-3.5 h-3.5" />
            Connections
            {connections.length > 0 && (
              <span className="ml-1 text-[11px] bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5 font-semibold">
                {connections.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Configurations */}
        <TabsContent value="configs">
          <p className="text-xs text-gray-400 mb-5">
            Measurement rules — define which statuses mark cycle time start and end.
            One configuration can be reused for multiple datasets of the same team.
          </p>
          {configs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
              <div className="p-3 rounded-xl bg-gray-100 mb-3">
                <Settings2 className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">No configurations yet</p>
              <p className="text-gray-400 text-sm mt-1 max-w-xs">
                A configuration is created automatically when you import your first dataset.
              </p>
              <Button onClick={() => navigate('/import')} variant="outline" className="mt-4 gap-1.5">
                <Plus className="w-4 h-4" />
                Import data
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
                      onClick={() => handleDeleteConfig(config.id, config.name)}
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
          <p className="text-xs text-gray-400 mb-5">
            Imported ticket snapshots — each dataset uses one configuration to calculate metrics.
            Import the same project again over time to track trends.
          </p>
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
              <p className="text-gray-400 text-sm mt-1">Connect to Jira or upload an export to get started</p>
              <Button onClick={() => navigate('/import')} variant="outline" className="mt-4 gap-1.5">
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
                      onClick={() => handleDeleteImport(imp.id, `${imp.project_key} · ${new Date(imp.imported_at).toLocaleDateString('de-DE')}`)}
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

        {/* Connections */}
        <TabsContent value="connections">
          <p className="text-xs text-gray-400 mb-4">
            Stored Jira credentials — saved once, reused for all imports. The API token is never sent to the browser after saving.
          </p>

          {/* Post-save banner */}
          {showConnBanner && (
            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 mb-5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex-1 text-sm text-emerald-800">
                <span className="font-semibold">Connection added!</span>
                {' '}Now go to Import to fetch your first dataset.
              </div>
              <Button
                size="sm"
                onClick={() => navigate('/import')}
                className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white h-8 shrink-0"
              >
                Import data
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Button>
              <button
                onClick={() => setShowConnBanner(false)}
                className="text-emerald-500 hover:text-emerald-700 shrink-0 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex justify-end mb-4">
            <Button
              onClick={() => { setEditConn(null); setDialogOpen(true) }}
              variant="outline"
              className="gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Connection
            </Button>
          </div>

          {connections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
              <div className="p-3 rounded-xl bg-gray-100 mb-3">
                <Link2 className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">No connections yet</p>
              <p className="text-gray-400 text-sm mt-1 max-w-xs">
                Add your Jira credentials once — then fetch tickets directly from the Import wizard.
              </p>
              <Button
                onClick={() => { setEditConn(null); setDialogOpen(true) }}
                variant="outline"
                className="mt-4 gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Connection
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {connections.map((conn) => (
                <div
                  key={conn.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 shrink-0">
                    <Link2 className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{conn.name}</p>
                      <span className="text-[11px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-blue-100 text-blue-600">
                        {conn.source_type}
                      </span>
                      {testResults[conn.id] === 'ok' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                      {testResults[conn.id] === 'error' && (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{conn.base_url} · {conn.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestConnection(conn.id)}
                      disabled={testingId === conn.id}
                      className="h-8 text-xs gap-1"
                    >
                      {testingId === conn.id && <Loader2 className="w-3 h-3 animate-spin" />}
                      Test
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { setEditConn(conn); setDialogOpen(true) }}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteConnection(conn.id, conn.name)}
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

      <ConnectionDialog
        open={dialogOpen}
        connection={editConn}
        onClose={() => setDialogOpen(false)}
        onSaved={(conn) => {
          handleSaved(conn)
          setDialogOpen(false)
        }}
      />

      {pendingDelete && (
        <ConfirmDialog
          open
          title={confirmMeta[pendingDelete.type].title}
          description={confirmMeta[pendingDelete.type].description}
          confirmLabel={confirmMeta[pendingDelete.type].label}
          onConfirm={executeDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      {errorMsg && (
        <ConfirmDialog
          open
          title={errorMsg.title}
          description={errorMsg.description}
          cancelLabel="Close"
          confirmLabel={errorMsg.action === 'datasets' ? 'Go to Datasets' : undefined}
          destructive={false}
          onConfirm={errorMsg.action === 'datasets' ? () => { setErrorMsg(null); setActiveTab('datasets') } : undefined}
          onCancel={() => setErrorMsg(null)}
        />
      )}
    </div>
  )
}
