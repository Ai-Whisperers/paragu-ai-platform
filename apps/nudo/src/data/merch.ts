export const merch = [
  {
    id: 'desahogo-tshirt',
    name: 'DESAHOGO T-Shirt',
    price: { pyg: '120,000', usd: '15' },
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Estampado en algodón pesado 100%. Front: DESAHOGO EP artwork. Back: letra de CULPA.',
    waTemplate: 'Hola! Quiero la remera DESAHOGO en talle [SIZE] — 120,000 Gs.',
    featured: true,
    category: 'apparel',
    emoji: '👕'
  },
  {
    id: 'nudo-hoodie',
    name: 'Nüdo Hoodie',
    price: { pyg: '250,000', usd: '32' },
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Buzo fleece premium con logo bordado. Estampado de la banda en el pecho.',
    waTemplate: 'Hola! Quiero el buzo Nüdo en talle [SIZE] — 250,000 Gs.',
    featured: true,
    category: 'apparel',
    emoji: '👕'
  },
  {
    id: 'sticker-pack',
    name: 'Nüdo Sticker Pack',
    price: { pyg: '25,000', usd: '3' },
    sizes: [],
    description: 'Set de 5 stickers vinílicos. Impermeables, resistentes UV. 7x7cm cada uno.',
    waTemplate: 'Hola! Quiero el pack de stickers Nüdo — 25,000 Gs.',
    featured: false,
    category: 'accessories',
    emoji: '🎒'
  },
  {
    id: 'desahogo-digital',
    name: 'DESAHOGO — Álbum Digital',
    price: { pyg: '50,000', usd: '6' },
    sizes: [],
    description: 'Álbum digital completo (4 temas) en MP3 + WAV de alta calidad. Incluye booklet digital. Se entrega por email.',
    waTemplate: 'Hola! Quiero el álbum digital DESAHOGO — 50,000 Gs.',
    featured: true,
    category: 'digital',
    emoji: '💿'
  },
  {
    id: 'culpa-poster',
    name: 'CULPA Lyric Poster',
    price: { pyg: '80,000', usd: '10' },
    sizes: [],
    description: 'Póster 45x60cm mate. Letra completa de CULPA sobre ilustración nocturna. Firmado y numerado.',
    waTemplate: 'Hola! Quiero el póster de CULPA — 80,000 Gs.',
    featured: false,
    category: 'posters',
    emoji: '🖼️'
  }
]

export const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'apparel', label: 'APPAREL' },
  { id: 'accessories', label: 'ACCESSORIES' },
  { id: 'digital', label: 'DIGITAL' },
  { id: 'posters', label: 'POSTERS' }
]
