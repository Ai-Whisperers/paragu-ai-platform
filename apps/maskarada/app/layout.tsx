import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies, headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import HtmlLangSyncer from "@/components/HtmlLangSyncer";
import CookieBanner from "@/components/CookieBanner";
import { getContent, type Locale } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Resolve the active locale for this request:
 *  1. /en/* URL prefix → "en"
 *  2. cookie mk_locale (set by the switcher or the locale API)
 *  3. fallback to "es"
 */
async function resolveLocale(): Promise<Locale> {
  const h = await headers();
  const c = (await cookies()).get("mk_locale")?.value;
  if (c === "en" || c === "es") return c;
  // fall back to URL — x-pathname is set by the proxy (formerly middleware)
  const path = h.get("x-pathname") ?? h.get("x-invoke-path") ?? h.get("next-url") ?? "";
  if (path.startsWith("/en")) return "en";
  return "es";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const c = getContent(locale);
  // Derive a generic OG description that doesn't reference a specific past event.
  // The June 11 edition is in /historia. The next maskarada is in /eventos.
  const esDesc =
    "Comunidad de BDSM, kink y exploración consciente en Asunción, Paraguay. Ediciones, munches, talleres y marketplace de la comunidad. Próximo: 19 de septiembre, 2026.";
  const enDesc =
    "BDSM, kink and conscious-exploration community in Asunción, Paraguay. Editions, munches, workshops and community marketplace. Next: September 19, 2026.";
  return {
    metadataBase: new URL("https://maskarada.paragu-ai.com"),
    title: {
      default: locale === "en"
        ? `Club maškaráda — ${c.hero.tagline} | Asunción`
        : `Club maškaráda — La noche donde el deseo usa máscara | Asunción`,
      template: `%s | Club maškaráda`,
    },
    description: c.site.description,
    keywords: locale === "en"
      ? ["bdsm", "kink", "asunción", "paraguay", "party", "maskarada", "shibari", "fetish"]
      : ["bdsm", "kink", "asunción", "paraguay", "fiesta", "maskarada", "shibari", "fetish"],
    authors: [{ name: "Club maškaráda" }],
    creator: "Club maškaráda",
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_PY",
      url: "https://maskarada.paragu-ai.com",
      title: `Club maškaráda — ${c.hero.tagline}`,
      description: locale === "en" ? enDesc : esDesc,
      siteName: "Club maškaráda",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Club maškaráda" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Club maškaráda — ${c.hero.tagline}`,
      description: locale === "en" ? enDesc : esDesc,
      images: ["/og-image.jpg"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    alternates: {
      canonical: "https://maskarada.paragu-ai.com",
      languages: {
        es: "https://maskarada.paragu-ai.com/",
        en: "https://maskarada.paragu-ai.com/en",
      },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await resolveLocale();
  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" hrefLang="es" href="https://maskarada.paragu-ai.com/" />
        <link rel="alternate" hrefLang="en" href="https://maskarada.paragu-ai.com/en" />
      </head>
      <body className="antialiased">
        <HtmlLangSyncer locale={locale} />
        <div className="fixed inset-0 mask-gradient opacity-80 pointer-events-none z-0" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,0,0,0.08),transparent_60%)] pointer-events-none z-0" />
        <Navbar locale={locale} />
        <main className="relative z-10 pt-16 min-h-screen">{children}</main>
        <Footer locale={locale} />
        <WhatsAppFloat locale={locale} />
        <CookieBanner />
      </body>
    </html>
  );
}
