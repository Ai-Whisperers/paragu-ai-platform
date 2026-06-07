"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  const items = [
    { label: "Inicio", href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" },
    { label: "Tienda", href: "/tienda", icon: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" },
    { label: "Blog", href: "/blog", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { label: "WhatsApp", href: "https://wa.me/595981234567?text=¡Hola!%20Quiero%20información", icon: "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" },
    { label: "FAQ", href: "/faq", icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.01" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm md:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-1">
        {items.map(item => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          const isExternal = item.href.startsWith("http")
          const El = isExternal ? "a" : Link
          return (
            <El key={item.label} href={item.href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon}/>
              </svg>
              <span className="text-[10px] font-medium">{item.label}</span>
            </El>
          )
        })}
      </div>
    </nav>
  )
}
