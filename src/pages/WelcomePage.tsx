import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, ArrowRight, BarChart2, Clock, TrendingUp } from 'lucide-react'
import { api } from '@/services/api'
import { Button } from '@/components/ui/button'

export default function WelcomePage() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    Promise.all([api.imports.list(), api.configs.list()])
      .then(([imports, configs]) => {
        if (imports.length > 0) {
          // has data → go to most recent import
          navigate(`/projects/${imports[0].id}`, { replace: true })
        } else if (configs.length > 0) {
          // has configs but no imports → go to import
          navigate('/import', { replace: true })
        } else {
          // truly first time → show welcome
          setChecking(false)
        }
      })
      .catch(() => setChecking(false))
  }, [navigate])

  if (checking) return null

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Logo */}
      <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg">
        <Activity className="w-7 h-7 text-white" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome to Cylenivo</h1>
      <p className="text-gray-400 mt-3 max-w-md text-base leading-relaxed">
        Understand your team's delivery speed. Connect to Jira directly or upload an export file — analyze cycle time, lead time and throughput in minutes.
      </p>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 mt-10 mb-10 max-w-lg w-full">
        {[
          { icon: Clock, label: 'Cycle Time', desc: 'How long tickets take from start to done' },
          { icon: TrendingUp, label: 'Throughput', desc: 'How many tickets ship per week' },
          { icon: BarChart2, label: 'Forecasting', desc: 'P50/P85/P95 delivery estimates' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
            <div className="p-2 rounded-lg bg-blue-50">
              <Icon className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800">{label}</p>
            <p className="text-[11px] text-gray-400 leading-snug">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Button size="lg" onClick={() => navigate('/import')} className="gap-2 px-8 h-12 text-base shadow-sm">
        Get Started
        <ArrowRight className="w-4 h-4" />
      </Button>
      <p className="text-xs text-gray-400 mt-3">
        Connect to Jira directly or upload an export — takes about 2 minutes.
      </p>
    </div>
  )
}
