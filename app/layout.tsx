import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ainponce.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ain Ponce | Software Engineer',
  description: 'Software Engineer especializado en desarrollo de aplicaciones web escalables con React, Next.js, TypeScript y arquitecturas modernas.',
  keywords: [
    'Ain Moises Ponce',
    'Software Engineer',
    'Software Developer',
    'React Engineer',
    'Next.js Developer',
    'TypeScript Engineer',
    'Full Stack Engineer',
    'Web Development',
    'Software Architecture',
    'Buenos Aires'
  ],
  icons: {
    icon: '/favicon-96x96.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Ain Ponce - Software Engineer',
    title: 'Ain Ponce | Software Engineer',
    description: 'Software Engineer especializado en desarrollo de aplicaciones web escalables con React, Next.js, TypeScript y arquitecturas modernas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ain Ponce | Software Engineer',
    description: 'Software Engineer especializado en desarrollo de aplicaciones web escalables con React, Next.js, TypeScript y arquitecturas modernas.',
  },
  alternates: {
    canonical: siteUrl,
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
