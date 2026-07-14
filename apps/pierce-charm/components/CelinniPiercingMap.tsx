"use client";

import { useState } from "react";
import { whatsappUrl } from "@/lib/site-config";
import { openBooking } from "./BookingModal";
import { addToCart } from "./CartBar";

export interface CelinniPin {
  id: string;
  name: string;
  zone?: string;
  price: string;
  downtime?: string;
  x: number;        // 0-100 (%)
  y: number;        // 0-100 (%)
  jewelryType?: string;
  description?: string;
}

// Coordenadas obtenidas de la imagen de Celinni (vista: oreja derecha).
// Aproximadas al % del contenedor — ajustables manualmente con feedback.
export const CELINNI_PINS: CelinniPin[] = [
  { id: "helix",         name: "Helix",         zone: "Cartílago superior", price: "Gs 100.000", downtime: "4-6 meses",  x: 64, y: 13, jewelryType: "stud",   description: "Borde superior externo del cartílago." },
  { id: "industrial-1",  name: "Industrial",    zone: "Doble helix",         price: "Gs 150.000", downtime: "9-12 meses", x: 41, y: 11, jewelryType: "barbell", description: "Barra larga que une dos puntos del helix." },
  { id: "industrial-2",  name: "Industrial",    zone: "Doble helix",         price: "Gs 150.000", downtime: "9-12 meses", x: 71, y: 26, jewelryType: "barbell", description: "Segundo punto del industrial." },
  { id: "anti-helix",    name: "Anti-Helix",    zone: "Cartílago interno",  price: "Gs 100.000", downtime: "6-9 meses",  x: 39, y: 24, jewelryType: "stud",   description: "Cresta interna del helix." },
  { id: "rook",          name: "Rook",          zone: "Pliegue vertical",   price: "Gs 100.000", downtime: "9-12 meses", x: 48, y: 32, jewelryType: "curved-barbell", description: "Pliegue vertical interno sobre el daith." },
  { id: "snug",          name: "Snug",          zone: "Antihélice inferior", price: "Gs 150.000", downtime: "9-12 meses", x: 60, y: 42, jewelryType: "curved-barbell", description: "Surface piercing en la cresta interior." },
  { id: "daith",         name: "Daith",         zone: "Pliegue interno",    price: "Gs 100.000", downtime: "9-12 meses", x: 46, y: 43, jewelryType: "circular-barbell", description: "Pliegue más interno, en la crus del helix." },
  { id: "conch",         name: "Conch",         zone: "Concha central",     price: "Gs 100.000", downtime: "6-9 meses",  x: 58, y: 52, jewelryType: "stud",   description: "Zona cóncava central de la oreja." },
  { id: "tragus",        name: "Tragus",        zone: "Solapa externa",     price: "Gs 100.000", downtime: "6-9 meses",  x: 34, y: 55, jewelryType: "stud",   description: "Solapa de cartílago que cubre el canal." },
  { id: "anti-tragus",   name: "Anti-Tragus",   zone: "Cara interna",       price: "Gs 100.000", downtime: "9-12 meses", x: 43, y: 70, jewelryType: "stud",   description: "Cresta opuesta al tragus, sobre el lóbulo." },
  { id: "lobulo-2",      name: "2° Lóbulo",     zone: "Segundo lóbulo",     price: "Gs 50.000",  downtime: "6-8 semanas", x: 49, y: 76, jewelryType: "stud",   description: "Perforación superior del lóbulo." },
  { id: "lobulo",        name: "Lóbulo",        zone: "Lóbulo clásico",     price: "Gs 50.000",  downtime: "6-8 semanas", x: 38, y: 83, jewelryType: "stud",   description: "Lóbulo clásico, la perforación más común." },
];

