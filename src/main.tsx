import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
import { setApiPort, waitForServer } from '@/services/api'

async function init() {
  document.addEventListener('contextmenu', (e) => e.preventDefault())

  if ('__TAURI_INTERNALS__' in window) {
    const { invoke } = await import('@tauri-apps/api/core')
    const port = await invoke<number>('get_server_port')
    setApiPort(port)
  }

  // Wait for the sidecar before rendering — otherwise the first data fetches
  // race the server startup and fail (see waitForServer).
  if (!(await waitForServer())) {
    console.error('Server did not become reachable within the startup timeout')
  }

  const root = document.getElementById('root')!
  document.getElementById('boot-splash')?.remove()

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

init()
