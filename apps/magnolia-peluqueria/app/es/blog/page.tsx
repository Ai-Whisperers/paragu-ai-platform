import { Metadata } from "next"
import { getAllPosts, calculateReadingTime } from "@/lib/blog"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BookOpen, Clock, Calendar } from "lucide-react"

type Lang = "es" | "en"

export async function generateMetadata({ params }: { params: { lang: Lang } }) {
  const posts = getAllPosts(params.lang)
  return {
    title: params.lang === "en" ? "Blog | Magnolia Hair Salon" : "Blog | Magnolia Peluquería",
    description: params.lang === "en"
      ? "Hair care tips, trends, and professional advice from Magnolia."
      : "Tips de cuidado capilar, tendencias y consejos profesionales de Magnolia.",
    openGraph: { images: [posts[0]?.image ?? ""] },
  } as Metadata
}

export default function BlogPage({ params }: { params: { lang: Lang } }) {
  const posts = getAllPosts(params.lang)
  const [featured, ...rest] = posts
  const labels = params.lang === "en"
    ? { title: "Blog", subtitle: "Hair tips, trends & professional advice", read: "Read", time: "min" }
    : { title: "Blog", subtitle: "Tips de cabello, tendencias y consejos profesionales", read: "Leer", time: "min" }

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-3">
            <BookOpen className="w-4 h-4" /> {labels.title}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">{labels.title}</h1>
          <p className="text-white/60 max-w-md mx-auto">{labels.subtitle}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured post */}
        {featured && (
          <ScrollReveal direction="up">
            <a href={`/${params.lang}/blog/${featured.slug}`} className="block bg-card rounded-2xl border border-border overflow-hidden mb-10 hover:shadow-md transition-shadow group">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 w-fit">{featured.category}</span>
                  <h2 className="font-heading text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{featured.title}</h2>
                  <p className="text-foreground-light mb-4 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-foreground-muted">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{calculateReadingTime(featured.content)} {labels.time}</span>
                  </div>
                </div>
              </div>
            </a>
          </ScrollReveal>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 60} direction="up">
              <a href={`/${params.lang}/blog/${post.slug}`} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <div className="aspect-video">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 w-fit">{post.category}</span>
                  <h3 className="font-heading text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors leading-snug">{post.title}</h3>
                  <p className="text-sm text-foreground-light line-clamp-2 mb-3 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-foreground-muted">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                      <span>·</span>
                      <Clock className="w-3 h-3" />
                      <span>{calculateReadingTime(post.content)} {labels.time}</span>
                    </div>
                    <span className="text-xs text-secondary font-semibold">{labels.read} →</span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  )
}
