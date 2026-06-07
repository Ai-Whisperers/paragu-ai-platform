/**
 * ANNOTATION: AboutUs
 *
 * What it is: A static about page that introduces the business — its story, team,
 * mission, and values. Shows team members and optionally a timeline.
 *
 * Why your business needs it: Clients buy from people they trust. An about page
 * humanizes your brand, showcases your team's expertise, and builds the personal
 * connection that drives loyalty — especially in service businesses.
 *
 * What AI populates from your data:
 *   - Business story and mission from content/{lang}/ui.json
 *   - Team member profiles from content/_shared/team.json
 *   - Business metrics (years in business, clients served) from stats
 *   - SEO title and description from site config
 *
 * Your input: Tell us your story in 5 sentences via WhatsApp — who you are, why
 * you started, what makes you different. We craft the narrative.
 *
 * Plan availability: Basic, Crecimiento, Profesional
 */

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import { getSiteConfig } from "@/lib/config/config"
import { AnimatedStats } from "@/components/sections/marketing/AnimatedStatsSection"
import { TeamSection } from "@/components/sections/team/TeamSection"
import { WhyUs } from "@/components/sections/WhyUsSection"
import { ProcessSection } from "@/components/sections/process/ProcessSection"
import { ScrollReveal } from "@/components/shared/scroll-reveal"
import { isFeatureEnabled } from "@/lib/features"
import Link from "next/link"
import esUi from "@/content/es/ui.json"
import enUi from "@/content/en/ui.json"
import { TimelineSection } from "@/components/sections/timeline/TimelineSection"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  return { title: `Nosotros | ${site.site.name}`, description: site.site.metaDescription }
}

export default async function NosotrosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  const ui = lang === "es" ? esUi : enUi
  const processSteps = ui.process.steps
interface AboutContent {
  title?: string
  subtitle?: string
  label?: string
  storyIntro?: string
  storySectionLabel?: string
  storyTitle?: string
  storyParagraphs?: string[]
  mission?: string
  vision?: string
}


  return (
    <>
      <Header lang={lang as "es" | "en"} />

      <section className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal direction="up">
            <span className="inline-block text-sm font-bold text-secondary uppercase tracking-widest mb-4">{ui.about.label}</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">{site.site.name}</h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {ui.about.storyIntro}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <AnimatedStats lang={lang as "es" | "en"} />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-3">{ui.about.storySectionLabel}</span>
              <h2 className="font-heading text-4xl font-bold text-primary mb-4">{ui.about.storyTitle}</h2>
              <div className="w-20 h-1 bg-secondary mx-auto mb-8" />
            </div>
            <div className="prose prose-lg max-w-none text-foreground-light leading-relaxed space-y-6">
              <p>
                {site.site.name}{ui.about.storyParagraphs[0]}
              </p>
              <p>
                {ui.about.storyParagraphs[1]}
              </p>
              <p>
                {ui.about.storyParagraphs[2]}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {isFeatureEnabled("timeline", lang as "es" | "en") && <TimelineSection />}

      {(ui.about as AboutContent)?.mission && (
        <section className="py-16 bg-surface">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Nuestra Misión</h3>
                <p className="text-foreground-light leading-relaxed">{(ui.about as AboutContent).mission}</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Nuestra Visión</h3>
                <p className="text-foreground-light leading-relaxed">{(ui.about as AboutContent).vision}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {isFeatureEnabled("careers", lang as "es" | "en") && (
        <section className="py-12 bg-secondary/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="font-heading text-2xl font-bold text-primary mb-3">¿Te gustaría trabajar con nosotros?</h3>
            <p className="text-foreground-light mb-6">Estamos buscando personas apasionadas y comprometidas. Conocé nuestras vacantes.</p>
            <Link href={`/${lang}/carreras`} className="inline-flex items-center gap-2 bg-secondary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Ver Vacantes
            </Link>
          </div>
        </section>
      )}

      <TeamSection />

      <WhyUs />

      <ProcessSection
        title={ui.process?.title}
        subtitle={ui.process?.subtitle}
        steps={processSteps}
        accentColor="primary"
      />

      <Footer lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
      <MobileCta />
    </>
  )
}