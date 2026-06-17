// Cross-locale slug alias: /[locale]/servicios → /[locale]/services
import { notFound, redirect } from "next/navigation"

const LOCALES = ["en", "es"] as const

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export default function ServiciosRedirect({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => {
    if (locale !== "en" && locale !== "es") notFound()
    redirect(`/${locale}/services`)
  })
}
