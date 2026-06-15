import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })

export const metadata = {
  title: {
    default: "Dra. Gabriella González Pane — Conservative, planning-first dentistry in Asunción",
    template: "%s · Dra. Gabriella",
  },
  description: "Conservative, planning-first dentistry in Asunción. English-speaking dentist. Second opinions, treatment plans, and transparent pricing.",
  keywords: ["dentist Asunción", "dental Paraguay", "English dentist Paraguay", "second opinion dental", "dental implants Paraguay"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}
