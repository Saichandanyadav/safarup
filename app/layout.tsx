import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Chatbot from "@/components/Chatbot"

export const metadata = {
  title: "SafarUp",
  description: "India’s Smart Travel Discovery Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-28">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}
