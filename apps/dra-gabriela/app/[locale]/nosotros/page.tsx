// /es/nosotros is a legacy Spanish slug — canonical is /es/about.
import { redirect } from "next/navigation"

export function generateStaticParams() {
  return [{ locale: "es" }]
}

export default function NosotrosRedirect() {
  redirect("/es/about")
}
