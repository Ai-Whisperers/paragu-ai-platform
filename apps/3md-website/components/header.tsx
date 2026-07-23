"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { LocaleSwitcher } from "@ai-whisperers/i18n-paraguay/LocaleSwitcher"

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-foreground">3<span className="text-secondary">MIND</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hover:bg-surface-light">
              {item.label}
            </Link>
          ))}
          <a href="https://wa.me/595991691501" target="_blank" rel="noopener noreferrer"
            className="ml-3 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary-dark transition-all">
            Contactanos
          </a>
        <LocaleSwitcher /></nav>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-surface-light">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
