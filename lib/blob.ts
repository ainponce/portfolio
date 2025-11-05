import { head, list } from '@vercel/blob';

/**
 * Asegura que la URL sea absoluta
 */
function ensureAbsoluteUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Si es una URL relativa, asumir que es de Vercel Blob y ya es absoluta
  return url;
}

/**
 * Obtiene la URL de la imagen OG desde Vercel Blob Storage
 * @param blobName - Nombre del blob en Vercel Blob (default: 'ainponce')
 * @returns URL del blob o null si no se encuentra
 */
export async function getOgImageUrl(blobName: string = 'ainponce'): Promise<string | null> {
  // Primero verificar si hay una variable de entorno con la URL directa
  const envUrl = process.env.NEXT_PUBLIC_OG_IMAGE_URL;
  if (envUrl) {
    return ensureAbsoluteUrl(envUrl);
  }

  // Intentar diferentes variaciones del nombre
  const possibleNames = [
    blobName,
    `${blobName}.png`,
    `${blobName}.jpg`,
    `og-image.png`,
    `og-image`,
  ];

  // Intentar con head() para cada variación
  for (const name of possibleNames) {
    try {
      const blob = await head(name);
      if (blob?.url) {
        return ensureAbsoluteUrl(blob.url);
      }
    } catch (error) {
      // Continuar con el siguiente nombre
      continue;
    }
  }

  // Si head() falla, intentar con list() para buscar el blob
  try {
    const { blobs } = await list({
      prefix: blobName,
      limit: 10,
    });
    
    if (blobs && blobs.length > 0) {
      // Buscar el blob que coincida con el nombre
      const matchingBlob = blobs.find(
        (blob) => blob.pathname.includes(blobName) || blob.pathname === blobName
      );
      if (matchingBlob?.url) {
        return ensureAbsoluteUrl(matchingBlob.url);
      }
      // Si no hay coincidencia exacta, usar el primero
      if (blobs[0]?.url) {
        return ensureAbsoluteUrl(blobs[0].url);
      }
    }
  } catch (error) {
    console.error('Error al listar blobs:', error);
  }

  return null;
}

