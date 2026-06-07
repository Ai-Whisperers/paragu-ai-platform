"use client"
import Link from "next/link"
import content from "@/content/es.json"
import { FaqJsonLd } from "@/components/faq-json-ld"

const c = content as Record<string, any>
const b = {
  posts: ((c.blog || []) as any[]),
  categories: [...new Set(((c.blog || []) as any[]).map((p: any) => p.category).filter(Boolean))],
  title: "Blog", subtitle: "Guías y recursos sobre vidrio para la construcción en Paraguay."
}

export default function BlogIndex() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <FaqJsonLd />
      <h1 className="text-4xl font-bold text-center text-[#1A1A2E] mb-2">{b.title}</h1>
      <p className="text-[#6B7280] text-center mb-10">{b.subtitle}</p>

      <div className="flex gap-2 flex-wrap justify-center mb-10">
        <Link href="/blog" className="px-4 py-2 rounded-lg bg-[#0F62FE] text-white text-sm font-medium">Todas</Link>
        {(b.categories || []).map((cat: string) => {
          const slug = cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          return <Link key={cat} href={`/blog/categoria/${slug}`} className="px-4 py-2 rounded-lg border border-gray-300 text-[#6B7280] text-sm font-medium hover:text-[#1A1A2E] transition-colors">{cat}</Link>
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {b.posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group no-underline">
            <article className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all group-hover:-translate-y-1 group-hover:shadow-md">
              <div className="h-48 bg-[#F8F9FA] overflow-hidden">
                <img src={`/images/blog/${post.slug}.jpg`} alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class=\"flex items-center justify-center h-full\"><span class=\"text-5xl opacity-10\">✦</span></div>' }} />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-3">
                  <span className="bg-[#0F62FE]/10 text-[#0F62FE] font-medium px-2 py-0.5 rounded">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-semibold text-base mb-2 text-[#1A1A2E] group-hover:text-[#0F62FE] line-clamp-2">{post.title}</h3>
                <p className="text-[#6B7280] text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
