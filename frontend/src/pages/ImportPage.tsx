import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, FileJson, CheckCircle2 } from 'lucide-react'
import { api } from '@/services/api'
import type { ProjectConfig } from '@/types'
import { Button } from '@/components/ui/button'

export default function ImportPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [configs, setConfigs] = useState<ProjectConfig[]>([])
  const [configId, setConfigId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<{ ticket_count: number; project_key: string } | null>(null)
  const [importing, setImporting] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    api.configs.list().then(setConfigs).catch(console.error)
  }, [])

  function handleFileChange(f: File) {
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        setPreview({ ticket_count: data.tickets?.length ?? 0, project_key: data.project_key ?? '' })
      } catch {
        setPreview(null)
      }
    }
    reader.readAsText(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f?.name.endsWith('.json')) handleFileChange(f)
  }

  async function handleImport() {
    if (!file || !configId) return
    setImporting(true)
    try {
      const session = await api.imports.upload(file, configId)
      navigate(`/projects/${session.id}`)
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('import.title')}</h2>
        <p className="text-sm text-gray-400 mt-1">Upload a JSON export from the Jira connector script</p>
      </div>

      <div className="space-y-5">
        {/* Config select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('import.selectConfig')}
          </label>
          {configs.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-500">
              No configurations yet.{' '}
              <button
                onClick={() => navigate('/settings/configs/new')}
                className="text-blue-600 hover:underline font-medium"
              >
                Create one first →
              </button>
            </div>
          ) : (
            <select
              value={configId}
              onChange={(e) => setConfigId(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">— select configuration —</option>
              {configs.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
        </div>

        {/* File drop zone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('import.uploadFile')}
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-colors ${
              dragging
                ? 'border-blue-400 bg-blue-50'
                : file
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
              {file ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                  <p className="text-sm font-semibold text-emerald-700">{file.name}</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Click to change</p>
                </>
              ) : (
                <>
                  <UploadCloud className={`w-8 h-8 mb-2 ${dragging ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-sm font-medium text-gray-600">{t('import.dragDrop')}</p>
                  <p className="text-xs text-gray-400 mt-0.5">JSON files only</p>
                </>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFileChange(f)
            }}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
            <FileJson className="w-5 h-5 text-blue-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-800">{preview.project_key}</p>
              <p className="text-xs text-blue-600">{preview.ticket_count} tickets found</p>
            </div>
          </div>
        )}

        <Button
          onClick={handleImport}
          disabled={!file || !configId || importing}
          className="w-full h-10"
        >
          {importing ? t('import.importing') : t('import.import')}
        </Button>
      </div>
    </div>
  )
}
