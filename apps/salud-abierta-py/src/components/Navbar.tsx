// Navbar.tsx — sticky top nav, mobile-friendly, trauma-informed
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, AlertTriangle, Shield } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';

interface Props {
  locale: string;
}

export default function Navbar({ locale }: Props) {
  const [open, setOpen] = useState(false);

  const baseHref = `/${locale}`;
  const navItems = [
    { href: `${baseHref}/`, label: 'Inicio' },
    { href: `${baseHref}/casos`, label: 'Casos' },
    { href: `${baseHref}/hospitales`, label: 'Hospitales' },
    { href: `${baseHref}/reportar`, label: 'Reportar' },
    { href: `${baseHref}/nosotros`, label: 'Nosotros' },
    { href: `${baseHref}/metodologia`, label: 'Metodología' },
  ];

  return (
    <nav className="border-b border-[var(--color-border-light)] bg-[var(--color-surface)] sticky top-0 z-30 backdrop-blur">
      <div className="container">
        <div className="flex items-center justify-between py-3">
          <Link href={baseHref} className="flex items-center gap-2 no-underline">
            <Shield className="w-6 h-6 text-[var(--color-accent)]" />
            <span className="font-bold text-base text-[var(--color-primary)]">
              SaludAbierta<span className="text-[var(--color-accent)]"> PY</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] no-underline">
                {item.label}
              </Link>
            ))}
            <LocaleSwitcher currentLocale={locale} />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="md:hidden pb-4 border-t border-[var(--color-border-light)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-sm font-medium text-[var(--color-text-muted)] no-underline border-b border-[var(--color-border-light)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <LocaleSwitcher currentLocale={locale} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
