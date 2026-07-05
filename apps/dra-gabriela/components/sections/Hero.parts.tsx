"use client"

import Image from "next/image"
import { Award, BadgeCheck, Clock, Hand, Heart, Languages, Shield, Sparkles } from "lucide-react"
import type { Locale } from "@/lib/content"

export function t(value: unknown, locale: Locale): string {
  if (value == null) return ""
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>
    const direct = obj[locale]
    if (typeof direct === "string") return direct
    const otherLocale = locale === "es" ? "en" : "es"
    const other = obj[otherLocale]
    if (typeof other === "string") return other
    for (const k of Object.keys(obj)) {
      const v = obj[k]
      if (typeof v === "string") return v
    }
  }
  return ""
}

const ANXIETY_CONTROLS = {
  es: [
    { icon: Hand, label: "Te escucho" },
    { icon: Heart, label: "Vos controlás el ritmo" },
    { icon: Shield, label: "Si necesitás parar, paramos" },
  ],
  en: [
    { icon: Hand, label: "I listen" },
    { icon: Heart, label: "You control the pace" },
    { icon: Shield, label: "If you need to stop, we stop" },
  ],
} as const

export function HeroBackground() {
  return null
}

interface HeadPillsProps {
  officeHoursShort?: string
  badge?: unknown
  isEs: boolean
  safeLocale: Locale
}
export function HeadPills({ officeHoursShort, badge, isEs, safeLocale }: HeadPillsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-5 justify-center md:justify-start animate-fade-in">
      {officeHoursShort && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-soft border border-success/20 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-xs font-bold text-accent-2 uppercase tracking-wider">
            {isEs ? "Abierto ahora" : "Open now"} · {officeHoursShort}
          </span>
        </div>
      )}
      {badge != null && badge !== "" && (
        <span className="eyebrow inline-flex">
          <Sparkles className="w-3 h-3" />
          {t(badge, safeLocale)}
        </span>
      )}
    </div>
  )
}

export function AnxietyControls({ isEs }: { isEs: boolean }) {
  return (
    <div className="aa-controls mb-6 animate-fade-in" aria-label={isEs ? "Lo que prometemos" : "What we promise"}>
      {ANXIETY_CONTROLS[isEs ? "es" : "en"].map((c, i) => {
        const Icon = c.icon
        return (
          <span key={i} className="aa-controls-item">
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{c.label}</span>
          </span>
        )
      })}
    </div>
  )
}

export function BilingualBand({ isEs }: { isEs: boolean }) {
  return (
    <div className="bilingual-band -mx-4 sm:-mx-6 lg:mx-0 mb-6 px-4 sm:px-6 lg:px-5 text-center md:text-left animate-fade-in-up">
      <p className="text-sm font-semibold text-accent-2">
        <Languages className="w-4 h-4 inline-block mr-1.5 -mt-0.5" aria-hidden="true" />
        {isEs
          ? "Atención en español e inglés · Asunción, Paraguay"
          : "Care in English and Spanish · Asunción, Paraguay"}
      </p>
    </div>
  )
}

