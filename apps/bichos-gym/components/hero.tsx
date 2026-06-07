"use client"
import { Dumbbell } from "lucide-react"
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
  ctaLabel = "Sumate hoy",
  ctaHref,
  secondaryLabel = "Ver Servicios",
  secondaryHref = "/servicios",
  waPhone = "595986106062",
}: HeroProps) {
  const waMsg = `Hola!%20Quiero%20informaci%C3%B3n`
  const waLink = ctaHref || `https://wa.me/${waPhone}?text=${waMsg}`

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Bicho's Gym"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/95 via-[#1a1a2e]/80 to-[#1a1a2e]/70" />
      </div>
      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e94560] to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-6">
          <Dumbbell className="w-4 h-4 text-[#e94560]" />
          Gimnasio en Capiatá
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        <div className="w-16 h-0.5 bg-[#e94560] mx-auto mb-6" />
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={waLink}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#e94560] text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-[#d1344f] hover:scale-105 transition-all shadow-lg shadow-[#e94560]/20"
          >
            <Dumbbell className="w-5 h-5" /> {ctaLabel}
          </a>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-white/10 hover:border-white/50 transition-all"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f5f5] to-transparent" />
    </section>
  )
}
