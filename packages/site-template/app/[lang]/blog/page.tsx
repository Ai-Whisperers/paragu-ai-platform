/**
 * ANNOTATION: BlogListing
 *
 * What it is: A blog index page showing all published posts — featured article,
 * grid of remaining posts with images, dates, categories, and reading times.
 *
 * Why your business needs it: Blog content demonstrates expertise, improves SEO
 * rankings, and gives visitors a reason to return. A well-maintained blog positions
 * your business as the authority in your local market.
 *
 * What AI populates from your data:
 *   - Post list from content/{lang}/blog/index.json
 *   - Individual post content from content/{lang}/blog/posts/*.json
 *   - Featured image selection from your uploaded gallery
 *   - SEO title, description, and OpenGraph data
 *
 * Your input: Record a 2-minute voice note about a topic your clients ask about.
 * We transcribe, edit, and publish as a blog post. Or send a link to an article
 * you like and we adapt it to your voice.
 *
 * Plan availability: Profesional
 */

import { Metadata } from "next"
import Image from "next/image"
import { getAllPosts, calculateReadingTime } from "@/lib/api/blog"
import { getSiteName } from "@/lib/config/config"
import { ScrollReveal } from "@/components/shared/scroll-reveal"
import { BookOpen, Clock, Calendar } from "lucide-react"
import esUi from "@/content/es/ui.json"
import enUi from "@/content/en/ui.json"

type Lang = "es" | "en"

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  const posts = await getAllPosts(lang)
  const name = getSiteName()
  return {
    title: `Blog | ${name}`,
    description: `${(lang === "en" ? enUi : esUi).blog.description} ${name}`,
    openGraph: { images: [posts[0]?.image || "/images/og-default.jpg"] },
  } as Metadata
}

export default async function BlogPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  const posts = await getAllPosts(lang)
  const [featured, ...rest] = posts
  const ui = lang === "en" ? enUi : esUi
  const labels = ui.blog

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest mb-3">
            <BookOpen className="w-4 h-4" /> {labels.title}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">{labels.title}</h1>
          <p className="text-white/60 max-w-md mx-auto">{ui.blog.subtitle}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured post */}
        {featured && (
          <ScrollReveal direction="up">
            <a href={`/${lang}/blog/${featured.slug}`} className="block bg-card rounded-2xl border border-border overflow-hidden mb-10 hover:shadow-md transition-shadow group">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto">
                  <Image src={featured.image} alt={featured.title} width={800} height={450} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 w-fit">{featured.category}</span>
                  <h2 className="font-heading text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{featured.title}</h2>
                  <p className="text-foreground-light mb-4 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-foreground-muted">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{calculateReadingTime(featured.content)} {ui.blog.time}</span>
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
              <a href={`/${lang}/blog/${post.slug}`} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <div className="aspect-video">
                  <Image src={post.image} alt={post.title} width={600} height={338} className="w-full h-full object-cover" />
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
                      <span>{calculateReadingTime(post.content)} {ui.blog.time}</span>
                    </div>
                    <span className="text-xs text-secondary font-semibold">{ui.blog.read} →</span>
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
