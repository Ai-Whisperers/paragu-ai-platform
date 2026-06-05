#!/usr/bin/env python3
"""Generate demo images with correct FAL API response handling."""
import os, time, requests
from pathlib import Path

FAL_KEY = "9e8fa2bf-657a-46f0-8bad-02744a8af5ad:80c6ad5d2e27de8dfcfd4ebd77253ff3"
HEADERS = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}
IMAGES_DIR = Path("/home/ai-whisperers/site-template/public/images-demo")

IMAGES = [
    ("hero/hero-your-business-online.png",
     "confident Latin American woman 35 years old standing in front of laptop displaying professional website, city skyline through window, warm golden hour lighting, arms crossed relaxed, upper 40% negative space for text, photorealistic 8K, 16:9"),
    ("hero/hero-every-business-type.png",
     "grid layout showing six different types of businesses with professional websites on devices: hair salon, restaurant, rock band, plumber, consultant, boutique, one confident Latin American woman in center, warm studio lighting, aspirational, 16:9"),
    ("hero/hero-the-transform.png",
     "before and after split: left messy desk with WhatsApp, right clean laptop with booking dashboard, same Latin American woman stressed then confident, Asunción office, warm lighting, transformation unlock, 16:9"),
    ("opportunity/opportunity-24-7.png",
     "Latin American woman 30s at home evening with smartphone showing confirmed bookings, full calendar on wall, peaceful productive energy, warm lamp light, Asunción suburban home, 16:9"),
    ("opportunity/opportunity-new-customers.png",
     "Latin American man 40s looking at analytics dashboard with growing visitor graph, satisfied expression, coffee cup, modern home office, warm morning light, 16:9"),
    ("opportunity/opportunity-more-than-whatsapp.png",
     "split: phone with chaotic WhatsApp vs clean website booking inbox, same Latin American woman stressed then confident, Asunción workplace, warm light, 16:9"),
    ("opportunity/opportunity-professional-image.png",
     "business card exchange: entrepreneur woman giving card, client viewing website on phone, both satisfied, warm office natural light, documentary style, 16:9"),
    ("opportunity/opportunity-organized.png",
     "Latin American woman 38 reviewing dashboard with appointments loyalty stats gift cards, organized desk coffee, confident expression, modern office warm light, 16:9"),
    ("features/feature-booking-system.png",
     "close up booking calendar with time slots on tablet, Latin American woman 35 satisfied smile, warm office lighting, booking system concept, 16:9"),
    ("features/feature-loyalty.png",
     "business owner showing customer loyalty points card app, both smiling, Latin American boutique, warm natural light, customer retention, 16:9"),
    ("features/feature-gift-cards.png",
     "gift card purchase moment, customer receiving beautiful card from woman 35, celebration feeling, warm retail setting, new revenue stream, 16:9"),
    ("features/feature-google-presence.png",
     "Latin American man 40s pointing at laptop showing Google search with business listing reviews map, proud expression, warm office light, 16:9"),
    ("features/feature-organized-business.png",
     "before after desk: messy papers phone vs clean dashboard laptop tablet, same person transforming operations, documentary warm light, 16:9"),
    ("testimonials/testimonial-salon.png",
     "beauty salon: client receiving hair service, stylist working, clean modern interior LED lighting, warm friendly atmosphere, Latin American, Asunción studio, 16:9"),
    ("testimonials/testimonial-restaurant.png",
     "restaurant interior: guests enjoying meal, host showing reservation tablet to arriving customers, warm ambient lighting, Latin American, professional hospitality, 16:9"),
    ("testimonials/testimonial-service.png",
     "Latin American tradesperson man 35 in uniform with tablet showing job system, organized van background, confident smiling, warm natural light, 16:9"),
    ("cta/cta-start-today.png",
     "confident woman 35 with laptop website open, warm inviting smile, city skyline background, warm hopeful golden hour, Start Today concept, 16:9"),
    ("cta/cta-whats-possible.png",
     "grid collage of 4 beautiful websites on devices smartphone tablet laptop, curious woman viewing with interest, clean modern warm studio, 16:9"),
    ("decorative/unlock-icon.png",
     "clean minimalist illustration lock opening to reveal light growth, brand colors coral navy, elegant simple scalable icon, 1:1"),
]

def get_image_url(request_id: str) -> str:
    """Try to get actual image URL from FAL response."""
    # Try the direct response URL pattern
    urls_to_try = [
        f"https://queue.fal.run/fal-ai/fast-sdxl/requests/{request_id}",
        f"https://queue.fal.run/fal-ai/fast-sdxl/results/{request_id}",
        f"https://queue.fal.run/fal-ai/fast-sdxl/{request_id}/image",
    ]
    for url in urls_to_try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code == 200 and len(resp.content) > 10000:
            return url
    return None

def generate():
    done = 0
    failed = []
    total = len(IMAGES)

    for i, (filepath, prompt) in enumerate(IMAGES):
        full_path = IMAGES_DIR / filepath
        full_path.parent.mkdir(parents=True, exist_ok=True)

        if full_path.exists():
            print(f"SKIP [{i+1}/{total}]: {filepath}")
            done += 1
            continue

        print(f"[{i+1}/{total}] {filepath}")

        try:
            # Submit
            resp = requests.post(
                "https://queue.fal.run/fal-ai/fast-sdxl",
                headers=HEADERS,
                json={"prompt": prompt, "num_images": 1},
                timeout=60
            )
            data = resp.json()
            request_id = data.get("request_id")
            status_url = data.get("status_url", "")

            if not request_id:
                print(f"  ERROR: {data}")
                failed.append(filepath)
                continue

            # Poll
            for _ in range(60):
                time.sleep(2)
                status = requests.get(status_url, headers=HEADERS, timeout=30).json()
                if status.get("status") == "COMPLETED":
                    # Get the image from response_url
                    response_url = status.get("response_url")
                    img_resp = requests.get(response_url, headers=HEADERS, timeout=60)
                    if img_resp.status_code == 200 and len(img_resp.content) > 10000:
                        with open(full_path, 'wb') as f:
                            f.write(img_resp.content)
                        print(f"  DONE [{done+1}/{total}]")
                        done += 1
                    else:
                        # Try getting image from the main endpoint with the request_id
                        img_resp2 = requests.get(
                            f"https://queue.fal.run/fal-ai/fast-sdxl/requests/{request_id}",
                            headers=HEADERS, timeout=60
                        )
                        if img_resp2.status_code == 200 and len(img_resp2.content) > 10000:
                            with open(full_path, 'wb') as f:
                                f.write(img_resp2.content)
                            print(f"  DONE [{done+1}/{total}]")
                            done += 1
                        else:
                            print(f"  FAILED to download, status={img_resp2.status_code}")
                            failed.append(filepath)
                    break
                if status.get("status") in ("FAILED", "ERROR"):
                    print(f"  FAILED: {status}")
                    failed.append(filepath)
                    break

        except Exception as e:
            print(f"  EXCEPTION: {e}")
            failed.append(filepath)

        time.sleep(2)

    print(f"\n=== COMPLETE ===")
    print(f"Done: {done}/{total}")
    if failed:
        print(f"Failed ({len(failed)}):")
        for f in failed:
            print(f"  - {f}")

if __name__ == "__main__":
    generate()