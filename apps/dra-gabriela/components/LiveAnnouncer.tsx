"use client"

// LiveAnnouncer — provides a global polite aria-live region for assistive-tech
// announcements. Other components can dispatch a `CustomEvent("erebus:announce",
// { detail: { message, priority? } })` to send a message; the region updates
// and screen readers announce it.
//
// WCAG 2.2 SC 4.1.3 Status Messages — status updates must be programmatically
// determinable through role or properties. We use role="status" with
// aria-live="polite" for non-urgent updates. The assertive region is hidden
// unless someone explicitly announces an emergency.

import { useEffect, useState } from "react"

type Priority = "polite" | "assertive"

export function LiveAnnouncer({ locale: _locale }: { locale: string }) {
  const [politeMsg, setPoliteMsg] = useState("")
  const [assertiveMsg, setAssertiveMsg] = useState("")

  useEffect(() => {
    function onAnnounce(e: Event) {
      const detail = (e as CustomEvent).detail as
        | { message: string; priority?: Priority }
        | undefined
      if (!detail?.message) return
      const priority: Priority = detail.priority ?? "polite"
      // Clear first so identical consecutive messages re-announce.
      if (priority === "assertive") {
        setAssertiveMsg("")
        // Force re-render after clear
        requestAnimationFrame(() => setAssertiveMsg(detail.message))
      } else {
        setPoliteMsg("")
        requestAnimationFrame(() => setPoliteMsg(detail.message))
      }
    }
    window.addEventListener("erebus:announce", onAnnounce as EventListener)
    return () => {
      window.removeEventListener("erebus:announce", onAnnounce as EventListener)
    }
  }, [])

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeMsg}
      </div>
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMsg}
      </div>
    </>
  )
}

/** Helper for components to announce status changes. */
export function announce(message: string, priority: Priority = "polite") {
  if (typeof window === "undefined") return
  window.dispatchEvent(
    new CustomEvent("erebus:announce", { detail: { message, priority } })
  )
}