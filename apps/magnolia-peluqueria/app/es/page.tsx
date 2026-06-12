import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AnimatedStats } from "@/components/animated-stats"
import { ServicesPreview } from "@/components/services-preview"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { NewsletterSection } from "@/components/newsletter"
import { LoyaltySection } from "@/components/loyalty"
import { Location } from "@/components/location"
import { InstagramFeed } from "@/components/instagram-feed"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getContent } from "@/lib/config"
import { business, heroSlides, siteUrl } from "@/lib/config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const c = getContent(lang as "es" | "en")
  return {
    title: `${c.business.name} | ${c.business.tagline}`,
    description: c.business.tagline,
    keywords: c.business.keywords,
    authors: [{ name: c.business.name }],
    creator: c.business.name,
    publisher: c.business.name,
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    alternates: { canonical: `${siteUrl}/${lang}` },
    openGraph: {
      title: `${c.business.name} | ${c.business.tagline}`,
      description: c.business.tagline,
      url: `${siteUrl}/${lang}`,
      siteName: c.business.name,
      images: [
        {
          url: `${siteUrl}/og/og-image.png`,
          width: 1200,
          height: 630,
          alt: c.business.name,
          type: "image/png",
        },
      ],
      locale: lang === "es" ? "es_PY" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.business.name} | ${c.business.tagline}`,
      description: c.business.tagline,
      images: [`${siteUrl}/og/og-image.png`],
    },
  }
}

export default async function LangHomePage() {
  // This page lives at /es (static route). The lang is implicit.
  const lang = "es" as const
  const c = getContent(lang)

  return (
    <>
      <head>
        <meta property="og:image" content={`${siteUrl}/og/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`${siteUrl}/${lang}`} />
        <meta property="og:title" content={`${c.business.name} | ${c.business.tagline}`} />
        <meta property="og:description" content={c.business.tagline} />
      </head>
      <Header lang={lang as "es" | "en"} />
      <Hero lang={lang as "es" | "en"} />
      <AnimatedStats lang={lang as "es" | "en"} />
      <ServicesPreview lang={lang as "es" | "en"} />
      <Gallery />
      <Testimonials />
      <Location />
      <LoyaltySection />
      <InstagramFeed />
      <NewsletterSection lang={lang as "es" | "en"} />
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
