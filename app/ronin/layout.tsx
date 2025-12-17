import type React from "react"
import type { Metadata, Viewport } from "next"

const RONIN_RED = "#B91C1C"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ainponce.com"

export const metadata: Metadata = {
  title: "The Way of The Ronin | Ain Moises Ponce",
  description: "My story and journey as a Product Engineer",
  openGraph: {
    title: "The Way of The Ronin | Ain Moises Ponce",
    description: "My story and journey as a Product Engineer",
    images: [
      {
        url: `${BASE_URL}/images/ronin-opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "The Way of The Ronin - Ain Moises Ponce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ainponce",
    site: "@ainponce",
    title: "The Way of The Ronin | Ain Moises Ponce",
    description: "My story and journey as a Product Engineer",
    images: [`${BASE_URL}/images/ronin-opengraph-image.png`],
  },
}

export const viewport: Viewport = {
  themeColor: RONIN_RED,
  viewportFit: "cover",
}

export default function RoninLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: RONIN_RED,
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/* Script to set background color immediately before React hydrates */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.style.backgroundColor = "${RONIN_RED}";
            document.body.style.backgroundColor = "${RONIN_RED}";
          `,
        }}
      />
      {children}
    </div>
  )
}
