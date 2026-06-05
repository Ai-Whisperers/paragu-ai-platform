import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from '@/app/api/instagram/route'

describe('GET /api/instagram', () => {
  beforeEach(() => {
    vi.stubEnv('INSTAGRAM_ACCESS_TOKEN', undefined)
  })

  it('returns 200 with handle and url based on config when token missing', async () => {
    vi.stubEnv('INSTAGRAM_ACCESS_TOKEN', '')

    const url = new URL("http://localhost:3000/api/instagram")
    const request = new Request(url.toString())
    const response = await GET(request)
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(json).toHaveProperty('posts')
    expect(json).toHaveProperty('fallback')
  })

  it('returns posts from Instagram API when token is configured', async () => {
    vi.stubEnv('INSTAGRAM_ACCESS_TOKEN', 'mock-token-123')

    const mockPosts = {
      data: [
        {
          id: '123',
          caption: 'Test post',
          media_type: 'IMAGE',
          media_url: 'https://example.com/image.jpg',
          permalink: 'https://instagram.com/p/123',
          timestamp: '2024-01-01T00:00:00+0000',
          like_count: 42,
        },
      ],
    }

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockPosts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    const url = new URL("http://localhost:3000/api/instagram")
    const request = new Request(url.toString())
    const response = await GET(request)
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(json.posts).toBeInstanceOf(Array)
    expect(json.posts[0]).toMatchObject({
      id: '123',
      type: 'IMAGE',
      url: 'https://example.com/image.jpg',
      caption: 'Test post',
      likes: 42,
      permalink: 'https://instagram.com/p/123',
    })
    expect(json.fallback).toBe(false)

    vi.spyOn(global, 'fetch').mockRestore()
  })

  it('handles graceful fallback when Instagram API fails', async () => {
    vi.stubEnv('INSTAGRAM_ACCESS_TOKEN', 'mock-token-123')

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response('', { status: 500 })
    )

    const url = new URL("http://localhost:3000/api/instagram")
    const request = new Request(url.toString())
    const response = await GET(request)
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(json.posts).toBeNull()
    expect(json.fallback).toBe(true)

    vi.spyOn(global, 'fetch').mockRestore()
  })
})