import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BottomNav } from "@/components/BottomNav";
import { CookieBanner } from "@/components/CookieBanner";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SOMOSGAY — Tekoporã para todes",
    template: "%s · SOMOSGAY",
  },
  description: c.metaDescription,
  keywords: c.site.seo.local_keywords,
  authors: [{ name: "SOMOSGAY" }],
  // i18n placeholder: hreflang tags emitted manually in <head>
  // below. When /gn (Guaraní) routes are added, populate the languages map.
  alternates: {
    canonical: "/",
    languages: {
      "es-PY": "/",
    },
  },
  openGraph: {
    title: "SOMOSGAY — Tekoporã para todes",
    description: c.metaDescription,
    locale: "es_PY",
    type: "website",
    url: SITE_URL,
    siteName: "SOMOSGAY",
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
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#7B2CBF",
};

// JSON-LD: NGO + Clinic structured data
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}/#organization`,
    name: "SOMOSGAY",
    alternateName: "Asociación Civil SOMOSGAY",
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    description: c.metaDescription,
    foundingDate: "2005",
    areaServed: { "@type": "Country", name: "Paraguay" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Independencia Nacional 1032 c/ Manduvirá",
      addressLocality: "Asunción",
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
  },
  {
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
    hasMap: "https://www.google.com/maps/search/?api=1&query=Independencia+Nacional+1032,+Asuncion,+Paraguay",
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
  },
  {
    // WebSite schema enables Google sitelinks search box
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
  },
  {
    // Organization is the canonical entity referenced by WebSite.publisher
    // and used by all child schemas (NGO + MedicalClinic already reference it).
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
  },
];

const fontCss = `:root{--font-display:${playfair.style.fontFamily},Georgia,serif;--font-body:${inter.style.fontFamily},system-ui,sans-serif;}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased pb-16 lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-md focus:text-sm"
        >
          Saltar al contenido principal
        </a>

        <style dangerouslySetInnerHTML={{ __html: fontCss }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Header />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <BottomNav />
        <CookieBanner />
      </body>
    </html>
  );
}