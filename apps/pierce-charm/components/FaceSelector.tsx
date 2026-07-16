"use client";

import { useState } from "react";
import { JewelryIcon } from "./JewelryIcon";

export interface FacePin {
  id: string;
  name: string;
  zone?: string;
  price?: string;
  downtime?: string;
  jewelry?: string;
  description?: string;
  x: number; // 0-100
  y: number;
  side?: "left" | "right" | "center";
}

interface Props {
  pins: FacePin[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
}

/**
 * Cara frontal con hotspots para piercings faciales.
 * ViewBox 200x280 (cara completa).
 * Las piezas son el icono completo, no un point.
 */
export function FaceSelector({ pins, activeId, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = pins.find((p) => p.id === (activeId || hovered));

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-[5/7]">
      <div
        className="absolute inset-0 blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(178, 54, 79, 0.5), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 200 280"
        className="relative w-full h-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Diagrama interactivo de rostro con ubicaciones de piercing"
      >
        <defs>
          <linearGradient id="faceSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7dac4" />
            <stop offset="100%" stopColor="#dca895" />
          </linearGradient>
          <linearGradient id="hairTone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a0e1f" />
            <stop offset="100%" stopColor="#0a0612" />
          </linearGradient>
          <radialGradient id="cheekBlush" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(178, 54, 79, 0.18)" />
            <stop offset="100%" stopColor="rgba(178, 54, 79, 0)" />
          </radialGradient>
        </defs>

        {/* Pelo (marco superior) */}
        <path
          d="M 30 80 C 30 30, 60 12, 100 10 C 140 12, 170 30, 170 80 L 170 50 C 165 35, 140 25, 100 25 C 60 25, 35 35, 30 50 Z"
          fill="url(#hairTone)"
        />

        {/* Cuello */}
        <path
          d="M 80 240 L 80 270 L 120 270 L 120 240 Z"
          fill="url(#faceSkin)"
          stroke="#3a040f"
          strokeWidth="0.6"
        />

        {/* Cara (contorno principal) — óvalo */}
        <ellipse
          cx="100"
          cy="140"
          rx="68"
          ry="90"
          fill="url(#faceSkin)"
          stroke="#3a040f"
          strokeWidth="0.8"
        />

        {/* Mandíbula — reborde inferior */}
        <path
          d="M 60 200 Q 100 230 140 200"
          fill="url(#faceSkin)"
          stroke="#3a040f"
          strokeWidth="0.6"
        />

        {/* Cejas (2 arcos) */}
        <path d="M 60 110 Q 72 102 86 110" fill="none" stroke="#1a0e1f" strokeWidth="3" strokeLinecap="round" />
        <path d="M 114 110 Q 128 102 140 110" fill="none" stroke="#1a0e1f" strokeWidth="3" strokeLinecap="round" />

        {/* Ojos (almendrados) */}
        <ellipse cx="74" cy="125" rx="9" ry="5" fill="white" stroke="#1a0e1f" strokeWidth="0.8" />
        <ellipse cx="126" cy="125" rx="9" ry="5" fill="white" stroke="#1a0e1f" strokeWidth="0.8" />
        <circle cx="74" cy="125" r="3.5" fill="#211b54" />
        <circle cx="126" cy="125" r="3.5" fill="#211b54" />
        <circle cx="75.5" cy="123.5" r="1" fill="white" />
        <circle cx="127.5" cy="123.5" r="1" fill="white" />

        {/* Pestañas */}
        <path d="M 65 121 L 64 119 M 70 119 L 69 117 M 75 119 L 75 117 M 80 119 L 81 117 M 84 121 L 85 119" stroke="#1a0e1f" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M 115 121 L 114 119 M 120 119 L 119 117 M 125 119 L 125 117 M 130 119 L 131 117 M 134 121 L 135 119" stroke="#1a0e1f" strokeWidth="0.8" strokeLinecap="round" />

        {/* Nariz */}
        <path
          d="M 100 135 L 92 165 Q 88 172 100 175 Q 112 172 108 165 Z"
          fill="url(#faceSkin)"
          stroke="#3a040f"
          strokeWidth="0.6"
        />
        {/* Fosa nasal izq */}
        <ellipse cx="95" cy="172" rx="2" ry="2.5" fill="rgba(58, 4, 15, 0.5)" />
        {/* Fosa nasal der */}
        <ellipse cx="105" cy="172" rx="2" ry="2.5" fill="rgba(58, 4, 15, 0.5)" />

        {/* Labio superior (philtrum) */}
        <path
          d="M 88 188 Q 94 184 100 188 Q 106 184 112 188 Q 108 196 100 196 Q 92 196 88 188 Z"
          fill="#9c3a4a"
          stroke="#3a040f"
          strokeWidth="0.6"
        />
        {/* Cupid bow */}
        <path d="M 100 188 L 96 184 L 100 188 L 104 184" fill="#9c3a4a" stroke="#3a040f" strokeWidth="0.4" />

        {/* Labio inferior */}
        <path
          d="M 86 200 Q 100 215 114 200 Q 108 210 100 210 Q 92 210 86 200 Z"
          fill="#7a2a36"
          stroke="#3a040f"
          strokeWidth="0.6"
        />

        {/* Blush en mejillas (sutil) */}
        <ellipse cx="55" cy="155" rx="14" ry="10" fill="url(#cheekBlush)" />
        <ellipse cx="145" cy="155" rx="14" ry="10" fill="url(#cheekBlush)" />

        {/* Mentón */}
        <path d="M 90 220 Q 100 232 110 220" fill="none" stroke="rgba(58, 4, 15, 0.4)" strokeWidth="0.8" />

        {/* Brillo de luz */}
        <path
          d="M 50 95 C 45 110, 45 145, 50 175"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2.5"
        />
        <path
          d="M 150 95 C 155 110, 155 145, 150 175"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2.5"
        />
      </svg>

      {/* Hotspots con la pieza real */}
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
              width: "32px",
              height: "32px",
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
              type={p.jewelry || "labret-stud"}
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
