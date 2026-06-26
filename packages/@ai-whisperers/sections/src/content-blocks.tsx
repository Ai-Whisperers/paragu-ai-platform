'use client'

import React from 'react'
import { SectionComponentProps } from './types'
import { resolveImage } from './resolve-content'

import {
  Award,
  BadgeCheck,
  Banknote,
  Briefcase,
  BriefcaseBusiness,
  Building,
  Building2,
  Calculator,
  Calendar,
  Check,
  ClipboardCheck,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  Globe,
  Heart,
  House,
  KeyRound,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Plane,
  Search,
  Shield,
  ShieldCheck,
  Sprout,
  Stamp,
  Star,
  Sun,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react'
export function TrustSection({ pageContent, data, images }: SectionComponentProps) {
  // Handle both data shapes: pageContent can be { trust: {...} } or the data directly
  const c = pageContent.trust || (pageContent.items ? pageContent : {}) || data || {}
  if (!c.items?.length) return null

  // Map common icon names to Lucide components.
  // Falls back to a meaningful default if not specified.
  const ICONS: Record<string, any> = {
    FileText, Stamp, FileCheck, ClipboardCheck,
    CreditCard, UserCheck, BadgeCheck,
    Building2, Briefcase, Banknote, Landmark,
    Package, Plane, Heart, Shield, ShieldCheck,
    Users, UserPlus, MapPin, Clock, Calendar,
    Check, Award, Star, Globe,
    Phone, Mail, MessageCircle,
  }
  const getIcon = (name?: string) => {
    if (!name) return ShieldCheck
    return ICONS[name] || ICONS[name.charAt(0).toUpperCase() + name.slice(1)] || ShieldCheck
  }

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs text-text-muted uppercase tracking-[3px] mb-3">{c.eyebrow}</p>
          <h2 className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-playfair font-bold text-primary mb-4 leading-tight">
            {c.title}
          </h2>
          {c.subtitle && (
            <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">{c.subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {c.items.map((item: any, i: number) => {
            const img = resolveImage(images, item.image)
            const IconComp = getIcon(item.icon)
            const num = String(i + 1).padStart(2, '0')
            return (
              <div
                key={i}
                className="group relative bg-surface-alt rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-primary/20"
              >
                {img ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
                    <img
                      src={img}
                      alt={item.title}
                      loading="lazy"
                      width={400}
                      height={250}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-primary text-accent font-bold text-sm flex items-center justify-center shadow-md">
                      {num}
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <IconComp className="w-16 h-16 text-accent/90" strokeWidth={1.5} />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-accent text-primary font-bold text-sm flex items-center justify-center shadow-md">
                      {num}
                    </div>
                  </div>
                )}

                <div className="p-6 text-center">
                  {/* Big stat number (when data has value+label) */}
                  {item.value && (
                    <div className="text-5xl font-bold text-accent mb-2 leading-none tabular-nums">
                      {item.value}
                    </div>
                  )}
                  {/* Standard title/description */}
                  {item.title && !item.value && (
                    <h3 className="font-bold text-primary mb-3 text-lg leading-snug">
                      {item.title}
                    </h3>
                  )}
                  {/* Label/description */}
                  {(item.label || item.description) && (
                    <p className={`leading-relaxed text-[0.95rem] ${item.value ? 'text-text-muted font-medium' : 'text-text-muted'}`}>
                      {item.label || item.description}
                    </p>
                  )}
                </div>

                <div className="h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


export function ServicesSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const services = d.services || {}
  const eyebrow = services.eyebrow || d.eyebrow
  const title = services.title || d.title
  const subtitle = services.subtitle || d.subtitle
  const groups = services.groups || d.groups || []
  const ctaText = services.ctaText || d.ctaText
  const ctaHref = services.ctaHref || d.ctaHref

  if (!groups.length) return null

  // Map icon names → Lucide components (with safe fallback)
  const ICONS: Record<string, any> = {
    FileText, Stamp, FileCheck, ClipboardCheck,
    CreditCard, UserCheck, BadgeCheck,
    Building, Building2, Briefcase, Banknote, Landmark, Calculator,
    House,
    Search, Shield, ShieldCheck,
    KeyRound, Package, Plane, Heart,
    Users, UserPlus, MapPin, Clock, Calendar,
    Check, Award, Star, Globe, TrendingUp,
    Phone, Mail, MessageCircle,
  }
  const getIcon = (name?: string) => {
    if (!name) return ShieldCheck
    return ICONS[name] || ICONS[name.charAt(0).toUpperCase() + name.slice(1)] || ShieldCheck
  }

  // Group icons (bigger, more prominent)
  const GROUP_ICONS: Record<string, any> = {
    residency: Stamp,
    banking: Landmark,
    realestate: House,
    real_estate: House,
    property: House,
  }

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          {eyebrow && (
            <p className="text-xs text-text-muted uppercase tracking-[3px] mb-3">{eyebrow}</p>
          )}
          {title && (
            <h2 className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-playfair font-bold text-primary mb-4 leading-tight max-w-3xl mx-auto">
              {title}
            </h2>
          )}
          <div className="w-[60px] h-[3px] bg-accent mx-auto mb-6" />
          {subtitle && (
            <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* Service groups */}
        <div className="space-y-16">
          {groups.map((group: any, gi: number) => {
            const GroupIcon = GROUP_ICONS[group.id] || Stamp
            return (
              <div key={gi} className="relative">
                {/* Group header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 mb-3">
                    <span className="text-xs text-text-muted font-mono uppercase tracking-wider">
                      {String(gi + 1).padStart(2, '0')} / {String(groups.length).padStart(2, '0')}
                    </span>
                    <span className="w-8 h-[1px] bg-accent/40" />
                    <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                      {group.title}
                    </span>
                  </div>
                  {group.subtitle && (
                    <p className="text-text-muted text-base max-w-xl mx-auto">{group.subtitle}</p>
                  )}
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((item: any, i: number) => {
                    const IconComp = getIcon(item.icon)
                    return (
                      <div
                        key={i}
                        className="group relative bg-surface-alt rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent/30"
                      >
                        {/* Icon + title */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/8 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-accent transition-all duration-300">
                            <IconComp className="w-5 h-5" strokeWidth={2} />
                          </div>
                          <h3 className="font-bold text-primary text-base leading-tight pt-2">
                            {item.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-text-muted text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Benefits */}
                        {item.benefits && item.benefits.length > 0 && (
                          <ul className="space-y-2 pt-3 border-t border-border/40">
                            {item.benefits.map((b: string, j: number) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-text-muted leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" strokeWidth={3} />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Per-item CTA */}
                        {item.ctaText && (
                          <a
                            href={item.ctaHref}
                            className="inline-flex items-center gap-1 mt-4 text-accent font-semibold text-xs hover:gap-2 transition-all"
                          >
                            {item.ctaText}
                            <span>→</span>
                          </a>
                        )}

                        {/* Accent gradient on hover */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-xl" />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        {ctaText && ctaHref && (
          <div className="text-center mt-16 pt-12 border-t border-border/30">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {ctaText}
              <span className="text-lg">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}


export function ProcessSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.process || {}
  if (!c.steps?.length) return null
  return (
    <section className="py-20 bg-surface-alt">
      <div className="max-w-[900px] mx-auto text-center px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{c.eyebrow}</p>
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold text-primary mb-2">{c.title}</h2>
        {c.totalDuration && <div className="inline-block px-6 py-2 bg-accent/10 border border-accent rounded-full text-accent font-semibold mb-8">{c.totalDuration}</div>}
        <div className="relative pl-8 text-left">
          {c.steps.map((step: any, i: number) => {
            const stepImg = step.image?.$img ? resolveImage(images, `@img:${step.image.$img}`) : ''
            return (
              <div key={i} className="relative p-5 mb-4 bg-white rounded-lg shadow-card border-l-[3px] border-accent">
                <div className="absolute -left-[33px] top-4 w-9 h-9 bg-primary rounded-full border-[3px] border-accent flex items-center justify-center text-white text-xs font-bold"
                  style={{ boxShadow: '0 0 0 4px rgba(201,169,110,0.15)' }}
                >{step.number}</div>
                {stepImg && <img src={stepImg} alt={step.title} loading="lazy" width={180} height={120} className="w-[180px] h-[120px] object-cover rounded-lg mb-3 shadow-md" />}
                <h3 className="font-bold font-playfair text-primary mb-1 text-lg">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-1">{step.description}</p>
                {step.duration && <span className="inline-block text-xs text-accent font-semibold px-3 py-1 bg-accent/10 rounded-full mt-1">{step.duration}</span>}
              </div>
            )
          })}
        </div>
        {c.ctaLabel && <a href={c.ctaHref} className="inline-block mt-8 px-8 py-3 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline">{c.ctaLabel}</a>}
      </div>
    </section>
  )
}

export function ServiceDetailSection({ pageContent, data, images }: SectionComponentProps) {
  // Handle multiple data shapes:
  // 1. pageContent is { groups: [...], finalCta: {...} } directly
  // 2. pageContent is { services: { groups: [...], ... } } - nested
  // 3. data passed separately
  const container = data || pageContent || {}
  const servicesWrapper = container.services || {}
  const d = {
    eyebrow: container.eyebrow || servicesWrapper.eyebrow,
    title: container.title || servicesWrapper.title,
    groups: container.groups || servicesWrapper.groups || [],
    finalCta: container.finalCta || servicesWrapper.finalCta || container.cta || servicesWrapper.cta || null,
  }
  const groups = d.groups
  const cta = d.finalCta
  if (!groups.length) return null
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto text-center px-4">
        {d.eyebrow && <p className="text-xs text-text-muted uppercase tracking-[3px] mb-3">{d.eyebrow}</p>}
        {d.title && <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-playfair font-bold text-primary mb-4 leading-tight">{d.title}</h2>}
        <div className="w-[60px] h-[3px] bg-accent mx-auto mb-10" />

        {groups.map((group: any, gi: number) => {
          const groupNum = String(gi + 1).padStart(2, '0')
          const total = String(groups.length).padStart(2, '0')
          const accent = group.accentColor || '#C9A96E'
          return (
            <div key={gi} className="mb-16 last:mb-0">
              {/* Group header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 mb-3">
                  <span
                    className="inline-block px-3 py-1 text-xs font-bold rounded-full"
                    style={{ background: accent + '15', color: accent }}
                  >
                    {groupNum} / {total}
                  </span>
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-primary mb-2 leading-tight">
                  {group.title}
                </h3>
                {group.subtitle && (
                  <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">
                    {group.subtitle}
                  </p>
                )}
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                {group.items.map((item: any, j: number) => {
                  const img = resolveImage(images, item.image)
                  const itemNum = `${groupNum}.${String(j + 1).padStart(2, '0')}`
                  return (
                    <div
                      key={j}
                      className="group relative p-6 bg-white rounded-2xl border border-border/50 hover:border-accent/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Top accent gradient on hover */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                        style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
                      />

                      {/* Item number badge */}
                      <div
                        className="absolute top-4 right-4 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: accent + '15', color: accent }}
                      >
                        {itemNum}
                      </div>

                      {/* Image */}
                      {img && (
                        <div className="overflow-hidden rounded-lg mb-4 -mx-2">
                          <img
                            src={img}
                            alt={item.title}
                            loading="lazy"
                            width={400}
                            height={160}
                            className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}

                      {/* Title + description */}
                      <h4 className="font-bold text-primary text-base mb-2 group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-text-muted text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Benefits */}
                      {item.benefits && item.benefits.length > 0 && (
                        <ul className="space-y-1.5 mt-2 flex-grow">
                          {item.benefits.map((b: string, k: number) => (
                            <li key={k} className="text-xs text-text-muted flex gap-2 items-start leading-relaxed">
                              <Check className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2.5} style={{ color: accent }} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Item CTA */}
                      {item.ctaText && item.ctaHref && (
                        <a
                          href={item.ctaHref}
                          className="inline-flex items-center gap-1 mt-4 text-xs font-bold no-underline border-b-2 hover:gap-2 transition-all duration-200"
                          style={{ color: accent, borderColor: accent }}
                        >
                          {item.ctaText} <span>→</span>
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Final CTA at the bottom */}
        {cta && (cta.title || cta.ctaText) && (
          <div className="mt-16 pt-12 border-t border-border/40">
            {cta.eyebrow && (
              <p className="text-xs text-text-muted uppercase tracking-[3px] mb-3">{cta.eyebrow}</p>
            )}
            {cta.title && (
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
                {cta.title}
              </h3>
            )}
            {cta.subtitle && (
              <p className="text-text-muted max-w-2xl mx-auto leading-relaxed mb-8">
                {cta.subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {cta.ctaText && cta.ctaHref && (
                <a
                  href={cta.ctaHref}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 hover:shadow-xl hover:scale-[1.03] transition-all duration-200 no-underline"
                >
                  {cta.ctaText} <span>→</span>
                </a>
              )}
              {cta.secondaryCtaText && cta.secondaryCtaHref && (
                <a
                  href={cta.secondaryCtaHref}
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary rounded-full font-semibold text-base hover:bg-primary hover:text-white transition-all duration-200 no-underline"
                >
                  {cta.secondaryCtaText}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function PillarsSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  // Handle both data shapes: d.pillars can be an array (raw list) or
  // an object with .pillars key (wrapper with eyebrow/title/pillars)
  let pillars: any[] = []
  if (Array.isArray(d.pillars)) pillars = d.pillars
  else if (Array.isArray(d.pillars?.pillars)) pillars = d.pillars.pillars
  else if (Array.isArray(d.items)) pillars = d.items
  
  // If wrapper, extract the meta fields from it for the section header
  const wrapper = !Array.isArray(d.pillars) && d.pillars ? d.pillars : null
  const eyebrow = d.eyebrow || wrapper?.eyebrow
  const title = d.title || wrapper?.title
  const honestNote = d.honestNote || wrapper?.honestNote
  
  if (!pillars.length) return null
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-6xl mx-auto text-center px-4">
        {eyebrow && <p className="text-xs text-accent uppercase tracking-[2px] mb-2">{eyebrow}</p>}
        {title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold mb-3">{title}</h2>}
        <div className="w-[60px] h-[3px] bg-accent mx-auto mb-8" />
        {honestNote && <p className="text-sm text-white/80 italic max-w-[600px] mx-auto mb-8">{d.honestNote}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p: any, i: number) => {
            const img = resolveImage(images, p.imageUrl || p.image)
            // Try to resolve icon name to a Lucide component
            const ICON_MAP: Record<string, any> = {
              Award, BadgeCheck, Banknote, Briefcase, BriefcaseBusiness, Building, Building2,
              Calculator, Calendar, ClipboardCheck, Clock, CreditCard, FileCheck, FileText,
              Globe, Heart, Home: House, House, KeyRound, Landmark, Mail, MapPin,
              MessageCircle, Package, Phone, Plane, Search, Shield, ShieldCheck, Sprout,
              Stamp, Star, Sun, TrendingUp, UserCheck, UserPlus, Users,
            }
            const IconComp = p.icon ? ICON_MAP[p.icon] || ICON_MAP[p.icon.charAt(0).toUpperCase() + p.icon.slice(1)] || null : null
            return (
              <div key={i} className="group relative p-6 rounded-2xl text-left backdrop-blur-[10px] bg-white/[0.04] hover:bg-white/[0.08] border border-accent/15 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,169,110,0.15)] transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                {/* Numbered badge */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center">
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Icon or image */}
                {IconComp ? (
                  <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6 text-accent" strokeWidth={1.8} />
                  </div>
                ) : img ? (
                  <img src={img} alt={p.title} loading="lazy" width={600} height={180} className="w-full h-[140px] object-cover rounded-lg mb-4 transition-transform duration-500 group-hover:scale-105" />
                ) : null}
                <h3 className="font-bold text-accent mb-2 text-base leading-tight">{p.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{p.description}</p>
                {p.bullets && <ul className="mt-3 space-y-1">
                  {p.bullets.map((b: string, j: number) => (
                    <li key={j} className="text-xs text-white/70 flex gap-1.5 items-start leading-snug">
                      <span className="text-accent shrink-0 mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ProgramsSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.programs || {}
  if (!c.tiers?.length) return null
  return (
    <section className="py-20 bg-surface-alt">
      <div className="max-w-[1100px] mx-auto text-center px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{c.eyebrow}</p>
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold text-primary mb-2">{c.title}</h2>
        <p className="text-text-muted mb-8">{c.subtitle}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {c.tiers.map((tier: any, i: number) => {
            const tierImg = tier.image?.$img ? resolveImage(images, `@img:${tier.image.$img}`) : ''
            return (
              <div key={i}
                className={`relative p-8 rounded-2xl transition-all ${tier.highlighted ? 'bg-primary text-white scale-[1.04] shadow-[0_8px_30px_rgba(27,42,74,0.18)] -mt-2' : 'bg-white text-primary shadow-card border border-border'}`}
                style={{ border: tier.highlighted ? '2px solid #C9A96E' : undefined }}
              >
                {tier.badge && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-primary rounded-full text-xs font-bold">{tier.badge}</span>}
                {tierImg && <img src={tierImg} alt={tier.name} width={400} height={140} className="w-full h-[140px] object-cover rounded-sm mb-4" />}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-sm opacity-80 mb-3">{tier.description}</p>
                <div className="text-2xl font-extrabold mb-1">{tier.price}</div>
                <p className="text-xs opacity-70 mb-4">{tier.priceNote}</p>
                <ul className="list-none p-0 m-0 mb-6 text-left">
                  {tier.included?.map((inc: string, j: number) => (
                    <li key={j} className="py-1 text-xs opacity-85 flex items-center gap-2">
                      <span className="text-success font-bold">✓</span> {inc}
                    </li>
                  ))}
                </ul>
                {tier.ctaLabel && <a href={tier.ctaHref} className={`inline-block px-8 py-3 rounded-full font-bold text-sm no-underline ${tier.highlighted ? 'bg-accent text-primary' : 'bg-primary text-white'}`}>{tier.ctaLabel}</a>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection({ pageContent }: SectionComponentProps) {
  const c = pageContent.beneluxDesk || {}
  if (!c.items?.length) return null
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2">{c.title}</h2>
        <p className="text-text-muted mb-8">{c.subtitle}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {c.items.map((item: any, i: number) => (
            <div key={i} className="p-6 border border-border rounded-lg">
              <h4 className="font-bold text-primary mb-2">{item.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function RequirementsSection({ pageContent }: SectionComponentProps) {
  const c = pageContent.requirements || {}
  if (!c.title && !c.basicDocuments) return null
  return (
    <section className="py-20 px-4 bg-surface-alt/50">
      <div className="max-w-4xl mx-auto">
        {c.eyebrow && <p className="text-xs uppercase tracking-widest text-text-muted mb-2 text-center">{c.eyebrow}</p>}
        {c.title && <h2 className="text-2xl font-bold mb-2 text-center">{c.title}</h2>}
        {c.subtitle && <p className="text-text-muted leading-relaxed mb-10 text-center max-w-2xl mx-auto">{c.subtitle}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {c.basicDocuments && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">{c.basicDocuments.title}</h3>
              <ul className="space-y-2">
                {c.basicDocuments.items?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="text-accent mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            {c.importantNotes && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <span className="text-amber-600">⚠</span>
                  {c.importantNotes.title}
                </h3>
                <ul className="space-y-2">
                  {c.importantNotes.items?.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-text-muted">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {c.processedLocally && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  {c.processedLocally.title}
                </h3>
                <ul className="space-y-1">
                  {c.processedLocally.items?.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-text-muted">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {c.residenceTypes && (
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">{c.residenceTypes.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.residenceTypes.types?.map((t: any, i: number) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <h4 className="font-bold mb-1">{t.name}</h4>
                  <p className="text-sm text-text-muted">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(c.mercosur || c.costs) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.mercosur && (
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <h3 className="font-bold text-sm mb-2">{c.mercosur.title}</h3>
                <p className="text-sm text-text-muted">{c.mercosur.description}</p>
              </div>
            )}
            {c.costs && (
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <h3 className="font-bold text-sm mb-2">{c.costs.title}</h3>
                <p className="text-sm text-text-muted">{c.costs.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export function WhyCountrySection({ pageContent, data, images }: SectionComponentProps) {
  // Handle both data shapes: pageContent.whyCountry wrapper OR direct data
  const c = pageContent.whyCountry
    || (pageContent.pillars ? pageContent : null)
    || data?.whyCountry
    || (data?.pillars ? data : null)
    || {}
  if (!c.pillars?.length) return null

  // Map icon names → Lucide components (with safe fallback)
  const ICONS: Record<string, any> = {
    TrendingUp, Landmark, Globe, Shield, ShieldCheck,
    Users, UserPlus, MapPin, Calendar, Clock,
    Briefcase, Building2, Banknote, Award, Star,
    Check, BadgeCheck, CreditCard, Heart, Package,
    Plane, FileText, Stamp, FileCheck, MessageCircle,
    House, Sun, Sprout, BriefcaseBusiness,
  }
  const getIcon = (name?: string) => {
    if (!name) return ShieldCheck
    return ICONS[name] || ICONS[name.charAt(0).toUpperCase() + name.slice(1)] || ShieldCheck
  }

  return (
    <section className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px, 80px 80px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-14">
          <p className="text-xs text-accent uppercase tracking-[3px] mb-3">{c.eyebrow}</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-playfair font-bold mb-4 leading-tight max-w-3xl mx-auto">
            {c.title}
          </h2>
          <div className="w-[60px] h-[3px] bg-accent mx-auto mb-6" />
          {c.subtitle && (
            <p className="text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
              {c.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {c.pillars.map((p: any, i: number) => {
            const img = resolveImage(images, p.imageUrl)
            const IconComp = getIcon(p.icon)
            const num = String(i + 1).padStart(2, '0')
            return (
              <div
                key={i}
                className="group relative rounded-xl text-left overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl backdrop-blur-[10px]"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(201,169,110,0.20)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.20)',
                }}
              >
                {/* Image */}
                {img && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={img}
                      alt={p.title}
                      loading="lazy"
                      width={600}
                      height={375}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    {/* Icon overlay */}
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-accent/95 backdrop-blur flex items-center justify-center shadow-md">
                      <IconComp className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    </div>
                    {/* Number badge */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/95 text-primary font-bold text-sm flex items-center justify-center shadow-md">
                      {num}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-accent mb-3 text-xl">{p.title}</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">{p.description}</p>
                  {p.bullets && (
                    <ul className="space-y-2 pt-3 border-t border-accent/15">
                      {p.bullets.map((b: string, j: number) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/80">
                          <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="leading-snug">{b.replace('{{taxRate}}', c.taxRate || '10%')}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Accent gradient on hover */}
                <div className="h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            )
          })}
        </div>

        {/* CTA */}
        {c.ctaText && c.ctaHref && (
          <div className="text-center mt-12">
            <a
              href={c.ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {c.ctaText}
              <span className="text-lg">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

