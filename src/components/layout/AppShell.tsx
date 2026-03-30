import { Outlet, useParams } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { DateFilterProvider } from '@/contexts/DateFilterContext'

export function AppShell() {
  const { importId } = useParams<{ importId: string }>()
  return (
    <DateFilterProvider importId={importId}>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </DateFilterProvider>
  )
}
