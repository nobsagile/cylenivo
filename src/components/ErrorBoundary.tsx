import { Component, type ReactNode } from 'react'
import i18next from 'i18next'

interface Props { children: ReactNode }
interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 text-center px-8">
          <p className="text-lg font-semibold text-gray-900">{i18next.t('errors.somethingWentWrong')}</p>
          <p className="text-sm text-gray-500 max-w-md">{this.state.error.message}</p>
          <button
            onClick={() => { this.setState({ error: null }); window.location.href = '/' }}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700"
          >
            {i18next.t('common.reload')}
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
