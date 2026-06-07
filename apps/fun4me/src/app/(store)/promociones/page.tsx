import Link from 'next/link';
import { getProducts, getWhatsAppLink, PRODUCT_IMAGES_MAP } from '@/lib/content';
import { ProductCard } from '@/components/store/product-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promociones',
  description: 'Ofertas especiales y productos destacados en Fun4Me Store.',
};

export default async function PromocionesPage() {
  const featured = getProducts().filter(p => p.featured);
  const waLink = getWhatsAppLink('¡Hola! Quiero consultar por las promociones');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Promociones</h1>
      <p className="mb-8 text-muted-foreground">Aprovechá nuestras ofertas especiales</p>

      {featured.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map(p => (
            <ProductCard
              key={p.slug}
              id={p.slug}
              slug={p.slug}
              name={p.name}
              price={p.price}
              image={PRODUCT_IMAGES_MAP[p.slug] || p.image || ''}
              category={p.category}
              featured={p.featured}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="mb-4 text-muted-foreground">No hay promociones activas en este momento.</p>
          <Link href="/tienda" className="text-rose-600 hover:underline">Ver todos los productos</Link>
        </div>
      )}

      <div className="mt-12 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 p-8 text-center text-white">
        <h2 className="mb-2 text-2xl font-bold">¿Consultas por promos?</h2>
        <p className="mb-6 text-white/80">Escribinos y te contamos todas las ofertas disponibles</p>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-rose-600 hover:bg-white/90">
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
