"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { name: "Destinations", href: "/destinations" },
    { name: "Hidden Gems", href: "/hidden-gems" },
    { name: "Connect", href: "/connect" },
    { name: "Guides", href: "/guides" },
    { name: "Share", href: "/share" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
          : "bg-white/70 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/companyLogo.png"
            alt="SafarUp Logo"
            width={42}
            height={42}
            className="object-contain"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            SafarUp
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive(link.href)
                  ? "text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {isActive(link.href) && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full -z-10 shadow-md" />
              )}
              {link.name}
            </Link>
          ))}

          <Link
            href="/destinations"
            className="ml-4 px-6 py-2 rounded-full bg-black text-white text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-md"
          >
            Explore
          </Link>

        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-gray-900"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-8 pt-2 bg-white border-t border-gray-100 space-y-3">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive(link.href)
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/destinations"
            onClick={() => setOpen(false)}
            className="block text-center mt-4 px-6 py-3 rounded-full bg-black text-white font-semibold shadow-md"
          >
            Explore
          </Link>

        </div>
      </div>

    </header>
  )
}
