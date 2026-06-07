const images = [
  { src: "/images/gym-1.jpg", alt: "Sala de pesas" },
  { src: "/images/gym-2.jpg", alt: "Entrenamiento funcional" },
  { src: "/images/gym-3.jpg", alt: "CrossFit" },
  { src: "/images/gym-4.jpg", alt: "Cardio" },
]

export function Gallery() {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-2">
          Nuestro Gimnasio
        </h2>
        <p className="text-center text-[#6b6b6b] mb-12 max-w-xl mx-auto">
          Instalaciones de primer nivel para tu entrenamiento
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl aspect-[3/4]">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
