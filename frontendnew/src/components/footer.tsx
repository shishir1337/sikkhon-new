import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Information Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-gray-300 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies-policy" className="hover:text-gray-300 transition-colors">
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
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Platform</h3>
            <div className="bg-white p-4 rounded-lg inline-block">
              <Image
                src="https://media.dizishore.com/sikkhon.com/2024/07/paypal-secured-icon-300x114.png.webp"
                alt="Secured by PayPal"
                width={200}
                height={80}
                className="w-auto h-auto"
              />
            </div>
          </div>

          {/* Address Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <div className="space-y-2">
              <p>Sikkhon Ltd</p>
              <p>Registered in Bangladesh.</p>
              <p>Registration # 12039916</p>
              <p>53 Rodney Crescent, Filton,</p>
              <p>Dhaka 1234</p>
              <p>Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">Copyright © 2019 – {new Date().getFullYear()} Sikkhon Ltd</p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://youtube.com"
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

