import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ExternalLink, CheckCircle2, XCircle, Loader2, Info } from 'lucide-react'
import { api } from '@/services/api'
import type { SourceConnection, PluginManifest, PluginField } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface Props {
  open: boolean
  manifest: PluginManifest
  connection?: SourceConnection | null
  onClose: () => void
  onSaved: (conn: SourceConnection) => void
}

type TestState = 'idle' | 'loading' | 'ok' | 'error'

function initialCredentials(manifest: PluginManifest, connection?: SourceConnection | null): Record<string, string> {
  const existing: Record<string, string> = {}
  if (connection) {
    if (connection.source_type === 'jira') {
      existing.base_url = connection.base_url ?? ''
      existing.email = connection.email ?? ''
      existing.auth_type = connection.auth_type ?? 'cloud'
      // api_token intentionally blank — user must re-enter to change
    } else {
      const parsed = connection.credentials_json ? JSON.parse(connection.credentials_json) : {}
      for (const field of manifest.credentials) {
        existing[field.key] = parsed[field.key] ?? ''
      }
    }
  }
  return (manifest.credentials ?? []).reduce<Record<string, string>>((acc, f) => {
    acc[f.key] = existing[f.key] ?? String(f.default ?? '')
    return acc
  }, {})
}

function isFieldVisible(field: PluginField, credentials: Record<string, string>): boolean {
  if (!field.showWhen) return true
  return credentials[field.showWhen.field] === field.showWhen.value
}

export default function ConnectionDialog({ open, manifest, connection, onClose, onSaved }: Props) {
  const { t } = useTranslation()
  const isEdit = Boolean(connection)
  const isJira = manifest.source_type === 'jira'

  const [name, setName] = useState(connection?.name ?? '')
  const [credentials, setCredentials] = useState<Record<string, string>>(() => initialCredentials(manifest, connection))
  const [testState, setTestState] = useState<TestState>('idle')
  const [testMsg, setTestMsg] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [pendingId, setPendingId] = useState<string | null>(connection?.id ?? null)

  const canSave = Boolean(name) && (manifest.credentials ?? []).every((f) => {
    if (!isFieldVisible(f, credentials)) return true // hidden fields don't block save
    if (f.type === 'password' && isEdit) return true // keep existing
    return Boolean(credentials[f.key])
  })

  function set(key: string, value: string) {
    setCredentials((prev) => ({ ...prev, [key]: value }))
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) onClose()
  }

  async function persist(): Promise<SourceConnection> {
    if (isJira) {
      const isServer = credentials.auth_type === 'server'
      const base = {
        name,
        source_type: 'jira' as const,
        base_url: credentials.base_url,
        email: isServer ? '' : credentials.email,
        auth_type: credentials.auth_type as 'cloud' | 'server',
      }
      if (pendingId) {
        const updates = credentials.api_token ? { ...base, api_token: credentials.api_token } : base
        const result = await api.connections.update(pendingId, updates)
        return result as SourceConnection
      } else {
        const result = await api.connections.create({ ...base, api_token: credentials.api_token })
        const conn = result as SourceConnection
        setPendingId(conn.id)
        return conn
      }
    } else {
      const creds: Record<string, string> = {}
      for (const f of (manifest.credentials ?? [])) {
        if (f.type === 'password' && isEdit && !credentials[f.key]) continue
        if (credentials[f.key]) creds[f.key] = credentials[f.key]
      }
      if (pendingId) {
        const result = await api.connections.update(pendingId, { name, credentials: creds })
        return result as SourceConnection
      } else {
        const result = await api.connections.create({ name, source_type: manifest.source_type, credentials: creds })
        const conn = result as SourceConnection
        setPendingId(conn.id)
        return conn
      }
    }
  }

  async function handleTest() {
    if (!canSave) { setError(t('connection.fillRequired')); return }
    setTestState('loading')
    setTestMsg('')
    setError('')
    try {
      const saved = await persist()
      onSaved(saved)
      const result = await api.connections.test(saved.id) as { display_name: string; email?: string; ok?: boolean }
      setTestState('ok')
      if (result.display_name && result.email) {
        setTestMsg(`Connected as ${result.display_name} (${result.email})`)
      } else if (result.display_name) {
        setTestMsg(`Connected as ${result.display_name}`)
      } else {
        setTestMsg(t('connection.testOk'))
      }
    } catch (e) {
      setTestState('error')
      setTestMsg(e instanceof Error ? e.message : 'Connection failed')
    }
  }

  async function handleSave() {
    if (!canSave) return
    setError('')
    setSaving(true)
    try {
      const saved = await persist()
      onSaved(saved)
      onClose()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t('connection.editTitle') : t('connection.addTitleFor', { name: manifest.name })}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Connection name */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-sm font-medium text-gray-700">{t('connection.name')}</span>
            </div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('connection.namePlaceholder')}
            />
          </div>

          {/* Dynamic credential fields */}
          {(manifest.credentials ?? []).filter((f) => isFieldVisible(f, credentials)).map((field) => (
            <div key={field.key}>
              <div className="flex items-center gap-1 mb-1.5">
                <span className="text-sm font-medium text-gray-700">{field.label}</span>
                {field.type === 'password' && isEdit && (
                  <span className="text-gray-400 font-normal text-sm">({t('connection.apiTokenKeepHint')})</span>
                )}
                {(field.help || field.link) && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-gray-300 hover:text-gray-500 transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      {field.help && <p className="text-xs text-gray-600">{field.help}</p>}
                      {field.link && (
                        <a
                          href={field.link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-500 hover:underline inline-flex items-center gap-0.5 mt-1"
                        >
                          {field.link.label} <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              {field.type === 'select' ? (
                <Select value={credentials[field.key] ?? String(field.default ?? '')} onValueChange={(v) => set(field.key, v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(field.options ?? []).map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={field.type === 'password' ? 'password' : field.type === 'number' ? 'number' : 'text'}
                  value={credentials[field.key] ?? ''}
                  onChange={(e) => set(field.key, e.target.value)}
                  placeholder={field.type === 'password' && isEdit ? '••••••••' : (field.placeholder ?? '')}
                />
              )}
            </div>
          ))}

          {testState === 'ok' && (
            <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {testMsg}
            </div>
          )}
          {testState === 'error' && (
            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <XCircle className="w-4 h-4 shrink-0" />
              {testMsg}
            </div>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleTest}
            disabled={testState === 'loading' || saving}
            className="gap-1.5 mr-auto"
          >
            {testState === 'loading' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {t('connection.testConnection')}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="button" onClick={handleSave} disabled={saving || !canSave}>
            {saving ? t('common.saving') : t('common.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
