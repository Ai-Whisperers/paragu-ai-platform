import { Inter, DM_Serif_Display, Caveat } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import "./themes.css"

// Skip static prerender for global error pages too
export const dynamic = "force-dynamic"
export const revalidate = 0

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
  metadataBase: new URL("https://dragabriela.paragu-ai.com"),
  title: {
    default: "Dra. Gabriella González Pane — Odontología en Asunción",
    template: "%s",
  },
  description:
    "Odontología conservadora y planificación primero en Paraguay. Precios públicos, segunda opinión escrita, consultas en inglés y español.",
  keywords: [
    "dentista Asunción",
    "dental Paraguay",
    "English dentist Paraguay",
    "second opinion dental",
    "dental implants Paraguay",
    "odontóloga bilingüe Asunción",
  ],
  authors: [{ name: "Dra. Gabriella González Pane" }],
  creator: "Dra. Gabriella González Pane",
  publisher: "Dra. Gabriella González Pane",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "es_PY",
    siteName: "Dra. Gabriella González Pane",
    title: "Dra. Gabriella González Pane — Odontología conservadora en Asunción",
    description: "Planificación primero. Bilingüe. Asunción, Paraguay.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dragabriellagp",
    creator: "@dragabriellagp",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      es: "/es",
      "x-default": "/en",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Dra. Gabriella",
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#03045e",
  },
}

export const viewport = {
  themeColor: "#03045e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${dmSerif.variable} ${caveat.variable}`} suppressHydrationWarning>

      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dra. Gabriella" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname.match(/^\\/(en|es)\\b/);var l=p?p[1]:'en';document.documentElement.lang=l;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-bg text-fg">
        {children}
        <Script id="register-sw" strategy="lazyOnload">
          {`if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => {}); }); }`}
        </Script>
      </body>
    </html>
  )
}
