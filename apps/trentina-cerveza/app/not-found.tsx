"use client"
import Link from "next/link"

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 py-20">
      <div className="max-w-lg text-center">
        <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Página no encontrada</h1>
        <p className="text-muted-foreground mb-8">
          La página que buscás no existe o fue movida.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
