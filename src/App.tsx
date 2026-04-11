import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AppShell } from '@/components/layout/AppShell'
import { ProjectLayout } from '@/components/layout/ProjectLayout'
import DashboardPage from '@/pages/DashboardPage'
import ImportPage from '@/pages/ImportPage'
import TicketsPage from '@/pages/TicketsPage'
import FlowPage from '@/pages/FlowPage'
import HealthPage from '@/pages/HealthPage'
import TrendsPage from '@/pages/TrendsPage'
import InsightsPage from '@/pages/InsightsPage'
import SettingsPage from '@/pages/SettingsPage'
import ConfigFormPage from '@/pages/ConfigFormPage'
import DatasetEditPage from '@/pages/DatasetEditPage'
import ForecastPage from '@/pages/ForecastPage'
import WelcomePage from '@/pages/WelcomePage'
import AboutPage from '@/pages/AboutPage'
import HelpPage from '@/pages/HelpPage'

function App() {
  const { t } = useTranslation()
  const [serverCrashed, setServerCrashed] = useState(false)

  useEffect(() => {
    if (!('__TAURI_INTERNALS__' in window)) return
    let unlisten: (() => void) | undefined
    import('@tauri-apps/api/event').then(({ listen }) => {
      listen('server-crashed', () => setServerCrashed(true)).then((fn) => { unlisten = fn })
    })
    return () => { unlisten?.() }
  }, [])

  return (
    <ErrorBoundary>
      {serverCrashed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm text-center">
            <p className="text-lg font-semibold text-red-600 mb-2">{t('errors.serverCrashedTitle')}</p>
            <p className="text-sm text-gray-600">{t('errors.serverCrashed')}</p>
          </div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/projects/:importId" element={<ProjectLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="flow" element={<FlowPage />} />
              <Route path="health" element={<HealthPage />} />
              <Route path="trends" element={<TrendsPage />} />
              <Route path="forecast" element={<ForecastPage />} />
              <Route path="tickets" element={<TicketsPage />} />
              <Route path="insights" element={<InsightsPage />} />
            </Route>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/settings/configs/new" element={<ConfigFormPage />} />
            <Route path="/settings/configs/:configId" element={<ConfigFormPage />} />
            <Route path="/settings/datasets/:datasetId" element={<DatasetEditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
