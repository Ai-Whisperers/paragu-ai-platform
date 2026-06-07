interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: any
}

export function generateBusinessSchema() {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: 'Magnolia Peluquería',
    image: 'https://magnolia-peluqueria.paragu-ai.com/images/logo.png',
    description: 'Premium hair salon in Asunción offering professional hair cutting, coloring, treatments, and styling services.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. principal 123',
      addressLocality: 'Asunción',
      addressRegion: 'Asunción',
      postalCode: '001101',
      addressCountry: 'PY'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-25.2868',
      longitude: '-57.6328'
    },
    url: 'https://magnolia-peluqueria.paragu-ai.com',
    telephone: '+595 981 123456',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00'
      }
    ],
    sameAs: [
      'https://www.instagram.com/magnoliapeluqueria',
      'https://www.facebook.com/magnoliapeluqueria'
    ]
  }
  return schema
}

export function generateProductSchema(product: any) {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Magnolia Professional'
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://magnolia-peluqueria.paragu-ai.com/products/${product.id}`
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews_count || 0
    } : undefined
  }
  return schema
}

export function generateArticleSchema(article: any) {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author
    },
    datePublished: article.date,
    dateModified: article.date,
    publisher: {
      '@type': 'Organization',
      name: 'Magnolia Peluquería',
      logo: {
        '@type': 'ImageObject',
        url: 'https://magnolia-peluqueria.paragu-ai.com/images/logo.png'
      }
    }
  }
  return schema
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
  return schema
}
