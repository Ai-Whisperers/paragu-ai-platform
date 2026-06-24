/**
 * Schema.org JSON-LD helpers for Next.js
 * All functions return plain objects to be rendered via <script type="application/ld+json">
 *
 * Usage:
 *   import { productSchema, breadcrumbSchema, organizationSchema } from "@ai-whisperers/seo"
 */
export interface SchemaOrgBase {
    "@context": "https://schema.org";
    "@type": string;
}
export interface OrganizationSchemaInput {
    name: string;
    url: string;
    logo?: string;
    description?: string;
    address?: {
        streetAddress?: string;
        addressLocality?: string;
        addressRegion?: string;
        postalCode?: string;
        addressCountry?: string;
    };
    contactPoint?: {
        telephone?: string;
        email?: string;
        contactType?: string;
    };
    sameAs?: string[];
}
export declare function organizationSchema(data: OrganizationSchemaInput): {
    sameAs?: string[] | undefined;
    contactPoint?: {
        telephone?: string;
        email?: string;
        contactType?: string;
        "@type": string;
    }[] | undefined;
    address?: {
        streetAddress?: string;
        addressLocality?: string;
        addressRegion?: string;
        postalCode?: string;
        addressCountry?: string;
        "@type": string;
    } | undefined;
    description?: string | undefined;
    logo?: string | undefined;
    "@context": string;
    "@type": string;
    name: string;
    url: string;
};
export declare function professionalServiceSchema(data: {
    name: string;
    description: string;
    url: string;
    serviceType?: string;
    providerName: string;
    providerUrl: string;
    areaServed?: string;
    image?: string;
}): {
    image?: string | undefined;
    areaServed?: string | undefined;
    serviceType?: string | undefined;
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
    provider: {
        "@type": string;
        name: string;
        url: string;
    };
};
export interface ProductSchemaInput {
    name: string;
    description: string;
    image: string | string[];
    sku?: string;
    brand: string;
    price: number;
    currency: string;
    availability?: "InStock" | "OutOfStock" | "PreOrder";
    url?: string;
    category?: string;
    review?: {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number;
    };
}
export declare function productSchema(data: ProductSchemaInput): {
    aggregateRating?: {
        "@type": string;
        ratingValue: number;
        reviewCount: number;
        bestRating: number;
    } | undefined;
    category?: string | undefined;
    brand: {
        "@type": string;
        name: string;
    };
    offers: {
        url?: string | undefined;
        availability?: string | undefined;
        "@type": string;
        price: number;
        priceCurrency: string;
    };
    sku?: string | undefined;
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    image: string[];
};
export declare function breadcrumbSchema(items: {
    name: string;
    item: string;
}[]): {
    "@context": string;
    "@type": string;
    itemListElement: {
        "@type": string;
        position: number;
        name: string;
        item: string;
    }[];
};
export declare function faqSchema(questions: {
    question: string;
    answer: string;
}[]): {
    "@context": string;
    "@type": string;
    mainEntity: {
        "@type": string;
        name: string;
        acceptedAnswer: {
            "@type": string;
            text: string;
        };
    }[];
};
export interface ArticleSchemaInput {
    headline: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    publisherName: string;
    publisherLogo?: string;
}
export declare function articleSchema(data: ArticleSchemaInput): {
    publisher: {
        logo?: {
            "@type": string;
            url: string;
        } | undefined;
        "@type": string;
        name: string;
    };
    image?: string | undefined;
    dateModified?: string | undefined;
    "@context": string;
    "@type": string;
    headline: string;
    description: string;
    author: {
        "@type": string;
        name: string;
    };
    datePublished: string;
};
export declare function localBusinessSchema(data: {
    name: string;
    description: string;
    url: string;
    telephone: string;
    address: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    openingHours?: {
        day: string;
        hours: string;
    }[];
    image?: string;
    priceRange?: string;
}): {
    openingHoursSpecification?: {
        "@type": string;
        dayOfWeek: string;
        opens: string;
        closes: string;
    }[] | undefined;
    priceRange?: string | undefined;
    image?: string | undefined;
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
    telephone: string;
    address: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
        "@type": string;
    };
};
export declare function websiteSchema(data: {
    name: string;
    url: string;
    description?: string;
    searchUrl?: string;
}): {
    potentialAction?: {
        "@type": string;
        target: {
            "@type": string;
            urlTemplate: string;
        };
        "query-input": string;
    } | undefined;
    description?: string | undefined;
    "@context": string;
    "@type": string;
    name: string;
    url: string;
};
/**
 * Render JSON-LD as a React-compatible script tag HTML string
 */
export declare function renderJsonLd(data: Record<string, any>): string;
//# sourceMappingURL=schemas.d.ts.map