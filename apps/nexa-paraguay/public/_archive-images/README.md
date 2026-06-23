# `public/_archive-images/`

Marketing asset library — **not shipped in the Docker image**.

These image subdirectories are kept in the repo for marketing reference
(ad creatives, email campaign visuals, full team/press/process photosets,
testimonial headshots, lifestyle photography) but are **not loaded by the
Next.js app at runtime**. The `Dockerfile` only copies the actively
referenced subdirectories from `public/images/` (currently: `blog`,
`brand`, `flags`, `hero`).

## When to use this folder

- Marketer or designer needs to find the original source for an ad
  creative or email campaign image
- Building a press kit or social-media asset pack
- Referencing a prior photo during a content rewrite

## When NOT to use this folder

- Adding a new image that should render on the site. Put it directly in
  `public/images/<subdir>/` and reference it from the content JSON.

## Why not just delete it?

The asset library is part of the engagement's institutional memory. These
images are part of past campaigns and decisions documented in
`docs/06-marketing/ads/` and `docs/06-marketing/content/`. Deleting them
loses the audit trail. If you want to remove any of them, do it
deliberately with a decision log entry in `docs/NEXA_DECISIONS.md`.

## Cleanup policy

The content team reviews this folder quarterly. Anything that has not
been referenced in a campaign or press cycle in 12+ months is moved to
cold storage on Google Drive and a reference note replaces it here.
