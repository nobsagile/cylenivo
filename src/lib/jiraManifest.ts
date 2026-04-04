import type { PluginManifest } from '@/types'

export const JIRA_MANIFEST: PluginManifest = {
  source_type: 'jira',
  name: 'Jira',
  credentials: [
    {
      key: 'base_url',
      label: 'Jira Base URL',
      type: 'url',
      placeholder: 'https://yourcompany.atlassian.net',
      help: 'The base URL of your Jira instance.',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'string',
      placeholder: 'you@company.com',
      help: 'The email address of your Atlassian account.',
    },
    {
      key: 'api_token',
      label: 'API Token',
      type: 'password',
      help: 'Your Atlassian API token. Generate one at your Atlassian profile.',
      link: {
        url: 'https://id.atlassian.com/manage-profile/security/api-tokens',
        label: 'Atlassian API tokens',
      },
    },
  ],
  fetch_options: [],
}
