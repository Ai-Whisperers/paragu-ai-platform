import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { content as c, SITE_URL } from "@/lib/content";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { getArticlesSorted } from "@/content/news";

export const metadata: Metadata = {
  title: "Noticias · SOMOSGAY",
  description:
    "Comunicados, campañas, eventos y trabajo de memoria de SOMOSGAY — la organización LGTBI+ líder en Paraguay.",
  alternates: { canonical: `${SITE_URL}/noticias` },
};

const crumbs = [
  { label: "Inicio", href: "/" },
  { label: "Noticias" },
];

// Blog / ItemList JSON-LD — Google Discover + News carousel
function blogItemListLd() {
  const articles = getArticlesSorted();
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/noticias/#blog`,
    name: "Noticias · SOMOSGAY",
    url: `${SITE_URL}/noticias`,
    description:
      "Comunicados, campañas, eventos y trabajo de memoria de SOMOSGAY.",
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${SITE_URL}/noticias/${a.slug}`,
      datePublished: a.date,
      author: { "@type": "Organization", name: a.author, "@id": `${SITE_URL}/#organization` },
      articleSection: a.category,
    })),
  };
}

const CATEGORY_COLOR: Record<string, string> = {
  Campaña: "bg-[var(--color-rainbow-2)] text-black",
  Memoria: "bg-[var(--color-secondary)] text-white",
  Programa: "bg-[var(--color-primary)] text-white",
  Comunicado: "bg-warm text-text",
  Tecnología: "bg-[var(--color-rainbow-4)] text-white",
};

export default function NoticiasPage() {
  const articles = getArticlesSorted();

  return (
    <div>
      <Script
        id="ld-breadcrumb-noticias"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(crumbs, SITE_URL) }}
      />
      <Script
        id="ld-blog-noticias"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogItemListLd()) }}
      />

      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <Breadcrumbs items={crumbs} className="mb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
            {c.noticias.subtitle}
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">
            {c.noticias.title}
          </h1>
          <p className="text-lg text-text-light max-w-3xl">
            Comunicados, campañas, eventos y trabajo de memoria de SOMOSGAY. Cada artículo
            está respaldado por fuentes públicas documentadas en nuestro repositorio de
            contexto.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="space-y-8" reversed={false}>
            {articles.map((a) => (
              <li key={a.slug}>
                <article className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span
                      className={`text-xs uppercase tracking-wider px-2 py-1 rounded font-medium ${CATEGORY_COLOR[a.category] || "bg-warm text-text"}`}
                    >
                      {a.category}
                    </span>
                    <time
                      dateTime={a.date}
                      className="text-xs text-text-muted"
                    >
                      {new Date(a.date).toLocaleDateString("es-PY", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold mb-2 tracking-tight">
                    <Link
                      href={`/noticias/${a.slug}`}
                      className="hover:text-[var(--color-primary)] transition-colors"
                    >
                      {a.title}
                    </Link>
                  </h2>
                  <p className="text-text-light leading-relaxed mb-4">{a.dek}</p>
                  <div className="text-xs text-text-muted mb-4">
                    Por {a.author}
                    {a.authorRole && <> · {a.authorRole}</>}
                  </div>
                  <Link
                    href={`/noticias/${a.slug}`}
                    className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                  >
                    Leer artículo completo →
                  </Link>
                </article>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-sm text-text-muted bg-warm rounded-xl p-6 border border-[var(--color-warm-deep)]">
            <p>
              <strong className="text-text">¿Querés recibir nuestros comunicados?</strong>{" "}
              Por ahora seguinos en Instagram <a href="https://www.instagram.com/somosgayorg/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">@somosgayorg</a>
              {" "}o suscribite a nuestro <a href="/feed.xml" className="text-[var(--color-primary)] underline">RSS feed</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}