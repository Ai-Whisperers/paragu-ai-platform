'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

const DEFAULT_NAV: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '/contacto' },
];

export function Header({ navigation }: { navigation?: { items?: NavItem[]; businessName?: string; ctaText?: string; ctaHref?: string } }) {
  const [open, setOpen] = useState(false);
  const items = navigation?.items?.length ? navigation.items : DEFAULT_NAV;
  const businessName = navigation?.businessName || 'HidroBaby Spa';
  const ctaText = navigation?.ctaText || 'Reservar';
  const ctaHref = navigation?.ctaHref || 'https://wa.me/595993444222?text=Hola!%20Quiero%20reservar%20en%20HidroBaby%20Spa';

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#1f2937] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <span className="text-white/90 font-display text-xl tracking-wider">{businessName}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {items.map((item) => (
                <Link key={item.href} href={item.href}
                  className="text-white/80 hover:text-white transition-colors no-underline text-sm font-medium">
                  {item.label}
                </Link>
              ))}
            </nav>

            <a href={ctaHref} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-3 py-2 rounded-full hover:bg-[#22c55e] transition-all no-underline">
              <span aria-hidden="true" className="text-base leading-none">💬</span>
              <span>{ctaText}</span>
            </a>

            <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden bg-[#111827] border-t border-white/10">
            <div className="px-4 py-4 space-y-2">
              {items.map((item) => (
                <Link key={item.href} href={item.href}
                  className="block text-white/80 hover:text-white py-2 text-sm no-underline"
                  onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <a href={ctaHref} target="_blank" rel="noopener noreferrer"
                className="block bg-[#25D366] text-white text-center font-semibold py-3 rounded-lg mt-4 no-underline text-sm">
                {ctaText}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
