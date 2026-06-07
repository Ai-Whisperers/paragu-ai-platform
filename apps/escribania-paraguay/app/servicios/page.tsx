import type { Metadata } from "next"
import Header from "@/components/header"
import Hero from "@/components/hero"
import IntroSection from "@/components/intro-section"
import ServiceCategoriesSection from "@/components/service-categories"
import CtaBanner from "@/components/cta-banner"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"
import content from "@/content/es.json"

export function generateMetadata(): Metadata {
  const data = content as any
  return {
    title: data.serviciosPage.seo.title.replace("{{businessName}}", data.siteName),
    description: data.serviciosPage.seo.description,
  }
}

export default function ServiciosPage() {
  const data = content as any
  const servicios = data.serviciosPage
  const siteInfo = data.site || { businessName: data.siteName }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Servicios Notariales",
    description: servicios.seo.description,
    provider: {
      "@type": "ProfessionalService",
      name: siteInfo.businessName || data.siteName,
    },
    areaServed: "PY",
    inLanguage: "es",
  }

  return (
    <>
      <Header />
      <main>
        <Hero
          headline={servicios.hero.headline}
          subheadline={servicios.hero.subheadline}
          variant="dark"
        />
        <IntroSection text={servicios.intro.text} />
        <ServiceCategoriesSection
          title={servicios.hero.headline}
          categories={servicios.categories}
        />
        <CtaBanner
          title={servicios.cta.title}
          subtitle={servicios.cta.subtitle}
          buttonText={servicios.cta.buttonText}
          buttonHref={servicios.cta.buttonHref}
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
