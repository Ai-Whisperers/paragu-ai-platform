'use client';

import { useState } from 'react';
import { Shield, Heart, Eye, EyeOff, Send, AlertCircle } from 'lucide-react';

const TIPOS = [
  'Me dieron medicamento equivocado',
  'No me atendieron / me rechazaron',
  'Mi familiar murió o quedó grave',
  'Me operaron de algo que no era',
  'Me infectaron en el hospital',
  'Me dieron de alta antes de tiempo',
  'Otro',
];

export default function ReportarForm() {
  const [submitted, setSubmitted] = useState(false);
  const [anonymous, setAnonymous] = useState(true);
  const [tipo, setTipo] = useState('');
  const [hospital, setHospital] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [contacto, setContacto] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En MVP: solo client-side. Se imprime como PDF al hacer submit.
    // Próxima versión: conectar a Reporte Ya backend.
    setSubmitted(true);
    window.print();
  };

  if (submitted) {
    return (
      <section className="py-12">
        <div className="container max-w-2xl text-center">
          <Heart className="w-16 h-16 text-[var(--color-success)] mx-auto mb-4" />
          <h1>Gracias por documentar tu caso.</h1>
          <p className="text-lg text-[var(--color-text-muted)] mt-4">
            Tu reporte se ha guardado en tu navegador y se imprimirá como PDF. Para escalar tu caso a la Defensoría del Pueblo o a un abogado, te recomendamos contactarte con la <a href="https://defensoriadelpueblo.gov.py/" target="_blank" rel="noopener noreferrer">Defensoría del Pueblo</a> directamente.
          </p>
          <div className="mt-8 card">
            <h2 className="text-lg mb-3">Próximos pasos sugeridos:</h2>
            <ul className="text-left text-sm space-y-2 text-[var(--color-text-muted)]">
              <li>1. Guardá el PDF que se imprimió. Es tu evidencia.</li>
              <li>2. Contactá la Defensoría del Pueblo para canalización oficial.</li>
              <li>3. Si querés que AIW use tu caso en su base pública (anonimizado), contactanos.</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-[var(--color-bg-alt)] border-b border-[var(--color-border-light)] py-10">
        <div className="container max-w-2xl">
          <h1 className="mb-3">Reportar un incidente</h1>
          <p className="text-[var(--color-text-muted)]">
            Si vos o alguien que conocés sufrió negligencia médica, podés documentar el caso acá. El formulario toma 3 minutos. No es consejo legal ni médico — es una herramienta para preservar tu evidencia.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-2xl">
          {/* Disclaimer inicial */}
          <div className="disclaimer-banner mb-6">
            <p className="text-xs leading-relaxed">
              <AlertCircle className="inline w-4 h-4 mr-1 text-[var(--color-warning)]" />
              <strong>Importante:</strong> Este formulario no es un servicio de emergencia. Si estás en peligro inmediato, llamá al SEME 141 o andé a la urgencia más cercana. Paraguay no tiene ley de protección de datos equivalente a GDPR — los datos quedan en tu dispositivo hasta que decidas compartirlos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo */}
            <div>
              <label htmlFor="tipo" className="block font-semibold mb-2">¿Qué pasó? *</label>
              <select
                id="tipo"
                required
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-base"
              >
                <option value="">Elegí una opción...</option>
                {TIPOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Hospital */}
            <div>
              <label htmlFor="hospital" className="block font-semibold mb-2">¿Dónde ocurrió? (Hospital / Clínica) *</label>
              <input
                id="hospital"
                type="text"
                required
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                placeholder="Ej: Hospital de Clínicas, IPS Central, Hospital Distrital Santaní..."
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-base"
              />
            </div>

            {/* Fecha */}
            <div>
              <label htmlFor="fecha" className="block font-semibold mb-2">¿Cuándo fue? *</label>
              <input
                id="fecha"
                type="date"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-base"
              />
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="block font-semibold mb-2">Contanos qué pasó *</label>
              <textarea
                id="descripcion"
                required
                rows={6}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describí los hechos como los recordés. No hace falta que sea perfecto — los detalles que puedas dar son importantes."
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-base"
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                No incluyas datos sensibles que no quieras que sean visibles al imprimir (DNI, cuentas bancarias, etc).
              </p>
            </div>

            {/* Anonimato */}
            <div className="card">
              <div className="flex items-start gap-3">
                {anonymous ? (
                  <EyeOff className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                ) : (
                  <Eye className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h3 className="font-bold mb-1">Identidad</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-3">
                    Por defecto, el reporte es anónimo — solo vos sabés qué contiene. Si querés que AIW te contacte para escalar el caso, dejá un contacto opcional.
                  </p>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Mantener anónimo (recomendado)</span>
                  </label>

                  {!anonymous && (
                    <div className="mt-3">
                      <label htmlFor="contacto" className="block text-sm font-medium mb-1">Contacto (email o teléfono)</label>
                      <input
                        id="contacto"
                        type="text"
                        value={contacto}
                        onChange={(e) => setContacto(e.target.value)}
                        placeholder="ej: maria@example.com o +595 9XX XXXXXX"
                        className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-[var(--color-border-light)]">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-primary)] text-white rounded-full font-bold hover:bg-[var(--color-primary-light)] transition-colors"
              >
                <Send className="w-4 h-4" />
                Guardar mi reporte
              </button>
              <p className="text-xs text-[var(--color-text-muted)] mt-3">
                Al hacer click, se imprimirá un PDF con tu reporte. Guardalo como evidencia.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
