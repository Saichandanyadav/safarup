"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { MapPin, Sparkles, Users, BookOpen, Share2, Phone } from "lucide-react"

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const links = [
    { name: "Destinations", href: "/destinations", icon: MapPin },
    { name: "Gems", href: "/hidden-gems", icon: Sparkles },
    { name: "Connect", href: "/connect", icon: Users },
    { name: "Guides", href: "/guides", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: Phone },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
          !isVisible ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/companyLogo.png" alt="Logo" width={34} height={34} />
            <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              SafarUp
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive(link.href) ? "text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                {isActive(link.href) && (
                  <span className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-lg shadow-blue-200" />
                )}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <nav
        className={`lg:hidden fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ${
          !isVisible ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 pb-safe-area shadow-[0_-10px_30px_rgba(0,0,0,0.08)] flex items-center justify-around px-2 h-20">
          {links.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                  active ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? "opacity-100" : "opacity-70"}`}>
                  {link.name}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}