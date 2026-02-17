"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [stats, setStats] = useState({ d: 0, t: 0, g: 0, r: 0 })
  const [scroll, setScroll] = useState(0)

  const testimonials = [
    { name: "Aarav Sharma", text: "SafarUp helped me discover places I never knew existed." },
    { name: "Meera Iyer", text: "The AI recommendations are insanely accurate." },
    { name: "Rohan Verma", text: "Clean design, powerful discovery engine, love it." }
  ]

  const popularSearch = ["Goa", "Ladakh", "Jaipur", "Rishikesh", "Kerala"]

  const featured = [
    { name: "Goa", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2" },
    { name: "Manali", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { name: "Jaipur", img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33" },
    { name: "Kerala", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }
  ]

  const handleSearch = () => {
    if (!query.trim()) return
    router.push(`/destinations?search=${query}`)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        d: prev.d < 180 ? prev.d + 4 : 180,
        t: prev.t < 30000 ? prev.t + 600 : 30000,
        g: prev.g < 1000 ? prev.g + 15 : 1000,
        r: prev.r < 49 ? prev.r + 1 : 49
      }))
    }, 20)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const slide = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(slide)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScroll((window.scrollY / total) * 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full overflow-hidden bg-white">

      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 z-50 transition-all duration-200"
        style={{ width: `${scroll}%` }}
      />

      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-5 md:px-6 bg-gradient-to-br from-sky-100 via-white to-blue-100">

        <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-blue-400/20 blur-3xl rounded-full -top-40 -left-40 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-cyan-400/20 blur-3xl rounded-full -bottom-40 -right-40 animate-pulse" />

        <div className="relative z-10 text-center max-w-5xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Travel Smarter Across India
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Discover Experiences, Not Just Places
            </span>
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            AI-powered travel discovery built for explorers who crave authenticity and real experiences.
          </p>

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:gap-4 justify-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full md:w-[440px] px-5 py-4 rounded-full border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-base"
            />
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg active:scale-95 md:hover:scale-105 transition"
            >
              Explore Now
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
            {popularSearch.map(item => (
              <button
                key={item}
                onClick={() => router.push(`/destinations/${item}`)}
                className="px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full text-sm active:scale-95 md:hover:bg-blue-50 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Experiences
            </h2>
            <p className="mt-3 text-gray-600 text-sm md:text-base">
              Loved by modern travelers
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4">
            {featured.map((place) => (
              <div
                key={place.name}
                onClick={() => router.push(`/destinations/${place.name}`)}
                className="relative min-w-[320px] md:min-w-0 h-72 md:h-80 rounded-3xl overflow-hidden cursor-pointer group snap-start"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${place.img})` }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition" />

                <div className="absolute bottom-0 p-5 md:p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-wide">
                    {place.name}
                  </h3>
                  <p className="text-sm opacity-80 mt-1">
                    Explore hidden gems & experiences
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-sky-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-5 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
          {[
            { value: stats.d, label: "Destinations" },
            { value: stats.t, label: "Travelers" },
            { value: stats.g, label: "Local Guides" },
            { value: (stats.r / 10).toFixed(1), label: "Rating ★" }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md">
              <h3 className="text-2xl md:text-4xl font-bold text-blue-600">{item.value}+</h3>
              <p className="mt-2 text-gray-600 text-sm md:text-base">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-14">Traveler Stories</h2>
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8 md:p-14 rounded-2xl md:rounded-3xl shadow-xl">
            <p className="text-base md:text-xl">
              "{testimonials[activeTestimonial].text}"
            </p>
            <h4 className="mt-5 font-semibold text-sm md:text-lg">
              — {testimonials[activeTestimonial].name}
            </h4>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold">Your Journey Starts Here</h2>
          <p className="mt-4 md:mt-6 text-sm md:text-lg opacity-90">
            Discover destinations powered by insights and real traveler experiences.
          </p>
          <button
            onClick={() => router.push("/destinations")}
            className="mt-8 md:mt-10 w-full md:w-auto px-10 md:px-14 py-4 md:py-5 bg-white text-blue-600 font-semibold rounded-full shadow-lg active:scale-95 md:hover:scale-105 transition"
          >
            Explore Destinations
          </button>
        </div>
      </section>

    </div>
  )
}
