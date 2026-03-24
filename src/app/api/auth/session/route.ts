import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ user: null });
    }

    const session = JSON.parse(Buffer.from(sessionToken, "base64").toString());
    const user = await getUserById(session.userId);

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: { id: user.id, email: user.email, refCode: user.referralCode },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("session");
  return response;
}
