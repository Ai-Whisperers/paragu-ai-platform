import type { Metadata } from "next"
import Header from "@/components/header"
import Hero from "@/components/hero"
import FaqCategoriesSection from "@/components/faq-categories"
import CtaBanner from "@/components/cta-banner"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"
import content from "@/content/es.json"

export function generateMetadata(): Metadata {
  const data = content as any
  return {
    title: data.faqPage.seo.title.replace("{{businessName}}", data.siteName),
    description: data.faqPage.seo.description,
  }
}

export default function FaqPage() {
  const data = content as any
  const faq = data.faqPage
  const siteInfo = data.site || { businessName: data.siteName }
  const contactCta = data.home?.contact || {
    title: "¿Tenés otra consulta?",
    subtitle: "Escribinos y te respondemos a la brevedad",
    ctaText: "Contactar Ahora",
    ctaHref: "https://wa.me/595981000000?text=Hola%21%20Quiero%20informaci%C3%B3n%20sobre%20servicios%20notariales",
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Preguntas Frecuentes",
    description: faq.seo.description,
    mainEntity: faq.categories.flatMap((cat: any) =>
      cat.items.map((item: any) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  }

  return (
    <>
      <Header />
      <main>
        <Hero
          headline={faq.hero.headline}
          subheadline={faq.hero.subheadline}
          variant="dark"
        />
        <FaqCategoriesSection categories={faq.categories} />
        <CtaBanner
          title={contactCta.title}
          subtitle={contactCta.subtitle}
          buttonText={contactCta.ctaText}
          buttonHref={contactCta.ctaHref}
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
