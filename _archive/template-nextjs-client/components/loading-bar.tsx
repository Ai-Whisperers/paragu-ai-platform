"use client"
import { useState, useEffect } from "react"

export function LoadingBar() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const handler = () => {
      setLoading(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setLoading(false), 500)
    }
    // Listen for route changes
    const origPushState = history.pushState
    history.pushState = function(...args) { handler(); return origPushState.apply(this, args) }
    window.addEventListener("popstate", handler)
    return () => { window.removeEventListener("popstate", handler); clearTimeout(timeout) }
  }, [])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-0.5 bg-primary">
      <div className="h-full bg-accent animate-loading-bar" />
    </div>
  )
}
