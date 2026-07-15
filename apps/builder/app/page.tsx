'use client'

import { useState, useEffect } from 'react'
import {
  Scissors, Dumbbell, Flower2, Hand, PenTool, User, Sparkles,
  Palette, Zap, Eye, Globe, Smartphone, Search, MessageCircle,
  ArrowRight, Layers, Star,
  ShoppingCart, Check,
  Menu, X as XIcon, PlayCircle,
  UtensilsCrossed, Fish, CircleDot,
  RotateCcw, Activity, Unlock,
  Egg, Building2, BarChart3, Calculator,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { FadeIn } from '@/components/landing/fade-in'
import { FAQItem } from '@/components/landing/faq-item'
import { LogoStrip } from '@/components/landing/logo-strip'
import { FloatingShape } from '@/components/landing/chrome'
import { BrandMark } from '@/components/ui/brand-icons'

import { REAL_CLIENTS, RUBROS, PLANS } from '@/lib/landing/marketing-data'

/* ── Schema.org Structured Data ────────────────────────────────── */

const SCHEMA_ORG_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://paragu-ai.com/#organization",
      "name": "ParaguAI",
      "url": "https://paragu-ai.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://paragu-ai.com/logo.png"
      },
      "description": "Sitios web profesionales para negocios paraguayos en 48 horas. Todo incluido: diseño, dominio .com.py, SEO y WhatsApp.",
      "foundingLocation": {
        "@type": "Place",
        "name": "Asunción, Paraguay"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Paraguay"
      },
      "sameAs": [
        "https://wa.me/595981324569"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://paragu-ai.com/#website",
      "url": "https://paragu-ai.com",
      "name": "ParaguAI - Sitios Web Profesionales para Negocios Paraguayos",
      "publisher": {
        "@id": "https://paragu-ai.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://paragu-ai.com/buscar?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://paragu-ai.com/#webpage",
      "url": "https://paragu-ai.com",
      "name": "ParaguAI - Tu negocio vendiendo mientras dormís",
      "isPartOf": {
        "@id": "https://paragu-ai.com/#website"
      },
      "about": {
        "@id": "https://paragu-ai.com/#organization"
      },
      "description": "Sitio web profesional en 48 horas para negocios paraguayos. Todo incluido: diseño, dominio .com.py, SEO y WhatsApp. Empezá gratis.",
      "inLanguage": "es-PY"
    },
    {
      "@type": "Service",
      "@id": "https://paragu-ai.com/#service",
      "name": "Creación de Sitios Web para Negocios",
      "provider": {
        "@id": "https://paragu-ai.com/#organization"
      },
      "description": "Diseño y desarrollo de sitios web profesionales para pequeños y medianos negocios en Paraguay",
      "areaServed": {
        "@type": "Country",
        "name": "Paraguay"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Planes de Servicio",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Diagnóstico"
            },
            "price": "0",
            "priceCurrency": "PYG",
            "description": "Diagnóstico + demo estratégica por WhatsApp"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Autónomo"
            },
            "price": "650000",
            "priceCurrency": "PYG",
            "description": "Sitio desde template con asistente IA. Dominio .com.py, SSL, WhatsApp, SEO."
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Profesional"
            },
            "price": "1200000",
            "priceCurrency": "PYG",
            "description": "Sitio personalizado con IA contextual, blog SEO, features a medida."
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Empresa"
            },
            "price": "2000000",
            "priceCurrency": "PYG",
            "description": "CRM, automatizaciones, multi-sucursal, landing pages, soporte same-day."
          }
        ]
      }
    },
    {
      "@type": "AggregateRating",
      "@id": "https://paragu-ai.com/#aggregate-rating",
      "itemReviewed": {
        "@id": "https://paragu-ai.com/#organization"
      },
      "ratingValue": "4.9",
      "reviewCount": "250",
      "bestRating": "5",
      "worstRating": "1"
    },
    {
      "@type": "FAQPage",
      "@id": "https://paragu-ai.com/#faq-page",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cuánto tiempo tarda en estar listo mi sitio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Entre 24 y 48 horas desde que elegís tu plan. Te clonamos un template exitoso o te diseñamos algo desde cero, según el plan. Recibís el sitio funcionando con tu asistente IA incluido."
          }
        },
        {
          "@type": "Question",
          "name": "¿Necesito saber algo de tecnología?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nada. Tu sitio viene con un asistente IA entrenado con tu negocio. Le pedís cambios de texto, fotos o precios y la IA lo hace. Para cambios complejos, nosotros te ayudamos."
          }
        },
        {
          "@type": "Question",
          "name": "¿Puedo ver algo antes de contratar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Empezamos con diagnóstico gratis por WhatsApp. Te mostramos cómo quedaría tu sitio con IA y decidís después sin compromiso."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué incluye el dominio .com.py?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Incluimos el dominio gratis el primer año. También configuramos SSL, emails profesionales y todo lo técnico sin costo extra."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo funciona el pago?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sin entrada. Solo pagás la mensualidad. Aceptamos transferencia bancaria y Mercado Pago. Cancelás cuando quieras, sin contrato de permanencia."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué pasa si no me gusta el sitio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tenés 30 días de garantía. Si no te convence, cancelás y no pagás más. Sin preguntas ni letra chica."
          }
        }
      ]
    }
  ]
}

