import Link from "next/link"
import { WishlistButton } from "@/components/vendor/wishlist-button"
import { SafeImage } from "@/components/vendor/safe-image"

function formatPrice(amount: number) {
  return `Gs. ${Math.round(amount).toLocaleString("es-PY")}`
}

interface ProductCardProps {
  id: string | number
  slug: string
  name: string
  price: number
  image: string
  category?: string
  featured?: boolean
  new?: boolean
  rating?: number
}

export function ProductCard({ id, slug, name, price, image, category, featured, new: isNew, rating }: ProductCardProps) {
  const product = { id, slug, name, price, image, category, featured, new: isNew, rating }
  return (
    <div className="group relative">
      <WishlistButton product={product} />
      <Link href={`/producto/${slug}`}>
        <div className={`rounded-xl overflow-hidden bg-surface card-hover ${featured ? "border-2 border-accent" : "border border-border"}`}>
          <div className="h-48 bg-gradient-to-br from-surface-light to-surface flex items-center justify-center p-5 relative">
            {image ? (
              <SafeImage src={image} alt={name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" fallback="✦" />
            ) : (
              <span className="text-5xl opacity-20 select-none group-hover:opacity-40 transition-opacity">✦</span>
            )}
            {isNew && (
              <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Nuevo</span>
            )}
          </div>
          <div className="p-4">
            {featured && (
              <span className="bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded inline-block mb-2">Destacado</span>
            )}
            <h3 className="text-foreground font-semibold text-sm leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">{name}</h3>
            {rating && (
              <div className="text-warning text-xs mb-1">{Array.from({ length: rating }).map((_, i) => <span key={i}>★</span>)}</div>
            )}
            <p className="text-primary font-bold text-base transition-all duration-300 group-hover:scale-105 inline-block">{formatPrice(price)}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