interface TrustStripProps {
  trustLine?: unknown
  officeHoursShort?: string
  isEs: boolean
  safeLocale: Locale
}
export function TrustStrip({ trustLine, officeHoursShort, isEs, safeLocale }: TrustStripProps) {
  return (
    <div className="animate-fade-in-up-delay-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-4 border-b border-border-light">
        {trustLine != null && trustLine !== "" && (
          <span className="flex items-center gap-2 text-sm text-fg-muted">
            <BadgeCheck className="w-4 h-4 text-success" />
            {t(trustLine, safeLocale)}
          </span>
        )}
        {officeHoursShort && (
          <>
            <span className="hidden sm:block w-px h-4 bg-border" />
            <span className="flex items-center gap-2 text-sm text-fg-muted">
              <Clock className="w-4 h-4 text-accent-2" />
              {officeHoursShort}
            </span>
          </>
        )}
        <span className="hidden sm:block w-px h-4 bg-border" />
        <span className="flex items-center gap-2 text-sm text-fg-muted">
          <Languages className="w-4 h-4 text-accent" />
          ES · EN
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
        {[
          { v: "20+", l: isEs ? "Años" : "Years" },
          { v: "100%", l: isEs ? "Plan escrito" : "Written plan" },
          { v: "1:1", l: isEs ? "Atención personal" : "Personal care" },
        ].map((s, i) => (
          <div key={i} className="text-center md:text-left px-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-medium text-accent leading-none" style={{ fontFamily: "var(--font-heading)" }}>
              {s.v}
            </div>
            <div className="text-[9px] sm:text-[10px] text-fg-subtle uppercase tracking-wider font-semibold mt-1.5">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface PhotoFrameProps {
  heroImage?: string
  slide: any
  active: number
  safeLocale: Locale
  isEs: boolean
}
export function PhotoFrame({ heroImage, slide, active, safeLocale, isEs }: PhotoFrameProps) {
  if (!heroImage) {
    return (
      <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-accent to-accent-2 relative overflow-hidden shadow-2xl border-4 border-surface">
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, var(--color-yellow) 0%, transparent 50%), radial-gradient(circle at 70% 60%, white 0%, transparent 40%)" }} />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="text-center">
            <div className="text-8xl font-heading text-white/20" style={{ fontFamily: "var(--font-heading)" }}>DG</div>
            <div className="mt-4 w-20 h-0.5 bg-yellow/50 mx-auto" />
            <p className="text-white/50 text-xs tracking-widest uppercase mt-4" style={{ fontFamily: "var(--font-body)" }}>
              {isEs ? "Odontología con criterio" : "Caring dentistry"}
            </p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl border-2 border-accent/40 pointer-events-none" aria-hidden="true" />
      <div className="absolute -inset-7 rounded-3xl border-2 border-yellow/25 pointer-events-none animate-spin-slow" aria-hidden="true" />

      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-surface">
        <Image
          src={heroImage}
          alt={t(slide.title, safeLocale) || t(slide.subtitle, safeLocale) || "Dra. Gabriella"}
          fill
          priority={active === 0}
          fetchPriority={active === 0 ? "high" : "low"}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-500"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-transparent" />

        {slide.badge && (
          <div className="absolute top-5 left-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-accent-2" />
              <span className="text-xs font-semibold text-fg">{t(slide.badge, safeLocale)}</span>
            </div>
          </div>
        )}

        <div className="absolute bottom-5 left-5 right-5">
          <div className="card glass-panel p-4 flex items-center gap-3 shadow-2xl border-white/40">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-navy" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-fg truncate">
                {isEs ? "Dra. Gabriella González Pane" : "Dr. Gabriella González Pane"}
              </div>
              <div className="text-[10px] text-fg-muted truncate">
                {isEs ? "Odontóloga · UAP 2005" : "Dentist · UAP 2005"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-2 border-yellow opacity-40 -z-10 animate-float" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border-2 border-accent opacity-30 -z-10 animate-float-slow" />
      <div className="absolute top-1/2 -right-12 w-4 h-4 rounded-full bg-yellow animate-float" />
    </div>
  )
}

interface CarouselDotsProps {
  slides: any[]
  active: number
  total: number
  isEs: boolean
  onSelect: (i: number) => void
}
export function CarouselDots({ slides, active, total, isEs, onSelect }: CarouselDotsProps) {
  return (
    <div className="mt-5 flex items-center gap-2 justify-center lg:justify-start" aria-label={isEs ? "Diapositivas del hero" : "Hero slides"}>
      <div className="flex items-center gap-1.5">
        {slides.map((_s, i) => {
          const isActive = i === active
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`${isEs ? "Ir a la diapositiva" : "Go to slide"} ${i + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={`min-h-[24px] min-w-[24px] h-1.5 rounded-full transition-all duration-300 cursor-pointer p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                isActive ? "w-8 bg-yellow" : "w-1.5 bg-border hover:bg-yellow/50"
              }`}
            />
          )
        })}
      </div>
      <span className="ml-2 text-[10px] uppercase tracking-wider text-fg-subtle font-bold tabular-nums">
        Hero · {active + 1} / {total}
      </span>
    </div>
  )
}
