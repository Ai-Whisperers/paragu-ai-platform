"use client";

import { useState } from "react";
import { JewelryIcon } from "./JewelryIcon";

export interface BodyPin {
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
  pins: BodyPin[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
}

/**
 * Silueta de torso humano con hotspots de perforación corporal.
 * ViewBox 200x320 (del cuello a la cadera).
 */
export function BodySelector({ pins, activeId, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = pins.find((p) => p.id === (activeId || hovered));

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-[5/8]">
      <div
        className="absolute inset-0 blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(178, 54, 79, 0.5), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 200 320"
        className="relative w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Diagrama interactivo de torso con ubicaciones de piercing corporal"
      >
        <defs>
          <linearGradient id="bodySkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5d7c0" />
            <stop offset="100%" stopColor="#dca895" />
          </linearGradient>
          <radialGradient id="bellyShadow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(58, 4, 15, 0.5)" />
            <stop offset="80%" stopColor="rgba(58, 4, 15, 0.1)" />
            <stop offset="100%" stopColor="rgba(58, 4, 15, 0)" />
          </radialGradient>
        </defs>

        {/* Cabeza + cuello (parte superior) */}
        <ellipse cx="100" cy="20" rx="22" ry="26" fill="url(#bodySkin)" stroke="#3a040f" strokeWidth="0.8" />
        <path
          d="M 88 40 L 86 65 L 114 65 L 112 40 Z"
          fill="url(#bodySkin)"
          stroke="#3a040f"
          strokeWidth="0.6"
        />

        {/* Hombros */}
        <path
          d="M 86 65 C 60 70, 35 80, 30 100 L 30 130 C 30 132, 35 130, 50 125 L 60 115 L 80 105 Z"
          fill="url(#bodySkin)"
          stroke="#3a040f"
          strokeWidth="0.6"
        />
        <path
          d="M 114 65 C 140 70, 165 80, 170 100 L 170 130 C 170 132, 165 130, 150 125 L 140 115 L 120 105 Z"
          fill="url(#bodySkin)"
          stroke="#3a040f"
          strokeWidth="0.6"
        />

        {/* Torso principal (pecho + abdomen) */}
        <path
          d="M 60 105
             C 50 130, 45 180, 50 230
             C 55 270, 70 290, 100 295
             C 130 290, 145 270, 150 230
             C 155 180, 150 130, 140 105
             Z"
          fill="url(#bodySkin)"
          stroke="#3a040f"
          strokeWidth="0.8"
        />

        {/* Línea del esternón */}
        <line
          x1="100"
          y1="110"
          x2="100"
          y2="200"
          stroke="rgba(58, 4, 15, 0.3)"
          strokeWidth="0.5"
        />

        {/* Línea alba / abdominal line */}
        <line
          x1="100"
          y1="200"
          x2="100"
          y2="270"
          stroke="rgba(58, 4, 15, 0.4)"
          strokeWidth="0.5"
        />

        {/* Ombligo (navel) — hueco + pliegue */}
        <ellipse cx="100" cy="225" rx="6" ry="9" fill="url(#bellyShadow)" />
        <path
          d="M 94 220 Q 100 230 106 220"
          fill="none"
          stroke="rgba(58, 4, 15, 0.6)"
          strokeWidth="0.8"
        />
        <path
          d="M 100 220 L 100 234"
          stroke="rgba(58, 4, 15, 0.4)"
          strokeWidth="0.6"
        />

        {/* Shadow de costillas sutil */}
        <path
          d="M 70 130 Q 100 125 130 130"
          fill="none"
          stroke="rgba(58, 4, 15, 0.15)"
          strokeWidth="0.6"
        />
        <path
          d="M 65 145 Q 100 140 135 145"
          fill="none"
          stroke="rgba(58, 4, 15, 0.15)"
          strokeWidth="0.6"
        />

        {/* Brillo central vertical */}
        <line
          x1="100"
          y1="110"
          x2="100"
          y2="200"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="3"
        />

        {/* Cadera */}
        <path
          d="M 50 270 L 60 310 L 100 310 L 100 295"
          fill="url(#bodySkin)"
          stroke="#3a040f"
          strokeWidth="0.6"
        />
        <path
          d="M 150 270 L 140 310 L 100 310 L 100 295"
          fill="url(#bodySkin)"
          stroke="#3a040f"
          strokeWidth="0.6"
        />
      </svg>

      {/* Hotspots */}
      {pins.map((p) => {
        const isActive = activeId === p.id;
        const isHovered = hovered === p.id;
        const scale = isActive || isHovered ? 1.4 : 1;
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
              width: "34px",
              height: "34px",
              transform: `translate(-50%, -50%) scale(${scale})`,
              background:
                isActive || isHovered
                  ? "rgba(212, 168, 67, 0.2)"
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
              type={p.jewelry || "curved-barbell"}
              size={isActive || isHovered ? 28 : 22}
              active={isActive || isHovered}
            />
          </button>
        );
      })}

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
