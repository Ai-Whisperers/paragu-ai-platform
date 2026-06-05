/**
 * ANNOTATION: FAQPage
 *
 * What it is: An accordion-style FAQ page that displays questions and answers
 * sourced from content JSON. Covers common client questions about services,
 * pricing, hours, cancellations, etc.
 *
 * Why your business needs it: FAQs reduce repetitive WhatsApp messages by
 * answering the top 10-15 questions upfront. Each answered question is one less
 * interruption to your workday. Also improves SEO with question-based keywords.
 *
 * What AI populates from your data:
 *   - FAQ items from content/{lang}/ui.json (faq section)
 *   - Business-specific answers derived from your service catalog and policies
 *   - SEO metadata from site config
 *
 * Your input: Send a list of the top 10 questions clients ask you most often,
 * along with your answers. We format them into the accordion.
 *
 * Plan availability: Basic, Crecimiento, Profesional
 */

import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { FAQAccordion } from "@/components/shared/FaqAccordion"
import { FAQJsonLd } from "@/components/shared/FaqJsonLd"
import { getSiteConfig } from "@/lib/config/config"
import esUi from "@/content/es/ui.json"
import enUi from "@/content/en/ui.json"
import esFaqs from "@/content/es/faqs.json"
import enFaqs from "@/content/en/faqs.json"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  return {
    title: lang === "es" ? esUi.faqs.title : enUi.faqs.title,
    description: `Preguntas frecuentes sobre ${site.site.name} — turnos, pagos, tratamientos y más.`,
  }
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  const rawFaqs = lang === "en" ? enFaqs : esFaqs
  const faqs = rawFaqs.map((f: {id: string; question: string; answer: string}) => ({ q: f.question, a: f.answer }))

  const ui = lang === "es" ? esUi : enUi

  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <Header lang={lang as "es" | "en"} />
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-3 font-heading text-4xl font-bold text-primary">
              {ui.faqs.title}
            </h1>
            <p className="text-foreground-light">
              {ui.faqs.subtitle}
            </p>
          </div>
          <FAQAccordion lang={lang as "es" | "en"} />
        </div>
      </section>
      <Footer lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
    </>
  )
}
