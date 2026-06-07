# SEO STRATEGY
## Local SEO for Paraguayan Businesses

**Purpose:** Complete SEO strategy for the template — targeting Paraguayan businesses and their customers searching locally in Asunción and across Paraguay.

---

## SEO OVERVIEW

### How Paraguayans Search

| Search Behavior | Data | Implication |
|----------------|------|-------------|
| Google usage | 75%+ of internet users | Focus on Google |
| Mobile-first | 80%+ searches on phone | Mobile-optimized critical |
| Local intent | "near me" searches up 200% | Local SEO essential |
| Spanish queries | 95%+ in Spanish | Spanish content required |
| Voice search | Growing 30%/year | Conversational keywords |

### Search Types by Intent

| Type | Example Query | What They Want |
|------|---------------|----------------|
| Brand | "Belleza Studio Asunción" | Find specific business |
| Local service | "peluquería cerca de mí" | Closeby options |
| Service + location | "corte de pelo Asunción" | Service + city |
| Price-based | "precio tinte pelo Paraguay" | Pricing info |
| Comparison | "mejor peluquería Asunción" | Reviews/rankings |
| Question | "cómo elegir peluquería" | Education |

---

## KEYWORD STRATEGY

### Primary Keywords by Industry

#### Peluquería / Salon de Belleza

| Keyword | Intent | Difficulty | Priority |
|---------|--------|------------|----------|
| peluquería Asunción | Local service | Medium | 🔴 Primary |
| salón de belleza Asunción | Local service | Medium | 🔴 Primary |
| tinte pelo Asunción | Service + location | Low | 🟡 Secondary |
| corte de pelo Asunción | Service + location | Low | 🟡 Secondary |
| peluquería near me | Local | Low | 🔴 Primary |
| mejor peluquería Asunción | Comparison | Medium | 🟡 Secondary |
| precio peluquería Paraguay | Price | Low | 🟡 Secondary |

#### Restaurante

| Keyword | Intent | Difficulty | Priority |
|---------|--------|------------|----------|
| restaurante Asunción | Local service | High | 🔴 Primary |
| dónde comer Asunción | Local service | Medium | 🟡 Secondary |
| mejor restaurante Asunción | Comparison | High | 🟡 Secondary |
| restaurante japonÃ©s Asunción | Cuisine + location | Low | 🟡 Secondary |
| cumpleaños Asunción restaurante | Event + location | Low | 🟡 Secondary |

#### Gimnasio

| Keyword | Intent | Difficulty | Priority |
|---------|--------|------------|----------|
| gimnasio Asunción | Local service | High | 🔴 Primary |
| gym near me Asunción | Local | Low | 🔴 Primary |
| mejor gimnasio Asunción | Comparison | Medium | 🟡 Secondary |
| clases yoga Asunción | Service + location | Low | 🟡 Secondary |
| mensualidad gimnasio Paraguay | Price | Low | 🟡 Secondary |

### Long-Tail Keywords (Lower Difficulty)

| Keyword | Intent | Why It Converts |
|---------|--------|-----------------|
| dónde hacer tinte pelo economico Asunción | Price + location | High purchase intent |
| peluquería que abre sábado Asunción | Availability | Immediate need |
| gimnasio con clases早晚 Asunción | Specific need | Very qualified lead |
| restaurante privado para parejas Asunción | Specific occasion | High intent |
| peluquería que usa Wella Asunción | Brand preference | Trust signal |

### Question Keywords (Featured Snippets)

| Question | Answer Format | Target |
|----------|---------------|--------|
| "¿Cuánto cuesta un tinte en Asunción?" | Price list | FAQ page |
| "¿Cómo elegir una peluquería?" | Guide | Blog post |
| "¿Qué horarios tienen las peluquerías?" | Hours | FAQ + business |
| "¿Dónde hay peluquerías cerca de mí?" | Map + list | Local pack |

---

## ON-PAGE SEO CHECKLIST

### Every Page Must Have

