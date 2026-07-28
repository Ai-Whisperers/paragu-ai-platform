# DCIM Intake Plan — Ometz Dental (Dra. Gabriella)

Source shoot: `~/Downloads/DCIM/100CANON/` — 356 frames, Canon EOS body `162173027895`.

## Triage summary

| Class            | Count | Dims       | Verdict                                       |
|------------------|-------|------------|-----------------------------------------------|
| DSLR             | 117   | 5184x3456  | 80 usable, 45 off-brand/blurry                |
| LOW              | 181   | 720x480    | 25 keepers (thumbnail-ceiling), 156 discard   |
| macOS sidecars   | 58    | 0 B        | Skip (`._IMG_*`)                              |

DSLR usable breakdown: intraoral cases 51 / doctor portraits 7 / equipment 5 / team 4 / patient-interaction 3 / clinic wide 2 / reception 1.

## Slot mapping (22 target slots)

Legend: **REAL** = fill from DSLR/LOW · **KEEP** = leave AI placeholder for now · **GEN** = commission new AI/reshoot.

| Slot                                                    | Source                                    | Action |
|---------------------------------------------------------|-------------------------------------------|--------|
| `hero/dra-gp-hero-2.png`                                | DSLR `0043` — clinic aisle wide           | REAL   |
| `hero/dra-gp-hero-3.png`                                | DSLR `0918` — editorial couch portrait    | REAL   |
| `team/dra-gp-portrait-v2.svg` → `.webp`                 | DSLR `0919` — mid-gesture headshot        | REAL (tsx edit) |
| `hero-candid/dra-gp-laugh.webp`                         | DSLR `0917` — laughing candid             | REAL   |
| `hero-candid/dra-gp-goodbye.webp`                       | DSLR `0921` — warm exit gesture           | REAL   |
| `team-atmosphere/waiting-room.webp`                     | DSLR `0043` (cropped) — no dedicated shot | REAL   |
| `team-atmosphere/sterilization.webp`                    | DSLR `0486` — composite/shade rack        | REAL   |
| `team-atmosphere/bookshelf.webp`                        | DSLR `0302` — multi-station (needs retouch) | REAL (flagged) |
| `services/oral-rehabilitation.png`                      | DSLR `0308` — blue rubber-dam endo        | REAL   |
| `services/cosmetic-dentistry.png`                       | DSLR `0532` — restored smile close        | REAL   |
| `services/general-dentistry.svg` → `.webp`              | DSLR `0554` — pre-treatment intraoral     | REAL (tsx edit) |
| `services/second-opinion.png`                           | GEN — no radiograph-review shot exists    | KEEP   |
| `services/treatment-planning.png`                       | GEN — no consult-with-panoramic shot      | KEEP   |
| `services-empathy/teaching.webp`                        | DSLR `0302` (IOA retouch req)             | KEEP   |
| `services-empathy/xray-explain.webp`                    | GEN                                        | KEEP   |
| `services-empathy/pediatric.webp`                       | GEN                                        | KEEP   |
| `services-empathy/hands-holding.webp`                   | GEN                                        | KEEP   |
| `batch-02/A-patient-child.webp`                         | GEN                                        | KEEP   |
| `batch-02/B-elderly-hand.webp`                          | GEN                                        | KEEP   |
| `batch-02/C-triptych.webp`                              | Composite 3× case shots — future job      | KEEP   |
| `batch-02/D-coat-headshot.webp`                         | DSLR `0918` — coat headshot crop          | REAL   |
| `real/clinic-1.webp`                                    | DSLR `0486` — equipment interior          | REAL   |

**Net: 12 slots filled with real photos, 10 left as AI placeholders pending gen or reshoot.**

## Retouch queue (before publish)

- **IOA logo overprint (7 frames):** `0030, 0042, 0272, 0278, 0302, 0304, 0428` — chest logos + wall signage read "IOA / Instituto de Odontología Avanzada" or "ESTETICA". Any frame we ship with visible IOA branding must be inpainted → "Ometz Dental" or the logo occluded.
- **Rotation (5 frames):** `0047, 0048, 0049, 0733, 0915, 0916, 0917` — camera EXIF orientation ignored.
- **Blurry (3 frames):** `0049, 0670, 0733` — do not ship.

## Gaps requiring AI generation or reshoot

1. **Exterior facade + Ometz signage** — none exist.
2. **Reception / waiting** — only `0119` (behind-scenes, unusable).
3. **Ometz-branded coats** — every team shot shows IOA / generic branding.
4. **Expat consultation scene** — no dedicated shot.
5. **Second-opinion / radiograph-review scene** — no shot exists.
6. **OG (1200x630)** — crop `0043` or `0918` and overlay Ometz logo.

## Handoff notes

- Doctor-portrait cluster `0915–0921` is the strongest asset in the shoot after the clinic wide `0043`. Build `/nosotros` + `/filosofia` around it.
- The LOW keepers (25 files, `IMG_09xx–10xx`) are 720x480 — usable only for thumbnails or side-panel sub-heroes. Do not upscale.
- No true same-patient before/after pair exists. Present "casos" as conceptual pairs (`0125 → 0224/0226`, `0554 → 0532`), not a single-patient timeline.
- Originals stay in `~/Downloads/DCIM/`. Suggest archival to `/data/media/dra-gabriela/dcim-2025-07-22/` after intake; ask before moving.
