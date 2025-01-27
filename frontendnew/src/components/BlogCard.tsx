import Image from "next/image"
import Link from "next/link"
import { Nunito } from "next/font/google"

const nunito = Nunito({ subsets: ["latin"] })

interface BlogCardProps {
  id: string
  thumbnail: string
  category: string
  title: string
  authorAvatar: string
  authorName: string
  postDate: string
}

export default function BlogCard({
  id,
  thumbnail,
  category,
  title,
  authorAvatar,
  authorName,
  postDate,
}: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <Link href={`/blog/${id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className={`${nunito.className} text-sm font-semibold text-blue-950`}>{category}</span>
        </div>
        <Link href={`/blog/${id}`}>
          <h3
            className={`${nunito.className} text-xl font-bold mb-2 text-gray-800 hover:text-blue-950 transition-colors duration-300`}
          >
            {title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Image
              src={authorAvatar || "/placeholder.svg"}
              alt={authorName}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <p className={`${nunito.className} text-sm font-semibold text-gray-800`}>{authorName}</p>
          </div>
          <p className="text-xs text-gray-600">{postDate}</p>
        </div>
      </div>
    </div>
  )
}

