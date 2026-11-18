import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

/** True when the service account needed for writes and uploads is configured. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
}

export class AdminNotConfiguredError extends Error {
  constructor() {
    super("FIREBASE_SERVICE_ACCOUNT_JSON não configurado.");
    this.name = "AdminNotConfiguredError";
  }
}

// Built on first use instead of at import time, so a missing credential no longer
// crashes every route that imports this module.
function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccount) throw new AdminNotConfiguredError();

  return initializeApp({
    credential: cert(JSON.parse(serviceAccount)),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

export function getAdminStorage() {
  return getStorage(getAdminApp());
}
