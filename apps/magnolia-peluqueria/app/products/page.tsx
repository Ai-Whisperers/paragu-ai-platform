import { Suspense } from 'react'
import Image from 'next/image'

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Hair Products</h1>
        <p className="text-xl text-gray-600">Premium quality products used by our expert stylists</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

const products = [
  {
    id: 1,
    name: 'Professional Hair Dryer',
    price: 89.99,
    category: 'Tools',
    image: '/images/products/hair-dryer.jpg',
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: 'Premium Hair Care Set',
    price: 149.99,
    category: 'Care',
    image: '/images/products/hair-care-set.jpg',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Styling Cream',
    price: 34.99,
    category: 'Styling',
    image: '/images/products/styling-cream.jpg',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: 'Hair Mask Treatment',
    price: 42.99,
    category: 'Treatment',
    image: '/images/products/hair-mask.jpg',
    rating: 4.8,
    reviews: 203
  },
  {
    id: 5,
    name: 'Flat Iron Pro',
    price: 129.99,
    category: 'Tools',
    image: '/images/products/flat-iron.jpg',
    rating: 4.9,
    reviews: 78
  },
  {
    id: 6,
    name: 'Anti-Frizz Serum',
    price: 28.99,
    category: 'Styling',
    image: '/images/products/serum.jpg',
    rating: 4.6,
    reviews: 112
  },
  {
    id: 7,
    name: 'Color-Protect Shampoo',
    price: 24.99,
    category: 'Care',
    image: '/images/products/shampoo.jpg',
    rating: 4.7,
    reviews: 189
  },
  {
    id: 8,
    name: 'Detangling Brush',
    price: 18.99,
    category: 'Tools',
    image: '/images/products/brush.jpg',
    rating: 4.5,
    reviews: 94
  }
]

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative h-64 bg-gray-200">
        {/* Placeholder for product image */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">💇‍♀️</div>
            <div className="text-sm text-gray-600">Professional Product</div>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {product.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-sm">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