/* ── Data Constants ─────────────────────────────────────────────── */

type Template = {
  id: string
  name: string
  icon: LucideIcon
  leads: number
  pct: number
  color: string
  demoSlug?: string
  demoUrl?: string
}

const TEMPLATES: Template[] = [
  { id: 'peluqueria', name: 'Peluquería', icon: Scissors, leads: 2393, pct: 81, color: '#b76e79', demoUrl: 'https://magnolia-peluqueria.paragu-ai.com' },
  { id: 'salon_belleza', name: 'Salón de Belleza', icon: Sparkles, leads: 1210, pct: 75, color: '#d4a574', demoUrl: 'https://mantraspa.paragu-ai.com' },
  { id: 'gimnasio', name: 'Gimnasio / Fitness', icon: Dumbbell, leads: 1087, pct: 72, color: '#2d6a4f', demoUrl: 'https://bichosgym.paragu-ai.com' },
  { id: 'spa', name: 'Spa & Wellness', icon: Flower2, leads: 927, pct: 76, color: '#7c9885', demoUrl: 'https://mantraspa.paragu-ai.com' },
  { id: 'barberia', name: 'Barbería', icon: User, leads: 778, pct: 77, color: '#8b6914' },
  { id: 'unas', name: 'Uñas', icon: Hand, leads: 488, pct: 75, color: '#c77dba' },
  { id: 'tatuajes', name: 'Tatuajes & Piercing', icon: PenTool, leads: 272, pct: 70, color: '#1a1a2e', demoUrl: 'https://jotaink.paragu-ai.com' },
  { id: 'estetica', name: 'Estética / Facial', icon: Sparkles, leads: 137, pct: 77, color: '#9b7cb8' },
  { id: 'diseno_grafico', name: 'Diseño Gráfico', icon: Palette, leads: 100, pct: 80, color: '#c44569', demoUrl: 'https://dayah.paragu-ai.com' },
  { id: 'pestanas', name: 'Pestañas y Cejas', icon: Eye, leads: 49, pct: 76, color: '#6c5ce7' },
  { id: 'depilacion', name: 'Depilación', icon: Zap, leads: 20, pct: 78, color: '#e17055', demoUrl: 'https://depiflash.paragu-ai.com' },
  { id: 'relocation', name: 'Reubicación', icon: Globe, leads: 0, pct: 0, color: '#1e3a5f', demoUrl: 'https://nexa.paragu-ai.com' },
  { id: 'real_estate', name: 'Inmobiliaria', icon: Building2, leads: 0, pct: 0, color: '#2d6a4f' },
  { id: 'meal_prep', name: 'Meal Prep & Compras', icon: ShoppingCart, leads: 0, pct: 0, color: '#3a6b4a' },
  { id: 'egg_farm', name: 'Granja / Huevos', icon: Egg, leads: 0, pct: 0, color: '#c89b3c' },
  { id: 'data_analytics_consulting', name: 'Consultoría Datos', icon: BarChart3, leads: 0, pct: 0, color: '#0f4c81' },
  { id: 'contador', name: 'Contador / Estudio Contable', icon: Calculator, leads: 0, pct: 0, color: '#1e5f3a' },
  { id: 'restaurant', name: 'Restaurante', icon: UtensilsCrossed, leads: 0, pct: 0, color: '#8B4513' },
  { id: 'sushi_bar', name: 'Sushi Bar', icon: Fish, leads: 0, pct: 0, color: '#1A1A1A' },
  { id: 'kaiten_zushi', name: 'Sushi Cinta', icon: CircleDot, leads: 0, pct: 0, color: '#2196F3' },
]

