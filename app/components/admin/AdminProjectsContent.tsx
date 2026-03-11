"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useProjectForm } from "@/app/hooks/useProjectForm";
import { AdminTopBar } from "./AdminTopBar";
import { AdminProjectList } from "./AdminProjectList";
import { ProjectFormFields } from "./ProjectFormFields";
import type { Project } from "@/app/types/projects";

type ViewMode = "list" | "form";

export function AdminProjectsContent() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const form = useProjectForm(() => {
    setEditingProject(null);
    setViewMode("list");
    loadProjects();
  });

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
      const token = sessionStorage.getItem("admin_token") ?? "";
      const res = await fetch("/api/admin/projects", {
        headers: { "x-admin-token": token },
      });
      if (!res.ok) throw new Error();
      const data: Project[] = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      toast.error("Erro ao carregar projetos");
    }
  };

  const handleNew = () => {
    form.reset();
    setEditingProject(null);
    setViewMode("form");
  };

  const handleEdit = (project: Project) => {
    form.loadFromProject(project);
    setEditingProject(project);
    setViewMode("form");
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Tem certeza que deseja excluir o projeto "${project.title}"?`)) return;
    try {
      const token = sessionStorage.getItem("admin_token") ?? "";
      const res = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ id: project.id }),
      });
      if (!res.ok) throw new Error();
      toast.success("Projeto excluído com sucesso!");
      loadProjects();
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
      toast.error("Erro ao excluir projeto");
    }
  };

  const handleCancel = () => {
    form.reset();
    setEditingProject(null);
    setViewMode("list");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_token");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <AdminTopBar
        viewMode={viewMode}
        editingTitle={editingProject?.title ?? null}
        onCancel={handleCancel}
        onLogout={handleLogout}
      />

      {viewMode === "list" && (
        <AdminProjectList
          projects={projects}
          onNew={handleNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {viewMode === "form" && (
        <ProjectFormFields
          formData={form.formData}
          setFormData={form.setFormData}
          coverPreview={form.coverPreview}
          imagesPreview={form.imagesPreview}
          tagInput={form.tagInput}
          setTagInput={form.setTagInput}
          loading={form.loading}
          editingProject={editingProject}
          dragIndexRef={form.dragIndexRef}
          onCoverSelected={form.handleCoverSelected}
          onRemoveCover={() => form.removeCover(!!editingProject)}
          onAdditionalSelected={form.handleAdditionalImagesSelected}
          onRemoveAdditionalImage={(i) => form.removeAdditionalImage(i, !!editingProject)}
          onReorderImages={form.reorderImages}
          onAddTag={form.addTag}
          onRemoveTag={form.removeTag}
          onSubmit={(e) => form.submit(e, editingProject)}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
}
