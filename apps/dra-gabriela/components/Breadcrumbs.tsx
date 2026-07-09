// BreadcrumbsList JSON-LD — improves SEO + enables breadcrumb display in SERPs.
// Renders as <script type="application/ld+json"> in <head>.

interface BreadcrumbItem {
  name: string
  href: string
}

export function BreadcrumbsJsonLd({
  items,
  baseUrl = "https://ometzdental.com",
}: {
  items: BreadcrumbItem[]
  baseUrl?: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href.startsWith("http") ? item.href : `${baseUrl}${item.href.startsWith("/") ? "" : "/"}${item.href}`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * Visual breadcrumbs component for the page header.
 * Renders as <nav aria-label="Breadcrumb"> with chevron separators.
 */
export function Breadcrumbs({
  items,
  className = "",
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-fg-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-fg-subtle">
                  ›
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="font-medium text-fg">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-accent transition-colors"
                >
                  {item.name}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
