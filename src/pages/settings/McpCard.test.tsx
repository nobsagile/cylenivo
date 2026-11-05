import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderUI, setupUser } from '@/test/ui'
import { api } from '@/services/api'
import { McpCard } from './McpCard'

vi.mock('@/services/api', () => ({
  api: { mcp: { setup: vi.fn() } },
}))

const setup = vi.mocked(api.mcp.setup)
const EXE = '/Applications/Cylenivo.app/Contents/MacOS/cylenivo-server'

beforeEach(() => {
  setup.mockReset()
  setup.mockResolvedValue({ command: EXE, args: ['--mcp'], env: null, db_path: '/db', warning: null })
})

describe('McpCard', () => {
  it('shows the Claude Desktop snippet by default with the server-reported path', async () => {
    renderUI(<McpCard />)
    const pre = await screen.findByTestId('mcp-snippet')
    expect(JSON.parse(pre.textContent!)).toEqual({ mcpServers: { cylenivo: { command: EXE, args: ['--mcp'] } } })
    expect(screen.getByText(/claude_desktop_config\.json/)).toBeInTheDocument()
  })

  it('switching to VS Code changes format and instructions', async () => {
    const user = setupUser()
    renderUI(<McpCard />)
    await screen.findByTestId('mcp-snippet')
    await user.selectOptions(screen.getByLabelText('AI client'), 'vscode')
    expect(JSON.parse(screen.getByTestId('mcp-snippet').textContent!).servers.cylenivo.type).toBe('stdio')
    expect(screen.getByText(/MCP: Open User Configuration/)).toBeInTheDocument()
  })

  it('copy writes the snippet to the clipboard', async () => {
    const user = setupUser()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    renderUI(<McpCard />)
    await screen.findByTestId('mcp-snippet')
    await user.click(screen.getByRole('button', { name: 'Copy' }))
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining(EXE))
    expect(await screen.findByText('Copied')).toBeInTheDocument()
  })

  it('warns when macOS runs the app from a translocated path', async () => {
    setup.mockResolvedValue({ command: '/private/AppTranslocation/x', args: ['--mcp'], env: null, db_path: '/db', warning: 'translocated' })
    renderUI(<McpCard />)
    expect(await screen.findByText(/Move it to the Applications folder/)).toBeInTheDocument()
  })

  it('shows an error when the setup cannot be loaded', async () => {
    setup.mockRejectedValue(new Error('down'))
    renderUI(<McpCard />)
    await waitFor(() => expect(screen.getByText(/Could not load the setup/)).toBeInTheDocument())
  })
})
