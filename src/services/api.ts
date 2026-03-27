import type {
  ProjectConfig,
  ImportSession,
  TicketDetail,
  MetricsSummary,
  CycleTimesResponse,
  TimeInStatusResponse,
  LLMStatus,
  LLMInsight,
  PaginatedTickets,
  CreateConfigRequest,
  SourceConnection,
  JiraFetchOptions,
} from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8765'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options)
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
    upload: (file: File, configId: string) => {
      const form = new FormData()
      form.append('file', file)
      form.append('config_id', configId)
      return request<ImportSession>('/api/v1/imports', { method: 'POST', body: form })
    },
    delete: (id: string) =>
      request<null>(`/api/v1/imports/${id}`, { method: 'DELETE' }),
    statuses: (id: string) =>
      request<string[]>(`/api/v1/imports/${id}/statuses`),
  },
  metrics: {
    summary: (importId: string) =>
      request<MetricsSummary>(`/api/v1/metrics/${importId}/summary`),
    cycleTimes: (importId: string) =>
      request<CycleTimesResponse>(`/api/v1/metrics/${importId}/cycle-times`),
    leadTimes: (importId: string) =>
      request<{ values: number[] }>(`/api/v1/metrics/${importId}/lead-times`),
    timeInStatus: (importId: string) =>
      request<TimeInStatusResponse>(`/api/v1/metrics/${importId}/time-in-status`),
  },
  tickets: {
    list: (importId: string, params?: { type?: string; page?: number; limit?: number; completed_only?: boolean }) => {
      const p = new URLSearchParams({ import_id: importId })
      if (params?.type) p.set('type', params.type)
      if (params?.page) p.set('page', String(params.page))
      if (params?.limit) p.set('limit', String(params.limit))
      if (params?.completed_only) p.set('completed_only', '1')
      return request<PaginatedTickets>(`/api/v1/tickets?${p}`)
    },
    get: (id: string) => request<TicketDetail>(`/api/v1/tickets/${id}`),
  },
  connections: {
    list: () => request<SourceConnection[]>('/api/v1/connections'),
    create: (body: Omit<SourceConnection, 'id' | 'created_at'> & { api_token: string }) =>
      request<SourceConnection>('/api/v1/connections', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    update: (id: string, body: Partial<Omit<SourceConnection, 'id' | 'created_at'> & { api_token?: string }>) =>
      request<SourceConnection>(`/api/v1/connections/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    delete: (id: string) =>
      request<null>(`/api/v1/connections/${id}`, { method: 'DELETE' }),
    test: (id: string) =>
      request<{ display_name: string; email: string }>(`/api/v1/connections/${id}/test`, { method: 'POST' }),
    fetchStream: async (
      id: string,
      options: JiraFetchOptions,
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
  llm: {
    status: () => request<LLMStatus>('/api/v1/llm/status'),
    analyze: (importId: string, model?: string) =>
      request<LLMInsight>(`/api/v1/llm/analyze/${importId}`, {
        method: 'POST',
        body: JSON.stringify({ model }),
        headers: { 'Content-Type': 'application/json' },
      }),
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
