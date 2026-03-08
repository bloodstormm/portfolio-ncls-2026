"use client";

import { motion } from "framer-motion";
import { BsPlus, BsSave, BsX, BsGripVertical } from "react-icons/bs";
import Image from "next/image";
import { RichTextEditor } from "@/app/components/RichTextEditor";
import { ImageUpload } from "@/app/components/ImageUpload";
import type { ProjectFormData } from "@/app/hooks/useProjectForm";
import type { Project } from "@/app/types/projects";

const inputClass =
  "w-full px-4 py-3 bg-background border border-beige/30 rounded-xl text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all duration-300";

const fieldLabel = (text: string) => (
  <span className="text-xs uppercase tracking-widest text-muted font-medium">{text}</span>
);

const ease = [0.16, 1, 0.3, 1] as const;

interface ProjectFormFieldsProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  coverPreview: string;
  imagesPreview: string[];
  tagInput: string;
  setTagInput: (v: string) => void;
  loading: boolean;
  editingProject: Project | null;
  dragIndexRef: React.MutableRefObject<number | null>;
  onCoverSelected: (files: File[]) => void;
  onRemoveCover: () => void;
  onAdditionalSelected: (files: File[]) => void;
  onRemoveAdditionalImage: (index: number) => void;
  onReorderImages: (from: number, to: number) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function ProjectFormFields({
  formData, setFormData, coverPreview, imagesPreview,
  tagInput, setTagInput, loading, editingProject, dragIndexRef,
  onCoverSelected, onRemoveCover, onAdditionalSelected,
  onRemoveAdditionalImage, onReorderImages,
  onAddTag, onRemoveTag, onSubmit, onCancel,
}: ProjectFormFieldsProps) {
  return (
    <section className="container mx-auto px-6 py-14 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease }}
        className="space-y-3 mb-12"
      >
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          {editingProject ? "Editar" : "Novo"}
        </span>
        <h1 className="font-Wulkan text-5xl uppercase leading-none">
          {editingProject ? editingProject.title : "Projeto"}
        </h1>
        <div className="w-full h-px bg-beige/30 mt-6" />
      </motion.div>

      <form onSubmit={onSubmit}>
        <div className="space-y-10">

          {/* Título + Categoria */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="grid md:grid-cols-[1fr_200px] gap-6"
          >
            <div className="space-y-2">
              {fieldLabel("Título *")}
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className={inputClass}
                placeholder="Nome do projeto"
                required
              />
            </div>
            <div className="space-y-2">
              {fieldLabel("Categoria")}
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as ProjectFormData["category"] }))}
                className={inputClass}
              >
                <option value="">—</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="design">UI/UX Design</option>
                <option value="fullstack">Full Stack</option>
              </select>
            </div>
          </motion.div>

          {/* Imagem de Capa */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="space-y-3"
          >
            {fieldLabel(`Imagem de Capa${!editingProject ? " *" : ""}`)}
            <ImageUpload
              onImagesSelected={onCoverSelected}
              currentImages={coverPreview ? [coverPreview] : []}
              onRemoveImage={onRemoveCover}
              isUploading={loading}
              multiple={false}
              label=""
            />
          </motion.div>

          {/* Galeria */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              {fieldLabel("Galeria de imagens")}
              <span className="text-xs text-muted font-mono">{imagesPreview.length}/10</span>
            </div>

            {imagesPreview.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {imagesPreview.map((src, index) => (
                  <div
                    key={src}
                    draggable
                    onDragStart={() => { dragIndexRef.current = index; }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragIndexRef.current !== null) {
                        onReorderImages(dragIndexRef.current, index);
                        dragIndexRef.current = null;
                      }
                    }}
                    onDragEnd={() => { dragIndexRef.current = null; }}
                    className="relative group rounded-xl overflow-hidden border border-beige/20 hover:border-primary/30 transition-all duration-200 cursor-grab active:cursor-grabbing"
                    style={{ aspectRatio: "4/3" }}
                  >
                    {src.startsWith("blob:") || src.startsWith("data:") ? (
                      <img src={src} alt={`Imagem ${index + 1}`} className="w-full h-full object-cover pointer-events-none" />
                    ) : (
                      <Image src={src} alt={`Imagem ${index + 1}`} fill className="object-cover pointer-events-none" />
                    )}
                    <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white text-[10px] font-medium">
                      {index + 1}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <BsGripVertical className="h-5 w-5 text-white drop-shadow" />
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveAdditionalImage(index)}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 hover:bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <BsX className="h-3.5 w-3.5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <ImageUpload
              onImagesSelected={onAdditionalSelected}
              currentImages={[]}
              onRemoveImage={() => {}}
              isUploading={loading}
              multiple={true}
              maxImages={10 - imagesPreview.length}
              label=""
            />
            {imagesPreview.length > 1 && (
              <p className="text-xs text-muted/60">Arraste para reordenar.</p>
            )}
          </motion.div>

          {/* Descrição */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="space-y-3"
          >
            {fieldLabel("Descrição *")}
            <RichTextEditor
              content={formData.description}
              onChange={(content) => setFormData((prev) => ({ ...prev, description: content }))}
              placeholder="Descreva o projeto, tecnologias, desafios e resultados..."
            />
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="space-y-3"
          >
            {fieldLabel("Tags / Tecnologias")}
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddTag())}
                className={inputClass}
                placeholder="React, Next.js, Figma..."
              />
              <button
                type="button"
                onClick={onAddTag}
                className="shrink-0 w-11 h-11 flex items-center justify-center border border-beige/30 text-muted hover:text-primary hover:border-primary/40 rounded-xl transition-all duration-300"
              >
                <BsPlus className="h-5 w-5" />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/8 text-primary border border-primary/20 rounded-full text-xs">
                    {tag}
                    <button type="button" onClick={() => onRemoveTag(tag)} className="text-primary/50 hover:text-red-500 transition-colors">×</button>
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* URLs */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              {fieldLabel("URL da Demo")}
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, demoUrl: e.target.value }))}
                className={inputClass}
                placeholder="https://meu-projeto.com"
              />
            </div>
            <div className="space-y-2">
              {fieldLabel("URL do Repositório")}
              <input
                type="url"
                value={formData.repositoryUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, repositoryUrl: e.target.value }))}
                className={inputClass}
                placeholder="https://github.com/usuario/projeto"
              />
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="flex items-center justify-between pt-4 border-t border-beige/20"
          >
            <button
              type="button"
              onClick={onCancel}
              className="text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-primary text-white rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-all duration-300 hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {editingProject ? "Salvando..." : "Criando..."}
                </>
              ) : (
                <>
                  <BsSave className="h-4 w-4" />
                  {editingProject ? "Salvar alterações" : "Criar projeto"}
                </>
              )}
            </button>
          </motion.div>

        </div>
      </form>
    </section>
  );
}
