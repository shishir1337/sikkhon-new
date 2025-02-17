import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube } from "lucide-react"
import { Nunito } from "next/font/google"

const nunito = Nunito({ subsets: ["latin"] })

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Information Column */}
          <div className="text-center md:text-left">
            <h3 className={`text-xl font-extrabold mb-4 ${nunito.className}`}>Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="hover:text-gray-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-gray-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-gray-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-returns" className="hover:text-gray-300 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-gray-300 transition-colors">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-gray-300 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Platform Column */}
          <div className="text-center md:text-left">
            <h3 className={`text-xl font-extrabold mb-4 ${nunito.className}`}>Payment Platform</h3>
            <div className="bg-transparent rounded-lg inline-block">
              <Image
                src="https://media.dizishore.com/sikkhon.com/2024/07/paypal-secured-icon-300x114.png.webp"
                alt="Secured by PayPal"
                width={172}
                height={65}
                className="w-[172px] h-[65px]"
              />
            </div>
          </div>

          {/* Address Column */}
          <div className="text-center md:text-left">
            <h3 className={`text-xl font-extrabold mb-4 ${nunito.className}`}>Address</h3>
            <div className="space-y-2">
              <p>Rize Capital Ltd</p>
              <p>Registered in England and Wales.</p>
              <p>Registration # 12039916</p>
              <p>53 Rodney Crescent, Filton,</p>
              <p>Bristol BS34 7AF</p>
              <p>United Kingdom</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-center">
              Copyright © 2019 – 2025{" "}
              <Link href="https://rizecap.com" className="text-white hover:text-gray-300 transition-colors">
                Rize Capital Ltd
              </Link>
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.facebook.com/sikkhon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.youtube.com/sikkhon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

