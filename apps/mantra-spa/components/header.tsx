"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"

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
    <header className="sticky top-0 z-40 border-b border-[#e5e2da] bg-white/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
          <img src="/images/logo.svg" alt="Mantra Spa" className="h-9 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#f1efe9]">
              {item.label}
            </Link>
          ))}
          <a href="https://wa.me/595986106062?text=Hola!%20Quiero%20informaci%C3%B3n"
            target="_blank" rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-1.5 bg-[#c9a96e] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b8944e] transition-all">
            <MessageCircle className="w-4 h-4" /> Reservar
          </a>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <a href="https://wa.me/595986106062?text=Hola!%20Quiero%20informaci%C3%B3n"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#c9a96e] text-white p-2 rounded-lg">
            <MessageCircle className="w-5 h-5" />
          </a>
          <button onClick={() => setOpen(!open)} className="p-2 text-foreground" aria-label="Menú">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#e5e2da] bg-white px-4 py-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-[#f1efe9]">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
