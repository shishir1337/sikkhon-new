"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { MiniCart } from "@/components/mini-cart"
import { Nunito } from "next/font/google"

const nunito = Nunito({ subsets: ["latin"] })

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white shadow-subtle",
        isScrolled ? "bg-white shadow-subtle" : "bg-white/0",
      )}
    >
      <div className="max-w-[1230px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Mobile: Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input type="search" placeholder="Search courses..." className="w-full pl-9 rounded-full" />
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className={`text-sm font-bold hover:text-brand-blue transition-colors cursor-pointer ${nunito.className}`}
                  >
                    Home
                  </Link>
                  <div className="space-y-3">
                    <h4 className={`text-sm font-bold ${nunito.className}`}>Courses</h4>
                    <Link
                      href="/courses/free"
                      className={`block text-sm text-muted-foreground hover:text-brand-blue transition-colors cursor-pointer ${nunito.className}`}
                    >
                      Free Courses
                    </Link>
                    <Link
                      href="/courses/paid"
                      className={`block text-sm text-muted-foreground hover:text-brand-blue transition-colors cursor-pointer ${nunito.className}`}
                    >
                      Paid Courses
                    </Link>
                  </div>
                  <Link
                    href="/blog"
                    className={`text-sm font-bold hover:text-brand-blue transition-colors cursor-pointer ${nunito.className}`}
                  >
                    Blog
                  </Link>
                  <Button
                    className="rounded-full bg-brand-blue hover:bg-brand-blue-600 transition-colors duration-300 mt-4"
                    asChild
                  >
                    <Link href="/login">Login / Register</Link>
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Sikkhon Logo"
                width={120}
                height={29}
                className="h-8 w-auto sm:h-8 transition-transform duration-300 ease-in-out"
                priority
              />
            </Link>
          </div>

          {/* Center content: Search Bar and Navigation (Desktop only) */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-4">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-full pl-9 rounded-full bg-muted/30 focus:bg-background transition-colors duration-300"
              />
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "cursor-pointer",
                        nunito.className,
                        "text-[16.5px] font-bold",
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(nunito.className, "text-[16.5px] font-bold")}>
                    Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {[
                        {
                          title: "Free Courses",
                          href: "/courses/free",
                          description: "Start learning with our free courses",
                        },
                        {
                          title: "Paid Courses",
                          href: "/courses/paid",
                          description: "Premium courses with in-depth content",
                        },
                      ].map((item) => (
                        <ListItem key={item.title} title={item.title} href={item.href}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "cursor-pointer",
                        nunito.className,
                        "text-[16.5px] font-bold",
                      )}
                    >
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right content: Cart and Login/Register */}
          <div className="flex items-center space-x-4">
            <MiniCart />

            {/* Login/Register Button (Desktop only) */}
            <Button
              className="rounded-full bg-brand-blue hover:bg-brand-blue-600 transition-colors duration-300 hidden md:inline-flex"
              asChild
            >
              <Link href="/login">Login / Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
              className,
              nunito.className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

export default Header

