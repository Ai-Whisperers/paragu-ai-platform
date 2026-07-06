import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { PageHero } from "@/components/PageHero"
import { ThemeSelector } from "@/components/ThemeSelector"

const LOCALES = ["en", "es"] as const

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isEs = locale === "es"
  return buildMetadata({
    slug: "settings",
    title: isEs ? "Ajustes · Dra. Gabriella" : "Settings · Dra. Gabriella",
    description: isEs
      ? "Personaliza la apariencia del sitio: elige entre varias paletas de color."
      : "Personalize the site appearance: pick from several color palettes.",
    locale: isEs ? "es" : "en",
  })
}

export default async function Settings({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!LOCALES.includes(locale as any)) notFound()
  const isEs = locale === "es"

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Ajustes" : "Settings"}
        title={isEs ? "Personaliza tu experiencia" : "Personalize your experience"}
        subtitle={
          isEs
            ? "Elige una paleta de color. Se guarda en este dispositivo."
            : "Pick a color palette. It's saved on this device."
        }
        variant="default"
        align="center"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ThemeSelector locale={isEs ? "es" : "en"} />
      </div>
    </>
  )
}
