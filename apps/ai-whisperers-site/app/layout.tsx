import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })
const jbmono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ai-whisperers.org"),
  title: {
    default: "AI Whisperers — We build AI systems that actually work.",
    template: "%s · AI Whisperers",
  },
  description: "A 2-person engineering studio in Paraguay shipping production AI across 6 capability tracks. 30+ public repos. 42 client sites live. 1 open-source agentic framework.",
  keywords: ["AI", "AI agency", "Paraguay", "AI consulting", "MCP", "agentic AI", "multi-tenant SaaS", "satellite 3D", "open source"],
  authors: [{ name: "AI Whisperers" }],
  openGraph: {
    type: "website",
    url: "https://www.ai-whisperers.org",
    siteName: "AI Whisperers",
    title: "AI Whisperers — We build AI systems that actually work.",
    description: "A 2-person engineering studio in Paraguay shipping production AI. 30+ public repos. 42 client sites live.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Whisperers — We build AI systems that actually work.",
    description: "A 2-person engineering studio in Paraguay shipping production AI. 30+ public repos. 42 client sites live.",
  },
  alternates: {
    canonical: "/en",
    languages: {
      "en": "/en",
      "es": "/es",
      "nl": "/nl",
      "pt": "/pt",
    },
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jbmono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
