#!/usr/bin/env python3
"""Generate 200 template images via FAL fast-sdxl API."""

import requests
import os
import time
import json
from pathlib import Path

FAL_KEY = "9e8fa2bf-657a-46f0-8bad-02744a8af5ad:80c6ad5d2e27de8dfcfd4ebd77253ff3"
BASE_URL = "https://queue.fal.run/fal-ai/fast-sdxl"
HEADERS = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}

IMAGES_DIR = Path("/home/ai-whisperers/site-template/public/images")

# All 200 image prompts organized by category
IMAGES = [
    # HERO (3)
    ("hero/slide-1.png", "professional workspace laptop notepad coffee Asunción Paraguay city skyline through large window warm natural lighting modern office interior Latin American entrepreneur photorealistic 16:9"),
    ("hero/slide-2.png", "diverse group of latin american entrepreneurs in workshop setting whiteboards covered in sticky notes engaged faces collaborative energy modern conference room Asunción Paraguay warm lighting professional approachable atmosphere photorealistic 16:9"),
    ("hero/slide-3.png", "one on one mentorship moment in Asunción office consultant and client reviewing business documents at modern desk warm professional lighting trusting relationship latin american professionals photorealistic 16:9"),

    # SERVICES - ASESORIAS (4)
    ("services/asesoria-1.png", "business consultant reviewing financial documents with Paraguayan client at modern desk professional office Asunción warm lighting collaborative planning session photorealistic portrait style"),
    ("services/asesoria-2.png", "two people shaking hands in professional office setting warm lighting Asunción Paraguay business agreement moment friendly professional atmosphere photorealistic"),
    ("services/asesoria-3.png", "close up of business plan document with pen and glasses strategic planning modern office desk warm lighting Paraguayan business context professional photography style"),
    ("services/asesoria-4.png", "whiteboard covered in business strategy diagrams markers and colorful sticky notes collaborative planning session modern Asunción office photorealistic"),

    # SERVICES - CURSOS (4)
    ("services/cursos-1.png", "group workshop setting with 10 people around table presenter pointing at screen modern training room Asunción Paraguay professional atmosphere photorealistic"),
    ("services/cursos-2.png", "close up of hands taking notes in notebook laptop open focused learning student in modern library Asunción photorealistic warm lighting"),
    ("services/cursos-3.png", "presenter delivering workshop session with slide projection and engaged audience modern conference room Asunción professional lighting photorealistic"),
    ("services/cursos-4.png", "people collaborating on post-it board exercise colorful sticky notes team activity modern workshop space Asunción photorealistic energetic"),

    # SERVICES - PRODUCTOS (4)
    ("services/productos-1.png", "flatlay of laptop showing dashboard with downloadable resources organized files Paraguayan entrepreneur digital products photorealistic"),
    ("services/productos-2.png", "stacks of USB drives and digital product packaging modern desk setup professional Asunción office photorealistic clean aesthetic"),
    ("services/productos-3.png", "screen showing marketing templates and social media mockups digital downloads Paraguayan entrepreneur satisfied photorealistic"),
    ("services/productos-4.png", "person downloading activating digital product on laptop satisfaction and convenience e-commerce moment Asunción photorealistic"),

    # PROCESS (4)
    ("process/step-1-contact.png", "person typing WhatsApp message on smartphone starting first contact Paraguayan entrepreneur modern phone Asunción photorealistic"),
    ("process/step-2-evaluate.png", "calendar with meeting scheduled video call setup evaluation session professional consultant Asunción photorealistic modern"),
    ("process/step-3-plan.png", "business proposal document on tablet collaborative review moment consultant and client planning Asunción photorealistic"),
    ("process/step-4-execute.png", "team executing business tasks growth charts and momentum successful execution Asunción office photorealistic professional"),

    # GALLERY - OFICINA (4)
    ("gallery/oficina-1.png", "modern Asunción office interior natural light plants professional setup clean minimalist aesthetic Paraguayan workspace photorealistic"),
    ("gallery/oficina-2.png", "cozy meeting corner in office with sofa coffee table startup vibe Asunción Paraguay warm lighting photorealistic"),
    ("gallery/oficina-3.png", "standing desk area with motivational whiteboard organized shelves modern Asunción workspace photorealistic professional"),
    ("gallery/oficina-4.png", "team workspace with multiple monitors collaborative atmosphere modern Asunción office photorealistic professional"),

    # GALLERY - TALLERES (4)
    ("gallery/talleres-1.png", "workshop setup before event chairs arranged projector ready name tags Asunción Paraguay professional event space photorealistic"),
    ("gallery/talleres-2.png", "networking event with business cards exchange mingling professionals Asunción Paraguay corporate event photorealistic"),
    ("gallery/talleres-3.png", "certificate ceremony moment graduate holding certificate proud achievement Asunción Paraguay photorealistic celebratory"),
    ("gallery/talleres-4.png", "post workshop group photo all participants celebratory certificates in hand Asunción Paraguay photorealistic professional"),

    # GALLERY - MENTORIA (3)
    ("gallery/mentoria-1.png", "intimate mentoring session mentor and mentee at coffee shop Asunción Paraguay warm atmosphere photorealistic professional"),
    ("gallery/mentoria-2.png", "video call mentorship session two screens professional at home office Asunción Paraguay photorealistic modern"),
    ("gallery/mentoria-3.png", "brainstorming session with notebooks open focused discussion Asunción office consulting photorealistic collaborative"),

    # GALLERY - PRODUCTOS (2)
    ("gallery/productos-1.png", "physical kit delivery with branded envelope package excitement of receiving digital product Asunción photorealistic"),
    ("gallery/productos-2.png", "digital product interface on screen clean dashboard value preview Paraguayan entrepreneur satisfied photorealistic"),

    # GALLERY - EVENTOS (2)
    ("gallery/eventos-1.png", "large conference room with 30+ attendees keynote presentation Asunción Paraguay professional event photorealistic"),
    ("gallery/eventos-2.png", "outdoor networking event Paraguayan flag in background professional gathering Asunción photorealistic warm lighting"),

    # TESTIMONIALS (10)
    ("testimonials/testimonial-1.png", "portrait of woman in 30s warm smile professional but approachable pastel background Asunción Paraguay photorealistic"),
    ("testimonials/testimonial-2.png", "portrait of man in 40s confident expression business casual attire professional Asunción photorealistic"),
    ("testimonials/testimonial-3.png", "portrait of woman 25-30 friendly modern professional natural setting Asunción Paraguay photorealistic"),
    ("testimonials/testimonial-4.png", "portrait of man 35-45 serious but warm experienced entrepreneur look Asunción photorealistic"),
    ("testimonials/testimonial-5.png", "portrait of woman 40s accomplished holding certificate business owner Asunción Paraguay photorealistic"),
    ("testimonials/testimonial-6.png", "portrait of young entrepreneur 20s enthusiastic startup energy Asunción Paraguay photorealistic"),
    ("testimonials/testimonial-7.png", "portrait of man 50s established business owner trustworthy professional Asunción photorealistic"),
    ("testimonials/testimonial-8.png", "portrait of woman 35 creative professional marketing industry Asunción Paraguay photorealistic"),
    ("testimonials/transformation-1.png", "before after transformation split person holding formal documents celebrating business success Asunción photorealistic"),
    ("testimonials/group-1.png", "group testimonial small business owners who formalized together Asunción Paraguay proud professional photorealistic"),

    # TEAM (5)
    ("team/team-group-1.png", "full team group photo modern office background all smiling professional Asunción Paraguay photorealistic"),
    ("team/team-consultant-1.png", "main consultant portrait executive headshot style authoritative yet approachable Asunción Paraguay photorealistic professional"),
    ("team/team-mentor-1.png", "secondary consultant mentor collaborative energy teaching mode Asunción Paraguay photorealistic professional"),
    ("team/team-workshop-1.png", "team doing workshop facilitation presenting dynamic action shot Asunción Paraguay photorealistic professional"),
    ("team/team-headshots-collage.png", "professional headshots collage of consulting team Asunción Paraguay corporate photography style"),

    # STATS (5)
    ("stats/emprendedores.png", "illustrated icon diverse group of entrepreneurs 500 plus people helped Paraguayan business context clean modern vector style"),
    ("stats/consultorias.png", "illustrated icon briefcase with checkmark 1200 plus consultancies completed clean modern vector style"),
    ("stats/talleres.png", "illustrated icon book with star 85 plus workshops completed clean modern vector style"),
    ("stats/satisfaccion.png", "illustrated icon star rating 98 percent satisfaction customer happiness clean modern vector style"),
    ("stats/anos-experiencia.png", "illustrated icon calendar clock milestone 8 plus years experience clean modern vector style"),

    # REASONS (5)
    ("reasons/experiencia-real.png", "consultant with real entrepreneurs authentic Paraguayan business owners professional Asunción photorealistic"),
    ("reasons/metodologia-practica.png", "hands on workshop moment practical exercises tangible tools on table Asunción photorealistic professional"),
    ("reasons/precios-accesibles.png", "accessible pricing visual no corporate luxury approachable startup feel Asunción Paraguay photorealistic"),
    ("reasons/acompanamiento.png", "community vibe group support people helping each other Paraguayan entrepreneurs Asunción photorealistic warm"),
    ("reasons/resultados-comprobados.png", "growth charts success stories transformation proof Paraguayan entrepreneurs business success Asunción photorealistic"),

    # BLOG (10)
    ("blog/emprendimiento-cover.png", "flatlay of RUC documents laptop Paraguay flag step by step visual business launching Asunción photorealistic"),
    ("blog/herramientas-cover.png", "screenshot mosaic of free tools browser tabs productivity software Asunción Paraguay photorealistic"),
    ("blog/errores-cover.png", "mistakes crossed out lessons learned visual business errors on chalkboard Asunción photorealistic"),
    ("blog/whatsapp-cover.png", "phone showing WhatsApp Business app professional setup Paraguayan entrepreneur photorealistic modern"),
    ("blog/finanzas-cover.png", "calculator notebook with budget money management visual Paraguayan business owner photorealistic"),
    ("blog/marketing-cover.png", "social media analytics dashboard growth metrics Paraguayan entrepreneur modern Asunción photorealistic"),
    ("blog/comenzar-cover.png", "lightbulb moment business launching visual entrepreneurship idea Asunción Paraguay photorealistic"),
    ("blog/cortes-cover.png", "professional workshop session business training environment Asunción Paraguay photorealistic"),
    ("blog/cabello-cover.png", "creative brainstorming session business workshop environment Asunción Paraguay photorealistic"),
    ("blog/color-cover.png", "business brand consistency visual planning session Asunción Paraguay photorealistic modern"),

    # PROMOTIONS (9)
    ("promotions/promo-kit-landing.png", "kit contents spread out celebratory discount tag before price strikethrough Asunción Paraguay photorealistic"),
    ("promotions/promo-kit-whatsapp.png", "WhatsApp message notification with gift card offer Paraguayan entrepreneur photorealistic modern"),
    ("promotions/promo-kit-testimonial.png", "happy customer with digital product kit Paraguayan entrepreneur satisfied Asunción photorealistic"),
    ("promotions/promo-curso-landing.png", "course landing page mockup instructor visible enrollment CTA Asunción Paraguay photorealistic"),
    ("promotions/promo-curso-preview.png", "video preview thumbnail engaged student learning Paraguayan entrepreneur Asunción photorealistic"),
    ("promotions/promo-curso-success.png", "student success story before after knowledge gain Paraguayan entrepreneur Asunción photorealistic"),
    ("promotions/promo-consulta-landing.png", "initial consultation offer calendar booking visual Asunción Paraguay photorealistic"),
    ("promotions/promo-consulta-agenda.png", "what to expect in consultation session agenda visual planning Asunción photorealistic"),
    ("promotions/promo-consulta-urgency.png", "limited spots urgency countdown Paraguayan entrepreneur interested Asunción photorealistic"),

    # GIFT CARDS (9)
    ("gift-cards/card-100k-design.png", "elegant gift card design celebratory G 100000 amount Asunción Paraguay photorealistic premium"),
    ("gift-cards/card-100k-whatsapp.png", "gift card sent via WhatsApp phone screen mockup Paraguayan recipient Asunción photorealistic"),
    ("gift-cards/card-100k-open.png", "recipient opening gift card surprise delight moment Asunción Paraguay photorealistic warm"),
    ("gift-cards/card-300k-design.png", "premium gift card design gold accents G 300000 amount Asunción photorealistic elegant"),
    ("gift-cards/card-300k-box.png", "gift card with gift box visual larger impact Asunción Paraguay photorealistic premium"),
    ("gift-cards/card-300k-use.png", "consultation session booking with gift card Paraguayan entrepreneur Asunción photorealistic professional"),
    ("gift-cards/card-500k-design.png", "luxury gift card design premium feel G 500000 amount Asunción photorealistic elegant"),
    ("gift-cards/card-500k-full.png", "full mentorship package visual complete gift Asunción Paraguay photorealistic premium"),
    ("gift-cards/card-500k-group.png", "group gift option multiple services included Paraguayan business team Asunción photorealistic"),

    # LOYALTY (5)
    ("loyalty/tiers-overview.png", "bronze silver gold tier cards visual progression roadmap Paraguayan loyalty program photorealistic"),
    ("loyalty/points-earn.png", "points accumulation visual transaction receipt concept Paraguayan customer earning points photorealistic"),
    ("loyalty/redeem.png", "rewards redemption customer using points for service Asunción Paraguay photorealistic happy"),
    ("loyalty/vip-benefit.png", "VIP customer celebration exclusive benefits showcase Paraguayan entrepreneur Asunción photorealistic"),
    ("loyalty/app-interface.png", "app tracking interface mockup points balance visible Paraguayan customer using loyalty app photorealistic"),

    # NOSOTROS (6)
    ("nosotros/team-offsite.png", "team offsite retreat photo bonding authentic moments Asunción Paraguay professionals photorealistic"),
    ("nosotros/timeline.png", "timeline of company milestones founding to present Asunción Paraguay business history photorealistic"),
    ("nosotros/values-session.png", "mission values visual collaborative creation session Asunción Paraguay team workshop photorealistic"),
    ("nosotros/founder.png", "founder story image authentic personal Paraguayan setting Asunción business owner photorealistic"),
    ("nosotros/day-to-day.png", "office environment daily work life transparency Asunción Paraguay team collaboration photorealistic"),
    ("nosotros/community.png", "community involvement giving back local impact Asunción Paraguay charitable business photorealistic"),

    # CONTACT (5)
    ("contact/office-exterior.png", "Asunción location exterior recognizable landmark modern building professional photorealistic"),
    ("contact/form-moment.png", "contact form being filled friendly completion moment Paraguayan entrepreneur Asunción photorealistic"),
    ("contact/phone-support.png", "phone WhatsApp contact visual responsive support Asunción Paraguay professional photorealistic"),
    ("contact/email-response.png", "email communication visual professional response Asunción Paraguay business context photorealistic"),
    ("contact/map-pin.png", "map pin location in Asunción neighborhood feel Paraguayan entrepreneur photorealistic modern"),

    # BOOKING (4)
    ("booking/calendar-ui.png", "calendar booking interface mockup available slots visible Asunción Paraguay photorealistic modern"),
    ("booking/confirmation.png", "confirmation success checkmark positive outcome Paraguayan entrepreneur Asunción photorealistic"),
    ("booking/prep-checklist.png", "pre booking preparation checklist visual Paraguayan entrepreneur Asunción photorealistic organized"),
    ("booking/video-call-setup.png", "video call setup for online booking professional Paraguayan consultant Asunción photorealistic"),

    # FAQ (4)
    ("faq/search-moment.png", "FAQ search discovery visual finding answers Paraguayan entrepreneur Asunción photorealistic modern"),
    ("faq/accordion-interaction.png", "accordion interaction visual question expanding Paraguayan user Asunción photorealistic modern"),
    ("faq/expert-answer.png", "expert answer moment consultant providing clarity Paraguayan entrepreneur Asunción photorealistic"),
    ("faq/quick-links.png", "quick links to popular FAQs organized structure Asunción Paraguay website photorealistic"),

    # BEFORE/AFTER (8)
    ("beforeafter/formalizacion-1.png", "informal to formal business transformation messy desk to organized legal business Asunción photorealistic"),
    ("beforeafter/formalizacion-2.png", " Paraguayan entrepreneur celebrating formal business registration documents Asunción photorealistic"),
    ("beforeafter/digital-1.png", "no digital presence to professional website social media phone only to full online presence Asunción photorealistic"),
    ("beforeafter/digital-2.png", " Paraguayan entrepreneur with laptop showing professional website Asunción photorealistic happy"),
    ("beforeafter/estructura-1.png", "scattered business papers to systematized organized business structure Asunción photorealistic"),
    ("beforeafter/estructura-2.png", " Paraguayan business owner with organized files and system Asunción photorealistic professional"),
    ("beforeafter/crecimiento-1.png", "struggling business declining charts to growth trajectory success Asunción photorealistic"),
    ("beforeafter/crecimiento-2.png", " Paraguayan entrepreneur with growth chart success Asunción photorealistic celebrating"),

    # CTA BANNERS (5)
    ("cta/whatsapp-banner.png", "WhatsApp CTA banner green prominent urgent Asunción Paraguay mobile photorealistic"),
    ("cta/booking-banner.png", "booking CTA banner calendar icon clear action Asunción Paraguay photorealistic modern"),
    ("cta/urgency-banner.png", "limited time offer CTA countdown urgency Asunción Paraguay photorealistic professional"),
    ("cta/free-consultation-banner.png", "free consultation CTA zero barrier entry Asunción Paraguay photorealistic welcoming"),
    ("cta/social-proof-banner.png", "social proof CTA testimonials teaser Paraguayan entrepreneurs Asunción photorealistic"),

    # NEWSLETTER (3)
    ("newsletter/signup-success.png", "newsletter signup success welcome email visual Paraguayan entrepreneur Asunción photorealistic"),
    ("newsletter/content-preview.png", "email content preview valuable business content showcase Asunción Paraguay photorealistic"),
    ("newsletter/benefit-visual.png", "subscriber benefit visual exclusive content unlocked Paraguayan entrepreneur Asunción photorealistic"),

    # FOOTER (5)
    ("footer/brand-paraguay.png", "Paraguay flag with business logo combination Asunción Paraguay professional brand identity"),
    ("footer/payment-methods.png", "payment methods visual transfer Tigo Money Bancard Mercado Pago Asunción Paraguay photorealistic"),
    ("footer/social-icons.png", "social media icons composition Instagram highlight cover Asunción Paraguay professional"),
    ("footer/legal-badges.png", "legal compliance badges RUC verification secure checkout Asunción Paraguay photorealistic"),
    ("footer/hours-display.png", "operating hours visual friendly availability display Asunción Paraguay business context"),

    # SHARING (3)
    ("share/whatsapp-moment.png", "WhatsApp share button visual viral moment Paraguayan entrepreneur sharing Asunción photorealistic"),
    ("share/instagram-story.png", "Instagram story template swipe up CTA Asunción Paraguay social media photorealistic"),
    ("share/quote-card.png", "shareable quote card inspirational entrepreneurship quote Asunción Paraguay graphic design"),

    # ERRORS (3)
    ("errors/404-illustration.png", "friendly 404 page illustration lost but not broken Asunción Paraguay web design"),
    ("errors/maintenance-illustration.png", "maintenance mode page under construction creative visual Asunción Paraguay web"),
    ("errors/connection-illustration.png", "connection error illustration retry hopeful moment Asunción Paraguay web design"),

    # DECORATIVE (10)
    ("decorative/guarani-flower.png", "Paraguayan guarani flower motif cultural identity artistic illustration modern design"),
    ("decorative/network-web.png", "networking web abstract connection nodes business relationships digital art"),
    ("decorative/growth-gradient.png", "growth chart gradient upward trajectory business success abstract illustration"),
    ("decorative/document-flow.png", "document flow abstract paperwork simplified business process illustration"),
    ("decorative/lightbulb-idea.png", "lightbulb moment abstract idea generation entrepreneurship illustration modern"),
    ("decorative/handshake-abstract.png", "handshake abstract trust partnership business relationship illustration"),
    ("decorative/paraguay-map.png", "map of Paraguay outline local identity business geographic illustration"),
    ("decorative/calendar-grid.png", "calendar planning grid abstract business schedule illustration modern clean"),
    ("decorative/play-button.png", "video course play button learning mode abstract illustration modern"),
    ("decorative/chat-bubbles.png", "chat bubble cluster communication warmth business conversation illustration"),

    # PRODUCTS (6)
    ("products/kit-emprendedor.png", "open kit contents flatlay all templates visible Paraguayan entrepreneur Asunción photorealistic"),
    ("products/plan-marketing.png", "20 page document mockup marketing strategy visual Paraguayan consultant Asunción photorealistic"),
    ("products/pack-redes.png", "grid of social media template previews Instagram Facebook WhatsApp Asunción photorealistic"),
    ("products/curso-marketing.png", "video course player interface engaged learner Paraguayan entrepreneur Asunción photorealistic"),
    ("products/consultoria-inicial.png", "60 minute consultation session booking calendar highlight Asunción photorealistic professional"),
    ("products/mentoria-mensual.png", "3 session mentorship package ongoing relationship visual Asunción Paraguay professional"),

    # POPUPS (2)
    ("popup/exit-lead-magnet.png", "exit popup with lead magnet offer discount incentive Paraguayan entrepreneur Asunción photorealistic"),
    ("popup/exit-whatsapp-urgent.png", "last chance popup WhatsApp contact urgency Paraguayan entrepreneur Asunción photorealistic"),

    # COOKIE (2)
    ("cookie/consent-friendly.png", "cookie consent banner friendly design GDPR compliant visual Asunción Paraguay web"),
    ("cookie/privacy-trust.png", "privacy policy summary visual trust building Asunción Paraguay business website"),

    # CAROUSEL (5)
    ("carousel/portrait-6.png", "portrait young woman 28 beauty fashion entrepreneur Asunción Paraguay photorealistic professional"),
    ("carousel/portrait-7.png", "portrait man 45 tech startup founder Asunción Paraguay photorealistic professional"),
    ("carousel/portrait-8.png", "portrait woman 32 food business owner Asunción Paraguay photorealistic professional culinary"),
    ("carousel/portrait-9.png", "portrait man 38 consulting client formal attire Asunción Paraguay photorealistic professional"),
    ("carousel/portrait-10.png", "portrait woman 50 plus established business legacy Asunción Paraguay photorealistic professional"),

    # INSTAGRAM (8)
    ("instagram/workshop-bts.png", "Instagram grid highlight workshop behind scenes Asunción Paraguay social media content"),
    ("instagram/quote-1.png", "quote graphic post inspirational entrepreneurship quote Asunción Paraguay social media design"),
    ("instagram/client-win.png", "client transformation celebration post Paraguayan entrepreneur Asunción social media photorealistic"),
    ("instagram/tip-graphic.png", "tip graphic quick actionable advice Asunción Paraguay social media design"),
    ("instagram/team-spotlight.png", "team spotlight post team member introduction Asunción Paraguay social media"),
    ("instagram/event-announce.png", "event announcement graphic upcoming workshop Asunción Paraguay social media design"),
    ("instagram/testimonial-graphic.png", "testimonial screenshot graphic social proof Asunción Paraguay social media"),
    ("instagram/office-life.png", "behind the scenes office life authentic content Asunción Paraguay social media"),

    # DARK MODE (8)
    ("dark/hero-1-dark.png", "hero slide dark mode professional workspace laptop dark background modern office photorealistic"),
    ("dark/hero-2-dark.png", "hero slide dark mode workshop setting dark background modern photorealistic"),
    ("dark/hero-3-dark.png", "hero slide dark mode mentorship dark background modern photorealistic professional"),
    ("dark/cta-dark.png", "CTA banner dark variant WhatsApp professional Asunción dark mode web design"),
    ("dark/error-404-dark.png", "error 404 dark mode illustration friendly character Asunción web design dark"),
    ("dark/booking-dark.png", "confirmation dark mode success checkmark dark background Asunción photorealistic"),
    ("dark/gallery-dark.png", "gallery office dark variant modern dark aesthetic Asunción photorealistic"),
    ("dark/process-dark.png", "process step icons dark mode dark background Asunción business illustration"),

    # CONTEXTUAL (9)
    ("contextual/agro-business.png", "agriculture farm business context rural Paraguay agricultural entrepreneur photorealistic"),
    ("contextual/tech-startup.png", "tech startup modern Paraguayan entrepreneur modern office Asunción photorealistic"),
    ("contextual/women-entrepreneurs.png", "women entrepreneurs empowerment context group of women Asunción Paraguay business owners photorealistic"),
    ("contextual/genz-entrepreneur.png", "young Gen Z first time business owner Gen Z entrepreneur Asunción photorealistic modern"),
    ("contextual/family-business.png", "family business succession planning context Paraguayan family business Asunción photorealistic"),
    ("contextual/export-business.png", "export import business context MERCOSUR Asunción Paraguayan entrepreneur photorealistic professional"),
    ("contextual/franchise.png", "franchise franchising opportunities visual Paraguayan entrepreneur Asunción photorealistic business"),
    ("contextual/digital-nomad.png", "digital nomad remote business lifestyle Paraguayan entrepreneur laptop beach Asunción photorealistic"),
    ("contextual/career-transition.png", "formal employment to entrepreneurship transition career change Asunción Paraguay photorealistic"),

    # UTILITY (16)
    ("utility/loading-branded.png", "loading spinner branded animation frame Asunción Paraguay web design element"),
    ("utility/empty-testimonials.png", "empty state no testimonials yet placeholder illustration Asunción web design"),
    ("utility/empty-blog.png", "empty state no blog posts yet placeholder illustration Asunción web design"),
    ("utility/empty-products.png", "empty state no products available placeholder illustration Asunción e-commerce"),
    ("utility/placeholder-team.png", "placeholder for missing team photo silhouette illustration Asunción web design"),
    ("utility/favicon-icon.png", "favicon brand icon multiple sizes Asunción Paraguay business logo minimal"),
    ("utility/og-homepage.png", "OG social share image homepage Asunción Paraguay entrepreneurship social preview"),
    ("utility/og-services.png", "OG share image services page Asunción Paraguay entrepreneurship social preview"),
    ("utility/whatsapp-float.png", "WhatsApp floating button background green professional Asunción web design"),
    ("utility/mobile-mockup.png", "mobile app mockup placeholder Paraguayan entrepreneur Asunción web design"),
    ("utility/serving-paraguay.png", "serving Paraguay geographic visual Asunción business map illustration"),
    ("utility/badge-ruc.png", "RUC certified badge graphic Paraguayan business compliance illustration"),
    ("utility/badge-secure.png", "secure checkout security badge Paraguayan e-commerce trust illustration"),
    ("utility/badge-eco.png", "eco friendly digital business badge Paraguayan sustainability illustration"),
    ("utility/badge-partner.png", "partnership affiliation badge placeholder Paraguayan business network illustration"),
    ("utility/thankyou-illustration.png", "thank you page illustration Paraguayan entrepreneur celebration Asunción web design"),
]

