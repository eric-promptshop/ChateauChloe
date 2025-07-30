"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Update the spaces with actual property information
const spaces = [
  {
    id: "exterior",
    name: "Exterior & Pool",
    description:
      "The striking white exterior with black-framed windows creates a modern yet timeless aesthetic. The centerpiece of the outdoor space is a beautiful swimming pool, perfect for events or photoshoots. Yellow lounge chairs and umbrellas add vibrant pops of color to the sophisticated setting.",
    amenities: [
      "Swimming pool",
      "Outdoor lounge areas",
      "Yellow pool floats",
      "Patio seating",
      "Stylish yellow umbrellas",
    ],
    image: "/chateau-chloe-pool-area.jpg",
  },
  {
    id: "interior",
    name: "Interior Spaces",
    description:
      "The interior of Chateau Chloe continues the New Orleans-inspired theme with thoughtful design elements and creative spaces. High ceilings, abundant natural light, and carefully curated furnishings create an atmosphere that's both inspiring and comfortable.",
    amenities: [
      "2,800 square feet of space",
      "New Orleans-inspired decor",
      "Creative workspaces",
      "Gathering areas",
      "Stylish furnishings",
    ],
    image: "/chateau-chloe-interior.jpg",
  },
  {
    id: "events",
    name: "Event Spaces",
    description:
      "Chateau Chloe is designed to accommodate a variety of events, from intimate gatherings to larger productions. With capacity for up to 150 people, the versatile spaces can be configured to suit your specific needs, whether you're hosting a photoshoot, filming a production, or organizing a special celebration.",
    amenities: [
      "Capacity for 150 people",
      "Versatile layout",
      "Indoor and outdoor options",
      "Natural lighting",
      "Unique backdrop settings",
    ],
    image: "/chateau-chloe-event-space.jpg",
  },
  {
    id: "location",
    name: "Location",
    description:
      "Located in the vibrant East Cesar Chavez neighborhood of East Austin, Chateau Chloe offers the perfect balance of accessibility and escape. Just minutes from downtown Austin and Town Lake, you'll enjoy proximity to the city's best offerings while having a private retreat for your creative endeavors.",
    amenities: [
      "East Austin location",
      "Minutes from downtown",
      "Near Town Lake",
      "East Cesar Chavez neighborhood",
      "Easy access to local attractions",
    ],
    image: "/chateau-chloe-neighborhood.jpg",
  },
]

export default function SpacesTabs() {
  const [activeTab, setActiveTab] = useState("exterior")

  return (
    <section id="spaces" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-dark">Explore Our Spaces</h2>
          <p className="text-darkgray max-w-2xl mx-auto">
            Each area of Maison Élégante has been thoughtfully designed to provide both beauty and comfort.
          </p>
        </div>

        <Tabs defaultValue="exterior" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent mb-8">
            {spaces.map((space) => (
              <TabsTrigger
                key={space.id}
                value={space.id}
                className={cn(
                  "data-[state=active]:bg-accent data-[state=active]:text-white border-2 border-transparent data-[state=active]:border-accent",
                  "text-dark hover:text-accent transition-colors py-3",
                )}
              >
                {space.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {spaces.map((space) => (
            <TabsContent key={space.id} value={space.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="hover-border rounded-lg overflow-hidden">
                  <Image
                    src={space.image || "/placeholder.svg"}
                    alt={space.name}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-dark">{space.name}</h3>
                  <p className="text-darkgray mb-6 leading-relaxed">{space.description}</p>
                  <div>
                    <h4 className="font-bold text-secondary mb-3">Amenities:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {space.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
