import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getSessionUserId(req: NextRequest): string | null {
  const token = req.cookies.get("session")?.value;
  if (!token) return null;
  try {
    const session = JSON.parse(Buffer.from(token, "base64").toString());
    return session.userId || null;
  } catch {
    return null;
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = getSessionUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const key = await prisma.aPIKey.findFirst({ where: { id, userId } });
  if (!key) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.aPIKey.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
