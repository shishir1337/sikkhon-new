export interface Instructor {
    name: string
    avatar: string
  }
  
  export interface Course {
    id: string
    thumbnail: string
    regularPrice: number
    discountedPrice: number
    instructor: Instructor
    title: string
    description: string
    totalLessons: number
    enrolledStudents: number
    rating: number
    category: string
  }
  
  export const courses: Course[] = [
    {
      id: "excel-essentials",
      thumbnail: "/Excel_Course_Banner.webp",
      regularPrice: 99.99,
      discountedPrice: 79.99,
      instructor: {
        name: "Admin",
        avatar: "https://avatar.iran.liara.run/public/1",
      },
      title: "Microsoft Excel Essentials Training (Bangla)",
      description:
        "This is a full course in Microsoft Office Excel 2007, you will learn full MS Excel in Bangla for free.",
      totalLessons: 39,
      enrolledStudents: 211,
      rating: 4.7,
      category: "Office Skills",
    },
    {
      id: "freshdesk-omnichannel",
      thumbnail: "https://media.dizishore.com/sikkhon.com/2024/05/Screenshot-2024-05-12-144530-750x500.jpg.webp",
      regularPrice: 200,
      discountedPrice: 130,
      instructor: {
        name: "Mohamed Elfatih",
        avatar: "https://avatar.iran.liara.run/public/2",
      },
      title: "Microsoft Excel Essentials Training (Bangla)",
      description:
        "You are a part of a support team and you have just started using Freshdesk or you are already using it but didn't find your away around it and still feel rusty when it comes to dealing with Freshdesk, no worries – We got you! This short-crashing course is all about making you get around Freshdesk features and navigating easily within the platform as if you have been using it for ages.",
      totalLessons: 9,
      enrolledStudents: 17,
      rating: 4.9,
      category: "Customer Support",
    },
    {
      id: "web-development-fundamentals",
      thumbnail: "/Excel_Course_Banner.webp",
      regularPrice: 149.99,
      discountedPrice: 99.99,
      instructor: {
        name: "Sarah Johnson",
        avatar: "https://avatar.iran.liara.run/public/3",
      },
      title: "Microsoft Excel Essentials Training (Bangla)",
      description:
        "You are a part of a support team and you have just started using Freshdesk or you are already using it but didn't find your away around it and still feel rusty when it comes to dealing with Freshdesk, no worries – We got you! This short-crashing course is all about making you get around Freshdesk features and navigating easily within the platform as if you have been using it for ages.",
      totalLessons: 9,
      enrolledStudents: 1500,
      rating: 4.8,
      category: "Web Development",
    },
    {
      id: "data-science-python",
      thumbnail: "/Excel_Course_Banner.webp",
      regularPrice: 179.99,
      discountedPrice: 129.99,
      instructor: {
        name: "Dr. Alex Chen",
        avatar: "https://avatar.iran.liara.run/public/4",
      },
      title: "Microsoft Excel Essentials Training (Bangla)",
      description:
        "You are a part of a support team and you have just started using Freshdesk or you are already using it but didn't find your away around it and still feel rusty when it comes to dealing with Freshdesk, no worries – We got you! This short-crashing course is all about making you get around Freshdesk features and navigating easily within the platform as if you have been using it for ages.",
      totalLessons: 9,
      enrolledStudents: 2200,
      rating: 4.9,
      category: "Data Science",
    },
    {
      id: "digital-marketing-essentials",
      thumbnail: "/Excel_Course_Banner.webp",
      regularPrice: 129.99,
      discountedPrice: 89.99,
      instructor: {
        name: "Emily Rodriguez",
        avatar: "https://avatar.iran.liara.run/public/5",
      },
      title: "Microsoft Excel Essentials Training (Bangla)",
      description:
        "You are a part of a support team and you have just started using Freshdesk or you are already using it but didn't find your away around it and still feel rusty when it comes to dealing with Freshdesk, no worries – We got you! This short-crashing course is all about making you get around Freshdesk features and navigating easily within the platform as if you have been using it for ages.",
      totalLessons: 9,
      enrolledStudents: 1800,
      rating: 4.7,
      category: "Marketing",
    },
    {
      id: "mobile-app-development",
      thumbnail: "/Excel_Course_Banner.webp",
      regularPrice: 199.99,
      discountedPrice: 149.99,
      instructor: {
        name: "Michael Lee",
        avatar: "https://avatar.iran.liara.run/public/6",
      },
      title: "Microsoft Excel Essentials Training (Bangla)",
      description:
        "You are a part of a support team and you have just started using Freshdesk or you are already using it but didn't find your away around it and still feel rusty when it comes to dealing with Freshdesk, no worries – We got you! This short-crashing course is all about making you get around Freshdesk features and navigating easily within the platform as if you have been using it for ages.",
      totalLessons: 9,
      enrolledStudents: 1300,
      rating: 4.8,
      category: "Mobile Development",
    },
    {
      id: "graphic-design-fundamentals",
      thumbnail: "/Excel_Course_Banner.webp",
      regularPrice: 159.99,
      discountedPrice: 119.99,
      instructor: {
        name: "Sophia Wang",
        avatar: "https://avatar.iran.liara.run/public/7",
      },
      title: "Microsoft Excel Essentials Training (Bangla)",
      description:
        "You are a part of a support team and you have just started using Freshdesk or you are already using it but didn't find your away around it and still feel rusty when it comes to dealing with Freshdesk, no worries – We got you! This short-crashing course is all about making you get around Freshdesk features and navigating easily within the platform as if you have been using it for ages.",
      totalLessons: 9,
      enrolledStudents: 1600,
      rating: 4.6,
      category: "Design",
    },
    {
      id: "project-management-professional",
      thumbnail: "/Excel_Course_Banner.webp",
      regularPrice: 249.99,
      discountedPrice: 199.99,
      instructor: {
        name: "David Brown",
        avatar: "https://avatar.iran.liara.run/public/8",
      },
      title: "Project Management Professional (PMP) Certification Prep",
      description:
        "You are a part of a support team and you have just started using Freshdesk or you are already using it but didn't find your away around it and still feel rusty when it comes to dealing with Freshdesk, no worries – We got you! This short-crashing course is all about making you get around Freshdesk features and navigating easily within the platform as if you have been using it for ages.",
      totalLessons: 9,
      enrolledStudents: 2500,
      rating: 4.9,
      category: "Business",
    },
    {
      id: "machine-learning-ai",
      thumbnail: "/Excel_Course_Banner.webp",
      regularPrice: 229.99,
      discountedPrice: 179.99,
      instructor: {
        name: "Dr. Maria Garcia",
        avatar: "https://avatar.iran.liara.run/public/9",
      },
      title: "Microsoft Excel Essentials Training (Bangla)",
      description:
        "You are a part of a support team and you have just started using Freshdesk or you are already using it but didn't find your away around it and still feel rusty when it comes to dealing with Freshdesk, no worries – We got you! This short-crashing course is all about making you get around Freshdesk features and navigating easily within the platform as if you have been using it for ages.",
      totalLessons: 9,
      enrolledStudents: 1900,
      rating: 4.8,
      category: "Artificial Intelligence",
    },
  ]
  
  