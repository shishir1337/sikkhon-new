"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Nunito } from "next/font/google"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/axios"
import { useAuthStore } from "@/stores/auth-store"

const nunito = Nunito({ subsets: ["latin"] })

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      })

      if (response.data.success) {
        login(response.data.data)
        toast({
          title: "Success",
          description: "You have been logged in successfully.",
        })
        router.push("/dashboard")
      } else {
        throw new Error(response.data.message || "Login failed")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="keep-signed-in"
                checked={keepSignedIn}
                onCheckedChange={(checked) => setKeepSignedIn(checked === true)}
                disabled={isLoading}
              />
              <label
                htmlFor="keep-signed-in"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me signed in
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-blue-950 hover:underline">
              Forgot?
            </Link>
          </div>
          <Button type="submit" className="w-full bg-blue-950 hover:bg-blue-900" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
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

