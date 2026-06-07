import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils/format';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/store/product-card';
import { ProductActions } from './product-actions';
import { ProductTabs } from './product-tabs';
import { PRODUCT_IMAGES_MAP, CATEGORY_IMAGES_MAP, getProductBySlug, getCategoryBySlug, getProductsByCategory } from '@/lib/content';
import type { Metadata } from 'next';

const CATEGORY_GRADIENTS: Record<string, string> = {
  vibradores: 'from-pink-400 to-rose-500',
  dildos: 'from-purple-400 to-purple-600',
  lubricantes: 'from-blue-400 to-cyan-500',
  lenceria: 'from-red-400 to-pink-500',
  'juegos-de-pareja': 'from-amber-400 to-orange-500',
  bdsm: 'from-gray-700 to-gray-900',
  masturbadores: 'from-indigo-400 to-indigo-600',
  accesorios: 'from-teal-400 to-emerald-500',
  default: 'from-rose-400 to-purple-500',
};

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Producto no encontrado' };

  const title = product.name;
  const description = product.description || `Compra ${product.name} en Fun4Me Store. Envio discreto en todo Paraguay.`;
  const imageUrl = PRODUCT_IMAGES_MAP[slug] || product.image || '';

  return {
    title,
    description,
    openGraph: {
      title: `${product.name} | Fun4Me Store`,
      description,
      url: `https://fun4me.paragu-ai.com/producto/${slug}`,
      type: 'website',
      images: imageUrl ? [{ url: `https://fun4me.paragu-ai.com${imageUrl}`, alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Fun4Me Store`,
      description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const related = getProductsByCategory(product.category).filter((p) => p.slug !== slug).slice(0, 4);
  const gradient = CATEGORY_GRADIENTS[product.category] || CATEGORY_GRADIENTS.default;
  const levelLabel = LEVEL_LABELS[product.level] || product.level;
  const image = PRODUCT_IMAGES_MAP[slug] || product.image || '';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link href={`/categoria/${category.id}`} className="hover:text-foreground">
              {category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${gradient}`}>
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl text-white/50">
              {product.name[0]}
            </div>
          )}
          {product.new && (
            <Badge className="absolute left-4 top-4 bg-emerald-500 text-white">Nuevo</Badge>
          )}
          {product.featured && (
            <Badge className="absolute right-4 top-4 bg-amber-500 text-white">Destacado</Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          {category && (
            <Link href={`/categoria/${category.id}`} className="mb-2 text-sm font-medium text-rose-600 hover:underline">
              {category.name}
            </Link>
          )}

          <h1 className="text-3xl font-bold sm:text-4xl">{product.name}</h1>

          <p className="mt-4 text-3xl font-bold text-rose-600">{formatPrice(product.price)}</p>

          {product.features && product.features.length > 0 && (
            <ul className="mt-6 space-y-2">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  {feat}
                </li>
              ))}
            </ul>
          )}

          {/* Specs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {levelLabel && (
              <Badge variant="secondary" className="text-xs">
                {levelLabel}
              </Badge>
            )}
            {product.body_safe && (
              <Badge variant="secondary" className="text-xs">Body Safe</Badge>
            )}
            {product.waterproof && (
              <Badge variant="secondary" className="text-xs">Impermeable</Badge>
            )}
            {product.rechargeable && (
              <Badge variant="secondary" className="text-xs">Recargable</Badge>
            )}
            {product.material && (
              <Badge variant="secondary" className="text-xs">{product.material}</Badge>
            )}
          </div>

          <ProductActions
            product={{
              id: product.slug,
              name: product.name,
              price: product.price,
              stock: product.stock === 'in_stock' ? 5 : 0,
              slug: product.slug,
            }}
          />
        </div>
      </div>

      {/* Description & FAQ Tabs */}
      <div className="mt-12">
        <ProductTabs
            description={product.description}
            specifications={null}
            careInstructions={null}
            material={product.material}
          />
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Productos Relacionados</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((rp) => (
              <ProductCard
                key={rp.slug}
                id={rp.slug}
                slug={rp.slug}
                name={rp.name}
                price={rp.price}
                image={PRODUCT_IMAGES_MAP[rp.slug] || rp.image || ''}
                category={rp.category}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
