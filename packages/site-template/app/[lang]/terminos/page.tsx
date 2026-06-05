/**
 * ANNOTATION: TermsAndConditions
 *
 * What it is: A static legal page displaying the business's terms and conditions.
 * Content is configured once during onboarding and rarely changes.
 *
 * Why your business needs it: Required legal page for any professional service
 * business. Protects you by defining cancellation policy, liability limits,
 * refund policy, and service terms. Also required for payment processing
 * integrations.
 *
 * What AI populates from your data:
 *   - Legal text from content/{lang}/ui.json (or generated from a template)
 *   - Business name, address, RUC from site config
 *
 * Your input: Tell us your cancellation policy, refund policy, and any specific
 * legal requirements via WhatsApp. We generate standard T&C text tailored to
 * your business type and Paraguay regulations.
 *
 * Plan availability: Basic, Crecimiento, Profesional
 */

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import { getSiteConfig } from "@/lib/config/config"
import es_ui from "@/content/es/ui.json"
import en_ui from "@/content/en/ui.json"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  const title = lang === "es" ? "Términos y Condiciones" : "Terms and Conditions"
  return { title: `${title} | ${site.site.name}` }
}


function TermsSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
      {body.split("\n\n").map((para, i) => (
        <p key={i} className="text-gray-600 leading-relaxed mb-3">{para}</p>
      ))}
    </section>
  )
}

export default async function TerminosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const content = lang === "es" ? es_ui.legal.terminos : en_ui.legal.terminos
  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{content.title}</h1>
        <p className="text-gray-400 text-sm mb-12">
          {lang === "es" ? "Última actualización: junio 2026" : "Last updated: June 2026"}
        </p>
        {content.sections.map((section) => (
          <TermsSection key={section.title} title={section.title} body={section.body} />
        ))}
      </main>
      <Footer lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
      <MobileCta />
    </>
  )
}
