// /es/terminos is a legacy Spanish slug — canonical is /es/terms.
import { redirect } from "next/navigation"

export function generateStaticParams() {
  return [{ locale: "es" }]
}

export default function RedirectToTerms() {
  redirect("/es/terms")
}
