// Section: FeaturedService — large 2-col layout with image + content.
// Big text, proper icon size, breathing room.

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle, CheckCircle2, Sparkles } from "lucide-react"
import { whatsappLink } from "@/lib/content"

interface FeaturedServiceProps {
  locale: string
  content: any
  variant?: "light" | "lime"
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
        variant === "lime" ? "ink-light bg-gradient-to-br from-[#023e8a] via-[#03045e] to-[#023e8a] text-white" : "tone-ocean-5"
      }`}
    >
      {/* Decorative blob */}
      {variant === "light" && (
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
      )}
      {variant === "lime" && (
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }} />
      )}

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
          {/* Image */}
          <div className={`relative ${reverse ? "lg:order-2" : ""}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-border">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-transparent" />
            </div>
            {/* Decorative gold ring — top right */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-2 border-gold opacity-30 -z-10" />
            {/* Decorative accent ring — bottom left */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-2 border-accent opacity-20 -z-10" />
          </div>

          {/* Content — left-aligned, big text */}
          <div className={reverse ? "lg:order-1 text-left" : "text-left"}>
            <span
              className={`eyebrow inline-flex ${
                variant === "lime" ? "!border-white/20 !bg-white/10 !text-gold" : ""
              }`}
            >
              <Sparkles className="w-3 h-3" />
              {eyebrow}
            </span>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.05] ${variant === "lime" ? "!text-white" : ""}`}>
              {variant === "lime" ? <span className="text-white">{title}</span> : title}
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed mb-8 max-w-xl ${variant === "lime" ? "text-white/85" : "text-fg-muted"}`}>
              {body}
            </p>

            {/* Bullets with BIG icons */}
            <ul className="space-y-4 mb-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                      variant === "lime" ? "bg-gold" : "bg-accent-soft"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        variant === "lime" ? "text-[#03045e]" : "text-accent"
                      }`}
                    />
                  </div>
                  <span
                    className={`leading-relaxed text-base pt-0.5 ${
                      variant === "lime" ? "text-white/90" : "text-fg-muted"
                    }`}
                  >
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              {ctaHref === "whatsapp" && wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`btn ${variant === "lime" ? "btn-gold" : "btn-primary"} text-base px-8 py-4`}>
                  <MessageCircle className="w-5 h-5" />
                  {ctaLabel}
                </a>
              ) : (
                <Link href={ctaHref} className={`btn ${variant === "lime" ? "btn-gold" : "btn-primary"} text-base px-8 py-4`}>
                  {ctaLabel} <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              {ctaSecondaryLabel && ctaSecondaryHref && (
                <Link
                  href={ctaSecondaryHref}
                  className={`btn ${variant === "lime" ? "btn-white" : "btn-outline"} text-base px-8 py-4`}
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
