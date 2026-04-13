import type { PluginManifest } from '@/types'

export const JIRA_MANIFEST: PluginManifest = {
  source_type: 'jira',
  name: 'Jira',
  credentials: [
    {
      key: 'auth_type',
      label: 'Authentication type',
      type: 'select',
      default: 'cloud',
      options: [
        { value: 'cloud', label: 'Atlassian Cloud (API token)' },
        { value: 'server', label: 'Jira Server / Data Center (Personal Access Token)' },
      ],
    },
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
      showWhen: { field: 'auth_type', value: 'cloud' },
    },
    {
      key: 'api_token',
      label: 'API Token / Personal Access Token',
      type: 'password',
      help: 'Atlassian Cloud: generate an API token at id.atlassian.com. Jira Server / Data Center: generate a Personal Access Token in your Jira profile under Profile → Personal Access Tokens.',
      link: {
        url: 'https://id.atlassian.com/manage-profile/security/api-tokens',
        label: 'Atlassian API tokens (Cloud only)',
      },
    },
  ],
  fetch_options: [],
}
