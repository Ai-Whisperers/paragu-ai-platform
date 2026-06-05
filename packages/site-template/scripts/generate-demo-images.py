#!/usr/bin/env python3
"""Generate first batch demo images for generic business template."""
import os
import time
import json
import requests
from pathlib import Path

FAL_KEY = "9e8fa2bf-657a-46f0-8bad-02744a8af5ad:80c6ad5d2e27de8dfcfd4ebd77253ff3"
BASE_URL = "https://queue.fal.run/fal-ai/fast-sdxl"
HEADERS = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}
IMAGES_DIR = Path("/home/ai-whisperers/site-template/public/images-demo")

IMAGES = [
    # ========== HERO (3) ==========
    ("hero/hero-your-business-online.png",
     "Professional documentary photography of confident Latin American woman 35 years old standing in front of laptop displaying professional website, Asunción city skyline through window, warm golden hour aspirational lighting, arms crossed relaxed confident posture, modern office setting, upper 40% negative space for text overlay, photorealistic 8K quality, 16:9 aspect ratio"),

    ("hero/hero-every-business-type.png",
     "Grid layout showing six different types of businesses with professional websites on devices: hair salon booking interface, restaurant menu page, rock band event page, plumber service form, consultant scheduling system, boutique product catalog, one confident Latin American woman standing in center of grid, warm studio lighting clean modern background, professional photography, aspirational feeling, 16:9"),

    ("hero/hero-the-transform.png",
     "Before and after split composition documentary style, left side shows informal messy desk with handwritten notes and phone showing chaotic WhatsApp messages, right side shows same Latin American woman with clean laptop displaying professional booking dashboard and organized desk, woman stressed expression on left confident proud on right, Asunción business setting, warm professional lighting, transformation unlock feeling, 16:9"),

    # ========== OPPORTUNITY (5) ==========
    ("opportunity/opportunity-24-7.png",
     "Latin American entrepreneur woman 30s relaxed at home office evening, smartphone showing confirmed online bookings notification, wall calendar filled with appointments, peaceful productive energy, lamp warm glow, Asunción suburban home setting, warm documentary evening lighting, passive income and automated bookings concept, photorealistic 8K, 16:9"),

    ("opportunity/opportunity-new-customers.png",
     "Latin American entrepreneur man 40s looking at laptop analytics dashboard showing growing visitor graph and new customer inquiries, satisfied content expression, coffee cup beside, modern home office, warm morning natural light through window, data insight and business growth concept, professional documentary photography, photorealistic 8K, 16:9"),

    ("opportunity/opportunity-more-than-whatsapp.png",
     "Split concept documentary photography, left side smartphone overwhelmed with WhatsApp message notifications and chaotic chat list, right side clean professional website with organized booking inbox, same Latin American business owner woman both sides, stressed overwhelmed on left confident relaxed on right, Asunción workplace setting, warm professional lighting, 16:9"),

    ("opportunity/opportunity-professional-image.png",
     "Professional business moment: Latin American entrepreneur woman 40s handing elegant business card to potential client who is viewing matching professional website on phone, both satisfied and impressed expressions, warm natural office lighting, candid documentary style, complete professional presence concept, photorealistic 8K, 16:9"),

    ("opportunity/opportunity-organized.png",
     "Latin American business owner woman 38 reviewing clean dashboard showing appointments calendar, loyalty program statistics, gift cards sold counter, organized desk with coffee cup and neat documents, satisfied confident expression, modern office space, warm professional lighting, operational clarity and business control concept, photorealistic 8K, 16:9"),

    # ========== FEATURES (5) ==========
    ("features/feature-booking-system.png",
     "Close-up professional photography of booking calendar interface with available time slots visible on tablet screen, Latin American business owner woman 35 reviewing confirmed appointments with satisfied smile, clean organized schedule display, warm office setting, professional lighting, booking system unlock concept, photorealistic 8K, 16:9"),

    ("features/feature-loyalty.png",
     "Warm documentary photography of business owner showing loyal returning customer their loyalty points card or app screen with accumulated points, both smiling, friendly interaction, Latin American boutique setting, natural warm light, customer retention and loyalty program success concept, photorealistic 8K, 16:9"),

    ("features/feature-gift-cards.png",
     "Celebration moment: customer receiving beautifully designed gift card from Latin American business owner woman 35, both with happy expressions, clean professional gift card design visible, warm retail setting, gift card purchase moment representing new revenue stream unlocked, photorealistic 8K, 16:9"),

    ("features/feature-google-presence.png",
     "Latin American entrepreneur man 40s pointing proudly at laptop screen showing business appearing in Google search results with local listing reviews map and hours, professional website visible, warm office natural light, online discoverability and Google presence concept, professional documentary photography, photorealistic 8K, 16:9"),

    ("features/feature-organized-business.png",
     "Before and after comparison documentary style, left side messy desk covered with papers and phone cluttered with notifications, right side same person with clean organized dashboard on laptop and tablet, transformation of business operations, professional documentary style, warm lighting, 16:9"),

    # ========== TESTIMONIALS (3) ==========
    ("testimonials/testimonial-salon.png",
     "Professional beauty salon photography showing happy client receiving hair service, stylist working with professional equipment, clean modern salon interior with LED lighting, warm friendly atmosphere, magazine and refreshments visible, Latin American stylist and client, professional Asunción studio setting, testimonial for hair salon success, photorealistic 8K, 16:9"),

    ("testimonials/testimonial-restaurant.png",
     "Warm restaurant interior photography with guests enjoying meal, host showing tablet with reservation system to arriving customers, beautiful food display, warm ambient lighting, professional hospitality photography, Latin American restaurant setting, testimonial for restaurant success story, photorealistic 8K, 16:9"),

    ("testimonials/testimonial-service.png",
     "Professional service business documentary photography, Latin American tradesperson man 35 in work uniform with tablet showing job management system, organized van in background with tools, confident smiling expression, service business digital presence concept, warm natural light, testimonial for service business success, photorealistic 8K, 16:9"),

    # ========== CTA (2) ==========
    ("cta/cta-start-today.png",
     "Confident Latin American entrepreneur woman 35 with laptop open showing professional website, warm inviting smile, city skyline background representing aspiration, warm hopeful golden hour lighting, bold invitation feeling, Start Your Website Today concept, professional photography, photorealistic 8K, 16:9"),

    ("cta/cta-whats-possible.png",
     "Grid collage of four different beautiful professional business websites displayed on devices smartphone tablet laptop, one curious Latin American entrepreneur woman viewing with interested expression, possibility and exploration concept, clean modern background, warm studio lighting, professional photography, photorealistic 8K, 16:9"),

    # ========== DECORATIVE (1) ==========
    ("decorative/unlock-icon.png",
     "Clean modern minimalist illustration of lock opening to reveal light and growth, representing unlock of business potential concept, brand colors coral and navy, elegant simple design, scalable icon, 1:1 aspect ratio"),
]

