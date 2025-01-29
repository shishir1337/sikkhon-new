"use client"

import { useState } from "react"
import Link from "next/link"
import { Nunito } from "next/font/google"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const nunito = Nunito({ subsets: ["latin"] })

export default function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Here you would typically handle the password reset logic
    // For now, we'll just show a success message
    console.log("Password reset attempt for:", identifier)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Password Reset Initiated",
      description: "If an account exists with this email or username, you will receive password reset instructions.",
    })

    // Clear the form
    setIdentifier("")
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className={`${nunito.className} text-2xl font-bold text-center`}>Forgot Password</CardTitle>
        <CardDescription className="text-center">
          Enter your username or email address and we'll send you password reset instructions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Username or Email Address</Label>
            <Input
              id="identifier"
              type="text"
              placeholder="Enter your username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-950 hover:bg-blue-900">
            Reset Password
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-gray-600 mt-2 w-full">
          Remember your password?{" "}
          <Link href="/login" className="text-blue-950 hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

