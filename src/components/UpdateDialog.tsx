import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Update } from '@tauri-apps/plugin-updater'

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
      const msg = e instanceof Error ? e.message : String(e)
      alert('Update failed: ' + msg)
      setInstalling(false)
    }
  }

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
          <p className="text-xs text-gray-400 mt-2 whitespace-pre-wrap line-clamp-6">{update.body}</p>
        )}
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
