import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Nunito } from "next/font/google"
import { getAuthor, getPosts } from "@/lib/api"
import BlogCard from "@/components/blog/BlogCard"
import Pagination from "@/components/blog/Pagination"
import { Post } from "../../../../types/blog"

const nunito = Nunito({ subsets: ["latin"] })

interface Props {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthor(Number.parseInt(params.id))

  if (!author) {
    return {
      title: "Author Not Found | Sikkhon",
      description: "The requested author could not be found.",
    }
  }

  return {
    title: `${author.name} | Sikkhon`,
    description: author.bio || `Read articles by ${author.name} on Sikkhon.`,
  }
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const author = await getAuthor(Number.parseInt(params.id))

  if (!author) {
    notFound()
  }

  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const postsData = await getPosts(page);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Author Profile Section */}
      <div className="bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            {author.avatar && (
              <Image
                src={author.avatar.thumbnailURL || "/placeholder.svg"}
                alt={author.name}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-6"
              />
            )}
            <h1 className={`${nunito.className} text-4xl font-extrabold mb-4`}>{author.name}</h1>
            {author.bio && <p className="text-lg mb-6">{author.bio}</p>}
            {author.social && (
              <div className="flex justify-center gap-4">
                {author.social.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {author.social.facebook && (
                  <a
                    href={author.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {author.social.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <div className="container mx-auto px-4 py-16">
        <h2 className={`${nunito.className} text-3xl font-bold text-center mb-12`}>Articles by {author.name}</h2>
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

