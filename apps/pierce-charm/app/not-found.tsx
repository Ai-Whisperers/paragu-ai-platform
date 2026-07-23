import Link from "next/link";
import { CrossInverted, CrescentMoon } from "@/components/ornaments";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden smoke-bg">
      <CrescentMoon size={48} className="text-[var(--color-gold)] mb-4 animate-flicker" />
      <h1 className="mb-3 text-balance">404 — Página perdida en la sombra</h1>
      <p className="text-[var(--color-muted-foreground)] max-w-md mb-6">
        La página que buscás no existe, se movió o nunca estuvo acá. Volvé al inicio.
      </p>
      <Link href="/" className="btn-gothic tap">
        <CrossInverted size={14} className="text-[var(--color-gold)]" />
        Volver al inicio
      </Link>
    </div>
  );
}