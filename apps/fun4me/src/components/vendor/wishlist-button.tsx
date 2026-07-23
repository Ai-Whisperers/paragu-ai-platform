"use client"
import { useWishlist } from "@/lib/vendor/wishlist"

interface WishlistProduct {
  id: string | number
  [key: string]: unknown
}

export function WishlistButton({ product }: { product: WishlistProduct }) {
  const { toggle, isFavorite } = useWishlist()
  const fav = isFavorite(product.id)

  return (
    <button onClick={(e) => { e.preventDefault(); toggle(product) }}
      className="absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm transition-all hover:scale-110"
      aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={fav ? "#EC4899" : "none"} stroke={fav ? "#EC4899" : "#E2E8F0"} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  )
}
