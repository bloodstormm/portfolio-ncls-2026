"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { BsPlus, BsSave, BsArrowLeft, BsPencil, BsTrash, BsX, BsGripVertical } from "react-icons/bs";
import { toast } from "sonner";
import Image from "next/image";
import { db } from "../../lib/firebase";
import { uploadImage, uploadMultipleImages } from "../../lib/uploadImage";
import { RichTextEditor } from "../../components/RichTextEditor";
import { ImageUpload } from "../../components/ImageUpload";
import type { Project } from "@/app/types/projects";

interface ProjectFormData {
  title: string;
  description: string;
  coverUrl: string;
  images: string[];
  tags: string[];
  demoUrl: string;
  repositoryUrl: string;
  category: 'web' | 'mobile' | 'design' | 'fullstack' | '';
}

type ViewMode = 'list' | 'form';

export default function AdminProjectsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    coverUrl: "",
    images: [],
    tags: [],
    demoUrl: "",
    repositoryUrl: "",
    category: ""
  });

  // Estados para upload
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const dragIndexRef = useRef<number | null>(null);

  const reorderAdditionalImages = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const newPreviews = [...imagesPreview];
    const [movedPreview] = newPreviews.splice(fromIndex, 1);
    newPreviews.splice(toIndex, 0, movedPreview);
    setImagesPreview(newPreviews);

    // Rebuild formData.images (existing Firebase URLs) and additionalFiles (new blobs)
    // by inspecting each preview: if it starts with "blob:" it's a new file, otherwise existing URL
    const newExistingUrls: string[] = [];
    const newFileOrder: File[] = [];
    const blobToFile = new Map<string, File>();
    additionalFiles.forEach((file, i) => {
      const blobUrl = imagesPreview[imagesPreview.length - additionalFiles.length + i];
      if (blobUrl) blobToFile.set(blobUrl, file);
    });

    newPreviews.forEach((preview) => {
      if (preview.startsWith("blob:")) {
        const file = blobToFile.get(preview);
        if (file) newFileOrder.push(file);
      } else {
        newExistingUrls.push(preview);
      }
    });

    setFormData(prev => ({ ...prev, images: newExistingUrls }));
    setAdditionalFiles(newFileOrder);
  };

  // Verificar autenticação
  useEffect(() => {
    const authenticated = sessionStorage.getItem("admin_authenticated");
    if (!authenticated) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
      loadProjects();
    }
  }, [router]);

  const loadProjects = async () => {
    try {
      const snap = await getDocs(collection(db, "projects"));
      const data = snap.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...(doc.data() as Omit<Project, "id">),
          }) as Project
      );
      setProjects(data);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      toast.error("Erro ao carregar projetos");
    }
  };

  const startNewProject = () => {
    resetForm();
    setEditingProject(null);
    setViewMode('form');
  };

  const startEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      coverUrl: project.coverUrl,
      images: project.images || [],
      tags: project.tags || [],
      demoUrl: project.demoUrl || "",
      repositoryUrl: project.repositoryUrl || "",
      category: project.category || ""
    });
    setCoverPreview(project.coverUrl);
    setImagesPreview(project.images || []);
    setViewMode('form');
  };

  const deleteProject = async (project: Project) => {
    if (!confirm(`Tem certeza que deseja excluir o projeto "${project.title}"?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "projects", project.id));
      toast.success("Projeto excluído com sucesso!");
      loadProjects();
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
      toast.error("Erro ao excluir projeto");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      coverUrl: "",
      images: [],
      tags: [],
      demoUrl: "",
      repositoryUrl: "",
      category: ""
    });
    setCoverFile(null);
    setAdditionalFiles([]);
    setCoverPreview("");
    setImagesPreview([]);
    setTagInput("");
  };

  const handleCoverImageSelected = (files: File[]) => {
    const file = files[0];
    if (file) {
      setCoverFile(file);
      const preview = URL.createObjectURL(file);
      setCoverPreview(preview);
    }
  };

  const handleAdditionalImagesSelected = (files: File[]) => {
    setAdditionalFiles(prev => [...prev, ...files]);

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagesPreview(prev => [...prev, ...newPreviews]);
  };

  const removeAdditionalImage = (index: number) => {
    // Sempre remove do preview primeiro
    setImagesPreview(prev => prev.filter((_, i) => i !== index));

    if (editingProject && index < formData.images.length) {
      // Removendo imagem existente no Firestore (URL salva)
      const updatedImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, images: updatedImages }));
    } else {
      // Removendo nova imagem ainda não enviada (arquivo local)
      const adjustedIndex = index - formData.images.length;
      if (adjustedIndex >= 0) {
        setAdditionalFiles(prev => prev.filter((_, i) => i !== adjustedIndex));
      }
    }

    toast.success("Imagem removida!");
  };

  const removeCoverImage = () => {
    setCoverFile(null);
    setCoverPreview("");
    if (editingProject) {
      // Ao editar um projeto, limpar também a URL da capa no formData
      setFormData(prev => ({ ...prev, coverUrl: "" }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
      toast.success(`Tag "${tagInput.trim()}" adicionada!`);
    } else if (formData.tags.includes(tagInput.trim())) {
      toast.error("Esta tag já foi adicionada!");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
    toast.success(`Tag "${tagToRemove}" removida!`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Por favor, preencha o título e a descrição.");
      return;
    }

    if (!editingProject && !coverFile) {
      toast.error("Por favor, selecione uma imagem de capa.");
      return;
    }

    setLoading(true);

    try {
      let coverUrl = formData.coverUrl;

      // Upload da imagem de capa apenas se houver nova imagem
      if (coverFile) {
        toast.loading("Fazendo upload da imagem de capa...", { id: "upload" });
        coverUrl = await uploadImage(coverFile, "projects/covers");
      }

      // Upload das imagens adicionais — preserva ordem do preview
      let uploadedNewImages: string[] = [];
      if (additionalFiles.length > 0) {
        toast.loading("Fazendo upload das imagens adicionais...", { id: "upload" });
        uploadedNewImages = await uploadMultipleImages(additionalFiles, "projects/images");
      }

      // Rebuild final images array from imagesPreview order
      // blob: entries get replaced with uploaded URLs (in order of additionalFiles)
      let newFileIdx = 0;
      const additionalImages: string[] = imagesPreview.map((preview) => {
        if (preview.startsWith("blob:")) {
          return uploadedNewImages[newFileIdx++] ?? preview;
        }
        return preview;
      });

      // Criar dados do projeto
      const projectData = {
        title: formData.title.trim(),
        description: formData.description,
        coverUrl,
        images: additionalImages,
        tags: formData.tags,
        demoUrl: formData.demoUrl.trim(),
        repositoryUrl: formData.repositoryUrl.trim(),
        category: formData.category,
        ...(editingProject ? { updatedAt: new Date().toISOString() } : { createdAt: new Date().toISOString() }),
      };

      if (editingProject) {
        // Atualizar projeto existente
        toast.loading("Atualizando projeto...", { id: "upload" });
        await updateDoc(doc(db, "projects", editingProject.id), projectData);
        toast.success("✨ Projeto atualizado com sucesso!", {
          id: "upload",
          duration: 4000
        });
      } else {
        // Criar novo projeto
        toast.loading("Criando projeto...", { id: "upload" });
        await addDoc(collection(db, "projects"), projectData);
        toast.success("🎉 Projeto criado com sucesso!", {
          id: "upload",
          duration: 4000
        });
      }

      // Reset e volta para lista
      resetForm();
      setEditingProject(null);
      setViewMode('list');
      loadProjects();

    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      toast.error("❌ Erro ao salvar projeto. Tente novamente.", {
        id: "upload",
        duration: 4000
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_authenticated");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-background border border-beige/30 rounded-xl text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all duration-300";

  const fieldLabel = (text: string) => (
    <span className="text-xs uppercase tracking-widest text-muted font-medium">{text}</span>
  );

  return (
    <main className="min-h-screen bg-background">

      {/* ── Top bar ── */}
      <motion.header
        initial={{ opacity: 0, y: -16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 border-b border-beige/20 bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-5">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors duration-300"
            >
              <BsArrowLeft className="h-3.5 w-3.5" />
              Portfólio
            </button>
            <div className="h-4 w-px bg-beige/40" />
            <span className="font-Wulkan text-lg uppercase text-primary tracking-wide">
              {viewMode === 'list' ? 'Projetos' : editingProject ? 'Editar Projeto' : 'Novo Projeto'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {viewMode === 'form' && (
              <button
                onClick={() => { setViewMode('list'); resetForm(); setEditingProject(null); }}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors duration-300"
              >
                <BsX className="h-4 w-4" />
                Cancelar
              </button>
            )}
            <button
              onClick={logout}
              className="text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors duration-300"
            >
              Sair
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Lista ── */}
      {viewMode === 'list' && (
        <section className="container mx-auto px-6 py-14 max-w-6xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between gap-6 mb-12"
          >
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Admin
              </span>
              <h1 className="font-Wulkan text-5xl md:text-6xl uppercase leading-none">
                Projetos
              </h1>
              <p className="text-foreground/50 text-sm">
                {projects.length} projeto{projects.length !== 1 ? 's' : ''} cadastrado{projects.length !== 1 ? 's' : ''}
              </p>
            </div>

            <button
              onClick={startNewProject}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/80 transition-all duration-300 hover:scale-105"
            >
              <BsPlus className="h-4 w-4" />
              Novo projeto
            </button>
          </motion.div>

          <div className="w-full h-px bg-beige/30 mb-12" />

          {/* Grid */}
          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center py-32"
            >
              <p className="font-Wulkan text-2xl uppercase text-foreground/20 mb-6">
                Nenhum projeto ainda
              </p>
              <button
                onClick={startNewProject}
                className="inline-flex items-center gap-2 px-6 py-3 border border-beige/40 text-sm text-foreground/60 hover:text-primary hover:border-primary/40 rounded-full transition-all duration-300"
              >
                <BsPlus className="h-4 w-4" />
                Criar primeiro projeto
              </button>
            </motion.div>
          ) : (
            <div className="space-y-0">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
                >
                  <article className="group grid md:grid-cols-[1fr_200px] gap-0 border-b border-beige/20 py-8 hover:border-primary/20 transition-colors duration-300">
                    <div className="flex flex-col justify-between gap-4 md:pr-10">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-foreground/25">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {project.category && (
                            <span className="text-xs uppercase tracking-widest text-primary/60 font-medium">
                              {project.category}
                            </span>
                          )}
                        </div>
                        <h2 className="font-Wulkan text-2xl md:text-3xl uppercase leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h2>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tags?.slice(0, 4).map(tag => (
                            <span key={tag} className="text-xs text-muted border border-beige/30 px-2.5 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => startEditProject(project)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest border border-beige/30 text-foreground/60 hover:text-primary hover:border-primary/40 rounded-full transition-all duration-300"
                        >
                          <BsPencil className="h-3 w-3" />
                          Editar
                        </button>
                        <button
                          onClick={() => deleteProject(project)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest border border-beige/20 text-foreground/30 hover:text-red-500 hover:border-red-500/30 rounded-full transition-all duration-300"
                        >
                          <BsTrash className="h-3 w-3" />
                          Excluir
                        </button>
                      </div>
                    </div>

                    <div className="relative rounded-xl overflow-hidden mt-4 md:mt-0" style={{ aspectRatio: "16/9" }}>
                      <Image
                        src={project.coverUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </article>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── Formulário ── */}
      {viewMode === 'form' && (
        <section className="container mx-auto px-6 py-14 max-w-3xl">

          {/* Form header */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 mb-12"
          >
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              {editingProject ? 'Editar' : 'Novo'}
            </span>
            <h1 className="font-Wulkan text-5xl uppercase leading-none">
              {editingProject ? editingProject.title : 'Projeto'}
            </h1>
            <div className="w-full h-px bg-beige/30 mt-6" />
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-10">

              {/* Título + Categoria side by side */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="grid md:grid-cols-[1fr_200px] gap-6"
              >
                <div className="space-y-2">
                  {fieldLabel("Título *")}
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className={inputClass}
                    placeholder="Nome do projeto"
                    required
                  />
                </div>

                <div className="space-y-2">
                  {fieldLabel("Categoria")}
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
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

              {/* Capa */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="space-y-3"
              >
                {fieldLabel(`Imagem de Capa${!editingProject ? ' *' : ''}`)}
                <ImageUpload
                  onImagesSelected={handleCoverImageSelected}
                  currentImages={coverPreview ? [coverPreview] : []}
                  onRemoveImage={removeCoverImage}
                  isUploading={loading}
                  multiple={false}
                  label=""
                />
              </motion.div>

              {/* Galeria */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  {fieldLabel("Galeria de imagens")}
                  <span className="text-xs text-muted font-mono">
                    {imagesPreview.length}/10
                  </span>
                </div>

                {imagesPreview.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {imagesPreview.map((src, index) => (
                      <div
                        key={src}
                        draggable
                        onDragStart={() => { dragIndexRef.current = index; }}
                        onDragOver={(e) => { e.preventDefault(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (dragIndexRef.current !== null) {
                            reorderAdditionalImages(dragIndexRef.current, index);
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
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 hover:bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          <BsX className="h-3.5 w-3.5 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <ImageUpload
                  onImagesSelected={handleAdditionalImagesSelected}
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
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="space-y-3"
              >
                {fieldLabel("Descrição *")}
                <RichTextEditor
                  content={formData.description}
                  onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
                  placeholder="Descreva o projeto, tecnologias, desafios e resultados..."
                />
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="space-y-3"
              >
                {fieldLabel("Tags / Tecnologias")}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className={inputClass}
                    placeholder="React, Next.js, Figma..."
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="shrink-0 w-11 h-11 flex items-center justify-center border border-beige/30 text-muted hover:text-primary hover:border-primary/40 rounded-xl transition-all duration-300"
                  >
                    <BsPlus className="h-5 w-5" />
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/8 text-primary border border-primary/20 rounded-full text-xs"
                      >
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-primary/50 hover:text-red-500 transition-colors">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* URLs */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  {fieldLabel("URL da Demo")}
                  <input
                    type="url"
                    id="demoUrl"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                    className={inputClass}
                    placeholder="https://meu-projeto.com"
                  />
                </div>
                <div className="space-y-2">
                  {fieldLabel("URL do Repositório")}
                  <input
                    type="url"
                    id="repositoryUrl"
                    value={formData.repositoryUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, repositoryUrl: e.target.value }))}
                    className={inputClass}
                    placeholder="https://github.com/usuario/projeto"
                  />
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="flex items-center justify-between pt-4 border-t border-beige/20"
              >
                <button
                  type="button"
                  onClick={() => { setViewMode('list'); resetForm(); setEditingProject(null); }}
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
                      {editingProject ? 'Salvando...' : 'Criando...'}
                    </>
                  ) : (
                    <>
                      <BsSave className="h-4 w-4" />
                      {editingProject ? 'Salvar alterações' : 'Criar projeto'}
                    </>
                  )}
                </button>
              </motion.div>

            </div>
          </form>
        </section>
      )}
    </main>
  );
}