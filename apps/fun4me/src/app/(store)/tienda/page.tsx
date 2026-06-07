import { ProductCard } from '@/components/store/product-card';
import Link from 'next/link';
import { getProducts, getCategories, PRODUCT_IMAGES_MAP } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tienda',
  description: 'Explora todos nuestros productos con envío discreto en todo Paraguay.',
};

export default async function TiendaPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Tienda</h1>
      <p className="mb-8 text-muted-foreground">Explorá todos nuestros productos</p>

      {/* Category Filter Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/tienda"
          className="rounded-full bg-rose-600 px-4 py-1.5 text-sm font-medium text-white"
        >
          Todos
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.id}`}
            className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted/80"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            id={product.slug}
            slug={product.slug}
            name={product.name}
            price={product.price}
            image={PRODUCT_IMAGES_MAP[product.slug] || product.image || ''}
            category={product.category}
          />
        ))}
      </div>

      {products.length === 0 && (
        <p className="py-20 text-center text-muted-foreground">No hay productos disponibles.</p>
      )}
    </div>
  );
}
