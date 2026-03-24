import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "邮箱和密码不能为空" }, { status: 400 });
    }

    const user = await getUserByEmail(email.toLowerCase());
    if (!user) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 });
    }

    // TODO: bcrypt.compare in production
    if (user.passwordHash !== password) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 });
    }

    const sessionToken = Buffer.from(
      JSON.stringify({ userId: user.id, email: user.email })
    ).toString("base64");

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, refCode: user.referralCode },
    });

    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
