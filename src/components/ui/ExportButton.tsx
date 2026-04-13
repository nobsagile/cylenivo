import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  onClick: () => void | Promise<void>
}

export function ExportButton({ onClick }: Props) {
  const { t } = useTranslation()
  const [done, setDone] = useState(false)

  async function handleClick() {
    await onClick()
    setDone(true)
    setTimeout(() => setDone(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick} className="gap-1.5">
      {done
        ? <><Check className="w-3.5 h-3.5 text-green-600" /> {t('common.exported')}</>
        : <><Download className="w-3.5 h-3.5" /> {t('common.exportCsv')}</>
      }
    </Button>
  )
}
