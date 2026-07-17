"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import content from "@/content/es.json";
import { AnatomySwitcher, type CatalogItem } from "@/components/AnatomySwitcher";
import { ChainVertical, Skull, CrossInverted, CrescentMoon, DividerOrnament } from "@/components/ornaments";
import { whatsappUrl } from "@/lib/site-config";

const c = content as any;
const p = c.piercings || {};
const categories = p.categories || [];

const allItems: CatalogItem[] = categories.flatMap((cat: any) =>
  cat.items.map((it: any) => ({ ...it, categoryId: cat.id, categoryLabel: cat.label }))
);

function PiercingsPageInner() {
  const [region, setRegion] = useState<"oreja" | "rostro" | "cuerpo">("oreja");
    // ?pin=<id> deeplink: switches region to where that pin lives
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("pin");
    if (id) {
      const it = allItems.find((x) => x.id === id);
      if (it && it.region) {
        setRegion(it.region);
        // Scroll to the corresponding area card
        setTimeout(() => {
          const el = document.getElementById(`p-${id}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
      }
    }
  }, []);

  // #<pin-id> hash deeplink: scroll to the matching catalog card.
  // (Region-switching is handled by the ?pin=<id> effect above.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const item = allItems.find((it: any) => it.id === hash);
    if (!item) return;
    if (item.region) setRegion(item.region);
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

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 relative smoke-bg">
        <div className="text-center max-w-2xl mx-auto">
          <CrescentMoon size={32} className="mx-auto text-[var(--color-gold)] mb-3 animate-flicker" />
          <p className="eyebrow mb-2">{p.eyebrow || "𓆩 ☆ 𓆪"}</p>
          <h1 className="mb-3 text-balance">{p.title || "Catálogo de piercings"}</h1>
          <p className="text-[var(--color-muted-foreground)]">
            {p.intro ||
              "Tocá una zona del cuerpo o navegá por categoría. Cada perforación con su tiempo de cicatrización, materiales y precio."}
          </p>
        </div>
      </section>

      {/* Selector visual interactivo */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <AnatomySwitcher
          items={allItems}
          whatsapp={c.contacto?.whatsapp || "595981324569"}
          initialRegion={region}
        />
      </section>

      <DividerOrnament />

      {/* Niveles */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-8">
          <p className="eyebrow mb-2">Niveles de cuidado</p>
          <h2 className="text-[1.7rem] md:text-[2rem]">Cada perforación es distinta</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {[
            {
              level: 1,
              title: "Nivel 1 · Iniciación",
              desc: "Lóbulo, nostril, segundo lóbulo. Cicatrización rápida, molestias mínimas, joya desde el día uno.",
              icon: "💜",
            },
            {
              level: 2,
              title: "Nivel 2 · Cartílago común",
              desc: "Helix, tragus, conch, flat. Cicatrización 6-9 meses. Requiere joyería implantgrade específica.",
              icon: "⛓",
            },
            {
              level: 3,
              title: "Nivel 3 · Avanzado",
              desc: "Daith, rook, industrial, anti-tragus. Meses de cicatrización y cuidados estrictos.",
              icon: "𓆩",
            },
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

      {/* Cómo trabajamos */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="text-center mb-8">
          <p className="eyebrow mb-2">Cómo trabajamos</p>
          <h2 className="text-[1.7rem] md:text-[2rem]">Tu cita, paso a paso</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {[
            { n: "01", title: "Reservá", desc: "Por WhatsApp. Pedimos seña Gs 50.000." },
            { n: "02", title: "Asesoramiento", desc: "Te escuchamos y revisamos la anatomía." },
            { n: "03", title: "Estudio", desc: "Ambiente cuidado en Asunción." },
            { n: "04", title: "Perforación", desc: "Técnica precisa, joyería implantgrade." },
            { n: "05", title: "Cuidados", desc: "Kit + seguimiento 1 sem / 1 mes / 3 meses." },
          ].map((s) => (
            <div key={s.n} className="rock-card p-4 text-left">
              <p className="font-[var(--font-script)] text-[var(--color-gold)] text-[1.6rem] leading-none">{s.n}</p>
              <p className="font-[var(--font-display)] uppercase tracking-[0.18em] text-[0.78rem] mt-1">{s.title}</p>
              <p className="text-[0.85rem] text-[var(--color-muted-foreground)] mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 md:py-20 px-4 md:px-6 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <Skull size={28} className="mx-auto text-[var(--color-primary-light)] mb-3" />
          <h2 className="mb-3 text-[1.6rem] md:text-[2rem]">¿Lista para reservar?</h2>
          <p className="text-[var(--color-muted-foreground)] mb-6 max-w-xl mx-auto">
            Contanos qué piercing querés. Lo charlamos por WhatsApp y te agendamos.
          </p>
          <a
            href={whatsappUrl(c.contacto?.whatsapp, "Hola! Quiero reservar la perforación.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gothic tap"
          >
            <CrossInverted size={14} className="text-[var(--color-gold)]" />
            Reservar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

export default function PiercingsPage() {
  return <PiercingsPageInner />;
}
