"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, X, Dumbbell } from "lucide-react"
import { LocaleSwitcher } from "@ai-whisperers/i18n-paraguay/LocaleSwitcher"
import { useTranslation, getLocale } from "@ai-whisperers/i18n-paraguay"
import { usePathname } from "next/navigation"

const navKeys = [
  { key: "nav.home", href: "/" },
  { key: "nav.services", href: "/servicios" },
  { key: "nav.gallery", href: "/galeria" },
  { key: "nav.about", href: "/nosotros" },
  { key: "nav.contact", href: "/contacto" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const locale = getLocale(pathname)
  const { t } = useTranslation(locale)

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="Ir al inicio">
          <Dumbbell className="w-6 h-6 text-[#e94560]" />
          <span className="font-heading text-lg font-bold text-[#1a1a2e]">Bicho's Gym</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {navKeys.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href === "/" ? "" : item.href}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#f1efe9]"
            >
              {t(item.key)}
            </Link>
          ))}
          <a
            href="https://wa.me/595986106062?text=Hola!%20Quiero%20informaci%C3%B3n"
            target="_blank" rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-1.5 bg-[#e94560] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d1344f] transition-all"
          >
            <Dumbbell className="w-4 h-4" /> {t("common.book")}
          </a>
          <LocaleSwitcher />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher />
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
          {navKeys.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href === "/" ? "" : item.href}`}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-[#f1efe9]"
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
