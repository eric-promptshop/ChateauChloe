"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Sophia Martinez",
    avatar: "/placeholder.svg?height=100&width=100&query=woman portrait professional",
    rating: 5,
    date: "October 2023",
    text: "Maison Élégante exceeded all our expectations. The attention to detail in the design is remarkable, and the location couldn't be more perfect. We particularly loved the rooftop terrace for evening cocktails. Will definitely be returning!",
  },
  {
    id: 2,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=100&width=100&query=man portrait professional",
    rating: 5,
    date: "September 2023",
    text: "A truly special property that combines historic charm with modern luxury. The kitchen is a chef's dream, and the beds are incredibly comfortable. The hosts were attentive and provided excellent recommendations for local restaurants.",
  },
  {
    id: 3,
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=100&width=100&query=woman portrait professional blonde",
    rating: 5,
    date: "August 2023",
    text: "We celebrated our anniversary at Maison Élégante and couldn't have chosen a better place. The ambiance is romantic and sophisticated, and every room feels like a work of art. The location allowed us to explore the city easily on foot.",
  },
  {
    id: 4,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=100&width=100&query=asian man portrait professional",
    rating: 5,
    date: "July 2023",
    text: "As an interior designer myself, I was blown away by the thoughtful curation of this space. The blend of vintage and contemporary elements is masterful. The courtyard garden became our favorite spot for morning coffee.",
  },
  {
    id: 5,
    name: "Olivia Johnson",
    avatar: "/placeholder.svg?height=100&width=100&query=black woman portrait professional",
    rating: 5,
    date: "June 2023",
    text: "From the moment we walked in, we felt at home in this extraordinary space. The library became my personal retreat, and the kitchen inspired us to cook instead of going out. Every detail has been considered for comfort and beauty.",
  },
]

export default function ReviewsStrip() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleReviews, setVisibleReviews] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateVisibleReviews = () => {
    if (window.innerWidth >= 1280) {
      setVisibleReviews(3)
    } else if (window.innerWidth >= 768) {
      setVisibleReviews(2)
    } else {
      setVisibleReviews(1)
    }
  }

  useEffect(() => {
    updateVisibleReviews()
    window.addEventListener("resize", updateVisibleReviews)
    return () => window.removeEventListener("resize", updateVisibleReviews)
  }, [])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === reviews.length - visibleReviews ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - visibleReviews : prev - 1))
  }

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-dark">Guest Experiences</h2>
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-accent fill-accent" />
            ))}
          </div>
          <p className="text-darkgray max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our guests have to say about their stays at Maison Élégante.
          </p>
        </div>

        <div className="relative">
          <div ref={containerRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleReviews)}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="px-4 flex-shrink-0" style={{ width: `${100 / visibleReviews}%` }}>
                  <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col hover-border">
                    <div className="flex items-center mb-4">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-dark">{review.name}</h3>
                        <p className="text-sm text-darkgray">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-darkgray flex-grow">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-muted text-dark p-2 rounded-full shadow-md transition-colors z-10"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-muted text-dark p-2 rounded-full shadow-md transition-colors z-10"
            aria-label="Next reviews"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(reviews.length - visibleReviews + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex ? "bg-accent scale-125" : "bg-darkgray/30"
              }`}
              aria-label={`Go to review set ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
