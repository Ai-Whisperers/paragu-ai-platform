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
    <header className="sticky top-0 z-50 border-b border-[#E8E3DA] bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B2A4A] text-[#C9A96E]">
            <Scale size={18} />
          </div>
          <div>
            <div className="text-[0.9375rem] font-bold leading-tight text-[#1B2A4A]">{s.shortName}</div>
            <div className="text-[0.625rem] uppercase tracking-[0.08em] text-[#C9A96E]">Jurídico Demo</div>
          </div>
        </Link>

        <nav className="hide-mobile flex gap-8">
          {nav.map((n, i) => (
            <Link key={i} href={n.href} className="text-sm font-medium text-[#4B5563] no-underline">
              {n.label}
            </Link>
          ))}
        <LocaleSwitcher /></nav>

        <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
          className="hide-mobile rounded-md bg-[#C9A96E] px-5 py-2 text-[0.8125rem] font-semibold text-[#1B2A4A] no-underline">
          Consulta Gratis
        </a>

        <button onClick={() => setOpen(!open)} className="hide-desktop cursor-pointer border-none bg-transparent">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="hide-desktop border-t border-[#E8E3DA] bg-white px-6 py-4">
          {nav.map((n, i) => (
            <Link key={i} href={n.href} onClick={() => setOpen(false)}
              className={`block py-3 text-[0.9375rem] text-[#1B2A4A] no-underline ${i < nav.length-1 ? "border-b border-[#F3F0EA]" : ""}`}>
              {n.label}
            </Link>
          ))}
          <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
            className="mt-4 block rounded-md bg-[#C9A96E] p-3 text-center text-sm font-semibold text-[#1B2A4A] no-underline">
            Consulta Gratis
          </a>
        </div>
      )}
    </header>
  )
}
