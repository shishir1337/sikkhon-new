import { Nunito } from "next/font/google"
import Link from "next/link"
import BlogCard from "../BlogCard"
import { blogs } from "../../data/blogs"

const nunito = Nunito({ subsets: ["latin"] })

export default function LatestBlogs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        <div className="text-center mb-12">
          <p className={`${nunito.className} text-blue-950 text-sm font-semibold uppercase mb-4`}>News and Blogs</p>
          <h2 className={`${nunito.className} text-4xl font-extrabold mb-4`}>Our Latest Publications</h2>
          <p className="text-base max-w-2xl mx-auto">
            We always give extra care to our student's skills improvements and feel excited to share our latest research
            and learnings!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className={`${nunito.className} inline-block px-6 py-3 rounded-md bg-blue-950 text-white font-semibold hover:bg-blue-900 transition-colors duration-300`}
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}

