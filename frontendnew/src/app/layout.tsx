import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "eLearning and Skill Development Platform | Distance Learning Providers",
  description: "Elevate your learning journey with Sikkhon, a leading eLearning and skill development platform. Explore top-notch courses in Bangla from the best distance learning providers. Unlock your potential with our comprehensive eLearning platform. Start learning today!",
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
            <div>{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

