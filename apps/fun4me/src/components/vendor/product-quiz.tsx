"use client"
import { useState } from "react"
import content from "@/content/es.json"
import Link from "next/link"

const WA_PHONE = "595976569739"

export function ProductQuiz() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const questions = [
    { q: "¿Es tu primera vez usando juguetes?", options: ["Sí, soy nueva", "Ya tengo experiencia"] },
    { q: "¿Buscás algo para usar en pareja o sola?", options: ["En pareja", "Sola", "Ambas"] },
    { q: "¿Qué tipo de estimulación preferís?", options: ["Externa", "Interna", "Ambas", "No sé"] },
    { q: "¿Cuánto querés gastar?", options: ["Menos de Gs. 100.000", "Gs. 100.000 - 200.000", "Más de Gs. 200.000"] },
  ]

  const handleAnswer = (ans: string) => {
    const newAnswers = [...answers, ans]
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      // Generate recommendation
      setOpen(false)
      const waMsg = `¡Hola! Hice el quiz de productos y estas fueron mis respuestas: ${newAnswers.join(", ")}. ¿Podrían recomendarme algo?`
      window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(waMsg)}`, "_blank")
    }
  }

  return (
    <>
      <button onClick={() => { setOpen(true); setStep(0); setAnswers([]) }}
        className="text-sm text-primary hover:underline flex items-center gap-1">
        <span>🎯</span> Encontrá tu producto ideal
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-surface rounded-2xl p-8 max-w-md w-full border border-border" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-muted-foreground">Paso {step + 1} de {questions.length}</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="w-full bg-border rounded-full h-1.5 mb-6">
              <div className="bg-primary rounded-full h-1.5 transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-4">{questions[step].q}</h3>
            <div className="space-y-2">
              {questions[step].options.map(opt => (
                <button key={opt} onClick={() => handleAnswer(opt)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-border text-sm text-foreground hover:border-primary hover:bg-primary/5 transition-colors">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
