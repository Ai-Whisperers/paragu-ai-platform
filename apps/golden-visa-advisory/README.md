# Golden Visa Advisory — Paraguai

> Market-building advisory firm helping Paraguayan businesses design, structure,
> and position investment products that align with international Golden Visa demand.
>
> Also: direct advisory for foreign investors seeking Paraguayan residency through
> qualified investment vehicles.

## Quick Links

- **Repo:** [TBD — push to Ai-Whisperers]
- **Client:** Raúl Fretes (contact pending)
- **Status:** Site planning phase

## Two-Audience Architecture

The site splits on entry:

| Path | Audience | Purpose |
|------|----------|---------|
| **🛂 Investor Path** | Foreign HNWIs | Convert to lead via Golden Visa landing page |
| **🏢 Business Path** | PY companies (devs, law firms, banks) | Sell advisory services to structure products |

## Site Map

### Entry: Language Selector + Path Choice (modal)

7 languages: EN, ES, PT, FR, IT, DE, NL

### Investor Path (single landing page)

1. Hero — "Your Gateway to Paraguayan Residency"
2. Who We Are — Team bios
3. Track Record — stats
4. Testimonials
5. Process infographic — 5 steps
6. Program comparison table
7. Portuguese success story
8. CTA — consultation booking

### Business Path (multi-page)

1. Who We Are — same team
2. What Is Golden Visa — industry overview
3. Our Services — 4 pillars
4. Chain of Trust — ecosystem diagram
5. Investor Profiles & Needs
6. International Markets & Business Culture
7. FAQ (3 tabs: Developers, Law Firms, Banks)
8. CTA

## Key Client Data (2026-05-04)

### Residency Programs Comparison

| Feature | Temporary Residency | SUACE Program | Investor Pass (NEW) |
|---|---|---|---|
| Type | Temporary (2y) | Immediate Permanent | Immediate Permanent |
| Investment | Income/solvency proof | $70K (10y) / $40K film | $150K tourism / $200K real estate or securities |
| Job Creation | None | 5 local employees | None |
| Presence | No strict minimum (cannot be absent 12+ months) | No strict minimum | Once every 3 years |
| Citizenship | 2y temp → permanent → 3y → citizen | Direct → 3y → citizen | Direct → 3y → citizen |
| Processing | 60–90 days | 90 days–6 months | TBC (newly launched) |
| Best For | Budget-conscious, income-based | Entrepreneurs, business investors | Real estate, passive, securities investors |

### Tech Stack (planned)

- Next.js 15 (App Router)
- TypeScript
- Tailwind 4
- Content: JSON-driven (per language, per path)
- Auth: none (lead gen only)
- Deployment: Docker Swarm + Traefik + Cloudflare
