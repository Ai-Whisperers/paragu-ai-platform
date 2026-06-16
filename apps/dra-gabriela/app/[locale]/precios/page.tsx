// /es/precios is a legacy Spanish slug — the canonical URL is /es/pricing
// (which is the locale-aware page in ../pricing). Redirect to it.
import { redirect } from "next/navigation"

export function generateStaticParams() {
  return [{ locale: "es" }]
}

export default function PreciosRedirect() {
  redirect("/es/pricing")
}
