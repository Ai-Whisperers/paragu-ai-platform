import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return {
    title: `Blog Post ${id} | Magnolia`,
    description: 'Expert hair care tips and advice',
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="text-rose-600 hover:text-rose-700 mb-8 inline-block">
          ← Back to Blog
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Blog Post #{id}</h1>
        <p className="text-gray-600">Blog post content will be loaded dynamically.</p>

        <div className="mt-12">
          <Link href="/booking" className="inline-block bg-rose-500 text-white px-6 py-3 rounded-lg">
            Book Now
          </Link>
        </div>
      </article>
    </div>
  )
}
