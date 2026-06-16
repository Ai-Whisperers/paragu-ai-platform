// /es/privacidad is a legacy Spanish slug — canonical is /es/privacy.
import { redirect } from "next/navigation"

export function generateStaticParams() {
  return [{ locale: "es" }]
}

export default function RedirectToPrivacy() {
  redirect("/es/privacy")
}
