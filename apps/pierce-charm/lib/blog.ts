import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  content: string;       // raw markdown
  excerpt: string;       // first ~180 chars
  toc?: { id: string; text: string; level: number }[];
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readingTimeFromText(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function extractToc(markdown: string): BlogPost["toc"] {
  const lines = markdown.split("\n");
  const toc: BlogPost["toc"] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+)$/.exec(line);
    if (m) {
      const level = m[1].length;
      const text = m[2].trim();
      const id = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      toc.push({ id, text, level });
    }
  }
  return toc;
}

export function listPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const excerpt = (data.excerpt || content.replace(/[#*`>]/g, "").trim().slice(0, 180)).slice(0, 180);
      return {
        slug,
        title: data.title || slug,
        description: data.description || excerpt,
        date: data.date || "",
        author: data.author || "Luana López",
        readingTime: data.readingTime || readingTimeFromText(content),
        excerpt,
        toc: extractToc(content),
      };
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const excerpt = (data.excerpt || content.replace(/[#*`>]/g, "").trim().slice(0, 180)).slice(0, 180);
  return {
    slug,
    title: data.title || slug,
    description: data.description || excerpt,
    date: data.date || "",
    author: data.author || "Luana López",
    readingTime: data.readingTime || readingTimeFromText(content),
    content,
    excerpt,
    toc: extractToc(content),
  };
}

/**
 * Very small markdown-to-HTML renderer. Intentionally minimal — we support
 * headings (h2/h3 with auto-ids), bold, italic, links, code, lists, blockquotes,
 * and paragraphs. Anything we don't handle falls back to escaped text.
 *
 * Avoids `dangerouslySetInnerHTML` from user content — all rendering is via
 * a typed React component in BlogPostContent.
 */
export function renderInline(line: string): string {
  // Escape HTML first
  let s = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  // Bold **text**
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Italic *text*
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  // Inline code `text`
  s = s.replace(/`([^`]+)`/g, "<code class=\"px-1 py-0.5 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-gold)] text-[0.92em]\">$1</code>");
  // Links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[var(--color-gold)] underline hover:text-[var(--color-foreground)]" target="_blank" rel="noopener noreferrer">$1</a>');
  return s;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}