import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Update } from '@tauri-apps/plugin-updater'
import { open as tauriOpen } from '@tauri-apps/plugin-shell'

function openExternal(url: string) {
  if (window.__TAURI_INTERNALS__) tauriOpen(url)
  else window.open(url, '_blank', 'noopener,noreferrer')
}

interface Props {
  update: Update
  onClose: () => void
}

export function UpdateDialog({ update, onClose }: Props) {
  const { t } = useTranslation()
  const [installing, setInstalling] = useState(false)

  async function handleInstall() {
    setInstalling(true)
    try {
      await update.downloadAndInstall()
      const { relaunch } = await import('@tauri-apps/plugin-process')
      await relaunch()
    } catch (e) {
      setInstalling(false)
    }
  }

  const changelogUrl = `https://github.com/nobsagile/cylenivo/releases/tag/v${update.version}`

  return (
    <Dialog open onOpenChange={(o) => { if (!o && !installing) onClose() }}>
      <DialogContent className="max-w-sm bg-white">
        <DialogHeader>
          <DialogTitle>{t('update.available')}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600 mt-1">
          {t('update.description', { version: update.version })}
        </p>
        {update.body && (
          <pre className="text-xs text-gray-500 mt-2 max-h-32 overflow-y-auto whitespace-pre-wrap font-sans">{update.body}</pre>
        )}
        <button
          className="text-xs text-violet-600 hover:underline text-left mt-1"
          onClick={() => openExternal(changelogUrl)}
        >
          {t('update.viewChangelog')} →
        </button>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose} disabled={installing}>
            {t('update.later')}
          </Button>
          <Button onClick={handleInstall} disabled={installing}>
            {installing ? t('update.downloading') : t('update.install')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
