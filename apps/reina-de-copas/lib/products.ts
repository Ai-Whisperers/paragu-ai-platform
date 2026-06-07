export interface Product {
  sku: string;
  name: string;
  category: 'Copa Menstrual' | 'Disco Menstrual' | 'Adicionales';
  price: number;
  description: string;
  features: string[];
  sizes: string[];
  images: string[];
  materials?: string;
  benefits?: string;
  howToUse?: string;
  faq?: { question: string; answer: string }[];
  characteristics?: Record<string, string>;
  url?: string;
}

const products: Product[] = [
  // ── COPA MENSTRUAL ──────────────────────────────────────────────
  {
    sku: 'COPA-001',
    name: 'Copa menstrual • Línea Signature • XS',
    category: 'Copa Menstrual',
    price: 100000,
    description:
      'La copa menstrual es un recipiente que se introduce en la vagina para recoger el flujo menstrual. Es una alternativa a las toallas higiénicas y los tampones. No interfiere en el pH vaginal ya que recoge la sangre y no la absorbe. Hecha de silicona de grado médico, puede aguantar hasta 12 horas de uso continuo.',
    features: [
      'Capacidad: 15 ml (hasta el borde)',
      'Diámetro: aprox. 38 mm',
      'Largo total: aprox. 55 mm',
      'Material: Silicona médica hipoalergénica',
      'Color: Transparente',
      'Procedencia: China',
      'Tipo de cérvix: Alto y medio',
      'Flujo: Ligero',
    ],
    sizes: ['XS (Mini)'],
    images: [
      '/images/productos/copa-signature-xs-1.jpg',
      '/images/productos/copa-signature-xs-2.jpg',
    ],
    characteristics: {
      Producto: 'Copa menstrual',
      Marca: 'Reina de Copas',
      Color: 'Transparente',
      Procedencia: 'China',
      Tamaño: '(XS) Mini',
      'Tipo de cérvix': 'Alto y medio',
      'Capacidad hasta el borde': '15ml',
      'Tipo de flujo': 'Ligero',
    },
    materials: 'Silicona de grado médico, hipoalergénica, libre de BPA, látex y fragancias.',
    benefits: 'Hasta 12 horas de protección • 3 veces más capacidad que un tampón • Duración hasta 10 años • Más económica y ecológica que productos desechables',
    howToUse:
      'Lávate las manos, dobla la copa en forma de "C" o punch-down, insértala y gírala para que se abra creando sello. Para retirar, presiona la base para liberar el sello y tira suavemente.',
    url: 'https://reina-de-copas-paraguay.minegocio.com.py/producto/copa-menstrual-linea-signature-xs/',
    faq: [
      {
        question: '¿Cada cuánto debo vaciar la copa?',
        answer: 'Cada 8-12 horas dependiendo de tu flujo.',
      },
      {
        question: '¿Puedo usarla de noche?',
        answer: 'Sí, es segura para uso nocturno hasta 12 horas.',
      },
      {
        question: '¿Cómo sé si la talla XS es correcta?',
        answer: 'La XS es ideal para flujo ligero y cérvix alto o medio. Si no has tenido partos vaginales y tu flujo es ligero, esta es tu talla.',
      },
    ],
  },
  {
    sku: 'COPA-002',
    name: 'Copa menstrual • Línea Signature • S',
    category: 'Copa Menstrual',
    price: 100000,
    description:
      'La copa menstrual es un recipiente que se introduce en la vagina para recoger el flujo menstrual. Es una alternativa a las toallas higiénicas y los tampones. No interfiere en el pH vaginal ya que recoge la sangre y no la absorbe. Hecha de silicona de grado médico.',
    features: [
      'Capacidad: 20 ml (hasta el borde)',
      'Diámetro: aprox. 40 mm',
      'Largo total: aprox. 60 mm',
      'Material: Silicona médica hipoalergénica',
      'Color: Transparente',
      'Procedencia: China',
      'Tipo de cérvix: Alto y medio',
      'Flujo: Ligero a normal',
    ],
    sizes: ['S (Pequeño)'],
    images: [
      '/images/productos/copa-signature-s-1.jpg',
      '/images/productos/copa-signature-s-2.jpg',
    ],
    characteristics: {
      Producto: 'Copa menstrual',
      Marca: 'Reina de Copas',
      Color: 'Transparente',
      Procedencia: 'China',
      Tamaño: '(S) Pequeño',
      'Tipo de cérvix': 'Alto y medio',
      'Capacidad hasta el borde': '20ml',
      'Tipo de flujo': 'Ligero a normal',
    },
    materials: 'Silicona de grado médico, hipoalergénica, libre de BPA, látex y fragancias.',
    benefits: 'Hasta 12 horas de protección • 3 veces más capacidad que un tampón • Duración hasta 10 años',
    howToUse:
      'Lávate las manos, dobla la copa, insértala y gira para que se abra. Para retirar, presiona la base y tira suavemente.',
    url: 'https://reina-de-copas-paraguay.minegocio.com.py/producto/copa-menstrual-linea-signature-s/',
    faq: [
      {
        question: '¿Cada cuánto debo vaciar la copa?',
        answer: 'Cada 8-12 horas.',
      },
      {
        question: '¿Cómo sé si la talla S es correcta?',
        answer: 'Si tienes flujo ligero a normal y un cérvix alto o medio, la S es tu talla.',
      },
    ],
  },
  {
    sku: 'COPA-003',
    name: 'Copa menstrual • Línea Signature • L',
    category: 'Copa Menstrual',
    price: 100000,
    description:
      'La copa menstrual es un recipiente que se introduce en la vagina para recoger el flujo menstrual. No interfiere en el pH vaginal ya que recoge la sangre y no la absorbe. Silicona de grado médico.',
    features: [
      'Capacidad: 25 ml (hasta el borde)',
      'Diámetro: aprox. 44 mm',
      'Largo total: aprox. 65 mm',
      'Material: Silicona médica hipoalergénica',
      'Color: Transparente',
      'Procedencia: China',
      'Tipo de cérvix: Alto y medio',
      'Flujo: Normal a abundante',
    ],
    sizes: ['L (Grande)'],
    images: [
      '/images/productos/copa-signature-l-1.jpg',
      '/images/productos/copa-signature-l-2.jpg',
    ],
    characteristics: {
      Producto: 'Copa menstrual',
      Marca: 'Reina de Copas',
      Color: 'Transparente',
      Procedencia: 'China',
      Tamaño: '(L) Grande',
      'Tipo de cérvix': 'Alto y medio',
      'Capacidad hasta el borde': '25ml',
      'Tipo de flujo': 'Normal a abundante',
    },
    materials: 'Silicona de grado médico.',
    benefits: 'Hasta 12 horas de protección • Ideal para flujo abundante',
    howToUse: 'Dobla en "C", inserta y gira para abrir. Retire presionando la base.',
    url: 'https://reina-de-copas-paraguay.minegocio.com.py/producto/copa-menstrual-linea-signature-l/',
    faq: [
      {
        question: '¿Cómo sé si la talla L es correcta?',
        answer: 'Si tienes flujo normal a abundante o un cérvix medio, la L es ideal.',
      },
    ],
  },
  {
    sku: 'COPA-004',
    name: 'Copa menstrual • Línea Signature • XL',
    category: 'Copa Menstrual',
    price: 100000,
    description:
      'Copa menstrual de máxima capacidad para flujo abundante. Silicona de grado médico hipoalergénica.',
    features: [
      'Capacidad: 35 ml (hasta el borde)',
      'Diámetro: aprox. 48 mm',
      'Largo total: aprox. 70 mm',
      'Material: Silicona médica hipoalergénica',
      'Color: Transparente',
      'Procedencia: China',
      'Tipo de cérvix: Alto y medio',
      'Flujo: Abundante a muy abundante',
    ],
    sizes: ['XL (Extra Grande)'],
    images: [
      '/images/productos/copa-signature-xl-1.jpg',
      '/images/productos/copa-signature-xl-2.jpg',
    ],
    characteristics: {
      Producto: 'Copa menstrual',
      Marca: 'Reina de Copas',
      Color: 'Transparente',
      Procedencia: 'China',
      Tamaño: '(XL) Extra Grande',
      'Tipo de cérvix': 'Alto y medio',
      'Capacidad hasta el borde': '35ml',
      'Tipo de flujo': 'Abundante a muy abundante',
    },
    materials: 'Silicona de grado médico.',
    benefits: 'Hasta 12 horas de protección • Máxima capacidad para flujos abundantes',
    howToUse: 'Dobla en "C", inserta y gira para abrir. Retire presionando la base.',
    url: 'https://reina-de-copas-paraguay.minegocio.com.py/producto/copa-menstrual-linea-signature-xl/',
  },
  {
    sku: 'COPA-005',
    name: 'Copa menstrual • Reina The Cup',
    category: 'Copa Menstrual',
    price: 125000,
    description:
      'La Reina The Cup es una copa menstrual unitalla de alta capacidad (38ml), diseñada para adaptarse a personas con cérvix alto, medio y bajo. Equivale a 5 tampones para flujo ligero, 3.5 para flujo normal, y 2 para flujo abundante.',
    features: [
      'Capacidad: 38 ml',
      'Diámetro: aprox. 50 mm',
      'Largo total: aprox. 70 mm',
      'Material: Silicona médica hipoalergénica',
      'Color: Fucsia',
      'Procedencia: China',
      'Tipo de cérvix: Alto, medio y bajo',
      'Flujo: Ligero a muy abundante',
      'Unitalla (One-size)',
    ],
    sizes: ['Unitalla (One-size)'],
    images: [
      '/images/productos/reina-the-cup-1.png',
      '/images/productos/reina-the-cup-2.png',
      '/images/productos/reina-the-cup-3.png',
    ],
    characteristics: {
      Producto: 'Copa menstrual',
      Marca: 'Reina de Copas',
      Color: 'Fucsia',
      Procedencia: 'China',
      Tamaño: 'Unitalla',
      'Tipo de cérvix': 'Alto, medio y bajo',
      Capacidad: '38ml',
      'Tipo de flujo': 'Ligero a muy abundante',
    },
    materials: 'Silicona de grado médico.',
    benefits: '38ml de capacidad • Se adapta a cualquier cérvix • Hasta 12 horas de protección',
    howToUse: 'Dobla en "C" o punch-down, inserta y gira. El diseño flexible se adapta a tu anatomía.',
    url: 'https://reina-de-copas-paraguay.minegocio.com.py/producto/copa-menstrual-reina-the-cup/',
    faq: [
      {
        question: '¿La Reina The Cup sirve para cualquier persona?',
        answer: 'Al ser unitalla y adaptarse a cérvix alto, medio y bajo, es la más versátil. Ideal si no sabés qué talla elegir.',
      },
    ],
  },
  // ── DISCO MENSTRUAL ────────────────────────────────────────────
  {
    sku: 'DISCO-001',
    name: 'Combo Disco Menstrual (Pequeño y Grande)',
    category: 'Disco Menstrual',
    price: 150000,
    description:
      'Disco Queen by Reina de Copas (Combo S: Pequeño + L: Grande). El único dispositivo que podés usar hasta 12 horas seguidas, incluso durante las relaciones sexuales con penetración. Diseñado con cuerpo flexible de alta capacidad y doble borde antifugas.',
    features: [
      'Disco S (Pequeño): 30ml de capacidad',
      'Disco L (Grande): 50ml de capacidad',
      'Material: Silicona de grado médico',
      'Colores: Happy Pink/Fucsia y Deep Purple/Lila',
      'Tipo de cérvix: Alto, medio y bajo',
      'Flujo: Ligero a muy abundante',
      'Hasta 12 horas de protección',
      'Compatible con relaciones sexuales',
      'Reutilizable',
    ],
    sizes: ['Combo: S (Pequeño - 30ml) + L (Grande - 50ml)'],
    images: [
      '/images/productos/combo-disco-1.jpg',
      '/images/productos/combo-disco-2.jpg',
    ],
    characteristics: {
      Producto: 'Disco menstrual (Disco Queen)',
      Marca: 'Reina de Copas',
      'Colores disponibles': 'Happy Pink/Fucsia y Deep Purple/Lila',
      Procedencia: 'China',
      Tamaños: 'Pequeño (S) y Grande (L)',
      'Tipo de cérvix': 'Alto, medio y bajo',
      Capacidad: '30ml (S) y 50ml (L)',
      'Tipo de flujo': 'Ligero a muy abundante',
      Incluye: '1 Disco S (Pequeño - 30ml) + 1 Disco L (Grande - 50ml)',
    },
    materials: 'Silicona de grado médico.',
    benefits: 'Hasta 12 horas de protección • Compatible con relaciones sexuales con penetración • Doble borde antifugas • Se coloca en la base del cérvix dejando libre el canal vaginal',
    howToUse: 'Presiona el aro, insértalo empujándolo hacia la parte más ancha de la vagina, asegurándote de que quede detrás del hueso púbico.',
    url: 'https://reina-de-copas-paraguay.minegocio.com.py/producto/combo-disco-menstrual-pequeno-y-grande/',
    faq: [
      {
        question: '¿Puedo usar el disco durante las relaciones sexuales?',
        answer: 'Sí, el disco menstrual es el único dispositivo íntimo que podés usar durante las relaciones sexuales con penetración sin incomodidad para vos ni para tu pareja.',
      },
      {
        question: '¿Cómo funciona el auto-vaciado?',
        answer: 'Al ir al baño, el disco se inclina y se vacía automáticamente. Solo necesitas enjuagarlo y volver a colocarlo.',
      },
      {
        question: '¿Qué incluye el combo?',
        answer: '1 Disco Pequeño (30ml) + 1 Disco Grande (50ml). Ideal para usar diferentes tallas según los días de tu período.',
      },
    ],
  },
  // ── ADICIONALES ────────────────────────────────────────────────
  {
    sku: 'VASO-001',
    name: 'Vaso esterilizador: 200ml • Rosado',
    category: 'Adicionales',
    price: 35000,
    description:
      'Vaso de silicona plegable de grado alimenticio para esterilizar tu copa o disco menstrual en el microondas. También útil para enjuagar tu copa en baños públicos. Fácil de transportar con tapa incluida.',
    features: [
      'Capacidad: 200ml',
      'Material: Silicona de grado alimenticio',
      'Medidas: 8.7cm de alto x 7.8cm de diámetro',
      'Color: Rosado',
      'Plegable y portátil',
      'Con tapa',
      'Apto microondas',
      'Costo individual: 35.000 Gs',
      'Costo en combo: 25.000 Gs (al comprar con copa o disco)',
    ],
    sizes: ['Único'],
    images: ['/images/productos/vaso-rosado.png'],
    characteristics: {
      Producto: 'Vaso esterilizador plegable',
      Marca: 'Reina de Copas',
      Color: 'Rosado',
      Procedencia: 'China',
      Medidas: '8.7cm de alto x 7.8cm de diámetro',
      Capacidad: '200ml',
    },
    materials: 'Silicona de grado alimenticio, libre de BPA.',
    benefits: 'Esteriliza en minutos en el microondas • Portátil y plegable • También sirve para enjuagar en baños públicos',
    howToUse: 'Llena el vaso con agua, coloca tu copa/disco dentro, cierra con la tapa y mete al microondas 3-5 minutos.',
    url: 'https://reina-de-copas-paraguay.minegocio.com.py/producto/vaso-esterilizador-200ml-rosado/',
  },
  {
    sku: 'VASO-002',
    name: 'Vaso esterilizador: 200ml • Morado',
    category: 'Adicionales',
    price: 35000,
    description:
      'Vaso de silicona plegable de grado alimenticio para esterilizar tu copa o disco menstrual en el microondas. También útil para enjuagar tu copa en baños públicos. Fácil de transportar con tapa incluida.',
    features: [
      'Capacidad: 200ml',
      'Material: Silicona de grado alimenticio',
      'Medidas: 8.7cm de alto x 7.8cm de diámetro',
      'Color: Morado',
      'Plegable y portátil',
      'Con tapa',
      'Apto microondas',
      'Costo individual: 35.000 Gs',
      'Costo en combo: 25.000 Gs (al comprar con copa o disco)',
    ],
    sizes: ['Único'],
    images: ['/images/productos/vaso-morado.png'],
    characteristics: {
      Producto: 'Vaso esterilizador plegable',
      Marca: 'Reina de Copas',
      Color: 'Morado',
      Procedencia: 'China',
      Medidas: '8.7cm de alto x 7.8cm de diámetro',
      Capacidad: '200ml',
    },
    materials: 'Silicona de grado alimenticio, libre de BPA.',
    benefits: 'Esteriliza en minutos en el microondas • Portátil y plegable • También sirve para enjuagar en baños públicos',
    howToUse: 'Llena el vaso con agua, coloca tu copa/disco dentro, cierra con la tapa y mete al microondas 3-5 minutos.',
    url: 'https://reina-de-copas-paraguay.minegocio.com.py/producto/vaso-esterilizador-200ml-morado/',
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  const product = products.find((p) => p.sku === id);
  if (product) return product;
  const index = parseInt(id, 10);
  if (!isNaN(index) && index >= 0 && index < products.length) {
    return products[index];
  }
  return undefined;
}

export function getProductsByCategory(
  cat: 'Copa Menstrual' | 'Disco Menstrual' | 'Adicionales'
): Product[] {
  return products.filter((p) => p.category === cat);
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4);
}