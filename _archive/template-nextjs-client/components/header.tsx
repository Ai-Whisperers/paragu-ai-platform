"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { SearchAutocomplete } from "@/components/search-autocomplete"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import content from "@/content/es.json"

const c = content as any
const allProducts = c.products || []

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nav = c.navigation.items || []

  const searchResults = searchQuery.trim().length > 0
    ? allProducts.filter((p: any) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/tienda?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm transition-all ${scrolled ? "shadow-sm" : ""}`}>
      {/* Search bar */}
      {searchOpen && (
        <div className="border-b border-border bg-surface px-4 py-3">
          <form onSubmit={handleSearch} className="mx-auto flex max-w-2xl gap-2">
            <input
              type="text" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscá productos..."
              className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-ring"
              autoFocus
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-border bg-surface shadow-lg overflow-hidden">
                {searchResults.map((p: any) => {
                  const slug = p.slug || p.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")
                  return (
                    <button key={p.id} type="button" onClick={() => { window.location.href = `/producto/${slug}` }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-surface-light transition-colors">
                      <span className="text-muted-foreground line-clamp-1">{p.name}</span>
                      <span className="ml-auto text-xs font-bold text-primary shrink-0">Gs. {p.price.toLocaleString("es-PY")}</span>
                    </button>
                  )
                })}
              </div>
            )}
            <button type="submit" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Buscar</button>
            <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery("") }}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">✕</button>
          </form>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-extrabold text-accent no-underline">
            Fun<span className="text-primary">4</span>Me
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n: any) => {
            const isActive = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href))
            return (
              <Link key={n.href} href={n.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-light relative ${
                  isActive ? "text-primary" : "text-foreground"
                }`}>
                {n.label}
                {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop search */}
          <div className="hidden md:block w-48 lg:w-64"><SearchAutocomplete /></div>

          <DarkModeToggle />

          <button onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <a href={c.navigation.ctaHref} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
            </svg>
            {c.navigation.ctaText}
          </a>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 py-2 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((n: any) => (
              <Link key={n.href} href={n.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-light"
                onClick={() => setMobileOpen(false)}>
                {n.label}
              </Link>
            ))}
            <a href={c.navigation.ctaHref} target="_blank" rel="noopener noreferrer"
              className="block rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground text-center mt-2">
              📱 {c.navigation.ctaText}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
