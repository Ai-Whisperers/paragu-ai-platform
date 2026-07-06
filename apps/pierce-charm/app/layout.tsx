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
  openGraph: {
    title: c.site?.title,
    description: c.site?.description,
    locale: "es_PY",
    type: "website",
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
              name: c.businessName,
              description: c.metaDescription,
              url: c.site?.url,
              telephone: `+${c.contacto?.whatsapp || ""}`,
              priceRange: "Gs 80.000 - Gs 250.000",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Asunción",
                addressCountry: "PY",
              },
              openingHoursSpecification: (c.contacto?.schedule || [])
                .filter((s: any) => s.hours !== "Cerrado")
                .map((s: any) => ({
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: s.day,
                  opens: (s.hours || "").split(" - ")[0]?.trim() || "",
                  closes: (s.hours || "").split(" - ")[1]?.trim() || "",
                })),
              image: `${c.site?.url}/og.png`,
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