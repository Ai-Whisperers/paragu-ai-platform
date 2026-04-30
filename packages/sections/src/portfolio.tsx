// Portfolio Section — book cover grid with 2:3 aspect ratio
import Image from "next/image"

export interface PortfolioItem {
  title: string
  image?: string
  imageUrl?: string
  category?: string
}

export interface PortfolioSectionProps {
  title: string
  subtitle?: string
  items: PortfolioItem[]
  columns?: number
}

export function PortfolioSection({
  title,
  subtitle,
  items,
  columns = 4,
}: PortfolioSectionProps) {
  if (!items?.length) return null

  const cols = Math.min(columns, items.length, 4)
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols]

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <div className={`grid gap-6 ${gridCols}`}>
          {items.map((item, i) => (
            <div key={i} className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-surface-light">
              {(item.image || item.imageUrl) ? (
                <Image
                  src={item.image || item.imageUrl || ""}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading={i < 4 ? "eager" : "lazy"}
                  fetchPriority={i < 4 ? "high" : undefined}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-secondary">
                  <span className="text-4xl font-bold text-white opacity-30">
                    {item.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  {item.category && (
                    <p className="text-sm text-white/80">{item.category}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
