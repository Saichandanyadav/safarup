"use client"

import { destinations } from "@/data/destinations"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"

export default function Destinations() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const [query, setQuery] = useState(searchQuery)
  const [activeCategory, setActiveCategory] = useState("All")
  const [scrolled, setScrolled] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const heroImages = [
    "/destinations-hero.jpg",
    "/destinations-hero1.jpg",
    "/destinations-hero2.jpg",
    "/destinations-hero3.jpg",
    "/destinations-hero4.jpg",
  ]

  useEffect(() => {
    setQuery(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      <div className={`fixed top-[80px] inset-x-0 z-40 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="font-semibold tracking-wide">Discover</h2>
          <span className="text-sm opacity-70">{filtered.length} places</span>
        </div>
      </div>

      <section className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden">

        {heroImages.map((img, index) => (
          <img
            key={img}
            src={img}
            alt="Hero"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out ${
              index === currentImage
                ? "opacity-100 scale-105"
                : "opacity-0 scale-110"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

        <div className="relative z-10 px-6 max-w-4xl w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Find Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Escape
            </span>
          </h1>

          <div className="mt-10 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl px-6 py-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400 text-lg"
            />
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex gap-3 flex-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-32 text-gray-400 text-xl">
            No destinations found
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((place) => (
              <Link
                key={place.name}
                href={`/destinations/${place.name}`}
                className="relative rounded-3xl overflow-hidden group"
              >
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition duration-500" />
                  {place.trending && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-red-500 text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                      Trending
                    </div>
                  )}
                  <div className="absolute bottom-0 p-6">
                    <h2 className="text-2xl font-bold">{place.name}</h2>
                    <p className="mt-2 text-sm text-gray-300 line-clamp-2">
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
