"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import content from "@/content/es.json"

const slides = [
  {
    icon: "💜",
    title: "Bienestar y Placer",
    subtitle: "Productos de calidad para tu bienestar íntimo. Envío discreto garantizado.",
    cta: "Ver Catálogo",
    href: "/tienda",
  },
  {
    icon: "🎁",
    title: "Sets Especiales",
    subtitle: "Combos completos para empezar o regalar. Todo en empaque discreto.",
    cta: "Ver Sets",
    href: "/tienda?cat=sets",
  },
  {
    icon: "🔒",
    title: "Envío Discreto",
    subtitle: "Todos los pedidos en cajas neutras. Sin logos, sin marcas. Privacidad total.",
    cta: "Más Info",
    href: "/envio",
  },
]

export function HeroCarousel() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const s = slides[idx]

  return (
    <section className="relative overflow-hidden py-16 px-4 text-center"
      style={{ background: "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-background) 50%, var(--color-surface) 100%)" }}>
      <div className="max-w-2xl mx-auto relative z-10 animate-slide-up" key={idx}>
        <div className="text-5xl mb-4">{s.icon}</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">{s.title}</h1>
        <p className="text-muted-foreground text-lg mb-6">{s.subtitle}</p>
        <Link href={s.href}
          className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold no-underline hover:bg-primary/90 transition-colors">
          {s.cta}
        </Link>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-2 bg-border"}`} />
        ))}
      </div>
    </section>
  )
}
