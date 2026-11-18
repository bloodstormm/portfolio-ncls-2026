"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ImagePlus, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/app/lib/utils";
import { validateImageFile, validateMultipleImages } from "../../lib/uploadImage";

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  maxImages?: number;
  currentImages?: string[];
  onRemoveImage?: (index: number) => void;
  isUploading?: boolean;
  multiple?: boolean;
  label?: string;
  className?: string;
}

function Preview({ src, alt }: { src: string; alt: string }) {
  return src.startsWith("blob:") || src.startsWith("data:") ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
  ) : (
    <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 22rem, 100vw" className="object-cover" />
  );
}

export function ImageUpload({
  onImagesSelected,
  maxImages = 10,
  currentImages = [],
  onRemoveImage,
  isUploading = false,
  multiple = true,
  label,
  className,
}: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      if (!multiple && acceptedFiles.length > 1) acceptedFiles = [acceptedFiles[0]];

      if (multiple) {
        const validation = validateMultipleImages(acceptedFiles);
        if (!validation.valid) {
          validation.errors.forEach((error) => toast.error(error));
          return;
        }
      } else {
        const validation = validateImageFile(acceptedFiles[0]);
        if (!validation.valid) {
          toast.error(validation.error);
          return;
        }
      }

      onImagesSelected(acceptedFiles);
    },
    [onImagesSelected, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple,
    disabled: isUploading,
  });

  // Single image already chosen: the preview itself is the drop target, so it can be replaced.
  if (!multiple && currentImages.length > 0) {
    return (
      <div className={cn("space-y-2", className)}>
        {label && <span className="block text-sm font-medium">{label}</span>}
        <div
          {...getRootProps()}
          className={cn(
            "group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-border bg-secondary outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
            isDragActive && "ring-[3px] ring-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <Preview src={currentImages[0]} alt="Capa" />
          <div className="absolute inset-0 flex items-center justify-center bg-espresso/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground">
              <RefreshCw className="size-4" />
              Trocar imagem
            </span>
          </div>
          {isUploading && (
            <div className="absolute inset-0 grid place-items-center bg-espresso/55">
              <span className="size-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            </div>
          )}
          {onRemoveImage && !isUploading && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemoveImage(0);
              }}
              aria-label="Remover imagem"
              className="absolute right-2 top-2 z-10 grid size-8 place-items-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors duration-200 hover:bg-destructive hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  const canAddMore = multiple ? currentImages.length < maxImages : true;

  return (
    <div className={cn("space-y-3", className)}>
      {label && <span className="block text-sm font-medium">{label}</span>}

      {canAddMore && (
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-8 text-center outline-none transition-colors duration-300 focus-visible:ring-[3px] focus-visible:ring-ring/40",
            !multiple && "aspect-[4/3]",
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-input hover:border-primary/60 hover:bg-secondary/40",
            isUploading && "cursor-not-allowed opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
            {isUploading ? (
              <span className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <ImagePlus className="size-5" />
            )}
          </span>
          <span>
            <span className="block text-sm font-medium">
              {isDragActive
                ? "Solte aqui"
                : multiple
                  ? "Arraste imagens ou clique para escolher"
                  : "Arraste uma imagem ou clique"}
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              JPEG, PNG ou WebP, até 5 MB
            </span>
          </span>
        </div>
      )}

      {multiple && currentImages.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {currentImages.map((imageUrl, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-secondary"
            >
              <Preview src={imageUrl} alt={`Imagem ${index + 1}`} />
              {onRemoveImage && !isUploading && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onRemoveImage(index);
                  }}
                  aria-label="Remover imagem"
                  className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-destructive hover:text-white"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
