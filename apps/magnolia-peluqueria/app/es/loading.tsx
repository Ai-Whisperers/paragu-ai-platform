import { HeroSkeleton, ServicesGridSkeleton, TestimonialCardSkeleton } from "@/components/Skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSkeleton />
      <div className="container-page py-12 space-y-16">
        <ServicesGridSkeleton />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <TestimonialCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
