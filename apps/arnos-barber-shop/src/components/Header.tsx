"use client"

import { useState } from "react"

type NavItem = { label: string; href: string }

type Navigation = {
  businessName: string
  items: NavItem[]
  ctaText: string
  ctaHref: string
}

export function Header({ navigation }: { navigation: Navigation }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <a className="brand" href="#inicio" aria-label={`${navigation.businessName}, inicio`}>
          <span className="brand-mark" aria-hidden="true">A</span>
          <span className="brand-text">
            <strong>{navigation.businessName}</strong>
            <small>Barber shop</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.items.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <a className="header-cta" href={navigation.ctaHref} target="_blank" rel="noopener noreferrer" data-cta="header-booking">
          {navigation.ctaText}
        </a>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menú principal">
          <nav className="site-container" aria-label="Navegación móvil">
            {navigation.items.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
            ))}
            <a className="mobile-booking" href={navigation.ctaHref} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              {navigation.ctaText}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
