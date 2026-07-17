/**
 * Security Sanitization Utilities
 * 
 * Protects against XSS and CSS injection attacks
 */

import { logger } from '@/lib/logger'

/**
 * Minimal inline cssesc replacement. Avoids the external dep for a module
 * that currently has zero callers — if the escaping needs grow, swap for the
 * npm package (`pnpm add -F builder cssesc`) and restore the original import.
 *
 * Escapes anything outside `[\w\s.,()#-]` as a hex CSS escape (\ HH ) with a
 * trailing space per the CSS spec so consecutive escapes stay unambiguous.
 */
function cssesc(value: string, _opts: { isIdentifier?: boolean; quotes?: 'single' | 'double'; wrap?: boolean } = {}): string {
  return value.replace(/[^\w\s.,()#-]/g, (ch) => {
    const cp = ch.codePointAt(0)
    if (cp == null) return ''
    return '\\' + cp.toString(16) + ' '
  })
}

// Dangerous CSS keywords that could enable XSS
const DANGEROUS_CSS_KEYWORDS = [
  'expression',
  'javascript:',
  'behavior:',
  '<script',
  '</script>',
  '@import',
  'binding',
  '-moz-binding',
  'url(',
  'data:text/html',
  'data:application/x-javascript'
]

/**
 * Sanitize CSS to prevent CSS injection attacks
 */
export function sanitizeCSS(css: string): string {
  // Check for dangerous keywords
  const lowerCSS = css.toLowerCase()
  for (const dangerous of DANGEROUS_CSS_KEYWORDS) {
    if (lowerCSS.includes(dangerous.toLowerCase())) {
      throw new Error(`Invalid CSS: contains dangerous keyword "${dangerous}"`)
    }
  }
  
  // Escape special characters
  return cssesc(css, {
    isIdentifier: false,
    quotes: 'double',
    wrap: false
  })
}

/**
 * Validate and sanitize theme CSS
 */
export function sanitizeThemeCSS(cssString: string): string {
  try {
    // Basic CSS structure validation
    if (!cssString || typeof cssString !== 'string') {
      return ''
    }
    
    // Limit length to prevent DoS
    if (cssString.length > 100000) {
      throw new Error('CSS too long')
    }
    
    return sanitizeCSS(cssString)
  } catch (error) {
    logger.warn('CSS sanitization failed — falling back to safe defaults', {
      action: 'security.sanitizeCss',
      error: error instanceof Error ? error.message : String(error),
    })
    // Return empty safe CSS on error
    return ''
  }
}

/**
 * Sanitize JSON for script injection
 */
export function sanitizeJSONString(jsonString: string): string {
  // Replace dangerous characters
  return jsonString
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

/**
 * Validate HTML content (basic)
 * For full sanitization, use DOMPurify on client side
 */
export function validateHTML(html: string): boolean {
  const dangerous = [
    '<script',
    'javascript:',
    'onerror=',
    'onload=',
    'eval(',
    'document.cookie',
    'document.write',
    'window.location'
  ]
  
  const lowerHTML = html.toLowerCase()
  return !dangerous.some(d => lowerHTML.includes(d))
}
