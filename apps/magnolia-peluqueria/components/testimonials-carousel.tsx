"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  name: string
  initials: string
  color: string
  quote: string
  service: string
  stars: number
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[]
  lang?: "es" | "en" | "en"
}

const colorMap: Record<string, string> = {
  rose: "bg-rose-100 text-rose-700",
  violet: "bg-violet-100 text-violet-700",
  amber: "bg-amber-100 text-amber-700",
  sky: "bg-sky-100 text-sky-700",
}

export function TestimonialsCarousel({
  testimonials,
  lang = "es",
}: TestimonialsCarouselProps) {
  const items = testimonials ?? defaultTestimonials
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = () => setCurrent((c) => (c + 1) % items.length)
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(next, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, items.length])

  const currentItem = items[current]

  return (
    <div
      className="relative max-w-2xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Quote mark */}
      <div className="text-center mb-6">
        <span className="text-6xl text-secondary/20 font-serif leading-none">"</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 text-center">
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-full text-lg font-bold mb-4 ${
            colorMap[currentItem.color] ?? colorMap.rose
          }`}
        >
          {currentItem.initials}
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-4">
          {Array.from({ length: currentItem.stars }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <blockquote className="text-foreground text-lg leading-relaxed mb-6 italic">
          &ldquo;{currentItem.quote}&rdquo;
        </blockquote>

        <div className="font-semibold text-primary">{currentItem.name}</div>
        <div className="text-sm text-foreground-light">{currentItem.service}</div>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors hidden md:flex"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors hidden md:flex"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(true) }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-secondary w-6" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const defaultTestimonials: Testimonial[] = [
  { name: "María Fernández", initials: "MF", color: "rose", quote: "Llevo 2 años yendo a Magnolia. El mejor balayage que me han hecho en mi vida. La atención es impecable.", service: "Balayage + Corte", stars: 5 },
  { name: "Carmen López", initials: "CL", color: "violet", quote: "Me encantó el tratamiento de keratina. El cabello quedó súper suave y duró más de 3 meses.", service: "Keratina", stars: 5 },
  { name: "Ana Martínez", initials: "AM", color: "amber", quote: "La única peluquería donde siento que me escuchan de verdad. El ambiente es hermoso y los precios muy justos.", service: "Coloración + Tratamiento", stars: 5 },
  { name: "Claudia Rodríguez", initials: "CR", color: "sky", quote: "Fui para mi boda y me hicieron un peinado espectacular. Todas las invitadas preguntaron dónde me hice el pelo.", service: "Peinado para Eventos", stars: 5 },
  { name: "Laura Benítez", initials: "LB", color: "rose", quote: "Las mechas me quedaron increíbles. Lidia es una artista. El salón es súper limpio y te hacen sentir como en casa.", service: "Mechas + Corte", stars: 5 },
]