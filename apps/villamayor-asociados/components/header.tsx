"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Scale } from "lucide-react"
import content from "@/content/es.json"
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@ai-whisperers/i18n-paraguay/LocaleSwitcher";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false)
  const s = content.site

  const nav = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
  ]

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-secondary">
            <Scale size={18} />
          </div>
          <div>
            <div className="font-bold text-[0.9375rem] text-primary leading-tight">{s.shortName}</div>
            <div className="text-[0.625rem] text-secondary tracking-[0.08em] uppercase">& Asociados</div>
          </div>
        </Link>

        <nav className="hide-mobile flex gap-8">
          {nav.map((n, i) => (
            <Link key={i} href={n.href} className="text-gray-600 no-underline text-sm font-medium">
              {n.label}
            </Link>
          ))}
        <LocaleSwitcher /></nav>

        <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
          className="hide-mobile bg-secondary text-primary py-2 px-5 rounded-md font-semibold no-underline text-[0.8125rem]">
          Consulta Gratis
        </a>

        <button onClick={() => setOpen(!open)} className="hide-desktop bg-transparent border-none cursor-pointer">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="hide-desktop py-4 px-6 bg-white border-t border-border">
          {nav.map((n, i) => (
            <Link key={i} href={n.href} onClick={() => setOpen(false)}
              className={`block py-3 text-primary no-underline text-[0.9375rem] ${i < nav.length-1 ? "border-b border-muted" : ""}`}>
              {n.label}
            </Link>
          ))}
          <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
            className="block mt-4 bg-secondary text-primary py-3 rounded-md font-semibold no-underline text-center text-sm">
            Consulta Gratis
          </a>
        </div>
      )}
    </header>
  )
}
