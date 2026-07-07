"use client";

import { useState, useEffect } from "react";
import { whatsappUrl } from "@/lib/site-config";

export function WhatsAppFloat({ phone, message }: { phone: string; message?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = whatsappUrl(phone, message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        background: "linear-gradient(135deg, #8b1a31 0%, #63081d 100%)",
        border: "1.5px solid #b08838",
        boxShadow: "0 0 0 0 rgba(176, 136, 56, 0.7), 0 10px 30px rgba(98, 8, 29, 0.6)",
      }}
      className="fixed bottom-20 md:bottom-6 right-5 md:right-6 z-40 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full text-white safe-area-bottom animate-pulse-glow tap"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1c-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.3-1.4c1.5.8 3.1 1.3 4.7 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3C4.4 14.8 4 13.4 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z" />
      </svg>
    </a>
  );
}