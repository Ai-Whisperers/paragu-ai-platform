"use client";

import { useState } from "react";
import Link from "next/link";
import { LangSwitcher } from "./LangSwitcher";

type NavItem = { label: string; href: string; highlight?: boolean };

function localizedHref(href: string, locale: string): string {
  if (href === "/" || !href) {
    return locale === "es" ? "/" : "/gn";
  }
  return locale === "es" ? href : `/gn${href}`;
}

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  const pathOnly = pathname.replace(/^\/gn(?=\/|$)/, "");
  if (pathOnly === "/" && href === "/") return true;
  if (pathOnly === "/" || href === "/") return false;
  return pathOnly === href || pathOnly.startsWith(href + "/");
}

export function MobileMenu({
  items,
  currentLocale,
  currentPath,
}: {
  items: NavItem[];
  currentLocale: "es" | "gn";
  currentPath: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="lg:hidden p-2 rounded-md text-text-light hover:bg-warm"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden absolute top-full left-0 right-0 bg-[var(--color-surface)] border-b border-[var(--color-warm-deep)] shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            {items.map((item) => {
              const active = isActive(currentPath, item.href);
              return (
                <Link
                  key={item.href}
                  href={localizedHref(item.href, currentLocale)}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "block px-3 py-2 text-sm font-medium rounded-md",
                    active
                      ? "bg-warm"
                      : item.highlight
                        ? "text-white"
                        : "text-text-light hover:bg-warm",
                  ].join(" ")}
                  style={
                    active
                      ? { color: "var(--color-primary)" }
                      : item.highlight
                        ? { background: "var(--color-primary)" }
                        : undefined
                  }
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[var(--color-warm-deep)]">
              <LangSwitcher currentLocale={currentLocale} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}