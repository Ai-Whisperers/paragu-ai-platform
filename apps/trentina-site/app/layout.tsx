import CookieConsent from "@/components/CookieConsent";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";
import content from "@/content/es.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "700"],
  display: "swap",
});

const siteData = content.site;

export const metadata: Metadata = {
  title: {
    template: "%s | Cerveza Trentina",
    default: "Cerveza Trentina — Cerveza artesanal paraguaya | Santa Rita, Alto Paraná",
  },
  description:
    "Descubrí Cerveza Trentina. Cerveza artesanal paraguaya elaborada en Santa Rita por el Maestro Cervecero Alexsandro Giordani. Pilsen, APA, IPA, Metatron IPL y Dunkel Cacao. Chopp tirado, packs y delivery.",
  keywords: [
    "cerveza artesanal Paraguay",
    "Trentina",
    "cerveza paraguaya",
    "chopp",
    "IPA Paraguay",
    "cervecería Santa Rita",
    "cerveza artesanal Santa Rita",
    "Alto Paraná cerveza",
    "Pilsen artesanal",
    "cerveza APA",
    "Metatron IPL",
    "Dunkel Cacao",
  ],
  verification: {
    google: "your-code-here",
  },
  openGraph: {
    title: "Cerveza Trentina — Cerveza artesanal paraguaya",
    description:
      "Descubrí Cerveza Trentina. Cerveza artesanal paraguaya: Pilsen, APA, IPA, Metatron IPL, Dunkel Cacao. Chopp tirado, packs y delivery a toda la zona.",
    url: "https://trentina.paragu-ai.com",
    siteName: siteData.name,
    locale: "es_PY",
    type: "website",
    images: [
      {
        url: `${siteData.url}${siteData.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteData.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cerveza Trentina",
    description:
      "Descubrí Cerveza Trentina. Cerveza artesanal paraguaya: Pilsen, APA, IPA, Metatron IPL y Dunkel Cacao.",
    images: [`${siteData.url}${siteData.ogImage}`],
  },
  alternates: {
    canonical: "https://trentina.paragu-ai.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Brewery",
  name: siteData.name,
  description: siteData.description,
  url: siteData.url,
  telephone: siteData.phone,
  email: siteData.email,
  founder: {
    "@type": "Person",
    name: siteData.brewmaster,
    description: siteData.brewmasterTitle,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alicceo Luiggi Giordani, casi calle Trento",
    addressLocality: "Santa Rita",
    addressRegion: "Alto Paraná",
    addressCountry: "PY",
  },
  servesCuisine: "Beer",
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    bestRating: "5",
    ratingCount: "127",
  },
  image: `${siteData.url}${siteData.ogImage}`,
  sameAs: [siteData.instagram, siteData.facebook],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "17:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "18:00",
      closes: "22:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background flex flex-col">
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
