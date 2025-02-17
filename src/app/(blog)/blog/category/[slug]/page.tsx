import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Nunito } from "next/font/google"
import { getCategory, getPosts } from "@/lib/api"
import BlogCard from "@/components/blog/BlogCard"
import Pagination from "@/components/blog/Pagination"
import type { Post } from "../../../../../../types/blog"

const nunito = Nunito({ subsets: ["latin"] })

interface Props {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.slug)

  if (!category) {
    return {
      title: "Category Not Found | Sikkhon",
      description: "The requested category could not be found.",
    }
  }

  return {
    title: `${category.title} | Sikkhon Blog`,
    description: `Read articles about ${category.title} on Sikkhon's blog.`,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const postsData = await getPosts(page, 9, { category: category.id })

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Title Section */}
      <div className="bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <h1 className={`${nunito.className} text-4xl font-extrabold text-white text-center mb-4`}>
            {category.title}
          </h1>
          <p className="text-white text-center max-w-3xl mx-auto">
            Explore articles and insights related to {category.title} on Sikkhon's blog.
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

