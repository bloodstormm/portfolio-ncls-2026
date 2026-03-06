"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { BsPlus, BsSave, BsArrowLeft, BsPencil, BsTrash, BsList, BsX } from "react-icons/bs";
import { toast } from "sonner";
import Image from "next/image";
import { db } from "../../lib/firebase";
import { uploadImage, uploadMultipleImages } from "../../lib/uploadImage";
import { RichTextEditor } from "../../components/RichTextEditor";
import { ImageUpload } from "../../components/ImageUpload";
import { fadeInUp, StaggerContainer, itemAnimation, fadeInDown, transition } from "../../utils/Animations";
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

      // Upload das imagens adicionais
      let additionalImages: string[] = [...formData.images];
      if (additionalFiles.length > 0) {
        toast.loading("Fazendo upload das imagens adicionais...", { id: "upload" });
        const newImages = await uploadMultipleImages(additionalFiles, "projects/images");
        additionalImages = [...additionalImages, ...newImages];
      }

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
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        {...fadeInDown}
        transition={{...transition, delay: 0.3}}
        className="bg-gradient-to-r from-background/90 to-background/60 backdrop-blur-sm border-b border-beige/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors duration-300"
              >
                <BsArrowLeft className="h-4 w-4" />
                <span>Voltar ao portfólio</span>
              </button>
              <div className="h-6 w-px bg-beige/30"></div>
              <h1 className="font-Wulkan text-2xl uppercase text-primary">
                Admin - {viewMode === 'list' ? 'Projetos' : editingProject ? 'Editar Projeto' : 'Novo Projeto'}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {viewMode === 'form' && (
                <button
                  onClick={() => {
                    setViewMode('list');
                    resetForm();
                    setEditingProject(null);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-primary transition-colors duration-300"
                >
                  <BsX className="h-4 w-4" />
                  <span>Cancelar</span>
                </button>
              )}

              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-muted hover:text-primary transition-colors duration-300"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Lista de Projetos */}
      {viewMode === 'list' && (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary">Projetos Existentes</h2>
              <p className="text-muted mt-2">Gerencie seus projetos aqui</p>
            </div>

            <button
              onClick={startNewProject}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-300 transform hover:scale-105"
            >
              <BsPlus className="h-5 w-5" />
              <span>Novo Projeto</span>
            </button>
          </div>

          <motion.div
            variants={StaggerContainer}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemAnimation}
                className="bg-background/50 border border-beige/30 rounded-lg overflow-hidden hover:border-primary/30 transition-colors duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={project.coverUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-primary mb-2 line-clamp-1">
                    {project.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">
                      {project.category || 'Sem categoria'}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditProject(project)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                      >
                        <BsPencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(project)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors duration-200"
                      >
                        <BsTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {projects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-muted mb-8">
                Comece criando seu primeiro projeto
              </p>
              <button
                onClick={startNewProject}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-300"
              >
                <BsPlus className="h-5 w-5" />
                <span>Criar Primeiro Projeto</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* Formulário de Projeto */}
      {viewMode === 'form' && (
        <section className="container mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <motion.div
              variants={StaggerContainer}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              {/* Título */}
              <motion.div variants={itemAnimation} className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-primary">
                  Título do Projeto *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-background/50 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors duration-300"
                  placeholder="Ex: Sistema de E-commerce Responsivo"
                  required
                />
              </motion.div>

              {/* Categoria */}
              <motion.div variants={itemAnimation} className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-primary">
                  Categoria
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-background/50 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors duration-300"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App</option>
                  <option value="design">UI/UX Design</option>
                  <option value="fullstack">Full Stack</option>
                </select>
              </motion.div>

              {/* Imagem de Capa */}
              <motion.div variants={itemAnimation}>
                <ImageUpload
                  onImagesSelected={handleCoverImageSelected}
                  currentImages={coverPreview ? [coverPreview] : []}
                  onRemoveImage={removeCoverImage}
                  isUploading={loading}
                  multiple={false}
                  label={`Imagem de Capa ${!editingProject ? '*' : ''}`}
                />
              </motion.div>

              {/* Imagens Adicionais */}
              <motion.div variants={itemAnimation}>
                <ImageUpload
                  onImagesSelected={handleAdditionalImagesSelected}
                  currentImages={imagesPreview}
                  onRemoveImage={removeAdditionalImage}
                  isUploading={loading}
                  multiple={true}
                  maxImages={10}
                  label="Imagens Adicionais (Galeria)"
                />
              </motion.div>

              {/* Descrição Rich Text */}
              <motion.div variants={itemAnimation} className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Descrição do Projeto *
                </label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
                  placeholder="Descreva detalhadamente o projeto, suas funcionalidades, tecnologias utilizadas, desafios enfrentados e resultados alcançados..."
                />
              </motion.div>

              {/* Tags */}
              <motion.div variants={itemAnimation} className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Tags / Tecnologias
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 bg-background/50 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors duration-300"
                    placeholder="Ex: React, Next.js, TypeScript..."
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-300"
                  >
                    <BsPlus className="h-5 w-5" />
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500 transition-colors duration-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* URLs */}
              <motion.div variants={itemAnimation} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="demoUrl" className="block text-sm font-medium text-primary">
                    URL da Demo / Site
                  </label>
                  <input
                    type="url"
                    id="demoUrl"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-background/50 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors duration-300"
                    placeholder="https://meu-projeto.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="repositoryUrl" className="block text-sm font-medium text-primary">
                    URL do Repositório
                  </label>
                  <input
                    type="url"
                    id="repositoryUrl"
                    value={formData.repositoryUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, repositoryUrl: e.target.value }))}
                    className="w-full px-4 py-3 bg-background/50 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors duration-300"
                    placeholder="https://github.com/usuario/projeto"
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemAnimation} className="flex justify-center pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{editingProject ? 'Salvando...' : 'Criando...'}</span>
                    </>
                  ) : (
                    <>
                      <BsSave className="h-5 w-5" />
                      <span>{editingProject ? 'Salvar Alterações' : 'Criar Projeto'}</span>
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          </form>
        </section>
      )}
    </main>
  );
}