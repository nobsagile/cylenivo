import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronDown, Copy, Info, TriangleAlert } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { api } from '@/services/api'
import type { McpSetup } from '@/types'
import { buildMcpConfig, MCP_CLIENTS, type McpClient } from '@/lib/mcpConfig'

/**
 * "Use Cylenivo from your AI assistant": copy-paste config for MCP clients.
 * The server reports its own binary path (GET /mcp/setup); the frontend only
 * formats it per client.
 */
export function McpCard() {
  const { t } = useTranslation()
  const [setup, setSetup] = useState<McpSetup | null>(null)
  const [failed, setFailed] = useState(false)
  const [client, setClient] = useState<McpClient>('claude')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    api.mcp.setup().then(setSetup).catch(() => setFailed(true))
  }, [])

  const snippet = setup ? buildMcpConfig(client, setup) : ''

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard blocked — the text stays selectable */ }
  }

  return (
    <div className="rounded-xl border border-gray-200 p-5 space-y-4" data-testid="mcp-card">
      <div>
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-semibold text-gray-800">{t('settings.mcp.title')}</h3>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-gray-300 hover:text-gray-500 transition-colors" aria-label={t('help.titles.mcp')}>
                <Info className="w-3 h-3" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72"><p className="text-xs text-gray-600">{t('help.mcp')}</p></PopoverContent>
          </Popover>
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t('settings.mcp.desc')}</p>
      </div>

      {failed && <p className="text-xs text-red-500">{t('settings.mcp.loadError')}</p>}

      {setup && (
        <>
          {setup.warning === 'translocated' && (
            <div className="flex gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
              <TriangleAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{t('settings.mcp.translocated')}</span>
            </div>
          )}

          <div>
            <label htmlFor="mcp-client" className="block text-xs font-semibold text-gray-600 mb-1.5">{t('settings.mcp.client')}</label>
            <div className="relative">
              <select id="mcp-client" value={client} onChange={(e) => { setClient(e.target.value as McpClient); setCopied(false) }}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none bg-white">
                {MCP_CLIENTS.map((c) => <option key={c} value={c}>{t(`settings.mcp.clients.${c}`)}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">{t(`settings.mcp.where.${client}`)}</p>

          <div className="relative">
            <pre data-testid="mcp-snippet" className="text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg p-3 pr-24 overflow-x-auto select-all whitespace-pre">{snippet}</pre>
            <Button variant="outline" size="sm" onClick={handleCopy} className="absolute top-2 right-2 h-7 gap-1 text-xs bg-white">
              {copied ? <><Check className="w-3 h-3" />{t('settings.mcp.copied')}</> : <><Copy className="w-3 h-3" />{t('settings.mcp.copy')}</>}
            </Button>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">{t('settings.mcp.merge')}</p>
          <p className="text-xs text-gray-500 leading-relaxed">{t('settings.mcp.privacy')}</p>
        </>
      )}
    </div>
  )
}
