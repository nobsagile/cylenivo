import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api'
import type { ProjectConfig } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function ImportPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [configs, setConfigs] = useState<ProjectConfig[]>([])
  const [configId, setConfigId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<{ ticket_count: number; project_key: string } | null>(null)
  const [importing, setImporting] = useState(false)
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
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('import.title')}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('import.selectConfig')}
          </label>
          <select
            value={configId}
            onChange={(e) => setConfigId(e.target.value)}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
          >
            <option value="">— select —</option>
            {configs.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('import.uploadFile')}
          </label>
          <Card
            className="border-2 border-dashed cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
          >
            <CardContent className="py-8 text-center text-gray-500 text-sm">
              {file ? (
                <p className="font-medium text-gray-900">{file.name}</p>
              ) : (
                <p>{t('import.dragDrop')}</p>
              )}
            </CardContent>
          </Card>
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

        {preview && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-3 text-sm text-blue-800">
              <strong>{preview.project_key}</strong> – {preview.ticket_count} tickets
            </CardContent>
          </Card>
        )}

        <Button
          onClick={handleImport}
          disabled={!file || !configId || importing}
          className="w-full"
        >
          {importing ? t('import.importing') : t('import.import')}
        </Button>
      </div>
    </div>
  )
}
