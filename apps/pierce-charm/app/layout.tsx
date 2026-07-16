import type { Metadata } from "next";
import { Cinzel, Tangerine, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BottomNav } from "@/components/BottomNav";
import { CookieBanner } from "@/components/CookieBanner";
import { CartBar } from "@/components/CartBar";
import { BookingModal } from "@/components/BookingModal";
import content from "@/content/es.json";

const c = content as any;
const SITE_URL = c.site?.url || "https://piercecharm.paragu-ai.com";
const OG_IMAGE = `${SITE_URL}/og.png`;

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: c.site?.title || "Pierce Charm",
    template: `%s | ${c.site?.title || "Pierce Charm"}`,
  },
  description: c.site?.seo?.open_description || c.site?.description || c.metaDescription,
  keywords: c.site?.seo?.local_keywords || [
    "piercing asunción",
    "piercing paraguay",
    "piercing barato asunción",
    "piercing de calidad asunción",
    "joyería alternativa",
    "estudio piercing asunción",
    "septum piercing asunción",
    "helix piercing paraguay",
    "daith piercing asunción",
    "industrial piercing paraguay",
    "tragus piercing asunción",
    "nostril piercing paraguay",
    "tongue piercing asunción",
    "labret piercing paraguay",
    "eyebrow piercing asunción",
    "ombligo piercing asunción",
    "piercing alternativo asunción",
    "joyería titanio asunción",
    "PVD negro titanio",
    "titanio ASTM F136 Paraguay",
    "Pierce Charm Asunción",
    "piercing profesional asunción",
  ],
  openGraph: {
    title: c.site?.title,
    description: c.site?.description,
    locale: "es_PY",
    type: "website",
    url: SITE_URL,
    siteName: c.businessName,
    images: [
      {
        url: OG_IMAGE,
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
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  maximumScale: 5,
  themeColor: "#63081d",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: c.businessName,
  description: c.metaDescription,
  url: SITE_URL,
  telephone: `+${c.contacto?.whatsapp || ""}`,
  priceRange: "Gs 50.000 - Gs 200.000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Asunción",
    addressRegion: "Central",
    addressCountry: "PY",
  },
  openingHoursSpecification: (c.contacto?.schedule || [])
    .filter((s: any) => s.hours !== "Cerrado")
    .map((s: any) => {
      const parts = (s.hours || "").split(/[-–]/);
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: s.day,
        opens: parts[0]?.trim() || "",
        closes: parts[1]?.trim() || "",
      };
    }),
  image: OG_IMAGE,
  sameAs: [
    `https://instagram.com/${(c.contacto?.instagram || "pierce.charm").replace("@", "")}`,
  ],
};

const fontCss = `:root{--font-display:${cinzel.style.fontFamily},serif;--font-script:${tangerine.style.fontFamily},cursive;--font-body:${inter.style.fontFamily},system-ui,sans-serif;}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${tangerine.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-[var(--color-foreground)] focus:rounded-sm focus:font-[var(--font-display)] focus:text-[0.78rem] focus:uppercase focus:tracking-[0.22em]"
        >
          Saltar al contenido principal
        </a>

        <style dangerouslySetInnerHTML={{ __html: fontCss }} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Header content={c} />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer content={c} />
        <WhatsAppFloat
          phone={c.contacto?.whatsapp || "595981324569"}
          message="Hola! Quiero información sobre un piercing."
        />
        <BottomNav />
        <CookieBanner />
        <CartBar phone={c.contacto?.whatsapp || "595981324569"} />
        <BookingModal phone={c.contacto?.whatsapp || "595981324569"} />
      </body>
    </html>
  );
}
