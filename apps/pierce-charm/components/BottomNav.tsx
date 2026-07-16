"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Inicio", href: "/" },
  { label: "Piercings", href: "/piercings" },
  { label: "Joyería", href: "/galeria" },
  { label: "FAQ", href: "/faq" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación inferior" className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-md safe-area-bottom">
      <div className="flex items-center justify-around py-1.5">
        {items.map((it) => {
          const active = it.href === "/" ? pathname === "/" : pathname?.startsWith(it.href);
          return (
            <Link
              key={it.label}
              href={it.href}
              aria-current={active ? "page" : undefined}
              className={`tap relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[64px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-light)] ${
                active ? "text-[var(--color-primary-light)]" : "text-[var(--color-muted-foreground)]"
              }`}
            >
              {active && (
                <span aria-hidden="true" className="absolute top-0 h-0.5 w-8 bg-gradient-to-r from-transparent via-[var(--color-primary-light)] to-transparent" />
              )}
              <span className="font-[var(--font-display)] text-[0.62rem] uppercase tracking-[0.2em] mt-1">
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}