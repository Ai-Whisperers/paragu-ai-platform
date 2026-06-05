/**
 * Detects whether we're in template or example mode based on URL.
 * Template mode: /es/ (shows prompts like "TU_NOMBRE")
 * Example mode: /es/ (shows ParaguAI filled content)
 */

export type SiteMode = "template" | "example"

export function getSiteMode(pathname: string): SiteMode {
  // Check if path contains /
  if (pathname.includes("/") || pathname.endsWith("/ejemplo")) {
    return "example"
  }
  // Check query param mode=example
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search)
    if (params.get("mode") === "example") {
      return "example"
    }
  }
  return "template"
}

export function isTemplateMode(pathname: string): boolean {
  return getSiteMode(pathname) === "template"
}

export function isExampleMode(pathname: string): boolean {
  return getSiteMode(pathname) === "example"
}