// Footer.tsx — minimal, mobile-first, no logos, no gradients
import Link from 'next/link';

interface Props {
  locale: string;
}

export default function Footer({ locale }: Props) {
  const baseHref = `/${locale}`;
  return (
    <footer className="bg-[var(--color-primary)] text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-base mb-3 text-white">SaludAbierta PY</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Primer observatorio ciudadano de negligencia médica en Paraguay. Datos verificados, scorecard público, transparencia para víctimas.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-bold text-base mb-3 text-white">Explorar</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`${baseHref}/casos`} className="text-white/80 hover:text-white no-underline">Casos verificados</Link></li>
              <li><Link href={`${baseHref}/hospitales`} className="text-white/80 hover:text-white no-underline">Hospitales</Link></li>
              <li><Link href={`${baseHref}/metodologia`} className="text-white/80 hover:text-white no-underline">Metodología</Link></li>
              <li><Link href={`${baseHref}/reportar`} className="text-white/80 hover:text-white no-underline">Reportar incidente</Link></li>
            </ul>
          </div>

          {/* Coalition */}
          <div>
            <h3 className="font-bold text-base mb-3 text-white">Coalición</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.facebook.com/asociacion.honor.y.vida/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white no-underline">Asociación Honor y Vida</a></li>
              <li><a href="https://linktr.ee/Bastadenegligencia" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white no-underline">Basta de Negligencia PY</a></li>
              <li><a href="https://defensoriadelpueblo.gov.py/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white no-underline">Defensoría del Pueblo</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-base mb-3 text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`${baseHref}/privacidad`} className="text-white/80 hover:text-white no-underline">Privacidad</Link></li>
              <li><Link href={`${baseHref}/metodologia`} className="text-white/80 hover:text-white no-underline">Fuentes</Link></li>
              <li><a href="https://github.com/Ai-Whisperers/agents-v2/issues/1" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white no-underline">Brief técnico</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="disclaimer-banner mb-4" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--color-accent)' }}>
            <p className="text-xs text-white/90 leading-relaxed">
              <strong>Aviso legal:</strong> Los datos publicados son preliminares y provienen de fuentes periodísticas verificables. No constituyen diagnóstico médico-legal. Paraguay no cuenta con ley de protección de datos equivalente a GDPR — aplicamos privacy-by-design (sin cookies de terceros, sin tracking, sin Meta Pixel, sin Google Analytics).
            </p>
          </div>
          <p className="text-xs text-white/60 text-center">
            © 2026 SaludAbierta PY · Un proyecto de Ai-Whisperers Paraguay · Hecho con respeto a las víctimas
          </p>
        </div>
      </div>
    </footer>
  );
}
