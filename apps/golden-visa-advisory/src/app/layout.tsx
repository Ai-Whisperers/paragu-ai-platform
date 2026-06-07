import CookieConsent from "@/components/CookieConsent"
import JsonLd from "@/components/JsonLd"
import type { Metadata } from "next"
import "./globals.css"
import { EntryModal } from "@/components/EntryModal"
import { LocaleProvider } from "@/lib/locale-context"

export const metadata: Metadata = {
  title: "Golden Visa Advisory — Paraguai",
  description: "Market-building advisory firm helping Paraguayan businesses design investment products aligned with international Golden Visa demand. Direct advisory for foreign investors.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <LocaleProvider>
          <EntryModal />
          {children}
        </LocaleProvider>
              <JsonLd />
              <CookieConsent />
      </body>
    </html>
  )
}
