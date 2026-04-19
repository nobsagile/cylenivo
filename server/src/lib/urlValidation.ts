const BLOCKED_HOSTS = new Set([
  '169.254.169.254',
  'fd00:ec2::254',
  'metadata.google.internal',
  'metadata.azure.com',
])

export function validateHttpUrl(raw: string | undefined | null, field = 'url'): void {
  if (!raw) return
  let u: URL
  try { u = new URL(raw) } catch { throw new Error(`${field} must be a valid URL`) }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    throw new Error(`${field} must use http or https`)
  }
  if (BLOCKED_HOSTS.has(u.hostname)) {
    throw new Error(`${field} points to a blocked metadata host`)
  }
}