interface Props {
  phone?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

/**
 * Mapa de piercings con imagen de referencia (Celinni) + hotspots glowing
 * superpuestos en posiciones aproximadas. Click en hotspot → muestra tooltip
 * con nombre, precio, tiempo de cicatrización + botones "Lo quiero" y
 * "Reservar este piercing".
 */
export function CelinniPiercingMap({
  phone = "595981324569",
  imageSrc = "/img/celinni-piercings-oreille.jpg",
  imageAlt = "Esquema de los distintos tipos de piercings de oreja: hélix, tragus, conch, daith, rook, snug, industrial y más",
  imageWidth = 840,
  imageHeight = 1120,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Deduplicar industrial-1/2 → un solo pin para UI
  const uiPins = CELINNI_PINS.filter(
    (p, idx, arr) => arr.findIndex((q) => q.id === p.id) === idx
  );

  const active = activeId ? uiPins.find((p) => p.id === activeId) ?? null : null;

  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none">
      {/* Glow halo */}
      <div
        className="absolute inset-0 blur-3xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(178, 54, 79, 0.5), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Imagen base */}
      <img
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        loading="eager"
        className="relative w-full h-auto drop-shadow-2xl"
        draggable={false}
      />

      {/* Capa de hotspots */}
      <div className="absolute inset-0">
        {CELINNI_PINS.map((pin) => {
          const isActive = activeId === pin.id;
          const isIndustrialSecondary = pin.id === "industrial-2";
          return (
            <button
              key={`${pin.id}-${pin.x}-${pin.y}`}
              type="button"
              onClick={() => setActiveId(isActive ? null : pin.id)}
              aria-label={`${pin.name} — ${pin.price}`}
              className={`absolute flex items-center justify-center transition-all duration-200 group ${
                isActive ? "z-30" : "z-20"
              }`}
              style={{
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                width: isActive ? "44px" : "26px",
                height: isActive ? "44px" : "26px",
                transform: "translate(-50%, -50%)",
                background: "transparent",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {/* Halo glow */}
              <span
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  isActive
                    ? "opacity-100 scale-100"
                    : "opacity-60 scale-75 group-hover:opacity-100 group-hover:scale-100"
                }`}
                style={{
                  background: "radial-gradient(circle, rgba(212, 168, 67, 0.85) 0%, rgba(178, 54, 79, 0.55) 50%, transparent 75%)",
                  filter: "blur(4px)",
                  animation: isActive ? "celinni-pulse 1.4s ease-in-out infinite" : "none",
                }}
                aria-hidden="true"
              />
              {/* Core dot */}
              <span
                className={`relative rounded-full transition-all duration-200 ${
                  isActive
                    ? "w-3 h-3 bg-[var(--color-gold)] shadow-[0_0_12px_4px_rgba(212,168,67,0.85)]"
                    : "w-2 h-2 bg-[var(--color-gold)] shadow-[0_0_8px_2px_rgba(212,168,67,0.6)] group-hover:w-2.5 group-hover:h-2.5"
                }`}
                aria-hidden="true"
              />
              {/* Tooltip on active */}
              {isActive && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-40 min-w-[220px] max-w-[260px]"
                  role="tooltip"
                >
                  <div className="bg-[var(--color-surface)] border border-[var(--color-gold)] shadow-2xl p-3 text-left">
                    <p className="font-[var(--font-display)] uppercase tracking-[0.18em] text-[0.72rem] text-[var(--color-primary-light)] mb-0.5">
                      {pin.zone}
                    </p>
                    <p className="font-[var(--font-display)] text-[0.95rem] text-[var(--color-foreground)] leading-tight mb-1">
                      {pin.name}
                      {!isIndustrialSecondary && pin.id !== "industrial-1" && pin.id !== "industrial-2" ? null : null}
                    </p>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-[var(--font-script)] text-[var(--color-gold)] text-[1.1rem] leading-none">
                        {pin.price}
                      </span>
                      {pin.downtime && (
                        <span className="text-[0.65rem] text-[var(--color-muted-foreground)]">
                          {pin.downtime}
                        </span>
                      )}
                    </div>
                    {pin.description && (
                      <p className="text-[0.72rem] text-[var(--color-muted-foreground)] leading-snug mb-2.5">
                        {pin.description}
                      </p>
                    )}
                    <div className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: pin.id,
                            name: pin.name,
                            region: "oreja",
                            price: pin.price,
                            jewelryType: pin.jewelryType,
                          });
                        }}
                        className="text-[0.68rem] uppercase tracking-[0.18em] font-[var(--font-display)] text-[var(--color-gold)] hover:text-[var(--color-foreground)] border border-[var(--color-border)] hover:border-[var(--color-gold)] py-1 transition-colors"
                      >
                        + Lo quiero
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openBooking();
                        }}
                        className="text-[0.68rem] uppercase tracking-[0.18em] font-[var(--font-display)] text-[var(--color-foreground)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] py-1 transition-colors"
                      >
                        Reservar este piercing
                      </button>
                      <a
                        href={whatsappUrl(
                          phone,
                          `Hola! Me interesa el piercing "${pin.name}" de Pierce Charm. ¿Pueden darme más info?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[0.68rem] uppercase tracking-[0.18em] font-[var(--font-display)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] py-1 transition-colors text-center"
                      >
                        Solo consultar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {/* Etiqueta solo para industrial-2 (oculta por defecto) */}
              {isIndustrialSecondary && !isActive && (
                <span className="sr-only">Industrial — punto inferior</span>
              )}
            </button>
          );
        })}
      </div>

      {/* CSS keyframes para glow pulse */}
      <style dangerouslySetInnerHTML={{ __html: `@keyframes celinni-pulse { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.4); opacity: 1; } }` }} />
    </div>
  );
}