| Element | Requirement | Example |
|---------|-------------|---------|
| Title tag | 50-60 chars, keyword first | "Peluquería Asunción — Belleza Studio" |
| Meta description | 150-160 chars, CTA | "Reservá online tu turno en Belleza Studio. Peluquería profesional en Asunción con más de 10 años de experiencia." |
| H1 | One per page, keyword included | "Reservá tu turno en Belleza Studio" |
| H2-H6 | Logical hierarchy | "Servicios", "Coloración", "Corte Dama" |
| URL | Short, hyphenated, readable | /servicios/coloracion/ |
| Images | Alt text descriptive | "Profesional aplicando tinte en cabello rubio" |
| Internal links | 2-4 per page minimum | Link to related services |
| Content length | 300+ words minimum | Add value beyond obvious |

### Page-Specific Requirements

#### Homepage

- Title: "[Business Name] — [Service/Location]"
- H1: Your unique value proposition
- Include: Services overview, location, hours, contact
- Schema: LocalBusiness + Organization

#### Services Pages

- Title: "[Service Name] en Asunción | [Business Name]"
- H1: "[Service Name] profesional en [City]"
- Include: Description, price range, duration, process
- Schema: Service

#### About Page

- Title: "Sobre Nosotros | [Business Name]"
- H1: Your story + credentials
- Include: Team, experience, differentiation
- Schema: AboutPage + Person (founder)

#### Contact Page

- Title: "Contacto | [Business Name]"
- H1: "Contactanos"
- Include: Form, phone, WhatsApp, address, map
- Schema: LocalBusiness (repeat)

#### Blog Posts

- Title: "[Post Title] | [Business Name]"
- H1: Post title
- Include: Author, date, category, tags
- Schema: Article

---

## TECHNICAL SEO

### Required for All Sites

| Item | Status | Notes |
|------|--------|-------|
| SSL (HTTPS) | ✅ Included | Required for rankings |
| Mobile responsive | ✅ Included | Google-first indexing |
| Page speed < 3s | ✅ Target | Core Web Vitals |
| Canonical URLs | ✅ Required | Prevent duplicate content |
| XML sitemap | ✅ Auto-generated | /sitemap.xml |
| Robots.txt | ✅ Configured | Allow all crawlers |
| Favicon | ⬜ Client to provide | 32x32 PNG minimum |
| 404 page | ✅ Included | Custom 404 |

### Schema.org Markup

The template generates this automatically:

#### LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Belleza Studio",
  "image": "https://example.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. España 1234",
    "addressLocality": "Asunción",
    "addressCountry": "PY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -25.2637,
    "longitude": -57.5759
  },
  "telephone": "+595 21 123 456",
  "url": "https://bellezastudio.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
}
```

#### Service Schema (for service pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Tinte de pelo profesional",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Belleza Studio"
  },
  "areaServed": {
    "@type": "City",
    "name": "Asunción"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de coloración",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tinte completo"
        },
        "price": "150000",
        "priceCurrency": "PYG"
      }
    ]
  }
}
```

