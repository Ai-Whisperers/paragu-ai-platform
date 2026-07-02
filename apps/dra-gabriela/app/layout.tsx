import { Inter, DM_Serif_Display, Caveat } from "next/font/google"
import "./globals.css"

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
    default: "Ometz Dental — Dra. Gabriella González Pane",
    // No template suffix; every page's title is the full branded title,
    // and we keep the layout metadata `default` as a clean fallback.
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
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#0f4c4c",
  appleWebApp: {
    capable: true,
    title: "Dra. Gabriella",
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#0f4c4c",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f4c4c" },
    { media: "(prefers-color-scheme: dark)", color: "#0a3a3a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname.match(/^\/(en|es)\b/);var l=p?p[1]:'en';document.documentElement.lang=l;}catch(e){}})();`,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f4c4c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dra. Gabriella" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => {}); }); }`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-bg text-fg">{children}</body>
    </html>
  )
}
