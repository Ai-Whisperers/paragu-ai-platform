"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  message?: string
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

const variants = {
  primary: "bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-[var(--color-background)]",
  secondary: "bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white border border-[var(--color-accent)]",
}

const sizes = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-3",
}

export default function WhatsAppButton({
  message = "Hola! Quiero información sobre Trentina Cerveza Artesanal",
  variant = "primary",
  size = "md",
}: WhatsAppButtonProps) {
  const whatsappNumber = "595983224473"
  const encoded = encodeURIComponent(message)

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encoded}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center font-bold rounded transition-all hover:scale-105 ${variants[variant]} ${sizes[size]}`}
    >
      <MessageCircle size={size === "lg" ? 24 : size === "md" ? 20 : 16} />
      WhatsApp
    </a>
  )
}
