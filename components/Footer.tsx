"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/companyLogo.png"
              alt="SafarUp Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              SafarUp
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            Discover India’s most beautiful destinations, hidden gems, and unforgettable experiences.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-6 text-lg">Explore</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/destinations" className="hover:text-white transition">Destinations</Link></li>
            <li><Link href="/hidden-gems" className="hover:text-white transition">Hidden Gems</Link></li>
            <li><Link href="/guides" className="hover:text-white transition">Guides</Link></li>
            <li><Link href="/connect" className="hover:text-white transition">Connect</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-6 text-lg">Company</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/share" className="hover:text-white transition">Share</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-6 text-lg">Stay Updated</h3>
          <div className="flex items-center bg-white/10 rounded-full overflow-hidden">
            <input
              placeholder="Your email"
              className="flex-1 px-4 py-3 bg-transparent text-sm focus:outline-none placeholder-gray-400"
            />
            <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold">
              Join
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SafarUp. All rights reserved.
      </div>
    </footer>
  )
}
