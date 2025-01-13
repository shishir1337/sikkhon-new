'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Autoplay } from 'swiper/modules'
import { ArrowRight, Book, Clock, GraduationCap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getCourseListsForAllApi } from '@/section/public/course.category'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

// Types
interface Course {
  id: number
  name: string
  slug: string
  duration: number
  short_description: string
  course_level: number
  is_free: boolean
  price: string
  payable_price: string
  thumbnail_link: string | null
  category: {
    name: string
  }
  User: {
    first_name: string
    last_name: string
    photo: string | null
  }
  lession_count: number
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    list: { course: Course }[]
    meta: {
      total: number
      lastPage: number
      currentPage: number
      perPage: number
      prev: number | null
      next: number | null
    }
  }
}

// CourseCard component
function CourseCard({ course }: { course: Course }) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const courseLevelMap = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
      <div className="relative">
        <Image 
          src={course.thumbnail_link || '/placeholder.svg?height=300&width=400'} 
          alt={`${course.name} course thumbnail`} 
          width={400} 
          height={300} 
          className="w-full h-48 object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute top-2 right-2 text-xs" variant="secondary">
          {course.category?.name}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1" title={course.name}>
          {course.name}
        </h3>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <Image 
            src={course.User?.photo || '/placeholder.svg?height=100&width=100'} 
            alt={`${course.User.first_name} ${course.User.last_name}`} 
            width={24} 
            height={24} 
            className="rounded-full mr-2"
          />
          <span>{`${course.User.first_name} ${course.User.last_name}`}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
          <div className="flex items-center">
            <Book className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{course.lession_count} lessons</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{formatDuration(course.duration)}</span>
          </div>
          <div className="flex items-center col-span-2">
            <GraduationCap className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{courseLevelMap[course.course_level as keyof typeof courseLevelMap]}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-blue-950 font-bold">
            {course.is_free ? 'Free' : `$${parseFloat(course.payable_price).toFixed(2)}`}
            {!course.is_free && parseFloat(course.payable_price) < parseFloat(course.price) && (
              <span className="text-gray-400 line-through text-sm ml-2">
                ${parseFloat(course.price).toFixed(2)}
              </span>
            )}
          </div>
          <button 
            className="bg-blue-950 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-blue-900 transition duration-300 ease-in-out"
            onClick={() => console.log(`Enroll clicked for course: ${course.id}`)}
            aria-label={`Enroll in ${course.name}`}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  )
}

// Hero component
export default function HeroSection() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response: ApiResponse = await getCourseListsForAllApi(1, 10, '')
        if (response.success) {
          setCourses(response.data.list.map(item => item.course))
        } else {
          setError('Failed to fetch courses')
        }
      } catch (err) {
        setError('An error occurred while fetching courses')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (isLoading) {
    return <div className="text-center py-20">Loading courses...</div>
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>
  }

  return (
    <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Elevate Your Skills with Expert-Led Courses
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-xl leading-relaxed animate-fade-in-up animation-delay-200">
              Embark on a journey of knowledge and skill enhancement. Our cutting-edge courses are designed to propel your career forward.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
              <button 
                className="group bg-white text-blue-950 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300 shadow-lg flex items-center"
                onClick={() => console.log('Start Learning clicked')}
                aria-label="Start Learning"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button 
                className="border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-blue-950 transition duration-300"
                onClick={() => console.log('Browse Courses clicked')}
                aria-label="Browse Courses"
              >
                Browse Courses
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full max-w-md mx-auto relative">
            <div className="absolute inset-0 bg-blue-400 opacity-20 blur-3xl rounded-full"></div>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              className="w-full"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {courses.map((course) => (
                <SwiperSlide key={course.id}>
                  <CourseCard course={course} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

