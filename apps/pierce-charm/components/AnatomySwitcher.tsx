"use client";

import { useState, useMemo } from "react";
import { EarAnatomy, PinPosition } from "./EarAnatomy";
import { FaceSelector, FacePin } from "./FaceSelector";
import { BodySelector, BodyPin } from "./BodySelector";
import { JewelryIcon } from "./JewelryIcon";
import { whatsappUrl } from "@/lib/site-config";
import { addToCart } from "./CartBar";
import { openBooking } from "./BookingModal";

export interface CatalogItem {
  id: string;
  name: string;
  zone?: string;
  region: "oreja" | "rostro" | "cuerpo";
  jewelry?: string;
  position?: { x: number; y: number; side?: string };
  price: string;
  downtime?: string;
  description?: string;
  level?: number;
}

interface Props {
  items: CatalogItem[];
  whatsapp?: string;
  initialRegion?: "oreja" | "rostro" | "cuerpo";
}

/**
 * Selector visual completo con 3 tabs (Oreja / Rostro / Cuerpo).
 * Cada tab muestra el SVG correspondiente con hotspots interactivos.
 * Debajo del SVG, grid de cards con todos los piercings de la región.
 */
export function AnatomySwitcher({ items, whatsapp = "595981324569", initialRegion = "oreja" }: Props) {
  const [region, setRegion] = useState<"oreja" | "rostro" | "cuerpo">(initialRegion);
  const [activeId, setActiveId] = useState<string | null>(null);

  const regionItems = useMemo(
    () => items.filter((it) => it.region === region),
    [items, region]
  );

  // Pasa de item catalog a pin del selector
  const earPins: PinPosition[] = useMemo(
    () =>
      regionItems
        .filter((it) => it.position && typeof it.position.x === "number")
        .map((it) => ({
          id: it.id,
          name: it.name,
          zone: it.zone,
          price: it.price,
          downtime: it.downtime,
          jewelry: it.jewelry,
          x: it.position!.x,
          y: it.position!.y,
        })),
    [regionItems]
  );

  const facePins: FacePin[] = useMemo(
    () =>
      regionItems
        .filter((it) => it.position && typeof it.position.x === "number")
        .map((it) => ({
          id: it.id,
          name: it.name,
          zone: it.zone,
          price: it.price,
          downtime: it.downtime,
          jewelry: it.jewelry,
          x: it.position!.x,
          y: it.position!.y,
          side: it.position!.side,
        })),
    [regionItems]
  );

  const bodyPins: BodyPin[] = useMemo(
    () =>
      regionItems
        .filter((it) => it.position && typeof it.position.x === "number")
        .map((it) => ({
          id: it.id,
          name: it.name,
          zone: it.zone,
          price: it.price,
          downtime: it.downtime,
          jewelry: it.jewelry,
          x: it.position!.x,
          y: it.position!.y,
        })),
    [regionItems]
  );

  return (
    <div className="w-full">
      {/* Tabs de región */}
      <div
        role="tablist"
        aria-label="Región del cuerpo"
        className="flex items-center justify-center gap-2 md:gap-3 mb-6"
      >
        {(
          [
            { id: "oreja", label: "Oreja", count: items.filter((i) => i.region === "oreja").length },
            { id: "rostro", label: "Rostro", count: items.filter((i) => i.region === "rostro").length },
            { id: "cuerpo", label: "Cuerpo", count: items.filter((i) => i.region === "cuerpo").length },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={region === t.id}
            onClick={() => {
              setRegion(t.id);
              setActiveId(null);
            }}
            className={`px-5 py-2.5 font-[var(--font-display)] text-[0.78rem] uppercase tracking-[0.2em] transition-all border ${
              region === t.id
                ? "bg-[var(--color-primary)] text-[var(--color-foreground)] border-[var(--color-gold)]"
                : "bg-transparent text-[var(--color-foreground)]/70 border-[var(--color-border)] hover:border-[var(--color-primary-light)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {t.label}
            <span className="ml-2 text-[var(--color-gold)] text-[0.9rem]">
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-10 items-start">
        {/* SVG con hotspots */}
        <div className="flex flex-col items-center">
          {region === "oreja" && (
            <EarAnatomy pins={earPins} activeId={activeId} onSelect={setActiveId} />
          )}
          {region === "rostro" && (
            <FaceSelector pins={facePins} activeId={activeId} onSelect={setActiveId} />
          )}
          {region === "cuerpo" && (
            <BodySelector pins={bodyPins} activeId={activeId} onSelect={setActiveId} />
          )}

          <p className="text-[var(--color-muted-foreground)] text-[0.85rem] mt-5 text-center max-w-xs">
            {region === "oreja" && "Tocá o pasá el mouse sobre cada piercing para ver la pieza, precio y tiempo de cicatrización."}
            {region === "rostro" && "Cada hotspot muestra la joya recomendada. Al hacer click, agregás al carrito invisible y reservás por WhatsApp."}
            {region === "cuerpo" && "Si tu anatomía no admite un piercing, te lo decimos antes de perforar. Honestidad primero."}
          </p>
        </div>

        {/* Grid de cards */}
        <div>
          <h3 className="font-[var(--font-display)] uppercase tracking-[0.18em] text-[0.78rem] text-[var(--color-primary-light)] mb-4">
            {region === "oreja" && "14 ubicaciones del cartílago y lóbulo"}
            {region === "rostro" && "10 perforaciones faciales"}
            {region === "cuerpo" && "Belly button & cuerpo"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[640px] overflow-y-auto pr-2">
            {regionItems.map((it) => {
              const isActive = activeId === it.id;
              return (
                <div
                  id={`card-${it.id}`}
                  key={it.id}
                  className={`text-left border p-3 transition-all group relative ${
                    isActive
                      ? "border-[var(--color-gold)] bg-[var(--color-primary)]/20"
                      : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary-light)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(isActive ? null : it.id)}
                    className="w-full text-left"
                    aria-label={`Ver ${it.name}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-9 h-9 flex items-center justify-center">
                        <JewelryIcon
                          type={it.jewelry || "labret-stud"}
                          size={28}
                          active={isActive}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-[var(--font-display)] text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-foreground)] leading-tight">
                          {it.name}
                        </p>
                        {it.zone && (
                          <p className="text-[0.68rem] text-[var(--color-muted-foreground)] mt-0.5">
                            {it.zone}
                          </p>
                        )}
                        <div className="flex items-center justify-between gap-2 mt-1.5">
                          <span className="font-[var(--font-script)] text-[var(--color-gold)] text-[1.1rem] leading-none">
                            {it.price}
                          </span>
                          {it.downtime && (
                            <span className="text-[0.65rem] text-[var(--color-muted-foreground)]">
                              {it.downtime}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                  {/* Mini "Lo quiero" */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: it.id,
                        name: it.name,
                        region: it.region,
                        price: it.price,
                        jewelryType: it.jewelry,
                      });
                    }}
                    className="mt-2 w-full text-[0.7rem] uppercase tracking-[0.18em] font-[var(--font-display)] text-[var(--color-gold)] hover:text-[var(--color-foreground)] border border-[var(--color-border)] hover:border-[var(--color-gold)] py-1 transition-colors"
                    aria-label={`Agregar ${it.name} a tu selección`}
                  >
                    + Lo quiero
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        {activeId && (() => {
          const sel = regionItems.find((it) => it.id === activeId);
          if (!sel) return null;
          return (
            <button
              type="button"
              onClick={() => {
                addToCart({
                  id: sel.id,
                  name: sel.name,
                  region: sel.region,
                  price: sel.price,
                  jewelryType: sel.jewelry,
                });
                // brief visual confirmation
                const btn = document.getElementById(`card-${sel.id}`);
                if (btn) {
                  btn.classList.add("ring-2", "ring-[var(--color-gold)]");
                  setTimeout(() => btn.classList.remove("ring-2", "ring-[var(--color-gold)]"), 600);
                }
              }}
              className="btn-gothic-outline tap"
            >
              + Agregar a mi selección
            </button>
          );
        })()}
        {activeId ? (
          <button
            type="button"
            onClick={() => openBooking()}
            className="btn-gothic tap"
          >
            Reservar este piercing
          </button>
        ) : (
          <button
            type="button"
            onClick={() => openBooking()}
            className="btn-gothic tap"
          >
            Reservar cita
          </button>
        )}
        <a
          href={whatsappUrl(
            whatsapp,
            activeId
              ? `Hola! Me interesa el piercing "${activeId}" (${region}) de Pierce Charm. ¿Pueden darme más info?`
              : "Hola! Quiero reservar una cita en Pierce Charm. ¿Pueden contarme sobre los piercings disponibles?"
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gothic-outline tap"
        >
          {activeId ? "Solo consultar" : "WhatsApp directo"}
        </a>
      </div>
    </div>
  );
}
