import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2, CheckCircle2, AlertCircle, Circle } from 'lucide-react'
import { notifyImportsChanged, notifyDataReplaced } from '@/hooks/useImports'
import { refreshDataset, type RefreshableDataset } from '@/lib/refreshDataset'
import type { SourceConnection, PluginManifest } from '@/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

export interface RefreshJob {
  dataset: RefreshableDataset
  connection: SourceConnection
  pluginManifest?: PluginManifest | null
}

type JobState =
  | { status: 'pending' }
  | { status: 'running'; progress?: string }
  | { status: 'done' }
  | { status: 'error'; message: string }

interface Props {
  open: boolean
  jobs: RefreshJob[]
  onClose: () => void
}

/** Refreshes datasets one after another — parallel fetches would hammer the source API. */
export default function RefreshAllDialog({ open, jobs, onClose }: Props) {
  const { t } = useTranslation()
  const [states, setStates] = useState<JobState[]>(() => jobs.map(() => ({ status: 'pending' })))
  const [running, setRunning] = useState(true)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const set = (i: number, s: JobState) => setStates(prev => prev.map((p, j) => (j === i ? s : p)))
    ;(async () => {
      for (let i = 0; i < jobs.length; i++) {
        const { dataset, connection, pluginManifest } = jobs[i]
        set(i, { status: 'running' })
        try {
          await refreshDataset(dataset, connection, pluginManifest, (current, total) => {
            set(i, { status: 'running', progress: `${current}/${total}` })
          })
          notifyDataReplaced(dataset.id)
          set(i, { status: 'done' })
        } catch (e) {
          set(i, { status: 'error', message: e instanceof Error ? e.message : t('refreshAll.failed') })
        }
      }
      notifyImportsChanged()
      setRunning(false)
    })()
  }, [])

  const failed = states.filter(s => s.status === 'error').length

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !running) onClose() }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('refreshAll.title')}</DialogTitle>
        </DialogHeader>
        <ul className="space-y-2 py-2">
          {jobs.map(({ dataset }, i) => {
            const s = states[i]
            return (
              <li key={dataset.id} className="flex items-start gap-2.5 text-sm">
                {s.status === 'pending' && <Circle className="w-4 h-4 mt-0.5 shrink-0 text-gray-300" />}
                {s.status === 'running' && <Loader2 className="w-4 h-4 mt-0.5 shrink-0 text-violet-500 animate-spin" />}
                {s.status === 'done' && <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />}
                {s.status === 'error' && <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />}
                <div className="min-w-0">
                  <p className="text-gray-800">
                    {dataset.name ?? dataset.project_key}
                    {s.status === 'running' && s.progress && (
                      <span className="ml-2 text-xs text-gray-400">{s.progress}</span>
                    )}
                  </p>
                  {s.status === 'error' && <p className="text-xs text-red-600 break-words">{s.message}</p>}
                </div>
              </li>
            )
          })}
        </ul>
        {!running && (
          <p className="text-xs text-gray-500">
            {failed === 0 ? t('refreshAll.allDone') : t('refreshAll.someFailed', { count: failed })}
          </p>
        )}
        <DialogFooter>
          <Button onClick={onClose} disabled={running}>
            {running ? t('refreshAll.running') : t('refreshAll.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
