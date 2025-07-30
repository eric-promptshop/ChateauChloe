"use client"

import { useEffect, useRef, useState } from "react"
import type mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { MapPin } from "lucide-react"
import Image from "next/image"

// Points of interest data
const points = [
  {
    name: "Chateau Chloe",
    category: "home",
    coordinates: [-97.7219, 30.2672], // Approximate East Austin coordinates
    description: "Your luxury rental home",
  },
  {
    name: "Downtown Austin",
    category: "attraction",
    coordinates: [-97.7431, 30.2672],
    description: "City center",
  },
  {
    name: "Town Lake",
    category: "attraction",
    coordinates: [-97.7431, 30.2565],
    description: "Lady Bird Lake",
  },
  {
    name: "East Cesar Chavez",
    category: "neighborhood",
    coordinates: [-97.7219, 30.261],
    description: "Vibrant neighborhood",
  },
  {
    name: "East Austin Restaurants",
    category: "food",
    coordinates: [-97.73, 30.2672],
    description: "Local dining options",
  },
]

export default function NeighborhoodMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [activePoint, setActivePoint] = useState<(typeof points)[0] | null>(null)
  const [mapError, setMapError] = useState<boolean>(false)

  useEffect(() => {
    // Skip map initialization entirely - use static map instead
    setMapError(true)
    return () => {}
  }, [])

  // Static map component that doesn't use Mapbox GL
  const StaticMap = () => {
    return (
      <div className="h-[500px] rounded-lg shadow-md relative overflow-hidden">
        {/* Static map image */}
        <div className="absolute inset-0 bg-muted">
          <Image src="/static-map-austin.png" alt="Map of East Austin" fill className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
        </div>

        {/* Location information overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-bold text-dark mb-3">Chateau Chloe Location</h3>
            <p className="text-darkgray mb-4">
              Located in the vibrant East Cesar Chavez neighborhood of East Austin, just minutes from downtown and Town
              Lake.
            </p>
            <div className="grid grid-cols-1 gap-3 mt-4">
              <div className="flex items-start">
                <MapPin className="text-accent mr-2 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-bold text-dark">East Cesar Chavez</h4>
                  <p className="text-sm text-darkgray">Austin, TX</p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-2">
                <a
                  href="https://maps.google.com/?q=East+Cesar+Chavez,Austin,TX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Points of interest */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium text-dark hover:bg-accent hover:text-white transition-colors cursor-pointer"
              onClick={() => setActivePoint(point)}
            >
              {point.name}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section id="location" className="relative">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-dark">Explore the Neighborhood</h2>
        <p className="text-darkgray">
          Perfectly situated in the heart of East Austin, with easy access to downtown, Town Lake, and the best
          attractions, dining, and entertainment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {["All", "Dining", "Attractions", "Entertainment"].map((category, index) => (
          <button
            key={index}
            className="px-4 py-2 rounded-md border border-muted bg-white hover:bg-muted transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Always use the static map */}
      <StaticMap />

      {activePoint && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setActivePoint(null)}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md m-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-dark mb-2">{activePoint.name}</h3>
            <p className="text-darkgray mb-4">{activePoint.description}</p>
            <p className="text-sm text-muted-foreground mb-4">
              {activePoint.category === "home"
                ? "Your luxury rental home in East Austin"
                : `Located near Chateau Chloe in the vibrant East Austin area`}
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
                onClick={() => setActivePoint(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
