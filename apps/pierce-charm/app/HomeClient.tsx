/* Server home client component */
"use client";

import { useState } from "react";
import Link from "next/link";
import content from "@/content/es.json";
import {
  ChainVertical,
  Bat,
  Skull,
  CrossInverted,
  Candle,
  CrescentMoon,
  DividerOrnament,
} from "@/components/ornaments";
import { EarAnatomy, type PinPosition } from "@/components/EarAnatomy";
import { whatsappUrl } from "@/lib/site-config";
import { BannerTicker } from "@/components/BannerTicker";
import { Testimonials } from "@/components/Testimonials";

const c = content as any;
const h = c.home || {};
const hero = h.hero || {};
const bannerTicker = h.banner_ticker;
const story = h.story || {};
const features = h.features?.items || [];
const steps = h.process?.steps || [];
const finalCta = h.finalCta || {};

const heroPins: PinPosition[] = [
  { id: "helix",  name: "Helix",  price: "Gs 100.000", x: 38, y: 22 },
  { id: "rook",   name: "Rook",   price: "Gs 100.000", x: 24, y: 47 },
  { id: "daith",  name: "Daith",  price: "Gs 100.000", x: 18, y: 48 },
  { id: "lobulo", name: "Lóbulo", price: "Gs 50.000",  x: 32, y: 82 },
  { id: "tragus", name: "Tragus", price: "Gs 100.000", x: 18, y: 55 },
  { id: "conch",  name: "Conch",  price: "Gs 100.000", x: 22, y: 60 },
];