counter = [0]

def generate_image(filepath: str, prompt: str, retries: int = 3) -> bool:
    for attempt in range(retries):
        try:
            full_path = IMAGES_DIR / filepath
            full_path.parent.mkdir(parents=True, exist_ok=True)

            if full_path.exists():
                print(f"SKIP: {filepath}")
                counter[0] += 1
                return True

            resp = requests.post(BASE_URL, headers=HEADERS,
                               json={"prompt": prompt, "num_images": 1}, timeout=60)
            data = resp.json()

            if "request_id" not in data:
                print(f"ERROR {filepath}: {data}")
                continue

            request_id = data["request_id"]
            status_url = data.get("status_url", "")

            for _ in range(90):
                time.sleep(2)
                status_resp = requests.get(status_url, headers=HEADERS, timeout=30)
                status_data = status_resp.json()

                if status_data.get("status") == "COMPLETED":
                    result_url = f"https://queue.fal.run/fal-ai/fast-sdxl/requests/{request_id}"
                    img_resp = requests.get(result_url, headers=HEADERS, timeout=60)
                    if img_resp.status_code == 200 and len(img_resp.content) > 10000:
                        with open(full_path, 'wb') as f:
                            f.write(img_resp.content)
                        counter[0] += 1
                        print(f"DONE [{counter[0]}/{len(IMAGES)}]: {filepath}")
                        return True
                if status_data.get("status") in ("FAILED", "ERROR"):
                    break

            print(f"TIMEOUT {filepath}")
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
        time.sleep(2)

    print(f"\n=== COMPLETE ===")
    print(f"Done: {done}/{total}")
    if failed:
        print(f"Failed ({len(failed)}):")
        for f in failed:
            print(f"  - {f}")

if __name__ == "__main__":
    main()