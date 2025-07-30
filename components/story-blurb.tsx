import Image from "next/image"

export default function StoryBlurb() {
  return (
    <section id="story" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-dark">About Chateau Chloe</h2>
            <p className="text-darkgray mb-6 leading-relaxed">
              Welcome to Chateau Chloe, a New Orleans-inspired haven designed for creators, storytellers, and
              visionaries. This custom-built retreat in East Austin, just minutes from downtown and Town Lake, offers a
              one-of-a-kind backdrop for your creative projects and special events.
            </p>
            <p className="text-darkgray mb-6 leading-relaxed">
              With 2,800 square feet of space and capacity for up to 150 people, Chateau Chloe combines the vibrant
              energy of East Austin with the distinctive charm of New Orleans. The property features striking
              black-framed windows, a beautiful swimming pool, and stylish yellow accents throughout.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-1 bg-accent"></div>
              <p className="text-secondary italic font-medium">Hosted by Chloe C.</p>
            </div>
          </div>
          <div className="order-1 md:order-2 relative hover-border">
            <Image
              src="/chateau-chloe-exterior-side.jpg"
              alt="Chateau Chloe exterior view"
              width={600}
              height={800}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
            <div className="absolute bottom-6 right-6 bg-accent/90 text-white p-4 rounded shadow-lg max-w-xs">
              <p className="font-playfair text-lg">"A perfect blend of old-world charm and contemporary luxury."</p>
              <p className="text-sm mt-2">— Architectural Digest</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
