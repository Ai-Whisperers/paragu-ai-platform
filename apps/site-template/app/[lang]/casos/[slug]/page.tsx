import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import caseStudiesData from "@/content/_shared/case-studies.json"

interface CaseStudy {
  slug: string
  client: string
  industry: string
  heroImage: string
  keyMetric: string
  challenge: string
  solution: string
  results: string
}

interface CaseStudiesData {
  caseStudies: CaseStudy[]
}

export async function generateStaticParams() {
  const data = caseStudiesData as CaseStudiesData
  return data.caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = caseStudiesData as CaseStudiesData
  const study = data.caseStudies.find((c) => c.slug === slug)
  if (!study) return {}
  return {
    title: `${study.client} | Casos de Exito`,
    description: study.challenge,
  }
}

export default async function CasoDetallePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const l = lang as "es" | "en"
  const data = caseStudiesData as CaseStudiesData
  const study = data.caseStudies.find((c) => c.slug === slug)

  if (!study) notFound()

  return (
    <>
      <Header lang={l} />

      {/* Hero */}
      <section className="relative h-64 md:h-80 bg-gray-900">
        <Image src={study.heroImage} alt={study.client} fill className="object-cover opacity-60" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-4 pb-8 w-full">
            <Link href={`/${l}/casos`} className="text-white/60 hover:text-white text-sm mb-4 inline-flex items-center gap-1">
              ← {l === "es" ? "Volver a casos" : "Back to cases"}
            </Link>
            <span className="text-sm font-bold text-secondary uppercase tracking-widest">{study.industry}</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mt-2">{study.client}</h1>
          </div>
        </div>
      </section>

      {/* Key Metric */}
      <section className="bg-primary py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-2">{l === "es" ? "Resultado clave" : "Key Result"}</p>
          <p className="text-6xl font-bold text-white">{study.keyMetric}</p>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-surface rounded-2xl p-8">
            <h2 className="font-heading text-xl font-bold text-primary mb-4">{l === "es" ? "El Desafio" : "The Challenge"}</h2>
            <p className="text-foreground-light text-lg leading-relaxed">{study.challenge}</p>
          </div>

          <div className="bg-surface rounded-2xl p-8">
            <h2 className="font-heading text-xl font-bold text-primary mb-4">{l === "es" ? "La Solucion" : "The Solution"}</h2>
            <p className="text-foreground-light text-lg leading-relaxed">{study.solution}</p>
          </div>

          <div className="bg-surface rounded-2xl p-8">
            <h2 className="font-heading text-xl font-bold text-primary mb-4">{l === "es" ? "Los Resultados" : "The Results"}</h2>
            <p className="text-foreground-light text-lg leading-relaxed">{study.results}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/10 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl font-bold text-primary mb-3">
            {l === "es" ? "Quieren resultados similares?" : "Want similar results?"}
          </h3>
          <p className="text-foreground-light mb-6">
            {l === "es" ? "Contactanos y te ayudamos a llegar alla." : "Contact us and we will help you get there."}
          </p>
          <a href={`/${l}/booking`} className="inline-flex items-center gap-2 bg-secondary text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
            {l === "es" ? "Reservar ahora" : "Book now"}
          </a>
        </div>
      </section>

      <Footer lang={l} />
      <WhatsAppFloat lang={l} />
      <MobileCta lang={l} />
    </>
  )
}