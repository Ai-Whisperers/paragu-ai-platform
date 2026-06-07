import type { Metadata } from "next"
import Header from "@/components/header"
import Hero from "@/components/hero"
import PrivacyContent from "@/components/privacy-content"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"
import content from "@/content/es.json"

export function generateMetadata(): Metadata {
  const data = content as any
  return {
    title: data.privacidadPage.seo.title.replace("{{businessName}}", data.siteName),
    description: data.privacidadPage.seo.description,
  }
}

export default function PrivacidadPage() {
  const data = content as any
  const privacidad = data.privacidadPage
  const siteInfo = data.site || { businessName: data.siteName }

  return (
    <>
      <Header />
      <main>
        <Hero
          headline={privacidad.hero.headline}
          subheadline={privacidad.hero.subheadline}
          variant="dark"
        />
        <PrivacyContent sections={privacidad.content.sections} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
