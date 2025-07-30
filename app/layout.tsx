import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

// Update the metadata with the actual property name and location
export const metadata: Metadata = {
  title: "Chateau Chloe | East Austin meets New Orleans",
  description:
    "A vibrant creative escape in East Austin with New Orleans-inspired design, perfect for creators, storytellers, and visionaries.",
  openGraph: {
    title: "Chateau Chloe | East Austin meets New Orleans",
    description:
      "A vibrant creative escape in East Austin with New Orleans-inspired design, perfect for creators, storytellers, and visionaries.",
    url: "https://chateau-chloe.vercel.app",
    siteName: "Chateau Chloe",
    images: [
      {
        url: "/images/chateau-chloe-exterior.jpg",
        width: 1200,
        height: 630,
        alt: "Chateau Chloe - East Austin meets New Orleans",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
