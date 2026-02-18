import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "About SafarUp | Bihar-based Travel Startup",
  description: "SafarUp is a Bihar-based travel startup promoting local tourism with government support."
}

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-100/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
            EST. 2024
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">
            SafarUp: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Redefining Travel Across Bihar
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            SafarUp is a Bihar-based travel startup funded under Startup Bihar, Dept. of Industries, Govt. of Bihar. We redefine affordable and meaningful travel experiences while promoting local tourism and innovation.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-500" />
            <Image
              src="/destinations-hero5.jpg"
              alt="Bihar Landscapes"
              width={800}
              height={600}
              className="relative rounded-[2rem] shadow-2xl grayscale-[20%] hover:grayscale-0 transition duration-500 object-cover aspect-[4/3]"
            />
          </div>

          <div className="space-y-8 lg:pl-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Travel is about experiences, stories, and culture. SafarUp leverages technology and local insights to ensure travelers discover Bihar authentically while supporting sustainable tourism.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl">
                <p className="text-3xl font-bold text-blue-600">50+</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Destinations in Bihar</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl">
                <p className="text-3xl font-bold text-blue-600">10k+</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Happy Travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-900 text-white rounded-[3rem] mx-4 mb-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Join Bihar’s Travel Revolution</h2>
          <p className="text-slate-400 text-lg mb-10">
            Explore spiritual sites, historic landmarks, and natural wonders of Bihar with SafarUp, your trusted local travel startup funded by the Bihar government.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/destinations"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all transform hover:-translate-y-1"
            >
              Explore Destinations
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full font-bold transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
