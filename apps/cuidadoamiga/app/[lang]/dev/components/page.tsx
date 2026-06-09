import { notFound } from 'next/navigation'
import { ComponentsPreview } from './ComponentsPreview'

export default function DevComponentsPage() {
  // Server-side gate — never renders in production builds
  if (!process.env.NEXT_PUBLIC_DEV_COMPONENTS) {
    notFound()
  }

  return <ComponentsPreview />
}
