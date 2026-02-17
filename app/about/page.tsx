import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "About SafarUp | Redefining Travel Discovery",
  description: "Join thousands of travelers exploring India's hidden gems with SafarUp.",
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
            Your Journey, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Elevated by SafarUp.
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are a community of explorers, storytellers, and tech enthusiasts dedicated to mapping the most breathtaking corners of India.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-500" />
            <Image
              src="/destinations-hero.jpg"
              alt="Indian Landscapes"
              width={800}
              height={600}
              className="relative rounded-[2rem] shadow-2xl grayscale-[20%] hover:grayscale-0 transition duration-500 object-cover aspect-[4/3]"
            />
          </div>

          <div className="space-y-8 lg:pl-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Travel isn't just about reaching a coordinate; it's about the stories found in between. SafarUp leverages real-time data and community verification to ensure your next adventure is authentic.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Hidden Gems</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl">
                <p className="text-3xl font-bold text-blue-600">10k+</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Active Travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-900 text-white rounded-[3rem] mx-4 mb-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to start your story?</h2>
          <p className="text-slate-400 text-lg mb-10">
            From the snow-capped peaks of Himachal to the serene backwaters of Kerala, find your path with SafarUp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/destinations"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all transform hover:-translate-y-1"
            >
              Explore Now
            </Link>
            <Link
              href="/community"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full font-bold transition-all"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}