"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import content from "@/content/es.json";

const c = content as any;

export function BottomNav() {
  const pathname = usePathname();

  // Show only top-level pages in mobile bottom nav
  const items = c.navigation.slice(0, 5);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[var(--color-surface)] border-t border-[var(--color-warm-deep)]"
      aria-label="Navegación inferior"
    >
      <div className="flex justify-around items-center h-16">
        {items.map((item: any) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex flex-col items-center gap-1 px-2 py-1 text-[10px] uppercase tracking-wide",
                active ? "text-[var(--color-primary)] font-bold" : "text-text-muted",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: active ? "var(--color-primary)" : "transparent" }} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}