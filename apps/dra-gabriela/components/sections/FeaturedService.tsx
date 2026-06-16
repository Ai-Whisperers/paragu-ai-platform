// Section: FeaturedService — a large, photo-backed service highlight.
// Used in the home page between the standard sections. Has 2 variants: light/teal.

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"
import { whatsappLink } from "@/lib/content"

interface FeaturedServiceProps {
  locale: string
  content: any
  variant?: "light" | "teal"
  bgClass?: string
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  imageSrc: string
  imageAlt: string
  ctaLabel: string
  ctaHref: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  reverse?: boolean
}

export function FeaturedService({
  locale,
  content,
  variant = "light",
  eyebrow,
  title,
  body,
  bullets,
  imageSrc,
  imageAlt,
  ctaLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  reverse = false,
}: FeaturedServiceProps) {
  const wa = whatsappLink(content?.business?.whatsapp, content?.business?.whatsappMessage)
  const isEs = locale === "es"

  return (
    <section
      className={`relative overflow-hidden ${
        variant === "teal" ? "bg-gradient-to-br from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent)] text-white" : ""
      }`}
    >
      {/* Decorative blob */}
      {variant === "light" && (
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
      )}
      {variant === "teal" && (
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
      )}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
          {/* Image */}
          <div className={`relative ${reverse ? "lg:order-2" : ""}`}>
            <div className="relative aspect-[3/2] rounded-[var(--radius-2xl)] overflow-hidden shadow-2xl border border-[var(--border)]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Decorative gold corner accent */}
              <div className="absolute -top-3 -right-3 w-24 h-24 rounded-full border-2 border-[var(--gold)] opacity-30" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-full border-2 border-[var(--gold)] opacity-30" />
            </div>
          </div>

          {/* Content */}
          <div className={reverse ? "lg:order-1" : ""}>
            <span
              className={`eyebrow inline-flex ${
                variant === "teal" ? "!border-white/20 !bg-white/10 !text-[var(--gold)]" : ""
              }`}
            >
              {eyebrow}
            </span>
            <h2 className={`text-3xl md:text-5xl mb-5 ${variant === "teal" ? "!text-white" : ""}`}>
              {variant === "teal" ? <span className="text-white">{title}</span> : title}
            </h2>
            <p className={`text-lg mb-7 leading-relaxed ${variant === "teal" ? "text-white/85" : "text-[var(--fg-muted)]"}`}>
              {body}
            </p>
            <ul className="space-y-2.5 mb-8">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 ${variant === "teal" ? "text-white/90" : "text-[var(--fg-muted)]"}`}
                >
                  <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${variant === "teal" ? "text-[var(--gold)]" : "text-[var(--accent)]"}`} />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              {ctaHref === "whatsapp" && wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`btn ${variant === "teal" ? "btn-gold" : "btn-primary"}`}>
                  <MessageCircle className="w-4 h-4" />
                  {ctaLabel}
                </a>
              ) : (
                <Link href={ctaHref} className={`btn ${variant === "teal" ? "btn-gold" : "btn-primary"}`}>
                  {ctaLabel} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {ctaSecondaryLabel && ctaSecondaryHref && (
                <Link
                  href={ctaSecondaryHref}
                  className={`btn ${variant === "teal" ? "btn-white" : "btn-outline"}`}
                >
                  {ctaSecondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
