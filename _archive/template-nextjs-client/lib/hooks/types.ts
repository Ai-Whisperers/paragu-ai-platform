export interface ProductLike {
  id: number
  slug: string
  name: string
  price: number
  image?: string
  category?: string
}

export interface WishlistItem extends ProductLike {}
