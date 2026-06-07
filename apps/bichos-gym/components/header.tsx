"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X, Dumbbell } from "lucide-react"

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Horarios", href: "/horarios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
          <Dumbbell className="w-6 h-6 text-[#e94560]" />
          <span className="font-heading text-lg font-bold text-[#1a1a2e]">Bicho's Gym</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#f1efe9]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/595986106062?text=Hola!%20Quiero%20informaci%C3%B3n"
            target="_blank" rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-1.5 bg-[#e94560] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d1344f] transition-all"
          >
            <Dumbbell className="w-4 h-4" /> Sumate
          </a>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://wa.me/595986106062?text=Hola!%20Quiero%20informaci%C3%B3n"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#e94560] text-white p-2 rounded-lg"
          >
            <Dumbbell className="w-5 h-5" />
          </a>
          <button className="p-2 text-foreground" aria-label="Menú" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#e5e7eb] bg-white px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-[#f1efe9]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
