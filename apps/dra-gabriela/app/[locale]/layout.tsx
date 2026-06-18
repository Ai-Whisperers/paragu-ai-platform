import { notFound } from "next/navigation"
import { getContent, isLocale } from "@/lib/content"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CookieConsent } from "@/components/CookieConsent"
import { SchemaOrg } from "@/components/SchemaOrg"
import { MobileStickyCta } from "@/components/MobileStickyCta"

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
      <Navbar locale={locale} business={content.business} />
      <main lang={locale} className="pb-20 md:pb-0">{children}</main>
      <Footer locale={locale} content={content} />
      <CookieConsent locale={locale} />
      <MobileStickyCta content={content} />
    </>
  )
}
