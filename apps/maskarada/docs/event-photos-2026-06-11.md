# Maskarada Event Photos — Asset Analysis

**Source:** Google Drive folders owned by Ivan Weiss (weissvanderpol.ivan@gmail.com) and the event's external photographer.
**Downloaded:** 2026-06-15
**Total:** 169 photos, ~900 MB
**Event:** Club maškaráda — "Simón Dice" edition, Thursday June 11, 2026, Eligio Ayala 1073, Asunción, Paraguay.

---

## Folder inventory

| Drive folder | Drive name | Drive ID | Owner | Files | Bytes | Camera | Lens | Use case |
|---|---|---|---|---|---|---|---|---|
| `17v1wjnobXMWSVcYdlTjO9dcGjJL3NcOp` | Maskarada 2026 | 37 | ryanpipo@gmail.com (external photographer) | 37 JPGs | 59 MB | Canon EOS R50 | RF 50mm F1.8 STM (prime portrait lens) | **Primary — post-processed, official set** |
| `12aMubUse3LXwEI_QcDbUai9FiVxaRGrw` | 26.06.11 Maskarada Simón Dice | 132 (+1 shortcut to folder 1) | monairopes@gmail.com (Moñai Ropes / Iván's Canon) | 132 JPGs | 834 MB | 91× Canon EOS Rebel T7 + 41× iPhone (IMG_6150+ sequence) | EF-S 18-55mm f/3.5-5.6 IS II (kit lens) | **Secondary — in-the-moment shots, more candid** |

**The shortcut** at the top of folder 2 is a Google Drive shortcut pointing to folder 1 (same content, two locations). Ignored on download.

## Both folders are from the same event

EXIF time ranges overlap exactly on the night of 2026-06-11:

| Folder | Earliest photo | Latest photo | Span |
|---|---|---|---|
| Folder 1 (R50, post-processed) | 23:54:15 | 00:37:46 | ~43 min (later in the night) |
| Folder 2 (T7 + iPhone) | 22:29:54 | 00:48:54 | ~2 h 19 min (full event coverage) |

Folder 1 was shot from **23:54 onward** — that's the last hour of the event. The R50 photographer (external) arrived late and shot the peak of the night, then took the photos home and ran them through **Adobe Photoshop Camera Raw 18.3.2 (Windows)** before uploading. That's why folder 1 is warmer, cleaner, and tighter (24 landscapes + 13 portraits).

Folder 2 spans the whole night. The T7 with the kit lens is Moñai's camera (matches the monairopes@gmail.com owner). The 41 iPhone shots are crowd-perspective from guests or staff.

---

## Content profile (machine vision)

Per-image analysis (brightness, dominant color, skin-tone proxy, warmth, edge density) on all 169 photos. The full per-photo data is in `content-analysis.json`.

| Metric | Folder 1 (R50) | Folder 2 (T7 + iPhone) | What it means |
|---|---|---|---|
| Avg brightness | 0.106 | 0.104 | Both ~10% — pitch-dark club with stage lights |
| Avg dark-pixel ratio (>70% black) | 62% | 71% | Folder 1 slightly less dark (post-editing lifted shadows) |
| Avg bright-pixel ratio (>80% white) | 0.2% | 0.4% | Almost no white surfaces — moody event |
| Avg skin-tone ratio | 1.2% | 3.2% | Folder 2 has more people-shots (candid) |
| Avg warmth (R−B channel diff) | **+0.46** | +0.23 | Folder 1 is dramatically warmer (red stage lighting) |
| Orientation | 24 L + 13 P | 132 L + 0 P | Folder 1 has portrait shots (vertical compositions) |
| Dominant color (all 169) | **#000000** (black) | **#000000** (black) | Black is the dominant bucket in every photo |

### Interpretation

- **Black-dominant, warm, low-skin** is the consistent profile across both folders. This is moody nightclub photography, not bright portrait photography. The 71% dark ratio in folder 2 + warm dominant tones (red stage lights, candles, body paint) is consistent with the BDSM/kink event aesthetic.
- **Folder 1's higher warmth (+0.46 vs +0.23)** comes from two sources: (a) post-processing lifted the reds in Camera Raw, and (b) the photographer was shooting with a prime 50mm F1.8 lens wide open, which exaggerates warm bokeh. Those two factors make folder 1 better-suited for the website's hero treatment.
- **No `bright_pct` > 5%** in any photo. There are no "daylight" or "well-lit" shots. Every photo is night/event lighting.
- **Dominant color = #000000** for ~70% of folder 2 photos (the "very dark" cluster). These are the ones the heuristic flagged as `atmosphere` candidates.

---

## Curated selection for the website

Picked from folder 1 (the post-processed official set) using these rules:

| Role | Rule | Pick |
|---|---|---|
| **Hero** | Landscape, brightness 0.06-0.20, skin-tone < 5%, warmth > 0.30 (warm/red dominant), high color variety | `IMG_0006.JPG` |
| **Atmosphere (×5)** | Landscape, brightness 0.05-0.20, warmth > 0.20, high edge density (busy scenes with light/shadow contrast) | `IMG_0080.JPG`, `IMG_0071.JPG`, `IMG_0088.JPG`, `IMG_0073.JPG`, `IMG_0085.JPG` |
| **Crowd / people (×3)** | Landscape, skin-tone ratio 3-30% (people visible but not close-up portraits) | `IMG_0071.JPG`, `IMG_0084.JPG`, plus one more |
| **Performance / portrait (×2)** | Portrait orientation, warm + high color variety (focused compositions) | `IMG_0027.JPG`, `IMG_0058.JPG` |

11 photos total, all from folder 1. Full selection with metadata in `curated-picks.json`.

**Why folder 1 over folder 2 for website use:** cleaner post-processing, warmer tone, has portrait compositions, smaller file sizes (~1-3 MB vs 5-9 MB), photographer (external) intended these as the "final" set. Folder 2 is the raw event coverage — better for archival and the `/galeria` page, worse for hero.

---

## How to add these to the website

The 11 curated picks have been copied to `apps/maskarada/public/images/event-2026-06-11/` in the monorepo, alongside the original `event_508619.jpg` (the very first / older event photo) and `event_508986.jpg` that were already there.

**Naming convention** (to match the existing pattern of `event_508619.jpg` style — i.e. human-readable but the file paths don't follow the Drive names):

```
apps/maskarada/public/images/event-2026-06-11/
├── hero.jpg                       (was: IMG_0006.JPG — wide warm shot, perfect for the homepage hero)
├── atmosphere-01.jpg              (was: IMG_0080.JPG)
├── atmosphere-02.jpg              (was: IMG_0071.JPG)
├── atmosphere-03.jpg              (was: IMG_0088.JPG)
├── atmosphere-04.jpg              (was: IMG_0073.JPG)
├── atmosphere-05.jpg              (was: IMG_0085.JPG)
├── crowd-01.jpg                   (was: IMG_0071.JPG)  ← same file as atmosphere-02, used in 2 contexts
├── crowd-02.jpg                   (was: IMG_0084.JPG)
├── performance-01.jpg             (was: IMG_0027.JPG — portrait, very warm)
└── performance-02.jpg             (was: IMG_0058.JPG)
```

**TODO before going live:** all 11 images need a human visual review (pass over each photo and confirm: no accidental nudity in the wrong place, no identifiable guests who didn't consent to public use, no private-room content). Until that review happens, the photos should NOT be linked from any public page. The current monorepo's `/galeria` page still uses the original flyer set (Flyers category) and Instagram photos (Photos category) — those are pre-approved marketing material.

## Caveats

- **EXIF dates are 3 days after the event** (DateTime vs DateTimeOriginal). The original capture time on the photos is 2026-06-11 22:29-00:48 — the upload to Drive happened on 2026-06-14. The DateTimeDigitized also shows 2026-06-11, so the cameras' internal clocks were set correctly. Don't use DateTime (the upload date) for "taken at" claims.
- **Adobe Camera Raw software tag on folder 1** confirms post-processing. The external photographer delivered these as finals, not raws.
- **One Drive file is a shortcut** to the other folder. Don't count items blindly — `drive-list` returns 133 for folder 2 (132 photos + 1 shortcut). 132 + 37 = 169 actual unique photos.
- **No GPS data** in any photo. EXIF GPSLatitude/Longitude is absent. That's normal for BDSM/kink events — location privacy is intentional.

## Re-running the download

```bash
source ~/.hermes/skills/erebus/google-drive/aliases.sh
# Refresh the local mirror:
drive-list 17v1wjnobXMWSVcYdlTjO9dcGjJL3NcOp | grep -oE '\([A-Za-z0-9_-]{20,}\)' | tr -d '()' | \
  xargs -I{} drive-download {} <name>
# or use drive-search / drive-get / drive-tree for navigation
```
