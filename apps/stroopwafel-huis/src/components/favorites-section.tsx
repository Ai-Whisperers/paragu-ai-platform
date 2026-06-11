import Link from 'next/link'

interface FavoriteItem {
  name: string
  price: string
  description: string
}

interface FavoritesProps {
  title: string
  items: FavoriteItem[]
}

export function FavoritesSection({ title, items }: FavoritesProps) {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-card rounded-xl p-6 border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🧇</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-1">{item.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
              <p className="text-primary font-bold text-lg">{item.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/menu" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            Ver menú completo →
          </Link>
        </div>
      </div>
    </section>
  )
}
