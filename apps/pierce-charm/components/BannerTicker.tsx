"use client";

import { useEffect, useState } from "react";

export function BannerTicker({ messages, intervalSec = 5 }: { messages: string[]; intervalSec?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % messages.length), intervalSec * 1000);
    return () => clearInterval(id);
  }, [messages.length, intervalSec]);
  if (!messages?.length) return null;

  return (
    <div
      className="bg-gradient-to-r from-[var(--color-primary)] via-[#8b1a31] to-[var(--color-primary)] py-2 overflow-hidden border-y border-[var(--color-primary-light)]"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p
          key={i}
          className="text-[0.7rem] md:text-[0.78rem] font-[var(--font-display)] uppercase tracking-[0.25em] text-[var(--color-foreground)] animate-fade-in-up"
        >
          {messages[i]}
        </p>
      </div>
    </div>
  );
}