export default function HomeInner() {
  const [activePin, setActivePin] = useState<string | null>(null);

  return (
    <div className="relative">
      {bannerTicker?.enabled && bannerTicker?.messages?.length ? (
        <BannerTicker messages={bannerTicker.messages} intervalSec={bannerTicker.rotation_seconds || 5} />
      ) : null}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 overflow-hidden smoke-bg">
        <div className="hidden lg:block chain-side chain-side-left">
          <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
        </div>
        <div className="hidden lg:block chain-side chain-side-right">
          <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
        </div>

        <Bat size={36} className="bat-flock text-[var(--color-primary-light)]" style={{ top: "12%", left: "8%" }} />
                                
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
          <div className="text-center lg:text-left">
            <p className="script text-[var(--color-gold)] text-[1.4rem] md:text-[1.6rem] mb-2 leading-none">
              {h.hero?.eyebrow?.split("·")[0]?.trim()}
            </p>
            <p className="eyebrow mb-4">Estudio de piercings · Asunción</p>
            <h1 className="text-balance mb-5 text-[var(--color-foreground)]">
              <span className="block text-[0.78rem] font-[var(--font-display)] uppercase tracking-[0.3em] text-[var(--color-primary-light)] mb-2">Estudio de Piercings · Asunción</span>
              <span className="block">{c.tagline}</span>
              <span className="block font-[var(--font-script)] text-[var(--color-primary-light)] text-[1.4em] -mt-2 leading-none">
                {h.hero?.headline?.split("\n")?.[1] || "tu historia"}
              </span>
            </h1>
            <p className="text-[var(--color-muted-foreground)] text-[1.05rem] md:text-[1.15rem] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {h.hero?.subheadline}
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-10 text-xs">
              {["Bioseguridad certificada", "Titanio implantgrade", "Asesoramiento 1:1"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
                  <CrossInverted size={10} className="text-[var(--color-gold)]" />
                  <span className="font-[var(--font-display)] uppercase tracking-[0.2em]">{t}</span>
                </div>
              ))}
            </div>
            <p className="font-[var(--font-script)] text-[var(--color-primary-light)] text-[1.2rem] mt-4 text-center lg:text-left italic">
              ↓ explorá el catálogo abajo
            </p>
          </div>

          <div className="relative">
            <Candle size={70} className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block opacity-80" />
            <Candle size={70} className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block opacity-80" />

            <div className="relative p-6 md:p-8 border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-card)] shadow-2xl">
              <div className="absolute top-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[var(--color-primary-light)] to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-light)] to-transparent" />

              <div className="text-center mb-3">
                <p className="eyebrow text-[var(--color-gold)]">Cartografía · Mapa de piercings</p>
                <p className="font-[var(--font-script)] text-[var(--color-primary-light)] text-[1.4rem] leading-none mt-1">
                  Toca una zona
                </p>
              </div>

              <EarAnatomy pins={heroPins} activeId={activePin} onSelect={(id) => setActivePin(id)} />

              <p className="text-center mt-4 text-[0.75rem] text-[var(--color-muted-foreground)] font-[var(--font-display)] uppercase tracking-[0.22em]">
                {activePin
                  ? `${heroPins.find((p) => p.id === activePin)?.name} — ${heroPins.find((p) => p.id === activePin)?.price}`
                  : "6 ubicaciones populares en el cartílago"}
              </p>
            </div>
          </div>
        </div>

        <DividerOrnament className="mt-10" />
      </section>

      <section className="py-16 md:py-20 px-4 md:px-6 max-w-4xl mx-auto relative blood-wash">
        <Skull size={20} className="absolute top-6 left-4 text-[var(--color-primary-light)]/40 hidden md:block" />
        <Skull size={20} className="absolute top-6 right-4 text-[var(--color-primary-light)]/40 hidden md:block" />

        <div className="text-left md:text-center max-w-2xl md:mx-auto mb-10">
          <p className="eyebrow mb-3">{story.eyebrow}</p>
          <h2>{story.title}</h2>
        </div>

        <div className="space-y-5 text-[var(--color-muted-foreground)] text-[1.02rem] leading-relaxed">
          {story.paragraphs?.map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--color-surface)] relative overflow-hidden">
        <Bat size={32} className="bat-flock text-[var(--color-accent-light)] opacity-30" style={{ top: "10%", right: "5%" }} />
        <CrescentMoon size={22} className="absolute bottom-12 left-8 text-[var(--color-gold)] opacity-30 animate-flicker hidden md:block" />

        <div className="max-w-7xl mx-auto">
          <div className="text-left md:text-center max-w-2xl md:mx-auto mb-12">
            <p className="eyebrow mb-3">𓆩 ☆ 𓆪</p>
            <h2>{h.features?.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {features.map((f: any, i: number) => (
              <FeatureCard key={i} f={f} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-left md:text-center max-w-2xl md:mx-auto mb-12">
          <p className="eyebrow mb-3">{h.process?.eyebrow}</p>
          <h2>{h.process?.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {steps.map((s: any, i: number) => (
            <div key={i} className="rock-card p-5 md:p-6 text-left">
              <div className="flex items-start justify-between mb-3">
                <span className="font-[var(--font-display)] text-[var(--color-primary-light)] text-[1.6rem] font-bold leading-none">
                  {s.n}
                </span>
                <CrossInverted size={12} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="text-[1.1rem] mb-2">{s.title}</h3>
              <p className="text-[var(--color-muted-foreground)] text-[0.92rem] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--color-surface)] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-left md:text-center max-w-2xl md:mx-auto mb-12">
            <p className="eyebrow mb-3">{h.catalogTeaser?.eyebrow || '𓆩 Catálogo 𓆪'}</p>
            <h2>{h.catalogTeaser?.title || 'Elegí tu perforación'}</h2>
            <p className="text-[var(--color-muted-foreground)] mt-3">
              {h.catalogTeaser?.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {[
              { name: "Helix", desc: "Cartílago superior" },
              { name: "Lóbulo", desc: "Clásico" },
              { name: "Tragus", desc: "Solapa externa" },
              { name: "Daith", desc: "Pliegue interno" },
              { name: "Rook", desc: "Pliegue vertical" },
              { name: "Industrial", desc: "Doble helix" },
              { name: "Conch", desc: "Concha central" },
              { name: "Septum", desc: "Tabique nasal" },
            ].map((item) => (
              <Link
                href="/piercings"
                key={item.name}
                className="rock-card p-4 md:p-5 no-underline text-[var(--color-foreground)] block"
              >
                <CrossInverted size={12} className="text-[var(--color-gold)] mb-2" />
                <h3 className="text-[1rem] md:text-[1.05rem] mb-1">{item.name}</h3>
                <p className="text-[0.78rem] text-[var(--color-muted-foreground)] font-[var(--font-display)] uppercase tracking-[0.18em]">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/piercings" className="btn-gothic tap">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTOS TEASER */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-[var(--color-surface)] border-y border-[var(--color-primary-light)]/30 relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <CrescentMoon size={48} className="text-[var(--color-gold)] shrink-0 animate-flicker" />
            <div className="flex-1 text-center md:text-left">
              <p className="eyebrow mb-2">𓆩 Próximos eventos 𓆪</p>
              <h2 className="text-[1.4rem] md:text-[1.8rem] mb-2">¿Te enterás primero?</h2>
              <p className="text-[var(--color-muted-foreground)] text-[0.95rem]">
                Lanzamientos, noches de piercing, ferias, eventos en la mascarada y colaboraciones.
                Sumate a la lista de WhatsApp para enterarte antes que nadie.
              </p>
            </div>
            <Link
              href="/eventos"
              className="btn-gothic-outline tap shrink-0"
            >
              Ver agenda
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <Testimonials data={c.testimonios} phone={c.contacto?.whatsapp} />

      {/* NEWSLETTER / NOTIFICACIONES */}
      {c.newsletter?.enabled && (
        <section className="py-14 md:py-20 px-4 md:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--color-background), var(--color-surface))' }}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-3">{c.newsletter.eyebrow || '𓆩 Subscribite 𓆪'}</p>
            <h2 className="mb-3">{c.newsletter.title || 'Querés enterarte de lo nuevo?'}</h2>
            <p className="text-[var(--color-muted-foreground)] mb-6">
              {c.newsletter.subtitle}
            </p>
            <a
              href={whatsappUrl(c.contacto?.whatsapp, "Hola! Quiero sumarme a las notificaciones de Pierce Charm.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gothic tap inline-flex"
            >
              <CrossInverted size={14} className="text-[var(--color-gold)]" />
              {c.newsletter.cta || 'Sumate por WhatsApp'}
            </a>
            <p className="text-[0.78rem] mt-4 text-[var(--color-muted-foreground)]">
              Frecuencia: {c.newsletter.frequency || 'mensual'} · sin spam
            </p>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative overflow-hidden smoke-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139, 26, 49, 0.4), transparent 70%)",
          }}
        />
        <Skull size={28} className="absolute top-12 left-12 text-[var(--color-primary-light)]/30 hidden md:block" />
        <Skull size={28} className="absolute bottom-12 right-12 text-[var(--color-primary-light)]/30 hidden md:block" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <CrescentMoon size={36} className="mx-auto text-[var(--color-gold)] animate-flicker mb-4" />
          <h2 className="mb-4 text-balance">{finalCta.title}</h2>
          <p className="text-[var(--color-muted-foreground)] text-[1.05rem] md:text-[1.15rem] mb-8 leading-relaxed max-w-xl mx-auto">
            {finalCta.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={whatsappUrl(c.contacto?.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-gothic tap">
              <CrossInverted size={14} className="text-[var(--color-gold)]" />
              {finalCta.primaryText}
            </a>
            <Link href={finalCta.secondaryHref} className="btn-gothic-outline tap">
              {finalCta.secondaryText}
            </Link>
          </div>
          <p className="mt-8 font-[var(--font-script)] text-[var(--color-gold)] text-[1.6rem] leading-none">
            𓆩 Reservá tu cita 𓆪
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ f }: { f: any }) {
  const iconMap: Record<string, React.ReactElement> = {
    shield: <ShieldIcon />,
    sparkles: <SparklesIcon />,
    heart: <HeartIcon />,
    stethoscope: <StethoscopeIcon />,
    clock: <ClockIcon />,
    gem: <GemIcon />,
  };

  return (
    <div className="rock-card p-5 md:p-6 text-left relative">
      <div className="absolute top-3 right-3 text-[var(--color-primary-light)]/30">
        <CrossInverted size={10} />
      </div>
      <div className="w-12 h-12 mb-4 flex items-center justify-center text-[var(--color-primary-light)] bg-[var(--color-primary)]/10 border border-[var(--color-primary-light)]/30 rounded-sm">
        {iconMap[f.icon] || <GemIcon />}
      </div>
      <h3 className="text-[1.05rem] md:text-[1.15rem] mb-2 text-[var(--color-foreground)]">{f.title}</h3>
      <p className="text-[var(--color-muted-foreground)] text-[0.92rem] leading-relaxed">{f.description}</p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L20 5 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V5 Z" />
    </svg>
  );
}
function SparklesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L13.5 9 L21 10.5 L13.5 12 L12 19 L10.5 12 L3 10.5 L10.5 9 Z" />
      <path d="M19 4 L20 6 L22 7 L20 8 L19 10 L18 8 L16 7 L18 6 Z" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21 L2 9.5 A5.5 5.5 0 0 1 12 6 A5.5 5.5 0 0 1 22 9.5 Z" />
    </svg>
  );
}
function StethoscopeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4 V10 A6 6 0 0 0 11 16 H13 A6 6 0 0 0 19 10 V4" />
      <path d="M3 4 H7 M17 4 H21" />
      <circle cx="20" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 V12 L15 14" />
    </svg>
  );
}
function GemIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 9 L12 2 L19 9 L12 22 Z" />
      <path d="M5 9 H19 M9 9 L12 22 L15 9 M12 2 L9 9 H15 Z" />
    </svg>
  );
}