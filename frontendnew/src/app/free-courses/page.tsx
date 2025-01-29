import type { Metadata } from "next"
import Link from "next/link"
import { Nunito } from "next/font/google"
import CourseCard from "@/components/CourseCard"
import { freeCourses } from "@/data/freeCourses"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sikkhon Free Courses",
  description:
    "Discover a range of free online courses at Sikkhon, including Microsoft Office classes like Excel, Word, PowerPoint, Outlook etc, graphic design, and Adobe courses in bangla. Enhance your skills with free Microsoft classes online and unlock new opportunities. Start learning for free today and boost your career with top-quality, user-friendly courses.",
}

export default function FreeCoursesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Title Section */}
      <div className="bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <h1 className={`${nunito.className} text-4xl font-extrabold text-white text-center mb-4`}>
            Sikkhon Free Courses
          </h1>
          <p className="text-white text-center max-w-3xl mx-auto">
            Discover a range of free online courses at{" "}
            <strong>
              <a href="https://sikkhon.com/" target="_blank" rel="noreferrer noopener" className="underline">
                Sikkhon
              </a>
            </strong>
            , including <strong>Microsoft Office classes like Excel, Word, PowerPoint, Outlook etc</strong>,{" "}
            <strong>graphic design</strong>, and <strong>Adobe courses</strong> in bangla. Enhance your skills with{" "}
            <strong>free Microsoft classes online</strong> and unlock new opportunities. Start learning for free today
            and boost your career with top-quality, user-friendly courses.
          </p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className={`${nunito.className} text-3xl font-bold text-center mb-8`}>
          Boost Your Skills with Free Online Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freeCourses.slice(0, 6).map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <p className={`${nunito.className} text-lg text-gray-700`}>
            Get the most dedicated consultation for your life-changing course. Earn a <br/> certification for your effort and
            passion.{" "}
            <Link href="/dashboard" className="text-blue-950 font-semibold hover:underline">
              Join Free Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

