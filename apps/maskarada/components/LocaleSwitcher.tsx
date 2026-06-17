"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
] as const;

export default function LocaleSwitcher({ current }: { current: "es" | "en" }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, start] = useTransition();
  const [optimistic, setOptimistic] = useState<"es" | "en">(current);

  const pick = async (code: "es" | "en") => {
    setOptimistic(code);
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: code }),
    });
    start(() => {
      if (code === "es") {
        // strip /en prefix if present
        const stripped = pathname.startsWith("/en") ? pathname.replace(/^\/en/, "") || "/" : pathname;
        router.push(stripped);
      } else {
        // prepend /en
        const prefixed = pathname.startsWith("/en") ? pathname : `/en${pathname === "/" ? "" : pathname}`;
        router.push(prefixed);
      }
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-1 text-xs uppercase tracking-widest">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          disabled={pending}
          onClick={() => pick(l.code)}
          className={`px-2 py-1 rounded transition-colors ${
            optimistic === l.code
              ? "text-gold-400 border border-gold-400/40"
              : "text-gray-500 hover:text-white border border-transparent"
          }`}
          aria-current={optimistic === l.code ? "true" : undefined}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
