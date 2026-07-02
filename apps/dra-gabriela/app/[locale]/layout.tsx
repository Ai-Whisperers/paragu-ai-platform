// /[locale] layout — wraps every locale page with the Navbar, Footer,
// CookieConsent, mobile sticky CTA, skip-to-content link, and back-to-top.

import { notFound } from "next/navigation"
import { getContent, isLocale } from "@/lib/content"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CookieConsent } from "@/components/CookieConsent"
import { SchemaOrg } from "@/components/SchemaOrg"
import { MobileStickyCta } from "@/components/MobileStickyCta"
import { SkipToContent } from "@/components/SkipToContent"
import { BackToTop } from "@/components/BackToTop"
import { LiveAnnouncer } from "@/components/LiveAnnouncer"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
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
  return (
    <>
      <head>
        <SchemaOrg locale={locale} />
      </head>
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
