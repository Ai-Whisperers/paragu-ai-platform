/**
 * ANNOTATION: OffersPage
 *
 * What it is: A promotions/offers page that displays current deals, discounts, and
 * special packages. Content is configured per language in content JSON.
 *
 * Why your business needs it: Promotions drive urgency and repeat visits. A
 * dedicated offers page makes it easy to communicate limited-time deals without
 * cluttering the homepage or posting on social media separately.
 *
 * What AI populates from your data:
 *   - Promotion names, descriptions, prices from content/{lang}/promotions/*.json
 *   - Promotion images from your uploaded gallery
 *   - Expiry dates and terms from your campaign data
 *   - SEO metadata from site config
 *
 * Your input: Tell us about your promotion via WhatsApp — what's included, the
 * price, and the end date. We create a dedicated promo page and link it from
 * the homepage.
 *
 * Plan availability: Crecimiento, Profesional
 */

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import { getSiteConfig } from "@/lib/config/config"
import { Promotions } from "@/components/sections/marketing/Promotions"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const site = await getSiteConfig(lang as "es" | "en")
  return { title: `Ofertas | ${site.site.name}`, description: site.site.metaDescription }
}

export default async function OfertasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return (
    <>
      <Header lang={lang as "es" | "en"} />
      <Promotions lang={lang as "es" | "en"} />
      <Footer lang={lang as "es" | "en"} />
      <WhatsAppFloat lang={lang as "es" | "en"} />
      <MobileCta />
    </>
  )
}