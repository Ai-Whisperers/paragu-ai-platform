import { PageLayout } from "@/components/page-layout"
import { notFound } from "next/navigation"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const allItems = content.home.portfolio.items
const phone = content.whatsapp.phone

export function generateStaticParams() {
  return allItems.map((item) => ({ slug: item.slug }))
}

export default async function PortfolioItemPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const item = allItems.find((i) => i.slug === params.slug)
  if (!item) notFound()

  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[20vh] items-center justify-center bg-surface px-4">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{item.genre}</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground">{item.title}</h1>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img src={item.image} alt={`Portada de ${item.title}`} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-2xl font-bold text-foreground">{item.title}</h2>
              <p className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Género</p>
              <p className="mb-4 text-foreground">{item.genre}</p>
              {item.author && (
                <>
                  <p className="mb-1 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Autora</p>
                  <p className="mb-6 text-foreground">{item.author}</p>
                </>
              )}
              <div className="mb-8 rounded-lg bg-surface p-6">
                <p className="text-sm text-muted-foreground italic">
                  Cada portada es el resultado de un proceso creativo único: entender la historia, el tono, los personajes,
                  y traducir todo eso en una imagen que enganche a primera vista.
                </p>
              </div>
              {item.amazonUrl && (
                <a href={item.amazonUrl} target="_blank" rel="noopener noreferrer"
                  className="mb-4 inline-block text-sm font-medium text-primary hover:underline">
                  Ver libro en Amazon →
                </a>
              )}
              <a href={`https://wa.me/${phone}?text=${encodeURIComponent("Hola! Me encanta la portada de " + item.title + ". Quiero una así para mi libro.")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-block self-start rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                Quiero una Portada Así
              </a>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a href="/portafolio" className="text-sm text-muted-foreground hover:text-primary hover:underline">← Ver todos los trabajos</a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}