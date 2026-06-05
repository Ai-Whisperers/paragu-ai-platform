import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { ContactSection } from "@/components/sections/contact/ContactSection"
import { getSiteConfig } from "@/lib/config/config"
import esFaqs from "@/content/es/faqs.json"
import enFaqs from "@/content/en/faqs.json"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  const address = site.business?.address || "tu direccion"
  return {
    title: lang === "es" ? "Contacto" : "Contact",
    description: lang === "es"
      ? `Contactanos en ${address} por WhatsApp`
      : `Contact us at ${address} via WhatsApp`,
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const l = lang as "es" | "en"
  const allFaqs = l === "es" ? esFaqs : enFaqs
  const topFaqs = (allFaqs as { id: string; question: string; answer: string }[]).slice(0, 4)

  return (
    <>
      <Header lang={l} />
      <section className="bg-surface py-12">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            {l === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {topFaqs.map((faq) => (
              <a
                key={faq.id}
                href={`/${l}/faq#faq-${faq.id}`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow block"
              >
                <h3 className="font-semibold text-primary mb-2 text-sm">{faq.question}</h3>
                <p className="text-muted-foreground text-xs line-clamp-2">{faq.answer}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <ContactSection lang={l} />
      <Footer lang={l} />
      <WhatsAppFloat lang={l} />
    </>
  )
}
