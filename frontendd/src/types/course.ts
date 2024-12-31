export interface Course {
    id: number
    name: string
    thumbnail_link: string
    category?: { name: string }
    lesson_count: number
    duration: number
    course_level: string
    User?: { 
      first_name: string
      last_name: string
      avatar: string 
    }
    payable_price: number
    price: number
  }
  
  