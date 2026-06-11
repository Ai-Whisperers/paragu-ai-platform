import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const c = raw as unknown as Content
const phone = c.whatsapp.phone

export default function NotFound() {
  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[60vh] items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <p className="mb-8 text-lg text-muted-foreground">Página no encontrada</p>
          <Link href="/" className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
            Volver al inicio
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
