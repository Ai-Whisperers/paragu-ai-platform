import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { MobileCta } from "@/components/marketing/MobileCTA"
import { PricingSection } from "@/components/sections/pricing/PricingSection"
import { PricingComparisonMatrix } from "@/components/sections/pricing/PricingComparisonMatrix"
import { isFeatureEnabled } from "@/lib/features"
import { getSiteConfig } from "@/lib/config/config"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const site = getSiteConfig(lang as "es" | "en")
  return {
    title: lang === "es" ? "Precios" : "Pricing",
    description: lang === "es"
      ? `Planes y precios para tu negocio - ${site.site.name}`
      : `Plans and pricing for your business - ${site.site.name}`,
  }
}

export default async function PreciosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const l = lang as "es" | "en"

  if (!isFeatureEnabled("pricing", l)) {
    return (
      <>
        <Header lang={l} />
        <div className="py-20 text-center">
          <p className="text-foreground-light">{l === "es" ? "Funcion de precios no disponible" : "Pricing feature not available"}</p>
        </div>
        <Footer lang={l} />
        <WhatsAppFloat lang={l} />
      </>
    )
  }

  return (
    <>
      <Header lang={l} />
      <PricingSection lang={l} />
      <PricingComparisonMatrix lang={l} />
      <Footer lang={l} />
      <WhatsAppFloat lang={l} />
      <MobileCta lang={l} />
    </>
  )
}
