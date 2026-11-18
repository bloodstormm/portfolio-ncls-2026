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
 * Reads the whole `projects` collection through Firestore's public REST API.
 * Throws when the request fails, so callers decide how to handle it.
 */
export async function fetchProjectsFromRest(
  init: RequestInit & { next?: { revalidate?: number } } = {}
): Promise<Project[]> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey) throw new Error("Firebase env vars missing.");

  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/projects?pageSize=200&key=${apiKey}`,
    init
  );
  if (!res.ok) throw new Error(`Firestore REST ${res.status}`);
  const data = (await res.json()) as { documents?: FirestoreDoc[] };

  return (data.documents ?? []).map((doc) => {
    const fields = doc.fields ?? {};
    const out: Record<string, unknown> = { id: doc.name.split("/").pop() };
    for (const key of Object.keys(fields)) out[key] = read(fields[key]);
    return out as Project;
  });
}

/**
 * Reads every project from Firestore on the server (REST, cached for a minute)
 * so the homepage ships with its content instead of loading it in the browser.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await fetchProjectsFromRest({ next: { revalidate: 60 } });
    return projects
      .filter((project) => project.title && project.coverUrl)
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
  } catch {
    return [];
  }
}
