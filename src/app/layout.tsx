import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import Header from "../components/header"
import Footer from "../components/footer"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sikkhon - Online Learning Platform",
  description: "Discover a world of knowledge with Sikkhon's online courses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <div>{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

