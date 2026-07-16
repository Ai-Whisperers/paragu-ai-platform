"use client";

import { useMemo } from "react";

interface Props {
  content: string;
}

/**
 * Minimal, safe markdown renderer for blog posts.
 * - Headings (h1/h2/h3 with auto-id)
 * - Paragraphs
 * - Bold **text**, italic *text*, inline code `text`
 * - Links [text](url)
 * - Unordered lists (- or *)
 * - Ordered lists (1. 2.)
 * - Blockquotes (> ...)
 * - Horizontal rules (---)
 * - Tables (basic)
 * - Code blocks (```...```)
 *
 * Escapes HTML in body content to prevent XSS. Authored markdown only — no user input.
 */
export function BlogPostContent({ content }: Props) {
  const blocks = useMemo(() => parseBlocks(content), [content]);

  return (
    <div className="prose-gothic space-y-5 text-[var(--color-foreground)]/90">
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}

interface HeadingBlock { type: "heading"; level: 1 | 2 | 3; text: string; id: string }
interface ParagraphBlock { type: "paragraph"; text: string }
interface ListBlock { type: "ul" | "ol"; items: string[] }
interface QuoteBlock { type: "quote"; text: string }
interface CodeBlock { type: "code"; lang: string; text: string }
interface HrBlock { type: "hr" }
interface TableBlock { type: "table"; headers: string[]; rows: string[][] }

type Block = HeadingBlock | ParagraphBlock | ListBlock | QuoteBlock | CodeBlock | HrBlock | TableBlock;

function parseBlocks(md: string): Block[] {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const isListItem = (l: string) => /^\s*[-*]\s+/.test(l);
  const isOrderedItem = (l: string) => /^\s*\d+\.\s+/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing
      blocks.push({ type: "code", lang, text: buf.join("\n") });
      continue;
    }

    // Heading
    const h = /^(#{1,3})\s+(.+)$/.exec(line);
    if (h) {
      const level = h[1].length as 1 | 2 | 3;
      const text = h[2].trim();
      blocks.push({
        type: "heading",
        level,
        text,
        id: slugifyHeading(text),
      });
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Table (simple | a | b | c |)
    if (line.trim().startsWith("|") && i + 1 < lines.length && /^\s*\|[\s\-:|]+\|\s*$/.test(lines[i + 1])) {
      const headers = line.trim().split("|").map((c) => c.trim()).filter(Boolean);
      i += 2; // skip separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim().split("|").map((c) => c.trim()).filter(Boolean));
        i++;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    // Unordered list
    if (isListItem(line)) {
      const items: string[] = [];
      while (i < lines.length && isListItem(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list
    if (isOrderedItem(line)) {
      const items: string[] = [];
      while (i < lines.length && isOrderedItem(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", text: buf.join(" ") });
      continue;
    }

    // Paragraph (collect until empty / list / heading)
    const buf: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !isListItem(lines[i]) &&
      !isOrderedItem(lines[i]) &&
      !lines[i].startsWith(">") &&
      !lines[i].startsWith("```")
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ type: "paragraph", text: buf.join(" ") });
  }

  return blocks;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderInline(line: string): string {
  let s = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  // Bold
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Italic
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  // Inline code
  s = s.replace(
    /`([^`]+)`/g,
    '<code class="px-1 py-0.5 bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-gold)] text-[0.92em]">$1</code>'
  );
  // Links
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-[var(--color-gold)] underline hover:text-[var(--color-foreground)]" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return s;
}

function renderBlock(b: Block, i: number): React.ReactNode {
  switch (b.type) {
    case "heading": {
      const cls =
        b.level === 1
          ? "text-[1.8rem] mt-10 mb-3"
          : b.level === 2
          ? "text-[1.4rem] mt-8 mb-3 border-b border-[var(--color-primary-light)]/30 pb-2"
          : "text-[1.15rem] mt-6 mb-2";
      const inner = renderInline(b.text);
      if (b.level === 1) return <h1 key={i} id={b.id} className={cls} dangerouslySetInnerHTML={{ __html: inner }} />;
      if (b.level === 2) return <h2 key={i} id={b.id} className={cls} dangerouslySetInnerHTML={{ __html: inner }} />;
      return <h3 key={i} id={b.id} className={cls} dangerouslySetInnerHTML={{ __html: inner }} />;
    }
    case "paragraph":
      return (
        <p
          key={i}
          className="text-[1rem] md:text-[1.05rem] leading-[1.7] text-[var(--color-foreground)]/85"
          dangerouslySetInnerHTML={{ __html: renderInline(b.text) }}
        />
      );
    case "ul":
      return (
        <ul key={i} className="list-none space-y-1.5 pl-0">
          {b.items.map((it, j) => (
            <li
              key={j}
              className="flex items-start gap-2 text-[0.98rem] leading-[1.65] text-[var(--color-foreground)]/85"
              dangerouslySetInnerHTML={{
                __html: `<span class="text-[var(--color-gold)] shrink-0 mt-0.5">✦</span><span>${renderInline(it)}</span>`,
              }}
            />
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="list-decimal pl-6 space-y-1.5">
          {b.items.map((it, j) => (
            <li
              key={j}
              className="text-[0.98rem] leading-[1.65] text-[var(--color-foreground)]/85"
              dangerouslySetInnerHTML={{ __html: renderInline(it) }}
            />
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="border-l-2 border-[var(--color-gold)] pl-4 py-1 italic text-[var(--color-muted-foreground)]"
          dangerouslySetInnerHTML={{ __html: renderInline(b.text) }}
        />
      );
    case "code":
      return (
        <pre
          key={i}
          className="bg-[var(--color-card)] border border-[var(--color-border)] p-4 text-[0.85rem] overflow-x-auto text-[var(--color-foreground)]/90"
        >
          <code>{b.text}</code>
        </pre>
      );
    case "hr":
      return <hr key={i} className="border-[var(--color-border)] my-6" />;
    case "table":
      return (
        <div key={i} className="overflow-x-auto border border-[var(--color-border)]">
          <table className="w-full text-[0.9rem]">
            <thead className="bg-[var(--color-primary)]/20">
              <tr>
                {b.headers.map((h, j) => (
                  <th
                    key={j}
                    className="text-left p-2 font-[var(--font-display)] uppercase tracking-[0.12em] text-[0.78rem] text-[var(--color-primary-light)] border-b border-[var(--color-border)]"
                    dangerouslySetInnerHTML={{ __html: renderInline(h) }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, r) => (
                <tr key={r} className="border-b border-[var(--color-border)] last:border-b-0">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className="p-2 text-[var(--color-foreground)]/85"
                      dangerouslySetInnerHTML={{ __html: renderInline(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}