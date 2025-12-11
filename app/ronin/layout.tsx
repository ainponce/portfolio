import type React from "react"
import type { Metadata, Viewport } from "next"

const RONIN_RED = "#B91C1C"

export const metadata: Metadata = {
  title: "The Way of The Ronin | Ain Moises Ponce",
  description: "My story and journey as a Product Engineer",
  openGraph: {
    title: "The Way of The Ronin | Ain Moises Ponce",
    description: "My story and journey as a Product Engineer",
    images: [
      {
        url: "/images/ronin-opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Way of The Ronin - Ain Moises Ponce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Way of The Ronin | Ain Moises Ponce",
    description: "My story and journey as a Product Engineer",
    images: ["/images/ronin-opengraph-image.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: RONIN_RED,
}

export default function RoninLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: RONIN_RED }}>
      {children}
    </div>
  )
}
