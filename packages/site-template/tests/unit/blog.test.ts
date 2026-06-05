import { describe, it, expect } from "vitest"
import { calculateReadingTime, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/api/blog"

describe("lib/blog.ts", () => {
  describe("calculateReadingTime", () => {
    it("calculates reading time for short content", () => {
      const content = "Hola mundo esto es un test"
      const minutes = calculateReadingTime(content)
      expect(minutes).toBeGreaterThanOrEqual(1)
    })

    it("calculates reading time for long content", () => {
      const words = Array.from({ length: 500 }, (_, i) => `palabra${i}`).join(" ")
      const minutes = calculateReadingTime(words)
      expect(minutes).toBeGreaterThanOrEqual(1)
    })

    it("returns at least 1 minute for very short content", () => {
      expect(calculateReadingTime("hola")).toBe(1)
    })

    it("handles empty string", () => {
      expect(calculateReadingTime("")).toBe(1)
    })
  })

  describe("getAllPosts", () => {
    it("returns Spanish posts for lang es", () => {
      const posts = getAllPosts("es")
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeGreaterThan(0)
      posts.forEach((p) => {
        expect(typeof p.slug).toBe("string")
        expect(typeof p.title).toBe("string")
        expect(typeof p.excerpt).toBe("string")
      })
    })

    it("returns English posts for lang en", () => {
      const posts = getAllPosts("en")
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeGreaterThan(0)
    })

    it("Spanish and English posts differ", () => {
      const esPosts = getAllPosts("es")
      const enPosts = getAllPosts("en")
      expect(esPosts[0]?.title).not.toBe(enPosts[0]?.title)
    })
  })

  describe("getPostBySlug", () => {
    it("returns post for valid slug", () => {
      const posts = getAllPosts("es")
      const firstSlug = posts[0]?.slug
      const post = getPostBySlug(firstSlug!, "es")
      expect(post).toBeDefined()
      expect(post!.slug).toBe(firstSlug)
    })

    it("returns undefined for unknown slug", () => {
      const post = getPostBySlug("this-does-not-exist", "es")
      expect(post).toBeUndefined()
    })
  })

  describe("getRelatedPosts", () => {
    it("returns posts in same category excluding current", () => {
      const posts = getAllPosts("es")
      if (posts.length < 2) return
      const firstPost = posts[0]
      const related = getRelatedPosts(firstPost.slug, firstPost.category, "es")
      related.forEach((p) => {
        expect(p.slug).not.toBe(firstPost.slug)
        expect(p.category).toBe(firstPost.category)
      })
    })

    it("limits to 3 related posts", () => {
      const posts = getAllPosts("es")
      if (posts.length === 0) return
      const firstPost = posts[0]
      const related = getRelatedPosts(firstPost.slug, firstPost.category, "es")
      expect(related.length).toBeLessThanOrEqual(3)
    })

    it("returns empty array when no related posts", () => {
      const related = getRelatedPosts("non-existent", "non-existent-category", "es")
      expect(related).toEqual([])
    })
  })
})