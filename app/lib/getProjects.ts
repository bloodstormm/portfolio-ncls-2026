import type { Project } from "@/app/types/projects";
import { getAdminDb, isAdminConfigured } from "@/app/lib/firebaseAdmin";

const SITE_URL = "https://nicolasmalachias.com/";

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
    {
      ...init,
      // Browser API keys are often restricted by HTTP referrer; server requests send none.
      headers: { Referer: SITE_URL, ...(init.headers ?? {}) },
    }
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Firestore REST ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = (await res.json()) as { documents?: FirestoreDoc[] };

  return (data.documents ?? []).map((doc) => {
    const fields = doc.fields ?? {};
    const out: Record<string, unknown> = { id: doc.name.split("/").pop() };
    for (const key of Object.keys(fields)) out[key] = read(fields[key]);
    return out as Project;
  });
}

async function fetchProjectsFromAdmin(): Promise<Project[]> {
  const snap = await getAdminDb().collection("projects").get();
  // JSON round-trip turns Firestore types (Timestamps etc.) into plain values for client components.
  return JSON.parse(JSON.stringify(snap.docs.map((d) => ({ id: d.id, ...d.data() })))) as Project[];
}

/**
 * Reads every project on the server so pages ship with their content.
 * Uses the service account when it is configured (same path the admin uses),
 * and falls back to Firestore's public REST API. Failures are logged, not hidden.
 */
export async function getProjects(): Promise<Project[]> {
  let projects: Project[] | null = null;

  if (isAdminConfigured()) {
    try {
      projects = await fetchProjectsFromAdmin();
    } catch (error) {
      console.error("[getProjects] firebase-admin read failed:", error);
    }
  }

  if (!projects) {
    try {
      projects = await fetchProjectsFromRest({ next: { revalidate: 60 } });
    } catch (error) {
      console.error("[getProjects] Firestore REST read failed:", error);
      return [];
    }
  }

  return projects
    .filter((project) => project.title && project.coverUrl)
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
}
