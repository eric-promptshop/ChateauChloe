import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Chateau <span className="text-accent">Chloe</span>
            </h3>
            <p className="text-white/80 mb-4">
              A vibrant creative escape in East Austin with New Orleans-inspired design, perfect for creators,
              storytellers, and visionaries.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-accent transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-accent transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-accent transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Story", "Gallery", "Spaces", "Location", "Book Now"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <address className="not-italic text-white/80 space-y-2">
              <p>East Cesar Chavez</p>
              <p>Austin, TX</p>
              <p className="mt-4">
                <a href="tel:+15125551234" className="hover:text-accent transition-colors">
                  Contact via Peerspace
                </a>
              </p>
              <p>
                <a href="mailto:bookings@chateauchloe.com" className="hover:text-accent transition-colors">
                  bookings@chateauchloe.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-white/80 mb-4">
              Subscribe to receive updates, special offers, and curated local recommendations.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-darkgray border border-darkgray rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-darkgray mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Maison Élégante. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-white/60 hover:text-accent text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/60 hover:text-accent text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
