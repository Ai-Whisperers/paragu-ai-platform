'use client'
import React from "react"

interface NavItem { label: string; href: string }
interface HeaderProps {
  logo?: string
  logoHref?: string
  businessName?: string
  navItems: NavItem[]
  cta?: { label: string; href: string }
  locales?: { code: string; label: string; flag: string }[]
}

export function Header({ logo, businessName, navItems, cta, locales }: HeaderProps) {
  const [open, setOpen] = React.useState(false)
  const [locOpen, setLocOpen] = React.useState(false)
  
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          {logo && <img src={logo} alt="" className="h-8 w-auto" />}
          {businessName}
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((n, i) => (
            <a key={i} href={n.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-light hover:text-foreground">
              {n.label}
            </a>
          ))}
          {locales && locales.length > 0 && (
            <div className="relative ml-2" onMouseEnter={() => setLocOpen(true)} onMouseLeave={() => setLocOpen(false)}>
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                {locales[0].flag} {locales[0].code}
              </button>
              {locOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 min-w-[100px] rounded-lg border border-border bg-white py-1 shadow-lg">
                  {locales.map((l) => (
                    <a key={l.code} href={"/" + l.code} className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-surface-light hover:text-foreground">
                      {l.flag} {l.code}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {cta && (
            <a href={cta.href} target={cta.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" 
               className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90">
              {cta.label}
            </a>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-white px-4 pb-4 pt-2 md:hidden">
          {navItems.map((n, i) => (
            <a key={i} href={n.href} className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface-light"
               onClick={() => setOpen(false)}>{n.label}</a>
          ))}
          {cta && <a href={cta.href} target={cta.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                     className="mt-2 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">{cta.label}</a>}
        </div>
      )}
    </header>
  )
}
