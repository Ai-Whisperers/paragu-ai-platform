// /[locale] layout — wraps every locale page with the Navbar, Footer,
// CookieConsent, mobile sticky CTA, skip-to-content link, and back-to-top.

import { notFound } from "next/navigation"
import { getContent, isLocale } from "@/lib/content"

// Skip static prerender — pages render at request time (SSR).
// Works around Next.js 16 + React 19 + auto-generated _global-error useContext crash.
export const dynamic = "force-dynamic"
export const revalidate = 0
// Don't pre-generate any static pages — render all on demand
export const dynamicParams = true
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CookieConsent } from "@/components/CookieConsent"
import { SchemaOrg } from "@/components/SchemaOrg"
import { MobileStickyCta } from "@/components/MobileStickyCta"
import { SkipToContent } from "@/components/SkipToContent"
import { BackToTop } from "@/components/BackToTop"
import { LiveAnnouncer } from "@/components/LiveAnnouncer"

export function generateStaticParams() {
  // Generate params but never prerender — see dynamic = "force-dynamic" above
  return [{ locale: "en" }, { locale: "es" }]
}


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { getSchemaOrgJson } = await import('@/components/SchemaOrg')
  return {}
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1A5F5A' },
    { media: '(prefers-color-scheme: dark)', color: '#0F3F3B' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const content = getContent(locale)
  const { getSchemaOrgJson } = await import('@/components/SchemaOrg')
  const schemaOrgJson = getSchemaOrgJson(locale)
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaOrgJson }}
      />
      <SkipToContent locale={locale} />
      <Navbar locale={locale} business={content.business} />
      <main id="main-content" lang={locale} className="pb-20 md:pb-0">{children}</main>
      <Footer locale={locale} content={content} />
      <CookieConsent locale={locale} />
      <MobileStickyCta content={content} />
      <BackToTop />
      <LiveAnnouncer locale={locale} />
    </>
  )
}
