"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
          <img src="/images/logo.svg" alt="Complejo Cocodrilo" className="h-9 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">
              {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="Menú">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-muted">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
