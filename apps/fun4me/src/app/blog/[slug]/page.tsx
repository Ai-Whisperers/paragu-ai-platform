"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useEffect } from "react"
import content from "@/content/es.json"
import { ShareWhatsApp } from "@/components/vendor/share-whatsapp"
import { ArticleJsonLd } from "@/components/vendor/article-json-ld"
import { SafeImage } from "@/components/vendor/safe-image"

const WA_PHONE = "595976569739"

// Extended blog content since es.json only has excerpts
const FULL_CONTENT: Record<string, string[]> = {
  "guia-para-principiantes-vibradores": [
    "Elegir tu primer vibrador puede ser abrumador con tantas opciones disponibles. Esta guía te ayuda a entender los diferentes tipos y encontrar el que mejor se adapte a vos.",
    "Lo primero que debés considerar es el tipo de estimulación que buscás. Los vibradores se dividen en dos categorías principales: de estimulación externa (como los bullets, que son pequeños y precisos) y de estimulación interna (diseñados para uso interno, con curvas que alcanzan puntos específicos).",
    "Para principiantes, recomendamos empezar con un vibrador clásico o un bullet vibrator. Son compactos, fáciles de usar y tienen modos de vibración ajustables para que explores a tu ritmo.",
    "El material es clave: optá siempre por silicona hipoalergénica, libre de ftalatos y BPA. Es suave, segura y fácil de limpiar. Evitá los materiales porosos como el jelly o PVC.",
    "También es importante considerar el nivel de ruido. Si vivís con otras personas, buscá modelos que indiquen funcionamiento silencioso. La mayoría de los vibradores modernos son sorprendentemente silenciosos.",
    "Por último, pensá en la carga. Los vibradores recargables son más convenientes a largo plazo que los que usan pilas. La mayoría carga por USB y dura entre 1 y 3 horas de uso continuo.",
    "Recordá siempre usar lubricante a base de agua con tus juguetes de silicona — no solo mejora la experiencia, también protege el material y prolonga su vida útil."
  ],
  "lubricantes-base-agua-vs-silicona": [
    "Elegir entre lubricante base agua y base silicona depende de varios factores. Acá te contamos las diferencias clave para que tomes la mejor decisión.",
    "El lubricante base agua es el más versátil y recomendado para principiantes. Es compatible con todos los materiales: juguetes de silicona, preservativos de látex y cualquier material de tus juguetes.",
    "Se siente más natural, se lava fácilmente con agua y no mancha las sábanas. Su única desventaja es que se absorbe o evapora más rápido, por lo que puede requerir reaplicación durante sesiones largas.",
    "El lubricante base silicona, por otro lado, es mucho más duradero. Una sola aplicación puede durar toda una sesión, incluso en el agua. Es ideal para usar en la ducha o hidromasaje.",
    "Sin embargo, NO debe usarse con juguetes de silicona, ya que puede dañar el material. Tampoco es recomendable si usas preservativos de látex, aunque los de poliisopreno son compatibles.",
    "Nuestra recomendación: tené ambos tipos en casa. Usá base agua para uso diario con juguetes, y base silicona para sesiones en el agua o cuando querés que dure más tiempo."
  ],
  "cuidados-de-la-lenceria": [
    "La lencería de calidad merece cuidados especiales para que mantenga su forma, color y textura por mucho más tiempo.",
    "Siempre lavá a mano con agua fría y un jabón neutro o suave para prendas delicadas. Evitá el lavarropas aunque la etiqueta lo permita — el centrifugado daña los encajes y elastizables.",
    "No uses suavizante ni blanqueador. Estos productos contienen químicos que degradan las fibras elásticas y opacan los colores oscuros.",
    "Para secar, extendé la prenda sobre una toalla plana, dándole forma suavemente. Nunca la cuelgues de los tirantes — el peso del agua las estira y deforma.",
    "Guardá la lencería en un lugar seco y fresco, preferiblemente en bolsas de tela individuales para evitar que los encajes se enganchen con otras prendas.",
    "Con estos cuidados, tu lencería favorita puede durar años en perfecto estado."
  ],
  "bienestar-intimo-que-es": [
    "El bienestar íntimo va mucho más allá del placer sexual. Es una parte fundamental de nuestra salud física y emocional.",
    "Se refiere al conocimiento, cuidado y aceptación de nuestro propio cuerpo y su sexualidad. Incluye desde la higiene íntima hasta la exploración del placer, pasando por la salud reproductiva.",
    "En Paraguay, el bienestar íntimo sigue siendo un tema tabú para muchas personas. No se habla abiertamente, lo que genera desinformación y vergüenza innecesaria.",
    "La Organización Mundial de la Salud define la salud sexual como 'un estado de bienestar físico, emocional, mental y social relacionado con la sexualidad'. No es solo ausencia de enfermedad.",
    "Incorporar el autocuidado íntimo a tu rutina tiene beneficios comprobados: reduce el estrés, mejora la autoestima, fortalece las relaciones de pareja y contribuye a una vida más plena.",
    "En Fun4Me creemos que el bienestar íntimo es un derecho, no un lujo. Por eso trabajamos para ofrecer productos de calidad, información confiable y un espacio seguro para explorar."
  ],
  "introduccion-al-bdsm": [
    "El BDSM (Bondage, Disciplina, Dominación, Sumisión, Sadismo y Masoquismo) es un conjunto de prácticas consensuadas que pueden agregar una nueva dimensión a tu vida íntima.",
    "Lo más importante en BDSM es el consentimiento. Toda práctica debe ser acordada previamente por todas las partes involucradas. La comunicación abierta y honesta no es opcional — es obligatoria.",
    "El principio SSC (Sano, Seguro y Consensuado) es la base de cualquier práctica BDSM responsable. También existe RACK (Risk-Aware Consensual Kink), que reconoce que algunas prácticas tienen riesgos inherentes.",
    "Para empezar, recomendamos usar una palabra de seguridad (safe word) que cualquier persona pueda decir para detener la escena inmediatamente. Algo fácil de recordar como 'rojo' o 'suficiente'.",
    "Un kit básico para principiantes puede incluir esposas forradas (suaves, ajustables y seguras), un antifaz de seda y una fusta pequeña. Siempre con tijeras de seguridad cerca por si necesitás cortar ataduras rápidamente.",
    "El aftercare (cuidado posterior) es tan importante como la escena misma. Incluye abrazos, agua, mantas y conversación para asegurarse de que todas las personas se sientan seguras y cuidadas después de la experiencia."
  ],
  "juguetes-anales-para-principiantes": [
    "Los juguetes anales pueden ser una adición emocionante a tu repertorio íntimo, pero requieren algunos cuidados especiales, especialmente si recién empezás.",
    "La regla número uno: usá siempre lubricante, y en cantidad. La zona anal no produce lubricación natural, así que necesita ayuda externa. Un lubricante base agua de buena calidad hace toda la diferencia.",
    "Empezá con un tamaño pequeño. Un plug anal pequeño es el punto de partida ideal. Debe tener una base ancha o en forma de 'T' para evitar que se introduzca completamente.",
    "Andá despacio. No hay apuro. Usá el lubricante generosamente, respirá profundo y dejá que tu cuerpo se adapte. Si duele, pará. El placer anal nunca debe ser doloroso.",
    "La higiene es fundamental. Lavá tus juguetes antes y después de cada uso con agua tibia y jabón neutro, o con un limpiador específico para juguetes íntimos.",
    "Usá materiales seguros y no porosos. La silicona hipoalergénica, el vidrio borosilicato y el acero inoxidable quirúrgico son los mejores materiales para juguetes anales.",
    "Si usás un plug vibrador, empezá sin vibración y agregala gradualmente una vez que te sientas cómodo. La vibración puede intensificar la experiencia, pero primero necesitás relajarte."
  ],
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = content.blog.posts.find((p: any) => p.slug === slug)
  if (!post) return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
      <Link href="/blog" className="text-primary hover:underline">Volver al blog</Link>
    </div>
  )

  const paragraphs = FULL_CONTENT[post.slug] || [post.content, "Contenido completo próximamente."]
  const waMsg = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`Hola! Vi el artículo "${post.title}" en Fun4Me y tengo una consulta.`)}`

  useEffect(() => {
    document.title = `${post.title} | Fun4Me Store`
    return () => { document.title = "Fun4Me Store — Bienestar y Placer" }
  }, [post.title])

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <ArticleJsonLd title={post.title} description={post.excerpt} date={post.date} author={post.author} slug={post.slug} />
      <div className="flex items-start justify-between mb-6">
        <Link href="/blog" className="text-primary no-underline text-sm hover:underline">← Volver al blog</Link>
        <ShareWhatsApp title={post.title} />
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
        <span className="bg-primary/10 text-primary font-medium px-2.5 py-0.5 rounded">{post.category}</span>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{post.excerpt}</p>
      <div className="h-64 bg-gradient-to-br from-surface-light to-surface rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
        {post.image ? (
          <SafeImage src={post.image} alt={post.title} className="w-full h-full object-cover" fallback="✦" />
        ) : (
          <span className="text-6xl opacity-10">✦</span>
        )}
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="mt-8 p-6 rounded-xl bg-surface-light border border-border text-center">
          <p className="text-muted-foreground mb-4">¿Te interesa este tema? Consultanos por WhatsApp</p>
          <a href={waMsg} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold no-underline text-sm hover:bg-[#20BD5A] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
            </svg>
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}