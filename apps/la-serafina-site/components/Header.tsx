"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { content as c, localeFromPath } from "@/lib/content";
import { LangSwitcher } from "@/components/LangSwitcher";
import { MobileMenu } from "./MobileMenu";

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

export function Header() {
  const pathname = usePathname();
  const currentLocale = localeFromPath(pathname);
  const navItems = c.navigation;
  const isHome = pathname === "/" || pathname === "/gn";

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
            className="flex items-center gap-2.5 group"
            aria-label={`${c.siteName} — inicio`}
            aria-current={isHome ? "page" : undefined}
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
            {navItems.map((item: { label: string; href: string; highlight?: boolean }) => {
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

          <MobileMenu
            items={navItems}
            currentLocale={currentLocale}
            currentPath={pathname}
          />
        </div>
      </nav>
    </header>
  );
}