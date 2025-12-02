import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ain Ponce Portfolio',
    short_name: 'Ain Ponce',
    description: 'Portfolio of Ain Ponce. Creative developer and designer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#181818',
    theme_color: '#181818',
    icons: [
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
  }
}
