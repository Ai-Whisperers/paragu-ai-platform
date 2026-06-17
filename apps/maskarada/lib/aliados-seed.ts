/**
 * Seed list of aliados curated from research (docs/research-aliados-2026-06-16.md).
 * These render immediately on /aliados even before mk_aliados table is
 * populated. The DB-backed ones from getApprovedAliados() are merged in
 * when present (and deduped by name).
 *
 * To keep this in sync with research: re-read the doc and add/remove.
 */

export type SeedAliado = {
  slug: string;
  name: string;
  category: "lgtbi_org" | "sex_positive" | "kink_org" | "wellness" | "craft" | "media" | "venue" | "other";
  scope: "py" | "latam" | "international";
  city?: string;
  country?: string;
  description: string;
  website?: string;
  instagram?: string;
  relationship?: string;
  /** If true, we already have an outreach conversation in progress; show "✓ contact made" badge */
  inOutreach?: boolean;
};

export const SEED_ALIADOS: SeedAliado[] = [
  // ─── Paraguay — LGTBI+ community & adjacent ─────────────────────────
  {
    slug: "somosgay",
    name: "SOMOSGAY",
    category: "lgtbi_org",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "Largest visible LGTBI+ org in PY. Annual Pride, Besatón, HIV programming, political advocacy with OAS and Inter-American Court.",
    website: "https://somosgay.org",
    relationship: "Cross-promotion, shared audience",
    inOutreach: true,
  },
  {
    slug: "aireana",
    name: "Aireana",
    category: "lgtbi_org",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "First PY org for lesbians (since 2003). Organizes the International Festival of Cine LesBiGayTrans annually.",
    website: "https://aireana.org.py",
    relationship: "Cultural ally; the cine/film festival audience is adjacent to our /cine page",
  },
  {
    slug: "repadis",
    name: "REPADIS",
    category: "lgtbi_org",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "Red Paraguaya de la Diversidad Sexual — coalition of 14+ LGTBI+ orgs in PY.",
    website: "https://repadis.wordpress.com",
    relationship: "Coalition-level intro; one email reaches the whole network",
  },
  {
    slug: "fundacion-vencer",
    name: "Fundación Vencer",
    category: "wellness",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "HIV prevention, support, and testing for MSM, trans, and sex worker communities.",
    relationship: "Safer-sex resources; health partner for events",
  },
  {
    slug: "codehupy",
    name: "CODEHUPY",
    category: "lgtbi_org",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "Coordinadora de Derechos Humanos del Paraguay. Annual human rights report with a dedicated LGTBI+ chapter since 2002.",
    website: "https://codehupy.org.py",
    relationship: "Institutional ally; policy support if ever needed",
  },
  {
    slug: "coalicion-tlgbi",
    name: "Coalición TLGBI Paraguay",
    category: "lgtbi_org",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "Coalition of 14+ orgs under Aireana: Casa Diversa, Cristianos Inclusivos, Diversidad Frontera, Escalando, Maternidades Diversas, PsiCoFem, and more.",
    relationship: "Same as REPADIS — coalition-level intro",
  },
  {
    slug: "casa-diversa",
    name: "Casa Diversa",
    category: "lgtbi_org",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "Trans-focused community house. Drop-in, peer support, advocacy.",
    relationship: "Trans inclusion guidance; language, events, hiring",
  },
  {
    slug: "psicofem",
    name: "PsiCoFem",
    category: "wellness",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "Feminist psychology collective. Member of Coalición TLGBI.",
    relationship: "Kink-aware therapy referrals",
  },

  // ─── LATAM — kink/BDSM/fetish scene ──────────────────────────────────
  {
    slug: "mazmo",
    name: "Mazmo",
    category: "kink_org",
    scope: "latam",
    city: "Online (HQ Buenos Aires)",
    country: "AR",
    description: "Largest Spanish-language kink social network. Foros, comunidades, chat, dating, event listings.",
    website: "https://mazmo.net",
    relationship: "Cross-post events; find regional speakers",
  },
  {
    slug: "sexpoerotica-ar",
    name: "SexpoErótica",
    category: "kink_org",
    scope: "latam",
    city: "Buenos Aires",
    country: "AR",
    description: "Largest erotica/sexuality festival in Argentina, 18+ years running. Shows, artists, stands, talks.",
    website: "https://sexpoerotica.com.ar",
    relationship: "Partner event; collaboration model for our maskarada editions",
  },
  {
    slug: "erosxcon-cl",
    name: "ErosXcon",
    category: "kink_org",
    scope: "latam",
    city: "Santiago",
    country: "CL",
    description: "First erotic convention in Chile.",
    website: "https://www.erosxcon.com",
    relationship: "Regional ally, smaller",
  },
  {
    slug: "expo-sexo-latino",
    name: "Expo Sexo Latino",
    category: "kink_org",
    scope: "latam",
    city: "Mexico City",
    country: "MX",
    description: "Largest LATAM adult entertainment event. Palacio de los Deportes.",
    relationship: "Regional scale; 'what's happening in the region' link",
  },
  {
    slug: "asuncion-bdsm",
    name: "Asunción BDSM (Facebook)",
    category: "kink_org",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "Self-described 'primera comunidad BDSM en Paraguay'. 396+ members on Facebook.",
    relationship: "Direct audience overlap; relationship worth building",
  },
  {
    slug: "bdsmenparaguay",
    name: "BDSM en Paraguay",
    category: "kink_org",
    scope: "py",
    city: "Asunción",
    country: "PY",
    description: "Site with contacts and directory for spankers, flagelación, contacts in Asunción + Encarnación + Ciudad del Este.",
    website: "https://www.bdsmenparaguay.com",
    relationship: "Reach the audience we don't have; cross-link or guest-write",
  },

  // ─── International — reference / models ────────────────────────────
  {
    slug: "leather-archives",
    name: "The Leather Archives & Museum",
    category: "kink_org",
    scope: "international",
    city: "Chicago",
    country: "US",
    description: "50+ years of leather/kink history, public exhibits, consent-cleared photo archive. Model for /historia.",
    website: "https://leatherarchives.org",
    relationship: "Reference for consent-cleared photo archive model",
  },
  {
    slug: "fetlife",
    name: "FetLife",
    category: "kink_org",
    scope: "international",
    description: "The de-facto kink social network. 50k+ munches globally. We complement, not compete.",
    website: "https://fetlife.com",
    relationship: "'Find us on FetLife' link in footer",
  },
  {
    slug: "ilga",
    name: "ILGA World",
    category: "lgtbi_org",
    scope: "international",
    description: "International LGTBI+ federation. 1,700+ member orgs across 160+ countries.",
    website: "https://ilga.org",
    relationship: "Institutional contact for coalition work",
  },
  {
    slug: "ncsf",
    name: "NCSF",
    category: "kink_org",
    scope: "international",
    description: "National Coalition for Sexual Freedom. Kink/leather advocacy, gold-standard consent resources.",
    website: "https://ncsfreedom.org",
    relationship: "Model/reference org for consent resources",
  },
];
