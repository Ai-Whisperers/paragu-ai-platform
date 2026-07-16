import content from "../../content/es.json"
import { SectionsRenderer } from "../components/SectionsRenderer"

export default function HomePage() {
  return <SectionsRenderer content={content} />
}
