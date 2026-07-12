"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { content as c, localeFromPath, Locale } from "@/lib/content";
import { LangSwitcher } from "@/components/LangSwitcher";

function isActive(pathname: string, href: string): boolean {
  if (!pathname) return false;
  const [pathOnlyRaw] = pathname.split("#");
  const pathOnly = pathOnlyRaw.replace(/^\/gn(?=\/|$)/, "");
  const hrefStripped = href;
  if (pathOnly === "/" && hrefStripped === "/") return true;
  if (pathOnly === "/" || hrefStripped === "/") return false;
  return pathOnly === hrefStripped || pathOnly.startsWith(hrefStripped + "/");
}

function localizedHref(href: string, locale: Locale): string {
  if (href === "/" || !href) {
    return locale === "es" ? "/" : "/gn";
  }
  return locale === "es" ? href : `/gn${href}`;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale: Locale = localeFromPath(pathname);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-[var(--color-warm-deep)]">
      <div
        className="h-1 w-full"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg,#7B2CBF 0%,#3C096C 50%,#7B2CBF 100%)",
        }}
      />

      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        <div className="flex items-center justify-between h-16 lg:h-20 gap-3">
          <Link
            href={localizedHref("/", currentLocale)}
            className="flex items-center gap-2.5 group scroll-smooth"
            aria-label={`${c.siteName} — inicio`}
            aria-current={
              pathname === "/" || pathname === "/gn" ? "page" : undefined
            }
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                (window.location.pathname === "/" ||
                  window.location.pathname === "/gn")
              ) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-white text-base leading-none"
              style={{ background: "var(--color-primary)" }}
            >
              S
            </div>
            <span className="font-display font-bold text-text text-lg tracking-tight">
              {c.siteName}
            </span>
            <span className="hidden sm:inline text-xs text-text-muted font-medium ml-1">
              {c.brandLine}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {c.navigation.map((item: any) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={localizedHref(item.href, currentLocale)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    active
                      ? "underline underline-offset-4 font-semibold"
                      : item.highlight
                        ? "text-white"
                        : "text-text-light hover:bg-warm hover:text-text",
                  ].join(" ")}
                  style={
                    item.highlight && !active
                      ? { background: "var(--color-primary)" }
                      : active
                        ? { color: "var(--color-primary)" }
                        : undefined
                  }
                >
                  {item.label}
                </Link>
              );
            })}
            <span className="mx-2 h-5 w-px bg-[var(--color-warm-deep)]" />
            <LangSwitcher currentLocale={currentLocale} />
          </div>

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
        </div>

        {open && (
          <div id="mobile-nav" className="lg:hidden pb-4 space-y-1">
            {c.navigation.map((item: any) => {
              const active = isActive(pathname, item.href);
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
        )}
      </nav>
    </header>
  );
}
