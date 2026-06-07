"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import content from "@/content/es.json";

interface NavItem {
  href: string;
  label: string;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = (content.navigation || []) as NavItem[];
  const site = (content.site || {}) as Record<string, string>;
  const siteName = site?.shortName || "Trentina";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-background)]/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <a
          href="/"
          className="text-xl md:text-2xl font-[var(--font-heading)] font-bold text-[var(--color-accent)] tracking-wider"
        >
          {siteName}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-widest text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          {site.whatsapp && (
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 0 1" />
                <path d="M14 10a.5.5 0 0 0 0 1" />
                <path d="M13.5 13.5c-.7.7-1.5 1-2.5 1s-1.8-.3-2.5-1" />
              </svg>
            </a>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[var(--color-text)] p-2 hover:text-[var(--color-accent)] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="container-page py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-widest text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors py-3 px-2 rounded-lg hover:bg-[var(--color-surface-light)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {site.whatsapp && (
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors py-3 px-2 rounded-lg hover:bg-[var(--color-surface-light)]"
                onClick={() => setOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 0 1" />
                  <path d="M14 10a.5.5 0 0 0 0 1" />
                  <path d="M13.5 13.5c-.7.7-1.5 1-2.5 1s-1.8-.3-2.5-1" />
                </svg>
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
