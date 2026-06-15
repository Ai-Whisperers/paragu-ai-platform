import { notFound } from "next/navigation"
import { getContent } from "@/lib/utils"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const LOCALES = ["en", "es"] as const
const CONTENT: Record<string, any> = { en, es }

export function generateStaticParams() {
  return LOCALES.map(l => ({ locale: l }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const content = CONTENT[locale] || en
  return (
    <>
      <Navbar locale={locale} content={content} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} content={content} />
    </>
  )
}
