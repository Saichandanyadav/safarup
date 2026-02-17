"use client"

import { useState, useEffect, useRef } from "react"

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
        setTimeout(() => {
          typeMessage("Hi 👋 How can I help you today?")
        }, 300)
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
    const handleScroll = () => {
      if (window.scrollY > 200) setShowScroll(true)
      else setShowScroll(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: "user", text: input }])
    setInput("")
    setTimeout(() => {
      typeMessage("Thanks for your message. Our team will assist you shortly.")
    }, 600)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {visible && (
        <div
          className={`fixed bottom-0 right-0 w-full h-full md:w-[380px] md:h-[520px] bg-white md:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 ${
            open
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold text-base">SafarUp Support</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl"
            >
              ×
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-white shadow"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white flex gap-2 md:gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            />
            <button
              onClick={sendMessage}
              className="px-5 py-3 md:px-6 md:py-3 bg-blue-600 text-white rounded-full text-sm md:text-base active:scale-95 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {!open && (
        <div className="fixed bottom-6 right-4 flex flex-col items-center gap-3 z-50">
          {showScroll && (
            <button
              onClick={scrollToTop}
              className="w-12 h-12 bg-white text-blue-600 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition"
            >
              ↑
            </button>
          )}
          <button
            onClick={() => setOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75h6.75M8.625 13.5h4.5M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.255-.949L3 20l1.186-3.558A7.962 7.962 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