const FEATURES = [
  { icon: Search, title: 'Aparece en Google', desc: 'Cuando alguien busca "peluquería Asunción" o "gimnasio cerca", tu negocio aparece. Sin publicidad.' },
  { icon: MessageCircle, title: 'Leads por WhatsApp', desc: 'Cada visitante puede escribirte directo desde el celular. Sin formularios, sin perder clientes.' },
  { icon: BarChart3, title: 'Sabés cuántos te visitan', desc: 'Dashboard semanal: visitas, consultas, reservas. Datos reales, no intuición.' },
  { icon: Layers, title: 'Diseño por rubro', desc: 'Cada negocio tiene un diseño especializado. Peluquería ≠ Restaurante ≠ Gimnasio.' },
  { icon: Globe, title: 'Dominio propio .com.py', desc: 'Tu marca en la dirección del negocio. Incluye SSL, emails profesionales y todo configurado.' },
  { icon: Smartphone, title: 'Impecable en celular', desc: 'El 85% de tus clientes buscan desde el móvil. Tu sitio se ve impecable en cualquier pantalla.' },
]

const STEPS = [
  { num: '01', title: 'Nos escribís por WhatsApp', desc: 'Nos contás el nombre de tu negocio, qué servicios ofrecés, tus precios y nos mandás algunas fotos.' },
  { num: '02', title: 'Tu sitio + tu IA', desc: 'En 24-48 horas te mandamos el link de tu sitio funcionando con tu asistente IA entrenado en tu negocio. Revisás, pedís ajustes, y cuando te guste lo publicamos.' },
  { num: '03', title: 'Manejás con IA', desc: 'Te damos de alta en tu dominio .com.py con todo configurado. A partir de ahí manejás el contenido vos mismo con tu asistente IA: cambiás textos, fotos, precios sin pedir permiso.' },
]

const TESTIMONIALS = [
  {
    name: 'Marcelo Ríos',
    role: 'Fundador',
    business: 'Nexa Paraguay',
    location: 'Asunción',
    quote: 'Necesitábamos un sitio profesional en 4 idiomas para clientes europeos. ParaguAI lo entregó en 48 horas sin que toquemos nada de código.',
    rating: 5,
  },
  {
    name: 'Dueña',
    role: 'Propietaria',
    business: 'Mantra Spa',
    location: 'Asunción',
    quote: 'Ahora las clientas reservan desde el celular sin llamar. Mi WhatsApp recibe mensajes con la hora y el servicio. Me cambió el negocio.',
    rating: 5,
  },
  {
    name: 'Instructor',
    role: 'Entrenador',
    business: 'Bichos Gym',
    location: 'Asunción',
    quote: 'El sitio atrajo nuevos socios sin que haga publicidad. Los que buscan gimnasio en Asunción ahora nos encuentran primero.',
    rating: 5,
  },
]

const GUARANTEES = [
  { icon: PlayCircle, title: 'Ves antes de pagar', desc: 'Te armamos tu sitio demo gratis. Solo pagás si te gusta.' },
  { icon: RotateCcw, title: '30 días de garantía', desc: 'Si no te convence, cancelás y no pagás más. Sin preguntas.' },
  { icon: Activity, title: 'Siempre online', desc: 'Infraestructura en Cloudflare + Supabase. 99.9% uptime garantizado.' },
  { icon: Unlock, title: 'Sin contrato', desc: 'Cancelás cuando quieras. Tu dominio es tuyo, te lo llevás.' },
]



