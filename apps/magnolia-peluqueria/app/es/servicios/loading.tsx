import { ServicesGridSkeleton } from "@/components/Skeleton"

export default function ServiciosLoading() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="container-page max-w-5xl">
        <div className="mt-4">
          <ServicesGridSkeleton />
        </div>
      </div>
    </div>
  )
}
