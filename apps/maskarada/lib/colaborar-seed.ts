/**
 * Seed list of "missing things" — the orgs, vendors, spaces, and roles
 * the community needs but doesn't have yet. Anyone can claim one of
 * these. The first person who says "I'll do it" gets a contact slot
 * on /colaborar.
 *
 * To add a missing-thing, append a SeedColaborar entry below. To claim
 * one, the person submits through /colaborar/claim?slug=<slug> or just
 * contacts Kiki directly.
 */

export type SeedColaborar = {
  slug: string;
  kind: "ally_missing" | "vendor_missing" | "space_missing" | "role_missing" | "event_idea";
  title: string;
  description: string;
  contact_optional?: string;
};

export const SEED_COLABORAR: SeedColaborar[] = [
  // ─── Allies we wish existed in Paraguay ───────────────────────────────
  {
    slug: "kink-aware-therapist-asuncion",
    kind: "ally_missing",
    title: "Kink-aware therapist collective in Asunción",
    description: "A directory or collective of therapists in Asunción who understand BDSM, kink, poly, and non-traditional relationship structures. Currently we have to refer people to Buenos Aires or São Paulo. A local option would dramatically improve aftercare for people in the scene.",
  },
  {
    slug: "queer-trans-shelter",
    kind: "ally_missing",
    title: "Emergency shelter that explicitly welcomes queer and trans people",
    description: "Asunción has shelter networks but kink/queer people are often turned away or made uncomfortable. An explicit-affirming shelter or a 2-3 person host network (someone's spare room) for emergencies.",
  },
  {
    slug: "sex-ed-for-educators",
    kind: "ally_missing",
    title: "Sex-positive education for school counselors",
    description: "A working group of educators or counselors in PY schools trained in affirming, kink-aware, consent-first sex ed. Long-term project, not a one-off.",
  },

  // ─── Vendors / product categories that don't exist in PY yet ────────
  {
    slug: "leather-crafter-py",
    kind: "vendor_missing",
    title: "A leather crafter in Paraguay",
    description: "Hand-crafted leather cuffs, collars, harnesses, floggers, paddles. High-signal category — most of the LATAM scene gets theirs from AR/BR/MX. A local leatherworker (or one willing to relocate/visit) would own this category.",
  },
  {
    slug: "kink-candle-maker-py",
    kind: "vendor_missing",
    title: "Massage / wax-play candle maker",
    description: "Soy wax, low-temp melt, sensual scents. Sells at events, online. Low barrier to entry for a small-batch maker.",
  },
  {
    slug: "bdsm-kugurumi",
    kind: "vendor_missing",
    title: "BDSM kugurumi / onesie maker",
    description: "Adult kawaii sensory-friendly onesies. Huge in the JP scene, novelty in LATAM. Etsy-style maker that ships to PY.",
  },
  {
    slug: "lube-maker-py",
    kind: "vendor_missing",
    title: "Local lube / body-safe product maker",
    description: "Water-based and silicone lubes, body oils, intimate care. Recurring purchase category — always sellable.",
  },
  {
    slug: "shibari-teacher-py",
    kind: "vendor_missing",
    title: "Shibari instructor / rope teacher",
    description: "Regular rope-top or rope-bottom instruction. Not a product vendor — a service vendor. Could run a monthly class (see /aprender/workshop-negociacion for a model).",
  },
  {
    slug: "kink-aware-photographer",
    kind: "vendor_missing",
    title: "Kink-aware event photographer",
    description: "Someone who can shoot our events at the standard the existing 9 curated photos hit, but in volume and across multiple events. The current set is one photographer × one event. We need someone with kink-community protocol (no face shots without consent, etc.) for repeat work.",
  },

  // ─── Spaces / venues we need ────────────────────────────────────────
  {
    slug: "private-event-venue-asuncion",
    kind: "space_missing",
    title: "Private event venue in Asunción",
    description: "An indoor space (not a bar, not a club) that allows kink-adjacent events. Capacity 80-200, with at least 3 distinct rooms for play areas + a separate chill/aftercare space. Reasonable rent. Currently we rent by-the-night for each edition; a recurring relationship would simplify logistics massively.",
  },
  {
    slug: "munch-cafe-rotation",
    kind: "space_missing",
    title: "Café in Asunción that hosts regular munches",
    description: "A café comfortable with ~15-20 people meeting monthly on a recurring day. Vanilla setting, queer-friendly, low background music. Doesn't need to advertise that it's a kink munch — just needs to be OK with the rotation.",
  },
  {
    slug: "rope-jam-space",
    kind: "space_missing",
    title: "Practice space for rope jams",
    description: "A clean floor, sturdy rigging point, 3-hour window monthly. Doesn't need to be a permanent venue — could be someone's home, a studio, a yoga space after hours.",
  },

  // ─── Community roles we need filled ────────────────────────────────
  {
    slug: "english-translator",
    kind: "role_missing",
    title: "EN ↔ ES translator for /aprender guides",
    description: "The 6 guides in /aprender are ES-only. We want bilingual versions. Professional translation of ~5-10 pages of kink/safety content. Will be credited on the page.",
  },
  {
    slug: "community-photographer",
    kind: "role_missing",
    title: "Community photographer (volunteer, not paid)",
    description: "Different from the 'event photographer' vendor above. This is someone IN the community who takes casual photos at events with consent. Always disclosed, never hidden. Sometimes attendees don't have anyone to take their photo — this role fills that.",
  },
  {
    slug: "discord-admin",
    kind: "role_missing",
    title: "Discord/Telegram moderator",
    description: "The 120-person Telegram group is currently 1-admin. Need 1-2 co-mods with explicit training on kink-community moderation norms (no kink-shaming, no outing, no unwanted DMs). 1-2 hours/week.",
  },
  {
    slug: "discord-treasurer",
    kind: "role_missing",
    title: "Treasurer / RUC person for the platform",
    description: "When the multi-vendor marketplace launches, we need a RUC (PY tax ID) to receive payments and pay out vendors. Either a community member willing to take the role, or an external contador.",
  },

  // ─── Event ideas we haven't tried yet ──────────────────────────────
  {
    slug: "outdoor-rope-day",
    kind: "event_idea",
    title: "Outdoor rope day (Daytona-style)",
    description: "A rope-top/bottom practice day outdoors — gardens, river, etc. Lower-stakes than a full maskarada, but a real community event. Need a venue, weather plan, and a coordinator.",
  },
  {
    slug: "kink-book-club",
    kind: "event_idea",
    title: "Kink book club",
    description: "Monthly. Pick a book (Screw the Roses, The New Bottoming Book, etc.), read 1-2 chapters, meet at a café. Low-barrier entry, intellectual, no play.",
  },
  {
    slug: "aftercare-picnic",
    kind: "event_idea",
    title: "Aftercare picnic / day-after brunch",
    description: "Sunday after each maskarada, an open public picnic for attendees and friends. Vanilla, family-friendly. Helps people who crashed at a friend's place integrate back into their day.",
  },
];
