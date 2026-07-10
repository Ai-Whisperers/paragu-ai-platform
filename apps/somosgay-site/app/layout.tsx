import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BottomNav } from "@/components/BottomNav";
import { CookieBanner } from "@/components/CookieBanner";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { QuickExit } from "@/components/QuickExit";
import { content as c, SITE_URL } from "@/lib/content";
// ImageResponse routes get a query-string cache-buster; mirror what Next.js generates.
// We construct the path here without the hash — Next.js rewrites it during render.
// For the static OG path used in JSON-LD, point to the dynamic route.
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// JSON-LD organization entity — single source of truth, referenced by all
// child schemas (WebSite + MedicalClinic) via @id.
const organization = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE_URL}/#organization`,
  name: "SOMOSGAY",
  alternateName: "Asociación Civil SOMOSGAY",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon`,
    width: 32,
    height: 32,
  },
  description: c.metaDescription,
  foundingDate: "2005",
  areaServed: { "@type": "Country", name: "Paraguay" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Independencia Nacional 1032 c/ Manduvirá",
    addressLocality: "Asunción",
    addressRegion: "Capital District",
    postalCode: "1209",
    addressCountry: "PY",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${c.site.whatsappBase}`,
    contactType: "customer service",
    areaServed: "PY",
    availableLanguage: ["Spanish", "Guaraní"],
  },
  sameAs: [
    "https://www.instagram.com/somosgayorg/",
    "https://www.facebook.com/elcentrosomosgay",
    "https://twitter.com/somosgay",
    "https://www.youtube.com/user/SOMOSGAYorg",
    "https://www.tiktok.com/@somosgayorg",
  ],
};

// JSON-LD MedicalClinic entity for Clínica Kunu'u.
const clinic = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}/clinica-kunuu/#clinic`,
  name: "Clínica Kunu'u",
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
  url: `${SITE_URL}/clinica-kunuu`,
  description:
    "Primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay. Testeo gratuito de VIH, PrEP, sífilis y Hepatitis B. Atención psicológica y psiquiátrica.",
  telephone: `+${c.site.whatsappBase}`,
  // GEO coordinates for Independencia Nacional 1032, Asunción (downtown, near Plaza de los Héroes).
  // Enables Google Maps pack for "Clínica LGTBI+ cerca de mí" type queries.
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.2815,
    longitude: -57.6358,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Independencia Nacional 1032 c/ Manduvirá",
    addressLocality: "Asunción",
    addressRegion: "Capital District",
    postalCode: "1209",
    addressCountry: "PY",
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Independencia+Nacional+1032,+Asuncion,+Paraguay",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "13:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
  priceRange: "Gratuito",
  availableService: [
    { "@type": "MedicalProcedure", name: "Testeo de VIH" },
    { "@type": "MedicalProcedure", name: "Profilaxis Pre-Exposición (PrEP)" },
    { "@type": "MedicalProcedure", name: "Tratamiento Antirretroviral (TARV)" },
    { "@type": "MedicalProcedure", name: "Testeo de sífilis" },
    { "@type": "MedicalProcedure", name: "Testeo de Hepatitis B" },
  ],
};

// JSON-LD WebSite entity — enables Google sitelinks search box.
const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "SOMOSGAY",
  alternateName: "SOMOSGAY Paraguay · Tekoporã para todes",
  url: SITE_URL,
  description: c.site.description,
  inLanguage: ["es-PY", "gn"],
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    // query-input: required schema.org syntax for SearchAction
    "query-input": "required name=search_term_string",
  },
};

// JSON-LD descriptors emitted as individual <script type="application/ld+json">
// blocks at the top of <body>. Each block contains exactly ONE entity — this is
// the schema.org best practice; Google has confirmed that top-level arrays inside
// a single block are sometimes rejected by rich-result validators.
//
// Order matters for the Knowledge Graph: publisher org first, then sub-entities
// that reference it via @id, then WebSite with SearchAction at the end.
const jsonLdEntities = [organization, clinic, website] as const;

const fontCss = `:root{--font-display:${playfair.style.fontFamily},Georgia,serif;--font-body:${inter.style.fontFamily},system-ui,sans-serif;}`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#7B2CBF",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SOMOSGAY — Tekoporã para todes",
    template: "%s · SOMOSGAY",
  },
  description: c.metaDescription,
  keywords: c.site.seo.local_keywords,
  authors: [{ name: "SOMOSGAY" }],
  // i18n: Spanish (default) + Guaraní placeholder.
  // Per Next.js 16 docs, languages should be absolute URLs for full hreflang emission.
  alternates: {
    canonical: "/",
    languages: {
      "es-PY": `${SITE_URL}/`,
      // "gn-PY": `${SITE_URL}/gn`,  // coming soon — Guaraní version of site
    },
  },
  openGraph: {
    title: "SOMOSGAY — Tekoporã para todes",
    description: c.metaDescription,
    url: SITE_URL,
    siteName: "SOMOSGAY",
    locale: "es_PY",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SOMOSGAY — Tekoporã para todes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOMOSGAY — Tekoporã para todes",
    description: c.metaDescription,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* JSON-LD: each entity as its own <script> block (schema.org best practice).
            Order: publisher org, then sub-entities that reference it via @id,
            then WebSite with SearchAction. */}
        {jsonLdEntities.map((entity, i) => (
          <script
            key={`ld-${i}-${entity["@type"]}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entity) }}
          />
        ))}
              {/*
          Safety: ESC key → quick exit. Hits two browser behaviors:
          1. Clears focus from the page
          2. Replaces the current tab with a neutral page
          Listener is registered early so it's always available.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'Escape' || e.keyCode === 27) {
                    window.location.replace('https://www.google.com');
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased pb-16 lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-md focus:text-sm"
        >
          Saltar al contenido principal
        </a>

        <QuickExit />

        <style dangerouslySetInnerHTML={{ __html: fontCss }} />

        <Header />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <BottomNav />
        <CookieBanner />
        <FeedbackWidget />
      </body>
    </html>
  );
}