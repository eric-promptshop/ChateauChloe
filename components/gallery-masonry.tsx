"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const galleryImages = [
  {
    id: 1,
    src: "/vintage-elegant-living-room.png",
    alt: "Elegant living room with vintage furniture",
    span: 30,
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600&query=boutique hotel kitchen with marble countertops",
    alt: "Gourmet kitchen with marble countertops",
    span: 20,
  },
  {
    id: 3,
    src: "/placeholder.svg?height=800&width=600&query=luxury master bedroom with canopy bed",
    alt: "Master bedroom with canopy bed",
    span: 40,
  },
  {
    id: 4,
    src: "/placeholder.svg?height=500&width=400&query=vintage bathroom with clawfoot tub",
    alt: "Vintage bathroom with clawfoot tub",
    span: 25,
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=400&query=cozy reading nook with bookshelf",
    alt: "Cozy reading nook with bookshelf",
    span: 30,
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600&query=outdoor patio with string lights",
    alt: "Outdoor patio with string lights",
    span: 20,
  },
  {
    id: 7,
    src: "/placeholder.svg?height=700&width=500&query=dining room with chandelier",
    alt: "Dining room with chandelier",
    span: 35,
  },
  {
    id: 8,
    src: "/placeholder.svg?height=500&width=400&query=guest bedroom with vintage decor",
    alt: "Guest bedroom with vintage decor",
    span: 25,
  },
]

export default function GalleryMasonry() {
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resizeGridItems = () => {
      const grid = galleryRef.current
      if (!grid) return

      const items = grid.querySelectorAll(".masonry-item")
      items.forEach((item) => {
        const el = item as HTMLElement
        const rowHeight = 10
        const rowSpan = Math.ceil(el.querySelector("img")!.getBoundingClientRect().height / rowHeight)
        el.style.setProperty("--row-span", rowSpan.toString())
      })
    }

    // Initial resize
    setTimeout(resizeGridItems, 500)

    // Resize on window resize
    window.addEventListener("resize", resizeGridItems)

    // Resize when images load
    const images = galleryRef.current?.querySelectorAll("img")
    images?.forEach((img) => {
      if (img.complete) {
        resizeGridItems()
      } else {
        img.addEventListener("load", resizeGridItems)
      }
    })

    return () => {
      window.removeEventListener("resize", resizeGridItems)
      images?.forEach((img) => {
        img.removeEventListener("load", resizeGridItems)
      })
    }
  }, [])

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-dark">Our Gallery</h2>
          <p className="text-darkgray max-w-2xl mx-auto">
            Step inside and explore the unique spaces and thoughtful details that make Maison Élégante a truly special
            retreat.
          </p>
        </div>

        <div ref={galleryRef} className="masonry-grid">
          {galleryImages.map((image) => (
            <div key={image.id} className="masonry-item hover-border rounded-lg overflow-hidden">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
