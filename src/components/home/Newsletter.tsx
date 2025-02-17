import { Nunito } from "next/font/google";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const nunito = Nunito({ subsets: ["latin"] });

export default function Newsletter() {
  return (
    <section className="bg-[#F6F1ED] py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side */}
          <div className="md:w-1/2 text-center">
            <p
              className={`${nunito.className} text-blue-950 text-sm font-semibold uppercase mb-4`}
            >
              Join other Students
            </p>
            <h2 className={`${nunito.className} text-4xl font-extrabold mb-4`}>
              Get offers/Discounts
            </h2>
            <p className="text-gray-600">
              Subscribe our newsletter & get latest news and update!
            </p>
          </div>

          {/* Right side - Form */}
          <div className="md:w-1/2">
            <form className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className="w-full bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    className="w-full bg-white"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full bg-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Receive offers and promotions from Sikkhon.com by email. You
                  can unsubscribe whenever you want by contacting us.
                </label>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-950 hover:bg-blue-900"
              >
                <Mail className="mr-2 h-4 w-4" /> Subscribe to Offers/ Bonus/
                Promotions
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
