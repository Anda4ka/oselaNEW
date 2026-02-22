'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <div className="text-red-500 text-2xl mb-2">⚠️</div>
          <p className="text-red-700 font-medium mb-1">Щось пішло не так</p>
          <p className="text-red-500 text-sm mb-4">Спробуйте перезавантажити сторінку</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Спробувати знову
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
