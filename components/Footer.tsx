"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-white m-0">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
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
            <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
            <li><Link href="/hidden-gems" className="hover:text-white transition-colors">Hidden Gems</Link></li>
            <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
            <li><Link href="/connect" className="hover:text-white transition-colors">Connect</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-6 text-lg">Company</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/share" className="hover:text-white transition-colors">Share</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-6 text-lg">Stay Updated</h3>
          <div className="flex items-center bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden focus-within:border-blue-500/50 transition-all">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 bg-transparent text-sm focus:outline-none placeholder-gray-500"
            />
            <button className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-sm font-bold transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-8 text-center">
        <p className="text-gray-600 text-xs font-medium uppercase tracking-widest">
          © {new Date().getFullYear()} SafarUp. All rights reserved.
        </p>
      </div>
    </footer>
  )
}