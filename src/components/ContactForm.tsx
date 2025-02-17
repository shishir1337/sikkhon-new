"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3"

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

function ContactFormContent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: FormData) => {
    if (!executeRecaptcha) {
      console.error("Execute recaptcha not yet available")
      return
    }

    setIsSubmitting(true)

    try {
      const token = await executeRecaptcha("contact_form")

      // Here you would typically send the form data and the reCAPTCHA token to your server
      console.log("Form data:", data)
      console.log("reCAPTCHA token:", token)

      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      })

      reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 w-full"
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="mt-1 w-full"
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
          Subject
        </Label>
        <Input
          id="subject"
          {...register("subject", { required: "Subject is required" })}
          className="mt-1 w-full"
          placeholder="What is your message about?"
        />
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message
        </Label>
        <Textarea
          id="message"
          {...register("message", { required: "Message is required" })}
          className="mt-1 w-full"
          rows={5}
          placeholder="Please provide details about your inquiry..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}

export default function ContactForm() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfM9uopAAAAANGeZIZGA7Sy1AlCVcymVa8WGQqN">
      <ContactFormContent />
    </GoogleReCaptchaProvider>
  )
}

