import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Sikkhon</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Discover a world of knowledge with our diverse range of online courses. Start your learning journey today!
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/courses">Explore Courses</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/about">Learn More</Link>
        </Button>
      </div>
    </div>
  )
}