#### FAQ Schema (for FAQ page)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo reservo una cita?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Podés reservar a través de nuestra página web, por WhatsApp, o llamando al +595 21 123 456."
      }
    }
  ]
}
```

### Sitemap Structure

```
/sitemap.xml
├── / (homepage)
├── /servicios/
├── /servicios/[service-category]/
├── /contacto/
├── /nosotros/
├── /faq/
├── /blog/
├── /blog/[post-slug]/
├── /ofertas/
├── /reserva/
├── /tienda/ (if ecommerce)
└── /tarjetas-de-regalo/
```

---

## LOCAL SEO STRATEGY

### Google Business Profile Optimization

**Critical for local businesses.** Setup checklist:

| Task | Priority | Notes |
|------|---------|-------|
| Create/claim Business Profile | 🔴 | business.google.com |
| Verify by postcard or phone | 🔴 | Required for full features |
| Complete every field | 🔴 | More fields = more trust |
| Add website URL | 🔴 | Your new website! |
| Upload photos weekly | 🟡 | GBP shows 3 most recent |
| Get Google reviews | 🔴 | Ask happy clients |
| Respond to ALL reviews | 🔴 | Positive and negative |
| Update hours for holidays | 🟡 |提前告知 |
| Add services | 🟡 | Full service list |

### NAP Consistency (Name, Address, Phone)

**Must be identical everywhere:**

| Platform | Name | Address | Phone |
|----------|------|---------|-------|
| Website | Belleza Studio | Av. España 1234, Asunción | +595 21 123 456 |
| Google Business | Belleza Studio | Av. España 1234, Asunción | +595 21 123 456 |
| Facebook | Belleza Studio PY | Av. España 1234, Asunción | +595 21 123 456 |
| Instagram | @bellezastudio | — | +595 21 123 456 |
| Yelp | Belleza Studio | Av. España 1234 | +595 21 123 456 |

**Inconsistency = ranking penalty**

### Local Citation Building

Priority directories for Paraguay:

| Directory | Priority | Link Type |
|----------|----------|-----------|
| Google Business Profile | 🔴 | Official |
| Facebook | 🔴 | Social |
| Instagram | 🟡 | Social |
| Yelp | 🟡 | Review |
| Paginasamarillas.com.py | 🟡 | Local |
|索引PY.com | 🟡 | Local |
| TripAdvisor (restaurants) | 🟡 | Industry |

---

## CONTENT STRATEGY FOR SEO

### Blog Content Ideas by Industry

#### Peluquerías

| Post Topic | Keyword Targeted | Purpose |
|-----------|-----------------|---------|
| "¿Cuánto cuesta un tinte en Asunción 2026?" | precio tinte Asunción | Lead gen |
| "Cómo preparar tu cabello para un tinte" | preparar cabello tinte | SEO + value |
| "Tinte rubio: Qué considerar antes de hacerlo" | tinte rubio Asunción | SEO |
| "Cuidados después de la coloración" | cuidados pelo teñido | SEO |
| "5 señales de que tu peluquería es profesional" | mejor peluquería Asunción | Trust building |

#### Restaurantes

| Post Topic | Keyword Targeted | Purpose |
|-----------|-----------------|---------|
| "¿Cuánto sale comer en un restaurante Asunción?" | precio restaurante Asunción | Lead gen |
| "Los 10 restaurantes más románticos de Asunción" | restaurante romántico Asunción | SEO + backlinks |
| "Menú parrillero: Qué pedir en Paraguay" | restaurante Asunción | SEO |
| "Cómo elegir un restaurante para cumpleaños" | restaurante cumpleaños Asunción | SEO |
| "Receta del bife de chorizo paraguayo" | asado paraguayo | SEO + local |

### Content Publishing Schedule

| Frequency | What | Why |
|-----------|------|-----|
| Weekly | 1 new blog post | Fresh content for Google |
| Monthly | Update 2 older posts | Keep content current |
| Quarterly | Review keywords | Search behavior changes |
| As needed | Respond to trends | "Día del Amigo", holidays |

### Content Quality Guidelines

**For every blog post:**

- 800+ words minimum
- Original insights (not rehash of other posts)
- Images with alt text
- Internal links to 2-3 other pages
- Clear H1, H2 structure
- Conclusion with CTA
- Author attribution

---

## OFF-PAGE SEO

### Link Building Strategy

| Tactic | Priority | Effort | Impact |
|--------|----------|--------|--------|
| Google Business Profile | 🔴 | Low | High |
| Client reviews | 🔴 | Medium | High |
| Facebook/Instagram | 🟡 | Low | Medium |
| Local directories | 🟡 | Medium | Medium |
| Guest posts on local blogs | 🟡 | High | Medium |
| PR/news coverage | 🟢 | High | High |

### Getting Reviews

**Review acquisition flow:**

1. **At booking confirmation** — "If you enjoyed your visit, we'd love a review on Google"
2. **At checkout** — QR code linking to Google review
3. **Via WhatsApp** — Direct link to review page
4. **Email follow-up** — Review request 24h after visit

**Review response templates:**

**Positive review:**
> "¡Gracias [Name]! Nos alegra saber que disfrutaste tu experiencia. ¡Te esperamos pronto! 💇‍♀️"

**Negative review:**
> "Hola [Name], gracias por tu feedback. Lamentamos que no fue la experiencia que esperabas. Por favor contactanos por WhatsApp para resolverlo directamente. — Belleza Studio"

---

## SEO PERFORMANCE METRICS

### What to Track Monthly

| Metric | Tool | Target |
|--------|------|--------|
| Organic traffic | GA4 | +10% MoM |
| Google rankings (target keywords) | Search Console | Top 10 |
| Click-through rate (CTR) | Search Console | > 3% |
| Index coverage | Search Console | 100% valid |
| Core Web Vitals | PageSpeed Insights | All green |
| Backlinks | Ahrefs/Moz | Growing |
| Google Business impressions | GBP | +10% MoM |
| Google Business actions | GBP | Growing |

### Ranking Report Template

```
# SEO Ranking Report — [Month]

