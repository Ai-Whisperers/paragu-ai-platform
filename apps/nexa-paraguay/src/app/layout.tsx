import type { Metadata } from 'next'
import './globals.css'
import { readFileSync, existsSync } from 'fs'
import path from 'path'

const siteJsonPath = path.join(process.cwd(), 'site.json')
const siteJson = existsSync(siteJsonPath) ? JSON.parse(readFileSync(siteJsonPath, 'utf-8')) : {}

export const metadata: Metadata = {
  title: siteJson?.domain ?? 'nexa-paraguay',
  description: siteJson?.country ?? 'Nexa Paraguay',
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
