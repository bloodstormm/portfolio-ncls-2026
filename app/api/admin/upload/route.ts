import { NextRequest, NextResponse } from "next/server";
import { AdminNotConfiguredError, getAdminStorage } from "@/app/lib/firebaseAdmin";

function isAuthorized(req: NextRequest): boolean {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const path = formData.get("path") as string | null;

  if (!file || !path) {
    return NextResponse.json({ error: "Arquivo e path são obrigatórios." }, { status: 400 });
  }

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "");
  const fullPath = `${path}/${timestamp}-${safeName}`;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = getAdminStorage().bucket();
    const fileRef = bucket.file(fullPath);

    await fileRef.save(buffer, { contentType: file.type });
    await fileRef.makePublic();

    const url = `https://storage.googleapis.com/${bucket.name}/${fullPath}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("[admin/upload]", error);
    const missing = error instanceof AdminNotConfiguredError;
    return NextResponse.json(
      {
        error: missing
          ? "Credencial do Firebase Admin ausente (FIREBASE_SERVICE_ACCOUNT_JSON)."
          : "Falha no upload da imagem.",
      },
      { status: missing ? 503 : 500 }
    );
  }
}
