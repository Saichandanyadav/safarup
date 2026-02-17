"use client"

import { useEffect, useState } from "react"
import {
  motion,
  AnimatePresence,
  PanInfo,
  useMotionValue,
  useTransform
} from "framer-motion"
import { Heart, X, User } from "lucide-react"
import { matchmakers } from "@/data/matchmakers"

type Person = {
  id: number
  name: string
  destination: string
  date: string
  interests: string[]
  gradient?: string
}

export default function Connect() {
  const [isLarge, setIsLarge] = useState(false)
  const [activeTab, setActiveTab] = useState<"current" | "accepted" | "declined">("current")
  const [requests, setRequests] = useState<Person[]>([])
  const [accepted, setAccepted] = useState<Person[]>([])
  const [declined, setDeclined] = useState<Person[]>([])

  useEffect(() => {
    const checkScreen = () => setIsLarge(window.innerWidth >= 1024)
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  useEffect(() => {
    const storedAccepted: Person[] = JSON.parse(localStorage.getItem("acceptedConnections") || "[]")
    const storedDeclined: Person[] = JSON.parse(localStorage.getItem("declinedConnections") || "[]")

    setAccepted(storedAccepted)
    setDeclined(storedDeclined)

    const decidedIds = new Set([
      ...storedAccepted.map((p) => p.id),
      ...storedDeclined.map((p) => p.id)
    ])

    const remaining = (matchmakers as Person[]).filter((p) => !decidedIds.has(p.id))
    setRequests(remaining)
  }, [])

  useEffect(() => {
    localStorage.setItem("acceptedConnections", JSON.stringify(accepted))
    localStorage.setItem("declinedConnections", JSON.stringify(declined))
  }, [accepted, declined])

  const handleDecision = (person: Person, type: "accept" | "decline") => {
    setRequests((prev) => prev.filter((p) => p.id !== person.id))
    if (type === "accept") setAccepted((prev) => [...prev, person])
    else setDeclined((prev) => [...prev, person])
  }

  const handleSkip = (person: Person) => {
    setRequests((prev) => {
      const filtered = prev.filter((p) => p.id !== person.id)
      return [...filtered, person]
    })
  }

  const SwipeCard = ({ person }: { person: Person }) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotate = useTransform(x, [-150, 150], [-10, 10])

    const cardBg = useTransform([x, y], ([latestX, latestY]: number[]) => {
      if (latestX > 80) return "#052e16"
      if (latestX < -80) return "#450a0a"
      if (latestY > 80) return "#0c4a6e"
      return "#0f172a"
    })

    const rightTextOpacity = useTransform(x, [40, 120], [0, 1])
    const leftTextOpacity = useTransform(x, [-120, -40], [1, 0])
    const downTextOpacity = useTransform(y, [40, 120], [0, 1])

    const handleDragEnd = (_: any, info: PanInfo) => {
      if (info.offset.x > 120) handleDecision(person, "accept")
      else if (info.offset.x < -120) handleDecision(person, "decline")
      else if (info.offset.y > 120) handleSkip(person)
      else {
        x.set(0)
        y.set(0)
      }
    }

    return (
      <motion.div
        style={{ x, y, rotate, backgroundColor: cardBg }}
        drag
        dragConstraints={{ left: -150, right: 150, top: 0, bottom: 150 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute w-full max-w-sm h-[500px] rounded-[32px] p-6 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between text-white overflow-hidden"
      >
        <motion.div style={{ opacity: rightTextOpacity }} className="absolute inset-0 flex items-center justify-center text-5xl font-black text-emerald-400 z-30 pointer-events-none">
          ACCEPT
        </motion.div>

        <motion.div style={{ opacity: leftTextOpacity }} className="absolute inset-0 flex items-center justify-center text-5xl font-black text-rose-500 z-30 pointer-events-none">
          DECLINE
        </motion.div>

        <motion.div style={{ opacity: downTextOpacity }} className="absolute inset-0 flex items-center justify-center text-5xl font-black text-sky-400 z-30 pointer-events-none">
          SKIP
        </motion.div>

        <div>
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${person.gradient || 'from-blue-500 to-purple-500'} flex items-center justify-center shadow-lg`}>
              <User className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{person.name}</h2>
              <p className="text-sm text-gray-300">Traveling to <span className="font-semibold text-white">{person.destination}</span></p>
              <p className="text-xs text-gray-400">{person.date}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {person.interests.map((interest, index) => (
              <span key={index} className="px-3 py-1 bg-white/10 border border-white/10 text-xs rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <button onClick={() => handleDecision(person, "decline")} className="w-14 h-14 rounded-full bg-white/5 border border-white/20 flex items-center justify-center active:scale-95 transition">
            <X className="text-rose-500" size={28} />
          </button>

          <button onClick={() => handleSkip(person)} className="w-14 h-14 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-sky-400 text-xl font-bold active:scale-95 transition">
            ↓
          </button>

          <button onClick={() => handleDecision(person, "accept")} className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-xl active:scale-95 transition">
            <Heart className="text-white fill-white" size={30} />
          </button>
        </div>
      </motion.div>
    )
  }

  const ListCard = ({ person }: { person: Person }) => (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-2xl text-white">
      <h4 className="font-bold">{person.name}</h4>
      <p className="text-sm text-gray-400">{person.destination}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="relative h-[45vh] sm:h-[55vh] overflow-hidden">
        <img src="/connect-hero.png" alt="Connect Travelers" className="w-full h-full object-cover object-top scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-950"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Connect with Fellow
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Travelers
            </span>
          </h1>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-12 max-w-7xl mx-auto">
        {!isLarge && (
          <>
            <div className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 mb-8">
              <div className="flex justify-between text-sm font-semibold">
                <button onClick={() => setActiveTab("declined")} className={`flex-1 py-4 ${activeTab==="declined"?"text-rose-500 border-b-2 border-rose-500":"text-gray-400"}`}>
                  Declined ({declined.length})
                </button>
                <button onClick={() => setActiveTab("current")} className={`flex-1 py-4 ${activeTab==="current"?"text-cyan-400 border-b-2 border-cyan-400":"text-gray-400"}`}>
                  Current ({requests.length})
                </button>
                <button onClick={() => setActiveTab("accepted")} className={`flex-1 py-4 ${activeTab==="accepted"?"text-emerald-400 border-b-2 border-emerald-400":"text-gray-400"}`}>
                  Accepted ({accepted.length})
                </button>
              </div>
            </div>

            {activeTab === "current" && (
              <div className="flex justify-center relative h-[520px]">
                <AnimatePresence mode="wait">
                  {requests.length > 0 ? (
                    <SwipeCard key={requests[0].id} person={requests[0]} />
                  ) : (
                    <p className="text-gray-500 mt-20">No current requests</p>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeTab === "accepted" && (
              <div className="space-y-4">
                {accepted.length > 0 ? accepted.map((p) => <ListCard key={p.id} person={p} />) :
                  <p className="text-gray-500 text-center">No accepted requests</p>}
              </div>
            )}

            {activeTab === "declined" && (
              <div className="space-y-4">
                {declined.length > 0 ? declined.map((p) => <ListCard key={p.id} person={p} />) :
                  <p className="text-gray-500 text-center">No declined requests</p>}
              </div>
            )}
          </>
        )}

        {isLarge && (
          <div className="grid grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold text-rose-500 mb-6 text-center">
                Declined ({declined.length})
              </h3>
              <div className="space-y-4">
                {declined.length > 0 ? declined.map((p) => <ListCard key={p.id} person={p} />) :
                  <p className="text-gray-500 text-center">No declined requests</p>}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-cyan-400 mb-6 text-center">
                Current ({requests.length})
              </h3>
              <div className="flex justify-center relative h-[520px] w-full max-w-sm">
                <AnimatePresence mode="wait">
                  {requests.length > 0 ? (
                    <SwipeCard key={requests[0].id} person={requests[0]} />
                  ) : (
                    <p className="text-gray-500 mt-20">No current requests</p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-6 text-center">
                Accepted ({accepted.length})
              </h3>
              <div className="space-y-4">
                {accepted.length > 0 ? accepted.map((p) => <ListCard key={p.id} person={p} />) :
                  <p className="text-gray-500 text-center">No accepted requests</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}