import Link from "next/link";
import { notFound } from "next/navigation";
import { listGuidesI18n } from "@/lib/guides-i18n";
import { getGuideI18n } from "@/lib/guides-i18n";
import { heroFor } from "@/lib/hero";
import { cookies } from "next/headers";
import { JsonLd, article, breadcrumb } from "@/lib/jsonld";

export async function generateStaticParams() {
  return listGuidesI18n("es").map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale: "es" | "en" = (await cookies()).get("mk_locale")?.value === "en" ? "en" : "es";
  const g = getGuideI18n(slug, locale);
  if (!g) return {};
  return {
    title: `${g.title} — Club maškaráda`,
    description: g.excerpt,
  };
}

function renderMarkdown(md: string): string {
  // Minimal markdown → HTML (no external lib to keep the client bundle small).
  // Supports: ## ### headings, **bold**, *italic*, [text](url), - lists, > blockquotes,
  // blank-line paragraphs, ```fenced code```.
  // Not a full parser — adequate for our hand-authored content.
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;
  let inCode = false;
  let para: string[] = [];
  const flushPara = () => {
    if (para.length) {
      const text = para.join(" ");
      out.push(`<p>${inline(text)}</p>`);
      para = [];
    }
  };
  const inline = (s: string) =>
    s
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, '<code class="text-gold-400 bg-black/30 px-1 rounded">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold-400 hover:text-white underline">$1</a>');
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("```")) {
      flushPara();
      if (inCode) { out.push("</code></pre>"); inCode = false; }
      else { out.push('<pre class="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm my-4"><code>'); inCode = true; }
      continue;
    }
    if (inCode) { out.push(line.replace(/</g, "&lt;") + "\n"); continue; }
    if (line === "") { flushPara(); if (inList) { out.push("</ul>"); inList = false; } continue; }
    if (line.startsWith("## ")) { flushPara(); if (inList) { out.push("</ul>"); inList = false; } out.push(`<h2>${inline(line.slice(3))}</h2>`); continue; }
    if (line.startsWith("### ")) { flushPara(); out.push(`<h3>${inline(line.slice(4))}</h3>`); continue; }
    if (line.startsWith("> ")) { flushPara(); out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`); continue; }
    if (line.startsWith("- ")) {
      flushPara();
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }
    para.push(line);
  }
  flushPara();
  if (inList) out.push("</ul>");
  if (inCode) out.push("</code></pre>");
  return out.join("\n");
}

const CATEGORY_LABEL: Record<string, string> = {
  foundations: "Fundamentos",
  safety: "Seguridad",
  communication: "Comunicación",
  logistics: "Logística",
  glossary: "Glosario",
};

export default async function GuiaDetalle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale: "es" | "en" = (await cookies()).get("mk_locale")?.value === "en" ? "en" : "es";
  const g = getGuideI18n(slug, locale);
  if (!g) notFound();

  const related = g.relatedSlugs
    .map((s) => listGuidesI18n(locale).find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <div className="min-h-screen py-20 px-4">
      <JsonLd
        data={[
          article({
            slug: g.slug,
            title: g.title,
            description: g.excerpt,
            image: `https://maskarada.paragu-ai.com${g.heroImage || heroFor(g.slug)}`,
            inLanguage: locale,
            path: `/aprender/${g.slug}`,
          }),
          breadcrumb([
            { name: "Aprender", path: "/aprender" },
            { name: g.title, path: `/aprender/${g.slug}` },
          ]),
        ]}
      />
      <div className="max-w-3xl mx-auto">
        <Link href="/aprender" className="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 mb-6 inline-block">
          ← Volver a Aprender
        </Link>

        <div className="mb-3">
          <span className="px-3 py-1 border border-gold-400/30 rounded-full text-xs uppercase tracking-widest text-gold-400">
            {CATEGORY_LABEL[g.category] || g.category}
          </span>
          <span className="ml-3 text-xs text-gray-500">{g.readMinutes} min lectura</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{g.title}</h1>
        <p className="text-lg text-gray-400 leading-relaxed mb-6">{g.excerpt}</p>

        <div className="aspect-[21/9] overflow-hidden rounded-xl border border-white/5 mb-8 relative">
          <img
            src={g.heroImage || heroFor(g.slug)}
            alt={g.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent pointer-events-none" />
        </div>

        <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02] text-sm text-gray-400 leading-relaxed mb-8">
          <p>
            <span className="font-semibold text-gold-400">Aviso: </span>
            Contenido investigado por la comunidad. No es consejo profesional. Para orientación
            personal, consultá con un profesional con experiencia en sexualidad alternativa o
            contactá al equipo de maškaráda.
          </p>
        </div>

        <article
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(g.body) }}
        />

        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/5">
            <h2 className="text-lg font-semibold text-white mb-4">Sigue aprendiendo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/aprender/${r.slug}`}
                  className="block border border-white/5 rounded-lg p-3 hover:border-gold-400/30 transition-all bg-white/[0.02]"
                >
                  <p className="text-sm text-white">{r.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{r.readMinutes} min</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .prose-content p { color: #d1d5db; line-height: 1.7; margin-bottom: 1rem; }
        .prose-content h2 { color: #fff; font-size: 1.5rem; font-weight: 700; margin: 2rem 0 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.05); }
        .prose-content h3 { color: #fff; font-size: 1.15rem; font-weight: 600; margin: 1.5rem 0 0.75rem; }
        .prose-content strong { color: #fff; font-weight: 600; }
        .prose-content em { color: #c9a84c; }
        .prose-content ul { margin: 1rem 0; padding-left: 1.5rem; list-style: disc; }
        .prose-content li { color: #d1d5db; line-height: 1.6; margin-bottom: 0.5rem; }
        .prose-content blockquote { border-left: 3px solid #8b0000; padding-left: 1rem; margin: 1rem 0; color: #9ca3af; font-style: italic; }
        .prose-content code { font-family: 'SF Mono', Menlo, monospace; font-size: 0.875em; }
        .prose-content a { color: #c9a84c; }
        .prose-content a:hover { color: #fff; }
      `}</style>
    </div>
  );
}
