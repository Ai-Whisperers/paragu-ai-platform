import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import { getContent, isLocale } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { Hero } from "@/components/sections/Hero"
import { BilingualBand } from "@/components/sections/BilingualBand"
import { Newsletter } from "@/components/Newsletter"

// Below-the-fold sections: dynamic imports keep the initial JS bundle small.
// These load lazily on scroll (or near it via IntersectionObserver) and
// don't block the LCP path of the Hero. Each gets a loading skeleton.
const AnxietyPersonas = dynamic(() => import("@/components/sections/AnxietyPersonas").then(m => m.AnxietyPersonas), {
  loading: () => <div className="section bg-bg"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => m.Testimonials), {
  loading: () => <div className="section bg-surface"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const SocialProof = dynamic(() => import("@/components/sections/SocialProof").then(m => m.SocialProof), {
  loading: () => <div className="section bg-bg"><div className="max-w-6xl mx-auto px-4 h-64" /></div>,
})
const VoiceDoctor = dynamic(() => import("@/components/sections/VoiceDoctor").then(m => m.VoiceDoctor), {
  loading: () => <div className="section bg-surface"><div className="max-w-4xl mx-auto px-4 h-64" /></div>,
})
const MeetDoctor = dynamic(() => import("@/components/sections/MeetDoctor").then(m => m.MeetDoctor), {
  loading: () => <div className="section bg-bg"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const BigStats = dynamic(() => import("@/components/sections/BigStats").then(m => m.BigStats), {
  loading: () => <div className="section bg-surface"><div className="max-w-6xl mx-auto px-4 h-48" /></div>,
})
const WhyDifferent = dynamic(() => import("@/components/sections/WhyDifferent").then(m => m.WhyDifferent), {
  loading: () => <div className="section bg-bg"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const SedationSection = dynamic(() => import("@/components/sections/SedationSection").then(m => m.SedationSection), {
  loading: () => <div className="section bg-surface"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const FeaturedService = dynamic(() => import("@/components/sections/FeaturedService").then(m => m.FeaturedService), {
  loading: () => <div className="section bg-bg"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const Process = dynamic(() => import("@/components/sections/Process").then(m => m.Process), {
  loading: () => <div className="section bg-surface"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const HomeFaq = dynamic(() => import("@/components/sections/HomeFaq").then(m => m.HomeFaq), {
  loading: () => <div className="section bg-bg"><div className="max-w-4xl mx-auto px-4 h-96" /></div>,
})
const BlogPreview = dynamic(() => import("@/components/sections/BlogPreview").then(m => m.BlogPreview), {
  loading: () => <div className="section bg-surface"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner").then(m => m.CtaBanner), {
  loading: () => <div className="section bg-bg"><div className="max-w-4xl mx-auto px-4 h-64" /></div>,
})

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
      <BilingualBand locale={locale} />
      <AnxietyPersonas locale={locale} />
      <Testimonials c={c} locale={locale} />
      <SocialProof c={c} locale={locale} />
      <VoiceDoctor locale={locale} />
      <MeetDoctor locale={locale} />
      <BigStats locale={locale} />
      <WhyDifferent locale={locale} />
      <SedationSection locale={locale} />

      {/* Featured oral rehabilitation — the lead-conversion page */}
      <FeaturedService
        locale={locale}
        content={c}
        variant="light"
        eyebrow={isEs ? "Servicio destacado" : "Featured service"}
        title={isEs ? "Rehabilitación oral — cuando la boca necesita un plan, no parches" : "Oral rehabilitation — when the mouth needs a plan, not patches"}
        body={isEs
          ? "No es 'arreglar un diente'. Es sentarnos, mirarte la boca, mirar la panorámica juntos, y armar un plan que tenga sentido clínico, funcional y económico. Para pacientes con operatoria acumulada, tratamientos que fallaron, o casos que requieren criterio clínico real. Lo que más me gusta hacer: planificar, explicar, decidir. Te escucho."
          : "It's not 'fixing a tooth.' It's sitting down, looking at your mouth, looking at the panoramic x-ray together, and building a plan that makes clinical, functional, and economic sense. For patients with accumulated treatment, failed procedures, or cases that require real clinical judgment. What I love most: planning, explaining, deciding. I listen."}
        bullets={isEs
          ? [
            "Rehabilitación oral integral",
            "Tres especialidades: rehabilitación oral, estética, operatoria",
            "Plan escrito por etapas, con tiempos y costos",
            "Coordinación con especialistas cuando corresponde (endodoncia, ortodoncia, cirugía, implantes)",
          ]
          : [
            "Comprehensive oral rehabilitation",
            "Three specialties: oral rehabilitation, aesthetics, operative",
            "Written plan in stages, with timelines and costs",
            "Coordination with specialists when needed (endodontics, orthodontics, surgery, implants)",
          ]}
        imageSrc="/images/services/oral-rehabilitation.png"
        imageAlt="Oral rehabilitation planning"
        ctaLabel={isEs ? "Ver rehabilitación oral" : "See oral rehabilitation"}
        ctaHref={`/${locale}/services/oral-rehabilitation`}
        ctaSecondaryLabel={isEs ? "Pedir segunda opinión" : "Request second opinion"}
        ctaSecondaryHref={`/${locale}/second-opinion`}
      />

      {/* Second featured service — second opinion */}
      <FeaturedService
        locale={locale}
        content={c}
        variant="teal"
        eyebrow={isEs ? "Servicio destacado #2" : "Featured service #2"}
        title={isEs ? "Segunda opinión escrita, sin compromiso" : "Written second opinion, no obligation"}
        body={isEs
          ? "¿Otro odontólogo te indicó un procedimiento? Revisamos tu caso con acceso a todos los documentos, sin conflicto de interés. Te entregamos un plan escrito en 2–3 días. Si no necesitás tratamiento, te lo decimos. Nunca hablo mal de otro colega: yo no conozco el contexto completo."
          : "Another dentist recommended a procedure? We review your case with access to all the documents, no conflict of interest. You get a written plan within 2–3 days. If you don't need treatment, we'll say so. I never speak ill of a colleague: I don't know the full context."}
        bullets={isEs
          ? [
            "Revisión clínica + radiográfica completa",
            "Informe escrito con opciones y precios",
            "Comparamos costos y materiales con honestidad",
            "Confidencialidad absoluta",
          ]
          : [
            "Full clinical + radiographic review",
            "Written report with options and pricing",
            "We compare costs and materials honestly",
            "Absolute confidentiality",
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
