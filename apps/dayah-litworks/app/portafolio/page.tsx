import { PageLayout } from "@/components/page-layout"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const portfolio = content.home.portfolio
const phone = content.whatsapp.phone

export default function PortafolioPage() {
  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[30vh] items-center justify-center bg-surface px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Portafolio</h1>
          <p className="mt-3 text-lg text-muted-foreground">Trabajos que hablan solos</p>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          {portfolio.items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.items.map((item, i) => (
                <a key={i} href={`/portafolio/${item.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="aspect-[5/8] overflow-hidden bg-surface">
                    <img src={item.image} alt={`Portada de ${item.title}`} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.genre}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">Portafolio en actualización. Pronto más trabajos.</p>
            </div>
          )}
          <div className="mt-10 text-center">
            <a href={`https://wa.me/${phone}?text=Hola!%20Quiero%20encargar%20mi%20portada`} target="_blank" rel="noopener noreferrer"
              className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
              Encargar mi portada
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}