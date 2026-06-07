import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/store/product-card';
import {
  getCategoryBySlug,
  getProductsByCategory,
  CATEGORY_IMAGES_MAP,
  PRODUCT_IMAGES_MAP,
} from '@/lib/content';
import type { Metadata } from 'next';

const PAGE_SIZE = 12;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Categoría no encontrada' };
  return {
    title: category.name,
    description: category.description || `Explora nuestra coleccion de ${category.name} en Fun4Me Store. Envio discreto en todo Paraguay.`,
    openGraph: {
      title: `${category.name} | Fun4Me Store`,
      description: category.description || undefined,
      url: `https://fun4me.paragu-ai.com/categoria/${slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const allProducts = getProductsByCategory(slug);
  const currentPage = Math.max(1, parseInt(sp.page || '1', 10));
  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = allProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        {CATEGORY_IMAGES_MAP[category.id] ? (
          <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl sm:h-64">
            <Image
              src={CATEGORY_IMAGES_MAP[category.id]}
              alt={category.name}
              fill
              className="object-contain p-8"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl font-bold sm:text-4xl">{category.name}</h1>
              {category.description && (
                <p className="mt-2 max-w-xl text-sm text-white/80">{category.description}</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{category.name}</h1>
            {category.description && (
              <p className="mt-2 text-muted-foreground">{category.description}</p>
            )}
          </div>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          {allProducts.length} producto{allProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {paginatedProducts.map((product) => (
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
      ) : (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No hay productos en esta categoría todavía.</p>
          <Link href="/" className="mt-4 inline-block text-rose-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/categoria/${slug}${page > 1 ? `?page=${page}` : ''}`}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                page === safePage
                  ? 'bg-rose-600 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
