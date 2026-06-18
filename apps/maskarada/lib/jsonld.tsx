/**
 * Schema.org JSON-LD helpers.
 *
 * Use these in pages like:
 *   const jsonLd = organization();
 *   return (<> ... <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} /> </>);
 *
 * Outputs are minimal, valid, and pass Google's Rich Results test.
 */

const SITE_URL = "https://maskarada.paragu-ai.com";
const SITE_NAME = "Club maškaráda";
const SITE_DESCRIPTION =
  "Comunidad de BDSM, kink y exploración consciente en Asunción, Paraguay. Ediciones, munches, talleres y marketplace de la comunidad.";

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/images/brand/icon_square.jpg`,
    sameAs: [
      "https://www.instagram.com/maskarada.py/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/contacto`,
    },
  };
}

export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: ["es", "en"],
    publisher: { "@id": `${SITE_URL}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/api/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function event(opts: {
  slug: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  image?: string;
  price?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE_URL}/eventos/${opts.slug}#event`,
    name: opts.name,
    description: opts.description,
    startDate: opts.startDate,
    endDate: opts.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: opts.image || `${SITE_URL}/og-image.jpg`,
    location: {
      "@type": "Place",
      name: opts.location || "Asunción, Paraguay",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Asunción",
        addressCountry: "PY",
      },
    },
    organizer: { "@id": `${SITE_URL}#organization` },
    url: opts.url || `${SITE_URL}/eventos/${opts.slug}`,
  };
}

export function article(opts: {
  slug: string;
  title: string;
  description: string;
  image?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  inLanguage?: "es" | "en";
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${opts.path}#article`,
    headline: opts.title,
    description: opts.description,
    image: opts.image || `${SITE_URL}/og-image.jpg`,
    author: {
      "@type": "Organization",
      name: opts.authorName || SITE_NAME,
      "@id": `${SITE_URL}#organization`,
    },
    publisher: { "@id": `${SITE_URL}#organization` },
    datePublished: opts.datePublished || new Date().toISOString(),
    dateModified: opts.dateModified || new Date().toISOString(),
    inLanguage: opts.inLanguage || "es",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${opts.path}`,
    },
  };
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function person(opts: {
  slug: string;
  name: string;
  role: string;
  description: string;
  image?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}${opts.path}#person`,
    name: opts.name,
    description: opts.description,
    jobTitle: opts.role,
    image: opts.image || `${SITE_URL}/og-image.jpg`,
    url: `${SITE_URL}${opts.path}`,
    worksFor: { "@id": `${SITE_URL}#organization` },
  };
}

export function faqPage(pairs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.question,
      acceptedAnswer: { "@type": "Answer", text: p.answer },
    })),
  };
}

/** Renders a JSON-LD <script> tag (use in JSX). */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
