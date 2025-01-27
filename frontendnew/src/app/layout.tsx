import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <div className="max-w-[1230px] mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

