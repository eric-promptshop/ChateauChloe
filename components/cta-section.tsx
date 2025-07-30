import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/luxury-boutique-hotel-interior.png"
          alt="Maison Élégante interior"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Experience Chateau Chloe</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Book your event or creative session at Chateau Chloe today and immerse yourself in this unique East Austin
            meets New Orleans space. Perfect for creators, storytellers, and visionaries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white border-2 border-transparent hover:border-white transition-all"
            >
              Book Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              View Gallery
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
