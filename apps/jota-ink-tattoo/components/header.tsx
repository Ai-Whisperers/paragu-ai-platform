"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import content from "@/content/es.json"

const c = content as Record<string, unknown>

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nav = c.navigation.items || []

  return (
    <header className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm transition-all ${scrolled ? "shadow-lg shadow-black/20" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-extrabold text-accent no-underline tracking-wider">
            JOTA <span className="text-foreground">INK</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n: any) => {
            const isActive = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href))
            return (
              <Link key={n.href} href={n.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-accent relative ${
                  isActive ? "text-accent" : "text-foreground/70"
                }`}>
                {n.label}
                {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full" />}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={c.navigation.ctaHref} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors">
            {c.navigation.ctaText}
          </a>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium md:hidden text-foreground/70 hover:text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 py-2 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((n: any) => (
              <Link key={n.href} href={n.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:text-accent"
                onClick={() => setMobileOpen(false)}>
                {n.label}
              </Link>
            ))}
            <a href={c.navigation.ctaHref} target="_blank" rel="noopener noreferrer"
              className="block rounded-md bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground text-center mt-2">
              {c.navigation.ctaText}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
