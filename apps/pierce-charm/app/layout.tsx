import type { Metadata } from "next";
import { Cinzel, Tangerine, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BottomNav } from "@/components/BottomNav";
import content from "@/content/es.json";

const c = content as any;

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-loaded",
  display: "swap",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script-loaded",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(c.site?.url || "https://piercecharm.paragu-ai.com"),
  title: {
    default: c.site?.title || "Pierce Charm",
    template: `%s | ${c.site?.title || "Pierce Charm"}`,
  },
  description: c.site?.description || c.metaDescription,
  keywords: [
    "piercing Asunción",
    "piercing Paraguay",
    "estudio de piercing",
    "joyería alternativa",
    "helix",
    "septum",
    "daith",
    "conch",
    "industrial",
    "estilo alternativo",
    "gótico",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: c.site?.title,
    description: c.site?.description,
    url: c.site?.url,
    siteName: c.site?.title,
    locale: "es_PY",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: c.site?.title || "Pierce Charm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: c.site?.title,
    description: c.site?.description,
    images: ["/og.png"],
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
  themeColor: "#63081d",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${tangerine.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style>{`
          :root {
            --font-display: ${cinzel.style.fontFamily}, serif;
            --font-script:  ${tangerine.style.fontFamily}, cursive;
            --font-body:    ${inter.style.fontFamily}, system-ui, sans-serif;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthAndBeautyBusiness",
              "@id": `${c.site?.url}/#business`,
              name: c.businessName,
              alternateName: c.site?.title,
              description: c.metaDescription,
              url: c.site?.url,
              telephone: `+${c.contacto?.whatsapp || ""}`,
              email: c.contacto?.email,
              priceRange: "Gs 80.000 - Gs 250.000",
              currenciesAccepted: "PYG",
              paymentAccepted: "Cash, Bank Transfer",
              address: {
                "@type": "PostalAddress",
                streetAddress: c.contacto?.address || "Asunción",
                addressLocality: "Asunción",
                addressRegion: "Central",
                addressCountry: "PY",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -25.2637,
                longitude: -57.5759,
              },
              areaServed: {
                "@type": "City",
                name: "Asunción",
              },
              openingHoursSpecification: (c.contacto?.schedule || [])
                .filter((s: any) => s.hours && s.hours !== "Cerrado" && /\d/.test(s.hours))
                .map((s: any) => ({
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: s.day,
                  opens: (s.hours || "").split(/\s*-\s*/)[0]?.trim() || "",
                  closes: (s.hours || "").split(/\s*-\s*/)[1]?.trim() || "",
                })),
              image: `${c.site?.url}/og.png`,
              logo: `${c.site?.url}/og.png`,
              sameAs: [
                c.contacto?.instagram ? `https://instagram.com/${String(c.contacto.instagram).replace("@", "")}` : null,
              ].filter(Boolean),
              makesOffer: (c.piercings?.categories || []).flatMap((cat: any) =>
                (cat.items || []).slice(0, 3).map((it: any) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: it.name,
                    description: it.description,
                    category: cat.label,
                  },
                  price: (it.price || "").replace(/[^\d]/g, "") || undefined,
                  priceCurrency: "PYG",
                }))
              ),
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Header content={c} />
        <main className="min-h-screen">{children}</main>
        <Footer content={c} />
        <WhatsAppFloat
          phone={c.contacto?.whatsapp || "595981324569"}
          message="Hola! Quiero información sobre un piercing."
        />
        <BottomNav />
      </body>
    </html>
  );
}