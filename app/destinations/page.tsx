"use client"

import { destinations } from "@/data/destinations"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, useMemo, Suspense } from "react"
import Link from "next/link"

function DestinationsContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const [query, setQuery] = useState(searchQuery)
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentImage, setCurrentImage] = useState(0)

  const heroImages = [
    "/destinations/bodh-gaya.webp",
    "/destinations/patna.jpg",
    "/destinations/munger.webp",
    "/destinations/pawapuri.jpg",
    "/destinations/vikramshila.png",
  ]

  useEffect(() => {
    setQuery(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const categories = useMemo(() => {
    const unique = [...new Set(destinations.map((d) => d.category))]
    return ["All", ...unique]
  }, [])

  const filtered = useMemo(() => {
    let result = destinations.filter((place) =>
      place.name.toLowerCase().includes(query.toLowerCase())
    )
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory)
    }
    return result
  }, [query, activeCategory])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-blue-500/30">
      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { bg: #000; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #444; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={img}
            src={img}
            alt="Hero"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ${
              index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
        <div className="relative z-10 px-6 max-w-5xl w-full">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            TRAVEL
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              BEYOND
            </span>
          </h1>
          <div className="mt-8 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-3xl px-6 py-2 max-w-xl mx-auto flex items-center group focus-within:border-blue-500/50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-focus-within:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hidden gems..."
              className="w-full bg-transparent px-4 py-4 focus:outline-none text-white placeholder-gray-500 text-lg font-medium"
            />
          </div>
        </div>
      </section>

      <section className="sticky top-0 lg:top-[80px] z-30 bg-black/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-nowrap lg:flex-wrap gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 lg:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === cat
                    ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-40">
            <p className="text-gray-600 text-2xl font-light tracking-widest italic">No match found for "{query}"</p>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((place) => (
              <Link
                key={place.name}
                href={`/destinations/${place.name}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-900 transition-all duration-700">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  {place.trending && (
                    <div className="absolute top-6 right-6 backdrop-blur-md bg-white/10 border border-white/20 text-[10px] uppercase font-black px-4 py-2 rounded-full tracking-widest shadow-2xl">
                      Trending
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">{place.category}</span>
                    <h2 className="text-3xl font-bold tracking-tighter mb-3">{place.name}</h2>
                    <p className="text-sm text-gray-400 line-clamp-2 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500">
                      {place.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default function Destinations() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <DestinationsContent />
    </Suspense>
  )
}