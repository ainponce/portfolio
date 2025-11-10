import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ainponce.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ain Ponce',
  icons: {
    icon: '/favicon-96x96.png',
  },
  openGraph: {
    title: 'Ain Ponce',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Ain Ponce Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ain Ponce',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Ain Ponce Portfolio',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
