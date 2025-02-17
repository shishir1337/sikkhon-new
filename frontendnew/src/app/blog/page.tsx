import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { getPosts } from "@/lib/api"
import BlogCard from "@/components/blog/BlogCard"
import Pagination from "@/components/blog/Pagination"
import { Post } from "../../../types/blog"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blog | Sikkhon",
  description:
    "Read the latest articles about online learning, skill development, and professional growth on Sikkhon's blog.",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const postsData = await getPosts(page)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Title Section */}
      <div className="bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <h1 className={`${nunito.className} text-4xl font-extrabold text-white text-center mb-4`}>Sikkhon Blog</h1>
          <p className="text-white text-center max-w-3xl mx-auto">
            Stay up to date with the latest trends in online learning, skill development, and professional growth. Our
            expert instructors and industry professionals share their insights and knowledge to help you succeed.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsData.docs.map((post: Post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={postsData.page}
          totalPages={postsData.totalPages}
          hasNextPage={postsData.hasNextPage}
          hasPrevPage={postsData.hasPrevPage}
        />
      </div>
    </div>
  )
}

