export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // In production, fetch product data from Supabase
  const product = {
    id: parseInt(id),
    name: 'Professional Hair Dryer',
    price: 89.99,
    description: 'Professional-grade hair dryer with advanced ionic technology for faster drying and reduced frizz. Features multiple heat and speed settings, cool shot button, and lightweight design for comfortable use.',
    specifications: [
      { label: 'Power', value: '1875W' },
      { label: 'Technology', value: 'Ionic' },
      { label: 'Heat Settings', value: '3' },
      { label: 'Speed Settings', value: '2' },
      { label: 'Weight', value: '1.2 lbs' },
      { label: 'Warranty', value: '2 years' }
    ],
    images: ['/images/products/hair-dryer-1.jpg', '/images/products/hair-dryer-2.jpg', '/images/products/hair-dryer-3.jpg'],
    reviews: [
      { name: 'Maria G.', rating: 5, date: '2026-05-15', comment: 'Best hair dryer I have ever used. Dries my hair in half the time!' },
      { name: 'Laura C.', rating: 4, date: '2026-05-10', comment: 'Great product, lightweight and powerful. Highly recommend.' },
      { name: 'Ana S.', rating: 5, date: '2026-05-05', comment: 'Worth every penny. Professional quality for home use.' }
    ],
    rating: 4.8,
    reviews_count: 127
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💇‍♀️</div>
                <div className="text-gray-600">{product.name}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75">
                <div className="w-full h-full bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-500">{product.rating} ({product.reviews_count} reviews)</span>
            </div>
          </div>

          <div className="text-4xl font-bold text-rose-600">${product.price}</div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {product.specifications.map((spec, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">{spec.label}</div>
                  <div className="font-semibold">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 bg-rose-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-rose-600 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 border-2 border-rose-500 text-rose-500 py-3 px-6 rounded-lg font-semibold hover:bg-rose-50 transition-colors">
              Buy Now
            </button>
          </div>

          {/* Reviews */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {product.reviews.map((review, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{review.date}</p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
