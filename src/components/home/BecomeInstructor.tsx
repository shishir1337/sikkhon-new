"use client"

import { Nunito } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { UserPlus } from "lucide-react"
import { motion } from "framer-motion"

const nunito = Nunito({ subsets: ["latin"] })

export default function BecomeInstructor() {
  return (
    <section className="bg-white py-16 relative overflow-hidden">
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${nunito.className} text-blue-950 text-sm font-semibold uppercase mb-4`}
          >
            Get rewarded
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${nunito.className} text-4xl font-extrabold mb-4`}
          >
            Become an instructor today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base mb-8"
          >
            Join one of the world's largest online learning marketplaces.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/instructor-registration"
              className={`${nunito.className} inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Apply to Become a Teacher
            </Link>
          </motion.div>
        </div>

        {/* Left shape */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            y: [0, -20, 0],
          }}
          transition={{
            x: { duration: 1, ease: "easeOut" },
            opacity: { duration: 1, ease: "easeOut" },
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
            },
          }}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:block"
        >
          <Image
            src="https://media.dizishore.com/sikkhon.com/2024/08/shape7.png.webp"
            alt="Left shape"
            width={200}
            height={400}
            className="w-auto h-full max-h-[400px]"
          />
        </motion.div>

        {/* Right shape */}
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 1 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { duration: 1, ease: "easeOut" },
            opacity: { duration: 1, ease: "easeOut" },
            scale: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
            },
          }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block"
        >
          <Image
            src="https://media.dizishore.com/sikkhon.com/2024/08/shape4.png.webp"
            alt="Right shape"
            width={200}
            height={400}
            className="w-auto h-full max-h-[400px]"
          />
        </motion.div>
      </div>
    </section>
  )
}

