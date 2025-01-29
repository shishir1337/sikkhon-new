import AllCoursesPage from "@/components/courses/AllCoursesPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Courses Archive - Sikkhon.com",
    description: "Browse all courses available on Sikkhon, the leading distance-learning provider.",
}

export default function CoursesPage() {
  return <AllCoursesPage />
}

