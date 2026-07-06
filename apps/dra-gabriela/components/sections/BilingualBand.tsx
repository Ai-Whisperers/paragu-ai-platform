// BilingualBand — posiciona explícitamente que la consulta y los planes se entregan
// en español y en inglés. Cumple Insight 4: nunca asumas que el visitante sabe que
// Gaby trabaja bilingüe.
//
// Sticky/visible: justo debajo del Hero, arriba de SocialProof. Sirve como una
// "marca de claridad" para pacientes que están comparando dentistas.

import { Languages } from "lucide-react"

export function BilingualBand({ locale }: { locale: string }) {
  const isEs = locale === "es"
  return (
    <section
      className="tone-ocean-6 text-white"
      aria-labelledby="bilingual-band-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
          <div className="flex items-center gap-2 flex-shrink-0" aria-hidden="true">
            <Languages className="w-5 h-5" />
          </div>
          <h2 id="bilingual-band-heading" className="text-base sm:text-lg font-semibold">
            {isEs
              ? "Atención en español y en inglés — siempre."
              : "Care in Spanish and in English — always."}
          </h2>
          <p className="text-sm text-white/80 max-w-md">
            {isEs
              ? "Consultas, explicaciones y planes escritos en el idioma que prefieras."
              : "Consultations, explanations, and written plans in the language you prefer."}
          </p>
        </div>
      </div>
    </section>
  )
}