"use client"

import { destinations } from "@/data/destinations"
import { useParams, notFound } from "next/navigation"

export default function DestinationDetail() {
  const params = useParams()
  const name = decodeURIComponent(params.name as string)
    .toLowerCase()
    .trim()

  const place = destinations.find(
    (d) => d.name.toLowerCase().trim() === name
  )

  if (!place) notFound()

  return (
    <div className="bg-white">

      <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="uppercase tracking-widest text-sm text-white/80">
                  {place.category}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mt-2">
                  {place.name}
                </h1>
                <p className="mt-4 max-w-2xl text-white/90 text-base md:text-lg">
                  {place.description}
                </p>
              </div>

              <div className="hidden md:block bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 min-w-[260px]">
                <div className="text-sm text-white/80">Best time to visit</div>
                <div className="text-lg font-semibold mt-1">
                  {place.bestTime}
                </div>
                <div className="mt-4 text-sm text-white/80">Avg. Budget</div>
                <div className="text-lg font-semibold mt-1">
                  ₹{place.avgBudget}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

          <div className="md:col-span-2 space-y-12">

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                About {place.name}
              </h2>
              <p className="mt-6 text-gray-700 leading-relaxed text-lg">
                {place.history}
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Highlights
              </h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {place.highlights.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition"
                  >
                    <div className="text-gray-900 font-medium">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="text-lg font-semibold">
                Plan Your Trip
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">{place.recommendedStay}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Ideal For</div>
                  <div className="font-medium">{place.idealFor}</div>
                </div>
              </div>

              <button className="mt-8 w-full py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-900 transition">
                Book Experience
              </button>
            </div>

          </div>
        </div>
      </section>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button className="w-full py-3 rounded-xl bg-black text-white font-semibold">
          Book Experience
        </button>
      </div>

    </div>
  )
}
