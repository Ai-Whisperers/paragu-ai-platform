// /es/servicios/[slug] → same as /es/services/[slug]
// Maps Spanish slugs to the service detail component. E.g.:
//   /es/servicios/segunda-opinion → /es/services/second-opinion
//   /es/servicios/estetica-dental → /es/services/cosmetic-dentistry
import { notFound, redirect } from "next/navigation"

const SLUG_MAP: Record<string, string> = {
  "segunda-opinion": "second-opinion",
  "planificacion-tratamiento": "treatment-planning",
  "odontologia-general": "general-dentistry",
  "estetica-dental": "cosmetic-dentistry",
  "rehabilitacion-oral": "oral-rehabilitation",
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ locale: "es", slug }))
}

export default async function ServiciosSlug({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const target = SLUG_MAP[slug]
  if (!target) notFound()
  redirect(`/${locale}/services/${target}`)
}
