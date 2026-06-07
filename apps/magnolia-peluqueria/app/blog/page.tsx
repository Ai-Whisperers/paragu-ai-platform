import Link from 'next/link'

export const metadata = {
  title: 'Hair Care Blog | Magnolia Peluquería',
  description: 'Expert hair care tips, trends, and advice from our professional stylists',
  openGraph: {
    title: 'Hair Care Blog | Magnolia Peluquería',
    description: 'Expert hair care tips, trends, and advice',
    type: 'website',
  },
}

const blogPosts = [
  {
    id: 1,
    title: '5 Hair Care Secrets for Summer 2026',
    excerpt: 'Protect your hair from UV damage and humidity with these expert tips from our stylists.',
    date: '2026-05-28',
    author: 'Maria Rodriguez',
    image: '/images/blog/summer-care.jpg',
    category: 'Hair Care',
    readTime: '5 min read',
    tags: ['summer', 'hair care', 'tips']
  },
  {
    id: 2,
    title: 'The Complete Guide to Balayage',
    excerpt: 'Everything you need to know about this popular hair coloring technique and why it might be perfect for you.',
    date: '2026-05-25',
    author: 'Ana Martinez',
    image: '/images/blog/balayage-guide.jpg',
    category: 'Coloring',
    readTime: '8 min read',
    tags: ['balayage', 'color', 'technique']
  },
  {
    id: 3,
    title: 'Wedding Hair Trends 2026',
    excerpt: 'Discover the most elegant and romantic hairstyles for your special day.',
    date: '2026-05-22',
    author: 'Laura Caceres',
    image: '/images/blog/wedding-trends.jpg',
    category: 'Styling',
    readTime: '6 min read',
    tags: ['wedding', 'bridal', 'trends']
  },
  {
    id: 4,
    title: 'Keratin Treatments: What You Need to Know',
    excerpt: 'A comprehensive guide to keratin treatments, benefits, and aftercare.',
    date: '2026-05-20',
    author: 'Sofia Gonzalez',
    image: '/images/blog/keratin-treatment.jpg',
    category: 'Treatment',
    readTime: '7 min read',
    tags: ['keratin', 'treatment', 'hair repair']
  },
  {
    id: 5,
    title: 'Choosing the Right Products for Your Hair Type',
    excerpt: 'Expert recommendations for different hair types and how to build your perfect routine.',
    date: '2026-05-18',
    author: 'Carmen Lopez',
    image: '/images/blog/hair-products.jpg',
    category: 'Products',
    readTime: '4 min read',
    tags: ['products', 'hair type', 'routine']
  },
  {
    id: 6,
    title: 'Hair Color Trends for Fall 2026',
    excerpt: 'Get ahead of the curve with these stunning hair color ideas for the upcoming season.',
    date: '2026-05-15',
    author: 'Maria Rodriguez',
    image: '/images/blog/fall-colors.jpg',
    category: 'Coloring',
    readTime: '6 min read',
    tags: ['fall trends', 'color', 'inspiration']
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Hair Care Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Expert tips, trends, and advice from our professional stylists to help you look and feel your best
          </p>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 h-96 bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">✨</div>
                <div className="text-xl font-semibold">Featured Post</div>
              </div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">
                  {blogPosts[0].category}
                </span>
                <span className="text-gray-500 text-sm">{blogPosts[0].readTime}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-rose-600">
                      {blogPosts[0].author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{blogPosts[0].author}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(blogPosts[0].date).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                <Link 
                  href={`/blog/${blogPosts[0].id}`}
                  className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block group">
              <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
                  <div className="text-6xl">📰</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{post.author}</div>
                      <div className="text-gray-500">
                        {new Date(post.date).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-gray-400">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-rose-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
            Get the latest hair care tips, exclusive offers, and styling inspiration delivered to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-rose-500 rounded-lg font-semibold hover:bg-rose-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
