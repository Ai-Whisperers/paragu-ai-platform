import { notFound } from "next/navigation"
import { getContent, isLocale } from "@/lib/content"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CookieConsent } from "@/components/CookieConsent"

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
      <Navbar locale={locale} content={content} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} content={content} />
      <CookieConsent locale={locale} />
    </>
  )
}
