import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Nunito } from "next/font/google"
import { getPost } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import RichContent from "@/components/blog/RichContent"
import BlogCard from "@/components/blog/BlogCard"
import { Category, Post } from "../../../../../types/blog"

const nunito = Nunito({ subsets: ["latin"] })

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPost(params.slug)

    const metaTitle = post.meta?.title || post.title
    const metaDescription =
      post.meta?.description ||
      post.content.root.children.find((child: any) => child.type === "paragraph")?.children[0]?.text?.slice(0, 160) ||
      ""

    return {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: post.meta?.image
          ? [
              {
                url: post.meta.image.thumbnailURL,
                width: post.meta.image.width,
                height: post.meta.image.height,
                alt: post.meta.image.alt || post.title,
              },
            ]
          : [],
      },
    }
  } catch (error) {
    return {
      title: "Post Not Found | Sikkhon",
      description: "The requested blog post could not be found.",
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const post = await getPost(params.slug)

    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={post.heroImage.thumbnailURL || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center text-white">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {post.categories.map((category: Category) => (
                    <Link
                      key={category.id}
                      href={`/blog/category/${category.slug}`}
                      className={`${nunito.className} text-sm font-semibold hover:underline uppercase`}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
                <h1 className={`${nunito.className} text-4xl md:text-5xl font-bold mb-4`}>{post.title}</h1>
                <div className="flex items-center justify-center gap-4">
                  <Link href={`/author/${post.author.id}`}
                  className="flex items-center gap-2 hover:underline">
                    {post.author.avatar && (
                      <Image
                        src={post.author.avatar.thumbnailURL || "/placeholder.svg"}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <span className={`${nunito.className} font-semibold`}>{post.author.name}</span>
                  </Link>
                  <time dateTime={post.publishedAt} className="text-sm">
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <RichContent content={post.content.root} />
          </div>

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className={`${nunito.className} text-3xl font-bold text-center mb-8`}>Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {post.relatedPosts.map((relatedPost: Post) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

