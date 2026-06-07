import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import { isFeatureEnabled } from "@/lib/features"
import { getSiteConfig } from "@/lib/config/config"
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

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const site = getSiteConfig(lang as "es" | "en")
  return {
    title: lang === "es" ? "Casos de Exito" : "Case Studies",
    description: lang === "es" ? `Casos de exito de ${site.site.name}` : `Success stories from ${site.site.name}`,
  }
}

export default async function CasosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const l = lang as "es" | "en"

  if (!isFeatureEnabled("caseStudies", l)) {
    return (
      <>
        <Header lang={l} />
        <div className="py-20 text-center">
          <p className="text-foreground-light">{l === "es" ? "Seccion no disponible" : "Section not available"}</p>
        </div>
        <Footer lang={l} />
        <WhatsAppFloat lang={l} />
      </>
    )
  }

  const data = caseStudiesData as CaseStudiesData
  const cases = data.caseStudies

  return (
    <>
      <Header lang={l} />
      <section className="bg-primary py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            {l === "es" ? "Casos de Exito" : "Case Studies"}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {l === "es" ? "Resultados reales de negocios como el tuyo" : "Real results from businesses like yours"}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((item) => (
              <Link key={item.slug} href={`/${l}/casos/${item.slug}`} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gray-100">
                  <Image src={item.heroImage} alt={item.client} width={800} height={450} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">{item.industry}</span>
                  <h2 className="font-heading text-2xl font-bold text-primary mt-2 mb-3 group-hover:text-secondary transition-colors">{item.client}</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">{item.keyMetric}</span>
                    <span className="text-sm text-secondary font-semibold">{l === "es" ? "Ver caso" : "View case"} →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={l} />
      <WhatsAppFloat lang={l} />
      <MobileCta lang={l} />
    </>
  )
}