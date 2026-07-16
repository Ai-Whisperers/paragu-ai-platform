import content from "@/content/es.json"
import Link from "next/link"

export default function Blog() {
  return (
    <>
      <section className="text-white py-20 px-6 text-center bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)]">
        <div className="max-w-[700px] mx-auto">
          <span className="text-secondary text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">Blog</span>
          <h1 className="serif font-bold mt-3 mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">
            {content.blog.title}
          </h1>
          <p className="text-[1.0625rem] opacity-85">{content.blog.subtitle}</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-[900px] mx-auto">
          <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
            {content.blog.posts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`}
                className="hover-lift no-underline bg-surface-alt rounded-xl p-7 border border-border block">
                <span className="inline-block bg-secondary/15 text-muted-foreground py-[0.2rem] px-[0.6rem] rounded text-[0.6875rem] font-semibold mb-3">
                  {post.category}
                </span>
                <h2 className="font-bold text-[1.0625rem] text-primary mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-[0.8125rem] text-text-muted leading-[1.6] mb-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
