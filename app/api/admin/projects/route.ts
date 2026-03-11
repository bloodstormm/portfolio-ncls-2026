import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/app/lib/firebaseAdmin";

function isAuthorized(req: NextRequest): boolean {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const snap = await adminDb.collection("projects").get();
  const projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const data = await req.json();
  const ref = await adminDb.collection("projects").add(data);
  return NextResponse.json({ id: ref.id });
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id, ...data } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID do projeto é obrigatório." }, { status: 400 });
  }

  await adminDb.collection("projects").doc(id).update(data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID do projeto é obrigatório." }, { status: 400 });
  }

  await adminDb.collection("projects").doc(id).delete();
  return NextResponse.json({ ok: true });
}
