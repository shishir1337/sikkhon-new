import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Book, Clock, GraduationCap } from 'lucide-react'
import { Course } from '@/types/course'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
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
          {course.category?.name || 'Uncategorized'}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1" title={course.name}>
          {course.name}
        </h3>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <Image 
            src={course.User?.avatar || '/placeholder.svg?height=100&width=100'} 
            alt={`${course.User?.first_name} ${course.User?.last_name}`} 
            width={24} 
            height={24} 
            className="rounded-full mr-2"
          />
          <span>{`${course.User?.first_name} ${course.User?.last_name}`}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
          <div className="flex items-center">
            <Book className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{course.lesson_count} lessons</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{formatDuration(course.duration)}</span>
          </div>
          <div className="flex items-center col-span-2">
            <GraduationCap className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{course.course_level}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-blue-950 font-bold">
            ${course.payable_price.toFixed(2)}
            {course.payable_price < course.price && (
              <span className="text-gray-400 line-through text-sm ml-2">
                ${course.price.toFixed(2)}
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

