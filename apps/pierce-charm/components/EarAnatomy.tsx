"use client";

import { useState } from "react";
import { JewelryIcon } from "./JewelryIcon";

export interface PinPosition {
  id: string;
  name: string;
  zone?: string;
  price?: string;
  downtime?: string;
  jewelry?: string;
  description?: string;
  x: number;
  y: number;
}

interface Props {
  pins: PinPosition[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
}

/**
 * Anatomical ear (lateral view) with piercing hotspots.
 * Cada pin es **la pieza completa** (no un point). Al hover: la pieza se agranda
 * + tooltip con info. Al click: la pieza se marca permanentemente.
 *
 * ViewBox 100x130 — scalable.
 */
export function EarAnatomy({ pins, activeId, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const active = pins.find((p) => p.id === (activeId || hovered));

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-[3/4]">
      {/* Halo de fondo */}
      <div
        className="absolute inset-0 blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(178, 54, 79, 0.5), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 100 130"
        className="relative w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Diagrama interactivo de oreja con ubicaciones de piercing"
      >
        <defs>
          <linearGradient id="earSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d7c0" />
            <stop offset="100%" stopColor="#d9a98a" />
          </linearGradient>
          <linearGradient id="earHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="earShadow" cx="50%" cy="40%">
            <stop offset="0%" stopColor="rgba(98, 8, 29, 0.3)" />
            <stop offset="100%" stopColor="rgba(33, 27, 84, 0)" />
          </radialGradient>
        </defs>

        {/* Contorno principal */}
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
        {/* Concha */}
        <path
          d="M 36 50 C 32 56, 32 64, 36 72 C 40 76, 46 76, 50 72 C 52 64, 50 56, 46 52 C 42 48, 38 48, 36 50 Z"
          fill="rgba(139, 26, 49, 0.18)"
          stroke="#3a040f"
          strokeWidth="0.4"
        />
        {/* Trago */}
        <path d="M 40 58 C 38 60, 38 64, 40 66 L 44 64 Z" fill="rgba(98, 8, 29, 0.3)" />
        {/* Antitrago */}
        <path d="M 50 75 C 52 78, 50 82, 46 82 L 44 78 Z" fill="rgba(98, 8, 29, 0.3)" />
        {/* Crus del helix */}
        <path d="M 38 44 C 36 47, 36 50, 38 52 L 42 50 Z" fill="rgba(33, 27, 84, 0.3)" />
        {/* Helix curve outline */}
        <path d="M 30 10 C 22 18, 18 30, 18 45" fill="none" stroke="rgba(58, 4, 15, 0.7)" strokeWidth="0.8" />
        {/* Highlight de luz */}
        <path d="M 25 30 C 23 45, 23 60, 25 75" fill="none" stroke="url(#earHighlight)" strokeWidth="2" />
        {/* Sombra inferior */}
        <ellipse cx="32" cy="105" rx="14" ry="8" fill="url(#earShadow)" />
      </svg>

      {/* Hotspots — la pieza completa, no un point */}
      {pins.map((p) => {
        const isActive = activeId === p.id;
        const isHovered = hovered === p.id;
        const scale = isActive || isHovered ? 1.45 : 1;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect?.(p.id)}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(p.id)}
            onBlur={() => setHovered(null)}
            className="absolute flex items-center justify-center transition-all duration-200"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: "32px",
              height: "32px",
              transform: `translate(-50%, -50%) scale(${scale})`,
              background: isActive || isHovered
                ? "rgba(212, 168, 67, 0.18)"
                : "transparent",
              borderRadius: "50%",
              border: isActive
                ? "1.5px solid var(--color-gold)"
                : isHovered
                ? "1.5px dashed var(--color-gold)"
                : "1.5px solid transparent",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`${p.name}${p.price ? ` — ${p.price}` : ""}`}
          >
            <JewelryIcon
              type={p.jewelry || "labret-stud"}
              size={isActive || isHovered ? 28 : 22}
              active={isActive || isHovered}
            />
          </button>
        );
      })}

      {/* Tooltip flotante */}
      {active && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full bg-[var(--color-surface)] border border-[var(--color-gold)] px-4 py-3 min-w-[200px] text-center shadow-2xl z-10 pointer-events-none">
          <p className="font-[var(--font-display)] text-[0.8rem] uppercase tracking-[0.18em] text-[var(--color-foreground)]">
            {active.name}
          </p>
          {active.zone && (
            <p className="text-[0.7rem] text-[var(--color-muted-foreground)] mt-0.5 tracking-wider">
              {active.zone}
            </p>
          )}
          {active.price && (
            <p className="font-[var(--font-script)] text-[var(--color-gold)] text-[1.2rem] leading-tight mt-1">
              {active.price}
            </p>
          )}
          {active.downtime && (
            <p className="text-[0.7rem] text-[var(--color-muted-foreground)] mt-1">
              Cicatrización: {active.downtime}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
