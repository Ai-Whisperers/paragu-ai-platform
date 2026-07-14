import { Inter, DM_Serif_Display, Caveat } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { THEMES, THEME_STORAGE_KEY } from "@/lib/themes"
import { StickyWhatsApp } from "@/components/StickyWhatsApp"
import { BreadcrumbsJsonLd } from "@/components/Breadcrumbs"
import { getContent } from "@/lib/content"

export const dynamic = "force-dynamic"
export const revalidate = 0

const THEME_IDS = THEMES.map((t) => t.id)
const NO_FLASH_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var allowed=${JSON.stringify(THEME_IDS)};var v=localStorage.getItem(k);if(v&&v!=='default'&&allowed.indexOf(v)!==-1){document.documentElement.setAttribute('data-theme',v);}}catch(e){console.warn('theme no-flash failed',e);}})();`

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-heading",
})

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-whimsical",
})

export const metadata = {
  metadataBase: new URL("https://ometzdental.com"),
  title: {
    default: "Ometz Dental · אומץ · Dentista en Asunción · Te escucho",
    template: "%s",
  },
  description:
    "Ometz Dental (אומץ) en Mburucuyá, Asunción. Odontología conservadora, rehabilitación oral, segunda opinión escrita. Bilingüe ES/EN. 20+ años de criterio clínico.",
  keywords: [
    "dentista Asunción",
    "dental Paraguay",
    "English dentist Paraguay",
    "second opinion dental",
    "dental implants Paraguay",
    "odontóloga bilingüe Asunción",
  ],
  authors: [{ name: "Ometz Dental · Dra. Gabriella González Pane" }],
  creator: "Ometz Dental · Dra. Gabriella González Pane",
  publisher: "Ometz Dental · Dra. Gabriella González Pane",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    // Primary: Spanish (Paraguay). English variant provided for hreflang completeness.
    locale: "es_PY",
    alternateLocale: ["en_US", "en_PY"],
    siteName: "Ometz Dental",
    title: "Ometz Dental · Te escucho. · Dentista conservadora en Asunción",
    description: "Ometz Dental (אומץ) · Rehabilitación oral + segunda opinión escrita en Mburucuyá, Asunción. Bilingüe. 20+ años.",
    // Image with explicit dimensions — required by FB to render link previews correctly
    images: [
      {
        url: "/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "Ometz Dental · אומץ · Dra. Gabriella González Pane · Dentista conservadora en Asunción",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dragabriellagp",
    creator: "@dragabriellagp",
  },
  robots: { index: true, follow: true },
  // Facebook Open Graph — fb:app_id is set when NEXT_PUBLIC_META_APP_ID env var exists.
  // To enable: create a Meta App at developers.facebook.com, then set the env var
  // in /root/paragu-ai-platform/apps/dra-gabriela/.env.local
  facebook: {
    appId: process.env.NEXT_PUBLIC_META_APP_ID || "",
  },
  // Note: canonical + languages are set in app/[locale]/layout.tsx via generateMetadata
  // because they need to be locale-aware. Root-level defaults here are NOT used
  // when a locale layout overrides them (which it does for every page).
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Ometz Dental",
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#1A5F5A",
    // fb:app_id — populated from NEXT_PUBLIC_FB_APP_ID env var once Meta App is wired
    // (see docs/clients/ometz/meta-stack-guide-es.md §5 — Meta App creation).
    // Until then, we omit the meta tag to avoid invalid IDs triggering FB warnings.
    "theme-color": "#1A5F5A",
  },
}

export const viewport = {
  themeColor: "#1A5F5A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${inter.variable} ${dmSerif.variable} ${caveat.variable}`} suppressHydrationWarning>

      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ometz Dental" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname.match(/^\/(en|es)\b/);var l=p?p[1]:'es';document.documentElement.lang=l;document.documentElement.setAttribute('data-locale',l);}catch(e){}})();`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
        {/* Google Analytics 4 - placeholder ID, Iván debe reemplazar */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
        {/* Meta Pixel - placeholder ID, Iván debe reemplazar */}
        {process.env.NEXT_PUBLIC_META_PIXEL && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL}');fbq('track','PageView');`,
            }}
          />
        )}
      </head>
      <body className="font-sans antialiased bg-bg text-fg">
        <ThemeProvider>
          {children}
          {(() => {
            const locale = "es" // Default; actual locale handled by client component
            const content = getContent(locale as any)
            const wa = content?.business?.whatsapp && content.business.whatsapp !== "PENDIENTE"
              ? `https://wa.me/${content.business.whatsapp}?text=${encodeURIComponent(content.business.whatsappMessage || "Hola Dra. Gaby, me interesaría agendar una consulta.")}`
              : ""
            return wa ? <StickyWhatsApp whatsappLink={wa} tooltip={locale === "es" ? "Escribime por WhatsApp" : "Message me on WhatsApp"} /> : null
          })()}
        </ThemeProvider>
        <Script id="register-sw" strategy="lazyOnload">
          {`if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => {}); }); }`}
        </Script>
      </body>
    </html>
  )
}
