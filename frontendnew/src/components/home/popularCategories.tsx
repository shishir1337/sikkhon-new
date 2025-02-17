import { Nunito } from "next/font/google"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

const nunito = Nunito({ subsets: ["latin"] })

const categories = [
  { name: "JavaScript", image: "https://media.dizishore.com/sikkhon.com/2024/08/JS.png.webp" },
  { name: "Office 365", image: "https://media.dizishore.com/sikkhon.com/2024/08/office365.png.webp" },
  { name: "Illustrator", image: "https://media.dizishore.com/sikkhon.com/2024/08/illustrator.png.webp" },
  { name: "Microsoft Office", image: "https://media.dizishore.com/sikkhon.com/2024/08/office.png.webp" },
  { name: "Web Development", image: "https://media.dizishore.com/sikkhon.com/2024/08/logo-4.png.webp" },
  { name: "PHP", image: "https://media.dizishore.com/sikkhon.com/2024/08/php.png.webp" },
]

export default function PopularCategories() {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="text-center mb-12">
          <p className={`${nunito.className} text-blue-950 text-sm font-semibold uppercase mb-4`}>
            Learn At Your Own Pace
          </p>
          <h2 className={`${nunito.className} text-4xl font-extrabold mb-4`}>Popular Categories</h2>
          <p className="text-base max-w-2xl mx-auto">
            Explore all of our courses and pick your suitable ones to enroll and start learning with us! We ensure that
            you will never regret it!
          </p>
        </div>
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="max-w-5xl mx-auto"
        >
          <CarouselContent>
            {categories.map((category, index) => (
              <CarouselItem key={index} className="basis-1/5">
                <div className="p-1">
                  <Image
                    src={categories.image || "/placeholder.svg"}
                    alt={categories.title}
                    width={128}
                    height={128}
                    className="h-auto object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

