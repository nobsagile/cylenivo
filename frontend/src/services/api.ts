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
} from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options)
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
  },
  metrics: {
    summary: (importId: string) =>
      request<MetricsSummary>(`/api/v1/metrics/${importId}/summary`),
    cycleTimes: (importId: string) =>
      request<CycleTimesResponse>(`/api/v1/metrics/${importId}/cycle-times`),
    timeInStatus: (importId: string) =>
      request<TimeInStatusResponse>(`/api/v1/metrics/${importId}/time-in-status`),
  },
  tickets: {
    list: (importId: string, params?: { type?: string; page?: number; limit?: number }) => {
      const p = new URLSearchParams({ import_id: importId })
      if (params?.type) p.set('type', params.type)
      if (params?.page) p.set('page', String(params.page))
      if (params?.limit) p.set('limit', String(params.limit))
      return request<PaginatedTickets>(`/api/v1/tickets?${p}`)
    },
    get: (id: string) => request<TicketDetail>(`/api/v1/tickets/${id}`),
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
