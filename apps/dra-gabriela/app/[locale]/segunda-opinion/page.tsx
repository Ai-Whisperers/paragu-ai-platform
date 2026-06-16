// /es/segunda-opinion is a legacy Spanish slug — canonical is /es/second-opinion.
import { redirect } from "next/navigation"

export function generateStaticParams() {
  return [{ locale: "es" }]
}

export default function SegundaOpinionRedirect() {
  redirect("/es/second-opinion")
}
