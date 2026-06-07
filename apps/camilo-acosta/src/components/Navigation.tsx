import Link from "next/link";
import { Instagram } from "lucide-react";

interface NavItem { name: string; href: string }
interface SocialItem { name: string; href: string; icon: React.ComponentType<{ className?: string }> }

const navItems: NavItem[] = [
  { name: "Inicio", href: "/" },
  { name: "Shows", href: "/shows" },
  { name: "Videos", href: "/videos" },
  { name: "Bio", href: "/bio" },
  { name: "Contacto", href: "/contacto" },
];

const socialItems: SocialItem[] = [
  { name: "Instagram", href: "https://www.instagram.com/el.gatosiames/", icon: Instagram },
];

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight font-display">
              EL GATO<span style={{ color: "#E63946" }}> SIAMÉS</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {socialItems.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label={social.name}>
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <MobileMenu navItems={navItems} socialItems={socialItems} />
        </div>
      </div>
    </nav>
  );
}

function MobileMenu({ navItems, socialItems }: { navItems: NavItem[]; socialItems: SocialItem[] }) {
  return (
    <div className="md:hidden relative group">
      <button className="text-white/80 hover:text-white p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-md rounded-lg border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl">
        <div className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="block px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded">
              {item.name}
            </Link>
          ))}
          <div className="border-t border-white/10 my-2 pt-2 flex gap-4 px-3">
            {socialItems.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}