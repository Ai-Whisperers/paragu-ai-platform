// SedationSection — 3 steps with sedation explicitly as step 3, not 1 (Insight 5).
// Reframes the journey: empathy first → planning → sedation only if needed.

import { MessageCircle, FileText, Sparkles } from "lucide-react"
import en from "@/content/en/sedation-section.json"
import es from "@/content/es/sedation-section.json"
import { whatsappLink } from "@/lib/content"

const ICONS: Record<string, any> = {
  empathy: MessageCircle,
  plan: FileText,
  sedation: Sparkles,
}

export function SedationSection({ locale }: { locale: string }) {
  const isEs = locale === "es"
  const data = isEs ? es : en
  const wp = whatsappLink(
    undefined,
    isEs
      ? "Hola Dra., me gustaría coordinar una primera conversación sin compromiso."
      : "Hi Dr., I'd like to book a no-obligation first conversation."
  )

  return (
    <section
      className="bg-bg"
      aria-labelledby="sedation-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow inline-flex">{data.eyebrow}</span>
          <h2
            id="sedation-heading"
            className="text-3xl md:text-4xl font-heading font-semibold mt-3 mb-4"
            style={{ color: "#000080" }}
          >
            {data.title}
          </h2>
          <p className="text-fg-muted">{data.subtitle}</p>
        </div>

        <ol
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {data.steps.map((step) => {
            const Icon = ICONS[step.kind] ?? MessageCircle
            const isSedation = step.kind === "sedation"
            return (
              <li
                key={step.number}
                className={`relative rounded-2xl border p-6 md:p-8 flex flex-col gap-4 ${
                  isSedation
                    ? "sedation-card border-accent/30 bg-accent-soft/30"
                    : "border-border bg-surface-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-5xl font-heading font-bold leading-none"
                    style={{
                      color: isSedation ? "var(--accent)" : "#000080",
                      opacity: 0.35,
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      isSedation
                        ? "bg-accent text-white"
                        : "bg-accent-soft text-accent-2"
                    }`}
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {step.body}
                </p>
              </li>
            )
          })}
        </ol>

        {wp && (
          <div className="text-center mt-10">
            <a
              href={wp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{data.cta_label}</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}