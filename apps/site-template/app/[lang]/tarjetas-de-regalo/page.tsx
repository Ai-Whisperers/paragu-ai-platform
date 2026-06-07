/**
 * ANNOTATION: GiftCardsPage
 *
 * What it is: A gift card page where visitors can purchase digital gift cards for
 * friends and family. Gift cards are delivered via unique UUID links (/c/[token]).
 *
 * Why your business needs it: Gift cards are a pre-sale — you get paid before
 * delivering the service. They're also the #1 way new clients discover your
 * business (someone buys a gift card for a friend who's never been). Essential
 * revenue stream for any service business.
 *
 * What AI populates from your data:
 *   - Gift card types and amounts from content/{lang}/gift-cards/index.json
 *   - Business info for the purchase flow from site config
 *   - UUID token generation for secure gift card links
 *
 * Your input: Tell us what gift card amounts you want to offer (e.g., 50.000 Gs,
 * 100.000 Gs, 200.000 Gs) via WhatsApp. We set up the purchase flow.
 *
 * Plan availability: Profesional
 */

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import esUi from "@/content/es/ui.json"
import enUi from "@/content/en/ui.json"
import { GiftCardsSection } from "@/components/sections/gift-cards"
import { getSiteConfig } from "@/lib/config/config"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  return { title: `Tarjetas de Regalo | ${site.site.name}` }
}

export default async function TarjetasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  const ui = lang === "es" ? esUi : enUi

  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">{ui.giftCards.title}</h1>
          <GiftCardsSection />
        </div>
      </section>
      <Footer lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
      <MobileCta />
    </>
  )
}
