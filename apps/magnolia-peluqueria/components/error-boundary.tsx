"use client"
import { Component, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("[ErrorBoundary]", error.message, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-[200px] flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-2xl mb-2">⚠️</p>
              <p className="text-foreground-light text-sm">
                Algo salió mal. Intentá recargar la página.
              </p>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}