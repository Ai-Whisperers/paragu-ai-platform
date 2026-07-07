"use client";

import Link from "next/link";
import content from "@/content/es.json";
import { ChainVertical, Skull, CrossInverted, CrescentMoon, Bat, DividerOrnament } from "@/components/ornaments";
import { whatsappUrl } from "@/lib/site-config";

const c = content as any;
const n = c.nosotros || {};
const v = n.values || [];

export default function NosotrosPage() {
  return (
    <div className="pt-24 md:pt-32 relative">
      <div className="hidden lg:block chain-side chain-side-left">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>
      <div className="hidden lg:block chain-side chain-side-right">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 relative">
        <div className="text-center max-w-2xl mx-auto">
          <CrescentMoon size={32} className="mx-auto text-[var(--color-gold)] mb-3 animate-flicker" />
          <p className="eyebrow mb-2">{n.eyebrow}</p>
          <h1 className="mb-3 text-balance">{n.title}</h1>
          <p className="text-[var(--color-muted-foreground)] font-[var(--font-script)] text-[1.5rem] leading-tight text-[var(--color-primary-light)]">
            {n.intro}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-6 pb-12">
        <div className="space-y-5 text-[var(--color-muted-foreground)] text-[1.02rem] leading-relaxed">
          {n.paragraphs?.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <DividerOrnament />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="eyebrow mb-2">𓆩 ☆ 𓆪</p>
          <h2>Nuestros principios</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {v.map((val: any, i: number) => (
            <div key={i} className="rock-card p-6 md:p-7 text-left relative overflow-hidden">
              <div className="absolute -top-3 -right-3 text-[var(--color-primary-light)]/15">
                <span className="font-[var(--font-display)] text-[5rem] leading-none font-bold">0{i + 1}</span>
              </div>
              <CrossInverted size={12} className="text-[var(--color-gold)] mb-3 relative" />
              <h3 className="text-[1.1rem] mb-2 relative">{val.title}</h3>
              <p className="text-[var(--color-muted-foreground)] text-[0.95rem] leading-relaxed relative">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-6 bg-[var(--color-surface)] relative">
        <Bat size={32} className="bat-flock text-[var(--color-accent-light)] opacity-25" style={{ top: "10%", right: "5%" }} />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-2">𓆩 Sobre el estudio 𓆪</p>
            <h2 className="text-[1.7rem] md:text-[2.2rem] mb-3">El estudio en imágenes</h2>
            <p className="text-[var(--color-muted-foreground)] max-w-xl mx-auto">
              Un espacio pequeño, cuidado y pensado para que cada visita sea una experiencia.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { label: "Sillón",   decor: <CrossInverted size={42} className="text-[var(--color-primary-light)]" /> },
              { label: "Autoclave",decor: <Skull size={42} className="text-[var(--color-gold)]" /> },
              { label: "Mostrador",decor: <CrescentMoon size={42} className="text-[var(--color-primary-light)]" /> },
              { label: "Joyería",  decor: <CrossInverted size={42} className="text-[var(--color-gold)]" /> },
              { label: "Atelier",  decor: <Skull size={42} className="text-[var(--color-primary-light)]" /> },
              { label: "Estética", decor: <CrescentMoon size={42} className="text-[var(--color-gold)]" /> },
            ].map((cell, i) => (
              <div
                key={i}
                className="aspect-square rock-card flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary-deep)] via-[var(--color-surface)] to-[var(--color-card)] relative overflow-hidden"
              >
                {cell.decor}
                <span className="absolute bottom-2 left-2 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-primary-light)] font-[var(--font-display)]">
                  {cell.label}
                </span>
                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-[var(--color-background)]/85 border border-[var(--color-primary-light)] text-[0.55rem] uppercase tracking-[0.18em] text-[var(--color-primary-light)] font-[var(--font-display)]">
                  Foto pendiente
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Skull size={26} className="mx-auto text-[var(--color-primary-light)] mb-3" />
          <h2 className="text-[1.6rem] md:text-[2rem] mb-3">¿Charlamos?</h2>
          <p className="text-[var(--color-muted-foreground)] mb-6">Te respondemos cualquier duda por WhatsApp. Sin compromiso.</p>
          <Link
            href={whatsappUrl(c.contacto?.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gothic tap"
          >
            <CrossInverted size={14} className="text-[var(--color-gold)]" />
            Escribir por WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}