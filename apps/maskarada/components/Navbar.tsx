"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { content } from "@/lib/content";
import { useCartCount } from "@/lib/cart";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🎭</span>
          <div>
            <span className="font-bold text-lg text-gray-100 group-hover:text-gold-400 transition-colors">
              {content.hero.title}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500">
              {content.hero.subtitle}
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-5 text-sm uppercase tracking-widest">
          {content.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const isCart = item.href === "/tienda/carrito";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative hover:text-gold-400 transition-colors ${
                  active ? "text-gold-400" : "text-gray-400"
                }`}
              >
                {item.label}
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-blood-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-300 text-2xl"
          aria-label="Menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      <div
        className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5 overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: mobileOpen ? "500px" : "0",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div className="flex flex-col py-4 px-4 gap-3 text-sm uppercase tracking-widest">
          {content.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const isCart = item.href === "/tienda/carrito";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 ${
                  active ? "text-gold-400" : "text-gray-400"
                }`}
              >
                {item.label}
                {isCart && cartCount > 0 && (
                  <span className="bg-blood-500 text-white text-[10px] font-bold rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