const FAQS = [
  { question: '¿Cuánto tiempo tarda en estar listo mi sitio?', answer: 'Entre 24 y 48 horas desde que elegís tu plan. Te clonamos un template exitoso o te diseñamos algo desde cero, según el plan.' },
  { question: '¿Necesito saber algo de tecnología?', answer: 'Nada. Tu sitio viene con un asistente IA entrenado con tu negocio. Le pedís cambios de texto, fotos o precios y la IA lo hace automáticamente. Si necesitás algo más complejo, nosotros lo creamos.' },
  { question: '¿Cómo funciona lo de la IA?', answer: 'Te damos acceso a un chat con tu propio asistente IA que conoce tu negocio. Le decís "cambiá el precio de la peluquería a 50.000" o "agregá una foto nueva" y él lo hace. No necesitás saber de código ni pedirnos permiso.' },
  { question: '¿Y si la IA no puede hacer lo que necesito?', answer: 'Ahí entramos nosotros. Si necesitás una funcionalidad nueva o la IA no entiende algo, te lo resolvemos. Eso puede tener un costo extra si es un cambio grande, pero los cambios normales los hace la IA sin cargo.' },
  { question: '¿Puedo ver algo antes de contratar?', answer: 'Sí. Empezamos con diagnóstico gratis por WhatsApp. Te mostramos cómo quedaría tu sitio con IA y decidís después.' },
  { question: '¿Qué incluye el dominio .com.py?', answer: 'Incluimos el dominio gratis el primer año. También configuramos SSL, emails profesionales y todo lo técnico.' },
  { question: '¿Cómo funciona el pago?', answer: 'Sin entrada. Solo pagás la mensualidad. Aceptamos transferencia bancaria y Mercado Pago. Cancelás cuando quieras, sin contrato.' },
  { question: '¿Qué pasa si no me gusta?', answer: 'Tenés 30 días de garantía. Si no te convence, cancelás y no pagás más. Sin preguntas.' },
]


/* ── Helper Functions ───────────────────────────────────────────── */

function waLink(message: string): string {
  return `https://wa.me/595981324569?text=${encodeURIComponent(message)}`
}

