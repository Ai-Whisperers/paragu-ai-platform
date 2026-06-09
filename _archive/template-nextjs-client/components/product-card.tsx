import Link from "next/link"

function formatPrice(amount: number) {
  return `Gs. ${Math.round(amount).toLocaleString("es-PY")}`
}

interface ProductCardProps {
  id?: number
  slug: string
  name: string
  price: number | string
  image?: string
  category?: string
  featured?: boolean
  new?: boolean
  rating?: number
}

export function ProductCard(product: ProductCardProps) {
  return (
    <div className="group relative">
      <Link href={`/producto/${product.slug}`}>
        <div className={`rounded-xl overflow-hidden bg-surface card-hover ${product.featured ? "border-2 border-accent" : "border border-border"}`}>
          <div className="h-48 bg-gradient-to-br from-surface-light to-surface flex items-center justify-center p-5 relative">
            <span className="text-5xl opacity-20 select-none">✦</span>
            {product.new && (
              <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Nuevo</span>
            )}
          </div>
          <div className="p-4">
            {product.featured && (
              <span className="bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded inline-block mb-2">Destacado</span>
            )}
            <h3 className="text-foreground font-semibold text-sm leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
            {product.rating && (
              <div className="text-warning text-xs mb-1">{Array.from({ length: product.rating }).map((_, i) => <span key={i}>★</span>)}</div>
            )}
            <p className="text-primary font-bold text-base">{formatPrice(Number(product.price))}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
