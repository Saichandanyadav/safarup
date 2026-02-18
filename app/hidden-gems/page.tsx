"use client"

import Link from "next/link"

const gems = [
  {
    name: "Sundarvan Eco Park",
    location: "Patna",
    tag: "Nature Retreat",
    image: "/gems/sundarvan-eco-park.webp"
  },
  {
    name: "Kanwar Lake Bird Sanctuary",
    location: "Begusarai",
    tag: "Wildlife Spot",
    image: "/gems/kanwar-lake.jpg"
  },
  {
    name: "Kaimur Wildlife Sanctuary",
    location: "Kaimur",
    tag: "Adventure & Wildlife",
    image: "/gems/kaimur-sanctuary.jpg"
  },
  {
    name: "Vikramshila Gangetic Dolphin Sanctuary",
    location: "Bhagalpur",
    tag: "Wildlife Haven",
    image: "/gems/gangetic-dolphin.jpeg"
  },
  {
    name: "Kesaria Stupa Viewpoint",
    location: "Kesaria",
    tag: "Historical Viewpoint",
    image: "/gems/kesaria-view.jpg"
  },
  {
    name: "Sonepur Mela Grounds",
    location: "Sonepur",
    tag: "Cultural Experience",
    image: "/gems/sonepur-mela.jpg"
  }
]

export default function HiddenGemsSection() {
  return (
    <section className="bg-black text-white">
      <div className="relative h-[90vh] w-full flex items-center justify-center text-center overflow-hidden">
        <img
          src="/hidden-gems-hero-bihar.avif"
          alt="Bihar Hidden Gems"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
            Discover Bihar’s
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Hidden Gems
            </span>
          </h2>
          <p className="mt-6 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Explore offbeat destinations across Bihar. Ancient ruins, spiritual sites, natural springs, and cultural landmarks await.
          </p>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl md:text-3xl font-bold">
              Curated Escapes
            </h3>
            <span className="text-sm text-gray-400 hidden md:block">
              Handpicked hidden gems across Bihar
            </span>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory">
            {gems.map((gem) => (
              <Link
                key={gem.name}
                href="#"
                className="group relative min-w-[85%] sm:min-w-[70%] md:min-w-0 snap-start rounded-3xl overflow-hidden"
              >
                <div className="relative h-[420px] md:h-[460px]">
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-1 rounded-full text-xs font-medium">
                    {gem.tag}
                  </div>
                  <div className="absolute bottom-0 p-6 w-full">
                    <h4 className="text-2xl font-bold">{gem.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-gray-300 text-sm">{gem.location}</p>
                      <span className="opacity-0 group-hover:opacity-100 transition duration-500 translate-x-4 group-hover:translate-x-0">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
