import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import DashboardPage from '@/pages/DashboardPage'
import ImportPage from '@/pages/ImportPage'
import TicketsPage from '@/pages/TicketsPage'
import FlowPage from '@/pages/FlowPage'
import InsightsPage from '@/pages/InsightsPage'
import SettingsPage from '@/pages/SettingsPage'
import ConfigFormPage from '@/pages/ConfigFormPage'
import WelcomePage from '@/pages/WelcomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/projects/:importId" element={<DashboardPage />} />
          <Route path="/projects/:importId/tickets" element={<TicketsPage />} />
          <Route path="/projects/:importId/flow" element={<FlowPage />} />
          <Route path="/projects/:importId/insights" element={<InsightsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/configs/new" element={<ConfigFormPage />} />
          <Route path="/settings/configs/:configId" element={<ConfigFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
