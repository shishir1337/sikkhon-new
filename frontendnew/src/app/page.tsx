import type { Metadata } from "next"
import HeroSection from "../components/home/hero"
import PopularCourses from "../components/home/popularCourses"
import LatestBlogs from "../components/home/latestblogs"
import PopularCategories from "@/components/home/popularCategories"
import FreeCourses from "@/components/home/FreeCourses"
import BecomeInstructor from "@/components/home/BecomeInstructor"
import Newsletter from "@/components/home/Newsletter"


export const metadata: Metadata = {
  title: "Sikkhon - The World's Leading Distance-Learning Provider",
  description:
    "Explore our interactive courses tailored to your needs. Sikkhon offers the best eLearning experience with diverse courses in Bangla for distance learning and skill development.",
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PopularCourses />
      <LatestBlogs />
      <PopularCategories />
      <FreeCourses />
      <BecomeInstructor />
      <Newsletter />
    </main>
  )
}

