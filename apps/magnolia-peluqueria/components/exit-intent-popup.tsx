"use client"
import { useState, useEffect } from "react"
import { X, MessageCircle, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { business } from "@/lib/config"

export function ExitIntentPopup({ lang = "es" }: { lang?: "es" | "en" | "en" }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    { name: "María Fernández", quote: "El mejor balayage que me han hecho en mi vida. La atención es impecable.", service: "Balayage + Corte", stars: 5 },
    { name: "Claudia Rodríguez", quote: "Fui para mi boda y me hicieron un peinado espectacular. ¡100% recomendado!", service: "Peinado para Eventos", stars: 5 },
    { name: "Laura Benítez", quote: "Las mechas me quedaron increíbles. Lidia es una artista.", service: "Mechas + Corte", stars: 5 },
    { name: "Carmen López", quote: "El tratamiento de keratina me duró más de 3 meses. Relación calidad-precio excelente.", service: "Keratina", stars: 5 },
  ]

  useEffect(() => {
    const key = "magnolia_exit_intent_dismissed"
    const dismissedAt = localStorage.getItem(key)
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000

    if (dismissedAt && now - parseInt(dismissedAt) < oneDay) {
      setDismissed(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setVisible(true)
      }
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      if (scrollTop / (scrollHeight - clientHeight) > 0.6 && !dismissed) {
        setVisible(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [dismissed])

  function dismiss() {
    setVisible(false)
    setDismissed(true)
    localStorage.setItem("magnolia_exit_intent_dismissed", Date.now().toString())
  }

  const labels = lang === "es"
    ? {
        badge: "Solo por hoy",
        title: "No te vayas con las manos vacías",
        subtitle: "Recibí un 20% de descuento en tu primera visita",
        cta: "Quiero mi descuento",
        promoCode: "PRIMERA20",
        testimonialLabel: "Lo que dicen nuestras clientas",
        close: "Cerrar",
        next: "Siguiente",
        prev: "Anterior",
      }
    : {
        badge: "Only today",
        title: "Don't leave empty-handed",
        subtitle: "Get 20% off your first visit",
        cta: "Get my discount",
        promoCode: "PRIMERA20",
        testimonialLabel: "What our clients say",
        close: "Close",
        next: "Next",
        prev: "Prev",
      }

  function goNext() {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }
  function goPrev() {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const waMsg = encodeURIComponent(
    lang === "es"
      ? "Hola! Tengo el código PRIMERA20 y quiero reservar mi primera visita con descuento."
      : "Hi! I have the code PRIMERA20 and I want to book my first visit with a discount."
  )

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label={labels.close}
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Badge */}
        <div className="bg-secondary px-6 py-3">
          <p className="text-center text-sm font-bold text-white uppercase tracking-widest">
            🎁 {labels.badge}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="font-heading text-3xl font-bold text-primary text-center mb-3">
            {labels.title}
          </h2>
          <p className="text-center text-foreground-light mb-6 text-lg">
            {labels.subtitle}
          </p>

          {/* Promo code */}
          <div className="bg-gray-50 border-2 border-dashed border-secondary rounded-xl p-4 text-center mb-6">
            <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">
              {lang === "es" ? "Tu código de descuento" : "Your discount code"}
            </p>
            <p className="font-heading text-3xl font-bold text-primary tracking-widest">
              {labels.promoCode}
            </p>
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/${business.whatsapp}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold w-full py-4 rounded-xl hover:bg-[#20BD5A] transition-all text-lg"
          >
            <MessageCircle className="w-6 h-6" />
            {labels.cta}
          </a>
        </div>

        {/* Testimonials carousel */}
        <div className="bg-gray-50 px-8 py-6">
          <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
            ⭐ {labels.testimonialLabel}
          </p>
          <div className="flex items-center gap-3">
            <button onClick={goPrev} className="shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: testimonials[currentTestimonial].stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-foreground font-medium mb-1">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </p>
              <p className="text-xs text-foreground-muted">
                — {testimonials[currentTestimonial].name} · {testimonials[currentTestimonial].service}
              </p>
            </div>
            <button onClick={goNext} className="shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}