import { Inter, DM_Serif_Display } from "next/font/google"
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

export const metadata = {
  title: {
    default: "Dra. Gabriella González Pane — Odontología conservadora y planificación primero en Asunción",
    template: "%s · Dra. Gabriella",
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
  openGraph: {
    type: "website",
    locale: "es_PY",
    siteName: "Dra. Gabriella González Pane",
  },
  robots: { index: true, follow: true },
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname.match(/^\\/(en|es)\\b/);var l=p?p[1]:'en';document.documentElement.lang=l;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[var(--bg)] text-[var(--fg)]">{children}</body>
    </html>
  )
}
