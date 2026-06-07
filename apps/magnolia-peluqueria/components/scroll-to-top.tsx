"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Forces scroll to top on every route change.
 * Next.js App Router sometimes restores scroll position from bfcache
 * or sessionStorage, landing the user mid-page instead of at the top.
 *
 * Two layers of defense:
 * 1. Disable browser's native scroll restoration
 * 2. Explicit scrollTo on route change + pageshow (bfcache restore)
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Kill browser's auto-restore so it doesn't fight React
    if (typeof window !== "undefined" && window.history.scrollRestoration !== "manual") {
      window.history.scrollRestoration = "manual"
    }

    // Scroll on mount and route change
    window.scrollTo(0, 0)
  }, [pathname])

  // Also catch bfcache restores (back/forward without a network request)
  useEffect(() => {
    const onPageShow = () => window.scrollTo(0, 0)
    window.addEventListener("pageshow", onPageShow)
    return () => window.removeEventListener("pageshow", onPageShow)
  }, [])

  return null
}
