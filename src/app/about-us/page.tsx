import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Nunito } from "next/font/google"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "About Us | Sikkhon",
  description: "Learn about Sikkhon, a leading online learning platform for skill development and professional growth.",
}

export default function AboutUsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Title Section */}
      <div className="bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <h1 className={`${nunito.className} text-4xl font-extrabold text-white text-center mb-4`}>About Us</h1>
          <p className="text-white text-center max-w-4xl mx-auto">
            Sikkhon.com is a leading online learning platform that helps anyone to learn Graphics Design, Software
            Development, Web Development, Creative Skills, Business Skills, Computer Basics, Office Program and more.
            Find the right instructor for you. We are one of the best <b>e-learning platforms for skill development</b>.
            As one of the <b>best tutoring companies</b>, we provide a wide range of online learning opportunities and
            certification tailored for you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Image Section */}
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-12">
            <Image
              src="https://media.dizishore.com/sikkhon.com/2024/07/business-coach3.jpg.webp"
              alt="Sikkhon team collaboration"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quote and CTA Section */}
          <div className="text-center space-y-8">
            <blockquote className={`${nunito.className} text-3xl md:text-4xl font-bold text-blue-950`}>
              "We always take care our students"
            </blockquote>

            <Button
              asChild
              className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/dashboard">
                <UserPlus className="mr-2 h-5 w-5" />
                Join For Free
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

