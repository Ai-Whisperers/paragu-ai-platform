// Section: Hero — full-viewport with decorative shapes, gradient text,
// image card, trust bar, and pulsing live indicator.

import Link from "next/link"
import { ArrowRight, MessageCircle, Clock, Sparkles } from "lucide-react"
import Image from "next/image"
import { whatsappLink } from "@/lib/content"

export function Hero({ c, locale }: { c: any; locale: string }) {
  const h = c.hero
  if (!h) return null
  const base = `/${locale}`
  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const slide = h.slides?.[0]
  const heroImage = slide?.image
  const isEs = locale === "es"

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-[var(--accent-soft)] via-[var(--bg)] to-[var(--bg)]">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Accent blob top-right */}
        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
        {/* Gold blob bottom-left */}
        <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
        {/* Accent mid-left */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)" }} />
        {/* Dot pattern */}
        <div className="absolute inset-0 dot-pattern" />
      </div>

      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="relative z-10 text-left">
            {h.badge && (
              <span className="eyebrow inline-flex animate-fade-in">
                <Sparkles className="w-3 h-3" />
                {h.badge}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight mb-6 leading-[1.05] animate-fade-in-up">
              <span className="gradient-text">{h.title}</span>
            </h1>
            {h.subtitle && (
              <p className="lead max-w-2xl mb-10 animate-fade-in-up-delay">
                {h.subtitle}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-in-up-delay-2">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-base px-8 py-4">
                  <MessageCircle className="w-5 h-5" />
                  {h.cta_primary || (isEs ? "Pedir plan sin compromiso" : "Get a no-obligation plan")}
                </a>
              ) : (
                <Link href={`/${locale}/contact`} className="btn btn-primary text-base px-8 py-4">
                  <MessageCircle className="w-5 h-5" />
                  {h.cta_primary || (isEs ? "Coordinar consulta" : "Book a consultation")}
                </Link>
              )}
              <Link
                href={`/${locale}/${isEs ? "second-opinion" : "second-opinion"}`}
                className="btn btn-outline text-base px-8 py-4"
              >
                {h.cta_secondary || (isEs ? "Segunda opinión" : "Second opinion")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pb-2">
              {h.trust_line && (
                <span className="flex items-center gap-2.5 text-sm text-[var(--fg-muted)]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--success)]"></span>
                  </span>
                  {h.trust_line}
                </span>
              )}
              {h.office_hours_short && (
                <span className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                  <Clock className="w-4 h-4 text-[var(--gold)]" />
                  {h.office_hours_short}
                </span>
              )}
            </div>

            {/* Mini social proof bar */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] grid grid-cols-3 gap-4 max-w-md">
              <div>
                <div className="text-2xl font-medium text-[var(--accent)]" style={{ fontFamily: "var(--font-heading)" }}>20+</div>
                <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">{isEs ? "Años" : "Years"}</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-[var(--accent)]" style={{ fontFamily: "var(--font-heading)" }}>ES+EN</div>
                <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">{isEs ? "Idiomas" : "Languages"}</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-[var(--accent)]" style={{ fontFamily: "var(--font-heading)" }}>100%</div>
                <div className="text-xs text-[var(--fg-subtle)] uppercase tracking-wider">{isEs ? "Plan escrito" : "Written plan"}</div>
              </div>
            </div>
          </div>

          {/* Right: decorative visual */}
          <div className="relative hidden lg:block">
            {heroImage ? (
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-[var(--radius-2xl)] overflow-hidden shadow-2xl border border-[var(--border)]">
                  <Image
                    src={heroImage}
                    alt={slide?.title || "Dra. Gabriella"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/30 via-transparent to-transparent" />
                  {slide?.badge && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="card backdrop-blur-sm bg-white/95 px-5 py-3 border-0 shadow-lg flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                        <span className="text-sm font-medium text-[var(--fg)]">{slide.badge}</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* Decorative gold ring */}
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-2 border-[var(--gold)] opacity-30 -z-10" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-2 border-[var(--accent)] opacity-20 -z-10" />
              </div>
            ) : (
              <div className="aspect-[4/5] rounded-[var(--radius-2xl)] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] relative overflow-hidden shadow-2xl border border-[var(--accent)]/20">
                <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, var(--gold) 0%, transparent 50%), radial-gradient(circle at 70% 60%, white 0%, transparent 40%)" }} />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
                <div className="absolute inset-0 flex items-center justify-center p-16">
                  <div className="text-center">
                    <div className="text-8xl font-heading text-white/20" style={{ fontFamily: "var(--font-heading)" }}>DG</div>
                    <div className="mt-4 w-20 h-0.5 bg-[var(--gold)]/40 mx-auto" />
                    <p className="text-white/50 text-xs tracking-widest uppercase mt-4" style={{ fontFamily: "var(--font-body)" }}>Odontología con criterio</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[var(--fg-subtle)] text-xs uppercase tracking-widest pointer-events-none">
        <span>{isEs ? "Conocé más" : "Learn more"}</span>
        <span className="w-px h-6 bg-[var(--border)]" />
      </div>
    </section>
  )
}
