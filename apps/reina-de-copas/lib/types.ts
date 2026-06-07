import type { Product } from './products'

export interface CartItem {
  product: {
    sku: string
    name: string
    price: number
    images: string[]
  }
  size: string
  qty: number
}

export interface CustomerInfo {
  name: string
  phone: string
  address: string
  notes: string
}

export type { Product }
