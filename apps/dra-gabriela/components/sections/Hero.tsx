// Section: Hero
// Single, calm hero. The JSON has a `slides` array but we render one focused
// moment rather than a carousel — the brand's "no rush" tone reads better as
// a single statement. CTAs use whatsappLink() so a missing WhatsApp number
// falls back gracefully to /contacto.

import Link from "next/link"
import { ArrowRight, MessageCircle, Clock, Sparkles } from "lucide-react"
import { whatsappLink } from "@/lib/content"
import Image from "next/image"

export function Hero({ c, locale }: { c: any; locale: string }) {
  const h = c.hero
  if (!h) return null
  const base = `/${locale}`
  const wa = whatsappLink(c.business?.whatsapp, c.business?.whatsappMessage)
  const slide = h.slides?.[0]
  const heroImage = slide?.image

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--accent-soft)] via-[var(--bg)] to-[var(--bg)]">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 25% 30%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 80% 70%, var(--gold) 0%, transparent 50%)" }} />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="max-w-2xl">
            <span className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              {h.badge || c.site?.name}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-6">
              <span className="gradient-text">{h.title}</span>
            </h1>
            {h.subtitle && (
              <p className="text-lg md:text-xl text-[var(--fg-muted)] max-w-2xl mb-8 leading-relaxed">
                {h.subtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
              {wa ? (
                <a href={wa} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" /> {h.cta_primary || "Pedir plan sin compromiso"}
                </a>
              ) : (
                <Link href={`${base}/contacto`} className="btn btn-primary">
                  <MessageCircle className="w-4 h-4" /> {h.cta_primary || "Coordinar consulta"}
                </Link>
              )}
              <Link href={`${base}${locale === "es" ? "/segunda-opinion" : "/second-opinion"}`} className="btn btn-outline">
                {h.cta_secondary || "Segunda opinión"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--fg-muted)]">
              {h.trust_line && (
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                  {h.trust_line}
                </span>
              )}
              {h.office_hours_short && (
                <span className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> {h.office_hours_short}
                </span>
              )}
            </div>
          </div>

          {heroImage && (
            <div className="relative">
              <div className="relative aspect-[16/10] rounded-[var(--radius-xl)] overflow-hidden shadow-2xl border border-[var(--border)]">
                <Image
                  src={heroImage}
                  alt={slide.title || "Dra. Gabriella"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {slide.badge && (
                <div className="absolute -bottom-3 -left-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-2 shadow-lg">
                  <span className="text-xs font-medium text-[var(--accent)]">{slide.badge}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
