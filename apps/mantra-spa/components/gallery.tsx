const images = [
  { src: "/images/spa-1.jpg", alt: "Masaje relax" },
  { src: "/images/spa-2.jpg", alt: "Tratamiento facial" },
  { src: "/images/spa-3.jpg", alt: "Ambiente spa" },
  { src: "/images/spa-4.jpg", alt: "Velas y aromaterapia" },
]

export function Gallery() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-[#0f1a2e] mb-2">
          Nuestro Espacio
        </h2>
        <p className="text-center text-[#6b6b6b] mb-12 max-w-xl mx-auto">
          Un ambiente pensado para tu bienestar
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl aspect-[3/4]">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a2e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.alt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
