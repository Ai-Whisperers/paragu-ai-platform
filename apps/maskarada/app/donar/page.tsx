import Link from "next/link";
import { cookies } from "next/headers";
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
    bankName: "Banco Continental",
    bankAccount: "(Solicitar por WhatsApp — no publicamos datos bancarios en la web por seguridad)",
    bankHolder: "Club maškaráda",
    bankCuit: "(Solicitar por WhatsApp)",
    tigoNumber: "(Solicitar por WhatsApp — no publicamos el número por seguridad)",
    tigoName: "Moñai (tesorera)",
    writeNote: "Si querés hacer una transferencia, donar equipos, auspiciar un evento, o apoyar de otra forma, escribinos y te pasamos los datos de pago por privado.",
    note: "Cada guaraní se usa para pagar el espacio de los munches, los materiales de los talleres, y los costos de la plataforma. No hay sueldos — todo es voluntaria.",
    placeholder: "Por seguridad, los datos de pago se comparten por privado.",
    backToHome: "Volver al inicio",
    bankLabel: "Banco",
    accountLabel: "Cuenta",
    holderLabel: "Titular",
    numberLabel: "Número",
    nameLabel: "Nombre",
    fundTitle: "¿A dónde va el dinero?",
    fundVenue: "Espacio",
    fundVenueDesc: "Alquiler del café para munches, del espacio para talleres, y del venue para ediciones.",
    fundMaterials: "Materiales",
    fundMaterialsDesc: "Cuerdas para rope jams, materiales para workshops, impresión de guías de seguridad.",
    fundPlatform: "Plataforma",
    fundPlatformDesc: "Hosting, dominio, base de datos, backups. La infra que sostiene esta web.",
    donateTitle: "Donar",
    donateCTA: "💬 Escribinos",
  },
  en: {
    intro: "maškaráda runs on volunteer work and community contributions. If you want to support the project, there are three ways to do it — every bit counts.",
    cta: "Choose how to contribute",
    bank: "Bank transfer",
    tigo: "Tigo Money",
    write: "Message us directly",
    bankName: "Banco Continental",
    bankAccount: "(Request via WhatsApp — we don't publish bank details on the web for security)",
    bankHolder: "Club maškaráda",
    bankCuit: "(Request via WhatsApp)",
    tigoNumber: "(Request via WhatsApp — we don't publish the number for security)",
    tigoName: "Moñai (treasurer)",
    writeNote: "If you want to make a transfer, donate equipment, sponsor an event, or support in another way, message us and we'll share payment details privately.",
    note: "Every guaraní goes to venue rental for munches, workshop materials, and platform costs. No salaries — it's all volunteer-run.",
    placeholder: "For security, payment details are shared privately.",
    backToHome: "Back to home",
    bankLabel: "Bank",
    accountLabel: "Account",
    holderLabel: "Holder",
    numberLabel: "Number",
    nameLabel: "Name",
    fundTitle: "Where does the money go?",
    fundVenue: "Venue",
    fundVenueDesc: "Café rental for munches, workshop space, and the venue for editions.",
    fundMaterials: "Materials",
    fundMaterialsDesc: "Rope for rope jams, workshop supplies, printed safety guides.",
    fundPlatform: "Platform",
    fundPlatformDesc: "Hosting, domain, database, backups. The infrastructure that runs this site.",
    donateTitle: "Donate",
    donateCTA: "💬 Message us",
  },
} as const;

type Locale = keyof typeof COPY;

export default async function Donar() {
  // Read locale from cookie (set by the language switcher)
  const c = (await cookies()).get("mk_locale")?.value;
  const locale: Locale = c === "en" ? "en" : "es";
  const copy = COPY[locale];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🪶</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            {copy.donateTitle}
          </h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
            {copy.intro}
          </p>
        </div>

        <div className="mb-8 p-4 border border-gold-400/20 rounded-xl bg-gold-400/5 text-center">
          <p className="text-sm text-gold-400">🔒 {copy.placeholder}</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{copy.cta}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02]">
              <div className="text-3xl mb-3">🏦</div>
              <h3 className="text-lg font-semibold text-white mb-3">{copy.bank}</h3>
              <dl className="space-y-2 text-sm text-gray-300">
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">{copy.bankLabel}</dt>
                  <dd>{copy.bankName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">{copy.accountLabel}</dt>
                  <dd className="text-xs italic text-gray-400">{copy.bankAccount}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">{copy.holderLabel}</dt>
                  <dd>{copy.bankHolder}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">RUC</dt>
                  <dd className="text-xs italic text-gray-400">{copy.bankCuit}</dd>
                </div>
              </dl>
            </div>

            <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02]">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-lg font-semibold text-white mb-3">{copy.tigo}</h3>
              <dl className="space-y-2 text-sm text-gray-300">
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">{copy.numberLabel}</dt>
                  <dd className="text-xs italic text-gray-400">{copy.tigoNumber}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 uppercase tracking-widest">{copy.nameLabel}</dt>
                  <dd>{copy.tigoName}</dd>
                </div>
              </dl>
            </div>

            <div className="border border-gold-400/30 rounded-xl p-6 bg-gold-400/5">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-semibold text-white mb-3">{copy.write}</h3>
              <p className="text-sm text-gray-300 mb-4">{copy.writeNote}</p>
              <a
                href={whatsappLink(
                  locale === "en"
                    ? "Hi! I want to support maškaráda with a donation"
                    : "Hola! Quiero apoyar a maškaráda con una donación",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-500 text-white text-center py-2.5 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
              >
                {copy.donateCTA}
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-4">{copy.fundTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-semibold text-white mb-1">{copy.fundVenue}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{copy.fundVenueDesc}</p>
            </div>
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold text-white mb-1">{copy.fundMaterials}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{copy.fundMaterialsDesc}</p>
            </div>
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02]">
              <div className="text-2xl mb-2">🖥️</div>
              <h3 className="font-semibold text-white mb-1">{copy.fundPlatform}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{copy.fundPlatformDesc}</p>
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
            ← {copy.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
