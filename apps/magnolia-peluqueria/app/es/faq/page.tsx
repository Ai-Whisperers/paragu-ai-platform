import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { FAQAccordion } from "@/components/faq-accordion"
import { FAQJsonLd } from "@/components/faq-json-ld"
import { getContent } from "@/lib/config"

const FAQ_SCHEMA_ES = [
  { q: "¿Necesito pedir turno?", a: "Recomendamos sacar turno por WhatsApp para garantizar disponibilidad, aunque también podés llegar sin turno si hay lugar." },
  { q: "¿Cómo pago?", a: "Aceptamos efectivo y pago móvil. El pago se realiza al finalizar el servicio." },
  { q: "¿Hacés tratamientos para novias?", a: "Sí, tenemos paquetes especiales para eventos y bodas. Consultanos por WhatsApp." },
  { q: "¿Qué productos usan?", a: "Usamos productos de alta calidad: Wella, Schwarzkopf y Matrix." },
  { q: "¿Hay estacionamiento?", a: "Contamos con estacionamiento propio gratuito para nuestras clientas." },
]

const FAQ_SCHEMA_EN = [
  { q: "Do I need an appointment?", a: "We recommend booking via WhatsApp to ensure availability, though walk-ins are welcome if we have space." },
  { q: "How do I pay?", a: "We accept cash and mobile payment. Payment is due at the end of the service." },
  { q: "Do you offer bridal services?", a: "Yes, we have special packages for events and weddings. Contact us via WhatsApp." },
  { q: "What products do you use?", a: "We use high-quality products: Wella, Schwarzkopf, and Matrix." },
  { q: "Is there parking?", a: "We have free parking available for our clients." },
]

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const faqSchema = lang === "en" ? FAQ_SCHEMA_EN : FAQ_SCHEMA_ES
  const c = getContent(lang as "es" | "en")
  return {
    title: `Preguntas Frecuentes | ${c.business.name}`,
    description: `Preguntas frecuentes sobre ${c.business.name} — turnos, pagos, tratamientos y más.`,
    openGraph: {
      title: `Preguntas Frecuentes | ${c.business.name}`,
      description: `Preguntas frecuentes sobre ${c.business.name} — turnos, pagos, tratamientos y más.`,
    },
    alternates: {
      canonical: `/${lang}/faq`,
    },
  }
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  // Derive JSON-LD from content.json FAQs so structured data matches visible content
  const faqSchema = c.faqs.slice(0, 10).map((f: { q: string; a: string }) => ({ q: f.q, a: f.a }))

  return (
    <>
      <FAQJsonLd faqs={faqSchema} />
      <Header lang={lang as "es" | "en"} />
      <section className="py-20 bg-white">
        <div className="container-page max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold text-primary mb-3">
              {lang === "es" ? "Preguntas Frecuentes" : "FAQ"}
            </h1>
            <p className="text-foreground-light">
              {lang === "es" ? "Todo lo que necesitás saber sobre nuestros servicios" : "Everything you need to know about our services"}
            </p>
          </div>
          <FAQAccordion lang={lang as "es" | "en"} />
        </div>
      </section>
      <Footer
        businessName={c.business.name}
        tagline={c.business.tagline}
        address={c.business.address}
        phone={c.business.phoneFormatted}
        hours={c.business.hours}
        waPhone={c.business.whatsapp}
        lang={lang as "es" | "en"}
      />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}