"use client"

import { useState } from "react"
import { Nunito } from 'next/font/google'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { FilterIcon } from 'lucide-react'
import CourseCard from "@/components/CourseCard"
import { courses } from "@/data/courses"


const nunito = Nunito({ subsets: ["latin"] })

const categories = [
  "Content Writing",
  "Customer Service",
  "Fresh Desk",
  "Free",
  "Graphics Design",
  "Adobe Illustrator",
  "Photoshop",
  "Internet",
  "Microsoft Office",
  "MS Excel",
  "MS Word",
  "Power Point",
  "Microsoft Office 365",
  "Microsoft Bookings",
  "Microsoft Forms",
  "Microsoft Teams",
  "SharePoint",
  "Paid",
  "PHP",
  "Web Development",
]

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Title (A-Z)", value: "titleAsc" },
  { label: "Title (Z-A)", value: "titleDesc" },
  { label: "Price (Low to High)", value: "priceLow" },
  { label: "Price (High to Low)", value: "priceHigh" },
]

export default function AllCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState(sortOptions[0])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const coursesPerPage = 9

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
    setCurrentPage(1) // Reset to first page when changing categories
  }

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category)
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortOption.value) {
        case "newest":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case "oldest":
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        case "titleAsc":
          return a.title.localeCompare(b.title)
        case "titleDesc":
          return b.title.localeCompare(a.title)
        case "priceLow":
          return a.discountedPrice - b.discountedPrice
        case "priceHigh":
          return b.discountedPrice - a.discountedPrice
        default:
          return 0
      }
    })

  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const CategoryList = () => (
    <div className="space-y-2">
      {categories.map((category) => (
        <div key={category} className="flex items-center space-x-2">
          <Checkbox
            id={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={() => handleCategoryChange(category)}
          />
          <label
            htmlFor={category}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {category}
          </label>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      {/* Title Section */}
      <div className="bg-blue-950 py-12">
        <div className="container">
          <h1 className={`${nunito.className} text-4xl font-extrabold text-white text-center`}>Courses</h1>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-1/2">
            <Input
              type="search"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-auto flex gap-2">
            <Select
              value={sortOption.value}
              onValueChange={(value) =>
                setSortOption(sortOptions.find((option) => option.value === value) || sortOptions[0])
              }
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <FilterIcon className="mr-2 h-4 w-4" /> Filter
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Categories</DrawerTitle>
                  <DrawerDescription>Select categories to filter courses</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <CategoryList />
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Category Sidebar (desktop) */}
          <div className="w-full md:w-1/4 hidden md:block">
            <h2 className={`${nunito.className} text-xl font-bold mb-4`}>Categories</h2>
            <CategoryList />
          </div>

          {/* Course Cards */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  className="mx-1"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
