import type { Metadata } from "next"
import InstructorRegistrationForm from "@/components/auth/InstructorRegistrationForm"

export const metadata: Metadata = {
  title: "Instructor Registration | Sikkhon",
  description: "Register as an instructor on Sikkhon to create and manage courses.",
}

export default function InstructorRegistrationPage() {
  return (
    <div className="bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <InstructorRegistrationForm />
      </div>
    </div>
  )
}

