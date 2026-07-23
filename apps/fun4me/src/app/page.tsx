import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrustBadges } from '@/components/store/trust-badges';
import { Newsletter } from '@/components/store/newsletter';
import { ProductCard } from '@/components/store/product-card';
import { HERO_IMAGE } from '@/lib/images';
import {
  getCategories,
  getKinks,
  getFeaturedProducts,
  getWhatsAppLink,
  PRODUCT_IMAGES_MAP,
} from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fun4Me Store | Tienda Intima en Paraguay',
  description:
    'Tu tienda online de productos intimos y de bienestar en Asuncion, Paraguay. Envio discreto a todo el pais. Vibradores, lubricantes, lenceria y mas.',
  openGraph: {
    title: 'Fun4Me Store | Tienda Intima en Paraguay',
    description:
      'Productos intimos con envio discreto en todo Paraguay. Explora vibradores, lubricantes, lenceria y mas.',
    url: 'https://fun4me.paragu-ai.com',
  },
};

export default async function HomePage() {
  const categories = getCategories();
  const kinks = getKinks();
  const featured = getFeaturedProducts();
  const whatsappLink = getWhatsAppLink('¡Hola! Me interesa saber más sobre Fun4Me Store.');

  return (
    <div>
      {/* Hero Section with animated gradient */}
      <section className="relative overflow-hidden hero-gradient bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 py-20 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Fun4Me Store"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tu espacio seguro para explorar
          </h1>
          <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl drop-shadow-md" style={{ animationDelay: '0.2s' }}>
            Productos de bienestar íntimo con envío discreto en todo Paraguay
          </p>
          <div className="animate-fade-in-up mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '0.4s' }}>
            <Link href="/tienda">
              <Button size="lg" className="btn-glow bg-white text-rose-600 hover:bg-white/90">
                Explorar Tienda
              </Button>
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="btn-outline-glow border-white/30 text-white hover:bg-white/10">
                Consultar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categorias" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
            Explorá por Categoría
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Encontrá exactamente lo que buscás
          </p>
          <div className="stagger-grid grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((cat) => {
              const gradientMap: Record<string, string> = {
                vibradores: 'from-pink-100 to-rose-100',
                lenceria: 'from-purple-100 to-violet-100',
                bdsm: 'from-gray-200 to-gray-300',
                lubricantes: 'from-blue-100 to-cyan-100',
                'juguetes-anales': 'from-emerald-100 to-teal-100',
                sets: 'from-amber-100 to-orange-100',
              };
              const bgGrad = gradientMap[cat.id] || 'from-rose-100 to-purple-100';
              const emojiMap: Record<string, string> = {
                vibradores: '✨',
                lenceria: '💜',
                bdsm: '⛓️',
                lubricantes: '💧',
                'juguetes-anales': '🔮',
                sets: '🎁',
              };
              return (
                <Link key={cat.id} href={`/categoria/${cat.id}`}>
                  <Card className="card-hover group cursor-pointer overflow-hidden rounded-2xl">
                    <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${bgGrad}`}>
                      <div className="flex h-full w-full items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-125">
                        {emojiMap[cat.id] || '✦'}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-center text-base font-bold drop-shadow-sm">{cat.name}</h3>
                        <p className="mt-1 line-clamp-2 text-center text-xs text-white/90 drop-shadow-sm">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kink Section */}
      {kinks.length > 0 && (
        <section id="kinks" className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
              Explora por Kink
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              Descubrí productos según tus fantasías
            </p>
            <div className="stagger-grid grid grid-cols-2 gap-4 sm:grid-cols-3">
              {kinks.map((kink) => (
                <Link key={kink.id} href={`/kink/${kink.id}`}>
                  <Card className="card-hover group cursor-pointer overflow-hidden rounded-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-orange-100 to-rose-100">
                      <div className="flex h-full w-full items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-125">
                        {kink.icon}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-center text-base font-bold drop-shadow-sm">{kink.name}</h3>
                        {kink.description && (
                          <p className="mt-1 line-clamp-2 text-center text-xs text-white/90 drop-shadow-sm">
                            {kink.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bestsellers */}
      <section id="ofertas" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
            Los Mas Vendidos
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Los favoritos de nuestros clientes
          </p>
          <div className="stagger-grid grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard
                key={product.slug}
                id={product.slug}
                slug={product.slug}
                name={product.name}
                price={product.price}
                image={PRODUCT_IMAGES_MAP[product.slug] || product.image || ''}
                category={product.category}
                featured={product.featured}
                new={product.new}
                rating={product.rating}
              />
            ))}
          </div>
          {featured.length === 0 && (
            <p className="text-center text-muted-foreground">Productos destacados próximamente</p>
          )}
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
