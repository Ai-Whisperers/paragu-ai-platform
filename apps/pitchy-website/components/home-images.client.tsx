"use client"

export function HeroBackgroundImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={(e) => {
        ;(e.target as HTMLImageElement).style.display = "none"
      }}
    />
  )
}

export function ProductThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={(e) => {
        const parent = (e.target as HTMLImageElement).parentElement
        if (parent) parent.style.display = "none"
      }}
    />
  )
}
