"use client"

// Section: Hero — full-viewport premium hero with slide rotation.
// Decorative shapes, animated open-now pill, gradient text with gold shadow,
// trust strip with dividers, photo frame with corner ribbon.
//
// Carousel:
//   - Multiple slides rotate on a 6s timer
//   - Dots indicator with clickable controls
//   - Keyboard navigation (← / →) when focused
//   - Pauses on hover/focus and when document is hidden
//   - Respects prefers-reduced-motion (no autoplay)

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, MessageCircle, Clock, Sparkles, Languages, Award, BadgeCheck, Hand, Heart, Shield } from "lucide-react"
import Image from "next/image"
import { whatsappLink } from "@/lib/content"

// Anti-anxiety controls row (Insight 1 + 6) — three promises, single band
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

const ROTATE_MS = 6000

interface HeroProps {
  c: any
  locale: string
}

export function Hero({ c, locale }: HeroProps) {
  const h = c.hero
  if (!h) return null
  const base = `/${locale}`
  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const slides: any[] = Array.isArray(h.slides) && h.slides.length > 0 ? h.slides : [{}]
  const total = slides.length
  const isEs = locale === "es"
  const hasMultipleSlides = total > 1

  // Carousel state
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const regionRef = useRef<HTMLDivElement>(null)

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(m.matches)
    const onChange = () => setReduceMotion(m.matches)
    m.addEventListener?.("change", onChange)
    return () => m.removeEventListener?.("change", onChange)
  }, [])

  // Auto-rotate. Skip when paused, hidden, reduced-motion, or single slide.
  // First rotation is delayed (8s) so users can actually read slide 1
  // before it changes; subsequent rotations are the normal 6s interval.
  const FIRST_ROTATE_MS = 8000
  const [hasFirstRotated, setHasFirstRotated] = useState(false)
  useEffect(() => {
    if (!hasMultipleSlides || paused || reduceMotion) return
    let id: ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>
    const onVis = () => {
      if (document.hidden) return
      setActive((cur) => (cur + 1) % total)
    }
    if (!hasFirstRotated) {
      setHasFirstRotated(true)
      id = setTimeout(onVis, FIRST_ROTATE_MS)
    } else {
      id = setInterval(onVis, ROTATE_MS)
    }
    return () => {
      clearTimeout(id as ReturnType<typeof setTimeout>)
      clearInterval(id as ReturnType<typeof setInterval>)
    }
  }, [hasMultipleSlides, paused, reduceMotion, total, hasFirstRotated])

  // Keyboard navigation: ← / → when region has focus
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultipleSlides) return
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setActive((cur) => (cur - 1 + total) % total)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setActive((cur) => (cur + 1) % total)
    }
  }

  const slide = slides[active] || {}
  const heroImage = slide?.image

  return (
    <section
      className="relative overflow-hidden min-h-[680px] lg:min-h-[760px] flex items-center bg-gradient-to-br from-accent-soft via-bg to-bg"
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 dot-pattern opacity-50" />
      </div>

      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content — changes per slide */}
          <div
            className="relative z-10 text-center md:text-left"
            aria-live={hasMultipleSlides ? "polite" : undefined}
            aria-atomic="false"
            ref={regionRef}
            tabIndex={hasMultipleSlides ? 0 : undefined}
            onKeyDown={onKey}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            role={hasMultipleSlides ? "region" : undefined}
            aria-roledescription={hasMultipleSlides ? "carousel" : undefined}
            aria-label={hasMultipleSlides ? (isEs ? "Hero principal — salud y criterio clínico" : "Hero — primary call to action") : undefined}
          >
            {/* Top row: live pill + lang switch */}
            <div className="flex flex-wrap items-center gap-2 mb-5 justify-center md:justify-start animate-fade-in">
              {h.office_hours_short && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-soft border border-success/20 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                  </span>
                  <span className="text-xs font-bold text-accent-2 uppercase tracking-wider">
                    {isEs ? "Abierto ahora" : "Open now"} · {h.office_hours_short}
                  </span>
                </div>
              )}
              {h.badge && (
                <span className="eyebrow inline-flex">
                  <Sparkles className="w-3 h-3" />
                  {h.badge}
                </span>
              )}
            </div>

            {/* Anti-anxiety controls band (Insight 1: empathy shown, named) */}
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

            {/* Bilingual promise band (Insight 4: bilingual visible, not hidden) */}
            <div className="bilingual-band -mx-4 sm:-mx-6 lg:mx-0 mb-6 px-4 sm:px-6 lg:px-5 text-center md:text-left animate-fade-in-up">
              <p className="text-sm font-semibold text-accent-2">
                <Languages className="w-4 h-4 inline-block mr-1.5 -mt-0.5" aria-hidden="true" />
                {isEs
                  ? "Atención en español e inglés · Asunción, Paraguay"
                  : "Care in English and Spanish · Asunción, Paraguay"}
              </p>
            </div>

            {/* Heading — solid navy with whimsical font */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight mb-5 leading-[1.05] animate-fade-in-up text-[#000080]"
              key={`h-${active}`}
              style={{ fontFamily: "var(--font-whimsical)" }}
            >
              {slide.title || h.title}
            </h1>

            {/* Gold accent rule */}
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold-2 rounded-full mb-7 mx-auto md:mx-0 animate-wipe" />

            {slide.subtitle && (
              <p className="lead max-w-2xl mb-9 animate-fade-in-up-delay" key={`s-${active}`}>
                {slide.subtitle}
              </p>
            )}
            {!slide.subtitle && h.subtitle && (
              <p className="lead max-w-2xl mb-9 animate-fade-in-up-delay" key={`sf-${active}`}>
                {h.subtitle}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-in-up-delay-2">
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-base group"
                  aria-label={isEs ? "Escribirme por WhatsApp" : "Message me on WhatsApp"}
                >
                  <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                  {slide.cta || h.cta_primary || (isEs ? "Pedir plan sin compromiso" : "Get a no-obligation plan")}
                </a>
              ) : (
                <Link href={`/${locale}/contact`} className="btn btn-primary text-base px-8 py-4 group">
                  <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                  {h.cta_primary || (isEs ? "Coordinar consulta" : "Book a consultation")}
                </Link>
              )}
              <Link
                href={slide.ctaLink || `${base}/second-opinion`}
                className="btn btn-outline text-base px-8 py-4 group"
              >
                {slide.ctaSecondary || h.cta_secondary || (isEs ? "Segunda opinión" : "Second opinion")}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust strip */}
            <div className="animate-fade-in-up-delay-3">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-4 border-b border-border-light">
                {h.trust_line && (
                  <span className="flex items-center gap-2 text-sm text-fg-muted">
                    <BadgeCheck className="w-4 h-4 text-success" />
                    {h.trust_line}
                  </span>
                )}
                {h.office_hours_short && (
                  <>
                    <span className="hidden sm:block w-px h-4 bg-border" />
                    <span className="flex items-center gap-2 text-sm text-fg-muted">
                      <Clock className="w-4 h-4 text-gold" />
                      {h.office_hours_short}
                    </span>
                  </>
                )}
                <span className="hidden sm:block w-px h-4 bg-border" />
                <span className="flex items-center gap-2 text-sm text-fg-muted">
                  <Languages className="w-4 h-4 text-accent" />
                  ES · EN
                </span>
              </div>

              {/* Mini stat row */}
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
                {[
                  { v: "20+", l: isEs ? "Años" : "Years" },
                  { v: "100%", l: isEs ? "Plan escrito" : "Written plan" },
                  { v: "MSPBS", l: isEs ? "Inscripta" : "Registered" },
                ].map((s, i) => (
                  <div key={i} className="text-center md:text-left px-1">
                    <div
                      className="text-xl sm:text-2xl md:text-3xl font-medium text-accent leading-none"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {s.v}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-fg-subtle uppercase tracking-wider font-semibold mt-1.5">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: visual — image carousel */}
          <div className="relative max-w-md mx-auto lg:max-w-none">
            {heroImage ? (
              <div className="relative">
                {/* Outer gold ring */}
                <div className="absolute -inset-4 rounded-3xl border-2 border-gold/30 pointer-events-none" aria-hidden="true" />
                <div className="absolute -inset-7 rounded-3xl border-2 border-accent/15 pointer-events-none animate-spin-slow" aria-hidden="true" />

                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-surface">
                  {/* Render only the active slide's image. Image is `priority` only on first mount. */}
                  <Image
                    src={heroImage}
                    alt={slide.title || slide.subtitle || "Dra. Gabriella"}
                    fill
                    priority={active === 0}
                    fetchPriority={active === 0 ? "high" : "low"}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-opacity duration-500"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-transparent" />

                  {/* Floating badge */}
                  {slide.badge && (
                    <div className="absolute top-5 left-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        <span className="text-xs font-semibold text-fg">{slide.badge}</span>
                      </div>
                    </div>
                  )}

                  {/* Floating credential card bottom */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="card glass-panel p-4 flex items-center gap-3 shadow-2xl border-white/40">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-fg truncate">
                          {isEs ? "Dra. Gabriella González Pane" : "Dr. Gabriella González Pane"}
                        </div>
                        <div className="text-[10px] text-fg-muted truncate">
                          {isEs ? "Reg. MSPBS 3618 · UAP 2005" : "MSPBS 3618 · UAP 2005"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative circles (float) */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-2 border-gold opacity-30 -z-10 animate-float" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border-2 border-accent opacity-20 -z-10 animate-float-slow" />
                <div className="absolute top-1/2 -right-12 w-4 h-4 rounded-full bg-gold animate-float" />
              </div>
            ) : (
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-accent to-accent-2 relative overflow-hidden shadow-2xl border-4 border-surface">
                <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, var(--gold) 0%, transparent 50%), radial-gradient(circle at 70% 60%, white 0%, transparent 40%)" }} />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
                <div className="absolute inset-0 flex items-center justify-center p-16">
                  <div className="text-center">
                    <div className="text-8xl font-heading text-white/20" style={{ fontFamily: "var(--font-heading)" }}>DG</div>
                    <div className="mt-4 w-20 h-0.5 bg-gold/40 mx-auto" />
                    <p className="text-white/50 text-xs tracking-widest uppercase mt-4" style={{ fontFamily: "var(--font-body)" }}>
                      {isEs ? "Odontología con criterio" : "Caring dentistry"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Carousel dots + counter */}
            {hasMultipleSlides && (
              <div className="mt-5 flex items-center gap-2 justify-center lg:justify-start" aria-label={isEs ? "Diapositivas del hero" : "Hero slides"}>
                <div className="flex items-center gap-1.5">
                  {slides.map((s: any, i: number) => {
                    const isActive = i === active
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`${isEs ? "Ir a la diapositiva" : "Go to slide"} ${i + 1}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`min-h-[24px] min-w-[24px] h-1.5 rounded-full transition-all duration-300 cursor-pointer p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                                                   isActive ? "w-8 bg-gold" : "w-1.5 bg-border hover:bg-gold/50"
                                                 }`}
                      />
                    )
                  })}
                </div>
                <span className="ml-2 text-[10px] uppercase tracking-wider text-fg-subtle font-bold tabular-nums">
                  {isEs ? "Hero" : "Hero"} · {active + 1} / {total}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-fg-subtle text-xs uppercase tracking-widest pointer-events-none">
        <span>{isEs ? "Conocé más" : "Learn more"}</span>
        <span className="w-px h-8 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  )
}
