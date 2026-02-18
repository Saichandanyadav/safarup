"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { destinations } from "@/data/destinations"

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

  const popularSearch = ["Bodh Gaya", "Rajgir", "Patna", "Nalanda", "Gaya"]

  const featured = destinations.slice(0, 8)

  const handleSearch = () => {
    if (!query.trim()) return
    router.push(`/destinations?search=${query}`)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        d: prev.d < 25 ? prev.d + 1 : 25,
        t: prev.t < 3000 ? prev.t + 60 : 3000,
        g: prev.g < 150 ? prev.g + 3 : 150,
        r: prev.r < 50 ? prev.r + 1 : 50
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
      const currentScroll = window.scrollY
      setScroll((currentScroll / total) * 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full overflow-hidden bg-white text-gray-900">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 z-[100] transition-all duration-200"
        style={{ width: `${scroll}%` }}
      />
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-5 md:px-6 bg-gradient-to-br from-sky-100 via-white to-blue-100">
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-400/20 blur-3xl rounded-full -top-20 -left-20 animate-pulse" />
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-400/20 blur-3xl rounded-full -bottom-20 -right-20 animate-pulse" />
        <div className="relative z-10 text-center max-w-5xl">
          <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Explore Bihar's Hidden Gems
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Discover Experiences, Not Just Places
            </span>
          </h1>
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            AI-powered travel discovery built for explorers who crave authenticity and real experiences across Bihar.
          </p>
          <div className="mt-10 flex flex-col gap-3 md:flex-row md:gap-0 justify-center items-center max-w-2xl mx-auto bg-white p-2 rounded-2xl md:rounded-full shadow-2xl border border-gray-100">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a destination in Bihar"
              className="w-full md:flex-1 px-6 py-3 rounded-full focus:outline-none bg-transparent text-gray-900 text-lg"
            />
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg hover:shadow-blue-500/30 transition-all transform active:scale-95"
            >
              Explore Now
            </button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="w-full text-sm text-gray-400 mb-1 font-medium">Popular:</span>
            {popularSearch.map(item => (
              <button
                key={item}
                onClick={() => router.push(`/destinations/${item}`)}
                className="px-5 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-semibold text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Featured Destinations</h2>
              <p className="mt-3 text-gray-500 text-lg">Handpicked spots across Bihar</p>
            </div>
          </div>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-8">
            {featured.map(place => (
              <div
                key={place.name}
                onClick={() => router.push(`/destinations/${place.name}`)}
                className="relative min-w-[300px] md:min-w-0 h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer group snap-start shadow-xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${place.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{place.name}</h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-300">
                    <span>View Experience</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { value: stats.d, label: "Destinations" },
            { value: stats.t, label: "Travelers" },
            { value: stats.g, label: "Local Guides" },
            { value: (stats.r / 10).toFixed(1), label: "Rating ★" }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center">
              <h3 className="text-3xl md:text-4xl font-black text-blue-600">{item.value}+</h3>
              <p className="mt-2 text-gray-500 font-bold uppercase tracking-widest text-xs">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">Traveler Stories</h2>
          <div className="relative bg-gray-900 text-white p-10 md:p-20 rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-600/20 blur-2xl rounded-full" />
            <p className="relative z-10 text-xl md:text-3xl font-medium italic leading-relaxed">
              "{testimonials[activeTestimonial].text}"
            </p>
            <h4 className="relative z-10 mt-8 font-bold text-blue-400 text-lg tracking-wide">
              — {testimonials[activeTestimonial].name}
            </h4>
          </div>
        </div>
      </section>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto relative bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[3rem] p-10 md:p-20 text-center text-white shadow-2xl shadow-blue-200">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Your Bihar Journey Starts Here</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Discover destinations powered by insights and real traveler experiences across Bihar.
          </p>
          <button
            onClick={() => router.push("/destinations")}
            className="px-12 py-5 bg-white text-blue-600 font-bold text-lg rounded-full shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1"
          >
            Explore Destinations
          </button>
        </div>
      </section>
    </div>
  )
}
