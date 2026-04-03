import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ExternalLink } from 'lucide-react'
import { open as tauriOpen } from '@tauri-apps/plugin-shell'

function openUrl(url: string) {
  if (window.__TAURI_INTERNALS__) tauriOpen(url)
  else window.open(url, '_blank', 'noopener,noreferrer')
}

export default function AboutPage() {
  const { t } = useTranslation()
  const [appVersion, setAppVersion] = useState<string>(__APP_VERSION__)

  useEffect(() => {
    import('@tauri-apps/api/app').then(({ getVersion }) => getVersion().then(setAppVersion)).catch(() => {})
  }, [])

  const bugBody = `**Version:** v${appVersion}\n**Platform:** ${navigator.platform}\n\n### Describe the bug\n\n### Steps to reproduce\n1. \n2. \n\n### Expected behavior\n\n### Actual behavior\n`
  const links = [
    { label: t('about.website'), url: 'https://cylenivo.org', icon: Globe },
    { label: t('about.github'), url: 'https://github.com/nobsagile/cylenivo', icon: ExternalLink },
    { label: t('about.reportBug'), url: `https://github.com/nobsagile/cylenivo/issues/new?template=bug_report.md&labels=bug,app&body=${encodeURIComponent(bugBody)}`, icon: ExternalLink },
    { label: t('about.mastodon'), url: 'https://mastodon.social/@cylenivo', icon: ExternalLink },
  ]

  return (
    <div className="max-w-lg mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-gray-900 mb-1">{t('settings.navAbout')}</h1>
      <p className="text-sm text-gray-500 mb-6">{t('about.subtitle')}</p>

      <div className="space-y-4">
        {/* Identity */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 flex items-center gap-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-14 h-14 shrink-0" aria-hidden="true">
            <rect x="48" y="56" width="144" height="40" rx="20" fill="#7c3aed" />
            <rect x="48" y="108" width="64" height="40" rx="20" fill="#4f46e5" />
            <rect x="48" y="160" width="128" height="40" rx="20" fill="#0d9488" />
          </svg>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Cylenivo</h3>
            <p className="text-sm text-gray-500 mt-0.5">{t('about.tagline')}</p>
            {appVersion && (
              <p className="text-xs text-gray-400 mt-1">{t('about.version')} {appVersion}</p>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-4 pt-3 pb-1">{t('about.links')}</p>
          {links.map(({ label, url, icon: Icon }) => (
            <button
              key={url}
              onClick={() => openUrl(url)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-100 first:border-t-0 text-left"
            >
              <span className="text-sm text-gray-700">{label}</span>
              <Icon className="w-3.5 h-3.5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* License */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 space-y-0.5">
          <p className="text-xs text-gray-500">{t('about.license')}</p>
          <p className="text-xs text-gray-400">{t('about.copyright')}</p>
        </div>
      </div>
    </div>
  )
}
