/**
 * Compat barrel — historical import path used by universal marketing/portal
 * components. Canonical impl lives at `@/lib/universal/registry`.
 *
 * NOTE: separate from `@/lib/portal/features` which handles tier-based
 * plan capabilities (free/starter/professional/enterprise). This shim is
 * for the runtime feature-flag lookup by locale (`isFeatureEnabled`,
 * `getFeatures`) used by marketing/CTA/portal components.
 */
export { getFeatures, isFeatureEnabled } from '@/lib/universal/registry'
export type { FeatureFlags } from '@/lib/universal/registry'
