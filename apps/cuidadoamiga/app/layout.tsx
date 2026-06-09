// Root layout — bare minimum so the redirect-only root page has a valid
// layout context. Real layout lives in app/[lang]/layout.tsx.
export const metadata = { title: 'Cuidado Amiga' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
