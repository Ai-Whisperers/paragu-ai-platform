// Services Section — with dual-currency pricing (USD + PYG)
import { Badge } from "@ai-whisperers/ui/badge"
import { Card, CardContent } from "@ai-whisperers/ui/card"
import { Clock } from "lucide-react"

export interface ServiceItem {
  name: string
  description?: string
  priceUSD?: string
  pricePYG?: string
  delivery?: string
  includes?: string[]
  category?: string
}

export interface ServicesSectionProps {
  title: string
  subtitle?: string
  items: ServiceItem[]
}

function renderPrice(item: ServiceItem): string {
  if (item.priceUSD && item.pricePYG) return `${item.priceUSD} / ${item.pricePYG}`
  return item.priceUSD || item.pricePYG || ""
}

export function ServicesSection({ title, subtitle, items }: ServicesSectionProps) {
  if (!items?.length) return null
  
  // Group by category
  const grouped: Record<string, ServiceItem[]> = {}
  for (const item of items) {
    const cat = item.category || "Otros"
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(item)
  }

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        
        {Object.entries(grouped).map(([category, services]) => (
          <div key={category} className="mb-12">
            <h3 className="mb-6 text-xl font-semibold text-primary">{category}</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((svc, i) => (
                <Card key={i} className="flex flex-col border-border bg-surface">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h4 className="text-lg font-semibold text-foreground">{svc.name}</h4>
                      {renderPrice(svc) && <Badge variant="outline">{renderPrice(svc)}</Badge>}
                    </div>
                    {svc.description && (
                      <p className="mb-3 text-sm text-muted-foreground">{svc.description}</p>
                    )}
                    {svc.delivery && (
                      <p className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} /> Entrega: {svc.delivery}
                      </p>
                    )}
                    {svc.includes?.length > 0 && (
                      <div className="mt-auto">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          INCLUYE
                        </p>
                        <ul className="space-y-1">
                          {svc.includes.map((inc, j) => (
                            <li key={j} className="flex gap-2 text-sm text-foreground">
                              <span className="text-primary">•</span>
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
