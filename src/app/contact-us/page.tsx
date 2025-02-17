import type { Metadata } from "next"
import ContactForm from "@/components/ContactForm"
import { Nunito } from "next/font/google"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Contact Us | Sikkhon",
  description: "Get in touch with Sikkhon's support team for any queries or assistance.",
}

export default function ContactUsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Title Section */}
      <div className="bg-blue-950 py-12">
        <div className="container mx-auto px-4">
          <h1 className={`${nunito.className} text-4xl font-extrabold text-white text-center mb-4`}>Contact Us</h1>
          <p className="text-white text-center max-w-3xl mx-auto">
            You can contact Sikkhon Support Team any time regarding various reasons by clicking <b>'Contact Support'</b>{" "}
            button or by{" "}
            <a href="https://support.sikkhon.com/support/home" className="underline font-semibold">
              clicking here
            </a>{" "}
            and we will provide you personalized response by end of next working day or sooner. For technical support,
            you can post your topic and we will provide you customized replies to your issue in our support forum.
            Please post your issue in our support forum by{" "}
            <a href="https://support.sikkhon.com/support/discussions" className="underline font-semibold">
              clicking here.
            </a>{" "}
            You may also reply to existing topics or find related topics to your issue which may be already resolved or
            discussed.
          </p>
        </div>
      </div>

      {/* Contact Information and Form Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Contact Information */}
            <div className="md:w-1/3 bg-blue-950 text-white p-8">
              <h2 className={`${nunito.className} text-3xl font-bold mb-6`}>Let's Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className={`${nunito.className} text-xl font-semibold mb-2`}>Email Address:</h3>
                  <p className="text-lg">support@sikkhon.com</p>
                </div>
                <div>
                  <h3 className={`${nunito.className} text-xl font-semibold mb-2`}>Address:</h3>
                  <p className="text-lg">53 Rodney Crescent, Filton, Bristol BS34 7AF, United Kingdom</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:w-2/3 p-8">
              <h2 className={`${nunito.className} text-3xl font-bold text-blue-950 mb-6`}>Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

