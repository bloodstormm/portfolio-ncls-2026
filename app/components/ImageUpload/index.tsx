"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { BsCloudUpload, BsX, BsImage } from "react-icons/bs";
import { toast } from "sonner";
import { validateImageFile, validateMultipleImages } from "../../lib/uploadImage";

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  maxImages?: number;
  currentImages?: string[];
  onRemoveImage?: (index: number) => void;
  isUploading?: boolean;
  multiple?: boolean;
  label?: string;
}

export function ImageUpload({
  onImagesSelected,
  maxImages = 10,
  currentImages = [],
  onRemoveImage,
  isUploading = false,
  multiple = true,
  label = "Imagens do Projeto"
}: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!multiple && acceptedFiles.length > 1) {
        acceptedFiles = [acceptedFiles[0]];
      }

      if (multiple) {
        const validation = validateMultipleImages(acceptedFiles);
        if (!validation.valid) {
          validation.errors.forEach(error => toast.error(error));
          return;
        }
        toast.success(`${acceptedFiles.length} imagem(ns) selecionada(s)!`);
      } else {
        const validation = validateImageFile(acceptedFiles[0]);
        if (!validation.valid) {
          toast.error(validation.error);
          return;
        }
        toast.success("Imagem selecionada com sucesso!");
      }

      onImagesSelected(acceptedFiles);
    },
    [onImagesSelected, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"]
    },
    multiple,
    disabled: isUploading
  });

  const canAddMore = multiple ? currentImages.length < maxImages : currentImages.length === 0;

  return (
    <div className="space-y-4">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-primary">
          {label}
          {multiple && (
            <span className="text-muted ml-2">
              ({currentImages.length}/{maxImages})
            </span>
          )}
        </label>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
            ${isDragActive
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-beige/40 hover:border-primary/50 hover:bg-beige/5"
            }
            ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input {...getInputProps()} />

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              {isUploading ? (
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <BsCloudUpload className="h-8 w-8 text-primary" />
              )}
            </div>

            <div>
              <p className="text-primary font-medium">
                {isDragActive ? (
                  "Solte as imagens aqui..."
                ) : (
                  <>
                    Clique ou arraste {multiple ? "imagens" : "uma imagem"} aqui
                  </>
                )}
              </p>
              <p className="text-sm text-muted mt-2">
                Suporta JPEG, PNG e WebP até 5MB cada
                {multiple && ` (máximo ${maxImages} imagens)`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Current Images Preview */}
      {currentImages.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-primary">
            {multiple ? "Imagens Selecionadas:" : "Imagem Selecionada:"}
          </p>

          <div className={`grid gap-4 ${multiple ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-1 max-w-xs"}`}>
            {currentImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-beige/10 border border-beige/20 hover:border-primary/30 transition-colors duration-200">
                  {imageUrl.startsWith("blob:") || imageUrl.startsWith("data:") ? (
                    <img
                      src={imageUrl}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={imageUrl}
                      alt={`Imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Loading Overlay */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* Remove Button */}
                  {onRemoveImage && !isUploading && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemoveImage(index);
                      }}
                      className="absolute top-1 right-1 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-red-500/30 hover:scale-110 z-10"
                      type="button"
                      title="Remover imagem"
                    >
                      <BsX className="h-4 w-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Message */}
      {!multiple && currentImages.length === 1 && (
        <p className="text-sm text-muted">
          Para alterar a imagem, selecione uma nova imagem acima.
        </p>
      )}
    </div>
  );
}