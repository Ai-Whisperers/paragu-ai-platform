import type { Metadata } from "next"
import Header from "@/components/header"
import Hero from "@/components/hero"
import AboutIntroSection from "@/components/about-intro"
import ValuesSection from "@/components/values-section"
import TeamSection from "@/components/team-section"
import CtaBanner from "@/components/cta-banner"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"
import content from "@/content/es.json"

export function generateMetadata(): Metadata {
  const data = content as any
  return {
    title: data.nosotrosPage.seo.title.replace("{{businessName}}", data.siteName),
    description: data.nosotrosPage.seo.description,
  }
}

export default function NosotrosPage() {
  const data = content as any
  const nosotros = data.nosotrosPage
  const siteInfo = data.site || { businessName: data.siteName }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre Nosotros",
    description: nosotros.seo.description,
    mainEntity: {
      "@type": "ProfessionalService",
      name: siteInfo.businessName || data.siteName,
      description: nosotros.intro.content,
      foundingDate: "",
      areaServed: "PY",
      inLanguage: "es",
    },
  }

  return (
    <>
      <Header />
      <main>
        <Hero
          headline={nosotros.hero.headline}
          subheadline={nosotros.hero.subheadline}
          variant="dark"
        />
        <AboutIntroSection
          title={nosotros.intro.title}
          content={nosotros.intro.content}
          vision={nosotros.intro.vision}
          mission={nosotros.intro.mission}
        />
        <ValuesSection
          title="Nuestros Valores"
          items={nosotros.values}
        />
        <TeamSection
          title="Nuestro Equipo"
          items={nosotros.team}
        />
        <CtaBanner
          title={nosotros.cta.title}
          subtitle={nosotros.cta.subtitle}
          buttonText={nosotros.cta.buttonText}
          buttonHref={nosotros.cta.buttonHref}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
