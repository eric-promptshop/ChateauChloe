import HeroBanner from "@/components/hero-banner"
import StoryBlurb from "@/components/story-blurb"
import GalleryMasonry from "@/components/gallery-masonry"
import SpacesTabs from "@/components/spaces-tabs"
import BookingWidget from "@/components/booking-widget"
import NeighborhoodMap from "@/components/neighborhood-map"
import ReviewsStrip from "@/components/reviews-strip"
import CTASection from "@/components/cta-section"
import { Suspense } from "react"
import { getHouseSchema } from "@/lib/schema"

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getHouseSchema()) }} />
      <HeroBanner />
      <StoryBlurb />
      <GalleryMasonry />
      <SpacesTabs />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-[400px] bg-muted animate-pulse rounded-lg"></div>}>
              <NeighborhoodMap />
            </Suspense>
          </div>
          <div>
            <BookingWidget />
          </div>
        </div>
      </div>
      <ReviewsStrip />
      <CTASection />
    </>
  )
}
