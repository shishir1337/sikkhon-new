import type { Metadata } from "next"
import HeroSection from "@/components/home/hero"

export const metadata: Metadata = {
  title: "Sikkhon - The World's Leading Distance-Learning Provider",
  description:
    "Explore our interactive courses tailored to your needs. Sikkhon offers the best eLearning experience with diverse courses in Bangla for distance learning and skill development.",
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* Additional sections can be added here */}
    </main>
  )
}

