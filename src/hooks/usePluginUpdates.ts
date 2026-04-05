import { useState, useEffect, useCallback } from 'react'
import { api } from '@/services/api'

const PLUGIN_UPDATES_CHANGED = 'cylenivo:plugin-updates-changed'

export function notifyPluginUpdatesChanged() {
  window.dispatchEvent(new Event(PLUGIN_UPDATES_CHANGED))
}

export function usePluginUpdates() {
  const [hasUpdates, setHasUpdates] = useState(false)

  const check = useCallback(() => {
    api.plugins.list()
      .then(installed => {
        if (installed.length === 0) { setHasUpdates(false); return }
        return api.plugins.registry()
          .then(entries => setHasUpdates(entries.some(e => e.installed && e.update_available)))
      })
      .catch(() => {}) // best-effort, never block the UI
  }, [])

  useEffect(() => { check() }, [check])

  useEffect(() => {
    window.addEventListener(PLUGIN_UPDATES_CHANGED, check)
    return () => window.removeEventListener(PLUGIN_UPDATES_CHANGED, check)
  }, [check])

  return { hasUpdates }
}
