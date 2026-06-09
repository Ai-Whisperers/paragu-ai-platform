import Script from 'next/script'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
