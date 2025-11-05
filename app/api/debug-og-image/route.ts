import { NextResponse } from 'next/server';
import { getOgImageUrl } from '@/lib/blob';

/**
 * Ruta de API para debugging - muestra la URL de la imagen OG
 * Accede desde: /api/debug-og-image
 */
export async function GET() {
  try {
    const ogImageUrl = await getOgImageUrl('ainponce');
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ainponce.com';
    const fallbackUrl = `${siteUrl}/og-image.png`;
    const finalUrl = ogImageUrl || fallbackUrl;

    return NextResponse.json({
      success: true,
      blobUrl: ogImageUrl,
      fallbackUrl,
      finalUrl,
      envUrl: process.env.NEXT_PUBLIC_OG_IMAGE_URL || 'No configurada',
      hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    );
  }
}

