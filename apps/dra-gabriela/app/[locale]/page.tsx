import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import { getContent, isLocale } from "@/lib/content"
import { buildMetadata } from "@/lib/seo"
import { Hero } from "@/components/sections/Hero"
import { BilingualBand } from "@/components/sections/BilingualBand"

// Below-the-fold sections: dynamic imports keep the initial JS bundle small.
const AnxietyPersonas = dynamic(() => import("@/components/sections/AnxietyPersonas").then(m => m.AnxietyPersonas), {
  loading: () => <div className="section tone-ocean-2"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(m => m.Testimonials), {
  loading: () => <div className="section tone-ocean-4"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const VoiceDoctor = dynamic(() => import("@/components/sections/VoiceDoctor").then(m => m.VoiceDoctor), {
  loading: () => <div className="section tone-ocean-1"><div className="max-w-4xl mx-auto px-4 h-64" /></div>,
})
const MeetDoctor = dynamic(() => import("@/components/sections/MeetDoctor").then(m => m.MeetDoctor), {
  loading: () => <div className="section tone-ocean-3"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const SedationSection = dynamic(() => import("@/components/sections/SedationSection").then(m => m.SedationSection), {
  loading: () => <div className="section tone-ocean-2"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const FeaturedService = dynamic(() => import("@/components/sections/FeaturedService").then(m => m.FeaturedService), {
  loading: () => <div className="section tone-ocean-5"><div className="max-w-6xl mx-auto px-4 h-96" /></div>,
})
const HomeFaq = dynamic(() => import("@/components/sections/HomeFaq").then(m => m.HomeFaq), {
  loading: () => <div className="section tone-ocean-1"><div className="max-w-4xl mx-auto px-4 h-96" /></div>,
})
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner").then(m => m.CtaBanner), {
  loading: () => <div className="section tone-ocean-3"><div className="max-w-4xl mx-auto px-4 h-64" /></div>,
})

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getContent(locale)
  return buildMetadata({
    slug: "",
    title: c.site?.name ?? "Ometz Dental · Dra. Gabriella González Pane",
    description: c.site?.metaDescription ?? "Ometz Dental (אומץ) · Odontología conservadora + segunda opinión escrita en Mburucuyá, Asunción. Bilingüe. 20+ años.",
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
      <MeetDoctor locale={locale} />
      <VoiceDoctor locale={locale} />
      <Testimonials c={c} locale={locale} />
      <SedationSection locale={locale} />

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

      <HomeFaq c={c} locale={locale} />
      <CtaBanner c={c} locale={locale} />
    </>
  )
}
