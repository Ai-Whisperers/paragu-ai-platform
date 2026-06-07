import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug, getRelatedPosts, calculateReadingTime, getAllPosts } from "@/lib/blog"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Calendar, Clock, ArrowLeft, ExternalLink, CheckCircle2, Crown, Star, MessageCircle } from "lucide-react"
import { CopyLinkButton } from "@/components/copy-link-button"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  }
}

function renderMd(content: string): string {
  let html = content
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^---$/gm, "<hr />")
    .replace(/^--- /gm, "<hr />")
    .replace(/^\* (.+)$/gm, "<li>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")

  // Wrap list items
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")

  // Paragraphs
  const blocks = html.split(/\n{2,}/)
  html = blocks
    .map((block) => {
      block = block.trim()
      if (!block) return ""
      if (/^<(h[123]|ul|li|hr)/.test(block)) return block
      return `<p>${block.replace(/\n/g, "<br />")}</p>`
    })
    .join("\n")

  return html
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, post.category)

  const labels = {
    back: "Volver al blog",
    share: "Compartir",
    related: "Artículos relacionados",
    min: "min lectura",
    loyalty: "Unite a nuestro Programa de Rewards",
    loyaltyDesc: "Ganá recompensas cada vez que vengas",
    copyLink: "Copiar enlace",
  }

  const readingTime = calculateReadingTime(post.content)

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Article header */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <a href="/es/blog" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {labels.back}
          </a>
          <span className="inline-block bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">{post.category}</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-5 text-sm text-white/50">
            <span>{post.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readingTime} {labels.min}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <article className="lg:col-span-3">
            <img src={post.image} alt={post.title} className="w-full aspect-video rounded-2xl object-cover mb-8" />

            {/* Article body */}
            <div
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: renderMd(post.content) }}
            />

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-border">
              <p className="text-sm text-foreground-muted mb-3">{labels.share}</p>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + " — magnolia-peluqueria.paragu-ai.com/es/blog/" + post.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#20BD5A] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> WhatsApp
                </a>
                <CopyLinkButton url={`https://magnolia-peluqueria.paragu-ai.com/es/blog/${post.slug}`} label={labels.copyLink} />
              </div>
            </div>

            {/* JSON-LD */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: post.title,
                  description: post.excerpt,
                  image: post.image,
                  author: { "@type": "Person", name: post.author },
                  publisher: { "@type": "Organization", name: "Magnolia Peluquería" },
                  datePublished: post.date,
                  articleSection: post.category,
                }),
              }}
            />

            {/* ─── Booking CTA ──────────────────────────────── */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-6 md:p-8 text-center">
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">
                  💇 ¿Listo para tu turno?
                </p>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-3">
                  Reservá tu turno en Magnolia
                </h3>
                <p className="text-foreground-light text-sm mb-6 max-w-md mx-auto">
                  Completá el formulario y te confirmamos por WhatsApp en minutos.
                </p>
                <a
                  href="/es/booking"
                  className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-secondary-dark transition-all text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  Reservar Ahora
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Loyalty CTA */}
            <ScrollReveal direction="left">
              <div className="bg-primary rounded-2xl p-6 text-white">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-3">
                  <Crown className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{labels.loyalty}</h3>
                <p className="text-white/60 text-sm mb-4">{labels.loyaltyDesc}</p>
                <div className="space-y-2">
                  {([
                    [CheckCircle2, "Reservaste tu cita"],
                    [CheckCircle2, "Completaste tu visita"],
                    [Crown, "Tercera visita"],
                    [Star, "Premio especial"],
                  ] as const).map(([Icon, label], i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/40">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Related */}
            {related.length > 0 && (
              <ScrollReveal direction="left">
                <div className="bg-card rounded-2xl border border-border p-5">
                  <h3 className="font-heading text-lg font-bold text-primary mb-4">{labels.related}</h3>
                  <div className="space-y-4">
                    {related.map((rp) => (
                      <a key={rp.slug} href={`/es/blog/${rp.slug}`} className="block group">
                        <img src={rp.image} alt={rp.title} className="w-full aspect-video object-cover rounded-lg mb-2" />
                        <p className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors leading-snug">{rp.title}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}