import { Nunito } from "next/font/google"
import Link from "next/link"
import BlogCard from "@/components/blog/BlogCard"
import { getPosts } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Post } from "../../../types/blog"

const nunito = Nunito({ subsets: ["latin"] })

export default async function LatestBlogs() {
  const postsData = await getPosts(1, 3) // Fetch the first 3 posts

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className={`${nunito.className} text-blue-950 text-sm font-semibold uppercase mb-4`}>News and Blogs</p>
          <h2 className={`${nunito.className} text-4xl font-extrabold mb-4`}>Our Latest Publications</h2>
          <p className="text-base max-w-2xl mx-auto">
            We always give extra care to our student's skills improvements and feel excited to share our latest research
            and learnings!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsData.docs.map((post: Post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild className="bg-blue-950 hover:bg-blue-900">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
