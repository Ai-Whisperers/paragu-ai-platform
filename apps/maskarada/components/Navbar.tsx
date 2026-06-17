"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getContent, type Locale } from "@/lib/content";
import { useCartCount } from "@/lib/cart";
import Search from "./Search";

const COPY = {
  es: { more: "Más páginas", cart: "Carrito", menu: "Menú", close: "Cerrar" },
  en: { more: "More pages", cart: "Cart", menu: "Menu", close: "Close" },
} as const;

export default function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const c = getContent(locale);
  const copy = COPY[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartCount();

  // Strip /en prefix for active-check so nav state matches the underlying page
  const normPath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const isActive = (href: string) => normPath === href || normPath.startsWith(href + "/");

  // When on /en, link to /en/* equivalents for nav
  const prefix = locale === "en" ? "/en" : "";
  const linkHref = (href: string) => `${prefix}${href === "/" ? "" : href}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={linkHref("/")} className="flex items-center gap-2 group">
          <span className="text-2xl">🎭</span>
          <div>
            <span className="font-bold text-lg text-gray-100 group-hover:text-gold-400 transition-colors">
              {c.hero.title}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500">
              {c.hero.subtitle}
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-5 text-sm uppercase tracking-widest">
          {c.nav.map((item) => (
            <Link
              key={item.href}
              href={linkHref(item.href)}
              className={`hover:text-gold-400 transition-colors ${
                isActive(item.href) ? "text-gold-400" : "text-gray-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Search />
          <Link
            href={linkHref("/tienda/carrito")}
            className="relative p-2 text-gray-400 hover:text-gold-400 transition-colors"
            aria-label={copy.cart}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-blood-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-300 text-2xl"
            aria-label={mobileOpen ? copy.close : copy.menu}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div
        className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5 overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: mobileOpen ? "500px" : "0", opacity: mobileOpen ? 1 : 0 }}
      >
        <div className="flex flex-col py-4 px-4 gap-3 text-sm uppercase tracking-widest">
          {c.nav.map((item) => (
            <Link
              key={item.href}
              href={linkHref(item.href)}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 ${isActive(item.href) ? "text-gold-400" : "text-gray-400"}`}
            >
              {item.label}
            </Link>
          ))}
          {c.footerNav.map((item) => (
            <Link
              key={item.href}
              href={linkHref(item.href)}
              onClick={() => setMobileOpen(false)}
              className="text-gray-500 text-xs"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
