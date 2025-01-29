import type { Metadata } from "next"
import StudentRegistrationForm from "@/components/auth/StudentRegistrationForm"

export const metadata: Metadata = {
  title: "Student Registration | Sikkhon",
  description: "Register as a student on Sikkhon to access our wide range of courses and learning materials.",
}

export default function StudentRegistrationPage() {
  return (
    <div className="bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <StudentRegistrationForm />
      </div>
    </div>
  )
}

