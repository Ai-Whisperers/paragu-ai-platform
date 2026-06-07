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
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/95" />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-secondary-dark hover:scale-105 transition-all shadow-lg">
            <Sparkles className="w-5 h-5" /> {ctaLabel}
          </a>
          <Link href={secondaryHref}
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-white/10 transition-all">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
