import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BottomNav } from "@/components/BottomNav";
import { CookieBanner } from "@/components/CookieBanner";
import content from "@/content/es.json";

const c = content as any;
const SITE_URL = c.site?.url || "https://somosgay.paragu-ai.com";
const OG_IMAGE = `${SITE_URL}/og.svg`;

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
    name: "Clínica Kunu'u",
    parentOrganization: { "@type": "NGO", name: "SOMOSGAY" },
    url: `${SITE_URL}/clinica-kunuu`,
    description:
      "Primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay. Testeo gratuito de VIH, PrEP, sífilis y Hepatitis B. Atención psicológica y psiquiátrica.",
    telephone: `+${c.site.whatsappBase}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Independencia Nacional 1032 c/ Manduvirá",
      addressLocality: "Asunción",
      addressCountry: "PY",
    },
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