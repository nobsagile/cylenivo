/**
 * Jira export script — produces ImportFile JSON for Cylenivo
 *
 * Thin CLI wrapper around the same connector the app uses
 * (server/src/connectors/jira.ts). Do not reimplement fetching here: the
 * connector handles Cloud (nextPageToken) and Server/Data Center (startAt)
 * pagination, changelog pagination, 429/5xx retries with Retry-After, and
 * concurrency. An earlier standalone version of this script did none of that
 * and silently truncated every export to a single page.
 *
 * Usage:
 *   JIRA_BASE_URL=https://your-org.atlassian.net \
 *   JIRA_EMAIL=you@example.com \
 *   JIRA_TOKEN=your-api-token \
 *   npx tsx server/scripts/jira-export.ts --project TN --limit 20 --output export.json
 *
 * Options:
 *   --project    Jira project key (required)
 *   --output     Output file (default: jira-export.json)
 *   --types      Comma-separated issue types (default: all types)
 *   --limit      Stop after N issues (default: all)
 *   --from       Only issues resolved on/after this date (YYYY-MM-DD)
 *   --to         Only issues resolved on/before this date (YYYY-MM-DD)
 *   --auth-type  cloud | server (default: cloud)
 */

import { writeFileSync } from 'fs'
import { buildImportFile } from '../src/connectors/jira.js'
import type { JiraCredentials, JiraFetchOptions } from '../src/connectors/jira.js'

const args = process.argv.slice(2)

function getArg(name: string): string | undefined {
  const i = args.indexOf(`--${name}`)
  return i !== -1 && args[i + 1] ? args[i + 1] : undefined
}

function requireArg(name: string): string {
  const value = getArg(name)
  if (!value) {
    console.error(`Missing required argument: --${name}`)
    process.exit(1)
  }
  return value
}

async function main() {
  const project = requireArg('project')
  const output = getArg('output') ?? 'jira-export.json'
  const types = getArg('types')
  const limitArg = getArg('limit')
  const authType = getArg('auth-type') ?? 'cloud'

  if (authType !== 'cloud' && authType !== 'server') {
    console.error(`--auth-type must be "cloud" or "server", got "${authType}"`)
    process.exit(1)
  }

  let limit: number | undefined
  if (limitArg !== undefined) {
    limit = Number(limitArg)
    if (!Number.isInteger(limit) || limit < 1) {
      console.error(`--limit must be a positive integer, got "${limitArg}"`)
      process.exit(1)
    }
  }

  const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_TOKEN } = process.env
  if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_TOKEN) {
    console.error('Required env vars: JIRA_BASE_URL, JIRA_EMAIL, JIRA_TOKEN')
    process.exit(1)
  }

  const creds: JiraCredentials = {
    base_url: JIRA_BASE_URL.replace(/\/+$/, ''),
    email: JIRA_EMAIL,
    api_token: JIRA_TOKEN,
    auth_type: authType,
  }

  const options: JiraFetchOptions = {
    project,
    issue_types: types ? types.split(',').map(t => t.trim()).filter(Boolean) : undefined,
    resolved_from: getArg('from'),
    resolved_to: getArg('to'),
    limit,
  }

  console.log(`Exporting ${limit ? `up to ${limit} ` : ''}issues from project ${project} (${authType})...`)

  let stats: { found: number; skipped: string[] } = { found: 0, skipped: [] }
  const file = await buildImportFile(
    creds,
    options,
    (current, total, key) => process.stdout.write(`\r  [${current}/${total}] ${key}          `),
    s => { stats = s },
  )
  process.stdout.write('\n')

  writeFileSync(output, JSON.stringify(file, null, 2))
  console.log(`Wrote ${file.tickets.length} of ${stats.found} issues to ${output}`)

  if (stats.skipped.length > 0) {
    // Exit non-zero: metrics computed from an incomplete export are wrong, and
    // a zero exit code here would let a CI job or wrapper treat it as success.
    console.error(
      `\nINCOMPLETE EXPORT — ${stats.skipped.length} issue(s) could not be fetched: ${stats.skipped.join(', ')}`
    )
    console.error('Cycle times from this file will be wrong. Re-run before importing.')
    process.exitCode = 1
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
