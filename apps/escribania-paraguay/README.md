# Escribanía Paraguay

Sitio web profesional para una escribanía (notary office) en Paraguay. Construido con Next.js 16 App Router, Tailwind v4 y Docker Swarm.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript 5 + React 19
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Icons:** lucide-react
- **Fonts:** Playfair Display (headings), Lora (body), Inter (accent)
- **Deploy:** Docker Swarm + Traefik en VPS

## Estructura

```
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout con fonts + metadata
│   ├── globals.css                 # Tailwind v4 + theme tokens
│   ├── sitemap.ts                  # Sitemap dinámico multi-idioma
│   ├── robots.ts                   # Robots.txt
│   ├── servicios/
│   │   ├── page.tsx                # Listado de servicios
│   │   └── [slug]/page.tsx         # Detalle de servicio (SSG)
│   ├── nosotros/page.tsx           # About / equipo
│   ├── contacto/page.tsx           # Página de contacto
│   ├── faq/page.tsx                # Preguntas frecuentes
│   └── privacidad/page.tsx         # Política de privacidad
├── components/
│   ├── header.tsx                  # Nav sticky con scroll effect
│   ├── hero.tsx                    # Hero section (dark/light)
│   ├── footer.tsx                  # Footer multi-columna
│   ├── services-preview.tsx        # Grid de servicios en home
│   ├── service-categories.tsx      # Categorías de servicios
│   ├── service-detail-hero.tsx     # Hero para detalle de servicio
│   ├── service-benefits.tsx        # Beneficios en detalle
│   ├── service-items-list.tsx      # Lista de items en detalle
│   ├── service-process.tsx         # Proceso en detalle
│   ├── stats-section.tsx           # Estadísticas (home)
│   ├── trust-section.tsx           # Sección de confianza (home)
│   ├── process-section.tsx         # Proceso paso a paso (home)
│   ├── testimonials-section.tsx    # Testimonios (home)
│   ├── faq-section.tsx             # FAQ accordion (home)
│   ├── faq-categories.tsx          # FAQ categorizado (faq page)
│   ├── contact-section.tsx         # CTA contacto (home)
│   ├── contact-info.tsx            # Info de contacto (contacto page)
│   ├── contact-form-section.tsx    # Formulario (contacto page)
│   ├── intro-section.tsx           # Texto introductorio simple
│   ├── about-intro.tsx             # About con visión/misión
│   ├── values-section.tsx          # Grid de valores
│   ├── team-section.tsx            # Grid del equipo
│   ├── privacy-content.tsx         # Contenido de privacidad
│   ├── cta-banner.tsx              # CTA banner reutilizable
│   ├── whatsapp-float.tsx          # Botón WhatsApp flotante
│   └── animations/scroll-reveal.tsx # Scroll reveal animation
├── content/
│   ├── es.json                     # Todo el contenido en español
│   ├── site.json                   # Configuración del sitio
│   ├── pages.json                  # Definición de secciones por página
│   └── pages/servicios.json        # Datos de servicios individuales
├── public/
│   ├── favicon.svg
│   └── opengraph-image.svg
├── Dockerfile                      # 3-stage alpine build
└── docker-compose.yml              # Swarm-compatible deploy
```

## Páginas (11 rutas)

- `/` — Home con hero, stats, servicios, confianza, proceso, testimonios, FAQ, CTA
- `/servicios` — Todos los servicios notariales
- `/servicios/[slug]` — Detalle de cada servicio (6: escrituras, poderes, contratos, legalizaciones, sucesiones, societario)
- `/nosotros` — Sobre la escribanía + equipo
- `/contacto` — Formulario de contacto + info
- `/faq` — Preguntas frecuentes categorizadas
- `/privacidad` — Política de privacidad

## Build & Deploy

```bash
# Local dev
npm install
npm run dev

# Build
npm run build

# Docker
docker build -t escribania-paraguay:prod .
docker stack deploy -c docker-compose.yml escribania
```
