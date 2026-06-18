// Back to top button — appears after the user has scrolled 400px.
// Uses a smooth scroll and is keyboard accessible.

"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={
        "fixed bottom-20 md:bottom-6 right-4 z-40 w-12 h-12 rounded-full bg-accent text-white shadow-lg hover:bg-accent-2 hover:shadow-xl transition-all duration-200 flex items-center justify-center " +
        (visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none")
      }
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  )
}
