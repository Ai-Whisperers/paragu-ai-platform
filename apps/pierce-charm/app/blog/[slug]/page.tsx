import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChainVertical, Skull, CrossInverted, CrescentMoon, DividerOrnament } from "@/components/ornaments";
import { getPost, listPosts } from "@/lib/blog";
import { BlogPostContent } from "./BlogPostContent";
import content from "@/content/es.json";
import type { SiteContent } from "@/lib/content-types";

const c = content as SiteContent;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export async function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "No encontrado" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // JSON-LD Article schema for SEO
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "Pierce Charm",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="pt-24 md:pt-32 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="hidden lg:block chain-side chain-side-left">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>
      <div className="hidden lg:block chain-side chain-side-right">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>

      <article className="max-w-3xl mx-auto px-4 md:px-6 pb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] font-[var(--font-display)] mb-6"
        >
          ← Blog
        </Link>
        <header className="mb-8">
          <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-primary-light)] font-[var(--font-display)] mb-3">
            <CrescentMoon size={12} className="text-[var(--color-gold)]" />
            {post.date && (
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("es-PY", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            )}
            <span className="text-[var(--color-muted-foreground)]">· {post.readingTime}</span>
            <span className="text-[var(--color-muted-foreground)]">· {post.author}</span>
          </div>
          <h1 className="mb-3 text-balance">{post.title}</h1>
          <p className="text-[var(--color-muted-foreground)] text-[1.05rem] leading-relaxed">
            {post.description}
          </p>
        </header>

        <BlogPostContent content={post.content} />
      </article>

      <section className="max-w-3xl mx-auto px-4 md:px-6 pb-16">
        <div className="rock-card p-6 md:p-7 text-center">
          <Skull size={24} className="mx-auto text-[var(--color-gold)] mb-3" />
          <h3 className="text-[1.3rem] mb-2">¿Te quedó alguna duda?</h3>
          <p className="text-[var(--color-muted-foreground)] text-[0.95rem] mb-4">
            Escribinos por WhatsApp. Te respondemos cualquier consulta sobre cuidados, materiales o reservas.
          </p>
          <Link
            href={`https://wa.me/${c.contacto?.whatsapp || "595981324569"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gothic tap"
          >
            <CrossInverted size={14} className="text-[var(--color-gold)]" />
            Preguntar por WhatsApp
          </Link>
        </div>
      </section>

      <DividerOrnament />
    </div>
  );
}