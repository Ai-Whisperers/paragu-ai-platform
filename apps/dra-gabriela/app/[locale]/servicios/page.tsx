// /es/servicios is a legacy Spanish slug — canonical is /es/services.
import { redirect } from "next/navigation"

export function generateStaticParams() {
  return [{ locale: "es" }]
}

export default function ServiciosRedirect() {
  redirect("/es/services")
}
