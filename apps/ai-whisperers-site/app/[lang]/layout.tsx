import { notFound } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
type Locale = (typeof LOCALES)[number]

const CONTENT: Record<Locale, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  if (!LOCALES.includes(params.lang as Locale)) notFound()
  const content = CONTENT[params.lang as Locale]
  return (
    <>
      <Navbar lang={params.lang} content={content} />
      <main className="min-h-screen">{children}</main>
      <Footer lang={params.lang} content={content} />
    </>
  )
}
