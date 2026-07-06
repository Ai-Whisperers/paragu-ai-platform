"use client";

import Link from "next/link";
import content from "@/content/es.json";
import { ChainVertical, Skull, CrossInverted, CrescentMoon, DividerOrnament } from "@/components/ornaments";

const c = content as any;
const ct = c.contacto || {};

export default function ContactoPage() {
  return (
    <div className="pt-24 md:pt-32 relative">
      <div className="hidden lg:block chain-side chain-side-left">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>
      <div className="hidden lg:block chain-side chain-side-right">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <div className="text-center max-w-2xl mx-auto">
          <CrescentMoon size={32} className="mx-auto text-[var(--color-gold)] mb-3 animate-flicker" />
          <p className="eyebrow mb-2">𓆩 ☆ 𓆪</p>
          <h1 className="mb-3 text-balance">{ct.title}</h1>
          <p className="text-[var(--color-muted-foreground)]">{ct.subtitle}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-5">
            <a
              href={`https://wa.me/${ct.whatsapp}?text=${encodeURIComponent("Hola! Quiero reservar una cita.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rock-card p-6 md:p-7 block no-underline text-[var(--color-foreground)] hover:shadow-[0_0_40px_rgba(176,136,56,0.25)] transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-gold)">
                  <path d="M17.5 14.4c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1c-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.3-1.4c1.5.8 3.1 1.3 4.7 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
                <div>
                  <p className="eyebrow mb-1">WhatsApp · Respuesta rápida</p>
                  <p className="font-[var(--font-display)] text-[1.3rem] tracking-[0.08em]">{ct.whatsappDisplay}</p>
                </div>
              </div>
              <p className="text-[var(--color-muted-foreground)] text-[0.92rem]">Tocá para iniciar una conversación. Te respondemos a la brevedad.</p>
              <div className="flex items-center gap-2 mt-3 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-primary-light)] font-[var(--font-display)]">
                <CrossInverted size={10} className="text-[var(--color-gold)]" />
                Hacer clic para chatear
              </div>
            </a>

            <div className="rock-card p-6 md:p-7">
              <Skull size={20} className="text-[var(--color-gold)] mb-3" />
              <p className="eyebrow mb-2">Estudio</p>
              <p className="text-[1.05rem] mb-1">{ct.address}</p>
              <p className="text-[var(--color-muted-foreground)] text-[0.92rem]">{ct.neighborhood}</p>
            </div>

            <a
              href={`mailto:${ct.email}`}
              className="rock-card p-6 md:p-7 block no-underline text-[var(--color-foreground)]"
            >
              <CrossInverted size={20} className="text-[var(--color-gold)] mb-3" />
              <p className="eyebrow mb-2">Email</p>
              <p className="text-[1rem]">{ct.email}</p>
            </a>

            <a
              href={`https://instagram.com/${ct.instagram?.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rock-card p-6 md:p-7 block no-underline text-[var(--color-foreground)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37 A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37 Z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <p className="eyebrow mb-2">Instagram</p>
              <p className="text-[1rem]">{ct.instagram}</p>
            </a>
          </div>

          <div>
            <div className="rock-card p-6 md:p-7">
              <CrescentMoon size={22} className="text-[var(--color-gold)] mb-3 animate-flicker" />
              <p className="eyebrow mb-2">Horarios</p>
              <h3 className="text-[1.1rem] mb-4">Atención con cita previa</h3>

              <div className="divide-y divide-[var(--color-border)]">
                {ct.schedule?.map((s: any) => (
                  <div key={s.day} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <span className="font-[var(--font-display)] text-[0.85rem] uppercase tracking-[0.18em] text-[var(--color-foreground)]">{s.day}</span>
                    <span className={`text-[0.92rem] ${s.hours === "Cerrado" ? "text-[var(--color-muted-foreground)] italic" : "text-[var(--color-gold)] font-[var(--font-display)] tracking-[0.08em]"}`}>
                      {s.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[var(--color-primary-light)] font-[var(--font-display)] mb-3">Modalidad de atención</p>
                <p className="text-[var(--color-muted-foreground)] text-[0.92rem] leading-relaxed">
                  Atendemos exclusivamente con cita previa. Para reservar, escribinos por WhatsApp con el piercing que querés y el horario que te quede cómodo. Te enviamos la dirección exacta del estudio al confirmar.
                </p>
              </div>
            </div>

            <div className="rock-card p-6 md:p-7 mt-5">
              <Skull size={20} className="text-[var(--color-primary-light)] mb-3" />
              <p className="eyebrow mb-2">Tu cita</p>
              <h3 className="text-[1.1rem] mb-4">Qué traer · Qué esperar</h3>
              <ul className="space-y-2.5 text-[0.92rem] text-[var(--color-muted-foreground)]">
                {[
                  "Documento de identidad (obligatorio)",
                  "No tomar alcohol 24h antes",
                  "No estés en ayunas (comé liviano)",
                  "Vení con la zona limpia, sin maquillaje",
                  "Si tenés piercing previo, traé joyería para retiro",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <CrossInverted size={10} className="text-[var(--color-gold)] mt-1.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <DividerOrnament />
    </div>
  );
}