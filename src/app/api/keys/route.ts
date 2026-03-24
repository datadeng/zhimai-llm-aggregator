import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/auth";

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

export async function GET(req: NextRequest) {
  const userId = getSessionUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const keys = await prisma.aPIKey.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ keys });
}

export async function POST(req: NextRequest) {
  const userId = getSessionUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: "名称不能为空" }, { status: 400 });

  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "zm_";
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const newKey = await prisma.aPIKey.create({
    data: { userId, name: name.trim(), key },
  });

  return NextResponse.json({ key: newKey });
}
