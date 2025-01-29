import type { Metadata } from "next";
import Link from "next/link";
import { Nunito } from "next/font/google";
import CourseCard from "@/components/CourseCard";
import { paidCourses } from "@/data/paidCourses";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sikkhon Paid Courses",
  description:
    "Explore our premium selection of paid courses at Sikkhon. Advance your career with in-depth, expert-led courses in Microsoft Office, graphic design, web development, data science, and more. Invest in your future with our high-quality, comprehensive learning experiences.",
};

export default function PaidCoursesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Title Section */}
      <div className="bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <h1
            className={`${nunito.className} text-4xl font-extrabold text-white text-center mb-4`}
          >
            Sikkhon Paid Courses
          </h1>
          <p className="text-white text-center max-w-3xl mx-auto">
            Explore our premium selection of paid courses at{" "}
            <strong>
              <a
                href="https://sikkhon.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="underline"
              >
                Sikkhon
              </a>
            </strong>
            . Advance your career with in-depth, expert-led courses in{" "}
            <strong>
              Microsoft Office, graphic design, web development, data science
            </strong>
            , and more. Invest in your future with our high-quality,
            comprehensive learning experiences.
          </p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container mx-auto px-4 py-16">
        <h2
          className={`${nunito.className} text-3xl font-bold text-center mb-8`}
        >
          Master Essential Skills with Paid Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paidCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <p className={`${nunito.className} text-lg text-gray-700`}>
            Get the most dedicated consultation for your life-changing course.
            Earn a <br /> certification for your effort and passion.{" "}
            <Link
              href="/dashboard"
              className="text-blue-950 font-semibold hover:underline"
            >
              Join Free Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
