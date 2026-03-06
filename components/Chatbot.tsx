"use client"

import { useState, useEffect, useRef } from "react"
import { MessageSquare, ArrowUp, X, Send } from "lucide-react"

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [showScroll, setShowScroll] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const typeMessage = (text: string) => {
    let index = 0
    const tempMessage = { role: "bot", text: "" }
    setMessages(prev => [...prev, tempMessage])
    const interval = setInterval(() => {
      index++
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: "bot", text: text.slice(0, index) }
        return updated
      })
      if (index === text.length) clearInterval(interval)
    }, 20)
  }

  useEffect(() => {
    if (open) {
      setVisible(true)
      if (messages.length === 0) {
        setTimeout(() => typeMessage("Hi 👋 How can I help you?"), 300)
      }
    } else {
      const timeout = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: "user", text: input }])
    setInput("")
    setTimeout(() => typeMessage("Our team will assist you shortly!"), 600)
  }

  return (
    <>
      {visible && (
        <div
          className={`fixed inset-0 z-[100] md:inset-auto md:bottom-24 md:right-6 md:w-[400px] md:h-[600px] bg-white flex flex-col overflow-hidden transition-all duration-300 ${
            open ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
          } md:rounded-3xl md:shadow-2xl shadow-none`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">SafarUp Support</h3>
              <p className="text-xs opacity-80">Usually replies in seconds</p>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#f8faff]">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user" ? "ml-auto bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-white text-gray-800 shadow-sm border border-gray-100"
              }`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything..."
              className="flex-1 bg-gray-100 px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 transition">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {!open && (
        <div className="fixed bottom-24 right-4 flex flex-col items-center gap-3 z-[40] lg:bottom-6">
          {showScroll && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 bg-white text-blue-600 rounded-full shadow-xl flex items-center justify-center border border-gray-100 active:scale-90 transition"
            >
              <ArrowUp size={20} strokeWidth={3} />
            </button>
          )}
          <button
            onClick={() => setOpen(true)}
            className="w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-300 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
            <MessageSquare size={28} />
          </button>
        </div>
      )}
    </>
  )
}