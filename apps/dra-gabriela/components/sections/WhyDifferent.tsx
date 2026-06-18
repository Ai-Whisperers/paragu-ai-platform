// Section: WhyDifferent — comparison table showing how Dra. GP works
// vs typical high-volume clinic. Used on the home page to differentiate.

import { Check, X } from "lucide-react"

interface Row {
  feature: string
  dra: string
  typical: string
  draPositive?: boolean  // true = check, false = X
  typicalPositive?: boolean
}

interface WhyDifferentProps {
  locale: string
}

const ROWS_EN: Row[] = [
  {
    feature: "First visit",
    dra: "45-60 min evaluation, no rush",
    typical: "15-20 min, often starts treatment same day",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Treatment plan",
    dra: "Written, with options and prices",
    typical: "Verbal, single approach",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Materials",
    dra: "Premium, named explicitly",
    typical: "Cheapest available, unspecified",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Second opinion",
    dra: "Written, 2-3 day delivery",
    typical: "Often not offered",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Languages",
    dra: "Spanish + English",
    typical: "Spanish only",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Pricing",
    dra: "Published reference prices",
    typical: "Depends on what we find",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Specialist referrals",
    dra: "When warranted, no markup",
    typical: "Keep work in-house always",
    draPositive: true,
    typicalPositive: false,
  },
]

const ROWS_ES: Row[] = [
  {
    feature: "Primera visita",
    dra: "45-60 min de evaluación, sin apuro",
    typical: "15-20 min, a veces empieza tratamiento",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Plan de tratamiento",
    dra: "Escrito, con opciones y precios",
    typical: "Verbal, un solo enfoque",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Materiales",
    dra: "Premium, nombrados explícitamente",
    typical: "Los más baratos, sin especificar",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Segunda opinión",
    dra: "Escrita, entrega en 2-3 días",
    typical: "A menudo no se ofrece",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Idiomas",
    dra: "Español + Inglés",
    typical: "Solo español",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Precios",
    dra: "Precios de referencia publicados",
    typical: "Depende de lo que encontremos",
    draPositive: true,
    typicalPositive: false,
  },
  {
    feature: "Derivación a especialistas",
    dra: "Cuando corresponde, sin recargo",
    typical: "Trabajo siempre en la clínica",
    draPositive: true,
    typicalPositive: false,
  },
]

export function WhyDifferent({ locale }: WhyDifferentProps) {
  const isEs = locale === "es"
  const ROWS = isEs ? ROWS_ES : ROWS_EN

  return (
    <section className="bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-12">
          <span className="eyebrow inline-flex">
            {isEs ? "Cómo trabajo" : "How I work"}
          </span>
          <h2 className="text-4xl md:text-5xl mt-4 mb-4 leading-tight">
            {isEs ? "Por qué soy diferente" : "Why I'm different"}
          </h2>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto leading-relaxed">
            {isEs
              ? "Una práctica conservadora se ve diferente a una clínica de alto volumen. Acá está la comparación honesta."
              : "A conservative practice looks different from a high-volume clinic. Here's the honest comparison."}
          </p>
        </div>

        {/* Desktop: 3-col table. Mobile: stacked cards */}
        <div className="hidden md:block card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-surface-muted border-b border-border">
              <tr>
                <th className="px-5 py-4 text-xs uppercase tracking-wider text-fg-subtle font-semibold">
                  {isEs ? "Qué evaluás" : "What you evaluate"}
                </th>
                <th className="px-5 py-4 text-sm font-medium text-accent">
                  {isEs ? "Dra. Gabriella" : "Dra. Gabriella"}
                </th>
                <th className="px-5 py-4 text-sm font-medium text-fg-muted">
                  {isEs ? "Clínica típica" : "Typical clinic"}
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i} className="border-b border-border-light last:border-0">
                  <td className="px-5 py-4 text-sm font-medium text-fg">{row.feature}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-2.5">
                      {row.draPositive !== false ? (
                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-success" aria-hidden="true" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-error" aria-hidden="true" />
                        </div>
                      )}
                      <span className="text-sm text-fg leading-relaxed">{row.dra}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-2.5">
                      {row.typicalPositive ? (
                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-success" aria-hidden="true" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-fg-subtle/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-fg-subtle" aria-hidden="true" />
                        </div>
                      )}
                      <span className="text-sm text-fg-muted leading-relaxed">{row.typical}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-4">
          {ROWS.map((row, i) => (
            <div key={i} className="card p-5">
              <div className="text-xs uppercase tracking-wider text-fg-subtle font-semibold mb-3">
                {row.feature}
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  {row.draPositive !== false ? (
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-success" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-error" aria-hidden="true" />
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-accent font-semibold mb-0.5">Dra. Gabriella</div>
                    <div className="text-sm text-fg leading-relaxed">{row.dra}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-2 border-t border-border-light">
                  {row.typicalPositive ? (
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-success" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-fg-subtle/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-fg-subtle" aria-hidden="true" />
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-fg-muted font-semibold mb-0.5">{isEs ? "Clínica típica" : "Typical clinic"}</div>
                    <div className="text-sm text-fg-muted leading-relaxed">{row.typical}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
