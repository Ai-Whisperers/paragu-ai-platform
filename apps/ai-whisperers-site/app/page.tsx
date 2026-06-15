// Root redirect: send to /en (default locale)
import { redirect } from "next/navigation"

export default function Root() {
  redirect("/en")
}
