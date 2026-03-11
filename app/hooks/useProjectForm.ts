"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { uploadImageViaApi, uploadMultipleImagesViaApi } from "@/app/lib/uploadImage";
import type { Project } from "@/app/types/projects";

function getAdminToken(): string {
  return sessionStorage.getItem("admin_token") ?? "";
}

async function apiProjects(method: string, body: object) {
  const res = await fetch("/api/admin/projects", {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": getAdminToken(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Erro na operação do projeto");
  return res.json();
}

export interface ProjectFormData {
  title: string;
  description: string;
  coverUrl: string;
  images: string[];
  tags: string[];
  demoUrl: string;
  repositoryUrl: string;
  category: "web" | "mobile" | "design" | "fullstack" | "";
}

const emptyForm: ProjectFormData = {
  title: "",
  description: "",
  coverUrl: "",
  images: [],
  tags: [],
  demoUrl: "",
  repositoryUrl: "",
  category: "",
};

export function useProjectForm(onSuccess: () => void) {
  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const dragIndexRef = useRef<number | null>(null);

  const reset = () => {
    setFormData(emptyForm);
    setCoverFile(null);
    setAdditionalFiles([]);
    setCoverPreview("");
    setImagesPreview([]);
    setTagInput("");
  };

  const loadFromProject = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      coverUrl: project.coverUrl,
      images: project.images || [],
      tags: project.tags || [],
      demoUrl: project.demoUrl || "",
      repositoryUrl: project.repositoryUrl || "",
      category: project.category || "",
    });
    setCoverPreview(project.coverUrl);
    setImagesPreview(project.images || []);
  };

  const handleCoverSelected = (files: File[]) => {
    const file = files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const removeCover = (isEditing: boolean) => {
    setCoverFile(null);
    setCoverPreview("");
    if (isEditing) setFormData((prev) => ({ ...prev, coverUrl: "" }));
  };

  const handleAdditionalImagesSelected = (files: File[]) => {
    setAdditionalFiles((prev) => [...prev, ...files]);
    setImagesPreview((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeAdditionalImage = (index: number, isEditing: boolean) => {
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    if (isEditing && index < formData.images.length) {
      setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    } else {
      const adjustedIndex = index - formData.images.length;
      if (adjustedIndex >= 0) {
        setAdditionalFiles((prev) => prev.filter((_, i) => i !== adjustedIndex));
      }
    }
    toast.success("Imagem removida!");
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const newPreviews = [...imagesPreview];
    const [moved] = newPreviews.splice(fromIndex, 1);
    newPreviews.splice(toIndex, 0, moved);
    setImagesPreview(newPreviews);

    const blobToFile = new Map<string, File>();
    additionalFiles.forEach((file, i) => {
      const blobUrl = imagesPreview[imagesPreview.length - additionalFiles.length + i];
      if (blobUrl) blobToFile.set(blobUrl, file);
    });

    const newExistingUrls: string[] = [];
    const newFileOrder: File[] = [];
    newPreviews.forEach((preview) => {
      if (preview.startsWith("blob:")) {
        const file = blobToFile.get(preview);
        if (file) newFileOrder.push(file);
      } else {
        newExistingUrls.push(preview);
      }
    });

    setFormData((prev) => ({ ...prev, images: newExistingUrls }));
    setAdditionalFiles(newFileOrder);
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (formData.tags.includes(trimmed)) {
      toast.error("Esta tag já foi adicionada!");
      return;
    }
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
    setTagInput("");
    toast.success(`Tag "${trimmed}" adicionada!`);
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
    toast.success(`Tag "${tag}" removida!`);
  };

  const submit = async (e: React.FormEvent, editingProject: Project | null) => {
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
      const token = getAdminToken();
      let coverUrl = formData.coverUrl;
      if (coverFile) {
        toast.loading("Fazendo upload da imagem de capa...", { id: "upload" });
        coverUrl = await uploadImageViaApi(coverFile, "projects/covers", token);
      }

      let uploadedNewImages: string[] = [];
      if (additionalFiles.length > 0) {
        toast.loading("Fazendo upload das imagens adicionais...", { id: "upload" });
        uploadedNewImages = await uploadMultipleImagesViaApi(additionalFiles, "projects/images", token);
      }

      let newFileIdx = 0;
      const additionalImages: string[] = imagesPreview.map((preview) =>
        preview.startsWith("blob:") ? (uploadedNewImages[newFileIdx++] ?? preview) : preview
      );

      const projectData = {
        title: formData.title.trim(),
        description: formData.description,
        coverUrl,
        images: additionalImages,
        tags: formData.tags,
        demoUrl: formData.demoUrl.trim(),
        repositoryUrl: formData.repositoryUrl.trim(),
        category: formData.category,
        ...(editingProject
          ? { updatedAt: new Date().toISOString() }
          : { createdAt: new Date().toISOString() }),
      };

      if (editingProject) {
        toast.loading("Atualizando projeto...", { id: "upload" });
        await apiProjects("PUT", { id: editingProject.id, ...projectData });
        toast.success("✨ Projeto atualizado com sucesso!", { id: "upload", duration: 4000 });
      } else {
        toast.loading("Criando projeto...", { id: "upload" });
        await apiProjects("POST", projectData);
        toast.success("🎉 Projeto criado com sucesso!", { id: "upload", duration: 4000 });
      }

      reset();
      onSuccess();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      toast.error("❌ Erro ao salvar projeto. Tente novamente.", { id: "upload", duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    coverPreview,
    imagesPreview,
    tagInput,
    setTagInput,
    loading,
    dragIndexRef,
    reset,
    loadFromProject,
    handleCoverSelected,
    removeCover,
    handleAdditionalImagesSelected,
    removeAdditionalImage,
    reorderImages,
    addTag,
    removeTag,
    submit,
  };
}
