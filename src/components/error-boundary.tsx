import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(_error: Error, _info: ErrorInfo) {
    void _error
    void _info
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/80 bg-white/80 p-8 text-[#111111] shadow-[0_12px_26px_rgba(17,17,17,0.08)] backdrop-blur-xl">
          <h2 className="text-lg font-semibold">Something went wrong.</h2>
          <p className="mt-2 text-sm text-[#4B4B4B]">Try refreshing the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}
