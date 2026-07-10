"use client";

import { useState } from "react";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Accessible accordion for FAQ pages.
 *
 * - Each <details>/<summary> is keyboard-navigable by default (Enter/Space toggle)
 * - aria-expanded mirrors the open state
 * - Smooth visual transition for open/close
 * - Single-open mode: opening one closes the others (typical for FAQs)
 *
 * JSON-LD for FAQPage should be emitted server-side in the page itself
 * (not here, since this is a client component).
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3" role="list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            role="listitem"
            className="bg-surface border border-[var(--color-warm-deep)] rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-trigger-${i}`}
              className="w-full text-left px-6 py-4 flex items-start justify-between gap-4 hover:bg-warm transition-colors"
            >
              <span className="font-display text-lg font-bold text-text pr-2">{item.q}</span>
              <span
                aria-hidden="true"
                className={`flex-shrink-0 text-[var(--color-primary)] text-2xl leading-none transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              hidden={!isOpen}
              className="px-6 pb-4 text-text-light leading-relaxed"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}