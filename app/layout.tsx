import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ainponce.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ain Ponce | Portfolio',
    template: '%s | Ain Ponce',
  },
  description: 'Portfolio of Ain Ponce. Creative developer and designer.',
  keywords: ['Ain Ponce', 'Portfolio', 'Developer', 'Designer', 'Web Development', 'Creative'],
  authors: [{ name: 'Ain Ponce', url: siteUrl }],
  creator: 'Ain Ponce',
  publisher: 'Ain Ponce',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon-96x96.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Ain Ponce | Portfolio',
    description: 'Portfolio of Ain Ponce. Creative developer and designer.',
    url: siteUrl,
    siteName: 'Ain Ponce Portfolio',
    locale: 'en_US',
    type: 'website',
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
    title: 'Ain Ponce | Portfolio',
    description: 'Portfolio of Ain Ponce. Creative developer and designer.',
    creator: '@ainponce',
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  )
}
