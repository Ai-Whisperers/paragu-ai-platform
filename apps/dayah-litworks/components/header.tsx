'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import raw from "@/content/es.json"
import type { Content } from "@/types/content"

const content = raw as unknown as Content
const nav = content.navigation

export function Header() {
  const [open, setOpen] = useState(false)

  // cerrar drawer al hacer clic en enlace
  const close = () => setOpen(false)

  // cerrar con Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  // bloquear scroll cuando el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" onClick={close} className="flex items-center gap-2" aria-label="Dayah LitWorks — Ir al inicio">
            <img src="/dayah/logo-color.png" alt="" className="h-9 w-9 rounded-lg object-contain sm:h-10 sm:w-10" />
            <span className="hidden text-lg font-bold text-foreground sm:inline">{content.navigation.businessName}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
            {nav.items.map((item) => (
              <Link key={item.href} href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary hover:bg-surface-light">
                {item.label}
              </Link>
            ))}
            <a href={nav.ctaHref} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
              className="ml-3 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105">
              {nav.ctaText}
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-surface-light md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={close}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Drawer panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-background border-l border-border shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <span className="font-bold text-foreground">Menú</span>
            <button onClick={close} className="rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label="Cerrar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Navegación móvil">
            {nav.items.map((item) => (
              <Link key={item.href} href={item.href} onClick={close}
                className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-light hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border px-3 pt-4">
            <a href={nav.ctaHref} target="_blank" rel="noopener noreferrer" onClick={close}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M9.5 13.5c.5 1 1.5 1.5 2.5 1.5s2-.5 2.5-1.5"/></svg>
              {nav.ctaText}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
