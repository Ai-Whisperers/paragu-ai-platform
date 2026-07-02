// AnxietyPersonas — 3 anxiety personas cards (Insight 3).
// Self-contained: imports its own JSON via getContent so the component
// signature matches the rest of the homepage.

import { Heart, Brain, Shield, MessageCircle } from "lucide-react"
import en from "@/content/en/anxiety-personas.json"
import es from "@/content/es/anxiety-personas.json"
import { whatsappLink } from "@/lib/content"

const ICONS: Record<string, any> = { Heart, Brain, Shield }

const COPY = {
  en: {
    cta: "Tell me which one is you",
    ctaShort: "I feel like:",
  },
  es: {
    cta: "Decime cuál sos",
    ctaShort: "Me siento como:",
  },
}

export function AnxietyPersonas({ locale }: { locale: string }) {
  const isEs = locale === "es"
  const data = isEs ? es : en
  const copy = isEs ? COPY.es : COPY.en
  const wp = (who: string) =>
    whatsappLink(
      undefined,
      isEs
        ? `Hola Dra., me siento como: ${who}. ¿Podemos hablar?`
        : `Hi Dr., I feel like: ${who}. Can we talk?`
    )

  return (
    <section
      className="bg-bg"
      aria-labelledby="anxiety-personas-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow inline-flex">{data.eyebrow}</span>
          <h2
            id="anxiety-personas-heading"
            className="text-3xl md:text-4xl font-heading font-semibold mt-3 mb-4"
            style={{ color: "#000080" }}
          >
            {data.title}
          </h2>
          <p className="text-fg-muted">{data.intro}</p>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {data.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Heart
            return (
              <li
                key={item.id}
                className="persona-card flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-accent-soft text-accent-2"
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">
                    {item.who}
                  </h3>
                </div>

                <div className="bg-accent-soft text-accent-2 rounded-xl px-4 py-3 text-sm">
                  <span className="block font-semibold mb-1">
                    {isEs ? "Tu miedo" : "Your fear"}
                  </span>
                  {item.fear}
                </div>

                <div className="bg-gold-soft text-fg rounded-xl px-4 py-3 text-sm">
                  <span className="block font-semibold mb-1">
                    {isEs ? "Lo que necesitás oír" : "What you need to hear"}
                  </span>
                  {item.needs_to_hear}
                </div>

                {wp(item.who) && (
                  <a
                    href={wp(item.who)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-auto text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {copy.ctaShort} {item.who.toLowerCase()}
                    </span>
                  </a>
                )}
              </li>
            )
          })}
        </ul>

        <div className="text-center mt-10 text-sm text-fg-muted">
          {copy.cta}
        </div>
      </div>
    </section>
  )
}