"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-100 px-6 relative overflow-hidden">

      <div className="absolute w-[400px] h-[400px] bg-blue-400/20 blur-3xl rounded-full -top-32 -left-32 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full -bottom-32 -right-32 animate-pulse" />

      <div className="relative z-10 text-center max-w-2xl">

        <h1 className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() => router.back()}
            className="px-8 py-4 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition"
          >
            Go Back
          </button>

          <Link
            href="/"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Go Home
          </Link>

        </div>

      </div>

    </div>
  )
}
