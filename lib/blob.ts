import { head } from '@vercel/blob';

/**
 * Obtiene la URL de la imagen OG desde Vercel Blob Storage
 * @param blobName - Nombre del blob en Vercel Blob (default: 'ainponce')
 * @returns URL del blob o null si no se encuentra
 */
export async function getOgImageUrl(blobName: string = 'ainponce'): Promise<string | null> {
  try {
    const blob = await head(blobName);
    return blob.url;
  } catch (error) {
    console.error('Error al obtener la URL del blob:', error);
    return null;
  }
}

