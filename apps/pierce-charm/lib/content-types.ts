// Loose JSON content bag — the site content JSON is dynamic; we do not enforce
// a strict schema at the type level. Callers deep-access fields freely.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SiteContent = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContentItem = Record<string, any>;
