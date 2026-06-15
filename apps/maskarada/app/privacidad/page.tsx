export default function Privacidad() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacidad</h1>
          <div className="w-16 h-0.5 bg-blood-500 mx-auto" />
        </div>

        <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
          <p className="text-white font-semibold text-base">Última actualización: Junio 2026</p>

          <p>
            <strong className="text-white">Club maškaráda</strong> respeta tu privacidad. Esta
            política explica cómo manejamos tus datos personales cuando usás nuestro sitio web o
            asistís a nuestros eventos, en cumplimiento con el Reglamento General de Protección de
            Datos (GDPR) y la Ley de Protección de Datos Personales del Paraguay (Ley N.º
            6534/2020).
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">1. Datos que recopilamos</h2>
          <p>Recopilamos únicamente los datos necesarios para gestionar tu experiencia en el Club maškaráda:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Nombre completo:</strong> para personalizar tu entrada y verificar tu identidad en el ingreso.</li>
            <li><strong className="text-white">Correo electrónico:</strong> para enviarte la confirmación de compra, recordatorios del evento y comunicaciones relacionadas con tu entrada.</li>
            <li><strong className="text-white">Número de teléfono:</strong> para contactarte en caso de cambios de último momento, cancelaciones o emergencias durante el evento.</li>
            <li><strong className="text-white">Datos de navegación anónimos:</strong> información técnica como dirección IP anonimizada, tipo de navegador, páginas visitadas y duración de la sesión, recopilada exclusivamente mediante cookies técnicas necesarias para el funcionamiento del sitio.</li>
          </ul>

          <h2 className="text-lg font-semibold text-white mt-8">2. Finalidad del tratamiento</h2>
          <p>Tus datos personales son tratados exclusivamente para los siguientes fines:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Procesamiento de entradas:</strong> gestionar la compra, reserva, pago y entrega de tus entradas para los eventos.</li>
            <li><strong className="text-white">Comunicación sobre el evento:</strong> enviarte información relevante como cambios de horario, ubicación, protocolos de seguridad o actualizaciones importantes.</li>
            <li><strong className="text-white">Analítica interna:</strong> mejorar nuestro sitio web y la experiencia de usuario mediante métricas agregadas y anónimas. No utilizamos estos datos para perfilado individual ni publicidad comportamental.</li>
            <li><strong className="text-white">Seguridad y cumplimiento:</strong> mantener una lista de bloqueo (blocklist) para prevenir el ingreso de personas que hayan violado las reglas del club o causado incidentes en eventos anteriores.</li>
          </ul>
          <p>Si optás voluntariamente por recibir comunicaciones sobre futuros eventos (marketing), podrás darte de baja en cualquier momento mediante el enlace incluido en cada mensaje.</p>

          <h2 className="text-lg font-semibold text-white mt-8">3. Base legal</h2>
          <p>El tratamiento de tus datos personales se basa en tu <strong className="text-white">consentimiento explícito</strong>, otorgado al momento de completar el formulario de entradas y aceptar esta política de privacidad. Tenés derecho a retirar tu consentimiento en cualquier momento, sin que ello afecte la licitud del tratamiento basado en el consentimiento previo a su retiro.</p>

          <h2 className="text-lg font-semibold text-white mt-8">4. Período de retención de datos</h2>
          <p>Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades descritas en esta política:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Datos de entrada y comunicación:</strong> hasta 12 meses posteriores al evento al que asististe, salvo que solicites su eliminación antes.</li>
            <li><strong className="text-white">Datos de marketing:</strong> hasta que te des de baja de la lista de correo.</li>
            <li><strong className="text-white">Registros de blocklist:</strong> de forma indefinida mientras la persona permanezca bloqueada, con actualización periódica para evaluar su vigencia.</li>
            <li><strong className="text-white">Datos de navegación anónimos:</strong> hasta 26 meses desde la última visita.</li>
          </ul>
          <p>Una vez cumplido el período de retención, tus datos serán eliminados de forma segura o anonimizados irreversiblemente.</p>

          <h2 className="text-lg font-semibold text-white mt-8">5. Tus derechos</h2>
          <p>Como titular de datos personales, tenés los siguientes derechos, que podés ejercer en cualquier momento de forma gratuita:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Acceso:</strong> solicitarnos confirmación sobre si estamos tratando tus datos y, en tal caso, acceder a una copia de los mismos.</li>
            <li><strong className="text-white">Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
            <li><strong className="text-white">Supresión (derecho al olvido):</strong> solicitar la eliminación de tus datos personales cuando ya no sean necesarios para las finalidades para las que fueron recogidos.</li>
            <li><strong className="text-white">Limitación del tratamiento:</strong> solicitar que restrinjamos el uso de tus datos en determinadas circunstancias.</li>
            <li><strong className="text-white">Portabilidad:</strong> recibir tus datos en un formato estructurado, de uso común y lectura mecánica, y transmitirlos a otro responsable.</li>
            <li><strong className="text-white">Oposición:</strong> oponerte al tratamiento de tus datos para fines específicos, incluido el marketing directo.</li>
            <li><strong className="text-white">Retiro del consentimiento:</strong> retirar tu consentimiento en cualquier momento sin que ello afecte la legalidad del tratamiento previo.</li>
          </ul>

          <h2 className="text-lg font-semibold text-white mt-8">6. Ejercicio de tus derechos</h2>
          <p>Para ejercer cualquiera de tus derechos, o si tenés preguntas sobre cómo manejamos tus datos, podés contactarnos a través de los siguientes canales:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Correo electrónico:</strong> <a href="mailto:privacidad@clubmaskarada.com" className="text-gold-400 hover:text-gold-300 underline">privacidad@clubmaskarada.com</a></li>
            <li><strong className="text-white">Instagram:</strong> <a href="https://instagram.com/clubmaskarada" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 underline">@clubmaskarada</a></li>
            <li><strong className="text-white">Formulario web:</strong> a través de nuestra <a href="/contacto" className="text-gold-400 hover:text-gold-300 underline">página de contacto</a></li>
          </ul>
          <p>Responderemos a tu solicitud en un plazo máximo de 30 días calendario. Si no estás satisfecho con nuestra respuesta, tenés derecho a presentar una reclamación ante la Autoridad de Protección de Datos correspondiente.</p>

          <h2 className="text-lg font-semibold text-white mt-8">7. Política de cookies</h2>
          <p>Este sitio web utiliza exclusivamente <strong className="text-white">cookies técnicas</strong> necesarias para su funcionamiento básico. No utilizamos cookies de rastreo, publicitarias ni de redes sociales.</p>
          <p>Las cookies técnicas que utilizamos incluyen:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cookie de sesión para mantener tu estado de navegación.</li>
            <li>Cookie de preferencias para recordar configuraciones del sitio.</li>
            <li>Cookie de seguridad antifraude en el procesamiento de entradas.</li>
          </ul>
          <p>Estas cookies no requieren consentimiento explícito según el artículo 5.3 de la Directiva ePrivacy, ya que son estrictamente necesarias para la prestación del servicio. Podés configurar tu navegador para bloquearlas, aunque esto podría afectar el funcionamiento del sitio.</p>

          <h2 className="text-lg font-semibold text-white mt-8">8. Compartición con terceros</h2>
          <p><strong className="text-white">No compartimos, vendemos, alquilamos ni intercambiamos tus datos personales con terceros.</strong> Tus datos son tratados únicamente por el equipo de Club maškaráda y los servicios técnicos que utilizamos para operar la plataforma (proveedor de hosting, procesador de pagos), los cuales actúan como encargados del tratamiento en cumplimiento con el GDPR y cuentan con las garantías contractuales y técnicas adecuadas.</p>

          <h2 className="text-lg font-semibold text-white mt-8">9. Medidas de seguridad</h2>
          <p>Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cifrado SSL/TLS en todas las comunicaciones entre tu navegador y nuestro servidor.</li>
            <li>Almacenamiento cifrado de datos sensibles en nuestra base de datos.</li>
            <li>Acceso restringido al personal autorizado del Club maškaráda mediante autenticación segura.</li>
            <li>Auditorías periódicas de seguridad y revisión de accesos.</li>
            <li>Anonimización de datos cuando ya no son necesarios para su finalidad original.</li>
          </ul>

          <h2 className="text-lg font-semibold text-white mt-8">10. Actualizaciones de esta política</h2>
          <p>Esta política de privacidad puede ser actualizada periódicamente para reflejar cambios en nuestras prácticas, requisitos legales o mejoras en la seguridad. Te notificaremos cualquier cambio significativo a través de nuestro sitio web o por correo electrónico si corresponde.</p>
          <p>Te recomendamos revisar esta página periódicamente para mantenerte informado sobre cómo protegemos tu privacidad.</p>
          <p className="text-white font-semibold text-base pt-4">Última actualización: Junio 2026</p>
          <div className="w-full h-px bg-blood-500/30 mt-8" />
          <p className="text-xs text-gray-500 text-center pt-4">
            Si tenés alguna duda sobre esta política de privacidad, escribinos a{" "}
            <a href="mailto:privacidad@clubmaskarada.com" className="text-gold-400 hover:text-gold-300 underline">
              privacidad@clubmaskarada.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
