import { PageLayout } from "@/components/page-layout"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const premades = content.premades
const items = premades.items
const phone = content.whatsapp.phone

export default function PremadesPage() {
  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[30vh] items-center justify-center bg-surface px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Portadas Premade</h1>
          <p className="mt-3 text-lg text-muted-foreground">Diseños exclusivos listos para llevar. Personalizamos con tu título y colores.</p>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">Disponibles Ahora</h2>
            <p className="text-muted-foreground">Todas desde <strong>{items[0]?.priceGs || "Gs. 250.000"} ({items[0]?.priceUsd || "$35 USD"})</strong> — incluye personalización de título, tipografía y colores + 2 mockups 3D + banners de revelación</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <div key={i} className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-[5/8] overflow-hidden bg-surface">
                  <img
                    src={item.image}
                    alt={`Premade: ${item.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.genre}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-primary">{item.priceGs}</p>
                      <p className="text-xs text-muted-foreground">{item.priceUsd}</p>
                    </div>
                    <a
                      href={`https://wa.me/${phone}?text=${encodeURIComponent("Hola! Me interesa la premade " + item.title + " (" + item.priceGs + "). Quiero saber disponibilidad.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      Consultar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {items.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">Próximamente nuevas premades. Suscribite para recibir novedades.</p>
            </div>
          )}
          <div className="mt-10 text-center">
            <p className="mb-4 text-muted-foreground">¿No encontrás lo que buscás? Encargá una portada 100% personalizada</p>
            <a href="/servicios" className="inline-block rounded-lg bg-secondary px-8 py-3 font-semibold text-secondary-foreground transition-all hover:bg-secondary/90">
              Ver Servicios Personalizados
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}