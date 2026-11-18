import { NextRequest, NextResponse } from "next/server";
import {
  AdminNotConfiguredError,
  getAdminDb,
  isAdminConfigured,
} from "@/app/lib/firebaseAdmin";
import { fetchProjectsFromRest } from "@/app/lib/getProjects";

function isAuthorized(req: NextRequest): boolean {
  const token = req.headers.get("x-admin-token");
  return Boolean(process.env.ADMIN_PASSWORD) && token === process.env.ADMIN_PASSWORD;
}

const unauthorized = () =>
  NextResponse.json({ error: "Não autorizado." }, { status: 401 });

function failure(error: unknown) {
  console.error("[admin/projects]", error);
  if (error instanceof AdminNotConfiguredError) {
    return NextResponse.json(
      {
        error:
          "Credencial do Firebase Admin ausente (FIREBASE_SERVICE_ACCOUNT_JSON). Leitura funciona, mas salvar e excluir não.",
      },
      { status: 503 }
    );
  }
  return NextResponse.json({ error: "Erro no servidor." }, { status: 500 });
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized();

  try {
    // Without the service account, fall back to the public REST read the site uses.
    if (!isAdminConfigured()) {
      return NextResponse.json(await fetchProjectsFromRest({ cache: "no-store" }));
    }
    const snap = await getAdminDb().collection("projects").get();
    return NextResponse.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch (error) {
    return failure(error);
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized();

  try {
    const data = await req.json();
    const ref = await getAdminDb().collection("projects").add(data);
    return NextResponse.json({ id: ref.id });
  } catch (error) {
    return failure(error);
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized();

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID do projeto é obrigatório." }, { status: 400 });
    }
    await getAdminDb().collection("projects").doc(id).update(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return failure(error);
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized();

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID do projeto é obrigatório." }, { status: 400 });
    }
    await getAdminDb().collection("projects").doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return failure(error);
  }
}
