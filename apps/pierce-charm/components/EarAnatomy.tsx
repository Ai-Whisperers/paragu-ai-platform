"use client";

import { useState } from "react";

// Anatomical ear with hotspots for piercing locations.
// SVG paths use simplified ear shape; pins are absolutely positioned over it.

export interface PinPosition {
  id: string;
  name: string;
  price: string;
  x: number;
  y: number;
}

export function EarAnatomy({
  pins,
  activeId,
  onSelect,
}: {
  pins: PinPosition[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4]">
      <div
        className="absolute inset-0 blur-3xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(139, 26, 49, 0.4), transparent 70%)",
        }}
      />

      <svg viewBox="0 0 100 130" className="relative w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="earSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d7c0" />
            <stop offset="100%" stopColor="#d9a98a" />
          </linearGradient>
          <linearGradient id="earHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="earShadow" cx="50%" cy="40%">
            <stop offset="0%" stopColor="rgba(98, 8, 29, 0.25)" />
            <stop offset="100%" stopColor="rgba(33, 27, 84, 0)" />
          </radialGradient>
        </defs>

        <path
          d="M 30 10
             C 18 14, 12 28, 14 50
             C 14 70, 18 95, 30 115
             C 38 122, 48 124, 58 122
             C 62 115, 60 105, 56 95
             C 54 90, 54 84, 56 78
             C 58 70, 60 60, 58 50
             C 56 38, 50 22, 42 14
             C 38 10, 34 9, 30 10 Z"
          fill="url(#earSkin)"
          stroke="#3a040f"
          strokeWidth="0.6"
        />
        <path
          d="M 36 50 C 32 56, 32 64, 36 72 C 40 76, 46 76, 50 72 C 52 64, 50 56, 46 52 C 42 48, 38 48, 36 50 Z"
          fill="rgba(139, 26, 49, 0.18)"
          stroke="#3a040f"
          strokeWidth="0.4"
        />
        <path d="M 40 58 C 38 60, 38 64, 40 66 L 44 64 Z" fill="rgba(98, 8, 29, 0.3)" />
        <path d="M 50 75 C 52 78, 50 82, 46 82 L 44 78 Z" fill="rgba(98, 8, 29, 0.3)" />
        <path d="M 38 44 C 36 47, 36 50, 38 52 L 42 50 Z" fill="rgba(33, 27, 84, 0.3)" />
        <path d="M 30 10 C 22 18, 18 30, 18 45" fill="none" stroke="rgba(58, 4, 15, 0.6)" strokeWidth="0.8" />
        <path d="M 25 30 C 23 45, 23 60, 25 75" fill="none" stroke="url(#earHighlight)" strokeWidth="2" />
        <ellipse cx="32" cy="105" rx="14" ry="8" fill="url(#earShadow)" />
      </svg>

      {pins.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect?.(p.id)}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
          className={`piercing-pin ${activeId === p.id || hovered === p.id ? "active" : ""}`}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          aria-label={p.name}
        />
      ))}

      {(hovered || activeId) && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full bg-[var(--color-surface)] border border-[var(--color-primary-light)] px-3 py-2 min-w-[180px] text-center shadow-xl z-10">
          <p className="font-[var(--font-display)] text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-foreground)]">
            {pins.find((p) => p.id === (activeId || hovered))?.name}
          </p>
          <p className="font-[var(--font-script)] text-[var(--color-gold)] text-[1.1rem] leading-tight">
            {pins.find((p) => p.id === (activeId || hovered))?.price}
          </p>
        </div>
      )}
    </div>
  );
}