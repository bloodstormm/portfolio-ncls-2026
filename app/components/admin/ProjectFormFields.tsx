"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, GripVertical, Plus, Save, X } from "lucide-react";
import { RichTextEditor } from "@/app/components/RichTextEditor";
import { ImageUpload } from "@/app/components/ImageUpload";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import type { ProjectFormData } from "@/app/hooks/useProjectForm";
import type { Project } from "@/app/types/projects";

const ease = [0.16, 1, 0.3, 1] as const;

const inputClass =
  "h-11 w-full rounded-xl border border-input bg-background/40 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-[3px] focus:ring-ring/25";

function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="flex items-baseline justify-between gap-3 text-sm font-medium">
        {label}
        {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <span className="relative block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, "appearance-none pr-10")}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </span>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border p-5">
      <h2 className="mb-4 font-Wulkan text-2xl leading-none">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

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
  onContentImageUpload: (file: File) => Promise<string>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function ProjectFormFields({
  formData, setFormData, coverPreview, imagesPreview,
  tagInput, setTagInput, loading, editingProject, dragIndexRef,
  onCoverSelected, onRemoveCover, onAdditionalSelected,
  onRemoveAdditionalImage, onReorderImages,
  onAddTag, onRemoveTag, onContentImageUpload, onSubmit, onCancel,
}: ProjectFormFieldsProps) {
  const isCaseStudy = formData.type === "case_study";
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [dragOver, setDragOver] = useState<number | null>(null);
  const set = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="container mx-auto px-6 pt-12 md:pt-16 lg:px-8">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="mb-10 border-b border-border pb-8 md:mb-12"
      >
        <p className="text-sm font-medium text-primary md:text-base">
          {editingProject ? "Editando" : "Novo projeto"}
          {isCaseStudy && <span className="text-muted-foreground"> · Estudo de caso</span>}
        </p>
        <h1 className="mt-3 font-Wulkan text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-[-0.02em] text-balance md:mt-4">
          {formData.title.trim() || "Sem título ainda"}
        </h1>
      </motion.div>

      <form onSubmit={onSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_24rem]"
        >
          {/* Main column: what the reader sees */}
          <div className="min-w-0 space-y-10">
            <Field label="Título">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => set("title", e.target.value)}
                className={cn(inputClass, "h-14 font-Wulkan text-2xl")}
                placeholder="Nome do projeto"
                required
              />
            </Field>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-medium">Descrição</span>
                <div role="tablist" aria-label="Idioma da descrição" className="flex gap-1.5">
                  {(["pt", "en"] as const).map((code) => {
                    const empty =
                      !(code === "pt" ? formData.description : formData.description_en)
                        .replace(/<[^>]*>/g, "")
                        .trim();
                    return (
                      <Button
                        key={code}
                        type="button"
                        role="tab"
                        aria-selected={lang === code}
                        variant={lang === code ? "default" : "outline"}
                        onClick={() => setLang(code)}
                        className="h-9 rounded-full px-4"
                      >
                        {code === "pt" ? "Português" : "English"}
                        {empty && (
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              lang === code ? "bg-primary-foreground/70" : "bg-muted-foreground/50"
                            )}
                            title="Vazio"
                          />
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>
              {isCaseStudy && (
                <p className="text-sm text-muted-foreground">
                  Escreva como um post: H2 e H3 separam as seções e as imagens entram no meio do texto.
                </p>
              )}
              {/* Both editors stay mounted so switching tabs keeps cursor and history */}
              <div className={lang === "pt" ? "block" : "hidden"}>
                <RichTextEditor
                  content={formData.description}
                  onChange={(content) => set("description", content)}
                  placeholder={
                    isCaseStudy
                      ? "Contexto, o que foi feito, resultados..."
                      : "Descreva o projeto, tecnologias, desafios e resultados..."
                  }
                  onImageUpload={onContentImageUpload}
                />
              </div>
              <div className={lang === "en" ? "block" : "hidden"}>
                <RichTextEditor
                  content={formData.description_en}
                  onChange={(content) => set("description_en", content)}
                  placeholder={
                    isCaseStudy
                      ? "Context, what was done, results..."
                      : "Describe the project, technologies, challenges and results..."
                  }
                  onImageUpload={onContentImageUpload}
                />
              </div>
            </div>

            {!isCaseStudy && (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium">Galeria</span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {imagesPreview.length}/10
                    {imagesPreview.length > 1 && " · arraste para reordenar"}
                  </span>
                </div>

                {imagesPreview.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {imagesPreview.map((src, index) => (
                      <div
                        key={src}
                        draggable
                        onDragStart={() => { dragIndexRef.current = index; }}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(index); }}
                        onDragLeave={() => setDragOver(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(null);
                          if (dragIndexRef.current !== null) {
                            onReorderImages(dragIndexRef.current, index);
                            dragIndexRef.current = null;
                          }
                        }}
                        onDragEnd={() => { dragIndexRef.current = null; setDragOver(null); }}
                        className={cn(
                          "group relative aspect-[4/3] cursor-grab overflow-hidden rounded-xl border bg-secondary transition-all duration-200 active:cursor-grabbing",
                          dragOver === index ? "border-primary ring-[3px] ring-primary/30" : "border-border"
                        )}
                      >
                        {src.startsWith("blob:") || src.startsWith("data:") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={src} alt={`Imagem ${index + 1}`} className="pointer-events-none h-full w-full object-cover" />
                        ) : (
                          <Image src={src} alt={`Imagem ${index + 1}`} fill sizes="16rem" className="pointer-events-none object-cover" />
                        )}
                        <span className="absolute left-2 top-2 grid size-6 place-items-center rounded-full bg-background/90 text-[11px] font-medium tabular-nums text-foreground">
                          {index + 1}
                        </span>
                        <span className="absolute bottom-2 left-2 grid size-7 place-items-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <GripVertical className="size-4" />
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveAdditionalImage(index)}
                          aria-label={`Remover imagem ${index + 1}`}
                          className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-background/90 text-foreground opacity-0 transition-all duration-200 hover:bg-destructive hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {imagesPreview.length < 10 && (
                  <ImageUpload
                    onImagesSelected={onAdditionalSelected}
                    currentImages={[]}
                    isUploading={loading}
                    multiple
                    maxImages={10 - imagesPreview.length}
                  />
                )}
              </div>
            )}
          </div>

          {/* Sidebar: settings */}
          <aside className="space-y-5 lg:self-start">
            <Panel title="Detalhes">
              <Field label="Tipo">
                <Select value={formData.type} onChange={(v) => set("type", v as ProjectFormData["type"])}>
                  <option value="project">Projeto</option>
                  <option value="case_study">Estudo de caso</option>
                </Select>
              </Field>
              <Field label="Disciplina">
                <Select
                  value={formData.discipline}
                  onChange={(v) => set("discipline", v as ProjectFormData["discipline"])}
                >
                  <option value="development">Desenvolvimento</option>
                  <option value="design">Design</option>
                  <option value="both">Design e código</option>
                </Select>
              </Field>
              {!isCaseStudy && (
                <Field label="Categoria">
                  <Select
                    value={formData.category}
                    onChange={(v) => set("category", v as ProjectFormData["category"])}
                  >
                    <option value="">Nenhuma</option>
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="design">UI/UX</option>
                    <option value="fullstack">Full stack</option>
                  </Select>
                </Field>
              )}
            </Panel>

            <Panel title="Capa">
              <ImageUpload
                onImagesSelected={onCoverSelected}
                currentImages={coverPreview ? [coverPreview] : []}
                onRemoveImage={onRemoveCover}
                isUploading={loading}
                multiple={false}
              />
            </Panel>

            {!isCaseStudy && (
              <Panel title="Tags">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddTag())}
                    className={inputClass}
                    placeholder="React, Figma..."
                    aria-label="Nova tag"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={onAddTag}
                    aria-label="Adicionar tag"
                    className="size-11 shrink-0 rounded-xl"
                  >
                    <Plus />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary py-1 pl-3 pr-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => onRemoveTag(tag)}
                          aria-label={`Remover ${tag}`}
                          className="grid size-5 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive hover:text-white"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </Panel>
            )}

            {!isCaseStudy && (
              <Panel title="Links">
                <Field label="Demo">
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => set("demoUrl", e.target.value)}
                    className={inputClass}
                    placeholder="https://"
                  />
                </Field>
                <Field label="Repositório">
                  <input
                    type="url"
                    value={formData.repositoryUrl}
                    onChange={(e) => set("repositoryUrl", e.target.value)}
                    className={inputClass}
                    placeholder="https://github.com/..."
                  />
                </Field>
              </Panel>
            )}
          </aside>
        </motion.div>

        {/* Save bar */}
        <div className="sticky bottom-0 z-20 -mx-6 mt-12 border-t border-border bg-background/85 px-6 py-4 backdrop-blur-md lg:-mx-8 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Button type="button" variant="ghost" onClick={onCancel} className="h-11 rounded-full px-5">
              Cancelar
            </Button>
            <Button type="submit" size="pill" disabled={loading}>
              {loading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  {editingProject ? "Salvando..." : "Criando..."}
                </>
              ) : (
                <>
                  <Save />
                  {editingProject ? "Salvar alterações" : "Criar projeto"}
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
