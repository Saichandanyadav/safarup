"use client"

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen bg-[#0f172a] overflow-hidden">

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-14 items-center">

        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)] group">

          <img
            src="/contact-hero.jpg"
            alt="Travel Planning"
            className="w-full h-[420px] sm:h-[500px] lg:h-[650px] object-cover scale-105 group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 text-white">

            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight tracking-tight">
              Let’s Design Something Extraordinary
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-md">
              Premium travel planning. Personalized journeys. Real humans crafting real experiences.
            </p>

            <div className="mt-8 space-y-4 text-sm">

              <div className="flex items-center gap-3 text-gray-200">
                <MapPin size={18} />
                <span>Patna, India</span>
              </div>

              <div className="flex items-center gap-3 text-gray-200">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3 text-gray-200">
                <Mail size={18} />
                <span>support@safarup.com</span>
              </div>

            </div>

            <div className="flex gap-4 mt-6">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition duration-300 cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-[2rem] p-6 sm:p-10 lg:p-12">

          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Start Your Journey
            </h1>
            <p className="mt-3 text-gray-400 text-sm sm:text-base">
              Tell us what you're dreaming of and we’ll handle the rest.
            </p>
          </div>

          <form className="space-y-7">

            {[
              { label: "Full Name", type: "text" },
              { label: "Email Address", type: "email" },
              { label: "Phone Number", type: "tel" }
            ].map((field) => (
              <div key={field.label} className="relative">
                <input
                  type={field.type}
                  onFocus={() => setFocused(field.label)}
                  onBlur={() => setFocused(null)}
                  required
                  className="peer w-full bg-transparent border-b border-white/30 text-white py-3 focus:outline-none focus:border-cyan-400 transition"
                />
                <label
                  className={`absolute left-0 transition-all duration-300 text-gray-400 ${
                    focused === field.label
                      ? "-top-5 text-xs text-cyan-400"
                      : "top-3 text-sm"
                  } peer-valid:-top-5 peer-valid:text-xs peer-valid:text-cyan-400`}
                >
                  {field.label}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                rows={4}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                required
                className="peer w-full bg-transparent border-b border-white/30 text-white py-3 focus:outline-none focus:border-cyan-400 transition resize-none"
              />
              <label
                className={`absolute left-0 transition-all duration-300 text-gray-400 ${
                  focused === "message"
                    ? "-top-5 text-xs text-cyan-400"
                    : "top-3 text-sm"
                } peer-valid:-top-5 peer-valid:text-xs peer-valid:text-cyan-400`}
              >
                Tell us about your trip
              </label>
            </div>

            <button
              type="submit"
              className="relative w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold overflow-hidden group"
            >
              <span className="relative z-10">Send Message</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300" />
            </button>

          </form>

        </div>

      </div>
    </div>
  )
}
