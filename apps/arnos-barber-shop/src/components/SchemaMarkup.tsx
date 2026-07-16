import content from "../../content/es.json"
import { buildBarberShopSchema, buildFaqSchema, buildServicesSchema } from "../lib/site-schema"

const schemas = [
  buildBarberShopSchema(content),
  ...buildServicesSchema(content),
  buildFaqSchema(content),
]

export function SchemaMarkup() {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
