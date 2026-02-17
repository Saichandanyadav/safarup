"use client"

import { guides } from "@/data/guides"

export default function Guides() {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative h-[90vh] w-full flex items-center justify-center text-center overflow-hidden">
        <img
          src="/guide-hero.webp"
          alt="Guides Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
            Hire Trusted
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Local Guides
            </span>
          </h1>
          <p className="mt-6 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Connect with verified professionals for immersive city experiences and personalized tours.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition duration-300">
              Explore Guides
            </button>
            <button className="px-8 py-3 rounded-full border border-white/40 hover:bg-white/10 transition duration-300">
              Become a Guide
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">
              Available Guides
            </h2>
            <span className="text-sm text-gray-400 hidden md:block">
              Verified • Rated • Trusted
            </span>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="group relative min-w-[85%] sm:min-w-[70%] md:min-w-0 snap-start bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition duration-500 hover:bg-white/10 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <img
                      src={guide.avatar}
                      alt={guide.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${guide.available ? "bg-green-500" : "bg-gray-500"}`}></span>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    {guide.available ? "Available" : "Busy"}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {guide.name}
                    {guide.verified && (
                      <span className="text-cyan-400 text-sm">✔</span>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {guide.city}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-sm text-gray-300">
                    <span>⭐ {guide.rating}</span>
                    <span>•</span>
                    <span>{guide.reviews} reviews</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {guide.specialties.slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      ₹{guide.price} <span className="text-sm text-gray-400">/ day</span>
                    </span>
                    <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold transition hover:scale-105">
                      Hire →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}