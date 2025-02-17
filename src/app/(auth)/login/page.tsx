import type { Metadata } from "next"
import LoginForm from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Login | Sikkhon",
  description: "Log in to your Sikkhon account to access your courses and learning materials.",
}

export default function LoginPage() {
  return (
    <div className="bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginForm />
      </div>
    </div>
  )
}

