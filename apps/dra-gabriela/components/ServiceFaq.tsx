"use client"

// Service FAQ accordion — used by ServiceDetail.
// Renders a list of {q, a} items with native <details> for keyboard a11y.

import { ChevronDown } from "lucide-react"

export function ServiceFaq({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <details
          key={i}
          className="group card p-5 md:p-6 open:shadow-md transition-shadow"
        >
          <summary className="cursor-pointer flex items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-base md:text-lg font-medium text-fg text-left pr-2" style={{ fontFamily: "var(--font-heading)" }}>
              {it.q}
            </h3>
            <ChevronDown
              className="w-5 h-5 text-accent flex-shrink-0 transition-transform group-open:rotate-180 mt-0.5"
              aria-hidden="true"
            />
          </summary>
          <p className="text-fg-muted leading-relaxed mt-3 text-left">{it.a}</p>
        </details>
      ))}
    </div>
  )
}
