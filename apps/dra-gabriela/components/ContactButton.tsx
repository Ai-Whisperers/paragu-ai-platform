// Shared contact CTAs: WhatsApp / Phone / Email with graceful fallback.
// Used across hero, cta-banner, contact page, service pages.
//
// Priority chain:
// 1. If whatsapp configured: show WhatsApp primary
// 2. Else if phone configured: show phone
// 3. Else if email configured: show email
// 4. Else: link to /{locale}/contact page (form is the last-resort channel)
//
// This is the single source of truth for "the contact button". All other
// components import ContactButtons from here.

import Link from "next/link"
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react"
import { whatsappLink, phoneDisplay, isPlaceholder } from "@/lib/content"

interface ContactButtonsProps {
  business: any
  locale: string
  /** "primary" = single big CTA. "stack" = multiple buttons stacked. "inline" = small. */
  variant?: "primary" | "stack" | "inline"
  /** Override the default labels (for page-specific CTAs). */
  primaryLabel?: string
  secondaryLabel?: string
  className?: string
}

export function ContactButtons({
  business,
  locale,
  variant = "primary",
  primaryLabel,
  secondaryLabel,
  className = "",
}: ContactButtonsProps) {
  const isEs = locale === "es"
  const base = `/${locale}`

  const wa = whatsappLink(business?.whatsapp, business?.whatsappMessage)
  const phone = phoneDisplay(business?.phone)
  const email = business?.email && !isPlaceholder(business?.email) ? business.email : null

  const sizeClasses = variant === "primary"
    ? "text-base px-8 py-4"
    : variant === "inline"
    ? "text-sm px-4 py-2"
    : "text-sm px-5 py-2.5"

  // Determine the primary channel
  let primary: { href: string; icon: any; label: string; target?: string; rel?: string }

  if (wa) {
    primary = {
      href: wa,
      icon: MessageCircle,
      label: primaryLabel || (isEs ? "Escribime por WhatsApp" : "Message on WhatsApp"),
      target: "_blank",
      rel: "noopener noreferrer",
    }
  } else if (phone) {
    const digits = phone.replace(/\D/g, "")
    primary = {
      href: `tel:${digits}`,
      icon: Phone,
      label: primaryLabel || phone,
    }
  } else if (email) {
    const subject = isEs ? "Consulta — Dra. Gabriella" : "Consultation — Dra. Gabriella"
    primary = {
      href: `mailto:${email}?subject=${encodeURIComponent(subject)}`,
      icon: Mail,
      label: primaryLabel || (isEs ? "Escribime por email" : "Email me"),
    }
  } else {
    primary = {
      href: `${base}/contact`,
      icon: MessageCircle,
      label: primaryLabel || (isEs ? "Ver datos de contacto" : "See contact details"),
    }
  }

  const PrimaryIcon = primary.icon

  // Secondary options (everything else we have)
  const secondary: Array<{ href: string; icon: any; label: string; target?: string; rel?: string }> = []
  if (wa && primary.href !== wa) {
    secondary.push({
      href: wa,
      icon: MessageCircle,
      label: secondaryLabel || (isEs ? "WhatsApp" : "WhatsApp"),
      target: "_blank",
      rel: "noopener noreferrer",
    })
  }
  if (phone) {
    const digits = phone.replace(/\D/g, "")
    if (primary.href !== `tel:${digits}`) {
      secondary.push({ href: `tel:${digits}`, icon: Phone, label: phone })
    }
  }
  if (email && primary.href !== `mailto:${email}`) {
    const subject = isEs ? "Consulta — Dra. Gabriella" : "Consultation — Dra. Gabriella"
    secondary.push({ href: `mailto:${email}?subject=${encodeURIComponent(subject)}`, icon: Mail, label: email })
  }
  // Always show "see contact" as a safety net
  if (primary.href !== `${base}/contact`) {
    secondary.push({
      href: `${base}/contact`,
      icon: ArrowRight,
      label: isEs ? "Ver contacto" : "See contact",
    })
  }

  // Render
  const PrimaryLink = primary.href.startsWith("http") || primary.href.startsWith("tel:") || primary.href.startsWith("mailto:")
    ? (props: any) => <a {...props} />
    : Link

  if (variant === "primary") {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <PrimaryLink
          href={primary.href}
          target={primary.target}
          rel={primary.rel}
          className="btn btn-primary text-base px-8 py-4"
        >
          <PrimaryIcon className="w-5 h-5" />
          {primary.label}
        </PrimaryLink>
        {secondary.slice(0, 1).map((s, i) => {
          const Icon = s.icon
          return (
            <Link
              key={i}
              href={s.href}
              target={s.target}
              rel={s.rel}
              className="btn btn-outline text-base px-8 py-4"
            >
              {s.label}
              <Icon className="w-5 h-5" />
            </Link>
          )
        })}
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        <PrimaryLink
          href={primary.href}
          target={primary.target}
          rel={primary.rel}
          className="btn btn-primary text-sm px-4 py-2"
        >
          <PrimaryIcon className="w-4 h-4" />
          {primary.label}
        </PrimaryLink>
      </div>
    )
  }

  // stack
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <PrimaryLink
        href={primary.href}
        target={primary.target}
        rel={primary.rel}
        className="btn btn-primary text-sm px-5 py-2.5"
      >
        <PrimaryIcon className="w-4 h-4" />
        {primary.label}
      </PrimaryLink>
      {secondary.slice(0, 2).map((s, i) => {
        const Icon = s.icon
        return (
          <Link
            key={i}
            href={s.href}
            target={s.target}
            rel={s.rel}
            className="btn btn-outline text-sm px-5 py-2.5"
          >
            {s.label}
            <Icon className="w-4 h-4" />
          </Link>
        )
      })}
    </div>
  )
}
