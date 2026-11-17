import type { Project } from "@/app/types/projects";

type FirestoreValue = {
  stringValue?: string;
  arrayValue?: { values?: FirestoreValue[] };
};

type FirestoreDoc = { name: string; fields?: Record<string, FirestoreValue> };

function read(value: FirestoreValue | undefined): string | string[] | undefined {
  if (!value) return undefined;
  if (typeof value.stringValue === "string") return value.stringValue;
  if (value.arrayValue) {
    return (value.arrayValue.values ?? [])
      .map((item) => item.stringValue)
      .filter((item): item is string => typeof item === "string");
  }
  return undefined;
}

/**
 * Reads every project from Firestore on the server (REST, cached for a minute)
 * so the homepage ships with its content instead of loading it in the browser.
 */
export async function getProjects(): Promise<Project[]> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey) return [];

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/projects?pageSize=200&key=${apiKey}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { documents?: FirestoreDoc[] };

    return (data.documents ?? [])
      .map((doc) => {
        const fields = doc.fields ?? {};
        const out: Record<string, unknown> = { id: doc.name.split("/").pop() };
        for (const key of Object.keys(fields)) out[key] = read(fields[key]);
        return out as Project;
      })
      .filter((project) => project.title && project.coverUrl)
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
  } catch {
    return [];
  }
}
