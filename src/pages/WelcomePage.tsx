import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, TrendingUp, TrendingDown, Shuffle } from 'lucide-react'
import { api } from '@/services/api'
import { notifyImportsChanged } from '@/hooks/useImports'
import { Button } from '@/components/ui/button'
import type { ImportSession } from '@/types'

const ONBOARDING_KEY = 'cylenivo_onboarded'

function LogoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-10 h-10" aria-hidden="true">
      <rect x="48" y="56" width="144" height="40" rx="20" fill="#7c3aed" />
      <rect x="48" y="108" width="64" height="40" rx="20" fill="#4f46e5" />
      <rect x="48" y="160" width="128" height="40" rx="20" fill="#0d9488" />
    </svg>
  )
}

export default function WelcomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [demoImports, setDemoImports] = useState<ImportSession[]>([])

  useEffect(() => {
    Promise.all([api.imports.list(), api.configs.list()])
      .then(async ([imports, configs]) => {
        const onlyDemos = imports.length > 0 && imports.every(i => i.config_name?.startsWith('Demo:'))
        const seen = !!localStorage.getItem(ONBOARDING_KEY)

        if (!seen) {
          // New user → seed demo data if not already present, then show welcome page
          let demoResult = imports
          if (imports.length === 0) {
            const seeded = await api.demo.seed()
            notifyImportsChanged()
            demoResult = seeded.imports
              .filter(i => i.import_id)
              .map(i => ({ id: i.import_id!, config_name: i.name } as ImportSession))
          }
          const onlyDemosNow = demoResult.length > 0 && demoResult.every(i => i.config_name?.startsWith('Demo:'))
          if (onlyDemosNow) {
            const sorted = [...demoResult].sort((a, b) => {
              const aImproving = a.config_name?.includes('Improving') ? 0 : 1
              const bImproving = b.config_name?.includes('Improving') ? 0 : 1
              return aImproving - bImproving
            })
            setDemoImports(sorted)
          }
          setChecking(false)
        } else if (imports.length > 0) {
          navigate(`/projects/${imports[0].id}`, { replace: true })
        } else if (configs.length > 0) {
          navigate('/import', { replace: true })
        } else {
          navigate('/import', { replace: true })
        }
      })
      .catch(() => navigate('/import', { replace: true }))
  }, [navigate])

  function goToDemo(importId: string) {
    localStorage.setItem(ONBOARDING_KEY, '1')
    navigate(`/projects/${importId}`)
  }

  function goToImport() {
    localStorage.setItem(ONBOARDING_KEY, '1')
    navigate('/import')
  }

  if (checking) return null

  const improving = demoImports.find(i => i.config_name?.includes('Improving'))
  const complex = demoImports.find(i => i.config_name?.includes('Complex'))
  const realworld = demoImports.find(i => i.config_name?.includes('Real World'))

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="mb-5">
          <LogoIcon />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t('onboarding.title')}</h1>
        <p className="text-gray-400 mt-2 max-w-sm text-sm leading-relaxed">
          {t('onboarding.subtitle')}
        </p>
      </div>

      {/* Demo section */}
      <div className="w-full max-w-3xl">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-center mb-4">
          {t('onboarding.demosReady')}
        </p>

        <div className="grid grid-cols-3 gap-4">
          {/* Improving Team */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm p-5 gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-50">
                <TrendingUp className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-sm font-semibold text-gray-800">{t('onboarding.improvingTitle')}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
              {t('onboarding.improvingDesc')}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-1.5 mt-1"
              onClick={() => improving && goToDemo(improving.id)}
              disabled={!improving}
            >
              {t('onboarding.explore')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Complex Team */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm p-5 gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-50">
                <TrendingDown className="w-4 h-4 text-rose-500" />
              </div>
              <span className="text-sm font-semibold text-gray-800">{t('onboarding.complexTitle')}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
              {t('onboarding.complexDesc')}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-1.5 mt-1"
              onClick={() => complex && goToDemo(complex.id)}
              disabled={!complex}
            >
              {t('onboarding.explore')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Real World Team */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm p-5 gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50">
                <Shuffle className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-sm font-semibold text-gray-800">{t('onboarding.realworldTitle')}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
              {t('onboarding.realworldDesc')}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full gap-1.5 mt-1"
              onClick={() => realworld && goToDemo(realworld.id)}
              disabled={!realworld}
            >
              {t('onboarding.explore')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Own data CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-medium text-gray-700">{t('onboarding.ownData')}</p>
          <Button onClick={goToImport} className="gap-2 px-6">
            {t('onboarding.importCta')}
            <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-xs text-gray-400 mt-1">{t('onboarding.removeTip')}</p>
        </div>
      </div>
    </div>
  )
}
