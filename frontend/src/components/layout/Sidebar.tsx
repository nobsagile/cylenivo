import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useImports } from '@/hooks/useImports'

export function Sidebar() {
  const { t } = useTranslation()
  const { importId } = useParams<{ importId?: string }>()
  const navigate = useNavigate()
  const { data: imports } = useImports()

  function handleImportChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value
    if (id) navigate(`/projects/${id}`)
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded text-sm ${isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`

  return (
    <aside className="w-60 shrink-0 border-r border-gray-200 bg-white flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-gray-200">
        <h1 className="font-bold text-lg text-gray-900">{t('app.name')}</h1>
      </div>

      <div className="p-4 border-b border-gray-200">
        <label className="text-xs text-gray-500 block mb-1">{t('nav.import')}</label>
        <select
          value={importId ?? ''}
          onChange={handleImportChange}
          className="w-full text-sm border border-gray-200 rounded px-2 py-1"
        >
          <option value="">— select import —</option>
          {imports.map((imp) => (
            <option key={imp.id} value={imp.id}>
              {imp.project_key} – {new Date(imp.imported_at).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      <nav className="p-2 flex-1">
        {importId ? (
          <>
            <NavLink to={`/projects/${importId}`} end className={navLinkClass}>
              {t('nav.overview')}
            </NavLink>
            <NavLink to={`/projects/${importId}/tickets`} className={navLinkClass}>
              {t('nav.tickets')}
            </NavLink>
            <NavLink to={`/projects/${importId}/analytics`} className={navLinkClass}>
              {t('nav.analytics')}
            </NavLink>
            <NavLink to={`/projects/${importId}/insights`} className={navLinkClass}>
              {t('nav.insights')}
            </NavLink>
          </>
        ) : null}
        <NavLink to="/import" className={navLinkClass}>
          {t('nav.import')}
        </NavLink>
      </nav>

      <div className="p-2 border-t border-gray-200">
        <NavLink to="/settings" className={navLinkClass}>
          {t('nav.settings')}
        </NavLink>
      </div>
    </aside>
  )
}
