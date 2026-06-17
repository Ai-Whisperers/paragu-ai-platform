import Link from "next/link";
import { content, whatsappLink } from "@/lib/content";

export const metadata = {
  title: "Donar — Club maškaráda",
  description:
    "Cómo apoyar maškaráda: transferencia bancaria, Tigo Money, o escribinos directo. La plataforma se sostiene con la comunidad.",
};

const COPY = {
  es: {
    intro: "maškaráda se sostiene con el trabajo voluntario del equipo y los aportes de la comunidad. Si querés apoyar el proyecto, hay tres formas de hacerlo — todas suman.",
    cta: "Elegí cómo aportar",
    bank: "Transferencia bancaria",
    tigo: "Tigo Money",
    write: "Escribinos directo",
    bankDetail: "Datos de la cuenta",
    bankName: "Banco Continental",
    bankAccount: "Cuenta corriente 123-456789-0",
    bankHolder: "Club maškaráda",
    bankCuit: "RUC: 80-1234567-8",
    tigoDetail: "Pago por Tigo Money",
    tigoNumber: "+595 981 200255",
    tigoName: "Moñai (tesorera)",
    writeDetail: "Coordiná con el equipo",
    writeNote: "Si querés hacer una transferencia grande, donar equipos, auspiciar un evento, o apoyar de otra forma, escribinos.",
    note: "Cada guaraní se usa para pagar el espacio de los munches, los materiales de los talleres, y los costos de la plataforma. No hay sueldos — todo es voluntaria.",
  },
};

export default function Donar() {
  const c = content; // ES-only for now (donations are a local community thing)
  const copy = COPY.es;
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🪶</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            Donar
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
            {copy.intro}
          </p>
        </div>

        {/* The 3 ways */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{copy.cta}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bank transfer */}
            <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02]">
              <div className="text-3xl mb-3">🏦</div>
              <h3 className="text-lg font-semibold text-white mb-3">{copy.bank}</h3>
              <dl className="space-y-2 text-sm text-gray-300">
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">Banco</dt>
                  <dd>{copy.bankName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">Cuenta</dt>
                  <dd className="font-mono">{copy.bankAccount}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">Titular</dt>
                  <dd>{copy.bankHolder}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">RUC</dt>
                  <dd className="font-mono">{copy.bankCuit}</dd>
                </div>
              </dl>
              <p className="text-xs text-gray-500 mt-4 italic">
                Comprobante por WhatsApp al equipo
              </p>
            </div>

            {/* Tigo Money */}
            <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02]">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-lg font-semibold text-white mb-3">{copy.tigo}</h3>
              <dl className="space-y-2 text-sm text-gray-300">
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">Número</dt>
                  <dd className="font-mono">{copy.tigoNumber}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">Nombre</dt>
                  <dd>{copy.tigoName}</dd>
                </div>
              </dl>
              <p className="text-xs text-gray-500 mt-4 italic">
                Mandanos un mensaje con el monto
              </p>
            </div>

            {/* Direct message */}
            <div className="border border-gold-400/30 rounded-xl p-6 bg-gold-400/5">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-semibold text-white mb-3">{copy.write}</h3>
              <p className="text-sm text-gray-300 mb-4">{copy.writeNote}</p>
              <a
                href={whatsappLink("Hola! Quiero apoyar a maškaráda con una donación")}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-500 text-white text-center py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
              >
                💬 Escribinos
              </a>
            </div>
          </div>
        </section>

        {/* What donations fund */}
        <section className="border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-4">¿A dónde va el dinero?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-semibold text-white mb-1">Espacio</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Alquiler del café para munches, del espacio para talleres, y del venue para ediciones.
              </p>
            </div>
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold text-white mb-1">Materiales</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Cuerdas para rope jams, materiales para workshops, impresión de guías de seguridad.
              </p>
            </div>
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <div className="text-2xl mb-2">🖥️</div>
              <h3 className="font-semibold text-white mb-1">Plataforma</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Hosting, dominio, base de datos, backups. La infra que sostiene esta web.
              </p>
            </div>
          </div>
        </section>

        <p className="text-xs text-gray-500 text-center mt-12 italic max-w-xl mx-auto">
          {copy.note}
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-white text-sm uppercase tracking-widest"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
