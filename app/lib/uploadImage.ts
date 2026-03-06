import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    // Gera um nome único para o arquivo
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const fullPath = `${path}/${fileName}`;

    // Cria a referência no Storage
    const imageRef = ref(storage, fullPath);

    // Faz o upload
    const snapshot = await uploadBytes(imageRef, file);

    // Obtém a URL pública
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw new Error("Falha no upload da imagem");
  }
}

export async function uploadMultipleImages(files: File[], path: string): Promise<string[]> {
  try {
    const uploadPromises = files.map(file => uploadImage(file, path));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Erro ao fazer upload de múltiplas imagens:", error);
    throw new Error("Falha no upload das imagens");
  }
}

// Validação de arquivos de imagem
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Arquivo muito grande. Máximo 5MB.'
    };
  }

  return { valid: true };
}

export function validateMultipleImages(files: File[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (files.length > 10) {
    errors.push('Máximo de 10 imagens permitido.');
  }

  files.forEach((file, index) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      errors.push(`Arquivo ${index + 1}: ${validation.error}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}