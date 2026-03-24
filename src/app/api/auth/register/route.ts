import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, createUser, getUserByReferralCode } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, refCode } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "邮箱和密码不能为空" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "密码至少8位" }, { status: 400 });
    }

    const emailLower = email.toLowerCase();
    const existing = await getUserByEmail(emailLower);
    if (existing) {
      return NextResponse.json({ error: "该邮箱已注册，请直接登录" }, { status: 409 });
    }

    // Validate referral code if provided
    let validRefCode: string | undefined;
    if (refCode) {
      const referrer = await getUserByReferralCode(refCode);
      if (referrer) validRefCode = refCode;
    }

    const user = await createUser({ email: emailLower, password: password, referralCode: validRefCode });

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
    console.error("Register error:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