def generate_image(filepath: str, prompt: str, retries: int = 3) -> bool:
    """Generate a single image and save to filepath."""
    for attempt in range(retries):
        try:
            # Ensure directory exists
            full_path = IMAGES_DIR / filepath
            full_path.parent.mkdir(parents=True, exist_ok=True)

            # Skip if already exists
            if full_path.exists():
                print(f"SKIP: {filepath} already exists")
                return True

            # Submit request
            resp = requests.post(
                BASE_URL,
                headers=HEADERS,
                json={"prompt": prompt, "num_images": 1},
                timeout=60
            )
            data = resp.json()

            if "request_id" not in data:
                print(f"ERROR {filepath}: {data}")
                continue

            request_id = data["request_id"]
            status_url = data.get("status_url", "")

            # Poll for completion
            for _ in range(60):  # 60 * 2s = 120s max wait
                time.sleep(2)
                status_resp = requests.get(status_url, headers=HEADERS, timeout=30)
                status_data = status_resp.json()

                if status_data.get("status") == "COMPLETED":
                    # Get the image URL
                    result_url = status_data.get("response_url") or f"https://queue.fal.run/fal-ai/fast-sdxl/requests/{request_id}"
                    # Try to get image data
                    img_resp = requests.get(result_url, headers=HEADERS, timeout=60)
                    if img_resp.status_code == 200:
                        with open(full_path, 'wb') as f:
                            f.write(img_resp.content)
                        print(f"DONE: {filepath}")
                        return True
                    else:
                        # Try alternate URL pattern
                        alt_url = f"https://queue.fal.run/fal-ai/fast-sdxl/requests/{request_id}"
                        img_resp2 = requests.get(alt_url, headers=HEADERS, timeout=60)
                        if img_resp2.status_code == 200:
                            with open(full_path, 'wb') as f:
                                f.write(img_resp2.content)
                            print(f"DONE: {filepath}")
                            return True
                        print(f"ERROR: Could not download {filepath} - status {img_resp.status_code}")
                        break

                if status_data.get("status") in ("FAILED", "ERROR"):
                    print(f"FAILED {filepath}: {status_data}")
                    break

            print(f"TIMEOUT {filepath}: {request_id}")
        except Exception as e:
            print(f"EXCEPTION {filepath}: {e}")
            time.sleep(5)

    return False

def main():
    total = len(IMAGES)
    done = 0
    failed = []

    for i, (filepath, prompt) in enumerate(IMAGES):
        print(f"[{i+1}/{total}] {filepath}")
        if generate_image(filepath, prompt):
            done += 1
        else:
            failed.append(filepath)

        # Rate limit - be nice to the API
        time.sleep(1)

    print(f"\n=== COMPLETE ===")
    print(f"Done: {done}/{total}")
    if failed:
        print(f"Failed ({len(failed)}):")
        for f in failed:
            print(f"  - {f}")

if __name__ == "__main__":
    main()