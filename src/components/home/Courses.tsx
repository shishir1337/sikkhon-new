import { Nunito } from "next/font/google"
import Link from "next/link"
import CourseCard from "../CourseCard"
import { courses } from "../../data/courses"

const nunito = Nunito({ subsets: ["latin"] })

export default function PopularCourses() {
  return (
    <section className="bg-[#FEF8EF] py-16">
      <div className="container">
        <div className="text-center mb-12">
          <p className={`${nunito.className} text-blue-950 text-sm font-semibold uppercase mb-4`}>
            Learn At Your Own Pace
          </p>
          <h2 className={`${nunito.className} text-4xl font-extrabold mb-4`}>
            Popular Distance Learning Courses On Sikkhon
          </h2>
          <p className="text-base max-w-2xl mx-auto">
            Explore all of our courses and pick your suitable ones to enroll and start learning with us! We ensure that
            you will never regret it!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        <p className="text-center mt-12">
          Get the most dedicated consultation for your life-changing course. Earn a<br />certification for your effort and
          passion{" "}
          <Link href="/dashboard/" className="text-blue-950 font-semibold">
            Join Free Now
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

