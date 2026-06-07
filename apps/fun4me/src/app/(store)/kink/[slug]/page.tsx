import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/store/product-card';
import { Pagination } from '@/components/store/pagination';
import { getKinkBySlug, getProductsByKink, PRODUCT_IMAGES_MAP } from '@/lib/content';
import type { Metadata } from 'next';

const PAGE_SIZE = 12;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kink = getKinkBySlug(slug);
  if (!kink) return { title: 'Kink no encontrado' };
  return {
    title: kink.name,
    description: kink.description || `Explora productos de ${kink.name} en Fun4Me Store. Envio discreto en todo Paraguay.`,
    openGraph: {
      title: `${kink.name} | Fun4Me Store`,
      description: kink.description || undefined,
      url: `https://fun4me.paragu-ai.com/kink/${slug}`,
    },
  };
}

export default async function KinkPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const kink = getKinkBySlug(slug);
  if (!kink) notFound();

  const allProducts = getProductsByKink(slug);
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
        <span className="text-foreground font-medium">{kink.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 text-6xl">{kink.icon || '✨'}</div>
        <h1 className="text-3xl font-bold sm:text-4xl">{kink.name}</h1>
        {kink.description && (
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{kink.description}</p>
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
          <p className="text-muted-foreground">No hay productos para este kink todavía.</p>
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
              href={`/kink/${slug}${page > 1 ? `?page=${page}` : ''}`}
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
