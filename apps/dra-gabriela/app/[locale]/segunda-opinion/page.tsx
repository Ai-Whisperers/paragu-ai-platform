// Cross-locale slug alias: /[locale]/segunda-opinion → /[locale]/second-opinion
import { notFound, redirect } from "next/navigation"

const LOCALES = ["en", "es"] as const

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l }))
}

export default function SegundaOpinionRedirect({ params }: { params: Promise<{ locale: string }> }) {
  return params.then(({ locale }) => {
    if (locale !== "en" && locale !== "es") notFound()
    redirect(`/${locale}/second-opinion`)
  })
}
