/**
 * Schema.org JSON-LD helpers for Next.js
 * All functions return plain objects to be rendered via <script type="application/ld+json">
 *
 * Usage:
 *   import { productSchema, breadcrumbSchema, organizationSchema } from "@ai-whisperers/seo"
 */
export function organizationSchema(data) {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: data.name,
        url: data.url,
        ...(data.logo && { logo: data.logo }),
        ...(data.description && { description: data.description }),
        ...(data.address && { address: { "@type": "PostalAddress", ...data.address } }),
        ...(data.contactPoint && {
            contactPoint: [{ "@type": "ContactPoint", ...data.contactPoint }],
        }),
        ...(data.sameAs && data.sameAs.length && { sameAs: data.sameAs }),
    };
}
// ─── Professional Service ──────────────────────────────────────────────────
export function professionalServiceSchema(data) {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: data.name,
        description: data.description,
        url: data.url,
        provider: {
            "@type": "Organization",
            name: data.providerName,
            url: data.providerUrl,
        },
        ...(data.serviceType && { serviceType: data.serviceType }),
        ...(data.areaServed && { areaServed: data.areaServed }),
        ...(data.image && { image: data.image }),
    };
}
export function productSchema(data) {
    const images = Array.isArray(data.image) ? data.image : [data.image];
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data.name,
        description: data.description,
        image: images,
        ...(data.sku && { sku: data.sku }),
        brand: { "@type": "Brand", name: data.brand },
        offers: {
            "@type": "Offer",
            price: data.price,
            priceCurrency: data.currency,
            ...(data.availability && { availability: `https://schema.org/${data.availability}` }),
            ...(data.url && { url: data.url }),
        },
        ...(data.category && { category: data.category }),
        ...(data.review && {
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: data.review.ratingValue,
                reviewCount: data.review.reviewCount,
                bestRating: data.review.bestRating || 5,
            },
        }),
    };
}
// ─── BreadcrumbList ────────────────────────────────────────────────────────
export function breadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.item,
        })),
    };
}
// ─── FAQPage ───────────────────────────────────────────────────────────────
export function faqSchema(questions) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: q.answer,
            },
        })),
    };
}
export function articleSchema(data) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.headline,
        description: data.description,
        author: { "@type": "Person", name: data.author },
        datePublished: data.datePublished,
        ...(data.dateModified && { dateModified: data.dateModified }),
        ...(data.image && { image: data.image }),
        publisher: {
            "@type": "Organization",
            name: data.publisherName,
            ...(data.publisherLogo && { logo: { "@type": "ImageObject", url: data.publisherLogo } }),
        },
    };
}
// ─── LocalBusiness ─────────────────────────────────────────────────────────
export function localBusinessSchema(data) {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: data.name,
        description: data.description,
        url: data.url,
        telephone: data.telephone,
        address: { "@type": "PostalAddress", ...data.address },
        ...(data.image && { image: data.image }),
        ...(data.priceRange && { priceRange: data.priceRange }),
        ...(data.openingHours && {
            openingHoursSpecification: data.openingHours.map((oh) => ({
                "@type": "OpeningHoursSpecification",
                dayOfWeek: oh.day,
                opens: oh.hours.split("-")[0]?.trim(),
                closes: oh.hours.split("-")[1]?.trim(),
            })),
        }),
    };
}
// ─── WebSite (for site-wide search) ────────────────────────────────────────
export function websiteSchema(data) {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: data.name,
        url: data.url,
        ...(data.description && { description: data.description }),
        ...(data.searchUrl && {
            potentialAction: {
                "@type": "SearchAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate: data.searchUrl,
                },
                "query-input": "required name=search_term_string",
            },
        }),
    };
}
/**
 * Render JSON-LD as a React-compatible script tag HTML string
 */
export function renderJsonLd(data) {
    return JSON.stringify(data, null, process.env.NODE_ENV === "development" ? 2 : undefined);
}
//# sourceMappingURL=schemas.js.map