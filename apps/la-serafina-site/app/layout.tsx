import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { content as c, SITE_URL } from "@/lib/content";

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

// JSON-LD: NGO organization + EventSeries for the Festival + WebSite
const organization = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE_URL}/#organization`,
  name: "AIREANA",
  alternateName: "Aireana — Grupo por los derechos de las lesbianas",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon` },
  description: c.metaDescription,
  foundingDate: "2003",
  areaServed: { "@type": "Country", name: "Paraguay" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eligio Ayala 907 c/ Tacuary",
    addressLocality: "Asunción",
    postalCode: "001218",
    addressCountry: "PY",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+595-984-123381",
    contactType: "customer service",
    areaServed: "PY",
    availableLanguage: ["Spanish", "Guaraní"],
  },
  sameAs: [
    "https://www.facebook.com/LaSerafinaPy/",
    "https://www.facebook.com/aireana.laserafina",
    "https://x.com/aireanapy",
    "https://www.instagram.com/laserapy/",
    "https://www.instagram.com/aireanalaserafina/",
    "https://www.tiktok.com/@laserapy",
    "https://www.tiktok.com/@aireanapy",
    "https://www.youtube.com/channel/UCpaG8scWVJ6D8qWkq0NvC0Q",
    "https://linktr.ee/laserafinapy",
  ],
};

const festival = {
  "@context": "https://schema.org",
  "@type": "Festival",
  "@id": `${SITE_URL}/festival/#event-series`,
  name: "Festival Internacional de Cine LesBiGayTrans de Asunción",
  alternateName: "Festival LesBiGayTrans Asunción",
  startDate: "2005",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Centro Cultural de España Juan de Salazar",
    address: { "@type": "PostalAddress", addressLocality: "Asunción", addressCountry: "PY" },
  },
  organizer: { "@id": `${SITE_URL}/#organization` },
  description:
    "Festival anual de cine LGBTIQ+ independiente de una semana de duración. Lleva 21 ediciones desde 2005. Más de 700 películas exhibidas y 24.000+ asistentes acumulados. Premios del público y mejor producción paraguaya.",
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: c.siteName,
  alternateName: "La Serafina · Asunción",
  url: SITE_URL,
  description: c.site.description,
  inLanguage: ["es-PY", "gn"],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const jsonLdEntities = [organization, festival, website] as const;

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
    default: "La Serafina — Espacio Cultural Feminista",
    template: "%s · La Serafina",
  },
  description: c.metaDescription,
  keywords: c.site.seo.local_keywords,
  authors: [{ name: "La Serafina — AIREANA" }],
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-PY": `${SITE_URL}/`,
      "gn": `${SITE_URL}/gn`,
    },
  },
  openGraph: {
    title: "La Serafina — La casa más sáfica de Paraguay",
    description: c.metaDescription,
    url: SITE_URL,
    siteName: "La Serafina",
    locale: "es_PY",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "La Serafina — Asunción" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Serafina — La casa más sáfica de Paraguay",
    description: c.metaDescription,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Header is a client component reading pathname via usePathname.
  // Layout stays a server component so JSON-LD and metadata work without hydration.
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {jsonLdEntities.map((entity, i) => (
          <script
            key={`ld-${i}-${entity["@type"]}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entity) }}
          />
        ))}
        <style dangerouslySetInnerHTML={{ __html: fontCss }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-md focus:text-sm"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
