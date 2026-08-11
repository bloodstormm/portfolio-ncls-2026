import { Suspense } from "react";
import { AdminProjectsContent } from "@/app/components/admin/AdminProjectsContent";

export default function AdminProjectsPage() {
  return (
    <Suspense fallback={null}>
      <AdminProjectsContent />
    </Suspense>
  );
}
