import { notFound } from "next/navigation"
import { getContent, isPlaceholder } from "@/lib/content"
import { Send, MessageCircle, Clock, Shield, FileText } from "lucide-react"

// Simple content page — reads a section of `c` (e.g. c.abouts, c.philosophy, c.privacy)
// and renders it as sections with optional CTA.
// This handles /about, /filosofia, /privacidad, /terminos, /faq.

interface ContentPageProps {
  locale: string
  contentKey: string        // key on the merged content object, e.g. "about" or "privacy" or "philosophy"
  fallbackTitle?: string
  showCta?: boolean
  icon?: "message" | "shield" | "fileText" | "clock" | null
}

const ICON_MAP: Record<string, any> = {
  message: Send,
  shield: Shield,
  fileText: FileText,
  clock: Clock,
}

export async function renderContentPage({ locale, contentKey, fallbackTitle, showCta = false, icon }: ContentPageProps) {
  const c = getContent(locale)
  const data = c[contentKey]
  if (!data) notFound()
  const Icon = icon ? ICON_MAP[icon] : null
  const isEs = locale === "es"

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {data.title && (
        <div className="mb-12">
          {Icon && <Icon className="w-6 h-6 text-[var(--gold)] mb-3" />}
          <h1 className="text-4xl md:text-5xl mb-3">{data.title}</h1>
          {data.subtitle && <p className="text-lg text-[var(--fg-muted)]">{data.subtitle}</p>}
        </div>
      )}

      {data.sections?.map((section: any, i: number) => (
        <section key={i} className="mb-10 last:mb-0">
          <h2 className="text-2xl mb-4">{section.heading}</h2>
          {section.body && <p className="text-[var(--fg-muted)] leading-relaxed mb-4">{section.body}</p>}
          {section.items?.length > 0 && (
            <ul className="space-y-2">
              {section.items.map((item: string, j: number) => (
                <li key={j} className="flex items-start gap-3 text-[var(--fg-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {section.methods?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {section.methods.map((m: any, j: number) => (
                <div key={j} className="card p-4 flex items-center justify-between">
                  <span className="font-medium">{m.type}</span>
                  {!isPlaceholder(m.value) ? (
                    <span className="text-sm text-[var(--fg-muted)]">{m.value}</span>
                  ) : (
                    <span className="text-xs text-[var(--fg-subtle)] coming-soon">
                      {isEs ? "Disponible pronto" : "Coming soon"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          {section.hours && (
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-medium">{isEs ? "Horarios" : "Hours"}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {Object.entries(section.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between font-mono text-[var(--fg-muted)]">
                    <span className="uppercase text-xs">{day}</span>
                    <span>{String(hours)}</span>
                  </div>
                ))}
              </div>
              {section.note && <p className="text-xs text-[var(--fg-subtle)] mt-2">{section.note}</p>}
            </div>
          )}
        </section>
      ))}

      {/* Optional additional content like FAQs */}
      {data.groups?.length > 0 && (
        <div className="space-y-6 mt-12">
          {data.groups.map((group: any, i: number) => (
            <div key={i}>
              {group.name && <h2 className="text-xl mb-4">{group.name}</h2>}
              <div className="space-y-3">
                {group.items?.map((item: any, j: number) => (
                  <details key={j} className="card p-5 group open:border-[var(--accent)]">
                    <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
                      <span>{item.q || item.question}</span>
                      <span className="text-[var(--fg-subtle)] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-[var(--fg-muted)] leading-relaxed">{item.a || item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCta && (
        <div className="mt-16 text-center">
          <a
            href={`https://wa.me/${c.business?.whatsapp ? String(c.business.whatsapp).replace(/\D/g, "") : ""}${c.business?.whatsappMessage ? `?text=${encodeURIComponent(c.business.whatsappMessage)}` : ""}`}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4" /> {isEs ? "Contactar por WhatsApp" : "Contact via WhatsApp"}
          </a>
        </div>
      )}
    </div>
  )
}
