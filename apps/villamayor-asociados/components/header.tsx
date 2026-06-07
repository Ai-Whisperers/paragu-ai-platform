"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Scale } from "lucide-react"
import content from "@/content/es.json"

export default function Header() {
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
    <header style={{ backgroundColor: "white", borderBottom: "1px solid #E8E3DA", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E" }}>
            <Scale size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#1B2A4A", lineHeight: 1.2 }}>{s.shortName}</div>
            <div style={{ fontSize: "0.625rem", color: "#C9A96E", letterSpacing: "0.08em", textTransform: "uppercase" }}>& Asociados</div>
          </div>
        </Link>

        <nav className="hide-mobile" style={{ display: "flex", gap: "2rem" }}>
          {nav.map((n, i) => (
            <Link key={i} href={n.href} style={{ color: "#4B5563", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>
              {n.label}
            </Link>
          ))}
        </nav>

        <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
          className="hide-mobile"
          style={{ backgroundColor: "#C9A96E", color: "#1B2A4A", padding: "0.5rem 1.25rem", borderRadius: "6px", fontWeight: 600, textDecoration: "none", fontSize: "0.8125rem" }}>
          Consulta Gratis
        </a>

        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer" }} className="hide-desktop">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ padding: "1rem 1.5rem", backgroundColor: "white", borderTop: "1px solid #E8E3DA" }} className="hide-desktop">
          {nav.map((n, i) => (
            <Link key={i} href={n.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "0.75rem 0", color: "#1B2A4A", textDecoration: "none", borderBottom: i < nav.length-1 ? "1px solid #F3F0EA" : "none", fontSize: "0.9375rem" }}>
              {n.label}
            </Link>
          ))}
          <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", marginTop: "1rem", backgroundColor: "#C9A96E", color: "#1B2A4A", padding: "0.75rem", borderRadius: "6px", fontWeight: 600, textDecoration: "none", textAlign: "center", fontSize: "0.875rem" }}>
            Consulta Gratis
          </a>
        </div>
      )}
    </header>
  )
}
