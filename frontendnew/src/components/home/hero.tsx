import { Nunito } from "next/font/google"
import { User } from "lucide-react"
import Link from "next/link"
import CourseCard from "@/components/CourseCard"

const nunito = Nunito({ subsets: ["latin"] })

export default function HeroSection() {
  const courseData = [
    {
      thumbnail: "https://media.dizishore.com/sikkhon.com/2024/07/excel-1-750x500.jpg.webp",
      regularPrice: 99.99,
      discountedPrice: 79.99,
      instructor: {
        name: "Admin",
        avatar: "https://avatar.iran.liara.run/public/1",
      },
      title: "Microsoft Excel Essentials Training (Bangla)",
      description: "This is a full course in Microsoft Office Excel 2007, you will learn full MS Excel in Bangla for free.",
      totalLessons: 39,
      enrolledStudents: 211,
      rating: 4.7,
    },
    {
      thumbnail: "https://media.dizishore.com/sikkhon.com/2024/05/Screenshot-2024-05-12-144530-750x500.jpg.webp",
      regularPrice: 200,
      discountedPrice: 130,
      instructor: {
        name: "Mohamed Elfatih",
        avatar: "https://avatar.iran.liara.run/public/2",
      },
      title: "Freshdesk Omnichannel Crash Course",
      description: "You are a part of a support team and you have just started using Freshdesk or you are already using it but didn’t find your away around it and still feel rusty when it comes to dealing with Freshdesk, no worries – We got you! This short-crashing course is all about making you get around Freshdesk features and navigating easily within the platform as if you have been using it for ages.",
      totalLessons: 9,
      enrolledStudents: 17,
      rating: 4.9,
    },
  ]

  return (
    <section
      className="relative w-full py-12 md:py-24 bg-cover bg-center"
      style={{ backgroundImage: "url(https://media.dizishore.com/sikkhon.com/2024/01/sikkhon-home-background.jpg.webp)" }}
    >
      <div className="absolut"></div>
      <div className="relative z-10 max-w-[1230px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <h1 className={`${nunito.className} text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-black`}>
              The World's Leading Distance-Learning Provider
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-justify">
              Flexible easy to access learning opportunities can bring a significant change in how individuals prefer to
              learn! It is one of the best eLearning platforms offering diverse courses in Bangla for distance learning
              and skill development. As one of the top eLearning and development providers, explore our interactive
              courses tailored to your needs. Sikkhon can offer you to enjoy the beauty of eLearning!
            </p>
            <Link
              href="/dashboard/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-950 hover:bg-gray-100 hover:text-blue-950 hover:border-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              <User className="mr-2 h-5 w-5 font-bold" />
              Join Us
            </Link>
          </div>
          <div className="lg:w-1/2 flex flex-col sm:flex-row gap-6">
            {courseData.map((course, index) => (
              <div key={index} className="sm:w-1/2">
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

