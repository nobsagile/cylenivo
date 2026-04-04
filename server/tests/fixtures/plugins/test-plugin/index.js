export async function test(credentials) {
  if (!credentials.api_key) throw new Error('Missing api_key')
  return { ok: true, display_name: 'Test User' }
}

export async function fetch(credentials, options, onProgress) {
  onProgress(1, 2, 'TEST-1')
  onProgress(2, 2, 'TEST-2')
  return {
    source_type: 'test-plugin',
    project_key: options.project ?? 'TEST',
    exported_at: new Date().toISOString(),
    tickets: [
      {
        external_id: 'TEST-1',
        title: 'Test ticket',
        ticket_type: 'story',
        created_at: '2024-01-01T00:00:00.000Z',
        transitions: [
          { from_status: null, to_status: 'Todo', transitioned_at: '2024-01-01T00:00:00.000Z' },
          { from_status: 'Todo', to_status: 'Done', transitioned_at: '2024-01-03T00:00:00.000Z' },
        ],
      },
    ],
  }
}
