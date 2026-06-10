"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import content from "@/content/es.json"
import { LocaleSwitcher } from "@ai-whisperers/i18n-paraguay/LocaleSwitcher";

const c = content as Record<string, any>
const nav = c.navigation?.items || []

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header className={`sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm transition-all ${scrolled ? "shadow-sm" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-[#00A3E0] no-underline flex items-center gap-1">
          <span>Pitchy</span>
          <span className="text-[#0F62FE]">Blindex</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n: any) => {
            const isActive = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href))
            return (
              <Link key={n.href} href={n.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F8F9FA] relative ${
                  isActive ? "text-[#0F62FE]" : "text-[#1A1A2E]"
                }`}>
                {n.label}
                {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0F62FE] rounded-full" />}
              </Link>
            )
          })}
        <LocaleSwitcher /></nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop CTA */}
          <a href={c.navigation?.ctaHref || "#"} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-[#0F62FE] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
            </svg>
            {c.navigation?.ctaText || "Cotizá tu proyecto"}
          </a>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium md:hidden text-[#1A1A2E]">
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 md:hidden shadow-lg">
          <div className="flex flex-col gap-1">
            {nav.map((n: any) => {
              const isActive = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href))
              return (
                <Link key={n.href} href={n.href}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "text-[#0F62FE] bg-blue-50" : "text-[#1A1A2E] hover:bg-[#F8F9FA]"
                  }`}>
                  {n.label}
                </Link>
              )
            })}
            <div className="border-t border-gray-100 my-2 pt-2">
              <a href={c.navigation?.ctaHref || "#"} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-md bg-[#0F62FE] px-3 py-3 text-sm font-semibold text-white mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                </svg>
                {c.navigation?.ctaText || "Cotizá tu proyecto"}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
