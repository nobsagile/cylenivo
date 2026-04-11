import type {
  ProjectConfig,
  ImportSession,
  TicketDetail,
  MetricsSummary,
  CycleTimesResponse,
  LeadTimesResponse,
  TimeInStatusResponse,
  ReworkResponse,
  CycleTimeByTypeResponse,
  ForecastResponse,
  ThroughputResponse,
  CfdResponse,
  LLMStatus,
  LLMInsight,
  LlmConfig,
  PaginatedTickets,
  CreateConfigRequest,
  SourceConnection,
  JiraFetchOptions,
} from '@/types'

let BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8765'

export function setApiPort(port: number) {
  BASE_URL = `http://localhost:${port}`
}

type DateFilter = { from?: string; to?: string }

function dateParams(dates?: DateFilter): string {
  const p = new URLSearchParams()
  if (dates?.from) p.set('from', dates.from)
  if (dates?.to) p.set('to', dates.to)
  const s = p.toString()
  return s ? `?${s}` : ''
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    signal: AbortSignal.timeout(30000),
    ...options,
  })
  if (res.status === 204) return null as T
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Request failed')
  return json.data as T
}

export const api = {
  configs: {
    list: () => request<ProjectConfig[]>('/api/v1/configs'),
    get: (id: string) => request<ProjectConfig>(`/api/v1/configs/${id}`),
    create: (body: CreateConfigRequest) =>
      request<ProjectConfig>('/api/v1/configs', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    update: (id: string, body: Partial<CreateConfigRequest>) =>
      request<ProjectConfig>(`/api/v1/configs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    delete: (id: string) =>
      request<null>(`/api/v1/configs/${id}`, { method: 'DELETE' }),
  },
  imports: {
    list: () => request<ImportSession[]>('/api/v1/imports'),
    get: (id: string) => request<ImportSession>(`/api/v1/imports/${id}`),
    upload: (file: File, configId: string, name?: string, connectionId?: string) => {
      const form = new FormData()
      form.append('file', file)
      form.append('config_id', configId)
      if (name) form.append('name', name)
      if (connectionId) form.append('connection_id', connectionId)
      return request<ImportSession>('/api/v1/imports', { method: 'POST', body: form })
    },
    replace: (id: string, file: File) => {
      const form = new FormData()
      form.append('file', file)
      return request<ImportSession>(`/api/v1/imports/${id}/data`, { method: 'PUT', body: form })
    },
    update: (id: string, body: { name?: string; config_id?: string }) =>
      request<ImportSession>(`/api/v1/imports/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
    delete: (id: string) =>
      request<null>(`/api/v1/imports/${id}`, { method: 'DELETE' }),
    statuses: (id: string) =>
      request<string[]>(`/api/v1/imports/${id}/statuses`),
  },
  metrics: {
    summary: (importId: string, dates?: DateFilter) =>
      request<MetricsSummary>(`/api/v1/metrics/${importId}/summary${dateParams(dates)}`),
    cycleTimes: (importId: string, dates?: DateFilter) =>
      request<CycleTimesResponse>(`/api/v1/metrics/${importId}/cycle-times${dateParams(dates)}`),
    leadTimes: (importId: string, dates?: DateFilter) =>
      request<LeadTimesResponse>(`/api/v1/metrics/${importId}/lead-times${dateParams(dates)}`),
    timeInStatus: (importId: string, dates?: DateFilter) =>
      request<TimeInStatusResponse>(`/api/v1/metrics/${importId}/time-in-status${dateParams(dates)}`),
    rework: (importId: string, dates?: DateFilter) =>
      request<ReworkResponse>(`/api/v1/metrics/${importId}/rework${dateParams(dates)}`),
    cycleTimeByType: (importId: string, dates?: DateFilter) =>
      request<CycleTimeByTypeResponse>(`/api/v1/metrics/${importId}/cycle-time-by-type${dateParams(dates)}`),
    forecast: (importId: string, mode: 'how_many' | 'when', value: number, dates?: DateFilter) =>
      request<ForecastResponse>(`/api/v1/metrics/${importId}/forecast?mode=${mode}&value=${value}${dateParams(dates).replace('?', '&')}`),
    throughput: (importId: string, dates?: DateFilter) =>
      request<ThroughputResponse>(`/api/v1/metrics/${importId}/throughput${dateParams(dates)}`),
    cfd: (importId: string, dates?: DateFilter) =>
      request<CfdResponse>(`/api/v1/metrics/${importId}/cfd${dateParams(dates)}`),
  },
  tickets: {
    list: (importId: string, params?: { type?: string; page?: number; limit?: number; completed_only?: boolean; excluded_only?: boolean; search?: string }) => {
      const p = new URLSearchParams({ import_id: importId })
      if (params?.type) p.set('type', params.type)
      if (params?.page) p.set('page', String(params.page))
      if (params?.limit) p.set('limit', String(params.limit))
      if (params?.completed_only) p.set('completed_only', '1')
      if (params?.excluded_only) p.set('excluded_only', '1')
      if (params?.search) p.set('search', params.search)
      return request<PaginatedTickets>(`/api/v1/tickets?${p}`)
    },
    get: (id: string) => request<TicketDetail>(`/api/v1/tickets/${id}`),
    update: (id: string, body: { excluded: boolean; exclusion_reason?: string }) =>
      request<TicketDetail>(`/api/v1/tickets/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
  },
  connections: {
    list: () => request<SourceConnection[]>('/api/v1/connections'),
    create: (body: { name: string; source_type: string; base_url?: string; email?: string; api_token?: string; credentials?: Record<string, string> }) =>
      request<SourceConnection>('/api/v1/connections', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    update: (id: string, body: Partial<Omit<SourceConnection, 'id' | 'created_at'> & { api_token?: string; credentials?: Record<string, string> }>) =>
      request<SourceConnection>(`/api/v1/connections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    delete: (id: string) =>
      request<null>(`/api/v1/connections/${id}`, { method: 'DELETE' }),
    duplicate: (id: string) =>
      request<SourceConnection>(`/api/v1/connections/${id}/duplicate`, { method: 'POST' }),
    datasets: (id: string) =>
      request<ImportSession[]>(`/api/v1/connections/${id}/datasets`),
    test: (id: string) =>
      request<{ display_name: string; email: string }>(`/api/v1/connections/${id}/test`, { method: 'POST' }),
    fetchStream: async (
      id: string,
      options: JiraFetchOptions | Record<string, unknown>,
      onProgress: (current: number, total: number, key: string) => void,
    ): Promise<unknown> => {
      const res = await fetch(`${BASE_URL}/api/v1/connections/${id}/fetch`, {
        method: 'POST',
        body: JSON.stringify(options),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error ?? 'Fetch failed')
      }
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const raw = line.slice(5).trim()
          if (!raw) continue
          const msg = JSON.parse(raw) as { type: string; current: number; total: number; key: string; result: unknown; message: string }
          if (msg.type === 'progress') onProgress(msg.current, msg.total, msg.key)
          else if (msg.type === 'done') return msg.result
          else if (msg.type === 'error') throw new Error(msg.message)
        }
      }
      throw new Error('Stream ended without result')
    },
  },
  llmConfig: {
    get: () => request<LlmConfig | null>('/api/v1/llm-config'),
    save: (body: {
      provider: string
      base_url?: string
      api_key?: string
      model: string
    }) => request<LlmConfig>('/api/v1/llm-config', {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }),
    delete: () => request<null>('/api/v1/llm-config', { method: 'DELETE' }),
    ollamaModels: (baseUrl?: string) => {
      const p = baseUrl ? `?base_url=${encodeURIComponent(baseUrl)}` : ''
      return request<{ models: string[] }>(`/api/v1/llm-config/ollama-models${p}`)
    },
    openaiModels: () => request<{ models: string[] }>('/api/v1/llm-config/openai-models'),
  },
  demo: {
    seed: () =>
      request<{ seeded: boolean; imports: { import_id: string; name: string; project_key: string }[] }>(
        '/api/v1/demo/seed',
        { method: 'POST' },
      ),
    reset: () => request<null>('/api/v1/demo/reset', { method: 'DELETE' }),
    fullReset: () => request<null>('/api/v1/demo/full-reset', { method: 'DELETE' }),
  },
  plugins: {
    list: () => request<import('@/types').PluginManifest[]>('/api/v1/plugins'),
    registry: () => request<import('@/types').PluginRegistryEntry[]>('/api/v1/plugins/registry'),
    installFromRegistry: (id: string) =>
      request<import('@/types').PluginManifest>(`/api/v1/plugins/registry/${id}/install`, { method: 'POST' }),
    installFromUrl: (github_url: string) =>
      request<import('@/types').PluginManifest>('/api/v1/plugins/install-url', {
        method: 'POST',
        body: JSON.stringify({ github_url }),
        headers: { 'Content-Type': 'application/json' },
      }),
    uninstall: (sourceType: string) =>
      request<null>(`/api/v1/plugins/${sourceType}`, { method: 'DELETE' }),
  },
  llm: {
    status: () => request<LLMStatus>('/api/v1/llm/status'),
    analyze: async (importId: string, onToken?: (token: string) => void): Promise<LLMInsight> => {
      const res = await fetch(`${BASE_URL}/api/v1/llm/analyze/${importId}`, { method: 'POST' })
      if (!res.ok) {
        const json = await res.json() as { error?: string }
        throw new Error(json.error ?? 'Analysis failed')
      }
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const raw = line.slice(5).trim()
          if (!raw) continue
          const msg = JSON.parse(raw) as { type: string; content?: string; insight_text?: string; model_used?: string; generated_at?: string; message?: string }
          if (msg.type === 'token' && msg.content) onToken?.(msg.content)
          else if (msg.type === 'done') return { insight_text: msg.insight_text!, model_used: msg.model_used!, generated_at: msg.generated_at! }
          else if (msg.type === 'error') throw new Error(msg.message)
        }
      }
      throw new Error('Stream ended without result')
    },
    getInsight: (importId: string) =>
      request<LLMInsight>(`/api/v1/llm/insights/${importId}`),
    chat: (importId: string, messages: { role: string; content: string }[]) =>
      request<{ reply: string }>(`/api/v1/llm/chat/${importId}`, {
        method: 'POST',
        body: JSON.stringify({ messages }),
        headers: { 'Content-Type': 'application/json' },
      }),
  },
}
