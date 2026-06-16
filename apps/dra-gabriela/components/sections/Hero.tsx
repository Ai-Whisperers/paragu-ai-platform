// Section: Hero
// Full-viewport hero with decorative SVG background, gradient text, and
// polished CTAs. The badge, trust_line, and hours are data-driven from JSON.

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

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-[var(--accent-soft)] via-[var(--bg)] to-[var(--bg)]">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 dot-pattern" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="relative z-10">
            {h.badge && (
              <span className="eyebrow inline-flex">
                <Sparkles className="w-3 h-3" />
                {h.badge}
              </span>
            )}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 leading-[1.05]">
              <span className="gradient-text">{h.title}</span>
            </h1>
            {h.subtitle && (
              <p className="text-lg md:text-xl text-[var(--fg-muted)] max-w-xl mb-10 leading-relaxed">
                {h.subtitle}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-base px-8 py-4">
                  <MessageCircle className="w-5 h-5" />
                  {h.cta_primary || "Pedir plan sin compromiso"}
                </a>
              ) : (
                <Link href={`/${locale}/contact`} className="btn btn-primary text-base px-8 py-4">
                  <MessageCircle className="w-5 h-5" />
                  {h.cta_primary || "Coordinar consulta"}
                </Link>
              )}
              <Link
                href={`${base}${locale === "es" ? "/segunda-opinion" : "/second-opinion"}`}
                className="btn btn-outline text-base px-8 py-4"
              >
                {h.cta_secondary || "Segunda opinión"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
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
          </div>

          {/* Right: decorative visual */}
          <div className="relative hidden lg:block">
            {heroImage ? (
              <div className="relative aspect-[4/5] rounded-[var(--radius-2xl)] overflow-hidden shadow-2xl border border-[var(--border)]">
                <Image
                  src={heroImage}
                  alt={slide?.title || "Dra. Gabriella"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/30 via-transparent to-transparent" />
                {slide?.badge && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="card backdrop-blur-sm bg-white/90 px-5 py-3 border-0 shadow-lg flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                      <span className="text-sm font-medium text-[var(--fg)]">{slide.badge}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Abstract brand visual when no image */
              <div className="aspect-[4/5] rounded-[var(--radius-2xl)] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] relative overflow-hidden shadow-2xl border border-[var(--accent)]/20">
                <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, var(--gold) 0%, transparent 50%), radial-gradient(circle at 70% 60%, white 0%, transparent 40%)" }} />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
                <div className="absolute inset-0 flex items-center justify-center p-16">
                  <div className="text-center">
                    <div className="text-8xl font-heading font-medium text-white/20" style={{ fontFamily: "var(--font-heading)" }}>DG</div>
                    <div className="mt-4 w-20 h-0.5 bg-[var(--gold)]/40 mx-auto" />
                    <p className="text-white/50 text-xs tracking-widest uppercase mt-4" style={{ fontFamily: "var(--font-body)" }}>Odontología con criterio</p>
                  </div>
                </div>
                {/* Decorative floating elements */}
                <div className="absolute top-12 left-12 w-16 h-16 rounded-full border border-white/10" />
                <div className="absolute top-20 right-16 w-8 h-8 rounded-full bg-[var(--gold)]/20" />
                <div className="absolute bottom-24 left-20 w-12 h-12 rounded-full border border-white/10" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
