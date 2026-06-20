"use client";

import { MessageCircle } from "lucide-react";
import content from "@/content/es.json";

export default function WhatsAppFloat() {
  const site = (content.site as any) || {};
  const whatsapp = site.whatsapp || "595976309917";

  return (
    <a
      href={`https://wa.me/${whatsapp}?text=Hola%20Rocka%20Bar!`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 w-14 h-14 md:w-16 md:h-16 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[var(--color-primary)]/40 hover:scale-110 active:scale-95 transition-transform mb-safe"
      aria-label="Escribinos por WhatsApp"
    >
      <MessageCircle size={28} className="md:w-7 md:h-7" strokeWidth={2.2} />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-accent)] rounded-full animate-pulse" />
    </a>
  );
}