/* ── Navigation Component ───────────────────────────────────────── */

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/metodo', label: 'Cómo funciona' },
    { href: '/precios', label: 'Precios' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contacto', label: 'Contacto' },
    { href: '/changelog', label: 'Novedades' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-accent/30 bg-deep/85 backdrop-blur-xl shadow-glow'
            : 'bg-transparent'
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-deep text-white shadow-glow transition-transform group-hover:scale-110">
                <BrandMark width={20} height={20} />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Paragu</span>
                <span className="text-accent text-glow-gold">AI</span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="hidden text-sm font-medium text-white/70 hover:text-accent md:block"
              >
                Acceso clientes
              </Link>
              <a
                href={waLink('Hola, quiero una demo gratis de mi sitio web.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-deep shadow-lg shadow-accent/30 transition-all hover:bg-accent/90 hover:shadow-glow md:inline-flex md:items-center md:gap-2"
              >
                <MessageCircle size={16} />
                Demo gratis
              </a>
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú"
                className="rounded-lg p-2 text-white/85 md:hidden"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 text-white">
                <BrandMark width={20} height={20} />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white text-glow">Paragu</span>
                <span className="text-accent">AI</span>
              </span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú" className="rounded-lg p-2 text-white/85">
              <XIcon size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-4 text-lg font-medium text-white text-glow hover:bg-deep/55"
              >
                {link.label}
              </a>
            ))}
            <a
              href={waLink('Hola, quiero una demo gratis de mi sitio web.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-center text-lg font-semibold text-white"
            >
              <MessageCircle size={18} />
              Pedir demo gratis
            </a>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Main Page Component ────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG_DATA) }}
      />
      <Navigation />

      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative min-h-screen overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-deep/60 via-bg to-primary/40" />
            <FloatingShape className="top-20 right-20 h-[500px] w-[500px] bg-primary/30" delay={0} />
            <FloatingShape className="bottom-20 left-10 h-[400px] w-[400px] bg-accent/15" delay={1} />
            <FloatingShape className="top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-brand/20" delay={2} />
          </div>

          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <FadeIn delay={0}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-deep/70 px-4 py-2 backdrop-blur-sm">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_8px_#D2AE3F]" />
                  <span className="text-sm font-medium text-white/90">
                    Más de 250 negocios en Paraguay ya tienen su sitio
                  </span>
                </div>
              </FadeIn>

                <FadeIn delay={150}>
                <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance text-glow">
                  Tu negocio crece{' '}
                  <span className="bg-gradient-to-r from-accent via-brand to-primary bg-clip-text text-transparent">
                    mientras dormís
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={300}>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-white/85 md:text-xl">
                  Tu sitio web en 48 horas con inteligencia artificial para que lo manejés solo.
                  Aparecés en Google, recibís consultas por WhatsApp y sabés cuántos te visitan.
                  Sin entrada, Gs 650.000/mes.
                </p>
              </FadeIn>

              <FadeIn delay={450}>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href={waLink('Hola, quiero una demo gratis de mi sitio web.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-lg font-bold text-deep shadow-lg shadow-accent/40 transition-all hover:-translate-y-1 hover:bg-accent/90 hover:shadow-glow"
                  >
                    <MessageCircle size={20} />
                    Quiero mi demo gratis
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#clientes"
                    className="inline-flex items-center gap-2 rounded-2xl border-2 border-accent/50 bg-deep/40 px-8 py-4 text-lg font-bold text-accent backdrop-blur-sm transition-all hover:border-accent hover:bg-accent/10 hover:shadow-glow"
                  >
                    Ver sitios reales
                  </a>
                </div>
              </FadeIn>

              <FadeIn delay={600}>
                <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 rounded-2xl border border-brand-300/30 bg-deep/60 p-8 backdrop-blur-sm sm:grid-cols-4 shadow-glow">
                  {[
                    { value: '250+', label: 'Sitios publicados' },
                    { value: '48h', label: 'Tiempo promedio' },
                    { value: '4.9★', label: 'Valoración' },
                    { value: '98%', label: 'Clientes felices' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold text-accent md:text-4xl text-glow-gold">{stat.value}</p>
                      <p className="mt-1 text-sm text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* ── Real Clients ───────────────────────────────────────── */}
        <section id="clientes" className="py-20 relative overflow-hidden">
          {/* Decorative digital-transformation icon — right side */}
          <img
            src="/decor/digital-transformation.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-20 hidden w-[360px] opacity-30 lg:block"
          />
          <Container>
            <FadeIn>
              <div className="mb-12 text-center">
                <h2 className="text-3xl text-white md:text-4xl text-glow">
                  Negocios reales, sitios reales
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  No son plantillas vacías. Estos son negocios paraguayos que ya venden online.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {REAL_CLIENTS.map((client, idx) => (
                <FadeIn key={client.slug} delay={idx * 80}>
                  <a
                    href={client.href}
                    target="_blank"
                    rel="noopener"
                    className="group block overflow-hidden rounded-2xl border border-brand-300/40 bg-brand/80 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-glow"
                  >
                    {client.screenshot ? (
                      <div className="flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-deep to-primary">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={client.screenshot}
                          alt={`${client.name} preview`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex aspect-video items-center justify-center bg-gradient-to-br from-deep to-primary"
                      >
                        <span className="text-2xl text-white/40 text-glow">{client.name}</span>
                      </div>
                    )}
                    <div className="p-4">
                      <span className="mb-2 inline-block rounded-full bg-deep/60 px-2.5 py-1 text-xs font-semibold text-accent">
                        {client.vertical}
                      </span>
                      <h3 className="font-bold text-white group-hover:text-accent">
                        {client.name}
                      </h3>
                      <p className="mt-1 text-xs text-white/70">{client.summary}</p>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={400}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
                <LogoStrip />
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* ── Templates ──────────────────────────────────────────── */}
        <section id="rubros" className="py-20 relative overflow-hidden">
          {/* Decorative cyber panel — left side */}
          <img
            src="/decor/cyber-panel.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 top-10 hidden w-[420px] opacity-40 lg:block"
          />
          <Container>
            <FadeIn>
              <div className="mb-12 text-center">
                <h2 className="text-3xl text-white md:text-4xl text-glow">
                  Diseños por tipo de negocio
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Cada rubro tiene un diseño especializado. Elegí el tuyo.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-flow-col justify-start gap-3 overflow-x-auto pb-4 px-1 md:grid-flow-row md:grid md:grid-cols-3 lg:grid-cols-6">
              {RUBROS.map((rubro, idx) => (
                <FadeIn key={rubro.id} delay={idx * 60}>
                  <a
                    href={rubro.href}
                    target="_blank"
                    rel="noopener"
                    className="group shrink-0 rounded-xl border border-brand-300/40 bg-deep/85 p-4 text-left backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-glow"
                    style={{ minWidth: '160px' }}
                  >
                    <div
                      className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg p-2"
                      style={{ backgroundColor: `${rubro.color}44` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rubro.icon}
                        alt={rubro.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-accent">
                      {rubro.name}
                    </p>
                    <p className="mt-0.5 text-xs text-white/60">{rubro.badge}</p>
                  </a>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* ── How it Works ───────────────────────────────────────── */}
        <section id="como-funciona" className="py-20 relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(120, 52, 192, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 52, 192, 0.06) 1px, transparent 1px)",
              backgroundSize: '32px 32px',
            }}
          />
          <Container>
            <FadeIn>
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold text-white text-glow md:text-4xl">
                  Así de simple
                </h2>
                <p className="mt-4 text-lg text-white/75">
                  Tres pasos y tu negocio está online. Sin tocar código.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-3">
              {STEPS.map((step, idx) => (
                <FadeIn key={step.num} delay={idx * 150}>
                  <div className="relative rounded-2xl border border-brand-300/30 bg-white p-8">
                    <span className="absolute -top-4 left-8 rounded-full bg-primary px-4 py-1 text-sm font-bold text-white">
                      {step.num}
                    </span>
                    <h3 className="mb-3 mt-2 text-xl font-bold text-white text-glow">{step.title}</h3>
                    <p className="text-white/75">{step.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={500}>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {GUARANTEES.map((g) => (
                  <div key={g.title} className="flex items-start gap-3 rounded-xl bg-white p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-deep/30 text-accent">
                      <g.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-glow">{g.title}</h4>
                      <p className="text-sm text-white/75">{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* ── Features ───────────────────────────────────────────── */}
        <section className="py-20">
          <Container>
            <FadeIn>
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-white text-glow md:text-4xl">
                  Todo lo que necesitás incluido
                </h2>
                <p className="mt-4 text-lg text-white/75">
                  Sin sorpresas, sin costos extras, sin letra chica.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature, idx) => (
                <FadeIn key={feature.title} delay={idx * 100}>
                  <div className="rounded-2xl border border-brand-300/30 bg-white p-6 transition-all hover:shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-deep/30 text-accent">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white text-glow">{feature.title}</h3>
                    <p className="text-white/75">{feature.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Testimonials ───────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
          <Container>
            <FadeIn>
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Lo que dicen nuestros clientes
                </h2>
              </div>
            </FadeIn>

            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t, idx) => (
                <FadeIn key={t.name} delay={idx * 150}>
                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mb-6 text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-white/70">{t.business}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Pricing ────────────────────────────────────────────── */}
        <section id="precios" className="py-20 relative overflow-hidden">
          {/* Decorative cyber panel — right side */}
          <img
            src="/decor/cyber-panel.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 top-10 hidden w-[420px] opacity-30 lg:block"
          />
          <Container>
            <FadeIn>
              <div className="mb-12 text-center">
                <h2 className="text-3xl text-white md:text-4xl text-glow">
                  Elegí tu plan
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Empezá gratis y escalá cuando tu negocio crezca.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PLANS.map((plan, idx) => (
                <FadeIn key={plan.name} delay={idx * 100}>
                  <div
                    className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                      plan.popular
                        ? 'border-primary bg-gradient-to-br from-deep to-primary shadow-xl shadow-primary/40'
                        : 'border-brand-300/40 bg-deep/80 hover:border-accent hover:shadow-glow'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-brand px-4 py-1 text-xs font-bold text-deep">
                        Más recomendado
                      </span>
                    )}
                    <div className="mb-5">
                      <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>
                        {plan.name}
                      </h3>
                      <p className={`mt-1.5 text-sm ${plan.popular ? 'text-white/80' : 'text-white/60'}`}>
                        {plan.description}
                      </p>
                    </div>
                    <div className="mb-6">
                      <p className={`text-3xl font-bold ${plan.popular ? 'text-accent text-glow-gold' : 'text-white'}`}>
                        {plan.setup}
                      </p>
                      {plan.monthly && (
                        <p className={`mt-1 text-sm ${plan.popular ? 'text-white/80' : 'text-white/60'}`}>
                          plus {plan.monthly}{' '}
                          <span className="text-xs text-white/50">({plan.period})</span>
                        </p>
                      )}
                    </div>
                    <ul className="mb-8 space-y-3 text-sm">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-start gap-2.5">
                          {f.included ? (
                            <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                          ) : (
                            <XIcon size={16} className="mt-0.5 shrink-0 text-white/30" />
                          )}
                          <span className={f.included ? 'text-white/90' : 'text-white/40 line-through'}>
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={waLink(plan.waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto w-full rounded-full py-3.5 text-center font-semibold transition-all ${
                        plan.popular
                          ? 'bg-accent text-deep shadow-lg shadow-accent/40 hover:-translate-y-0.5 hover:shadow-xl hover:bg-accent/90'
                          : 'border-2 border-accent/40 text-accent hover:border-accent hover:bg-accent/10'
                      }`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={400}>
              <div className="mt-12 text-center">
                <p className="text-white/70">
                  ¿Necesitás algo más avanzado?{' '}
                  <a
                    href={waLink('Hola, necesito un plan personalizado para mi negocio.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent hover:underline text-glow-gold"
                  >
                    Hablamos por WhatsApp
                  </a>
                </p>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section id="faq" className="py-20 relative overflow-hidden">
          <Container>
            <div className="mx-auto max-w-3xl">
              <FadeIn>
                <div className="mb-12 text-center">
                  <h2 className="text-3xl text-white md:text-4xl text-glow">
                    Preguntas frecuentes
                  </h2>
                </div>
              </FadeIn>

              <div
                className="divide-y-2 divide-primary/40 rounded-2xl border-2 px-6 backdrop-blur-sm"
                style={{
                  borderColor: '#7834C0',
                  backgroundColor: 'rgba(76, 44, 115, 0.55)',
                }}
              >
                {FAQS.map((faq, idx) => (
                  <FadeIn key={idx} delay={idx * 50}>
                    <FAQItem question={faq.question} answer={faq.answer} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden py-20 text-white"
          style={{
            // Solid #4C2C73 — no gradients per spec
            backgroundColor: '#4C2C73',
            // Subtle cyber grid overlay
            backgroundImage:
              "linear-gradient(rgba(120, 52, 192, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 52, 192, 0.18) 1px, transparent 1px)",
            backgroundSize: '32px 32px',
          }}
        >
          {/* Decorative pixel glyph — corners */}
          <img
            src="/decor/pixel-glyph.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-8 top-8 hidden w-32 opacity-40 lg:block"
          />
          <img
            src="/decor/pixel-glyph.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 left-8 hidden w-24 rotate-180 opacity-30 lg:block"
          />
          <Container>
            <FadeIn>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl text-white md:text-4xl text-glow">
                  ¿Tenés dudas?
                </h2>
                <p className="mt-4 text-lg text-white/85">
                  Escribinos por WhatsApp y te respondemos en minutos.
                </p>
                <a
                  href={waLink('Hola, tengo una pregunta sobre ParaguAI.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-bold text-deep shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:bg-accent/90"
                >
                  <MessageCircle size={18} />
                  Escribir por WhatsApp
                </a>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-brand-300/30 bg-deep py-12 text-white/85">
        <Container>
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-deep text-white shadow-glow">
                  <BrandMark width={16} height={16} />
                </div>
                <span className="font-bold">
                  <span className="text-white">Paragu</span>
                  <span className="text-accent text-glow-gold">AI</span>
                </span>
              </Link>
              <p className="mt-4 text-sm text-white/70">
                Sitios web profesionales para negocios paraguayos. Hecho con 💜 en Asunción.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white">Producto</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/metodo" className="text-white/70 hover:text-accent">Cómo funciona</Link></li>
                <li><Link href="/precios" className="text-white/70 hover:text-accent">Precios</Link></li>
                <li><Link href="/clientes" className="text-white/70 hover:text-accent">Clientes</Link></li>
                <li><Link href="/changelog" className="text-white/70 hover:text-accent">Novedades</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white">Recursos</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/blog" className="text-white/70 hover:text-accent">Blog</Link></li>
                <li><Link href="/faq" className="text-white/70 hover:text-accent">FAQ</Link></li>
                <li><Link href="/contacto" className="text-white/70 hover:text-accent">Contacto</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white">Contacto</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={waLink('Hola, tengo una consulta.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-accent"
                  >
                    WhatsApp
                  </a>
                </li>
                <li><Link href="/admin" className="text-white/70 hover:text-accent">Acceso clientes</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-brand-300/20 pt-8 text-center text-sm text-white/55">
            © {new Date().getFullYear()} ParaguAI. Todos los derechos reservados.
          </div>
        </Container>
      </footer>

      {/* ── Floating WhatsApp ────────────────────────────────────── */}
      <a
        href={waLink('Hola, quiero más información sobre ParaguAI.')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </>
  )
}
