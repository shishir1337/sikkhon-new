"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Book, Users, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface Instructor {
  name: string
  avatar: string
}

interface CourseCardProps {
  thumbnail: string
  regularPrice: number
  discountedPrice: number
  instructor: Instructor
  title: string
  description: string
  totalLessons: number
  enrolledStudents: number
  rating: number
  duration: string
}

export default function CourseCard({
  thumbnail,
  regularPrice,
  discountedPrice,
  instructor,
  title,
  description,
  totalLessons,
  enrolledStudents,
  rating,
  duration,
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 ease-in-out"
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={384}
          height={216}
          className="w-full h-48 object-cover transition-all duration-300 ease-in-out"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div className="absolute top-2 right-2 bg-blue-950 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          ${discountedPrice.toFixed(2)}
          <span className="text-xs line-through ml-2 opacity-75">${regularPrice.toFixed(2)}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center mb-3">
          <Image
            src={instructor.avatar || "/placeholder.svg"}
            alt={instructor.name}
            width={40}
            height={40}
            className="rounded-full mr-3 border-2 border-blue-950"
          />
          <span className="text-gray-700 text-sm font-medium">{instructor.name}</span>
        </div>
        <h2 className="font-bold text-xl mb-2 text-blue-950 line-clamp-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Book className="w-4 h-4 mr-1 text-blue-950" />
            {totalLessons} Lessons
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-blue-950" />
            {enrolledStudents} Students
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-blue-950" />
            {duration}
          </div>
        </div>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600 font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <motion.button
          className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enroll Now
        </motion.button>
      </div>
    </motion.div>
  )
}

