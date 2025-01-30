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

const nunito = Nunito({ subsets: ["latin"] })

export default function InstructorRegistrationForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to our policies to register.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically handle the registration logic
    console.log("Instructor Registration attempt", { firstName, lastName, username, email, password })

    // For now, we'll just show a success message and redirect to the login page
    toast({
      title: "Registration Successful",
      description:
        "Welcome to Sikkhon! Your instructor account is pending approval. You can now log in to your account.",
    })
    router.push("/login")
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className={`${nunito.className} text-2xl font-bold text-center`}>
          Create an Instructor Account
        </CardTitle>
        <CardDescription className="text-center">Enter your details to register as an instructor</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
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
              onChange={(e) => {
                setPassword(e.target.value)
                setPasswordError("")
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setPasswordError("")
              }}
              required
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked === true)} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              By signing up, I agree with the website's{" "}
              <Link href="/terms-conditions" className="text-sm/5 text-blue-950 hover:underline">
                Terms and Conditions
              </Link>
              ,{" "}
              <Link href="/privacy-policy" className="text-sm/5 text-blue-950 hover:underline">
                Privacy Policy
              </Link>
              ,{" "}
              <Link href="/refund-returns" className="text-sm/5 text-blue-950 hover:underline">
                Refund Policy
              </Link>
              , and{" "}
              <Link href="/cookies" className="text-sm/5 text-blue-950 hover:underline">
                Cookies Policy
              </Link>
              .
            </label>
          </div>
          <Button type="submit" className="w-full bg-blue-950 hover:bg-blue-900">
            Register as Instructor
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-gray-600 mt-2 w-full">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-950 hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

