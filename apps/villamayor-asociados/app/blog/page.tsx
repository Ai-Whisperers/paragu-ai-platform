import content from "@/content/es.json"
import Link from "next/link"

export default function Blog() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #1B2A4A, #0F1A30)", color: "white", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <span style={{ color: "#C9A96E", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Blog</span>
          <h1 className="serif" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, margin: "0.75rem 0 1rem" }}>
            {content.blog.title}
          </h1>
          <p style={{ fontSize: "1.0625rem", opacity: 0.85 }}>{content.blog.subtitle}</p>
        </div>
      </section>

      <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
            {content.blog.posts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", backgroundColor: "#F8F6F2", borderRadius: "12px", padding: "1.75rem", border: "1px solid #E8E3DA", display: "block" }}
                className="hover-lift">
                <span style={{ display: "inline-block", backgroundColor: "rgba(201,169,110,0.15)", color: "#8B7355", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.6875rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                  {post.category}
                </span>
                <h2 style={{ fontWeight: 700, fontSize: "1.0625rem", color: "#1B2A4A", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  {post.excerpt}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#9CA3AF" }}>
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
