// /es/filosofia + /en/philosophy — bilingual philosophy page.

import { notFound } from "next/navigation"
import { Quote } from "lucide-react"
import esData from "@/content/es/filosofia.json"
import enData from "@/content/en/philosophy.json"
import { PageHero } from "@/components/PageHero"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = locale === "es" ? esData : enData
  return { title: data?.title || (locale === "es" ? "Filosofía" : "Philosophy") }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== "en" && locale !== "es") notFound()
  const data = locale === "es" ? esData : enData
  const isEs = locale === "es"
  if (!data) notFound()

  const first = data.sections?.[0]
  const principles = data.sections?.[1]

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Filosofía" : "Philosophy"}
        title={data.title}
        subtitle={data.subtitle}
        align="center"
        variant="default"
      />

      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Quote / opening */}
          {first && (
            <div className="card-accent card p-8 relative">
              <Quote className="w-8 h-8 text-[var(--gold)] absolute -top-3 -left-3 bg-[var(--bg)] p-1.5 rounded-lg" />
              <p className="text-lg text-[var(--fg)] leading-relaxed mb-3 italic">
                {first.body}
              </p>
              <p className="text-sm text-[var(--fg-subtle)]">— {data.title?.split(" ").slice(0, 2).join(" ") || (isEs ? "Dra. Gabriella" : "Dra. Gabriella")}</p>
            </div>
          )}

          {/* Principles */}
          {principles && (
            <div>
              <h2 className="text-2xl mb-6 text-center">{principles.heading}</h2>
              <div className="space-y-3">
                {(principles.items || []).map((item: string, i: number) => {
                  const [title, ...rest] = item.split(":")
                  return (
                    <div key={i} className="card p-5 flex items-start gap-4">
                      <div className="step-number w-10 h-10 text-sm flex-shrink-0">{i + 1}</div>
                      <div>
                        <h3 className="font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                          {title}
                        </h3>
                        {rest.length > 0 && (
                          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                            {rest.join(":").trim()}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Other sections (materials, languages) */}
          {data.sections?.slice(2).map((s: any, i: number) => (
            <div key={i}>
              <h2 className="text-2xl mb-3">{s.heading}</h2>
              {s.body && <p className="text-[var(--fg-muted)] leading-relaxed">{s.body}</p>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
