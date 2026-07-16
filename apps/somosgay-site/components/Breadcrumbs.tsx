import Link from "next/link";
import { Fragment } from "react";

export interface Crumb {
  label: string;
  href?: string; // last crumb has no href (current page)
}

export function Breadcrumbs({
  items,
  className = "",
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-text-muted ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5" vocab="https://schema.org/" typeof="BreadcrumbList">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={`${item.label}-${i}`}
              className="flex items-center gap-1.5"
              property="itemListElement"
              typeof="ListItem"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--color-primary)] transition-colors"
                  property="item"
                >
                  <span property="name">{item.label}</span>
                </Link>
              ) : (
                <span property="name" aria-current={isLast ? "page" : undefined} className={isLast ? "text-text font-medium" : ""}>
                  {item.label}
                </span>
              )}
              <meta property="position" content={String(i + 1)} />
              {!isLast && (
                <span aria-hidden="true" className="text-text-muted/60">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Build a BreadcrumbList JSON-LD object ready to embed in a page.
 * Use as: <script type="application/ld+json" dangerouslySetInnerHTML={...breadcrumbJsonLd(items)} />
 */
export function breadcrumbJsonLd(items: Crumb[], baseUrl: string) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  });
}