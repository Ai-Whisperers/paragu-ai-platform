import type { Metadata } from "next";
import Link from "next/link";
import { ChainVertical, Skull, CrossInverted, CrescentMoon, DividerOrnament } from "@/components/ornaments";
import { listPosts } from "@/lib/blog";
import content from "@/content/es.json";

const c = content as any;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";

export const metadata: Metadata = {
  title: "Blog · Cuidados, materiales y cultura del piercing",
  description: "Guías prácticas sobre cuidados de piercings, materiales seguros (titanio ASTM F136), y cultura alternativa del body piercing en Asunción, Paraguay.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog · Pierce Charm",
    description: "Guías prácticas sobre piercings y materiales seguros en Asunción.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = listPosts();

  return (
    <div className="pt-24 md:pt-32 relative">
      <div className="hidden lg:block chain-side chain-side-left">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>
      <div className="hidden lg:block chain-side chain-side-right">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>

      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-10">
        <div className="text-center max-w-2xl mx-auto">
          <Skull size={32} className="mx-auto text-[var(--color-primary-light)] mb-3" />
          <p className="eyebrow mb-2">𓆩 ☆ 𓆪</p>
          <h1 className="mb-3 text-balance">Blog · Cuidados, materiales y cultura</h1>
          <p className="text-[var(--color-muted-foreground)]">
            Guías prácticas escritas por Luana para que tu piercing cicatrice bien y tu joyería dure años.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 pb-16">
        {posts.length === 0 ? (
          <p className="text-center text-[var(--color-muted-foreground)] py-10">
            Próximamente los primeros artículos. Mientras tanto, te recomendamos el{" "}
            <Link href="/faq" className="text-[var(--color-gold)] underline">
              FAQ
            </Link>{" "}
            o escribirnos por{" "}
            <Link href="/contacto" className="text-[var(--color-gold)] underline">
              WhatsApp
            </Link>.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rock-card p-6 md:p-7 block no-underline text-[var(--color-foreground)] hover:shadow-[0_0_40px_rgba(176,136,56,0.25)] transition-all"
              >
                <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-primary-light)] font-[var(--font-display)] mb-3">
                  <CrescentMoon size={12} className="text-[var(--color-gold)]" />
                  {post.date && <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("es-PY", { day: "numeric", month: "long", year: "numeric" })}</time>}
                  <span className="text-[var(--color-muted-foreground)]">· {post.readingTime}</span>
                </div>
                <h2 className="text-[1.3rem] md:text-[1.5rem] mb-3 text-balance leading-tight">{post.title}</h2>
                <p className="text-[var(--color-muted-foreground)] text-[0.95rem] leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-gold)] font-[var(--font-display)]">
                  <CrossInverted size={10} />
                  Leer artículo
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <DividerOrnament />
    </div>
  );
}