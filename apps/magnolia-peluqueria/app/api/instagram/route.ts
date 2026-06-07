import { NextResponse } from "next/server"

export const revalidate = 3600

interface IgMedia {
  id: string
  caption?: string
  media_type: string
  media_url: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
  like_count?: number
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    return NextResponse.json({ posts: null, fallback: true })
  }

  try {
    const apiUrl = "https://graph.instagram.com/me/media"
    const params = new URLSearchParams({
      fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count",
      access_token: token,
      limit: "12",
    })
    const res = await fetch(`${apiUrl}?${params}`, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error("Instagram API error")
    const data = await res.json()
    return NextResponse.json({
      posts: (data.data as IgMedia[]).map((p) => ({
        id: p.id,
        type: p.media_type,
        url: p.media_type === "VIDEO" ? (p.thumbnail_url || p.media_url) : p.media_url,
        caption: p.caption?.slice(0, 80) || "",
        likes: p.like_count,
        permalink: p.permalink,
        timestamp: p.timestamp,
      })),
      fallback: false,
    })
  } catch {
    return NextResponse.json({ posts: null, fallback: true })
  }
}
