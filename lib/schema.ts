export function getHouseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "House",
    name: "Maison Élégante",
    description: "A boutique rental home where 19th-century charm meets 1970s Italian modernism.",
    url: "https://maison-elegante.vercel.app",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Historic Avenue",
      addressLocality: "New Orleans",
      addressRegion: "LA",
      postalCode: "70116",
      addressCountry: "US",
    },
    telephone: "+15045551234",
    image: [
      "https://maison-elegante.vercel.app/images/exterior.jpg",
      "https://maison-elegante.vercel.app/images/living-room.jpg",
      "https://maison-elegante.vercel.app/images/bedroom.jpg",
    ],
    numberOfRooms: 3,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Rooftop Terrace",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Private Courtyard",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Gourmet Kitchen",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Library",
        value: true,
      },
    ],
    priceRange: "$$$",
    petsAllowed: false,
    maximumAttendeeCapacity: 8,
  }
}
