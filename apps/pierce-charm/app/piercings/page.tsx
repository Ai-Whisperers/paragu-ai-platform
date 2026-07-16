"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import content from "@/content/es.json";
import { EarAnatomy, type PinPosition } from "@/components/EarAnatomy";
import { ChainVertical, Skull, CrossInverted, CrescentMoon, DividerOrnament } from "@/components/ornaments";

const c = content as any;
const p = c.piercings || {};
const categories = p.categories || [];

const earPins: PinPosition[] = categories
  .flatMap((cat: any) => cat.items)
  .filter((it: any) => it.position)
  .map((it: any) => ({
    id: it.id,
    name: it.name,
    price: it.price,
    x: it.position.x,
    y: it.position.y,
  }));

const allItems = categories.flatMap((cat: any) =>
  cat.items.map((it: any) => ({ ...it, categoryId: cat.id, categoryLabel: cat.label }))
);

export default function PiercingsPage() {
  const [tab, setTab] = useState<string>("all");
  const [activePin, setActivePin] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const items = useMemo(
    () => (tab === "all" ? allItems : allItems.filter((it: any) => it.categoryId === tab)),
    [tab]
  );

  const focusItem = useMemo(
    () => allItems.find((it: any) => it.id === activePin),
    [activePin]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const item = allItems.find((it: any) => it.id === hash);
    if (!item) return;
    setTab("all");
    setActivePin(hash);
    setHighlighted(hash);
    // Wait for filtered list to render before scrolling.
    const t = window.setTimeout(() => {
      const el = document.getElementById(`p-${hash}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="pt-24 md:pt-32 relative">
      <div className="hidden lg:block chain-side chain-side-left">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>
      <div className="hidden lg:block chain-side chain-side-right">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 relative smoke-bg">
        <div className="text-center max-w-2xl mx-auto">
          <CrescentMoon size={32} className="mx-auto text-[var(--color-gold)] mb-3 animate-flicker" />
          <p className="eyebrow mb-2">{p.eyebrow || "𓆩 ☆ 𓆪"}</p>
          <h1 className="mb-3 text-balance">{p.title}</h1>
          <p className="text-[var(--color-muted-foreground)]">{p.intro}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center">
          <div className="relative">
            <div className="rock-card p-5 md:p-7 max-w-md mx-auto">
              <EarAnatomy
                pins={earPins}
                activeId={activePin || (highlighted as string | null)}
                onSelect={(id) => {
                  setActivePin(id);
                  setHighlighted(id);
                  const el = document.getElementById(`p-${id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              />
              <p className="text-center mt-4 text-[0.78rem] font-[var(--font-display)] uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                Selecciona una zona · Lista de piercings abajo
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <button
                onClick={() => setTab("all")}
                className={`tap px-4 py-2 font-[var(--font-display)] text-[0.72rem] uppercase tracking-[0.18em] border transition-all ${
                  tab === "all"
                    ? "border-[var(--color-primary-light)] bg-[var(--color-primary)] text-[var(--color-foreground)]"
                    : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-primary-light)]"
                }`}
              >
                Todos ({allItems.length})
              </button>
              {categories.map((cat: any) => (
                <button
                  key={cat.id}
                  onClick={() => setTab(cat.id)}
                  className={`tap px-4 py-2 font-[var(--font-display)] text-[0.72rem] uppercase tracking-[0.18em] border transition-all ${
                    tab === cat.id
                      ? "border-[var(--color-primary-light)] bg-[var(--color-primary)] text-[var(--color-foreground)]"
                      : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-primary-light)]"
                  }`}
                >
                  {cat.label} ({cat.items.length})
                </button>
              ))}
            </div>

            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
              {items.map((it: any) => (
                <PiercingCard
                  key={it.id}
                  item={it}
                  highlighted={highlighted === it.id || activePin === it.id}
                  onHover={(hover: boolean) => setHighlighted(hover ? it.id : null)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <DividerOrnament />

      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-8">
          <p className="eyebrow mb-2">Niveles de cuidado</p>
          <h2 className="text-[1.7rem] md:text-[2rem]">Cada perforación es distinta</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            { level: 1, title: "Nivel 1 · Iniciación",    desc: "Lóbulo, nostril, segundo lóbulo. Cicatrización rápida, molestias mínimas, joya desde el día uno.", icon: "💜" },
            { level: 2, title: "Nivel 2 · Cartílago común", desc: "Helix, tragus, conch, flat. Cicatrización 6-9 meses. Requiere joyería implantgrade específica.", icon: "⛓" },
            { level: 3, title: "Nivel 3 · Avanzado",      desc: "Daith, rook, industrial, anti-tragus. Meses de cicatrización y cuidados estrictos.", icon: "𓆩" },
          ].map((n) => (
            <div key={n.level} className="rock-card p-5 md:p-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[1.6rem]">{n.icon}</span>
                <h3 className="text-[1.05rem]">{n.title}</h3>
              </div>
              <p className="text-[var(--color-muted-foreground)] text-[0.92rem] leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-20 px-4 md:px-6 bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <Skull size={28} className="mx-auto text-[var(--color-primary-light)] mb-3" />
          <h2 className="mb-3 text-[1.6rem] md:text-[2rem]">¿Lista para reservar?</h2>
          <p className="text-[var(--color-muted-foreground)] mb-6 max-w-xl mx-auto">
            Contanos qué piercing querés, lo charlamos por WhatsApp y te agendamos en el horario disponible.
          </p>
          <Link
            href={`https://wa.me/${c.contacto?.whatsapp}?text=${encodeURIComponent("Hola! Quiero reservar la perforación: " + (focusItem?.name || ""))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gothic tap"
          >
            <CrossInverted size={14} className="text-[var(--color-gold)]" />
            Reservar por WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}

function PiercingCard({
  item,
  highlighted,
  onHover,
}: {
  item: any;
  highlighted?: boolean;
  onHover: (h: boolean) => void;
}) {
  return (
    <div
      id={`p-${item.id}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`rock-card p-4 md:p-5 text-left transition-all ${
        highlighted
          ? "border-[var(--color-primary-light)] shadow-[0_0_24px_rgba(139,26,49,0.5)] -translate-y-0.5"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CrossInverted size={12} className="text-[var(--color-gold)]" />
            <h3 className="text-[1.05rem] md:text-[1.1rem]">{item.name}</h3>
          </div>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)] font-[var(--font-display)]">
            {item.categoryLabel} · {item.downtime}
          </p>
        </div>
        <span className="price-tag whitespace-nowrap">{item.price}</span>
      </div>
      <p className="text-[var(--color-muted-foreground)] text-[0.92rem] leading-relaxed">{item.description}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] font-[var(--font-display)]">
          {[1, 2, 3].map((n) => (
            <CrossInverted
              key={n}
              size={9}
              className={n <= item.level ? "text-[var(--color-primary-light)]" : "text-[var(--color-border)]"}
            />
          ))}
          <span>Nivel {item.level}</span>
        </div>
      </div>
    </div>
  );
}