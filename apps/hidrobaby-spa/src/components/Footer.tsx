'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-secondary/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-white mb-4">HidroBaby Spa</h3>
            <p className="text-white/70 text-sm">
              Centro especializado en hidroterapia y bienestar para bebés y embarazadas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/70 hover:text-white transition-colors text-sm no-underline">Inicio</Link></li>
              <li><Link href="/servicios" className="text-white/70 hover:text-white transition-colors text-sm no-underline">Servicios</Link></li>
              <li><Link href="/galeria" className="text-white/70 hover:text-white transition-colors text-sm no-underline">Galería</Link></li>
              <li><Link href="/instalaciones" className="text-white/70 hover:text-white transition-colors text-sm no-underline">Instalaciones</Link></li>
              <li><Link href="/before-after" className="text-white/70 hover:text-white transition-colors text-sm no-underline">Antes/Después</Link></li>
              <li><Link href="/reuniones" className="text-white/70 hover:text-white transition-colors text-sm no-underline">Reuniones</Link></li>
              <li><a href="https://wa.me/595993444222?text=Hola!%20Quiero%20reservar" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm no-underline">WhatsApp</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contacto</h3>
            <p className="space-y-1 text-white/70 text-sm">
              📞 <span className="whitespace-nowrap">+595 993 444 222</span><br />
              📍 Asunción, Paraguay<br />
              🕐 Lun-Vie: 8:00 - 18:00<br />
              📧 info@hidrobaby-spa.com.py
            </p>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">Síguenos</h3>
            <div className="flex gap-3">
              <a href="https://instagram.com/hidrobaby_spa.py" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 5.836 2.632 5.836 5.836S15.204 13.835 12 13.835 6.164 11.203 6.164 8 8.796 2.163 12 2.163zm0 1.442c-2.93 0-5.308 2.378-5.308 5.308S9.07 12.759 12 12.759s5.308-2.378 5.308-5.308S14.93 3.605 12 3.605zm0 9.322c-2.641 0-4.786-2.146-4.786-4.786S9.359 7.89 12 7.89s4.786 2.146 4.786 4.786S14.641 16.744 12 16.744zm6.364-6.364l-1.595 1.595-1.26-1.26 1.595-1.595 1.26 1.26zM19.5 7.5h-3v-1c0-1.381-1.119-2.5-2.5-2.5S11.5 3.619 11.5 5v1H8.5v1h1v9h4v-1h2.5v1h1v-9h2.5v1zm-4.5 3c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2z"/></svg>
              </a>
              <a href="https://facebook.com/hidrobaby_spa.py" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.601 0 0 .601 0 1.341v21.318C0 23.398.601 24 1.341 24h5.19v-9.294h-3.13v-2.906h3.13V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.473.099 2.577.114v2.286h-1.98c-1.504 0-1.795.715-1.795 1.763v2.286h3.33l-.467 2.906h-2.86V24h6.19c.74 0 1.341-.602 1.341-1.341V1.341C24 .601 23.399 0 22.675 0z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/50">
          © {new Date().getFullYear()} HidroBaby Spa. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}