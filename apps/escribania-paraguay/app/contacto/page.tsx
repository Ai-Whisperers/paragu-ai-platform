import type { Metadata } from "next"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ContactInfo from "@/components/contact-info"
import ContactFormSection from "@/components/contact-form-section"
import CtaBanner from "@/components/cta-banner"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"
import content from "@/content/es.json"

export function generateMetadata(): Metadata {
  const data = content as any
  return {
    title: data.contactoPage.seo.title.replace("{{businessName}}", data.siteName),
    description: data.contactoPage.seo.description,
  }
}

export default function ContactoPage() {
  const data = content as any
  const contacto = data.contactoPage
  const siteInfo = data.site || { businessName: data.siteName }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto",
    description: contacto.seo.description,
    mainEntity: {
      "@type": "ProfessionalService",
      name: siteInfo.businessName || data.siteName,
      address: { "@type": "PostalAddress", addressLocality: "Asunción", addressCountry: "PY" },
      telephone: `+595 ${siteInfo.phone || ""}`,
      email: siteInfo.email || "",
      areaServed: "PY",
    },
  }

  return (
    <>
      <Header />
      <main>
        <Hero
          headline={contacto.hero.headline}
          subheadline={contacto.hero.subheadline}
          variant="dark"
        />
        <ContactInfo
          title={contacto.info.title}
          items={contacto.info.items}
        />
        <ContactFormSection
          title={contacto.form.title}
          subtitle={contacto.form.subtitle}
          fields={contacto.form.fields}
          submitText={contacto.form.submitText}
        />
        <CtaBanner
          title={contacto.cta.title}
          subtitle={contacto.cta.subtitle}
          buttonText={contacto.cta.buttonText}
          buttonHref={contacto.cta.buttonHref}
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
