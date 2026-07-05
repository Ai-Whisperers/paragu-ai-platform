// /en/privacy + /es/privacidad — bilingual privacy policy.

import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { Shield } from "lucide-react"
import esData from "@/content/es/privacidad.json"
import enData from "@/content/en/privacy.json"
import { PageHero } from "@/components/PageHero"
import { PageSection } from "@/components/PageSection"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const data = locale === "es" ? esData : enData
  const isEs = locale === "es"
  return buildMetadata({
    slug: "privacy",
    title: data?.title ? `${data.title} · Dra. Gabriella` : (isEs ? "Política de privacidad" : "Privacy policy"),
    description: isEs ? "Política de privacidad de la práctica dental de la Dra. Gabriella González Pane. Cómo manejamos tus datos personales." : "Privacy policy for Dra. Gabriella González Pane's dental practice. How we handle your personal data.",
    locale: isEs ? "es" : "en",
  })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== "en" && locale !== "es") notFound()
  const data = locale === "es" ? esData : enData
  const isEs = locale === "es"
  if (!data) notFound()

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Legal" : "Legal"}
        title={data.title}
        subtitle={data.subtitle}
        variant="default"
        align="center"
      >
        <div className="inline-flex items-center gap-2 text-sm text-fg-muted px-3 py-1.5 rounded-full border border-border">
          <Shield className="w-4 h-4 text-gold" />
          {isEs ? "Cumple Ley 7.593/2025 de Paraguay" : "Compliant with Paraguay Law 7.593/2025"}
        </div>
      </PageHero>

      <PageSection layout="narrow" py="lg">
        <div className="space-y-10">
          {data.sections?.map((s: any, i: number) => (
            <div key={i} className="text-left">
              <h2 className="text-xl md:text-2xl mb-3">{s.heading}</h2>
              {s.body && <p className="text-fg-muted leading-relaxed text-base md:text-lg mb-3">{s.body}</p>}
              {s.items && (
                <ul className="space-y-2">
                  {s.items.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-fg-muted leading-relaxed text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </PageSection>
    </>
  )
}
