"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Nunito } from "next/font/google"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const nunito = Nunito({ subsets: ["latin"] })

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log("Login attempt", { email, password, keepSignedIn })
    // For now, we'll just redirect to the home page
    router.push("/")
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className={`${nunito.className} text-2xl font-bold text-center`}>Hi, Welcome back!</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Username or Email Address</Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="keep-signed-in" checked={keepSignedIn} onCheckedChange={(checked) => setKeepSignedIn(checked === true)} />
              <label
                htmlFor="keep-signed-in"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me signed in
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-blue-950 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className="w-full bg-blue-950 hover:bg-blue-900">
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-gray-600 mt-2 w-full">
          Don&apos;t have an account?{" "}
          <Link href="/student-registration" className="text-blue-950 hover:underline font-semibold">
            Register Now
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

