import Link from "next/link";
import { Instagram } from "lucide-react";

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/el.gatosiames/", icon: Instagram },
];

const links = [
  { name: "Inicio", href: "/" },
  { name: "Shows", href: "/shows" },
  { name: "Videos", href: "/videos" },
  { name: "Bio", href: "/bio" },
  { name: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-black tracking-tight font-display">
              EL GATO<span className="text-accent"> SIAMÉS</span>
            </span>
            <p className="mt-3 text-sm text-white/50 max-w-xs">
              Comediante paraguayo de stand up. Humor negro, one-liners, doble sentido y estética oscura.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Redes Sociales
            </h3>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-accent transition-colors p-2 bg-white/5 rounded-lg hover:bg-white/10"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} El Gato Siamés. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/30">
            Hecho con 💛 desde Paraguay
          </p>
        </div>
      </div>
    </footer>
  );
}