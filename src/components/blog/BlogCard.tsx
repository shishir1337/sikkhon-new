import Image from "next/image"
import Link from "next/link"
import { Nunito } from "next/font/google"
import { formatDate } from "@/lib/utils"
import type { Category, Post } from "../../../types/blog"

const nunito = Nunito({ subsets: ["latin"] })

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.heroImage.thumbnailURL || "/placeholder.svg"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className={`${nunito.className} text-sm font-semibold text-blue-950 hover:underline uppercase`}
            >
              {category.title}
            </Link>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2
            className={`${nunito.className} text-xl font-bold mb-2 text-gray-800 hover:text-blue-950 transition-colors duration-300 line-clamp-2`}
          >
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.meta.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            {post.author?.avatar && (
              <Image
                src={post.author.avatar.thumbnailURL || "/placeholder.svg"}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
            )}
            <Link
              href={`/author/${post.author.id}`}
              className={`${nunito.className} text-sm font-semibold text-gray-800 hover:underline`}
            >
              {post.author?.name || "Sikkhon"}
            </Link>
          </div>
          <time dateTime={post.publishedAt} className="text-xs text-gray-600">
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>
    </div>
  )
}

