"use client"

import { Component, ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
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
    this.props.onError?.(error, errorInfo)
    if (typeof window !== "undefined") {
      console.error("[ErrorBoundary]", error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{
            padding: "2rem",
            textAlign: "center",
            color: "hsl(var(--muted-foreground, 220 9% 46%))",
            fontFamily: "system-ui, sans-serif",
          }}>
            <h2 style={{ marginBottom: "0.5rem", color: "hsl(var(--foreground, 0 0% 9%))" }}>
              Algo salió mal
            </h2>
            <p style={{ fontSize: "14px" }}>
              Por favor, recargá la página o escribinos por WhatsApp.
            </p>
          </div>
        )
      )
    }
    return this.props.children
  }
}