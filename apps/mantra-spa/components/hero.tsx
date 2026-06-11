"use client"
import { Sparkles } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  waPhone?: string
}

export function Hero({
  title,
  subtitle,
  ctaLabel = "Reservar",
  ctaHref,
  secondaryLabel = "Ver Servicios",
  secondaryHref = "/servicios",
  waPhone = "595986106062",
}: HeroProps) {
  const waMsg = `Hola!%20Quiero%20informaci%C3%B3n`
  const waLink = ctaHref || `https://wa.me/${waPhone}?text=${waMsg}`

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Mantra Spa ambiente"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1a2e]/90 via-[#0f1a2e]/70 to-[#0f1a2e]/60" />
      </div>

      {/* Decorative gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-6">
          <Sparkles className="w-4 h-4 text-[#c9a96e]" />
          Spa & Wellness en Concepción
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>

        <div className="w-16 h-0.5 bg-[#c9a96e] mx-auto mb-6" />

        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#c9a96e] text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-[#b8944e] hover:scale-105 transition-all shadow-lg shadow-[#c9a96e]/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
            {ctaLabel}
          </a>
          <Link href={secondaryHref}
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-white/10 hover:border-white/50 transition-all">
            {secondaryLabel}
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f7f4] to-transparent" />
    </section>
  )
}
