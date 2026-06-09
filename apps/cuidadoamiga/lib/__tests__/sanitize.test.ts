import { describe, it, expect } from 'vitest'
import { sanitizeString, isValidHttpUrl, sanitizeUrl, sanitizeFuentes } from '../sanitize'

describe('sanitizeString', () => {
  it('strips HTML tags', () => {
    expect(sanitizeString('<script>alert(1)</script>hello')).toBe('hello')
    expect(sanitizeString('<b>bold</b> text')).toBe('bold text')
  })

  it('trims whitespace', () => {
    expect(sanitizeString('  hello  ')).toBe('hello')
  })

  it('caps length', () => {
    expect(sanitizeString('a'.repeat(1000), 10)).toBe('a'.repeat(10))
  })

  it('returns empty for non-strings', () => {
    expect(sanitizeString(null)).toBe('')
    expect(sanitizeString(undefined)).toBe('')
    expect(sanitizeString(123)).toBe('')
  })
})

describe('isValidHttpUrl', () => {
  it('accepts http and https', () => {
    expect(isValidHttpUrl('https://example.com')).toBe(true)
    expect(isValidHttpUrl('http://example.com/path')).toBe(true)
  })

  it('rejects other protocols', () => {
    expect(isValidHttpUrl('ftp://example.com')).toBe(false)
    expect(isValidHttpUrl('javascript:alert(1)')).toBe(false)
    expect(isValidHttpUrl('file:///etc/passwd')).toBe(false)
  })

  it('rejects invalid URLs', () => {
    expect(isValidHttpUrl('not a url')).toBe(false)
    expect(isValidHttpUrl('')).toBe(false)
  })
})

describe('sanitizeUrl', () => {
  it('returns valid http(s) URLs', () => {
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com')
  })

  it('returns empty for invalid', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBe('')
    expect(sanitizeUrl(123)).toBe('')
  })
})

describe('sanitizeFuentes', () => {
  it('keeps only valid http(s) URLs', () => {
    const result = sanitizeFuentes(['https://a.com', 'ftp://b.com', 'not a url', 'http://c.com'])
    expect(result).toEqual(['https://a.com', 'http://c.com'])
  })

  it('caps at max count', () => {
    const many = Array.from({ length: 20 }, (_, i) => `https://example.com/${i}`)
    expect(sanitizeFuentes(many, 5).length).toBe(5)
  })

  it('handles non-arrays', () => {
    expect(sanitizeFuentes(null)).toEqual([])
    expect(sanitizeFuentes('not an array')).toEqual([])
  })
})
