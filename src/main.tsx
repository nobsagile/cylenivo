import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
import { setApiPort } from '@/services/api'

async function init() {
  if ('__TAURI_INTERNALS__' in window) {
    const { invoke } = await import('@tauri-apps/api/core')
    const port = await invoke<number>('get_server_port')
    setApiPort(port)
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

init()