## Traffic Overview
- Organic sessions: [X] (+/-% MoM)
- Total keywords ranked: [X]
- Keywords in top 10: [X]

## Top Performing Keywords
| Keyword | Position | Traffic |
|---------|----------|---------|
| [Keyword 1] | #X | X |
| [Keyword 2] | #X | X |
| [Keyword 3] | #X | X |

## Keyword Movement
| Keyword | Last Month | This Month | Change |
|---------|------------|-------------|--------|
| [Keyword] | #X | #X | +/-X |

## Technical Issues
- [ ] Page speed: [score]
- [ ] Mobile usability: [Pass/Fail]
- [ ] Sitemap: [Working/Broken]
- [ ] Schema: [Valid/Errors]

## Action Items for Next Month
1. [Action 1]
2. [Action 2]
3. [Action 3]
```

---

## PARAGUAY-SPECIFIC SEO NOTES

### Cultural Considerations

- **Guaraní influence:** Some users search in Guaraní-influenced Spanish ("dónde hay" vs "dónde hay")
- **"Asunción" vs "Asuncion" vs " Asunción":** Always include proper accent
- **Informal tone:** Paraguayans are casual — content can be less formal than Spain Spanish
- **Price sensitivity:** Paraguayan searches are often price-focused — include pricing when possible
- **WhatsApp integration:** Unique to Paraguay market — mention in content ("Reservá por web o WhatsApp")

### Common Mistakes to Avoid

| Mistake | Why It Hurts | Fix |
|---------|--------------|-----|
| Duplicate meta descriptions | Confuses Google | Write unique for every page |
| Thin content | Low rankings | 300+ words per page minimum |
| No local keywords | No local visibility | Include "Asunción", "Paraguay" |
| Ignoring Google Business | Missed local pack | Complete + verify + maintain |
| Slow page speed | Mobile users leave | Optimize images, use CDN |
| No reviews | Low trust signal | Ask for them actively |
| Blocking Googlebot | Can't index | Check robots.txt |

---

## SEO QUICK WIN CHECKLIST

For new client sites, implement in order:

### Week 1 (Critical)

- [ ] Google Business Profile created + verified
- [ ] Basic meta tags set on homepage
- [ ] Schema LocalBusiness implemented
- [ ] Sitemap submitted to Google
- [ ] Google Analytics + Search Console connected

### Week 2 (Important)

- [ ] Service pages optimized with keywords
- [ ] Google Business Profile fully completed (all fields)
- [ ] First 3 blog posts drafted
- [ ] Internal linking structure in place
- [ ] NAP consistent everywhere

### Week 3-4 (Ongoing)

- [ ] Weekly blog posting schedule established
- [ ] Review acquisition flow active
- [ ] First review requests sent
- [ ] Social profiles linked to website
- [ ] Local directory citations started

---

*Document version: 1.0*
*Use: SEO strategy, local optimization*
*Last updated: June 2, 2026*