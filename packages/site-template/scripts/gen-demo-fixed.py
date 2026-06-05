#!/usr/bin/env python3
"""Generate demo images - fixed parsing."""
import os, time, requests, json
from pathlib import Path

FAL_KEY = "9e8fa2bf-657a-46f0-8bad-02744a8af5ad:80c6ad5d2e27de8dfcfd4ebd77253ff3"
HEADERS = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}
IMAGES_DIR = Path("/home/ai-whisperers/site-template/public/images-demo")

IMAGES = [
    ("hero/hero-your-business-online.png", "confident Latin American woman 35 years old standing in front of laptop displaying professional website, city skyline through window warm golden hour lighting arms crossed relaxed upper 40% negative space for text photorealistic 8K 16:9"),
    ("hero/hero-every-business-type.png", "grid layout showing six different types of businesses with professional websites on devices: hair salon restaurant rock band plumber consultant boutique one confident Latin American woman in center warm studio lighting aspirational 16:9"),
    ("hero/hero-the-transform.png", "before and after split left messy desk with WhatsApp right clean laptop with booking dashboard same Latin American woman stressed then confident Asunción office warm lighting transformation unlock 16:9"),
    ("opportunity/opportunity-24-7.png", "Latin American woman 30s at home evening with smartphone showing confirmed bookings full calendar on wall peaceful productive energy warm lamp light Asunción suburban home 16:9"),
    ("opportunity/opportunity-new-customers.png", "Latin American man 40s looking at analytics dashboard with growing visitor graph satisfied expression coffee cup modern home office warm morning light 16:9"),
    ("opportunity/opportunity-more-than-whatsapp.png", "split phone with chaotic WhatsApp vs clean website booking inbox same Latin American woman stressed then confident Asunción workplace warm light 16:9"),
    ("opportunity/opportunity-professional-image.png", "business card exchange entrepreneur woman giving card client viewing website on phone both satisfied warm office natural light documentary style 16:9"),
    ("opportunity/opportunity-organized.png", "Latin American woman 38 reviewing dashboard with appointments loyalty stats gift cards organized desk coffee confident expression modern office warm light 16:9"),
    ("features/feature-booking-system.png", "close up booking calendar with time slots on tablet Latin American woman 35 satisfied smile warm office lighting booking system concept 16:9"),
    ("features/feature-loyalty.png", "business owner showing customer loyalty points card app both smiling Latin American boutique warm natural light customer retention 16:9"),
    ("features/feature-gift-cards.png", "gift card purchase moment customer receiving beautiful card from woman 35 celebration feeling warm retail setting new revenue stream 16:9"),
    ("features/feature-google-presence.png", "Latin American man 40s pointing at laptop showing Google search with business listing reviews map proud expression warm office light 16:9"),
    ("features/feature-organized-business.png", "before after desk messy papers phone vs clean dashboard laptop tablet same person transforming operations documentary warm light 16:9"),
    ("testimonials/testimonial-salon.png", "beauty salon client receiving hair service stylist working clean modern interior LED lighting warm friendly atmosphere Latin American Asunción studio 16:9"),
    ("testimonials/testimonial-restaurant.png", "restaurant interior guests enjoying meal host showing reservation tablet to arriving customers warm ambient lighting Latin American professional hospitality 16:9"),
    ("testimonials/testimonial-service.png", "Latin American tradesperson man 35 in uniform with tablet showing job system organized van background confident smiling warm natural light 16:9"),
    ("cta/cta-start-today.png", "confident woman 35 with laptop website open warm inviting smile city skyline background warm hopeful golden hour Start Today concept 16:9"),
    ("cta/cta-whats-possible.png", "grid collage of 4 beautiful websites on devices smartphone tablet laptop curious woman viewing with interest clean modern warm studio 16:9"),
    ("decorative/unlock-icon.png", "clean minimalist illustration lock opening to reveal light growth brand colors coral navy elegant simple scalable icon 1:1"),
]

def generate():
    done = failed = 0
    total = len(IMAGES)

    for i, (filepath, prompt) in enumerate(IMAGES):
        full_path = IMAGES_DIR / filepath
        full_path.parent.mkdir(parents=True, exist_ok=True)

        if full_path.exists():
            print(f"SKIP [{i+1}/{total}] {filepath}")
            done += 1
            continue

        print(f"[{i+1}/{total}] {filepath}", end=" ")

        try:
            resp = requests.post("https://queue.fal.run/fal-ai/fast-sdxl",
                headers=HEADERS, json={"prompt": prompt, "num_images": 1}, timeout=60)
            data = resp.json()
            request_id = data.get("request_id")
            if not request_id:
                print(f"ERROR: {data}")
                failed += 1
                continue

            # Poll
            for _ in range(60):
                time.sleep(2)
                status = requests.get(
                    f"https://queue.fal.run/fal-ai/fast-sdxl/requests/{request_id}/status",
                    headers=HEADERS, timeout=30
                ).json()
                if status.get("status") == "COMPLETED":
                    # Get image from the request endpoint (returns JSON with image URL)
                    img_data = requests.get(
                        f"https://queue.fal.run/fal-ai/fast-sdxl/requests/{request_id}",
                        headers=HEADERS, timeout=60
                    ).json()
                    if "images" in img_data and img_data["images"]:
                        img_url = img_data["images"][0]["url"]
                        img_resp = requests.get(img_url, timeout=60)
                        if img_resp.status_code == 200:
                            with open(full_path, 'wb') as f:
                                f.write(img_resp.content)
                            print(f"✓")
                            done += 1
                            break
                    print(f"ERROR: no images in response")
                    failed += 1
                    break
                if status.get("status") in ("FAILED", "ERROR"):
                    print(f"FAILED")
                    failed += 1
                    break
        except Exception as e:
            print(f"EXCEPTION: {e}")
            failed += 1

        time.sleep(1.5)

    print(f"\n=== DONE: {done}/{total} | Failed: {failed} ===")

if __name__ == "__main__":
    generate()