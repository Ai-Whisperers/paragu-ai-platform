import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { NEWS_ARTICLES, getArticleBySlug } from "@/content/news";

export function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) return { title: "Artículo no encontrado" };
  return {
    title: a.title,
    description: a.dek,
    alternates: { canonical: `${SITE_URL}/noticias/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.dek,
      type: "article",
      publishedTime: a.date,
      authors: [a.author],
      siteName: "SOMOSGAY",
      locale: "es_PY",
    },
  };
}

const CATEGORY_COLOR: Record<string, string> = {
  Campaña: "bg-[var(--color-rainbow-2)] text-black",
  Memoria: "bg-[var(--color-secondary)] text-white",
  Programa: "bg-[var(--color-primary)] text-white",
  Comunicado: "bg-warm text-text",
  Tecnología: "bg-[var(--color-rainbow-4)] text-white",
};

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) notFound();

  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Noticias", href: "/noticias" },
    { label: a.title.length > 50 ? a.title.slice(0, 50) + "…" : a.title },
  ];

  // NewsArticle JSON-LD for Google News / Discover / rich results
  const newsArticleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.dek,
    datePublished: a.date,
    dateModified: a.date,
    author: { "@type": "Organization", name: a.author, "@id": `${SITE_URL}/#organization` },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "SOMOSGAY",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/noticias/${a.slug}`,
    },
    articleSection: a.category,
    inLanguage: "es-PY",
    keywords: ["SOMOSGAY", "LGBT+ Paraguay", a.category],
    isAccessibleForFree: true,
  };

  return (
    <div>
      <Script
        id={`ld-breadcrumb-news-${a.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />
      <Script
        id={`ld-news-${a.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleLd) }}
      />

      <article>
        <header className="bg-warm-deep relative">
          <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <Breadcrumbs items={crumbs} className="mb-6" />
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className={`text-xs uppercase tracking-wider px-2 py-1 rounded font-medium ${CATEGORY_COLOR[a.category]}`}
              >
                {a.category}
              </span>
              <time dateTime={a.date} className="text-xs text-text-muted">
                {new Date(a.date).toLocaleDateString("es-PY", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
              {a.heroEyebrow}
            </p>
            <h1 className="font-display text-3xl lg:text-5xl font-bold tracking-tight mb-4">
              {a.title}
            </h1>
            <p className="text-xl text-text-light leading-relaxed mb-3">{a.dek}</p>
            <div className="text-sm text-text-muted">
              Por {a.author}
              {a.authorRole && <> · {a.authorRole}</>}
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {a.keyFacts && a.keyFacts.length > 0 && (
            <div className="bg-warm rounded-xl p-6 border-l-4 border-[var(--color-primary)] mb-10">
              <h2 className="text-xs uppercase tracking-wider text-text-muted font-medium mb-3">
                Datos clave
              </h2>
              <ul className="space-y-2">
                {a.keyFacts.map((kf, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm text-text-light">
                    <span className="text-[var(--color-primary)] mt-1 flex-shrink-0" aria-hidden="true">●</span>
                    <span>{kf}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {a.paragraphs.map((p, i) => (
            <p key={i} className="text-lg text-text-light leading-relaxed mb-6">
              {p}
            </p>
          ))}

          {a.relatedLinks && a.relatedLinks.length > 0 && (
            <div className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 my-10">
              <h2 className="text-xs uppercase tracking-wider text-text-muted font-medium mb-3">
                Recursos relacionados
              </h2>
              <ul className="space-y-2">
                {a.relatedLinks.map((l, i) => (
                  <li key={i}>
                    <Link href={l.href} className="text-[var(--color-primary)] hover:underline">
                      → {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ShareButtons
            title={a.title}
            intro="Si te pareció útil este artículo, compartilo — cada clic ayuda a que más personas conozcan el trabajo de SOMOSGAY."
          />

          <div className="mt-12 pt-8 border-t border-[var(--color-warm-deep)] text-sm text-text-muted">
            <Link href="/noticias" className="text-[var(--color-primary)] hover:underline">
              ← Ver todas las noticias
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}