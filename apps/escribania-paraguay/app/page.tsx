import Header from "@/components/header"
import Hero from "@/components/hero"
import StatsSection from "@/components/stats-section"
import ServicesPreview from "@/components/services-preview"
import TrustSection from "@/components/trust-section"
import ProcessSection from "@/components/process-section"
import TestimonialsSection from "@/components/testimonials-section"
import FaqSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"
import content from "@/content/es.json"

export default function HomePage() {
  const data = content as any
  return (
    <>
      <Header />
      <main>
        <Hero
          headline={data.home.hero.headline}
          subheadline={data.home.hero.subheadline}
          ctaPrimaryText={data.home.hero.ctaPrimaryText}
          ctaPrimaryHref="/contacto"
          ctaSecondaryText={data.home.hero.ctaSecondaryText}
          ctaSecondaryHref="/servicios"
          variant="dark"
        />
        <StatsSection items={data.home.stats.items} />
        <ServicesPreview
          title={data.home.services.title}
          subtitle={data.home.services.subtitle}
          items={data.home.services.items}
        />
        <TrustSection
          title={data.home.trust.title}
          items={data.home.trust.items}
        />
        <ProcessSection
          title={data.home.process.title}
          subtitle={data.home.process.subtitle}
          steps={data.home.process.steps}
        />
        <TestimonialsSection
          title={data.home.testimonials.title}
          items={data.home.testimonials.items}
        />
        <FaqSection
          title={data.home.faq.title}
          subtitle={data.home.faq.subtitle}
          items={data.home.faq.items}
        />
        <ContactSection
          title={data.home.contact.title}
          subtitle={data.home.contact.subtitle}
          ctaText={data.home.contact.ctaText}
          ctaHref={data.home.contact.ctaHref}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
