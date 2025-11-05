import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getOgImageUrl } from '@/lib/blob'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ainponce.com'

export async function generateMetadata(): Promise<Metadata> {
  const ogImageUrl = await getOgImageUrl('ainponce') || `${siteUrl}/og-image.png`

  return {
    metadataBase: new URL(siteUrl),
    title: 'Full Stack Developer - React & Next.js | Ain Ponce',
    description: 'Portfolio de Ain Moises Ponce - Desarrollador Full Stack especializado en React, Next.js, TypeScript y tecnologías web modernas.',
    keywords: [
      'Ain Moises Ponce',
      'Full Stack Developer',
      'React Developer',
      'Next.js Developer',
      'TypeScript Developer',
      'Web Developer Portfolio',
      'Frontend Developer',
      'Backend Developer',
      'Software Engineer',
      'Buenos Aires Developer'
    ],
    icons: {
      icon: '/favicon-96x96.png',
    },
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
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: siteUrl,
      siteName: 'Ain Moises Ponce Portfolio',
      title: 'Full Stack Developer - React & Next.js | Ain Ponce',
      description: 'Portfolio de Ain Moises Ponce - Desarrollador Full Stack especializado en React, Next.js, TypeScript y tecnologías web modernas.',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Ain Moises Ponce Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Full Stack Developer - React & Next.js | Ain Ponce',
      description: 'Portfolio de Ain Moises Ponce - Desarrollador Full Stack especializado en React, Next.js, TypeScript y tecnologías web modernas.',
      images: [ogImageUrl],
    },
    alternates: {
      canonical: siteUrl,
    },
  }
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
