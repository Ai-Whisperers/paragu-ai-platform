"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import content from "@/content/es.json";

interface NavItem {
  href: string;
  label: string;
}

export default function Header() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const nav = (content.navigation || []) as NavItem[];
  const siteName = (content.site as any)?.shortName || "Rocka Bar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-background)]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <a
          href="/"
          className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold tracking-widest text-gold"
        >
          {siteName}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-widest text-[var(--color-text-light)] hover:text-gold transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden text-[var(--color-text)] p-2 tap rounded-lg hover:bg-[var(--color-surface-alt)]"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--color-background)]/98 backdrop-blur-md border-t border-[var(--color-border)] pb-safe">
          <div className="container-page py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="tap px-3 py-3 text-base uppercase tracking-widest text-[var(--color-text-light)] hover:text-gold hover:bg-[var(--color-surface-alt)] rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${(content.site as any)?.whatsapp || "595976309917"}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="tap mt-2 px-3 py-3 bg-gold text-[var(--color-primary-dark)] font-bold rounded-lg text-center tracking-wide"
            >
              Reservá por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
