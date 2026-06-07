"use client"
import { useState, useRef } from "react"

export function AnonReviewForm() {
  const [submitted, setSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    formRef.current?.reset()
    setRating(0)
    setTimeout(() => setSubmitted(false), 3000)
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-success/20 p-4 text-center text-sm text-success font-medium">
        ✅ Gracias por tu reseña anónima
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="rounded-xl border border-border bg-surface p-4 space-y-3">
      <h3 className="font-semibold text-sm">Dejá tu reseña (anónima)</h3>
      <div className="flex gap-1">
        {[1,2,3,4,5].map(n => (
          <button key={n} type="button" onClick={() => setRating(n)}
            className={`text-lg transition-all ${n <= rating ? "text-warning scale-110" : "text-border"}`}>★</button>
        ))}
      </div>
      <textarea placeholder="Contanos tu experiencia..." rows={3}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring resize-none" />
      <div className="flex items-center gap-2">
        <input type="text" placeholder="Ciudad (opcional)"
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring" />
        <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90">
          Enviar
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground">Tu reseña se publicará de forma anónima. No compartimos tu información.</p>
    </form>
  )
}
