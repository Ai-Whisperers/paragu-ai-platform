import { notFound } from "next/navigation"
import { getContent, isLocale } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { Hero } from "@/components/sections/Hero"
import { BigStats } from "@/components/sections/BigStats"
import { WhyDifferent } from "@/components/sections/WhyDifferent"
import { FeaturedService } from "@/components/sections/FeaturedService"
import { SocialProof } from "@/components/sections/SocialProof"
import { MeetDoctor } from "@/components/sections/MeetDoctor"
import { Process } from "@/components/sections/Process"
import { HomeFaq } from "@/components/sections/HomeFaq"
import { CtaBanner } from "@/components/sections/CtaBanner"
import { BlogPreview } from "@/components/sections/BlogPreview"
import { Newsletter } from "@/components/Newsletter"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getContent(locale)
  return buildMetadata({
    slug: "",
    title: c.site?.name ?? "Dra. Gabriella González Pane",
    description: c.site?.metaDescription ?? "Conservative, planning-first dentistry in Asunción.",
    locale: locale === "es" ? "es" : "en",
  })
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const c = getContent(locale)
  const isEs = locale === "es"

  return (
    <>
      <Hero c={c} locale={locale} />
      <SocialProof c={c} locale={locale} />
      <MeetDoctor locale={locale} />
      <BigStats locale={locale} />
      <WhyDifferent locale={locale} />

      {/* Featured second opinion — the lead-conversion page */}
      <FeaturedService
        locale={locale}
        content={c}
        variant="light"
        eyebrow={isEs ? "Servicio destacado" : "Featured service"}
        title={isEs ? "Segunda opinión escrita, sin compromiso" : "Written second opinion, no obligation"}
        body={isEs
          ? "¿Otro odontólogo te indicó un procedimiento? Revisamos tu caso con acceso a todos los documentos, sin conflicto de interés. Te entregamos un plan escrito en 2–3 días."
          : "Another dentist recommended a procedure? We review your case with access to all the documents, no conflict of interest. You get a written plan within 2–3 days."}
        bullets={isEs
          ? [
            "Revisión clínica + radiográfica completa",
            "Informe escrito con opciones y precios",
            "Comparamos costos y materiales con honestidad",
            "Si no necesitás tratamiento, te lo decimos",
          ]
          : [
            "Full clinical + radiographic review",
            "Written report with options and pricing",
            "We compare costs and materials honestly",
            "If you don't need treatment, we'll say so",
          ]}
        imageSrc="/images/services/second-opinion.png"
        imageAlt="Second opinion review"
        ctaLabel={isEs ? "Pedir segunda opinión" : "Request a second opinion"}
        ctaHref={`/${locale}/second-opinion`}
        ctaSecondaryLabel={isEs ? "Ver precios" : "See pricing"}
        ctaSecondaryHref={`/${locale}/pricing`}
      />

      <Process c={c} locale={locale} />
      <HomeFaq c={c} locale={locale} />
      <BlogPreview locale={locale} />

      {/* Newsletter signup — between blog and CTA */}
      <section className="bg-bg">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <Newsletter locale={locale} />
        </div>
      </section>

      <CtaBanner c={c} locale={locale} />
    </>
  )
}
