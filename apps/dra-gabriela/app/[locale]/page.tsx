import { notFound } from "next/navigation"
import { getContent, isLocale } from "@/lib/content"
import { Hero } from "@/components/sections/Hero"
import { Stats } from "@/components/sections/Stats"
import { Reasons } from "@/components/sections/Reasons"
import { Services } from "@/components/sections/Services"
import { Testimonials } from "@/components/sections/Testimonials"
import { Process } from "@/components/sections/Process"
import { CtaBanner } from "@/components/sections/CtaBanner"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = getContent(locale)
  return {
    title: c.site?.name,
    description: c.site?.metaDescription,
    alternates: {
      languages: {
        en: "/en",
        es: "/es",
      },
    },
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const c = getContent(locale)

  return (
    <>
      <Hero c={c} locale={locale} />
      <Stats c={c} />
      <Reasons c={c} locale={locale} />
      <Services c={c} locale={locale} />
      <Testimonials c={c} locale={locale} />
      <Process c={c} locale={locale} />
      <CtaBanner c={c} locale={locale} />
    </>
  )
}
