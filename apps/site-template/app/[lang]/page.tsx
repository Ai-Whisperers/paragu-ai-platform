/**
 * ANNOTATION: Homepage
 *
 * What it is: The landing page — hero banner, stats, services preview, gallery,
 * testimonials, newsletter signup, loyalty section, location, and Instagram feed.
 * This is the FIRST page every visitor sees.
 *
 * Why your business needs it: The homepage is your digital storefront. It must
 * communicate who you are, what you offer, and why visitors should trust you — all
 * within seconds. A polished homepage converts casual browsers into leads.
 *
 * What AI populates from your data:
 *   - Hero headlines & images from content/es/hero.json and content/en/hero.json
 *   - Business stats (years, clients, 5-star reviews) from content/es/stats.json
 *   - Services preview from content/es/services/index.json
 *   - Gallery images from content/es/gallery.json
 *   - Testimonials carousel from content/es/testimonials.json
 *   - Team/trust signals from content/_shared/team.json
 *   - Location & hours from content/es/site.json
 *
 * Your input: Send your business name, category, city, and 3 photos via WhatsApp.
 * We generate hero copy, select your best images, and wire up your location.
 *
 * Plan availability: Basic, Crecimiento, Profesional
 */

import type { Metadata } from "next"
import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/sections/hero/HeroSection"
import { AnimatedStats } from "@/components/sections/marketing/AnimatedStatsSection"
import { ServicesPreview } from "@/components/sections/services/ServicesPreview"
import { Gallery } from "@/components/sections/gallery/GallerySection"
import { Testimonials } from "@/components/sections/testimonials/TestimonialsSection"
import { NewsletterSection } from "@/components/sections/marketing/Newsletter"
import { LoyaltySection } from "@/components/sections/marketing/LoyaltySection"
import { Location } from "@/components/sections/LocationSection"
import { isFeatureEnabled } from "@/lib/features"
import { InstagramFeed } from "@/components/marketing/instagram-feed"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { ClientLogoFarm } from "@/components/sections/marketing/ClientLogoFarm"
import { WhyUs } from "@/components/sections/WhyUsSection"
import { getSiteConfig, getSiteName, getHeroSlides } from "@/lib/config/config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const site = getSiteConfig(lang as "es" | "en")
  return {
    title: site.site?.name || getSiteName(),
    description: site.site?.metaDescription || "",
  }
}

export default async function LangHomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const l = lang as "es" | "en"
  const heroSlidesData = getHeroSlides(l, false)

  return (
    <>
      <Header lang={l} />
      <Hero lang={l} heroSlides={heroSlidesData} />
      <AnimatedStats />
      <ServicesPreview lang={l} />
      <Gallery />
      {isFeatureEnabled("logos", l) && <ClientLogoFarm />}
      {isFeatureEnabled("whyUs", l) && <WhyUs />}
      <Testimonials />
      <Location />
      <LoyaltySection />
      {isFeatureEnabled("instagramFeed", l) && <InstagramFeed />}
      <NewsletterSection lang={l} />
      <Footer
        lang={l}
      />
      <WhatsAppFloat lang={l} />
    </>
  )
}
