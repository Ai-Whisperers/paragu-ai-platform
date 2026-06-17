import Link from "next/link";
import { notFound } from "next/navigation";
import { forumThreads, getCategory, getThread } from "@/lib/forum";
import { heroFor } from "@/lib/hero";

export async function generateStaticParams() {
  return forumThreads.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getThread(slug);
  if (!t) return {};
  return { title: `${t.title} — Foro maškaráda`, description: t.body.slice(0, 200) };
}

function md(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="text-gold-400 bg-black/30 px-1 rounded">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold-400 hover:text-white underline">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}

export default async function HiloDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getThread(slug);
  if (!t) notFound();
  const cat = getCategory(t.category);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/foro" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Volver al foro
        </Link>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {cat && (
            <Link
              href={`/foro#${cat.slug}`}
              className="text-xs uppercase tracking-widest text-gold-400 hover:text-white inline-flex items-center gap-1"
            >
              <span>{cat.emoji}</span> {cat.title}
            </Link>
          )}
          {t.pinned && <span className="text-xs px-2 py-0.5 bg-gold-400/20 text-gold-400 rounded-full">📌 Pinned</span>}
          {t.featured && <span className="text-xs px-2 py-0.5 bg-blood-500/20 text-blood-500 rounded-full">★ Destacado</span>}
        </div>

        $1

        <div className="aspect-[21/9] overflow-hidden rounded-xl border border-white/5 mb-8 relative">
          <img
            src={heroFor(t.slug)}
            alt={t.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent pointer-events-none" />
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          <span>por <strong className="text-gray-300">{t.author}</strong></span>
          {t.authorRole === "staff" && <span className="text-gold-400 text-xs">· equipo maškaráda</span>}
          <span>· {t.postedAgo}</span>
          <span>· {t.replies} respuestas</span>
          <span>· {t.views} vistas</span>
        </div>

        <article className="prose-content text-gray-300 leading-relaxed mb-8">
          <div dangerouslySetInnerHTML={{ __html: md(t.body) }} />
        </article>

        {t.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {t.tags.map((tag) => (
              <span key={tag} className="text-xs border border-white/10 text-gray-400 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Replies placeholder — seeded, not real yet */}
        <div className="border-t border-white/10 pt-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            {t.replies} respuestas
          </h2>
          <div className="p-6 border border-white/5 rounded-xl bg-white/[0.02] text-sm text-gray-400">
            <p className="mb-3">
              Los hilos del foro actualmente están sembrados con preguntas y respuestas
              modelo. La plataforma de respuestas en vivo (con cuentas de usuario)
              llega en Phase 5. Por ahora, si querés responder a este hilo, mandá
              tu respuesta al WhatsApp del equipo.
            </p>
            <a
              href={`https://wa.me/595981200255?text=${encodeURIComponent("Quiero responder al hilo: " + t.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest transition-all"
            >
              Responder por WhatsApp
            </a>
          </div>
        </div>

        <style>{`
          .prose-content p { color: #d1d5db; line-height: 1.7; margin-bottom: 1rem; }
          .prose-content strong { color: #fff; font-weight: 600; }
          .prose-content em { color: #c9a84c; }
          .prose-content a { color: #c9a84c; }
          .prose-content a:hover { color: #fff; }
        `}</style>
      </div>
    </div>
  );
}
