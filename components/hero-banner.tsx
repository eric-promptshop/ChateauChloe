"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "/chateau-chloe-exterior.jpg",
    title: "East Austin meets New Orleans",
    subtitle: "A vibrant creative escape designed for creators, storytellers, and visionaries",
  },
  {
    id: 2,
    image: "/chateau-chloe-pool.jpg",
    title: "Custom-Built Retreat",
    subtitle: "Just minutes from downtown and Town Lake",
  },
  {
    id: 3,
    image: "/chateau-chloe-poolside.jpg",
    title: "One-of-a-Kind Backdrop",
    subtitle: "Perfect for photoshoots, events, and creative gatherings",
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const parallaxRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY
        if (scrollPosition < window.innerHeight) {
          setIsScrolling(true)
          const translateY = scrollPosition * 0.4
          parallaxRef.current.style.transform = `translateY(${translateY}px)`
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 parallax-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover parallax-image"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-dark/30" />
          </div>
        ))}
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 max-w-4xl animate-fade-in">
          {slides[currentSlide].title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-slide-up">{slides[currentSlide].subtitle}</p>
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-white border-2 border-transparent hover:border-white transition-all"
        >
          Book Now
        </Button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  )
}
