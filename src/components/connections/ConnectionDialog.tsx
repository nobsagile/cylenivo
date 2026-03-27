import { useState } from 'react'
import { ExternalLink, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { api } from '@/services/api'
import type { SourceConnection } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface Props {
  open: boolean
  connection?: SourceConnection | null
  onClose: () => void
  onSaved: (conn: SourceConnection) => void
}

type TestState = 'idle' | 'loading' | 'ok' | 'error'

export default function ConnectionDialog({ open, connection, onClose, onSaved }: Props) {
  const isEdit = Boolean(connection)
  const [name, setName] = useState(connection?.name ?? '')
  const [baseUrl, setBaseUrl] = useState(connection?.base_url ?? '')
  const [email, setEmail] = useState(connection?.email ?? '')
  const [apiToken, setApiToken] = useState('')
  const [testState, setTestState] = useState<TestState>('idle')
  const [testMsg, setTestMsg] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  // Track connection created during test so Save just closes
  const [pendingId, setPendingId] = useState<string | null>(connection?.id ?? null)

  const canSave = Boolean(name && baseUrl && email && (apiToken || isEdit))

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) onClose()
  }

  async function persist(): Promise<SourceConnection> {
    const base = { name, source_type: 'jira' as const, base_url: baseUrl, email }
    if (pendingId) {
      // Already exists — update
      const updates = apiToken ? { ...base, api_token: apiToken } : base
      return await api.connections.update(pendingId, updates) as SourceConnection
    } else {
      // New connection
      const created = await api.connections.create({ ...base, api_token: apiToken }) as SourceConnection
      setPendingId(created.id)
      return created
    }
  }

  async function handleTest() {
    if (!canSave) { setError('Fill all required fields first'); return }
    setTestState('loading')
    setTestMsg('')
    setError('')
    try {
      const saved = await persist()
      onSaved(saved)
      const result = await api.connections.test(saved.id) as { display_name: string; email: string }
      setTestState('ok')
      setTestMsg(`Connected as ${result.display_name} (${result.email})`)
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Connection' : 'Add Jira Connection'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Acme Jira"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Jira Base URL</label>
            <Input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://yourcompany.atlassian.net"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              API Token
              {isEdit && <span className="text-gray-400 font-normal ml-1">(leave empty to keep existing)</span>}
            </label>
            <Input
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder={isEdit ? '••••••••' : 'Paste your API token'}
            />
            <p className="mt-1.5 text-xs text-gray-400 flex items-center gap-1">
              Get your token at{' '}
              <a
                href="https://id.atlassian.com/manage-profile/security/api-tokens"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline inline-flex items-center gap-0.5"
              >
                Atlassian API Tokens <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

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
            Test Connection
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="button" onClick={handleSave} disabled={saving || !canSave}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
