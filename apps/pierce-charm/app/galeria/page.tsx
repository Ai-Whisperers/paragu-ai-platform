"use client";

import { useState } from "react";
import Link from "next/link";
import content from "@/content/es.json";
import type { SiteContent, ContentItem } from "@/lib/content-types";
import { ChainVertical, Skull, CrossInverted, CrescentMoon, Bat, DividerOrnament } from "@/components/ornaments";
import { whatsappUrl } from "@/lib/site-config";

const c = content as SiteContent;
const g = c.gallery || {};
const allItems = g.items || [];
const cats = g.categories || [];

export default function GaleriaPage() {
  const [tab, setTab] = useState<string>("all");
  const [material, setMaterial] = useState<string>("all");

  let items = tab === "all" ? allItems : allItems.filter((it: ContentItem) => it.category === tab);
  items = material === "all" ? items : items.filter((it: ContentItem) => it.material === material);

  return (
    <div className="pt-24 md:pt-32 relative">
      <div className="hidden lg:block chain-side chain-side-left">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>
      <div className="hidden lg:block chain-side chain-side-right">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-8 relative">
        <Bat size={28} className="bat-flock text-[var(--color-primary-light)] opacity-30" style={{ top: "20%", right: "10%" }} />
        <CrescentMoon size={26} className="absolute top-12 left-12 text-[var(--color-gold)] opacity-50 animate-flicker hidden md:block" />

        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-2">𓆩 Curaduría 𓆪</p>
          <h1 className="mb-3 text-balance">{g.title}</h1>
          <p className="text-[var(--color-muted-foreground)]">{g.subtitle}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setTab("all")}
            className={`tap px-4 py-2 font-[var(--font-display)] text-[0.72rem] uppercase tracking-[0.18em] border transition-all ${
              tab === "all"
                ? "border-[var(--color-primary-light)] bg-[var(--color-primary)] text-[var(--color-foreground)]"
                : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-primary-light)]"
            }`}
          >
            Todas
          </button>
          {cats.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setTab(cat)}
              className={`tap px-4 py-2 font-[var(--font-display)] text-[0.72rem] uppercase tracking-[0.18em] border transition-all ${
                tab === cat
                  ? "border-[var(--color-primary-light)] bg-[var(--color-primary)] text-[var(--color-foreground)]"
                  : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-primary-light)]"
              }`}
            >
              {cat}
                        </button>
                      ))}
                      </div>
                    </section>

                    {/* Filtro por material */}
                    {g.filters?.material && g.filters.material.length > 1 && (
                      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
                        <div className="flex flex-wrap gap-2 items-center justify-center">
                          <span className="font-[var(--font-display)] text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] mr-2">
                            Material:
                          </span>
                          {g.filters.material.map((m: ContentItem) => (
                            <button
                              key={m.id}
                              onClick={() => setMaterial(m.id)}
                              className={`tap px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] border transition-all ${
                                material === m.id
                                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                                  : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-gold)]"
                              }`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>
                        {(tab !== "all" || material !== "all") && (
                          <p className="text-center text-[0.78rem] text-[var(--color-muted-foreground)] mt-3">
                            {items.length} {items.length === 1 ? "pieza" : "piezas"}
                          </p>
                        )}
                      </section>
                    )}

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {items.map((it: ContentItem, i: number) => (
            <GalleryCard key={i} item={it} index={i} />
          ))}
        </div>
      </section>

      <DividerOrnament />

      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 text-center">
        <Skull size={26} className="mx-auto text-[var(--color-primary-light)] mb-3" />
        <h2 className="text-[1.6rem] md:text-[2rem] mb-3">¿Te interesa alguna pieza?</h2>
        <p className="text-[var(--color-muted-foreground)] mb-6 max-w-xl mx-auto">
          Consultá disponibilidad por WhatsApp. Trabajamos con curaduría de joyería alternativa y hacemos piezas por encargo.
        </p>
        <Link
          href={whatsappUrl(c.contacto?.whatsapp, "Hola! Quiero info sobre la pieza de joyería: ")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gothic tap"
        >
          <CrossInverted size={14} className="text-[var(--color-gold)]" />
          Consultar por WhatsApp
        </Link>
      </section>
    </div>
  );
}

function GalleryCard({ item, index }: { item: ContentItem; index: number }) {
  const variant = index % 6;

  return (
    <div className="rock-card overflow-hidden text-left group">
      <div
        className="relative aspect-square w-full flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(${(variant * 60) % 360}deg, var(--color-secondary-deep), var(--color-card))`,
        }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-4 right-4 text-[var(--color-primary-light)]">
            <CrossInverted size={28} />
          </div>
          <div className="absolute bottom-4 left-4 text-[var(--color-gold)]">
            <Skull size={22} />
          </div>
        </div>

        <OrnamentVisual variant={variant} />

        {/* Honest placeholder: rebrand como "Curaduría" en vez de admitir ausencia */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-[var(--color-background)]/85 border border-[var(--color-gold)] text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-gold)] font-[var(--font-display)] backdrop-blur-sm">
          Curaduría
        </div>

        <span className="absolute top-2 left-2 px-2 py-0.5 bg-[var(--color-background)]/80 border border-[var(--color-primary-light)] text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] font-[var(--font-display)]">
          {item.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-[1rem] mb-1.5">{item.name}</h3>
        <p className="text-[var(--color-muted-foreground)] text-[0.85rem] leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)] text-[0.7rem]">
          <span className="text-[var(--color-gold)] font-[var(--font-display)] uppercase tracking-[0.18em]">
            {item.material || "Implantgrade"}
          </span>
          <span className="text-[var(--color-muted-foreground)]">
            {item.priceType || "Gs 50.000"}
          </span>
        </div>
      </div>
    </div>
  );
}

function OrnamentVisual({ variant }: { variant: number }) {
  const v = variant;
  if (v === 0) {
    return (
      <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none">
        {Array.from({ length: 5 }).map((_, i) => (
          <ellipse key={i} cx="50" cy={20 + i * 18} rx="20" ry="8" fill="none" stroke="#b08838" strokeWidth="2" />
        ))}
        <circle cx="50" cy="50" r="6" fill="#8b1a31" />
      </svg>
    );
  }
  if (v === 1) {
    return (
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
        <path d="M5 8 C5 4.5 8.5 2 12 2 C15.5 2 19 4.5 19 8 V14 L17 16 V20 H14 V18 H10 V20 H7 V16 L5 14 Z" fill="#8b1a31" />
        <circle cx="9" cy="9" r="2" fill="#0a0612" />
        <circle cx="15" cy="9" r="2" fill="#0a0612" />
        <path d="M11 12 H13 L12.5 14 Z" fill="#0a0612" />
      </svg>
    );
  }
  if (v === 2) {
    return (
      <svg width="50%" height="50%" viewBox="0 0 24 24" fill="#520b4e">
        <path d="M9 2 H15 V8 H21 V14 H15 V20 H9 V14 H3 V8 H9 Z" />
        <circle cx="12" cy="11" r="2" fill="#b08838" />
      </svg>
    );
  }
  if (v === 3) {
    return (
      <svg width="65%" height="40%" viewBox="0 0 64 36" fill="#211b54">
        <path d="M32 6 L30 8 C18 4 6 8 2 16 C6 12 12 12 18 16 C16 12 22 10 28 14 L30 12 L32 14 L34 12 L36 14 C42 10 48 12 46 16 C52 12 58 12 62 16 C58 8 46 4 34 8 Z" />
        <circle cx="28" cy="9" r="0.8" fill="#c0392b" />
        <circle cx="36" cy="9" r="0.8" fill="#c0392b" />
      </svg>
    );
  }
  if (v === 4) {
    return (
      <svg width="50%" height="60%" viewBox="0 0 24 32" fill="none">
        <path d="M12 2 C 8 8, 4 14, 4 20 A8 8 0 0 0 20 20 C 20 14, 16 8, 12 2 Z" fill="none" stroke="#b08838" strokeWidth="1.5" />
        <path d="M12 2 C 8 8, 4 14, 4 20 A8 8 0 0 0 20 20 C 20 14, 16 8, 12 2 Z" fill="rgba(139, 26, 49, 0.4)" />
      </svg>
    );
  }
  return (
    <svg width="55%" height="55%" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="36" stroke="#b08838" strokeWidth="3" fill="none" />
      <circle cx="50" cy="50" r="14" fill="#63081d" />
      <circle cx="50" cy="50" r="6" fill="#b08838" />
    </svg>
  );
}