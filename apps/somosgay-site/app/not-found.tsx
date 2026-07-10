import Link from "next/link";
import content from "@/content/es.json";

const c = content as any;

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <div className="rainbow-bar w-32 mx-auto mb-8 rounded-full" aria-hidden="true" />
        <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">404</p>
        <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">Página no encontrada</h1>
        <p className="text-text-light mb-8">
          La página que buscás no existe. Podés volver al inicio o explorar nuestros programas.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
          >
            Volver al inicio
          </Link>
          <Link
            href="/programas"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-warm-deep)] bg-warm text-text hover:bg-warm-deep"
          >
            Ver programas
          </Link>
        </div>
      </div>
    </div>
  );
}