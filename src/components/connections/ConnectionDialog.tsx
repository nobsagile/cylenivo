import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ExternalLink, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { api } from '@/services/api'
import type { SourceConnection } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
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

const ISSUE_TYPE_OPTIONS = ['Story', 'Task', 'Bug', 'Epic']

export default function ConnectionDialog({ open, connection, onClose, onSaved }: Props) {
  const { t } = useTranslation()
  const isEdit = Boolean(connection)
  const [name, setName] = useState(connection?.name ?? '')
  const [baseUrl, setBaseUrl] = useState(connection?.base_url ?? '')
  const [email, setEmail] = useState(connection?.email ?? '')
  const [apiToken, setApiToken] = useState('')
  const [projectKey, setProjectKey] = useState(connection?.project_key ?? '')
  const [issueTypes, setIssueTypes] = useState<string[]>(connection?.issue_types ?? [])
  const [resolvedFrom, setResolvedFrom] = useState(connection?.resolved_from ?? '')
  const [resolvedTo, setResolvedTo] = useState(connection?.resolved_to ?? '')
  const [testState, setTestState] = useState<TestState>('idle')
  const [testMsg, setTestMsg] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  // Track connection created during test so Save just closes
  const [pendingId, setPendingId] = useState<string | null>(connection?.id ?? null)

  const canSave = Boolean(name && baseUrl && email && (apiToken || isEdit))

  function toggleIssueType(type: string) {
    setIssueTypes((prev) =>
      prev.includes(type) ? prev.filter((x) => x !== type) : [...prev, type]
    )
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) onClose()
  }

  async function persist(): Promise<SourceConnection> {
    const base = {
      name,
      source_type: 'jira' as const,
      base_url: baseUrl,
      email,
      project_key: projectKey || undefined,
      issue_types: issueTypes.length > 0 ? issueTypes : undefined,
      resolved_from: resolvedFrom || undefined,
      resolved_to: resolvedTo || undefined,
    }
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? t('connection.editTitle') : t('connection.addTitle')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('connection.name')}</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('connection.namePlaceholder')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('connection.jiraBaseUrl')}</label>
            <Input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://yourcompany.atlassian.net"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('connection.email')}</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('connection.emailPlaceholder')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('connection.apiToken')}
              {isEdit && <span className="text-gray-400 font-normal ml-1">({t('connection.apiTokenKeepHint')})</span>}
            </label>
            <Input
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder={isEdit ? '••••••••' : t('connection.apiTokenPlaceholder')}
            />
            <p className="mt-1.5 text-xs text-gray-400 flex items-center gap-1">
              {t('connection.getTokenAt')}{' '}
              <a
                href="https://id.atlassian.com/manage-profile/security/api-tokens"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline inline-flex items-center gap-0.5"
              >
                {t('connection.atlassianTokens')} <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          {/* ── Default Import Settings ──────────────────────────────────── */}
          <div className="border-t pt-4 mt-4">
            <p className="text-sm font-medium text-gray-700 mb-0.5">{t('connection.defaultSettings')}</p>
            <p className="text-xs text-gray-400 mb-3">{t('connection.defaultSettingsHint')}</p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('connection.projectKey')}</label>
                <Input
                  value={projectKey}
                  onChange={(e) => setProjectKey(e.target.value.toUpperCase())}
                  placeholder={t('connection.projectKeyPlaceholder')}
                  className="h-8 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('connection.issueTypes')}</label>
                <div className="flex flex-wrap gap-1.5">
                  {ISSUE_TYPE_OPTIONS.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleIssueType(type)}
                      className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors ${
                        issueTypes.includes(type)
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t('connection.resolvedBetween')}</label>
                <div className="flex items-center gap-2">
                  <DatePicker value={resolvedFrom} onChange={setResolvedFrom} placeholder={t('common.from')} />
                  <span className="text-gray-400 text-xs">{t('common.to')}</span>
                  <DatePicker value={resolvedTo} onChange={setResolvedTo} placeholder={t('common.to')} />
                </div>
              </div>
            </div>
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
