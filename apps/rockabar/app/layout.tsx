import CookieConsent from "@/components/CookieConsent"
import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";
import content from "@/content/es.json";
import { Analytics, TrackCtas } from "../components/analytics"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const siteData = content.site;

export const metadata: Metadata = {
  title: "Rocka Bar — Hamburguesas, pizzas y tragos con onda rock en Capiatá",
  description: "Rocka Bar en Capiatá: hamburguesas 90gr a la parrilla, pizzas de molde, cervezas y tragos. ⭐ 5.0 en Google. Martes a sábado desde las 19:00.",
  keywords: [
    "Rocka Bar",
    "bar Capiatá",
    "hamburguesas Capiatá",
    "pizzas Capiatá",
    "tragos Capiatá",
    "bar con rock Paraguay",
    "cerveza Capiatá",
    "donde comer Capiatá",
  ],
  verification: {
    google: "your-code-here",
  },
  openGraph: {
    title: "Rocka Bar — Rock, Burgers & Tragos",
    description: "Hamburguesas, pizzas y tragos con onda rock en Capiatá. Martes a sábado desde las 19:00.",
    url: "https://rockabar.paragu-ai.com",
    siteName: "Rocka Bar",
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rocka Bar — Rock, Burgers & Tragos",
    description: "Hamburguesas, pizzas y tragos con onda rock en Capiatá.",
  },
  alternates: { canonical: "https://rockabar.paragu-ai.com", languages: { "es": "https://rockabar.paragu-ai.com/" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BarOrPub",
      name: siteData.name,
      description: siteData.description,
      url: siteData.url,
      telephone: siteData.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Roque González de Santacruz",
        addressLocality: "Capiatá",
        postalCode: "110242",
        addressCountry: "PY",
      },
      geo: { "@type": "GeoCoordinates", latitude: -25.366936, longitude: -57.476783 },
      servesCuisine: ["Burgers", "Pizza", "Bar food"],
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: siteData.rating,
        bestRating: "5",
        ratingCount: siteData.reviewCount,
      },
      image: `${siteData.url}${siteData.ogImage}`,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
          opens: "19:00",
          closes: "00:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Friday",
          opens: "19:00",
          closes: "02:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "19:30",
          closes: "02:00",
        },
      ],
      hasMenu: {
        "@type": "Menu",
        url: `${siteData.url}/carta`,
      },
      acceptsReservations: "True",
    },
    {
      "@type": "LocalBusiness",
      name: siteData.name,
      description: siteData.description,
      url: siteData.url,
      telephone: siteData.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Roque González de Santacruz",
        addressLocality: "Capiatá",
        postalCode: "110242",
        addressCountry: "PY",
      },
      image: `${siteData.url}${siteData.ogImage}`,
      priceRange: "$$",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${bebas.variable}`}>
      <head>
        <meta property="og:image" content="https://rockabar.paragu-ai.com/og/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://rockabar.paragu-ai.com" />
        <meta property="og:site_name" content="Rocka Bar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://rockabar.paragu-ai.com/og/og-image.png" />
        <meta name="robots" content="index, follow, max-image-preview:large" />   </head>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <TrackCtas />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
              <CookieConsent />
      </body>
    </html>
  );
}
