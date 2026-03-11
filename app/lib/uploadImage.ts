export async function uploadImageViaApi(file: File, path: string, adminToken: string): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("path", path);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "x-admin-token": adminToken },
    body: form,
  });

  if (!res.ok) throw new Error("Falha no upload da imagem");
  const { url } = await res.json();
  return url;
}

export async function uploadMultipleImagesViaApi(files: File[], path: string, adminToken: string): Promise<string[]> {
  return Promise.all(files.map((file) => uploadImageViaApi(file, path, adminToken)));
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